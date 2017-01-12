import { SignalRConnectionBase } from "./signalr.connection.base";
import { Observable } from "rxjs/Observable";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { BroadcastEventListener } from "../eventing/broadcast.event.listener";
import { ConnectionStatus } from "./connection.status";

export class SignalRConnection extends SignalRConnectionBase {
    private _status: Observable<ConnectionStatus>;
    private _errors: Observable<any>;
    private _jConnection: any;
    private _jProxy: any;

    constructor(jConnection: any, jProxy: any) {
        super();
        this._jProxy = jProxy;
        this._jConnection = jConnection;
        this._errors = this.wireUpErrorsAsObservable();
        this._status = this.wireUpStatusEventsAsObservable();
    }

    public get errors(): Observable<any> {
        return this._errors;
    }

    public get status(): Observable<ConnectionStatus> {
        return this._status;
    }

    public start(): Promise<any> {
         let $promise = new Promise<any>((resolve, reject) => {
         this._jConnection.start().done(function (...results: any[]) {
                resolve(results);
            })
            .fail(function (err: any) {
                reject(err);
            });
         });
         return $promise;
    }

    public stop(): void {
         this._jConnection.stop();
    }

    public invoke(method: string, ...parameters: any[]): Promise<any> {
        if (method == null) throw new Error("SignalRConnection: Failed to invoke. Argument \'method\' can not be null");
    
        console.debug(`SignalRConnection. Start invoking \'${method}\'...`);
        let $promise = new Promise<any>((resolve, reject) => {
        this._jProxy.invoke(method, ...parameters)
            .done(function (result: any) {
                console.debug(`\'${method}\' invoked succesfully. Resolving promise...`);
                resolve(result);
                console.debug(`Promise resolved.`);
            })
            .fail(function (err: any) {
                console.debug(`Invoking \'${method}\' failed. Rejecting promise...`);
                reject(err);
                console.debug(`Promise rejected.`);
            });
        });
        return $promise;
    }

    private wireUpErrorsAsObservable(): Observable <any> {
        let sError = new ReplaySubject<any>();
        this._jConnection.error(function (error: any) {
            sError.next(error);
        });
        return sError;
    }

    private wireUpStatusEventsAsObservable(): Observable<ConnectionStatus> {
        let sStatus = new ReplaySubject<ConnectionStatus>();
        let connStatusNames = ["starting", "received", "connectionSlow", "reconnecting", "reconnected", "stateChanged", "disconnected"];
        // aggregate all signalr connection status handlers into 1 observable. 
        connStatusNames.forEach((statusName) => {
            // handler wire up, for signalr connection status callback.
            this._jConnection[statusName]((...args: any[]) => {
                sStatus.next(new ConnectionStatus(statusName));
            });
        });
        return sStatus;
    }

    public listen<T>(listener: BroadcastEventListener<T>): void {
        if (listener == null) throw new Error("Failed to listen. Argument \'listener\' can not be null");

        function onBroadcastEventReceived(...args: any[]) {
            console.log("SignalRConnection.proxy.on invoked. Calling listener next() ...");

            let casted: T = null;
            if (args.length > 0) casted = <T>args[0];
            listener.next(casted);
            console.log("listener next() called.");
        }

        console.log(`SignalRConnection: Starting to listen to server event with name ${listener.event}`);
         // wire up server-event handlers
        this._jProxy.on(listener.event, onBroadcastEventReceived);
    }
}
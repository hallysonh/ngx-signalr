import { NgZone, Injectable, Inject } from '@angular/core';
import { ISignalRConnection } from './connection/i.signalr.connection';
import { SignalRConfiguration } from './signalr.configuration';
import { SignalRConnection } from './connection/signalr.connection';
import { IConnectionOptions } from './connection/connection.options';
import { SIGNALR_JCONNECTION_TOKEN } from './signalr.module';

// declare var jQuery: any;

@Injectable()
export class SignalR {
  private _configuration: SignalRConfiguration;
  private _zone: NgZone;
  private _jHubConnectionFn: any;

  // tslint:disable-next-line:ban-types
  public constructor(configuration: SignalRConfiguration, zone: NgZone, @Inject(SIGNALR_JCONNECTION_TOKEN) jHubConnectionFn: Function) {
    this._configuration = configuration;
    this._zone = zone;
    this._jHubConnectionFn = jHubConnectionFn;
  }

  public setConfiguration(conf: SignalRConfiguration) {
    this._configuration = conf;
  }

  public createConnection(options?: IConnectionOptions): SignalRConnection {
    const configuration = this.merge(options ? options : {});

    try {
      const serializedQs = JSON.stringify(configuration.qs);
      const serializedTransport = JSON.stringify(configuration.transport);

      if (configuration.logging) {
        this.log(`Creating connecting with...`);
        this.log(`configuration:[url: '${configuration.url}'] ...`);
        this.log(`configuration:[hubName: '${configuration.hubName}'] ...`);
        this.log(`configuration:[qs: '${serializedQs}'] ...`);
        this.log(`configuration:[transport: '${serializedTransport}'] ...`);
      }
    } catch (err) {
      configuration.logging && this.error('creating connection error: ', err);
    }

    // create connection object
    const jConnection = this._jHubConnectionFn(configuration.url);
    jConnection.logging = configuration.logging;
    jConnection.qs = configuration.qs;

    // create a proxy
    const jProxy = jConnection.createHubProxy(configuration.hubName);
    // !!! important. We need to register at least one function otherwise server callbacks will not work.
    // tslint:disable-next-line:no-empty only-arrow-functions
    jProxy.on('noOp', function() {});

    const hubConnection = new SignalRConnection(jConnection, jProxy, this._zone, configuration);
    return hubConnection;
  }

  public connect(options?: IConnectionOptions): Promise<ISignalRConnection> {
    return this.createConnection(options).start();
  }

  private merge(overrides: IConnectionOptions): SignalRConfiguration {
    const merged: SignalRConfiguration = new SignalRConfiguration();
    merged.hubName = overrides.hubName || this._configuration.hubName;
    merged.url = overrides.url || this._configuration.url;
    merged.qs = overrides.qs || this._configuration.qs;
    merged.logging = this._configuration.logging;
    merged.jsonp = overrides.jsonp || this._configuration.jsonp;
    merged.withCredentials = overrides.withCredentials || this._configuration.withCredentials;
    merged.transport = overrides.transport || this._configuration.transport;
    return merged;
  }

  private log(...args: any[]) {
    // tslint:disable-next-line:no-console
    console.log(args.join(', '));
  }

  private error(...args: any[]) {
    // tslint:disable-next-line:no-console
    console.error(args.join(', '));
  }
}

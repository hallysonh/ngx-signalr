export class JConnectionStub {
  public stub: any = {};
  public url: string;

  constructor() {
    this.stub.callLog = [];
    this.stub.onFunctionDict = {};
    this.stub.doneFunc = null;
    this.stub.failFunc = null;
    this.stub.errorFunc = null;
  }

  public createHubProxy() {
    return new JHubProxyStub();
  }

  public error(errorFunc: any) {
    this.stub.callLog.push('connection.error');
    this.stub.errorFunc = errorFunc;
  }

  public start() {
    this.stub.callLog.push('connection.start');
    return new JPromiseStub();
  }

  public stop() {
    this.stub.callLog.push('connection.stop');
    return new JPromiseStub();
  }

  get id(): string {
    return '8bc90864-5f86-4f01-8e51-e21e5b326eb2';
  }

  // tslint:disable-next-line:no-empty
  public starting() {}
  // tslint:disable-next-line:no-empty
  public received() {}
  // tslint:disable-next-line:no-empty
  public connectionSlow() {}
  // tslint:disable-next-line:no-empty
  public reconnecting() {}
  // tslint:disable-next-line:no-empty
  public reconnected() {}
  // tslint:disable-next-line:no-empty
  public stateChanged() {}
  // tslint:disable-next-line:no-empty
  public disconnected() {}
}

// tslint:disable-next-line:max-classes-per-file
export class JHubProxyStub {
  // tslint:disable-next-line:no-empty
  public on(namedMessage: string, functionToCall: any) {}
}

// tslint:disable-next-line:max-classes-per-file
export class JPromiseStub {
  // tslint:disable-next-line:no-empty
  public done() {}
  // tslint:disable-next-line:no-empty
  public fail() {}
}

// var mockjConnection = (function () {

//     var mock: any = {};

//     //first the items used by unit testing to see what has happened
//     mock.callLog = [];
//     mock.onFunctionDict = {};
//     mock.doneFunc = null;
//     mock.failFunc = null;
//     mock.errorFunc = null;
//     //This logs a string with the caller's function name and the parameters
//     //you must provide the function name, but it finds the function arguments itself
//     mock.logStep = function (funcName: any) {
//         var log = funcName;
//         mock.callLog.push(log);
//     };
//     mock.reset = function () {
//         mock.callLog = [];
//         mock.onFunctionDict = {};
//         mock.doneFunc = null;
//         mock.failFunc = null;
//         mock.errorFunc = null;
//     };

//     //doneFail is the object returned by connection.start()
//     var doneFail: any = {};
//     doneFail.done = function (startFunc: any) {
//         mock.logStep('connection.start.done');
//         mock.doneFunc = startFunc;
//         return doneFail;
//     };
//     doneFail.fail = function (failFunc: any) {
//         mock.logStep('connection.start.fail');
//         mock.failFunc = failFunc;
//         return doneFail;
//     };

//     //Channel is the object returned by connection.createHubProxy
//     var channel: any = {};
//     channel.on = function (namedMessage: string, functionToCall: any) {
//         mock.logStep('channel.on');
//         mock.onFunctionDict[namedMessage] = functionToCall;
//     };

//     //connection is the object returned by $.hubConnection
//     var connection: any = {};
//     connection.createHubProxy = function (hubName: string) {
//         return channel;
//     };
//     connection.error = function (errorFunc: any) {
//         mock.logStep('connection.error');
//         mock.errorFunc = errorFunc;
//     };
//     connection.start = function () {
//         mock.logStep('connection.start');
//         return doneFail;
//     };
//     connection.stop = function () {
//         mock.logStep('connection.stop');
//         return doneFail;
//     };

//     return connection;

// })();

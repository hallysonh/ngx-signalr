import { NgModule, ModuleWithProviders, NgZone, InjectionToken } from '@angular/core';
import { SignalR } from './signalr';
import { SignalRConfiguration } from './signalr.configuration';

const SIGNALR_CONFIGURATION = new InjectionToken('SIGNALR_CONFIGURATION');
export const SIGNALR_JCONNECTION_TOKEN = new InjectionToken('SIGNALR_JCONNECTION_TOKEN');

export function createSignalr(configuration: SignalRConfiguration, zone: NgZone) {
  const jConnectionFn = getJConnectionFn();
  return new SignalR(configuration, zone, jConnectionFn);
}

export function getJConnectionFn(): any {
  const hubConnectionFn = (window as any).jQuery.hubConnection;
  if (hubConnectionFn == null) {
    throw new Error(
      "Signalr failed to initialize. Script 'jquery.signalR.js' is missing. Please make sure to include 'jquery.signalR.js' script."
    );
  }
  return hubConnectionFn;
}

@NgModule({
  providers: [
    {
      provide: SignalR,
      useValue: SignalR
    }
  ]
})
export class SignalRModule {
  public static forRoot(getSignalRConfiguration: () => void): ModuleWithProviders {
    return {
      ngModule: SignalRModule,
      providers: [
        {
          provide: SIGNALR_JCONNECTION_TOKEN,
          useFactory: getJConnectionFn
        },
        {
          provide: SIGNALR_CONFIGURATION,
          useFactory: getSignalRConfiguration
        },
        {
          deps: [SIGNALR_JCONNECTION_TOKEN, SIGNALR_CONFIGURATION, NgZone],
          provide: SignalR,
          useFactory: createSignalr
        }
      ]
    };
  }
  public static forChild(): ModuleWithProviders {
    throw new Error('forChild method not implemented');
  }
}

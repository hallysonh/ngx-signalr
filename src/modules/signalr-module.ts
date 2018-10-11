import { NgModule, ModuleWithProviders, NgZone, InjectionToken } from '@angular/core';
import { SignalR } from '../services/signalr';
import { SignalRConfiguration } from '../services/signalr.configuration';

const SIGNALR_CONFIGURATION = new InjectionToken('SIGNALR_CONFIGURATION');

export function createSignalr(configuration: SignalRConfiguration, zone: NgZone) {
  const jConnectionFn = getJConnectionFn();

  return new SignalR(configuration, zone, jConnectionFn);
}

function getJConnectionFn(): any {
  const hubConnectionFn = (window as any).jQuery.hubConnection;
  if (hubConnectionFn == null) {
    throw new Error(
      "Signalr failed to initialize. Script 'jquery.signalR.js' is missing. " + "Please make sure to include 'jquery.signalR.js' script."
    );
  }
  return hubConnectionFn;
}

@NgModule({
  providers: [{ provide: SignalR, useValue: SignalR }]
})
export class SignalRModule {
  public static forRoot(getSignalRConfiguration: () => void): ModuleWithProviders {
    return {
      ngModule: SignalRModule,
      providers: [
        {
          provide: SIGNALR_CONFIGURATION,
          useFactory: getSignalRConfiguration
        },
        {
          deps: [SIGNALR_CONFIGURATION, NgZone],
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

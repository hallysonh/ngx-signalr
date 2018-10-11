import { SignalRConfiguration } from '../../index';
import { ConnectionTransports } from '../../src/services/connection/connection.transports';

describe('SignalRConfiguration', () => {
  it('constructor should set defaults', () => {
    const configuration = new SignalRConfiguration();
    expect(configuration.logging).toBe(false, 'logging should be false');
    expect(configuration.hubName).toBe(null);
    expect(configuration.qs).toBe(null);
    expect(configuration.url).toBe(null);
    expect(configuration.transport).toBe(ConnectionTransports.auto, 'transport should be set to auto');
  });
});

import { Subject } from 'rxjs';
import { SignalRConnectionMockManager } from '../../../src/services/testing/signalr.connection.mock.manager';
import { SignalRConnectionMock } from '../../../src/services/testing/signalr.connection.mock';

describe('SignalRConnectionMockManager', () => {
  it('constructor should initialize', () => {
    const sut = new SignalRConnectionMockManager();
    expect(sut.errors$ instanceof Subject).toBeTruthy();
    expect(sut.status$ instanceof Subject).toBeTruthy();
    expect(sut.mock instanceof SignalRConnectionMock).toBeTruthy();
  });
});

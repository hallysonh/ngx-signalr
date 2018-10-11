import { ConnectionTransport } from './connection.transport';

const TRANSPORTS: ConnectionTransport[] = [
  new ConnectionTransport('foreverFrame'),
  new ConnectionTransport('longPolling'),
  new ConnectionTransport('serverSentEvents'),
  new ConnectionTransport('webSockets'),
  new ConnectionTransport('auto')
];

export const ConnectionTransports = {
  auto: TRANSPORTS[4],
  foreverFrame: TRANSPORTS[0],
  longPolling: TRANSPORTS[1],
  serverSentEvents: TRANSPORTS[2],
  webSockets: TRANSPORTS[3]
};

import { ConnectionStatus } from './connection.status';

const STATUSES: ConnectionStatus[] = [new ConnectionStatus(0), new ConnectionStatus(1), new ConnectionStatus(2), new ConnectionStatus(4)];

export const ConnectionStatuses = {
  connected: STATUSES[1],
  connecting: STATUSES[0],
  disconnected: STATUSES[3],
  reconnecting: STATUSES[2]
};

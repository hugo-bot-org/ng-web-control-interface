import * as io from 'socket.io-client';

import { SocketEventType } from '../events/socket-event-type.event';

export abstract class BaseRoom {
    protected socket: SocketIOClient.Socket;
    protected mainSocketAddress = '192.168.1.13:4000/';
    // protected mainSocketAddress = 'https://chatster-be.herokuapp.com/';

    protected appendToMainSocketAddress(roomId: string) {
        return this.mainSocketAddress + roomId;
    }

    /**
     * This method will be called once the connection is established
     */
    protected abstract onConnectionEstablished(): void;

    protected connectToSocket(connectionString?: string) {
        this.socket = io.connect(connectionString ? connectionString : this.mainSocketAddress);
        this.socket.on(SocketEventType.client.successfullyConnected, () => {
            this.onConnectionEstablished();
        });
    }

    protected disconnectFromSocket() {
        this.socket.disconnect();
    }

}

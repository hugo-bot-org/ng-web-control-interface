import * as io from 'socket.io-client';
import { Component, HostListener } from '@angular/core';
import { BaseRoom } from '../abstracts/BaseRoom.abstract';
import { SocketEventType } from '../events/socket-event-type.event';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseRoom {
    protected socket: SocketIOClient.Socket;

    private lightsOn = false;
    private arrows = {
        up: {
            key: 38,
            isPressed: false
        },
        left: {
            key: 37,
            isPressed: false
        },
        right: {
            key: 39,
            isPressed: false
        },
        down: {
            key: 40,
            isPressed: false
        }
    };

    public constructor() {
        super();
        this.connectToSocket();
    }

    @HostListener('document:keydown', ['$event'])
    public onKeydown(e) {
        switch (e.keyCode) {
            case this.arrows.down.key:
                if (this.arrows.down.isPressed) {
                    return;
                }

                this.arrows.down.isPressed = true;
                console.log('%cDown pressed', 'color: green');
                this.socket.emit(SocketEventType.motors.BWD);
                break;

            case this.arrows.up.key:
                if (this.arrows.up.isPressed) {
                    return;
                }

                this.arrows.up.isPressed = true;
                console.log('%cUp pressed', 'color: green');
                this.socket.emit(SocketEventType.motors.FWD);
                break;

            case this.arrows.left.key:
                if (this.arrows.left.isPressed) {
                    return;
                }

                this.arrows.left.isPressed = true;
                console.log('%cLeft pressed', 'color: green');
                this.socket.emit(SocketEventType.motors.LEFT);
                break;

            case this.arrows.right.key:
                if (this.arrows.right.isPressed) {
                    return;
                }

                this.arrows.right.isPressed = true;
                console.log('%cRight pressed', 'color: green');
                this.socket.emit(SocketEventType.motors.RIGHT);
                break;
        }
    }

    @HostListener('document:keyup', ['$event'])
    public onKeyup(e) {
        switch (e.keyCode) {
            case this.arrows.down.key:
                this.arrows.down.isPressed = false;
                console.log('%cDown released', 'color: red');
                this.socket.emit(SocketEventType.motors.STOP);
                break;

            case this.arrows.up.key:
                this.arrows.up.isPressed = false;
                console.log('%cUp released', 'color: red');
                this.socket.emit(SocketEventType.motors.STOP);
                break;

            case this.arrows.left.key:
                this.arrows.left.isPressed = false;
                console.log('%cLeft released', 'color: red');
                this.socket.emit(SocketEventType.motors.STOP);
                break;

            case this.arrows.right.key:
                this.arrows.right.isPressed = false;
                console.log('%cRight released', 'color: red');
                this.socket.emit(SocketEventType.motors.STOP);
                break;
        }
    }

    public toggleLights() {
        if (!this.lightsOn) {
            this.socket.emit(SocketEventType.lights.ON);
            this.lightsOn = true;
            return;
        }

        this.socket.emit(SocketEventType.lights.OFF);
        this.lightsOn = false;
    }

    protected onConnectionEstablished(): void {
        console.log('Connected!');
    }

}

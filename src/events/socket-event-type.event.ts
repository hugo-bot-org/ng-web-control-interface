export class SocketEventType {
    public static client = {
        successfullyConnected: 'client.successfully-connected'
    };

    public static cam = {
        takePic: 'cam.takepic',
        getPic: 'cam.getpic',
    }

    public static lights = {
        ON: 'lights.on',
        OFF: 'lights.off',
    }

    public static motors = {
        FWD: 'motors.fwd',
        BWD: 'motors.bwd',
        LEFT: 'motors.left',
        RIGHT: 'motors.right',
        STOP: 'motors.stop'
    }

    public static connection = 'connection';
    public static disconnect = 'disconnect';
}

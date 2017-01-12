import { JoyStickCommon } from './joystick.common';
export declare class JoyStick extends JoyStickCommon {
    private _android;
    readonly android: any;
    _createUI(): void;
    getPower(): number;
    getAngle(): number;
}

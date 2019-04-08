import { JoyStickCommon } from './joystick.common';
export declare class JoyStick extends JoyStickCommon {
    private _android;
    private _androidViewId;
    readonly android: any;
    createNativeView(): any;
    initNativeView(): void;
    disposeNativeView(): void;
    getPower(): number;
    getAngle(): number;
}

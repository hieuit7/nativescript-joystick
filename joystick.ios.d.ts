import { Color } from "color";
import { JoyStickCommon } from './joystick.common';
export declare class JoyStick extends JoyStickCommon {
    private _ios;
    private measuredWidth;
    ios: any;
    _nativeView: any;
    _createUI(): void;
    private updateAngle(angleRad);
    updatePadColor(color: Color): void;
    updateStickColor(color: Color): void;
    updateSize(size: any): void;
}

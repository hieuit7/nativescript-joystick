import { Color } from "tns-core-modules/color";
import { JoyStickCommon } from './joystick.common';
export declare class JoyStick extends JoyStickCommon {
    private _ios;
    readonly ios: any;
    createNativeView(): any;
    onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void;
    private updateAttributes;
    private calculatePower;
    private calculateAngle;
    updatePadColor(color: Color): void;
    updateStickColor(color: Color): void;
    updateSize(size: any): void;
}

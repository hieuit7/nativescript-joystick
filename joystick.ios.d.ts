import { Color } from "color";
import { JoyStickCommon } from './joystick.common';
export declare class JoyStick extends JoyStickCommon {
    private _ios;
    readonly ios: any;
    readonly _nativeView: any;
    _createUI(): void;
    onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void;
    private updateAttributes(x, y);
    private calculatePower(x, y);
    private calculateAngle(x, y);
    updatePadColor(color: Color): void;
    updateStickColor(color: Color): void;
    updateSize(size: any): void;
}

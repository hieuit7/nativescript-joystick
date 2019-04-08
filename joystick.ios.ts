import { Color } from "tns-core-modules/color";
import { layout } from "tns-core-modules/utils/utils";
import {
    JoyStickCommon,
    padColorProperty,
    buttonColorProperty,
    horizontalProperty,
    verticalProperty,
    angleProperty,
    powerProperty
} from './joystick.common';

declare var CCDJoystick, CGRectMake, CGSizeMake;

export class JoyStick extends JoyStickCommon {
    private _ios: any = null;

    get ios(): any {
        return this._ios;
    }

    public createNativeView() {
        let size = 200;

        let joystick = new CCDJoystick();
        this._ios = joystick;

        joystick.frame = CGRectMake(0, 0, size, size);
        joystick.backgroundColor = new Color("White").ios;
        joystick.substrateBorderColor = new Color("Gray").ios;
        joystick.substrateBorderWidth = 1.0;
        joystick.stickSize = CGSizeMake(size / 2, size / 2);
        joystick.stickColor = new Color("Red").ios;
        joystick.stickBorderColor = new Color("Black").ios;
        joystick.stickBorderWidth = 2.0;
        joystick.fade = 0.5;

        joystick.trackingHandler = (joystickNativeData) => {
            //Parse the attributes
            var x = joystickNativeData.valueForKey("x");
            var y = joystickNativeData.valueForKey("y");
            // Update the observable attributes
            this.updateAttributes(x, -y);
        }

        return this._ios;
    }

    public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
        let width = layout.getMeasureSpecSize(widthMeasureSpec);
        let height = layout.getMeasureSpecSize(heightMeasureSpec);

        let size = Math.min(width, height);

        this.updateSize(size);
        this.setMeasuredDimension(size, size);
    }

    private updateAttributes(x: number, y: number) {
        let angle = this.calculateAngle(x, y);
        angleProperty.nativeValueChange(this, angle);

        let power = this.calculatePower(x, y);
        powerProperty.nativeValueChange(this, power);

        horizontalProperty.nativeValueChange(this, x);
        verticalProperty.nativeValueChange(this, y);
    }

    private calculatePower(x, y): number {
        let power = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        return (power > 1) ? 1 : power;
    }

    private calculateAngle(x: number, y: number): number {
        return Math.atan2(y, -x) * 180 / Math.PI;
    }

    public updatePadColor(color: Color) {
        this.ios.backgroundColor = color;

    }

    public updateStickColor(color: Color) {
        this.ios.stickColor = color;
    }

    public updateSize(size) {
        this.ios.frame = CGRectMake(0, 0, size, size);
        this.ios.stickSize = CGSizeMake(size / 2, size / 2);

        this.width = size;
        this.height = size;
    }

    // padColorProperty property
    [padColorProperty.setNative](newValue: any) {
        if (Color.isValid(newValue)) {
            var iosColor = newValue.ios;
            this.updatePadColor(iosColor);
        } else {
            console.log("The PadColor Property: " + newValue + " is invalid.");
        }
    }

    // buttonColorProperty property
    [buttonColorProperty.setNative](newValue: any) {
        if (Color.isValid(newValue)) {
            let iosColor = newValue.ios;
            this.updateStickColor(iosColor);
        } else {
            console.log("The ButtonColor Property: " + newValue + " is invalid.");
        }
    }
}

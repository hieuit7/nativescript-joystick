import { Color } from "tns-core-modules/color";
import {
    JoyStickCommon,
    padColorProperty,
    buttonColorProperty,
    horizontalProperty,
    verticalProperty,
    angleProperty,
    powerProperty
} from './joystick.common';
declare let com: any;
declare let android: any;

export class JoyStick extends JoyStickCommon {
    private _android: any;
    private _androidViewId: number = -1;

    get android(): any {
        return this._android;
    }

    public createNativeView() {
        this._android = new com.erz.joysticklibrary.JoyStick(this._context);
        /* Add onChange EventListener */
        let ref = new WeakRef(this);

        this._android.setListener(new com.erz.joysticklibrary.JoyStick.JoyStickListener(
            // <Owned & com.erz.joysticklibrary.JoyStick.JoyStickListener>{
            {
                get owner() {
                    return ref.get();
                },
                onMove: function (nativeJoystick, angleRad, power) {
                    if (this.owner) {
                        //get the angle in Degrees
                        let angleDegrees = nativeJoystick.getAngleDegrees();
                        angleProperty.nativeValueChange(this.owner, angleDegrees);

                        // change power, so that all units are between -1 and 1
                        power /= 100;
                        powerProperty.nativeValueChange(this.owner, power);

                        let horizontal = -Math.cos(angleRad) * power;
                        horizontalProperty.nativeValueChange(this.owner, horizontal);

                        let vertical = Math.sin(angleRad) * power;
                        verticalProperty.nativeValueChange(this.owner, vertical);
                    }
                }
            }
        ))

        return this._android;
    }

    public initNativeView() {
        super.initNativeView();
        if (this._androidViewId < 0) {
            this._androidViewId = android.view.View.generateViewId();
        }

        this._android.setId(this._androidViewId);
    }

    public disposeNativeView() {
        if (this._android) {
            this._android = null;
        }
    }

    public getPower(): number {
        return this.android.getPower();
    }

    public getAngle(): number {
        return this.android.getAngleDegrees();
    }

    // padColorProperty property
    [padColorProperty.setNative](newValue: any) {
        if (Color.isValid(newValue)) {
            var droidColor = newValue.android;
            this.android.setPadColor(droidColor);
        } else {
            console.log("The PadColor Property: " + newValue + " is invalid.");
        }
    }

    // buttonColorProperty property
    [buttonColorProperty.setNative](newValue: any) {
        if (Color.isValid(newValue)) {
            var droidColor = newValue.android;
            this.android.setButtonColor(droidColor);
        } else {
            console.log("The ButtonColor Property: " + newValue + " is invalid.");
        }
    }
}

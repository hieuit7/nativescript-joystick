import {Color} from "color";
import {PropertyMetadata} from "ui/core/proxy";
//import {Owned} from "utils/utils";

import {JoyStickCommon} from './joystick.common';
import common = require("./joystick.common");
global.moduleMerge(common, exports);

declare var com: any;

export class JoyStick extends JoyStickCommon {
    private _android: any;

    get android(): any {
        return this._android;

    }

    public _createUI() {
        this._android = new com.erz.joysticklibrary.JoyStick(this._context);

        /* Add onChange EventListener */
        var ref = new WeakRef(this);
        var joystick = this;
        
        this._android.setListener( new com.erz.joysticklibrary.JoyStick.JoyStickListener(
            // <Owned & com.erz.joysticklibrary.JoyStick.JoyStickListener>{
            {
                get owner() {
                    return ref.get();
                },

                onMove: function (nativeJoystick, angleRad, power) {
                    if (this.owner) {
                        //get the angle in Degrees
                        var angleDegrees = nativeJoystick.getAngleDegrees();

                        //change power, so that all units are between -1 and 1
                        power /= 100;

                        joystick.set("angle", angleDegrees);
                        joystick.set("power", power);

                        var horizontal = -Math.cos(angleRad) * power;
                        var vertical = Math.sin(angleRad) * power;

                        joystick.set("horizontal", horizontal);
                        joystick.set("vertical", vertical);
                    }
                }
            }
        ))
    }

    public getPower(): number {
        return this._android.getPower();
    }

    public getAngle(): number {
        return this._android.getAngleDegrees();
    }
}

//padColorProperty property
function onPadColorPropertyPropertyChanged(data) {
    if(Color.isValid(data.newValue)){
        var mycomponent = data.object;
        var droidColor = new Color(data.newValue).android;
        mycomponent.android.setPadColor(droidColor);
    } else {
        console.log("The PadColor Property: " + data.newValue + " is invalid.");
    }
}
(<PropertyMetadata>common.JoyStickCommon.padColorProperty.metadata).onSetNativeValue = onPadColorPropertyPropertyChanged;

//buttonColorProperty property
function onButtonColorPropertyChanged(data) {
    if(Color.isValid(data.newValue)){
        var mycomponent = data.object;
        var droidColor = new Color(data.newValue).android;
        mycomponent.android.setButtonColor(droidColor);
    } else {
        console.log("The ButtonColor Property: " + data.newValue + " is invalid.");
    }
}
(<PropertyMetadata>common.JoyStickCommon.buttonColorProperty.metadata).onSetNativeValue = onButtonColorPropertyChanged;

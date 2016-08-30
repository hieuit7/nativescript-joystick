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

                onMove: function (nativeJoystick, angle, power) {
                    if (this.owner) {
                        //get the angle in Degrees
                        angle = nativeJoystick.getAngleDegrees();

                        joystick.set("angle", angle);
                        joystick.set("power", power);
                    }
                    else {
                        console.log("else");
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

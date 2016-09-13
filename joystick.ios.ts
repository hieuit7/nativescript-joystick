import {Color} from "color";
import {PropertyMetadata} from "ui/core/proxy";
import utils = require("utils/utils");
import {View} from "ui/core/view";

import {JoyStickCommon} from './joystick.common';
import common = require("./joystick.common");
global.moduleMerge(common, exports);

declare var  CCDJoystick, interop;

export class JoyStick extends JoyStickCommon {
    private _ios: any = null;

    get ios(): any {
        return this._ios;
    }

    get _nativeView(): any {
        if(!this._ios)
            this._createUI();

        return this._ios;
    }

    public _createUI() {
        var size = 200;

        var joystick = new CCDJoystick();
        this._ios = joystick;

        joystick.frame = CGRectMake(0, 0, size, size);
        joystick.backgroundColor = new Color("White").ios;
        joystick.substrateBorderColor = new Color("Gray").ios;
        joystick.substrateBorderWidth = 1.0;
        joystick.stickSize = CGSizeMake(size/2, size/2);
        joystick.stickColor = new Color("Red").ios;
        joystick.stickBorderColor = new Color("Black").ios;
        joystick.stickBorderWidth = 2.0;
        joystick.fade = 0.5;

        joystick.trackingHandler = (joystickNativeData) => {
            //Parse the attributes
            var nspointstr = joystickNativeData.valueForKey("velocity").toString();

            var charPos0 = nspointstr.indexOf("{")+1;
            var charPos1 = nspointstr.indexOf(",");
            var charPos2 = nspointstr.indexOf("}");

            var x = nspointstr.substring( nspointstr.indexOf("{")+1, nspointstr.indexOf(",") );
            var y = nspointstr.substring( nspointstr.indexOf(",")+2, nspointstr.indexOf("}") );

            // Update the observable attributes
            this.updateAttributes(x*100, -y*100);
        }
    }

    public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
        var width = utils.layout.getMeasureSpecSize(widthMeasureSpec);
        var height = utils.layout.getMeasureSpecSize(heightMeasureSpec);

        var size = Math.min(width, height);

        this.updateSize(size);
        this.setMeasuredDimension(size, size);
    }

    private updateAttributes(x: number, y: number) {
        this.set("horizontal", x);
        this.set("vertical", y);

        var power = this.calculatePower(x, y);
        this.set("power", power);

        var angle = this.calculateAngle(x, y);
        this.set("angle", angle);
    }

    private calculatePower(x, y): number {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }

    private calculateAngle(x: number, y: number): number {
        return Math.atan2(y, -x) * 180 / Math.PI;
    }

    public updatePadColor(color: Color) {
        this._ios.backgroundColor = color;

    }

    public updateStickColor(color: Color) {
        this._ios.stickColor = color;
    }

    public updateSize(size) {
        this._ios.frame = CGRectMake(0, 0, size, size);
        this._ios.stickSize = CGSizeMake(size/2, size/2);

        this.width = size;
        this.height = size;
    }
}

//padColorProperty property
function onPadColorPropertyPropertyChanged(data) {
    if(Color.isValid(data.newValue)){
        var mycomponent = data.object;
        var iosColor = new Color(data.newValue).ios;
        mycomponent.updatePadColor(iosColor);
    } else {
        console.log("The PadColor Property: " + data.newValue + " is invalid.");
    }
}
(<PropertyMetadata>common.JoyStickCommon.padColorProperty.metadata).onSetNativeValue = onPadColorPropertyPropertyChanged;

//buttonColorProperty property
function onButtonColorPropertyChanged(data) {
    if(Color.isValid(data.newValue)){
        var mycomponent = data.object;
        var iosColor = new Color(data.newValue).ios;
        mycomponent.updateStickColor(iosColor);
    } else {
        console.log("The ButtonColor Property: " + data.newValue + " is invalid.");
    }
}
(<PropertyMetadata>common.JoyStickCommon.buttonColorProperty.metadata).onSetNativeValue = onButtonColorPropertyChanged;

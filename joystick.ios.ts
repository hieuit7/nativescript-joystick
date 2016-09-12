import {Color} from "color";
import {PropertyMetadata} from "ui/core/proxy";
import utils = require("utils/utils");

import {JoyStickCommon} from './joystick.common';
import common = require("./joystick.common");
global.moduleMerge(common, exports);

declare var  CDJoystick, interop;


class TrackingHandlerImpl extends NSObject {
    private _owner: WeakRef<any>;

    public static initWithOwner(owner: WeakRef<any>): TrackingHandlerImpl {
        let handler = <TrackingHandlerImpl>TrackingHandlerImpl.new();
        handler._owner = owner;
        return handler;
    }

    public trackingHandler(args) {
        let owner = this._owner.get();
        if (owner) {
            console.log("Track");
            //owner._emit(common.Button.tapEvent);
        }
    }

    public static ObjCExposedMethods = {
        "trackingHandler": { returns: interop.types.void, params: [interop.types.id] }
    };
}


export class JoyStick extends JoyStickCommon {
    private _ios: any = null;
    private measuredWidth: number = 0;

    get ios(): any {
        return this._ios;
    }

    get _nativeView(): any {
        if(!this._ios)
            this._createUI();

        if(this.getMeasuredWidth() > this.measuredWidth) {
            this.measuredWidth = this.getMeasuredWidth();

            this.updateSize(this.measuredWidth);
        }

        return this._ios;
    }

    public _createUI() {
        var size = 200;

        var joystick = new CDJoystick();
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

        // joystick.trackingHandler = (jdata) => {
        //     console.log("tracking");
        // };

        joystick.trackingHandler = TrackingHandlerImpl.initWithOwner(new WeakRef(this));

        setTimeout( ()=> {
            debugger;
            console.log("Here");
            var js = this._ios;
            joystick.listen();
        }, 2000);
    }

    private updateAngle(angleRad) {
        if(angleRad === 0) {
            this.set("horizontal", 0);
            this.set("vertical", 0);
            this.set("angle", 0);
            this.set("power", 0);
        }
        else {
            var horizontal = Math.cos(angleRad) * 100;
            var vertical = -Math.sin(angleRad) * 100;

            this.set("horizontal", horizontal);
            this.set("vertical", vertical);
            this.set("angle", angleRad *180/Math.PI);
            this.set("power", 100);
        }
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

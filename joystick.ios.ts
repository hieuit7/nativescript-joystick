import {Color} from "color";
import {PropertyMetadata} from "ui/core/proxy";
import utils = require("utils/utils");

import {JoyStickCommon} from './joystick.common';
import common = require("./joystick.common");
global.moduleMerge(common, exports);

declare var JLJoystick, CGPointMake, UIColor;

export class JoyStick extends JoyStickCommon {
    private _ios: any = null;
    private measuredWidth: number = 0;

    get ios(): any {
        return this._ios;

    }

    get _nativeView(): any {

        if(this.width) {
            if(!this._ios) {
                // console.log("pw :" + (<any>this)._parent.getActualSize().width );
                // console.log("ph :" + (<any>this)._parent.getActualSize().height );
                this._createUI();
            }

        }
        console.log("w:" + this.width );
        console.log("ash:" + this.getActualSize().height );
        console.log("asw:" + this.getActualSize().width );

        return this._ios;
    }

    public _createUI() {
        console.log("Create UI");

        var size = (!isNaN(this.width)) ? this.width : 200;

        var backgroundColor = new Color("Green").ios;
        var stickColor = new Color("Red").ios;
        this._ios = JLJoystick.alloc().initWithLocationSizeBackgroundColorAndStickColor(CGPointMake(0, 0), size, backgroundColor, stickColor);


        var ball = NSMutableArray.alloc().initWithCapacity(1);
        ball.addObject(this._ios);
        var speed = 2;

        var joystick = this;
        var ref = new WeakRef(this);
        var oldAngleRad = 0;
        setInterval( ()=> {
            if(ref.get()) {
                var angleRad = ball.objectAtIndex(0).theAngle;
                if(angleRad !== oldAngleRad) {
                    joystick.updateAngle(angleRad);
                    oldAngleRad = angleRad;
                }
            }
        }, 200 );
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
        this._ios.subviews[0].backgroundColor = color;
    }

    public updateStickColor(color: Color) {
        this._ios.subviews[1].subviews[0].backgroundColor = color;
    }

    public alignSize() {
        var size = this.getMeasuredWidth();

        this.updatePadSize(size);
        this.updateStickSize(size/2);
    }

    public updatePadSize(size: number) {
        this._ios.subviews[0].frame = CGRectMake(0, 0, size, size);
        //this._ios.subviews[0].frame.layer.cornerRadius = size/2;
    }
    public updateStickSize(size: number) {
        var frame = this._ios.subviews[1].subviews[0].frame;
        this._ios.subviews[1].subviews[0].frame = CGRectMake(size/2, size/2, size, size);
        //this._ios.subviews[1].subviews[0].frame.layer.cornerRadius = size/2;
    }
}

//padColorProperty property
function onPadColorPropertyPropertyChanged(data) {
    debugger;
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
    debugger;
    if(Color.isValid(data.newValue)){
        var mycomponent = data.object;
        var iosColor = new Color(data.newValue).ios;
        mycomponent.updateStickColor(iosColor);
    } else {
        console.log("The ButtonColor Property: " + data.newValue + " is invalid.");
    }
}
(<PropertyMetadata>common.JoyStickCommon.buttonColorProperty.metadata).onSetNativeValue = onButtonColorPropertyChanged;

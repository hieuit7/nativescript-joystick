import {Property} from "ui/core/dependency-observable";
import {View} from "ui/core/view";
import {PropertyMetadata} from "ui/core/proxy";
import {Color} from "color";

export class JoyStickCommon extends View{
  public angle: number = 0;
  public power: number = 0;
  public horizontal: number = 0;
  public vertical: number = 0;

  constructor() {
    super()
  }

  //padColor property
  public static padColorProperty = new Property(
      "padColor",
      "JoyStickCommon",
      new PropertyMetadata(false)
  );
  get padColor(): Color {
      return this._getValue(JoyStickCommon.padColorProperty);
  }
  set padColor(value: Color) {
      this._setValue(JoyStickCommon.padColorProperty, value);
  }

  //buttonColor property
  public static buttonColorProperty = new Property(
      "buttonColor",
      "JoyStickCommon",
      new PropertyMetadata(false)
  );
  public get buttonColor(): Color {
      return this._getValue(JoyStickCommon.buttonColorProperty);
  }
  public set buttonColor(value: Color) {
      this._setValue(JoyStickCommon.buttonColorProperty, value);
  }

  /*

  //Set Background Image
  joyStick.setPadBackground(resId);

  //Set Button Image
  joyStick.setButtonDrawable(resId);

  //Set Button Scale
  joyStick.setButtonRadiusScale(scale);

  //Enable Button to Stay Put
  joyStick.enableStayPut(enable);

  //Set JoyStickListener
  joyStick.setListener(this);

  //JoyStickListener Interface
  public interface JoyStickListener {
          void onMove(JoyStick joyStick, double angle, double power);
  }
  */
}


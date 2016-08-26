import {Observable} from 'data/observable';
import {JoyStick} from 'nativescript-joystick';

export class HelloWorldModel extends Observable {
  public message: string;
  private joystick: JoyStick;

  constructor() {
    super();

    //this.joystick = new JoyStick();
    //this.message = this.joystick.message;
  }
}
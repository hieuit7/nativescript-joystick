import {Observable} from 'data/observable';

export class HelloWorldModel extends Observable {

  public angleLeft: number;
  public angleRight: number;
  public powerLeft: number;
  public powerRight: number;

  public horizontal: number;
  public vertical: number;
  constructor() {
    super();
  }
}
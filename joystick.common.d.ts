import { Property } from "ui/core/dependency-observable";
import { View } from "ui/core/view";
import { Color } from "color";
export declare class JoyStickCommon extends View {
    angle: number;
    power: number;
    constructor();
    static padColorProperty: Property;
    padColor: Color;
    static buttonColorProperty: Property;
    buttonColor: Color;
}

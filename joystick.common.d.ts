import { Property, View } from "tns-core-modules/ui/core/view";
export declare class JoyStickCommon extends View {
    angle: number;
    power: number;
    horizontal: number;
    vertical: number;
    padColor: any;
    buttonColor: any;
    constructor();
}
export declare const angleProperty: Property<JoyStickCommon, number>;
export declare const powerProperty: Property<JoyStickCommon, number>;
export declare const horizontalProperty: Property<JoyStickCommon, number>;
export declare const verticalProperty: Property<JoyStickCommon, number>;
export declare const padColorProperty: Property<JoyStickCommon, any>;
export declare const buttonColorProperty: Property<JoyStickCommon, any>;

import { Property, View } from "tns-core-modules/ui/core/view";
import { Color } from "tns-core-modules/color";

export class JoyStickCommon extends View {
    public angle: number = 0;
    public power: number = 0;
    public horizontal: number = 0;
    public vertical: number = 0;
    public padColor: any;
    public buttonColor: any;

    constructor() {
        super()
    }
}

export const angleProperty = new Property<JoyStickCommon, number>({
    name: 'angle',
    defaultValue: undefined,
    valueConverter: (value) => parseInt(value)
});
angleProperty.register(JoyStickCommon);

export const powerProperty = new Property<JoyStickCommon, number>({
    name: 'power',
    defaultValue: undefined,
    valueConverter: (value) => parseInt(value)
});
powerProperty.register(JoyStickCommon);

export const horizontalProperty = new Property<JoyStickCommon, number>({
    name: 'horizontal',
    defaultValue: undefined,
    valueConverter: (value) => parseInt(value)
});
horizontalProperty.register(JoyStickCommon);

export const verticalProperty = new Property<JoyStickCommon, number>({
    name: 'vertical',
    defaultValue: undefined,
    valueConverter: (value) => parseInt(value)
});
verticalProperty.register(JoyStickCommon);

export const padColorProperty = new Property<JoyStickCommon, any>({
    name: 'padColor',
    defaultValue: undefined,
    valueConverter: (value) => new Color(value)
});
padColorProperty.register(JoyStickCommon);

export const buttonColorProperty = new Property<JoyStickCommon, any>({
    name: 'buttonColor',
    defaultValue: undefined,
    valueConverter: (value) => new Color(value)
});
buttonColorProperty.register(JoyStickCommon);


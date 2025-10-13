import { FormElementType } from '../../enums/dinamic-form-element-type/dinamic-form-element-type.enum';
import {
    AbstractFormElement,
    AbstractFormElementOptions,
} from '../controls/abstract-form-element.model';

// TODO: isolate
export enum ButtonStyle {
    flat = '',
    elevated = 'elevated',
    outlined = 'outlined',
    filled = 'filled',
    tonal = 'tonal',
}

export type ButtonFormElementOptions = AbstractFormElementOptions & {
    icon: string;
    label: string;
    disabled?: boolean;
    style?: ButtonStyle;
};

export class ButtonFormElement extends AbstractFormElement {
    public override readonly type = FormElementType.button;
    public override readonly isButton = true;

    public icon: string;
    public label: string;
    public disabled: boolean;
    public readonly style: ButtonStyle;

    constructor(options: ButtonFormElementOptions) {
        super(options);
        this.icon = options.icon;
        this.label = options.label;
        this.disabled = options.disabled ?? false;
        this.style = options.style ?? ButtonStyle.flat;
    }
}

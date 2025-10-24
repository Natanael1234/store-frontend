import { ButtonStyle } from '../../../enums/button-style/button-style.enum';
import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { AbstractFormElementOptions } from '../../abstract-form-element-options.interface';
import { AbstractFormElement } from '../../abstract-form-element.model';

type ButtonFormElementOptions = AbstractFormElementOptions & {
    icon?: string;
    label?: string;
    disabled?: boolean;
    style?: ButtonStyle;
    clickCallback?: (event: MouseEvent) => void;
};

export class ButtonFormElement extends AbstractFormElement {
    public override readonly type = FormElementType.button;
    public icon?: string;
    public label?: string;
    public disabled: boolean;
    public readonly style: ButtonStyle;
    // TODO: test
    public clickCallback?: (event: MouseEvent) => void;

    constructor(options: ButtonFormElementOptions) {
        super(options);
        this.icon = options.icon;
        this.label = options.label;
        this.disabled = options.disabled ?? false;
        this.style = options.style ?? ButtonStyle.flat;
        this.clickCallback = options.clickCallback;
    }
}

import { Icon } from '../../../../../enums/icons/icons.enum';
import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import {
    AbstractFormElementModel,
    AbstractFormElementOptions,
} from '../../abstract/abstract-form-element.model';
import { ButtonStyle } from '../enum/button-style.enum';

type ButtonFormElementOptions = AbstractFormElementOptions & {
    icon?: Icon;
    label?: string;
    style?: ButtonStyle;
    autofocus?: boolean;
    clickCallback?: (event: MouseEvent) => void;
};

export class ButtonModel extends AbstractFormElementModel {
    public override readonly type = FormElementType.button;
    public icon?: Icon;
    public label: string;
    public readonly style: ButtonStyle;
    public autofocus?: boolean;
    // TODO: test
    public clickCallback?: (event: MouseEvent) => void;

    constructor(options: ButtonFormElementOptions) {
        super(options);
        this.icon = options.icon;
        this.label = options.label ?? '';
        this.style = options.style ?? ButtonStyle.text;
        this.autofocus = options.autofocus ?? false;
        this.clickCallback = options.clickCallback;
    }
}

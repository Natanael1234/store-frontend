import { FormElementType } from '../../enums/dinamic-form-element-type/dinamic-form-element-type.enum';
import {
    AbstractFormElement,
    AbstractFormElementOptions,
} from '../controls/abstract-form-element.model';

export type LabelFormElementOptions = AbstractFormElementOptions & {
    value: string;
};

export class LabelFormElement extends AbstractFormElement {
    public override readonly type = FormElementType.label;
    public override readonly isLabel = true;

    value: string;

    constructor(options: LabelFormElementOptions) {
        super(options);
        this.value = options.value;
    }
}

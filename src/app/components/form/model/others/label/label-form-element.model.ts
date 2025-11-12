import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { AbstractFormElementOptions } from '../../abstract-form-element-options.interface';
import { AbstractFormElementModel } from '../../abstract-form-element.model';

type LabelFormElementOptions = AbstractFormElementOptions & {
    value: string;
};

export class LabelModel extends AbstractFormElementModel {
    public override readonly type = FormElementType.label;
    value: string;

    constructor(options: LabelFormElementOptions) {
        super(options);
        this.value = options.value;
    }
}

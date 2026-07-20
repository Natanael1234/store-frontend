import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import {
    AbstractFormControlModel,
    AbstractFormControlOptions,
} from '../../abstract/abstract-form-control.model';

type CheckboxOptionsFormElementOptions = AbstractFormControlOptions & {};

export class CheckboxModel extends AbstractFormControlModel {
    public override readonly type = FormElementType.checkbox;

    constructor(options: CheckboxOptionsFormElementOptions) {
        super(options);
    }
}

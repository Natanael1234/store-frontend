import { FormElementType } from '../../enums/form-element-type/form-element-type.enum';
import {
    AbstractFormControl,
    AbstractFormControlOptions,
} from './abstract-form-control.model';

export type CheckBoxOptions = AbstractFormControlOptions & {
    value?: boolean;
};

export class CheckboxElement extends AbstractFormControl {
    public override readonly type = FormElementType.checkbox;
    constructor(options: CheckBoxOptions) {
        super(options);
    }
}

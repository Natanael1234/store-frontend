import { FormElementType } from '../../../../enums/form-element-type/form-element-type.enum';
import { AbstractFormControl } from '../../input/abstract/abstract-form-control.model';

export class CheckboxElement extends AbstractFormControl {
    public override readonly type = FormElementType.checkbox;
}

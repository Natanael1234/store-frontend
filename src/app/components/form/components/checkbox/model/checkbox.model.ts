import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { AbstractFormControlModel } from '../../abstract/abstract-form-control.model';

export class CheckboxModel extends AbstractFormControlModel {
    public override readonly type = FormElementType.checkbox;
}

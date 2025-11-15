import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { AbstractFormElementModel } from '../../abstract/abstract-form-element.model';

export class DividerModel extends AbstractFormElementModel {
    public override readonly type = FormElementType.divider;
}

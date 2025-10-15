import { FormElementType } from '../../enums/form-element-type/form-element-type.enum';
import { AbstractFormElement } from '../controls/abstract-form-element.model';

export class DividerFormElement extends AbstractFormElement {
    public override readonly type = FormElementType.divider;
}

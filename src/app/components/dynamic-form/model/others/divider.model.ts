import { FormElementType } from '../../enums/dinamic-form-element-type/dinamic-form-element-type.enum';
import { AbstractFormElement } from '../controls/abstract-form-element.model';

export class DividerFormElement extends AbstractFormElement {
    public override readonly type = FormElementType.divider;
    public override readonly isDivider = true;
}

import { FormElementType } from '../../../../enums/form-element-type/form-element-type.enum';
import { OptativeFormControl } from '../optative-element.model';

export class RadioButtons extends OptativeFormControl {
    public override readonly type = FormElementType.radioButtons;
}

import { FormElementType } from '../../enums/dinamic-form-element-type/dinamic-form-element-type.enum';
import { OptativeFormControl } from './optative-element.model';

export class Radios extends OptativeFormControl {
    public override readonly type = FormElementType.radioButtons;
    public override readonly isRadios = true;
}

import { FormElementType } from '../../enums/form-element-type/form-element-type.enum';
import { OptativeFormControl } from './optative-element.model';

export class Select extends OptativeFormControl {
    public override readonly type = FormElementType.select;
    public override readonly hasFormfield: boolean = true;
    public override readonly isSelect = true;
}

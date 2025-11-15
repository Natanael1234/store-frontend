import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { OptativeFormControl } from '../../abstract/optative/model/optative-element.model';

export class SelectModel extends OptativeFormControl {
    public override readonly type = FormElementType.select;
}

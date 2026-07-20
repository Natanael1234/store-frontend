import {
    AbstractFormElementModel,
    AbstractFormElementOptions,
} from '../../components/abstract/abstract-form-element.model';
import { FormElementType } from '../../enums/form-element-type/form-element-type.enum';

type ButtonFormElementOptions = AbstractFormElementOptions & {};

export class SpacerModel extends AbstractFormElementModel {
    public override type = FormElementType.spacer;
}

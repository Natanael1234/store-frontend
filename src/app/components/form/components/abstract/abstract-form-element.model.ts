import { ColSize } from '../../../../types/col-size.type';
import { FormElementType } from '../../enums/form-element-type/form-element-type.enum';

export interface AbstractFormElementOptions {
    id?: string;
    colSize?: ColSize;
    readOnly?: boolean;
}

export abstract class AbstractFormElementModel {
    public abstract type: FormElementType;
    public id?: string;
    public colSize?: ColSize;

    constructor(options: AbstractFormElementOptions) {
        this.id = options.id;
        this.colSize = options.colSize;
    }
}

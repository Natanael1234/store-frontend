import { FormElementType } from '../../enums/form-element-type/form-element-type.enum';

export type ColSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type ColOffset = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export interface AbstractFormElementOptions {
    id?: string;
    colSize?: ColSize;
    colOffset?: ColOffset;
    breakLine?: boolean;
    readOnly?: boolean;
}

export abstract class AbstractFormElementModel {
    public abstract type: FormElementType;
    public id?: string;
    public colSize?: ColSize;
    public colOffset?: ColOffset;
    public breakLine: boolean;

    constructor(options: AbstractFormElementOptions) {
        this.id = options.id;
        this.colSize = options.colSize;
        this.colOffset = options.colOffset;
        this.breakLine = options.breakLine ?? false;
    }
}

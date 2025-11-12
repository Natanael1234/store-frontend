import { FormElementType } from '../enums/form-element-type/form-element-type.enum';
import {
    AbstractFormElementOptions,
    ColOffset,
    ColSize,
} from './abstract-form-element-options.interface';

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

import { FormElementType } from '../../enums/form-element-type/form-element-type.enum';

export interface AbstractFormElementOptions {
    id?: string;
}

export abstract class AbstractFormElement {
    public abstract type: FormElementType;
    public id?: string;

    constructor(options: AbstractFormElementOptions) {
        this.id = options.id;
    }
}

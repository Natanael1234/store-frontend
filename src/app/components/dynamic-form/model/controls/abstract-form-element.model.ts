import { FormElementType } from '../../enums/dinamic-form-element-type/dinamic-form-element-type.enum';

export interface AbstractFormElementOptions {
    id?: string;
}

export abstract class AbstractFormElement {
    /** HTML element type.  */
    public abstract type: FormElementType;
    public id?: string;
    public readonly isTypeable: boolean = false;
    public readonly isFormControl: boolean = false;
    public readonly isInput: boolean = false;
    public readonly isTextArea: boolean = false;
    public readonly isSelect: boolean = false;
    public readonly isCheckbox: boolean = false;
    public readonly isRadios: boolean = false;
    public readonly hasFormfield: boolean = false;
    public readonly isButton: boolean = true;
    public readonly isDivider: boolean = false;
    public readonly isLabel: boolean = false;

    constructor(options: AbstractFormElementOptions) {
        this.id = options.id;
    }
}

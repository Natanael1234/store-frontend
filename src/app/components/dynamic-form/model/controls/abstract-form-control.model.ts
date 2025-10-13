import { FormControl } from '@angular/forms';
import {
    AbstractFormElement,
    AbstractFormElementOptions,
} from './abstract-form-element.model';

export type AbstractFormControlOptions = AbstractFormElementOptions & {
    label?: string;
    name?: string;
    value?: any;
    required?: boolean;
    focusable?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    control: FormControl;
};

export abstract class AbstractFormControl extends AbstractFormElement {
    public label?: string;
    public name?: string;
    public required?: boolean;
    public focusable?: boolean;
    public readonly?: boolean;
    public override readonly isFormControl: boolean = true;
    public readonly control: FormControl;

    constructor(options: AbstractFormControlOptions) {
        super(options);
        this.label = options.label;
        this.name = options.name;
        this.required = options.required || false;
        this.focusable = options.focusable || true;
        this.readonly = options.readonly || false;
        this.control = options.control;
    }
}

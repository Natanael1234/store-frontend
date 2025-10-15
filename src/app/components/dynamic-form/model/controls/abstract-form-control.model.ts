import { FormControl } from '@angular/forms';
import {
    AbstractFormElement,
    AbstractFormElementOptions,
} from './abstract-form-element.model';

export type AbstractFormControlOptions = AbstractFormElementOptions & {
    label?: string;
    name?: string;
    focusable?: boolean;
    readonly?: boolean;
    control: FormControl;
    errorMessageFn?: () => string | undefined;
};

export abstract class AbstractFormControl extends AbstractFormElement {
    public label?: string;
    public name?: string;
    public focusable?: boolean;
    public readonly?: boolean;
    public override readonly isFormControl: boolean = true;
    public readonly control: FormControl;
    public error?: () => string | undefined;

    constructor(options: AbstractFormControlOptions) {
        super(options);
        this.label = options.label;
        this.name = options.name;
        this.focusable = options.focusable || true;
        this.readonly = options.readonly || false;
        this.control = options.control;
        this.error = options.errorMessageFn;
    }
}

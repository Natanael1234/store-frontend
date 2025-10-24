import { FormControl } from '@angular/forms';
import { AbstractFormElement } from '../../../abstract-form-element.model';
import { AbstractFormControlOptions } from '../../abstract-form-control.type';

export abstract class AbstractFormControl extends AbstractFormElement {
    public label?: string;
    public name?: string;
    public focusable?: boolean;
    public readonly?: boolean;
    public readonly control: FormControl;
    public errorMessageFn?: () => string | undefined;

    constructor(options: AbstractFormControlOptions) {
        super(options);
        this.label = options.label;
        this.name = options.name;
        this.focusable = options.focusable || true;
        this.readonly = options.readonly || false;
        this.control = options.control;
        this.errorMessageFn = options.errorMessageFn;
    }
}

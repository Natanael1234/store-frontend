import { FormControl } from '@angular/forms';
import { AbstractFormElementModel } from '../../../abstract-form-element.model';
import { AbstractFormControlOptions } from '../../abstract-form-control.type';

export abstract class AbstractFormControlModel extends AbstractFormElementModel {
    public label?: string;
    public focusable?: boolean;
    public readonly control: FormControl;
    public errorMessageFn?: () => string | undefined;

    constructor(options: AbstractFormControlOptions) {
        super(options);
        this.label = options.label;
        this.focusable = options.focusable ?? true;
        this.control = options.control;
        this.errorMessageFn = options.errorMessageFn;
    }
}

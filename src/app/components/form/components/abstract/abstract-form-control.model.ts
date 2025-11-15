import { FormControl } from '@angular/forms';
import { AbstractFormControlOptions } from './abstract-form-control.type';
import { AbstractFormElementModel } from './abstract-form-element.model';

export abstract class AbstractFormControlModel extends AbstractFormElementModel {
    public label?: string;
    public focusable?: boolean;
    public readonly control: FormControl;

    constructor(options: AbstractFormControlOptions) {
        super(options);
        this.label = options.label;
        this.focusable = options.focusable ?? true;
        this.control = options.control;
    }
}

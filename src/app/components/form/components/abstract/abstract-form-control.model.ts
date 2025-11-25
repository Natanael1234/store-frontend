import { FormControl } from '@angular/forms';
import {
    AbstractFormElementModel,
    AbstractFormElementOptions,
} from './abstract-form-element.model';

export type AbstractFormControlOptions = AbstractFormElementOptions & {
    label?: string;
    focusable?: boolean;
    readOnly?: boolean;
    control: FormControl;
};

export abstract class AbstractFormControlModel extends AbstractFormElementModel {
    public label?: string;
    public focusable: boolean;
    public readOnly: boolean;
    public readonly control: FormControl;

    constructor(options: AbstractFormControlOptions) {
        super(options);
        this.label = options.label;
        this.focusable = options.focusable ?? true;
        this.readOnly = options.readOnly ?? false;
        this.control = options.control;
    }
}

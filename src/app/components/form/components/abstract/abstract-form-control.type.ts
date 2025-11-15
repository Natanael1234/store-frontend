import { FormControl } from '@angular/forms';
import { AbstractFormElementOptions } from '../../components/abstract/abstract-form-element-options.interface';

export type AbstractFormControlOptions = AbstractFormElementOptions & {
    label?: string;
    focusable?: boolean;
    readonly?: boolean;
    control: FormControl;
};

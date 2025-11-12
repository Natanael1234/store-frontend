import { FormControl } from '@angular/forms';
import { AbstractFormElementOptions } from '../abstract-form-element-options.interface';

export type AbstractFormControlOptions = AbstractFormElementOptions & {
    label?: string;
    focusable?: boolean;
    readonly?: boolean;
    control: FormControl;
    errorMessageFn?: () => string | undefined;
};

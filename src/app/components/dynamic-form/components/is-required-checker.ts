import { FormControl } from '@angular/forms';
import { AbstractFormControl } from '../model/controls/input/abstract/abstract-form-control.model';

/// TODO: test
export function isRequired(e?: AbstractFormControl): boolean {
    if (!e) return false;
    const control = (e as any)['control'] as FormControl;
    if (!control) return false;
    if (!control.validator) return false;
    const validator = control.validator({} as any);
    if (!validator) return false;
    return validator && validator['required'] === true;
}

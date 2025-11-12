import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxValidator(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }
        const value = parseFloat(control.value);
        if (isNaN(value)) {
            return null;
        }
        if (value > max) {
            return { min: { message: `O valor máximo permitido é ${max}.` } };
        }
        return null;
    };
}

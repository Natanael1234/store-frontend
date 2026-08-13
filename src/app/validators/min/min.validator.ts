import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minValidator(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }
        const value = parseFloat(control.value);
        if (isNaN(value)) {
            return null;
        }
        if (value < min) {
            return { min: { message: `O valor mínimo permitido é ${min}.` } };
        }
        return null;
    };
}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value == null) {
            return null;
        }
        let value = control.value;
        if (typeof value != 'string' && typeof value != 'number') {
            return null;
        }
        if (typeof value == 'number') {
            value = String(value);
        }
        if (typeof value != 'string') {
            return null;
        }
        if (value.length < minLength) {
            return {
                minLength: {
                    message: `O comprimento mínimo permitido é ${minLength}.`,
                },
            };
        }
        return null;
    };
}

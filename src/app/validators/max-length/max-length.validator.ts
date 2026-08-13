import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxLengthValidator(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value == null) {
            return null;
        }
        let value = control.value;
        if (typeof value == 'number') {
            value = String(value);
        }
        if (typeof value != 'string') {
            return null;
        }
        if (value.length > maxLength) {
            return {
                maxLength: {
                    message: `O comprimento máximo permitido é ${maxLength}.`,
                },
            };
        }
        return null;
    };
}

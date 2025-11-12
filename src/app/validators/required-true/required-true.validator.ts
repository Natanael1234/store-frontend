import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// TODO: user required instead
export function requiredTrueValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value !== true) {
            return {
                requiredTrue: { message: `O campo é obrigatório.` },
            };
        }
        return null;
    };
}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function requiredValidator(options?: {
    allowNull?: boolean;
    allowEmptyString?: boolean;
    allowSpaceFilledString?: boolean;
    allowFalse?: boolean;
}): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const allowNull = options?.allowNull ?? false;
        const allowEmptyString = options?.allowEmptyString ?? false;
        const allowSpaceFilledString = options?.allowSpaceFilledString ?? false;
        const allowFalse = options?.allowFalse ?? false;
        if (!allowNull && control.value === null) {
            return { required: { message: `O campo é obrigatório.` } };
        }
        if (typeof control.value == 'string') {
            if (!allowEmptyString && control.value === '') {
                return { required: { message: `O campo é obrigatório.` } };
            }
            if (!allowSpaceFilledString && /^\s+$/.test(control.value)) {
                return { required: { message: `O campo é obrigatório.` } };
            }
        }
        if (!allowFalse && control.value === false) {
            return { required: { message: `O campo é obrigatório.` } };
        }
        return null;
    };
}

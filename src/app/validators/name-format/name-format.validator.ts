import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nameFormatValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const name = control.value;
        if (typeof name != 'string') {
            return null;
        }
        if (name == null || name?.trim() === '') {
            return null;
        }
        // TODO: make a name mask which removes spaces  name.replace(/\s\s+/g, ' ').trim();
        const nameRegex =
            /^(\s*[\p{L}\p{N}\p{P}]+(\s+[\p{L}\p{N}\p{P}]+)*\s*)?$/u;
        // /^[\p{L}\p{N}\s.'-]+$/u;

        if (!nameRegex.test(name)) {
            return { name: { message: 'Nome inválido.' } };
        }

        return null;
    };
}

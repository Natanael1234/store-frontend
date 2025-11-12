import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { EmailConstants } from '../../constants/email/email.constants';

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }
        const email = control.value;

        const emailRegex = /^\s*[^\s@]+@[^\s@]+\.[^\s@]+\s*$/;
        if (!emailRegex.test(email)) {
            return { email: { message: `E-mail inválido.` } };
        }
        const [head, tail] = email.split('@');
        if (
            head.length < EmailConstants.MIN_LOCAL_LENGTH ||
            head.length > EmailConstants.MAX_LOCAL_LENGTH
        ) {
            return { email: { message: `E-mail inválido.` } };
        }
        if (tail.length > EmailConstants.MAX_DOMAIN_LENGTH - 1) {
            return { email: { message: `E-mail inválido.` } };
        }
        if (email.length > EmailConstants.MAX_LENGTH) {
            return { email: { message: `E-mail inválido.` } };
        }

        return null;
    };
}

import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { EmailConstants } from '@constants/email/email.constants';
import { requiredValidator } from '@validators/required/required.validator';

function _basicEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }
        const emailRegex = /^\s*[^\s@]+@[^\s@]+\.[^\s@]+\s*$/;
        if (!emailRegex.test(control.value)) {
            return { email: { message: `E-mail inválido.` } };
        }
        const [head, tail] = control.value.split('@');
        if (
            head.length < EmailConstants.MIN_LOCAL_LENGTH ||
            head.length > EmailConstants.MAX_LOCAL_LENGTH
        ) {
            return { email: { message: `E-mail inválido.` } };
        }
        if (tail.length > EmailConstants.MAX_DOMAIN_LENGTH - 1) {
            return { email: { message: `E-mail inválido.` } };
        }
        if (control.value.length > EmailConstants.MAX_LENGTH) {
            return { email: { message: `E-mail inválido.` } };
        }
        return null;
    };
}

export function emailValidator(args?: { required?: boolean }): ValidatorFn {
    if (args?.required) {
        return Validators.compose([
            requiredValidator({
                allowNull: false,
                allowEmptyString: false,
                allowSpaceFilledString: false,
                allowFalse: false,
            }),
            _basicEmailValidator(),
        ])!;
    } else {
        return Validators.compose([_basicEmailValidator()])!;
    }
}

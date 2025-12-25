import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { UserConfigs } from '../../configs/user/user.configs';
import { PasswordConstants } from '../../constants/password/password.constants';
import { PasswordMessage } from '../../messages/password/password.messages';
import { maxLengthValidator } from '../max-length/max-length.validator';
import { minLengthValidator } from '../min-length/min-length.validator';
import { requiredValidator } from '../required/required.validator';

const _PasswordMessage = new PasswordMessage({
    minLength: UserConfigs.PASSWORD_MIN_LENGTH,
    maxLength: UserConfigs.PASSWORD_MAX_LENGTH,
});

const isStringLike = (v: unknown): v is string =>
    typeof v === 'string' || v instanceof String;

const toStringSafe = (v: unknown): string => String(v);

export function baseStrongPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password: string = control.value;

        if (!password) {
            return null;
        }

        if (!isStringLike(password)) {
            return { invalid: { message: _PasswordMessage.INVALID } };
        }

        // lowercase letter
        if (!/[a-z]/.test(password)) {
            return { weakPassword: { message: _PasswordMessage.STRONG } };
        }

        // uppercase letter
        if (!/[A-Z]/.test(password)) {
            return { weakPassword: { message: _PasswordMessage.STRONG } };
        }

        // digit
        if (!/\d/.test(password)) {
            return { weakPassword: { message: _PasswordMessage.STRONG } };
        }

        // special character
        if (!/[!@#$%^&*()\-_+=]/.test(password)) {
            return { weakPassword: { message: _PasswordMessage.STRONG } };
        }

        if (/\s/.test(password)) {
            return { invalidPassword: { message: _PasswordMessage.INVALID } };
        }

        return null;
    };
}

export function strongPasswordValidator(): ValidatorFn {
    return Validators.compose([
        requiredValidator({
            allowNull: false,
            allowEmptyString: false,
            allowSpaceFilledString: false,
            allowFalse: true,
        }),
        minLengthValidator(PasswordConstants.MIN_LENGTH),
        maxLengthValidator(PasswordConstants.MAX_LENGTH),
        baseStrongPasswordValidator(),
    ])!;
}

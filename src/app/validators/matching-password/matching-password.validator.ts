import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { UserConfigs } from '../../configs/user/user.configs';
import { PasswordMessage } from '../../messages/password/password.messages';
import { requiredValidator } from '../required/required.validator';

const _PasswordMessage = new PasswordMessage({
    minLength: UserConfigs.PASSWORD_MIN_LENGTH,
    maxLength: UserConfigs.PASSWORD_MAX_LENGTH,
});

function baseMatchingPasswordFieldsValidator(
    fieldToMatch: string,
): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control) {
            return null;
        }

        const value = control.value;
        if (value === false) {
            return { invalid: { message: _PasswordMessage.INVALID } };
        }
        const matchingControl = control.root.get(fieldToMatch);
        if (!matchingControl) {
            return null;
        }
        if (matchingControl && value !== matchingControl.value) {
            return {
                matchingFields: { message: _PasswordMessage.DONT_MATCHES },
            };
        }
        return null;
    };
}

export function matchingPasswordValidator(fieldToMatch: string): ValidatorFn {
    return Validators.compose([
        requiredValidator({
            allowNull: false,
            allowEmptyString: false,
            allowSpaceFilledString: false,
            allowFalse: true, // TODO: verify type
        }),
        baseMatchingPasswordFieldsValidator(fieldToMatch),
    ])!;
}

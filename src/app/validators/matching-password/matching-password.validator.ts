import {
    AbstractControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { UserConfigs } from '@configs/user/user.configs';
import { PasswordMessage } from '@messages/password/password.messages';
import { requiredValidator } from '@validators/required/required.validator';

const _PasswordMessage = new PasswordMessage({
    minLength: UserConfigs.PASSWORD_MIN_LENGTH,
    maxLength: UserConfigs.PASSWORD_MAX_LENGTH,
});

function getMachingControl(control: AbstractControl, fieldToMatch: string) {
    const formGroup = control.parent as FormGroup;
    const matchingControl = formGroup?.get(fieldToMatch);
    return matchingControl;
}

function baseMatchingPasswordFieldsValidator(
    fieldToMatch: string,
): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control) {
            return null;
        }

        if (control.value === false) {
            return { invalid: { message: _PasswordMessage.INVALID } };
        }

        const matchingControl = getMachingControl(control, fieldToMatch);
        if (!matchingControl) {
            return null;
        }
        const valuesMatches = control.value === matchingControl.value;
        if (valuesMatches) {
            return null;
        }
        return {
            matchingFields: { message: _PasswordMessage.DONT_MATCHES },
        };
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

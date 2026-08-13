import { ValidatorFn, Validators } from '@angular/forms';
import { maxLengthValidator } from '@validators/max-length/max-length.validator';
import { minLengthValidator } from '@validators/min-length/min-length.validator';
import { nameFormatValidator } from '@validators/name-format/name-format.validator';
import { requiredValidator } from '@validators/required/required.validator';

export function nameValidator(args?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
}): ValidatorFn {
    const required = args?.required ?? true;
    const minLength = args?.minLength;
    const maxLength = args?.maxLength;

    const validators = [];
    if (required) {
        validators.push(
            requiredValidator({
                allowNull: false,
                allowEmptyString: false,
                allowSpaceFilledString: false,
                allowFalse: false,
            }),
        );
    }
    validators.push(nameFormatValidator());
    if (minLength ?? false) {
        validators.push(minLengthValidator(minLength!));
    }
    if (maxLength ?? false) {
        validators.push(maxLengthValidator(maxLength!));
    }
    return Validators.compose(validators)!;
}

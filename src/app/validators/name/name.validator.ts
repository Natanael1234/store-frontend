import { ValidatorFn, Validators } from '@angular/forms';
import { maxLengthValidator } from '../max-length/max-length.validator';
import { minLengthValidator } from '../min-length/min-length.validator';
import { nameFormatValidator } from '../name-format/name-format.validator';
import { requiredValidator } from '../required/required.validator';

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

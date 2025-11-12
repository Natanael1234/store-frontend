import { ValidatorFn, Validators } from '@angular/forms';
import { maxLengthValidator } from '../max-length/max-length.validator';
import { minLengthValidator } from '../min-length/min-length.validator';
import { nameFormatValidator } from '../name-format/name-format.validator';
import { requiredValidator } from '../required/required.validator';

export function nameValidator(options?: {
    required?: boolean;
    minlength?: number;
    maxlength?: number;
}): ValidatorFn {
    const required = options?.required ?? true;
    const minlength = options?.minlength;
    const maxlength = options?.maxlength;

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
    if (minlength ?? false) {
        validators.push(minLengthValidator(minlength!));
    }
    if (maxlength ?? false) {
        validators.push(maxLengthValidator(maxlength!));
    }
    return Validators.compose(validators)!;
}

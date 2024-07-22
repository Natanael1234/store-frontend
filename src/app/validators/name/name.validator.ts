import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserConfigs } from '../../configs/user/user.configs';

export function nameValidator(options?: {
  required?: boolean;
  minlength?: number;
  maxlength?: number;
}): ValidatorFn {
  options = options || {
    required: false,
    minlength: 0,
    maxlength: Number.MAX_SAFE_INTEGER,
  };

  return (control: AbstractControl): ValidationErrors | null => {
    const name = control.value;

    const normalizedName =
      name === null ? name : name.replace(/\s\s+/g, ' ').trim();

    if (options.required) {
      if (!normalizedName) {
        return { required: true };
      }
    } else {
      if (normalizedName === null) {
        return null;
      }
    }

    if (options.minlength !== null && options.minlength !== undefined) {
      if (normalizedName.length < options.minlength) {
        return { minlength: true };
      }
    }

    if (options.maxlength !== null && options.maxlength !== undefined) {
      if (normalizedName.length > options.maxlength) {
        return { maxlength: true };
      }
    }

    const nameRegex = /^(\s*[\p{L}\p{N}\p{P}]+(\s+[\p{L}\p{N}\p{P}]+)*\s*)?$/u;
    if (!nameRegex.test(name)) {
      return { name: true };
    }

    return null;
  };
}

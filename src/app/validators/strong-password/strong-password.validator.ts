import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PasswordConstants } from '../../constants/password/password.constants';

export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password: string = control.value;

    if (!password) {
      return { required: true };
    }

    // min length
    if (password.length < PasswordConstants.MIN_LENGTH) {
      return { minlength: true };
    }

    // max length
    if (password.length > PasswordConstants.MAX_LENGTH) {
      return { maxlength: true };
    }

    // lowercase letter
    if (!/[a-z]/.test(password)) {
      return { weakPassword: true };
    }

    // uppercase letter
    if (!/[A-Z]/.test(password)) {
      return { weakPassword: true };
    }

    // digit
    if (!/\d/.test(password)) {
      return { weakPassword: true };
    }

    // special character
    if (!/[!@#$%^&*()\-_+=]/.test(password)) {
      return { weakPassword: true };
    }

    if (/\s/.test(password)) {
      return { invalidPassword: true };
    }

    return null;
  };
}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export type RemoteValidationContext = {
  remoteError?: string | null;
};

export function remoteValidator(context: RemoteValidationContext): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (context.remoteError) {
      return { remote: true };
    }
    return null;
  };
}

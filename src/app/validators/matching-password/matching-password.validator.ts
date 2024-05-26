import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchingFieldsValidator(fieldToMatch: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control) {
      return null;
    }
    const fieldValue = control.value;
    const matchingControl = control.root.get(fieldToMatch);

    if (matchingControl && fieldValue !== matchingControl.value) {
      return { matchingFields: true };
    }

    return null;
  };
}

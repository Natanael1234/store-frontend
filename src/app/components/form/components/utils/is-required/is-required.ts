import { FormControl } from '@angular/forms';

export function isRequired(control?: FormControl): boolean {
    if (!control) return false;
    if (!control.validator) return false;
    const validator = control.validator({} as any);
    if (!validator) return false;
    return validator['required'] === true;
}

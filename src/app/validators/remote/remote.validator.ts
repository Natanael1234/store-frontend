import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class RemoteValidationContext {
    remoteError?: string | boolean | null;

    constructor(error?: string | boolean | null) {
        this.remoteError = error;
    }

    setError(error?: string | boolean | null) {
        this.remoteError = error;
    }

    clear() {
        this.remoteError = undefined;
    }
}

export function remoteValidator(context: RemoteValidationContext): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (context.remoteError) {
            return { remote: context.remoteError };
        }
        return null;
    };
}

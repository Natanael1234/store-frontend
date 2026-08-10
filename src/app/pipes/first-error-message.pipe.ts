import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StandardControlValidatorError } from '../enums/standard-control-validator-name/standard-control-validator-name.enum';

@Pipe({
    name: 'firstErrorMessage',
    standalone: true,
    pure: false,
})
export class FirstErrorMessagePipe implements PipeTransform {
    transform(control: FormControl | null): string | null {
        if (!control || !control.errors) return null;
        const errors = control.errors;
        for (const key of Object.keys(errors)) {
            const error = errors[key];
            // if the error has a 'message' property, we use that.
            if (error && typeof error === 'object' && 'message' in error) {
                return error.message;
            }
            // if it's a standard Angular error, we'll address it here.
            switch (key) {
                case StandardControlValidatorError.min:
                    return 'Campo obrigatório.';
                case StandardControlValidatorError.required:
                    return 'Campo obrigatório.';
                case StandardControlValidatorError.minlength:
                    return `Mínimo de ${error.requiredLength} caracteres (atual: ${error.actualLength}).`;
                case StandardControlValidatorError.maxlength:
                    return `Máximo de ${error.requiredLength} caracteres.`;
                case StandardControlValidatorError.email:
                    return 'E-mail inválido.';
                case StandardControlValidatorError.min:
                    return `O valor mínimo permitido é ${error.min}. (atual: ${error.actual})`;
                case StandardControlValidatorError.max:
                    return `O valor máximo permitido é ${error.max}. (atual: ${error.actual})`;
                case StandardControlValidatorError.nullValidator:
                    return 'O valor não pode ser nulo.';
                default:
                    if (key == 'remote') {
                        return error;
                    }
                    if (key == 'mask') {
                        return 'Invalid format.'; // TODO: testar
                    }
                    return 'Inválido!'; //JSON.stringify(error);
            }
        }

        return null;
    }
}

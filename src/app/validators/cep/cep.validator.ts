import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cepValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value?.trim();
        if (!value) {
            return null; // campo vazio é considerado válido
        }
        if (typeof value != 'string') {
            return null;
        }
        if (!/^\d\d\d\d\d(\-)?\d\d\d$/.test(value)) {
            return { cep: { message: 'CEP inválido.' } };
        }
        return null;
    };
}

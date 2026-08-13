import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function timeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) {
            return null; // Campo vazio é considerado válido
        }

        if (typeof value != 'string') {
            return null;
        }

        const time = value.trim();

        // Aceita formatos HH:mm e HH:mm:ss
        const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;

        if (!regex.test(time)) {
            return { time: { message: 'Hora inválida.' } };
        }

        return null;
    };
}

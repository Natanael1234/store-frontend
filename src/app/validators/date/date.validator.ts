import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (value === null || value === undefined || value === '') {
            return null; // Campo vazio é considerado válido
        }

        if (typeof value != 'string') {
            return null;
        }
        const trimmed = String(value).trim();

        // Aceita apenas formato dd/MM/yyyy
        const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

        const match = trimmed.match(regex);
        if (!match) {
            return { date: { message: 'Data inválida.' } };
        }

        const [, dayStr, monthStr, yearStr] = match;
        const day = parseInt(dayStr, 10);
        const month = parseInt(monthStr, 10);
        const year = parseInt(yearStr, 10);

        // Valida intervalos básicos
        if (month < 1 || month > 12 || day < 1 || year < 1000) {
            return { date: { message: 'Data inválida.' } };
        }

        // Calcula o último dia do mês
        const lastDay = new Date(year, month, 0).getDate();
        if (day > lastDay) {
            return { date: { message: 'Data inválida.' } };
        }

        return null;
    };
}

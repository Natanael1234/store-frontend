import { FormControl } from '@angular/forms';
import { dateValidator } from './date.validator';

describe('Date Validator', () => {
    const validator = dateValidator();

    it('should return null for empty value', () => {
        expect(validator(new FormControl(''))).toBeNull();
        expect(validator(new FormControl(null))).toBeNull();
    });

    it('should return null for valid date', () => {
        expect(validator(new FormControl('01/01/2024'))).toBeNull();
        expect(validator(new FormControl('29/02/2024'))).toBeNull(); // ano bissexto
        expect(validator(new FormControl('31/12/1999'))).toBeNull();
    });

    it('should return error for invalid day in month', () => {
        expect(validator(new FormControl('31/04/2024'))).toEqual({
            date: { message: 'Data inválida.' },
        });
    });

    it('should return error for February 30', () => {
        expect(validator(new FormControl('30/02/2024'))).toEqual({
            date: { message: 'Data inválida.' },
        });
    });

    it('should return error for invalid month', () => {
        expect(validator(new FormControl('10/13/2024'))).toEqual({
            date: { message: 'Data inválida.' },
        });
    });

    it('should return error for invalid format', () => {
        expect(validator(new FormControl('2024-01-01'))).toEqual({
            date: { message: 'Data inválida.' },
        });
        expect(validator(new FormControl('1/1/2024'))).toEqual({
            date: { message: 'Data inválida.' },
        });
    });

    it('should return error for non-numeric values', () => {
        expect(validator(new FormControl('aa/bb/cccc'))).toEqual({
            date: { message: 'Data inválida.' },
        });
    });

    it('should handle spaces gracefully', () => {
        expect(validator(new FormControl(' 01/01/2024 '))).toBeNull();
    });

    it('deve aceitar 29/02 em ano bissexto', () => {
        const control = new FormControl('29/02/2028');
        expect(validator(control)).toBeNull();
    });

    it('deve rejeitar 29/02 em ano não bissexto', () => {
        const control = new FormControl('29/02/2029');
        expect(validator(control)).toEqual({
            date: { message: 'Data inválida.' },
        });
    });
});

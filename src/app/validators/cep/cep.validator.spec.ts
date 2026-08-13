import { FormControl } from '@angular/forms';
import { cepValidator } from './cep.validator';

describe('CEP Validator', () => {
    const validator = cepValidator();

    it('should return null for empty value', () => {
        expect(validator(new FormControl(''))).toBeNull();
        expect(validator(new FormControl(null))).toBeNull();
    });

    it('should return null for valid CEP without mask', () => {
        const control = new FormControl('12345678');
        expect(validator(control)).toBeNull();
    });

    it('should return null for valid CEP with mask', () => {
        const control = new FormControl('12345-678');
        expect(validator(control)).toBeNull();
    });

    it('should return error for CEP with less than 8 digits', () => {
        const control = new FormControl('12345-67');
        expect(validator(control)).toEqual({
            cep: { message: 'CEP inválido.' },
        });
    });

    it('should return error for CEP with more than 8 digits', () => {
        const control = new FormControl('123456789');
        expect(validator(control)).toEqual({
            cep: { message: 'CEP inválido.' },
        });
    });

    it('should return error for CEP with letters', () => {
        const control = new FormControl('12A45-6B8');
        expect(validator(control)).toEqual({
            cep: { message: 'CEP inválido.' },
        });
    });

    it('should return error for CEP with special characters other than "-"', () => {
        const control = new FormControl('12.345@678');
        expect(validator(control)).toEqual({
            cep: { message: 'CEP inválido.' },
        });
    });

    it('should handle extra spaces gracefully', () => {
        const control = new FormControl('  12345-678  ');
        expect(validator(control)).toBeNull();
    });
});

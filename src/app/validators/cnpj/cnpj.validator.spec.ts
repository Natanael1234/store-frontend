import { FormControl } from '@angular/forms';
import { cnpjValidator } from './cnpj.validator';

describe('CNPJ Validator', () => {
    const validator = cnpjValidator();

    it('should return null for empty value', () => {
        expect(validator(new FormControl(''))).toBeNull();
    });

    it('should return null for null value', () => {
        expect(validator(new FormControl(null))).toBeNull();
    });

    it('should return null for undefined value', () => {
        expect(validator(new FormControl(undefined))).toBeNull();
    });

    it('should return error for CNPJ with less than 14 digits', () => {
        expect(validator(new FormControl('0.446.640/0001-8'))).toEqual({
            cnpj: { message: 'CNPJ inválido.' },
        });
    });

    it('should return error for CNPJ with more than 14 digits', () => {
        expect(validator(new FormControl('10.446.640/0001-834'))).toEqual({
            cnpj: { message: 'CNPJ inválido.' },
        });
    });

    it('should return error for CNPJ with all digits equal', () => {
        expect(validator(new FormControl('1.111.111/1111-11'))).toEqual({
            cnpj: { message: 'CNPJ inválido.' },
        });
    });

    it('should return error for CNPJ with invalid digits', () => {
        expect(validator(new FormControl('10.446.640/0001-84'))).toEqual({
            cnpj: { message: 'CNPJ inválido.' },
        });
    });

    it('should return null for valid resto', () => {
        expect(validator(new FormControl('03.468.724/0001-52'))).toBeNull();
    });

    it('should accept CNPJ without mask', () => {
        expect(validator(new FormControl('03468724000152'))).toBeNull();
    });
});

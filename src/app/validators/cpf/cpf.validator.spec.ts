import { FormControl } from '@angular/forms';
import { cpfValidator } from './cpf.validator';

describe('CPF Validator', () => {
    const validator = cpfValidator();

    it('should return null for empty value', () => {
        expect(validator(new FormControl(''))).toBeNull();
    });

    it('should return null for null value', () => {
        expect(validator(new FormControl(null))).toBeNull();
    });

    it('should return null for undefined value', () => {
        expect(validator(new FormControl(undefined))).toBeNull();
    });

    it('should return error for CPF with less than 11 digits', () => {
        expect(validator(new FormControl('123.456.789-0'))).toEqual({
            cpf: { message: 'CPF inválido.' },
        });
    });

    it('should return error for CPF with more than 11 digits', () => {
        expect(validator(new FormControl('123.456.789-000'))).toEqual({
            cpf: { message: 'CPF inválido.' },
        });
    });

    it('should return error for CPF with all digits equal', () => {
        expect(validator(new FormControl('111.111.111-11'))).toEqual({
            cpf: { message: 'CPF inválido.' },
        });
    });

    it('should return error for CPF with invalid digits', () => {
        expect(validator(new FormControl('049.017.860-09'))).toEqual({
            cpf: { message: 'CPF inválido.' },
        });
    });

    it('should return null for valid CPF', () => {
        expect(validator(new FormControl('935.411.347-80'))).toBeNull();
    });

    it('should accept CPF without mask', () => {
        expect(validator(new FormControl('93541134780'))).toBeNull();
    });
});

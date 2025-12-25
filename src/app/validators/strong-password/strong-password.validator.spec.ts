import { FormControl } from '@angular/forms';
import { strongPasswordValidator } from './strong-password.validator';

describe('Strong Password Validator', () => {
    it('should validate a strong password', () => {
        const validator = strongPasswordValidator();
        const control = new FormControl('Pass123$');
        const result = validator(control);
        expect(result).toBeNull();
    });

    describe('required', () => {
        it('should return error for null password ', () => {
            const validator = strongPasswordValidator();
            const control = new FormControl(null);
            const result = validator(control);
            expect(result).toEqual({
                required: { message: 'O campo é obrigatório.' },
            });
        });

        it('should return error for empty password ', () => {
            const validator = strongPasswordValidator();
            const control = new FormControl('');
            const result = validator(control);
            expect(result).toEqual({
                required: { message: 'O campo é obrigatório.' },
                minLength: { message: 'O comprimento mínimo permitido é 8.' },
            });
        });
    });

    describe('invalid', () => {
        it('should reject space', () => {
            const validator = strongPasswordValidator();
            const control = new FormControl(' Abc123$');
            const result = validator(control);
            expect(result).toEqual({
                invalidPassword: { message: 'Inválido.' },
            });
        });
    });

    describe('minLength', () => {
        it('should return error for a too short password', () => {
            const validator = strongPasswordValidator();
            const control = new FormControl('Pass12$');
            const result = validator(control);
            expect(result).toEqual({
                minLength: {
                    message: 'O comprimento mínimo permitido é 8.',
                },
            });
        });

        it('should accept min length password', () => {
            const validator = strongPasswordValidator();
            const control = new FormControl('Pass123$');
            const result = validator(control);
            expect(result).toBeNull();
        });
    });

    describe('maxlength', () => {
        it('should accept max length password', () => {
            const validator = strongPasswordValidator();
            const control = new FormControl('Pass1234567$');
            const result = validator(control);
            expect(result).toBeNull();
        });

        it('should return error for a too long password', () => {
            const validator = strongPasswordValidator();
            const control = new FormControl('Pass12345678$');
            const result = validator(control);
            expect(result).toEqual({
                maxLength: { message: 'O comprimento máximo permitido é 12.' },
            });
        });
    });

    describe('weakPassword', () => {
        it('should return error for a password without lowercase letters', () => {
            const validator = strongPasswordValidator();
            const control = new FormControl('STRONGPASS1@');
            const result = validator(control);
            expect(result).toEqual({
                weakPassword: {
                    message:
                        'Deve conter maíscula, minúscula, número e caractere especial.',
                },
            });
        });

        it('should return error for a password without uppercase letters', () => {
            const validator = strongPasswordValidator();
            const control = new FormControl('strongpass1@');
            const result = validator(control);
            expect(result).toEqual({
                weakPassword: {
                    message:
                        'Deve conter maíscula, minúscula, número e caractere especial.',
                },
            });
        });

        it('should return error for a password without digits', () => {
            const validator = strongPasswordValidator();
            const control = new FormControl('StrongPass@');
            const result = validator(control);
            expect(result).toEqual({
                weakPassword: {
                    message:
                        'Deve conter maíscula, minúscula, número e caractere especial.',
                },
            });
        });

        it('should return error for a password without special caracters', () => {
            const validator = strongPasswordValidator();
            const control = new FormControl('StrongPass1');
            const result = validator(control);
            expect(result).toEqual({
                weakPassword: {
                    message:
                        'Deve conter maíscula, minúscula, número e caractere especial.',
                },
            });
        });
    });
});

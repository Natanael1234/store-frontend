import { FormControl, FormGroup } from '@angular/forms';
import { matchingPasswordValidator } from './matching-password.validator';

describe('Matching Passwords Validator.', () => {
    describe('use validator directly.', () => {
        it('should return null if passwords match.', () => {
            const formGroup = new FormGroup({
                password: new FormControl('Password123'),
                repeatPassword: new FormControl('Password123'),
            });
            const validator = matchingPasswordValidator('password');
            const result = validator(formGroup.controls.repeatPassword);
            expect(result).toBeNull();
        });

        it('should return error if passwords do not match.', () => {
            const validator = matchingPasswordValidator('password');
            const formGroup = new FormGroup({
                password: new FormControl('Password123'),
                repeatPassword: new FormControl('MismatchedPassword'),
            });
            const result = validator(formGroup.controls.repeatPassword);
            expect(result).toEqual({
                matchingFields: { message: 'As senhas não coincidem.' },
            });
        });

        it('should return error if repeat password is null.', () => {
            const validator = matchingPasswordValidator('password');
            const formGroup = new FormGroup({
                password: new FormControl(null),
                repeatPassword: new FormControl(null),
            });
            const result = validator(formGroup.controls.repeatPassword);
            expect(result).toEqual({
                required: { message: 'O campo é obrigatório.' },
            });
        });

        it('should return error if repeat password is empty string.', () => {
            const validator = matchingPasswordValidator('password');
            const formGroup = new FormGroup({
                password: new FormControl(''),
                repeatPassword: new FormControl(''),
            });
            const result = validator(formGroup.controls.repeatPassword);

            expect(result).toEqual({
                required: { message: 'O campo é obrigatório.' },
            });
        });

        it('should return error if repeat password is made of spaces.', () => {
            const validator = matchingPasswordValidator('password');
            const formGroup = new FormGroup({
                password: new FormControl('  '),
                repeatPassword: new FormControl('  '),
            });
            const result = validator(formGroup.controls.repeatPassword);
            expect(result).toEqual({
                required: { message: 'O campo é obrigatório.' },
            });
        });

        it('should return null if the control is missing.', () => {
            const validator = matchingPasswordValidator('password');
            const result = validator(null as unknown as FormControl);
            expect(result).toBeNull();
        });

        it('should return null if the other control is missing.', () => {
            const formGroup = new FormGroup({
                repeatPassword: new FormControl('Password123'),
            });
            const validator = matchingPasswordValidator('password');
            const result = validator(formGroup.controls.repeatPassword);
            expect(result).toBeNull();
        });
    });
});

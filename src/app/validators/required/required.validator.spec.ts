import { FormControl } from '@angular/forms';
import { requiredValidator } from '@validators/required/required.validator';

describe('requiredValidator', () => {
    // --- NULL ---

    describe('when value is null', () => {
        it('should return an error by default', () => {
            const validator = requiredValidator({});
            const control = new FormControl(null);
            expect(validator(control)).toEqual({
                required: { message: 'O campo é obrigatório.' },
            });
        });

        it('should return an error when allowNull is false', () => {
            const validator = requiredValidator({ allowNull: false });
            const control = new FormControl(null);
            expect(validator(control)).toEqual({
                required: { message: 'O campo é obrigatório.' },
            });
        });

        it('should return null when allowNull is true', () => {
            const validator = requiredValidator({ allowNull: true });
            const control = new FormControl(null);
            expect(validator(control)).toBeNull();
        });
    });

    // --- EMPTY STRING ---

    describe('when value is an empty string', () => {
        it('should return an error by default', () => {
            const validator = requiredValidator({});
            const control = new FormControl('');
            expect(validator(control)).toEqual({
                required: { message: 'O campo é obrigatório.' },
            });
        });

        it('should return an error when allowEmptyString is false', () => {
            const validator = requiredValidator({ allowEmptyString: false });
            const control = new FormControl('');
            expect(validator(control)).toEqual({
                required: { message: 'O campo é obrigatório.' },
            });
        });

        it('should return null when allowEmptyString is true', () => {
            const validator = requiredValidator({ allowEmptyString: true });
            const control = new FormControl('');
            expect(validator(control)).toBeNull();
        });
    });

    // --- SPACE-FILLED STRING ---

    describe('when value is a space-filled string', () => {
        it('should return an error by default', () => {
            const validator = requiredValidator({});
            const control = new FormControl('   ');
            expect(validator(control)).toEqual({
                required: { message: 'O campo é obrigatório.' },
            });
        });

        it('should return an error when allowSpaceFilledString is false', () => {
            const validator = requiredValidator({
                allowSpaceFilledString: false,
            });
            const control = new FormControl('   ');
            expect(validator(control)).toEqual({
                required: { message: 'O campo é obrigatório.' },
            });
        });

        it('should return null when allowSpaceFilledString is true', () => {
            const validator = requiredValidator({
                allowSpaceFilledString: true,
            });
            const control = new FormControl('   ');
            expect(validator(control)).toBeNull();
        });
    });

    // --- BOOLEAN FALSE ---

    describe('when value is false', () => {
        it('should return an error by default', () => {
            const validator = requiredValidator({});
            const control = new FormControl(false);
            expect(validator(control)).toEqual({
                required: { message: 'O campo é obrigatório.' },
            });
        });

        it('should return an error when allowFalse is false', () => {
            const validator = requiredValidator({ allowFalse: false });
            const control = new FormControl(false);
            expect(validator(control)).toEqual({
                required: { message: 'O campo é obrigatório.' },
            });
        });

        it('should return null when allowFalse is true', () => {
            const validator = requiredValidator({ allowFalse: true });
            const control = new FormControl(false);
            expect(validator(control)).toBeNull();
        });
    });

    // --- VALID VALUES ---

    describe('when value is valid', () => {
        it('should return null for a non-empty string', () => {
            const validator = requiredValidator({});
            const control = new FormControl('hello');
            expect(validator(control)).toBeNull();
        });

        it('should return null for a positive number', () => {
            const validator = requiredValidator({});
            const control = new FormControl(42);
            expect(validator(control)).toBeNull();
        });

        it('should return null for zero', () => {
            const validator = requiredValidator({});
            const control = new FormControl(0);
            expect(validator(control)).toBeNull();
        });

        it('should return null for a negative number', () => {
            const validator = requiredValidator({});
            const control = new FormControl(-7);
            expect(validator(control)).toBeNull();
        });

        it('should return null for true', () => {
            const validator = requiredValidator({});
            const control = new FormControl(true);
            expect(validator(control)).toBeNull();
        });

        it('should return null for an object', () => {
            const validator = requiredValidator({});
            const control = new FormControl({ key: 'value' });
            expect(validator(control)).toBeNull();
        });

        it('should return null for an empty object', () => {
            const validator = requiredValidator({});
            const control = new FormControl({});
            expect(validator(control)).toBeNull();
        });

        it('should return null for an array with elements', () => {
            const validator = requiredValidator({});
            const control = new FormControl(['item']);
            expect(validator(control)).toBeNull();
        });

        it('should return null for an empty array', () => {
            const validator = requiredValidator({});
            const control = new FormControl([]);
            expect(validator(control)).toBeNull();
        });
    });

    // --- COMBINED ALLOWS ---

    describe('when multiple allow options are enabled', () => {
        it('should return null for all special values', () => {
            const validator = requiredValidator({
                allowNull: true,
                allowEmptyString: true,
                allowSpaceFilledString: true,
                allowFalse: true,
            });

            expect(validator(new FormControl(null))).toBeNull();
            expect(validator(new FormControl(undefined))).toBeNull();
            expect(validator(new FormControl(''))).toBeNull();
            expect(validator(new FormControl('   '))).toBeNull();
            expect(validator(new FormControl(false))).toBeNull();
        });
    });
});

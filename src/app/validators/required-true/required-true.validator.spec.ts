import { FormControl } from '@angular/forms';
import { requiredTrueValidator } from './required-true.validator';

describe('requiredTrueValidator', () => {
    const validator = requiredTrueValidator();

    it('should return error if value is null', () => {
        const control = new FormControl(null);
        expect(validator(control)).toEqual({
            requiredTrue: { message: 'O campo é obrigatório.' },
        });
    });

    it('should return error if value is undefined', () => {
        const control = new FormControl(undefined);
        expect(validator(control)).toEqual({
            requiredTrue: { message: 'O campo é obrigatório.' },
        });
    });

    it('should return error if value is false', () => {
        const control = new FormControl(false);
        expect(validator(control)).toEqual({
            requiredTrue: { message: 'O campo é obrigatório.' },
        });
    });

    it('should return error if value is a string "true"', () => {
        const control = new FormControl('true');
        expect(validator(control)).toEqual({
            requiredTrue: { message: 'O campo é obrigatório.' },
        });
    });

    it('should return error if value is 1', () => {
        const control = new FormControl(1);
        expect(validator(control)).toEqual({
            requiredTrue: { message: 'O campo é obrigatório.' },
        });
    });

    it('should return null if value is true', () => {
        const control = new FormControl(true);
        expect(validator(control)).toBeNull();
    });
});

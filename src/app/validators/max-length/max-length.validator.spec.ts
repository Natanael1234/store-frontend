import { FormControl } from '@angular/forms';
import { maxLengthValidator } from './max-length.validator';

describe('maxLengthValidator', () => {
    it('should return null for null value', () => {
        const validator = maxLengthValidator(5);
        expect(validator(new FormControl(null))).toBeNull();
    });

    it('should return null for non-string and non-number value', () => {
        const validator = maxLengthValidator(5);
        expect(validator(new FormControl({} as any))).toBeNull();
        expect(validator(new FormControl(true as any))).toBeNull();
    });

    it('should return error if string length is greater than maxLength', () => {
        const validator = maxLengthValidator(3);
        expect(validator(new FormControl('1234'))).toEqual({
            maxLength: { message: 'O comprimento máximo permitido é 3.' },
        });
    });

    it('should return null if string length is equal to maxLength', () => {
        const validator = maxLengthValidator(5);
        expect(validator(new FormControl('12345'))).toBeNull();
    });

    it('should return null if string length is less than maxLength', () => {
        const validator = maxLengthValidator(5);
        expect(validator(new FormControl('1234'))).toBeNull();
    });

    it('should handle numbers by converting to string', () => {
        const validator = maxLengthValidator(3);
        expect(validator(new FormControl(1234))).toEqual({
            maxLength: { message: 'O comprimento máximo permitido é 3.' },
        });
        expect(validator(new FormControl(12))).toBeNull();
        expect(validator(new FormControl(123))).toBeNull();
    });
});

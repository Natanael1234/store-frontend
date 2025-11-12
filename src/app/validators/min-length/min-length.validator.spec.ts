import { FormControl } from '@angular/forms';
import { minLengthValidator } from './min-length.validator';

describe('minLengthValidator', () => {
    it('should return error for empty value', () => {
        const validator = minLengthValidator(1);
        expect(validator(new FormControl(''))).toEqual({
            minlength: { message: 'O comprimento mínimo permitido é 1.' },
        });
    });

    it('should return null for null value', () => {
        const validator = minLengthValidator(5);
        expect(validator(new FormControl(null))).toBeNull();
    });

    it('should return null for non-string and non-number value', () => {
        const validator = minLengthValidator(5);
        expect(validator(new FormControl({} as any))).toBeNull();
        expect(validator(new FormControl(true as any))).toBeNull();
    });

    it('should return error if string length is less than minLength', () => {
        const validator = minLengthValidator(5);
        expect(validator(new FormControl('1234'))).toEqual({
            minlength: { message: 'O comprimento mínimo permitido é 5.' },
        });
    });

    it('should return null if string length is equal to minLength', () => {
        const validator = minLengthValidator(5);
        expect(validator(new FormControl('12345'))).toBeNull();
    });

    it('should return null if string length is greater than minLength', () => {
        const validator = minLengthValidator(5);
        expect(validator(new FormControl('1234567'))).toBeNull();
    });

    it('should handle numbers by converting to string', () => {
        const validator = minLengthValidator(3);
        expect(validator(new FormControl(12))).toEqual({
            minlength: { message: 'O comprimento mínimo permitido é 3.' },
        });
        expect(validator(new FormControl(123))).toBeNull();
        expect(validator(new FormControl(12345))).toBeNull();
    });
});

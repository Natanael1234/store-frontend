import { FormControl } from '@angular/forms';
import { maxValidator } from './max.validator';

describe('maxValidator', () => {
    it('should return null if control value is empty', () => {
        const validator = maxValidator(5);
        const control = new FormControl('');
        expect(validator(control)).toBeNull();

        const control2 = new FormControl(null);
        expect(validator(control2)).toBeNull();
    });

    it('should return error if value is greater than max', () => {
        const validator = maxValidator(3);
        const control = new FormControl('4');
        expect(validator(control)).toEqual({
            min: { message: 'O valor máximo permitido é 3.' },
        });
    });

    it('should return null if value is equal to max', () => {
        const validator = maxValidator(5);
        const control = new FormControl('5');
        expect(validator(control)).toBeNull();
    });

    it('should return null if value is less than max', () => {
        const validator = maxValidator(5);
        const control = new FormControl('3');
        expect(validator(control)).toBeNull();
    });

    it('should return null if value is NaN', () => {
        const validator = maxValidator(5);
        const control = new FormControl('f');
        expect(validator(control)).toBeNull();
    });

    it('should return null if value is not a number string', () => {
        const validator = maxValidator(5);
        const control = new FormControl(false);
        expect(validator(control)).toBeNull();
    });

    it('should handle string with thousand separators and commas', () => {
        const validator = maxValidator(1234.56);
        const control = new FormControl('1234.56');
        expect(validator(control)).toBeNull();

        const control2 = new FormControl('1235');
        expect(validator(control2)).toEqual({
            min: { message: 'O valor máximo permitido é 1234.56.' },
        });
    });

    it('should handle string with negative number', () => {
        const validator = maxValidator(-5);
        const control = new FormControl('-5');
        expect(validator(control)).toBeNull();

        const control2 = new FormControl('-4');
        expect(validator(control2)).toEqual({
            min: { message: 'O valor máximo permitido é -5.' },
        });
    });
});

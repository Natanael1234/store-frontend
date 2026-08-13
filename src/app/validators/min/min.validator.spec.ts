import { FormControl } from '@angular/forms';
import { minValidator } from '@validators/min/min.validator';

describe('minValidator', () => {
    it('should return null if control value is empty', () => {
        const validator = minValidator(5);
        const control = new FormControl('');
        expect(validator(control)).toBeNull();

        const control2 = new FormControl(null);
        expect(validator(control2)).toBeNull();
    });

    it('should return error if value is less than min', () => {
        const validator = minValidator(5);
        const control = new FormControl('3');
        expect(validator(control)).toEqual({
            min: { message: 'O valor mínimo permitido é 5.' },
        });
    });

    it('should return null if value is equal to min', () => {
        const validator = minValidator(5);
        const control = new FormControl('5');
        expect(validator(control)).toBeNull();
    });

    it('should return null if value is greater than min', () => {
        const validator = minValidator(5);
        const control = new FormControl('10');
        expect(validator(control)).toBeNull();
    });

    it('should return null if value is NaN', () => {
        const validator = minValidator(5);
        const control = new FormControl('f');
        expect(validator(control)).toBeNull();
    });

    it('should return null if value is not a number string', () => {
        const validator = minValidator(1);
        const control = new FormControl(false);
        expect(validator(control)).toBeNull();
    });

    it('should handle string with thousand separators and commas', () => {
        const validator = minValidator(1234.56);
        const control = new FormControl('1234.56');
        expect(validator(control)).toBeNull();

        const control2 = new FormControl('1234.00');
        expect(validator(control2)).toEqual({
            min: { message: 'O valor mínimo permitido é 1234.56.' },
        });
    });

    it('should handle string with negative number', () => {
        const validator = minValidator(-5);
        const control = new FormControl('-4');
        expect(validator(control)).toBeNull();

        const control2 = new FormControl('-6');
        expect(validator(control2)).toEqual({
            min: { message: 'O valor mínimo permitido é -5.' },
        });
    });
});

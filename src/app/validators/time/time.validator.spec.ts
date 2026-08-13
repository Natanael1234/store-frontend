import { FormControl } from '@angular/forms';
import { timeValidator } from '@validators/time/time.validator';

describe('Time Validator', () => {
    const validator = timeValidator();

    it('should return null for empty value', () => {
        expect(validator(new FormControl(''))).toBeNull();
    });

    it('should return null for null value', () => {
        expect(validator(new FormControl(null))).toBeNull();
    });

    it('should return null for valid HH:mm format', () => {
        expect(validator(new FormControl('00:00'))).toBeNull();
        expect(validator(new FormControl('09:45'))).toBeNull();
        expect(validator(new FormControl('23:59'))).toBeNull();
    });

    it('should return null for valid HH:mm:ss format', () => {
        expect(validator(new FormControl('00:00:00'))).toEqual({
            time: { message: 'Hora inválida.' },
        });
        expect(validator(new FormControl('12:30:45'))).toEqual({
            time: { message: 'Hora inválida.' },
        });
        expect(validator(new FormControl('23:59:59'))).toEqual({
            time: { message: 'Hora inválida.' },
        });
    });

    it('should return error for invalid hour > 23', () => {
        expect(validator(new FormControl('24:00'))).toEqual({
            time: { message: 'Hora inválida.' },
        });
    });

    it('should return error for invalid minute > 59', () => {
        expect(validator(new FormControl('10:60'))).toEqual({
            time: { message: 'Hora inválida.' },
        });
    });

    it('should return error for invalid second > 59', () => {
        expect(validator(new FormControl('12:10:75'))).toEqual({
            time: { message: 'Hora inválida.' },
        });
    });

    it('should return error for missing colon', () => {
        expect(validator(new FormControl('1230'))).toEqual({
            time: { message: 'Hora inválida.' },
        });
    });

    it('should return error for letters', () => {
        expect(validator(new FormControl('aa:bb'))).toEqual({
            time: { message: 'Hora inválida.' },
        });
    });

    it('should handle leading/trailing spaces gracefully', () => {
        expect(validator(new FormControl(' 09:15 '))).toBeNull();
    });
});

import { FormControl, Validators } from '@angular/forms';
import { isRequired } from '@components/form/components/utils/is-required/is-required';

describe('isRequired', () => {
    it('should return false if no element is provided', () => {
        expect(isRequired()).toBe(false);
    });

    it('should return false if control is undefined', () => {
        expect(isRequired(undefined)).toBe(false);
    });

    it('should return false if control has no validator', () => {
        expect(isRequired(new FormControl(''))).toBe(false);
    });

    it('should return true if control has required validator', () => {
        expect(isRequired(new FormControl('', Validators.required))).toBe(true);
    });

    it('should return false if control has other validators but not required', () => {
        expect(isRequired(new FormControl('', Validators.email))).toBe(false);
    });
});

import { FormControl, Validators } from '@angular/forms';
import { isRequired } from '@components/form/components/utils/is-required/is-required';

describe('isRequired', () => {
    it('should return false if no element is provided', () => {
        expect(isRequired()).toBeFalse();
    });

    it('should return false if control is undefined', () => {
        expect(isRequired(undefined)).toBeFalse();
    });

    it('should return false if control has no validator', () => {
        expect(isRequired(new FormControl(''))).toBeFalse();
    });

    it('should return true if control has required validator', () => {
        expect(isRequired(new FormControl('', Validators.required))).toBeTrue();
    });

    it('should return false if control has other validators but not required', () => {
        expect(isRequired(new FormControl('', Validators.email))).toBeFalse();
    });
});

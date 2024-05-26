import { FormGroup, FormControl } from '@angular/forms';
import { matchingFieldsValidator } from './matching-password.validator';

describe('Matching Passwords Validator', () => {
  describe('use validator directly', () => {
    it('should return null if passwords match', () => {
      const formGroup = new FormGroup({
        password: new FormControl('Password123'),
        repeatPassword: new FormControl('Password123'),
      });
      const validator = matchingFieldsValidator('password');
      const result = validator(formGroup.controls.repeatPassword);
      expect(result).toBeNull();
    });

    it('should return passwordMismatch if passwords do not match', () => {
      const validator = matchingFieldsValidator('password');
      const formGroup = new FormGroup({
        password: new FormControl('Password123'),
        repeatPassword: new FormControl('MismatchedPassword'),
      });
      const result = validator(formGroup.controls.repeatPassword);
      expect(result).toEqual({ matchingFields: true });
    });

    it('should return null if the control is missing', () => {
      const formGroup = new FormGroup({
        password: new FormControl('Password123'),
      });
      const validator = matchingFieldsValidator('password');
      const result = validator(null as unknown as FormControl);
      expect(result).toBeNull();
    });

    it('should return null if the other control is missing', () => {
      const formGroup = new FormGroup({
        repeatPassword: new FormControl('Password123'),
      });
      const validator = matchingFieldsValidator('password');
      const result = validator(formGroup.controls.repeatPassword);
      expect(result).toBeNull();
    });
  });
});

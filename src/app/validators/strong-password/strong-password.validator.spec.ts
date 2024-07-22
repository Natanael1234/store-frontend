import { FormControl } from '@angular/forms';
import { strongPasswordValidator } from './strong-password.validator';

describe('Strong Password Validator', () => {
  it('should return error for null password ', () => {
    const validator = strongPasswordValidator();
    const control = new FormControl(null);
    const result = validator(control);
    expect(result).toEqual({ required: true });
  });

  it('should return error for empty password ', () => {
    const validator = strongPasswordValidator();
    const control = new FormControl('');
    const result = validator(control);
    expect(result).toEqual({ required: true });
  });

  it('should reject space', () => {
    const validator = strongPasswordValidator();
    const control = new FormControl(' Abc123$');
    const result = validator(control);
    expect(result).toEqual({ invalidPassword: true });
  });

  it('should validate a strong password', () => {
    const validator = strongPasswordValidator();
    const control = new FormControl('Pass123$');
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should return error for a too short password', () => {
    const validator = strongPasswordValidator();
    const control = new FormControl('Pass12$');
    const result = validator(control);
    expect(result).toEqual({ minlength: true });
  });

  it('should accept min length password', () => {
    const validator = strongPasswordValidator();
    const control = new FormControl('Pass123$');
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should accept max length password', () => {
    const validator = strongPasswordValidator();
    const control = new FormControl('Pass1234567$');
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should return error for a too long password', () => {
    const validator = strongPasswordValidator();
    const control = new FormControl('Pass12345678$');
    const result = validator(control);
    expect(result).toEqual({ maxlength: true });
  });

  it('should return error for a password without lowercase letters', () => {
    const validator = strongPasswordValidator();
    const control = new FormControl('STRONGPASS1@');
    const result = validator(control);
    expect(result).toEqual({ weakPassword: true });
  });

  it('should return error for a password without uppercase letters', () => {
    const validator = strongPasswordValidator();
    const control = new FormControl('strongpass1@');
    const result = validator(control);
    expect(result).toEqual({ weakPassword: true });
  });

  it('should return error for a password without digits', () => {
    const validator = strongPasswordValidator();
    const control = new FormControl('StrongPass@');
    const result = validator(control);
    expect(result).toEqual({ weakPassword: true });
  });

  it('should return error for a password without special characters', () => {
    const validator = strongPasswordValidator();
    const control = new FormControl('StrongPass1');
    const result = validator(control);
    expect(result).toEqual({ weakPassword: true });
  });
});

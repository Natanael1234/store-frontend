import { FormControl } from '@angular/forms';
import { nameValidator } from './name.validator';
import { UserConfigs } from '../../configs/user/user.configs';

describe('Strong Name Validator', () => {
  describe('caracters', () => {
    it('should accept the punctuation', () => {
      const name = 'xxxxxx.';
      const control = new FormControl(name);
      const result = nameValidator()(control);
      expect(result).toBeNull();
    });

    it('should accept special caracters', () => {
      const name = "xxxxxx@-'";
      const control = new FormControl(name);
      const result = nameValidator()(control);
      expect(result).toBeNull();
    });

    it('should accept number', () => {
      const name = 'xxxxxx1';
      const control = new FormControl(name);
      const result = nameValidator()(control);
      expect(result).toBeNull();
    });
  });

  it('should accept when name is null', () => {
    const name = null;
    const control = new FormControl(name);
    const result = nameValidator()(control);
    expect(result).toBeNull();
  });

  describe('empty string', () => {
    it('should accept empty string (without parameters)', () => {
      const name = '';
      const control = new FormControl(name);
      const result = nameValidator()(control);
      expect(result).toBeNull();
    });

    it('should accept empty string when not required', () => {
      const name = '';
      const control = new FormControl(name);
      const result = nameValidator({ required: false })(control);
      expect(result).toBeNull();
    });

    it('should reject empty string when required', () => {
      const name = '';
      const control = new FormControl(name);
      const result = nameValidator({ required: true })(control);
      expect(result).toEqual({ required: true });
    });
  });

  describe('min length', () => {
    it('should accept the shortest acceptable name length', () => {
      const name = 'x'.repeat(UserConfigs.NAME_MIN_LENGTH);
      const control = new FormControl(name);
      const result = nameValidator()(control);
      expect(result).toBeNull();
    });

    it('should accept empty string when parameters is not defined', () => {
      const name = '';
      const control = new FormControl(name);
      const result = nameValidator()(control);
      expect(result).toBeNull();
    });

    it('should accept empty string when minlength is not defined', () => {
      const name = '';
      const control = new FormControl(name);
      const result = nameValidator({})(control);
      expect(result).toBeNull();
    });

    it('should accept string with minimun allowed length when minlength is defined', () => {
      const name = 'ab';
      const control = new FormControl(name);
      const result = nameValidator({ minlength: 2 })(control);
      expect(result).toBeNull();
    });

    it('should reject shorter string when minlength is defined', () => {
      const name = 'a';
      const control = new FormControl(name);
      const result = nameValidator({ minlength: 2 })(control);
      expect(result).toEqual({ minlength: true });
    });

    it('should not count spaces at begin', () => {
      const name = ' xxx';
      const control = new FormControl(name);
      const result = nameValidator({ minlength: 4 })(control);
      expect(result).toEqual({ minlength: true });
    });

    it('should not count spaces at end', () => {
      const name = 'xxx ';
      const control = new FormControl(name);
      const result = nameValidator({ minlength: 4 })(control);
      expect(result).toEqual({ minlength: true });
    });

    it('should not count spaces between words', () => {
      const name = 'xx  x';
      const control = new FormControl(name);
      const result = nameValidator({ minlength: 5 })(control);
      expect(result).toEqual({ minlength: true });
    });
  });

  describe('max length', () => {
    it('should accept the longest acceptable name length', () => {
      const name = 'x'.repeat(UserConfigs.NAME_MAX_LENGTH);
      const control = new FormControl(name);
      const result = nameValidator()(control);
      expect(result).toBeNull();
    });

    it('should accept long string when parameters is not defined', () => {
      const name = 'x'.repeat(2000);
      const control = new FormControl(name);
      const result = nameValidator()(control);
      expect(result).toBeNull();
    });

    it('should accept long string when maxlength is not defined', () => {
      const name = 'x'.repeat(2000);
      const control = new FormControl(name);
      const result = nameValidator({})(control);
      expect(result).toBeNull();
    });

    it('should accept string with maximum allowed length when maxlength is defined', () => {
      const name = 'x'.repeat(4);
      const control = new FormControl(name);
      const result = nameValidator({ maxlength: 4 })(control);
      expect(result).toBeNull();
    });

    it('should reject longer string when maxlength is defined', () => {
      const name = 'x'.repeat(5);
      const control = new FormControl(name);
      const result = nameValidator({ maxlength: 4 })(control);
      expect(result).toEqual({ maxlength: true });
    });

    it('should accept string with maximum lenght ignoring extra spaces', () => {
      const name = '  x  xxx ';
      const control = new FormControl(name);
      const result = nameValidator({ maxlength: 4 })(control);
      expect(result).toEqual({ maxlength: true });
    });
  });

  describe('spaces at beginning', () => {
    it('should accept spaces at the beginning', () => {
      const name = '  xxxxxx';
      const control = new FormControl(name);
      const result = nameValidator()(control);
      expect(result).toBeNull();
    });
  });

  describe('spaces at ending', () => {
    it('should accept spaces at the end', () => {
      const name = 'xxxxxx  ';
      const control = new FormControl(name);
      const result = nameValidator()(control);
      expect(result).toBeNull();
    });
  });

  describe('duplicated spaces', () => {
    it('should accept duplicated spaces', () => {
      const name = 'xxx  yyy';
      const control = new FormControl(name);
      const result = nameValidator()(control);
      expect(result).toBeNull();
    });
  });
});

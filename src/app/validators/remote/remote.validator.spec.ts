import { FormControl } from '@angular/forms';
import { remoteValidator } from './remote.validator';

describe('Remote Validator', () => {
  it('should validate when remote error message is null', () => {
    const validator = remoteValidator({ remoteError: null });
    const control = new FormControl('Teste');
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate when remote error message is undefined', () => {
    const validator = remoteValidator({ remoteError: undefined });
    const control = new FormControl('Teste');
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate when remote error message is empty string', () => {
    const validator = remoteValidator({ remoteError: '' });
    const control = new FormControl('Teste');
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should return error when reomte error message is defined', () => {
    const validator = remoteValidator({ remoteError: 'Some error...' });
    const control = new FormControl('Teste');
    const result = validator(control);
    expect(result).toEqual({ remote: true });
  });
});

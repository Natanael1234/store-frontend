import { FormControl } from '@angular/forms';
import {
    RemoteValidationContext,
    remoteValidator,
} from '@validators/remote/remote.validator';

describe('Remote Validator', () => {
    it('should validate when remote error message is null', () => {
        const validator = remoteValidator(new RemoteValidationContext(null));
        const control = new FormControl('Teste');
        const result = validator(control);
        expect(result).toBeNull();
    });

    it('should validate when remote error message is undefined', () => {
        const validator = remoteValidator(
            new RemoteValidationContext(undefined),
        );
        const control = new FormControl('Teste');
        const result = validator(control);
        expect(result).toBeNull();
    });

    it('should validate when remote error message is empty string', () => {
        const validator = remoteValidator(new RemoteValidationContext(''));
        const control = new FormControl('Teste');
        const result = validator(control);
        expect(result).toBeNull();
    });

    it('should return error when remote error message is defined', () => {
        const validator = remoteValidator(
            new RemoteValidationContext('Some error...'),
        );
        const control = new FormControl('Teste');
        const result = validator(control);
        expect(result).toEqual({ remote: 'Some error...' });
    });
});

import { StandardControlValidatorError } from './standard-control-validator-name.enum';

describe('StandardControlValidatorError', () => {
    it('should be defined', () => {
        expect(StandardControlValidatorError).toBeDefined();
    });

    it('should have valid keys and values', () => {
        expect({ ...StandardControlValidatorError } as unknown as any).toEqual({
            min: 'min',
            max: 'max',
            required: 'required',
            requiredTrue: 'requiredTrue',
            email: 'email',
            minLength: 'minLength',
            maxLength: 'maxLength',
            pattern: 'pattern',
            nullValidator: 'nullValidator',
            compose: 'compose',
        });
    });
});

import { PasswordConstants } from '@constants/password/password.constants';

describe('PasswordConstants', () => {
    it('should be defined', () => {
        expect(PasswordConstants).toBeDefined();
    });

    it('should have valid keys and values', () => {
        const fields: any = { ...PasswordConstants };
        expect(fields).toEqual({
            MIN_LENGTH: 8,
            MAX_LENGTH: 12,
        });
    });
});

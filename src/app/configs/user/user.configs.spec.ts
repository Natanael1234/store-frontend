import { UserConfigs } from '@configs/user/user.configs';

// TODO: check if all parameters matches
describe('BrandConfigs', () => {
    it('should de defined', () => {
        expect(UserConfigs).toBeDefined();
    });

    it('should contains NAME_MIN_LENGTH', () => {
        expect(UserConfigs.NAME_MIN_LENGTH).toEqual(6);
    });

    it('should contains NAME_MAX_LENGTH', () => {
        expect(UserConfigs.NAME_MAX_LENGTH).toEqual(60);
    });

    it('should contains PASSWORD_MIN_LENGTH', () => {
        expect(UserConfigs.PASSWORD_MIN_LENGTH).toEqual(8);
    });

    it('should contains PASSWORD_MAX_LENGTH', () => {
        expect(UserConfigs.PASSWORD_MAX_LENGTH).toEqual(12);
    });

    it('should contain configs', () => {
        const obj: any = { ...UserConfigs };
        const expected: any = {
            NAME_MIN_LENGTH: 6,
            NAME_MAX_LENGTH: 60,
            PASSWORD_MIN_LENGTH: 8,
            PASSWORD_MAX_LENGTH: 12,
        };
        expect(obj).toEqual(expected);
    });
});

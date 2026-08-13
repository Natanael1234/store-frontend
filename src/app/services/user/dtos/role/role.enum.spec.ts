import { Role } from './role.enum';

describe('RefreshTokenMessage', () => {
    it('should be defined', () => {
        expect(Role).toBeDefined();
    });

    it('should have valid keys and values', () => {
        const options = { ...Role } as any;
        expect(options).toEqual({
            root: 'root',
            admin: 'admin',
            user: 'user',
        });
    });
});

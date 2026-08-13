import { UserColumnId } from './user-column-id.enum';

describe('UserColumnId', () => {
    it('should be defined', () => {
        expect(UserColumnId).toBeDefined();
    });

    it('should have valid keys and values', () => {
        expect({ ...UserColumnId } as unknown as any).toEqual({
            name: 'name',
            email: 'email',
            active: 'active',
            deleted: 'deleted',
        });
    });
});

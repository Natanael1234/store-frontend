import { UserColumnLabel } from '@components/table/user-column-name/user-column-label.enum';

describe('UserColumnLabel', () => {
    it('should be defined', () => {
        expect(UserColumnLabel).toBeDefined();
    });

    it('should have valid keys and values', () => {
        expect({ ...UserColumnLabel } as unknown as any).toEqual({
            name: 'Nome',
            email: 'E-mail',
            active: 'Ativo',
            deleted: 'Deletado',
        });
    });
});

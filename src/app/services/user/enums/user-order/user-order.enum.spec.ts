import { UserOrder } from '@services/user/enums/user-order/user-order.enum';

describe('UserOrder enum', () => {
    it('should be defined', () => {
        expect(UserOrder).toBeDefined();
    });

    it('should have valid keys and values', () => {
        expect({ ...UserOrder } as unknown as any).toEqual({
            name_asc: 'name_asc',
            name_desc: 'name_desc',
            email_asc: 'email_asc',
            email_desc: 'email_desc',
            active_asc: 'active_asc',
            active_desc: 'active_desc',
            deleted_asc: 'deleted_asc',
            deleted_desc: 'deleted_desc',
        });
    });
});

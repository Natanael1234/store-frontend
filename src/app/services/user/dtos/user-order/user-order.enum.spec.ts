import { UserOrder } from './user-order.enum';

describe('UserOrder', () => {
  it('should be defined', () => {
    expect(UserOrder).toBeDefined();
  });

  it('should have valid keys and values', () => {
    expect({ ...UserOrder } as unknown as any).toEqual({
      NAME_ASC: 'name_asc',
      NAME_DESC: 'name_desc',
      // TODO: test
      EMAIL_ASC: 'email_asc',
      // TODO: test
      EMAIL_DESC: 'email_desc',
      ACTIVE_ASC: 'active_asc',
      ACTIVE_DESC: 'active_desc',
      DELETED_ASC: 'deleted_asc',
      DELETED_DESC: 'deleted_desc',
    });
  });
});

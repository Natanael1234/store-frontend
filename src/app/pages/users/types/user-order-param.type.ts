import { UserColumnId } from '@pages/users/types/user-column-id/user-column-id.enum';
import { UserOrder } from '@services/user/enums/user-order/user-order.enum';

// TODO: mover
export type UserOrderParam = UserOrder | UserOrder[] | UserColumnId | undefined;

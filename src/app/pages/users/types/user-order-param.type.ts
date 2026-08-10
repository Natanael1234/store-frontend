import { UserOrder } from '../../../services/user/enums/user-order/user-order.enum';
import { UserColumnId } from './user-column-id/user-column-id.enum';

// TODO: mover
export type UserOrderParam = UserOrder | UserOrder[] | UserColumnId | undefined;

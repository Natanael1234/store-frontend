import { UserOrder } from '../../../../../services/user/enums/user-order/user-order.enum';
import { UserColumnId } from '../enums/user-column-id/user-column-id.enum';

export type UserSortParam = UserOrder | UserOrder[] | UserColumnId | undefined;

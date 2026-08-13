import { ActiveFilter } from '../../../../enums/active-filter/active-filter.enum';
import { DeletedFilter } from '../../../../enums/deleted-filter/deleted-filter.enum';
import { UserOrder } from '../../../../services/user/enums/user-order/user-order.enum';

// TODO: test
export interface UserFilterUserDialogData {
    order: UserOrder;
    active: ActiveFilter;
    deleted: DeletedFilter;
}

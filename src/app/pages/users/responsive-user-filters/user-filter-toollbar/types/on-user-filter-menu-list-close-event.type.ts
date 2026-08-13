import { ActiveFilter } from '@enums/active-filter/active-filter.enum';
import { DeletedFilter } from '@enums/deleted-filter/deleted-filter.enum';
import { UserOrder } from '@services/user/enums/user-order/user-order.enum';

export type OnUserFilterMenuListSubmitEvent = {
    active: ActiveFilter;
    deleted: DeletedFilter;
    order: UserOrder;
};

export type OnUserFilterMenuListCancelEvent = false;

export type onUserFilterListEvent = {
    textQuery: string;
    active: ActiveFilter;
    deleted: DeletedFilter;
    order: UserOrder;
};

export type OnUserFilterMenuListCloseEvent =
    | OnUserFilterMenuListSubmitEvent
    | OnUserFilterMenuListCancelEvent;

export type OnUserFilterEvent = onUserFilterListEvent | false;

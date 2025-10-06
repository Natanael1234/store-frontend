import { ActiveFilter } from '../../../../enums/active-filter/active-filter.enum';
import { DeletedFilter } from '../../../../enums/deleted-filter/deleted-filter.enum';
import { FindUserRequestDTO } from '../../../../services/user/dtos/find-user.request/find-user.request.dto';
import { UserOrder } from '../../../../services/user/enums/user-order/user-order.enum';

export const _usersComponentPayloadsData: FindUserRequestDTO[] = [
    {
        textQuery: '',
        active: ActiveFilter.active,
        deleted: DeletedFilter.not_deleted,
        orderBy: [
            UserOrder.name_asc,
            UserOrder.email_asc,
            UserOrder.active_asc,
            UserOrder.deleted_desc,
        ],
        page: 1,
        pageSize: 12,
    },
    {
        textQuery: 'test',
        active: ActiveFilter.all,
        deleted: DeletedFilter.all,
        orderBy: [
            UserOrder.active_desc,
            UserOrder.name_asc,
            UserOrder.email_asc,
            UserOrder.deleted_desc,
        ],
        page: 2,
        pageSize: 2,
    },
];

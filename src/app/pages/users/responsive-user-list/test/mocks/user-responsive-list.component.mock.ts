import { Component, EventEmitter, model, Output } from '@angular/core';
import { UserTableRow } from '@components/table/table/interfaces/user-table-row.interface';
import { ActiveFilter } from '@enums/active-filter/active-filter.enum';
import { DeletedFilter } from '@enums/deleted-filter/deleted-filter.enum';
import { UserOrderParam } from '@pages/users/types/user-order-param.type';
import { UserOrder } from '@services/user/enums/user-order/user-order.enum';

@Component({ selector: 'app-responsive-user-list', template: '' })
export class MockUserResponsiveListComponent {
    public users = model<UserTableRow[]>([]);
    public mobile = model<boolean>(true);
    public loading = model<boolean | undefined>(false);
    public order = model<UserOrderParam>([
        UserOrder.name_asc,
        UserOrder.email_asc,
        UserOrder.active_asc,
        UserOrder.deleted_desc,
    ]);
    public active = model<ActiveFilter>(ActiveFilter.active);
    public deleted = model<DeletedFilter>(DeletedFilter.not_deleted);
    @Output() public updateOrder = new EventEmitter<UserOrder[]>();
    @Output() public headerClick = new EventEmitter<UserOrder[]>();
}

import { Component, EventEmitter, model, Output } from '@angular/core';
import { ActiveFilter } from '../../../../enums/active-filter/active-filter.enum';
import { DeletedFilter } from '../../../../enums/deleted-filter/deleted-filter.enum';
import { UserOrder } from '../../../../services/user/enums/user-order/user-order.enum';
import { UserTableRow } from '../../responsive-user-list/user-table/interfaces/user-table-row.interface';
import { UserSortParam } from '../../responsive-user-list/user-table/types/user-sort-param.type';

@Component({ selector: 'app-responsive-user-list', template: '' })
export class MockUserResponsiveListComponent {
    public users = model<UserTableRow[]>([]);
    public mobile = model<boolean>(true);
    public loading = model<boolean | undefined>(false);
    public sort = model<UserSortParam>([
        UserOrder.name_asc,
        UserOrder.email_asc,
        UserOrder.active_asc,
        UserOrder.deleted_desc,
    ]);
    public active = model<ActiveFilter>(ActiveFilter.active);
    public deleted = model<DeletedFilter>(DeletedFilter.not_deleted);
    @Output() public updateSort = new EventEmitter<UserOrder[]>();
    @Output() public headerClick = new EventEmitter<UserOrder[]>();
}

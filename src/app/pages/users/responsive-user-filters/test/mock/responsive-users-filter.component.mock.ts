import { Component, EventEmitter, model, Output } from '@angular/core';
import { ActiveFilter } from '../../../../../enums/active-filter/active-filter.enum';
import { DeletedFilter } from '../../../../../enums/deleted-filter/deleted-filter.enum';
import { UserOrder } from '../../../../../services/user/enums/user-order/user-order.enum';
import { OnUserFilterEvent } from '../../user-filter-toollbar/types/on-user-filter-menu-list-close-event.type';

@Component({ selector: 'app-responsive-user-filters', template: '' })
export class MockResponsiveUserFiltersComponent {
    public textQuery = model<string>('');
    public active = model<ActiveFilter>(ActiveFilter.active);
    public deleted = model<DeletedFilter>(DeletedFilter.not_deleted);
    public orderBy = model<UserOrder[]>([
        UserOrder.name_asc,
        UserOrder.email_asc,
        UserOrder.active_asc,
        UserOrder.deleted_desc,
    ]);
    public mobile = model<boolean>(true);
    public loading = model<boolean>(false);
    @Output() public refresh = new EventEmitter<OnUserFilterEvent>();
}

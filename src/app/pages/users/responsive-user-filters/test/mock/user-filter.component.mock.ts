import { Component, EventEmitter, model, Output } from '@angular/core';
import { ActiveFilter } from '../../../../../enums/active-filter/active-filter.enum';
import { DeletedFilter } from '../../../../../enums/deleted-filter/deleted-filter.enum';
import { UserOrder } from '../../../../../services/user/enums/user-order/user-order.enum';
import { OnUserFilterMenuListCloseEvent } from '../../user-filter-toollbar/types/on-user-filter-menu-list-close-event.type';

@Component({ selector: 'app-user-filter-toolbar', template: '' })
export class MockUserFilterToolbarComponent {
    public vertical = model<boolean>(true);
    public showSort = model<boolean>(false);
    public showCancelButton = model<boolean>(false);
    public order = model<UserOrder>(UserOrder.name_asc);
    public active = model<ActiveFilter>(ActiveFilter.active);
    public deleted = model<DeletedFilter>(DeletedFilter.not_deleted);
    @Output() public onClose =
        new EventEmitter<OnUserFilterMenuListCloseEvent>();
}

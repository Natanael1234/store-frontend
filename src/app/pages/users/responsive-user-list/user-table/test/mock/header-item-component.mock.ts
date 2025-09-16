import { Component, EventEmitter, model, Output } from '@angular/core';
import { HeaderItemselectEvent } from '../../../../../../components/table/header-item/header-item-select-event';
import { HeaderItemComponent } from '../../../../../../components/table/header-item/header-item.component';
import { SortDirection } from '../../../../../../enums/direction/direction.enum';
import { OnUserFilterMenuListCloseEvent } from '../../../../responsive-user-filters/user-filter-toollbar/types/on-user-filter-menu-list-close-event.type';
import { UserColumnId } from '../../enums/user-column-id/user-column-id.enum';

@Component({
    selector: 'app-header-item',
    template: '',
    providers: [
        { provide: HeaderItemComponent, useClass: MockHeaderItemComponent },
    ],
})
export class MockHeaderItemComponent {
    public id = model<UserColumnId>();
    public label = model<string>('');
    public direction = model<SortDirection>(SortDirection.none);
    public disabled = model<boolean | undefined>(false);
    public sortable = model<boolean | undefined>(true);
    public loading = model<boolean | undefined>(false);
    test = model<boolean>(true);
    @Output() public onClose =
        new EventEmitter<OnUserFilterMenuListCloseEvent>();

    @Output() public onSelect = new EventEmitter<
        HeaderItemselectEvent<UserColumnId>
    >();

    constructor() {}
}

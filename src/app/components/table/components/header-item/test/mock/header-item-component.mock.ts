import { Component, EventEmitter, model, Output } from '@angular/core';
import { HeaderItemComponent } from '@components/table/components/header-item/header-item.component';
import { SortDirection } from '@enums/direction/direction.enum';
import { Sort } from '@interfaces/sort.interface';
import { OnUserFilterMenuListCloseEvent } from '@pages/users/responsive-user-filters/user-filter-toollbar/types/on-user-filter-menu-list-close-event.type';
import { UserColumnId } from '@pages/users/types/user-column-id/user-column-id.enum';

@Component({
    selector: 'app-header-item',
    template: '',
    providers: [
        { provide: HeaderItemComponent, useClass: MockHeaderItemComponent },
    ],
})
export class MockHeaderItemComponent {
    public id = model<UserColumnId>(); // TODO: desaclopar tipo?
    public label = model<string>('');
    public direction = model<SortDirection>(SortDirection.none);
    public disabled = model<boolean | undefined>(false);
    public sortable = model<boolean | undefined>(true);
    public loading = model<boolean | undefined>(false);
    test = model<boolean>(true);
    @Output() public onClose =
        new EventEmitter<OnUserFilterMenuListCloseEvent>();

    @Output() public onSelect = new EventEmitter<Sort | undefined>();

    constructor() {}
}

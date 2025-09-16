import { CommonModule } from '@angular/common';
import {
    Component,
    computed,
    EventEmitter,
    model,
    Output,
} from '@angular/core';
import { ActiveFilter } from '../../../enums/active-filter/active-filter.enum';
import { DeletedFilter } from '../../../enums/deleted-filter/deleted-filter.enum';
import { ItemClickEvent } from '../../../interfaces/item-click.interface';
import { RowClickEvent } from '../../../interfaces/row-click.interface';
import { UserOrder } from '../../../services/user/enums/user-order/user-order.enum';
import { leftMouseClickFilter } from '../../../utils/mouse-events/mouse-click-filter';
import { UserListComponent } from './user-list/user-list.component';
import { UserTableRow } from './user-table/interfaces/user-table-row.interface';
import { UserSortParam } from './user-table/types/user-sort-param.type';
import { UserTableComponent } from './user-table/user-table.component';

@Component({
    selector: 'app-responsive-user-list',
    imports: [CommonModule, UserTableComponent, UserListComponent],
    templateUrl: './responsive-user-list.component.html',
    styleUrl: './responsive-user-list.component.scss',
})
export class ResponsiveUserListComponent {
    /** List of users to be displayed in the table/list. */
    public users = model<UserTableRow[]>([]);

    /**
     * If them component is in mobile mode.
     * When true it is in mobile mode and will show the lista.
     * Desktop mode will show the table otherwhise.
     */
    public mobile = model<boolean>(true);

    /** When true shows list/table loading effects. */
    public loading = model<boolean | undefined>(false);

    /** Sort order for the user table. */
    public sort = model<UserSortParam>([
        UserOrder.name_asc,
        UserOrder.email_asc,
        UserOrder.active_asc,
        UserOrder.deleted_desc,
    ]);

    /** Active field filter. */
    public active = model<ActiveFilter>(ActiveFilter.active);

    /** Deleted field filter. */
    public deleted = model<DeletedFilter>(DeletedFilter.not_deleted);

    /** If active field is enabled. */
    protected activeSortEnabled = computed<boolean>(
        () => this.active() == ActiveFilter.all,
    );

    /** If deleted field is enabled. */
    protected deleteSortEnabled = computed<boolean>(
        () => this.deleted() == DeletedFilter.all,
    );

    /** On update sort event emitter. */
    @Output() public updateSort = new EventEmitter<UserOrder[]>();

    /** On header sort event emitter. Called when user clicks tecler header column. */
    @Output() public headerClick = new EventEmitter<UserOrder[]>();

    /**
     * On item/row click event emitter. Used when user clicks item/row.
     * Emmits the user id of the clicked item/row.
     */
    @Output() public itemClick = new EventEmitter<string>();

    protected fireUpdateSortEvent(orderBy: UserOrder[]) {
        this.updateSort.emit(orderBy);
    }

    protected fireHeaderClickEvent(orderBy: UserOrder[]) {
        this.headerClick.emit(orderBy);
    }

    protected onItemClick(e: ItemClickEvent<UserTableRow>) {
        if (leftMouseClickFilter(e.event)) {
            this.itemClick.emit(e.item.id);
        }
    }

    protected fireRowClickEvent(e: RowClickEvent<UserTableRow>) {
        if (leftMouseClickFilter(e.event)) {
            this.itemClick.emit(e.row.id);
        }
    }
}

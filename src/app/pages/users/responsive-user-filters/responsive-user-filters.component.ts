import { CommonModule } from '@angular/common';
import {
    Component,
    computed,
    effect,
    EventEmitter,
    inject,
    model,
    Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TextFilterComponent } from '../../../components/alert/text-filter/text-filter.component';
import { ActiveFilter } from '../../../enums/active-filter/active-filter.enum';
import { DeletedFilter } from '../../../enums/deleted-filter/deleted-filter.enum';
import { UserOrder } from '../../../services/user/enums/user-order/user-order.enum';
import { UserFilterUserDialogData } from './user-filter-dialog/filter-dialog-data';
import { UserFilterDialogComponent } from './user-filter-dialog/user-filter-dialog.component';
import {
    OnUserFilterEvent,
    OnUserFilterMenuListCloseEvent,
    OnUserFilterMenuListSubmitEvent,
} from './user-filter-toollbar/types/on-user-filter-menu-list-close-event.type';
import { UserFilterToolbarComponent } from './user-filter-toollbar/user-filter-toolbar.component';

@Component({
    selector: 'app-responsive-user-filters',
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        TextFilterComponent,
        UserFilterToolbarComponent,
    ],
    templateUrl: './responsive-user-filters.component.html',
    styleUrl: './responsive-user-filters.component.scss',
})
export class ResponsiveUserFiltersComponent {
    /* FILTERS */

    public textQuery = model<string>('');
    public active = model<ActiveFilter>(ActiveFilter.active);
    public deleted = model<DeletedFilter>(DeletedFilter.not_deleted);
    protected previousActive = model<ActiveFilter>(ActiveFilter.active);
    protected previousDeleted = model<DeletedFilter>(DeletedFilter.not_deleted);

    /* ORDERING */

    public orderBy = model<UserOrder[]>([
        UserOrder.name_asc,
        UserOrder.email_asc,
        UserOrder.active_asc,
        UserOrder.deleted_desc,
    ]);
    protected mobileSort = model<UserOrder>(UserOrder.name_asc);

    /* RESPONSIVITY */

    public mobile = model<boolean>(true);

    /* DIALOG */

    protected readonly name = model('');
    protected readonly dialog = inject(MatDialog);
    protected dialogRef?: MatDialogRef<UserFilterDialogComponent, any>;

    /* OTHERS */

    public loading = model<boolean>(false);
    @Output() public refresh = new EventEmitter<OnUserFilterEvent>();

    constructor() {
        effect(() => {
            const mobileSort = this.getMobileSortFromOrderBy();
            const prevMobileSort = this.mobileSort();
            if (prevMobileSort != mobileSort) {
                this.mobileSort.set(mobileSort);
            }
        });
    }

    /**
     *
     * @param event
     */
    protected closeFilterMenu(event: OnUserFilterMenuListCloseEvent) {
        // if saving
        if (event) {
            const { active, deleted, sort } =
                event as OnUserFilterMenuListSubmitEvent;
            this.active.set(active);
            this.deleted.set(deleted);
            this.mobileSort.set(sort as UserOrder);
            this.fireRefreshEvent();
        }
    }

    protected filtersClassList = computed<object>(() => {
        return {
            filters: true,
            mobile: !!this.mobile(),
        };
    });

    protected openFilterDialog(): void {
        this.dialogRef = this.dialog.open(UserFilterDialogComponent, {
            data: {
                sort: this.getMobileSortFromOrderBy() || UserOrder.name_asc,
                active: this.active(),
                deleted: this.deleted(),
            },
            // TODO:
            height: 'calc(100% - 30px)',
            width: 'calc(100% - 30px)',
            maxWidth: '100%',
            maxHeight: '100%',
        });

        this.dialogRef
            .afterClosed()
            .subscribe((result: UserFilterUserDialogData) => {
                if (result !== undefined) {
                    const { sort, active, deleted } = result;
                    if (active) {
                        this.active.set(active);
                    }
                    if (deleted) {
                        this.deleted.set(deleted);
                    }
                    if (sort) {
                        this.mobileSort.set(sort);
                    }
                    this.fireRefreshEvent();
                }
                this.dialogRef = undefined;
            });
    }

    protected onTextSearch(event: string) {
        this.textQuery.set(event || '');
        this.fireRefreshEvent();
    }

    private fireRefreshEvent() {
        const filterEvent: OnUserFilterEvent = {
            textQuery: this.textQuery(),
            sort: this.mobileSort(),
            active: this.active(),
            deleted: this.deleted(),
        };

        this.refresh.emit(filterEvent);
    }

    private getMobileSortFromOrderBy() {
        const orderBy = this.orderBy();
        return orderBy[0];
    }
}

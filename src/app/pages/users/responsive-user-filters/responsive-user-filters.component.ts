import { CommonModule } from '@angular/common';
import {
    Component,
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
    styles: ['#container { display: flex; flex-direction: column; gap: 1em; }'],
    template: `
        @let isMobile = !!mobile();
        <div id="container" [class]="{ filters: true, mobile: isMobile }">
            <app-text-filter
                (textSearch)="onTextSearch($event)"></app-text-filter>
            @if (isMobile) {
                <button mat-button (click)="openFilterDialog()">
                    <mat-icon>filter_list</mat-icon>
                    Ordenar e filtrar
                </button>
            } @else {
                <app-user-filter-toolbar
                    [order]="mobileOrder()"
                    [showOrder]="true"
                    [active]="active()"
                    [deleted]="deleted()"
                    [showCancelButton]="true"
                    [vertical]="false"
                    (onClose)="
                        closeFilterMenu($event)
                    "></app-user-filter-toolbar>
            }
        </div>
    `,
})
export class ResponsiveUserFiltersComponent {
    public loading = model<boolean>(false);
    public mobile = model<boolean>(true);
    public textQuery = model<string>('');
    public active = model<ActiveFilter>(ActiveFilter.active);
    public deleted = model<DeletedFilter>(DeletedFilter.not_deleted);
    public orderBy = model<UserOrder[]>([
        UserOrder.name_asc,
        UserOrder.email_asc,
        UserOrder.active_asc,
        UserOrder.deleted_desc,
    ]);

    protected mobileOrder = model<UserOrder>(UserOrder.name_asc);
    protected previousMobile = model<boolean>(true);

    protected readonly dialog = inject(MatDialog);
    protected dialogRef?: MatDialogRef<UserFilterDialogComponent, any>;

    @Output() public refresh = new EventEmitter<OnUserFilterEvent>();

    constructor() {
        effect(() => {
            const mobileOrder = this.getMobileOrderFromOrderBy();
            const prevMobileOrder = this.mobileOrder();
            if (prevMobileOrder != mobileOrder) {
                this.mobileOrder.set(mobileOrder);
            }
            if (this.previousMobile() != this.mobile()) {
                this.dialogRef?.close();
                this.previousMobile.set(this.mobile());
            }
        });
    }

    protected closeFilterMenu(event: OnUserFilterMenuListCloseEvent) {
        // if saving
        if (event) {
            const { active, deleted, order } =
                event as OnUserFilterMenuListSubmitEvent;

            this.active.set(active);
            this.deleted.set(deleted);
            this.mobileOrder.set(order as UserOrder);
            this.fireRefreshEvent();
        }
    }

    protected openFilterDialog(): void {
        this.dialogRef = this.dialog.open(UserFilterDialogComponent, {
            data: {
                order: this.getMobileOrderFromOrderBy() || UserOrder.name_asc,
                active: this.active(),
                deleted: this.deleted(),
            },
            width: '400px',
            maxWidth: '90vh',
            height: 'auto',
            maxHeight: '90vh', // impede que estoure a tela

            hasBackdrop: true,
        });

        this.dialogRef
            .afterClosed()
            .subscribe((result: UserFilterUserDialogData) => {
                if (result !== undefined) {
                    const { order: sort, active, deleted } = result;
                    if (active) {
                        this.active.set(active);
                    }
                    if (deleted) {
                        this.deleted.set(deleted);
                    }
                    if (sort) {
                        this.mobileOrder.set(sort);
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
            order: this.mobileOrder(),
            active: this.active(),
            deleted: this.deleted(),
        };

        this.refresh.emit(filterEvent);
    }

    private getMobileOrderFromOrderBy() {
        const orderBy = this.orderBy();
        return orderBy[0];
    }
}

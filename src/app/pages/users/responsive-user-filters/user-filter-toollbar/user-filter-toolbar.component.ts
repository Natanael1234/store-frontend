
import { Component, effect, EventEmitter, model, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SelectComponent } from '../../../../components/select/select.component';
import { ActiveFilterOptions } from '../../../../constants/active-filter-options/active-filter-options';
import { DeletedFilterOptions } from '../../../../constants/deleted-filter-options/deleted-filter-options';
import { ActiveFilter } from '../../../../enums/active-filter/active-filter.enum';
import { DeletedFilter } from '../../../../enums/deleted-filter/deleted-filter.enum';
import { UserOrder } from '../../../../services/user/enums/user-order/user-order.enum';
import { UserOrderOptions } from './sort-options/user-sort.options';
import { OnUserFilterMenuListCloseEvent } from './types/on-user-filter-menu-list-close-event.type';

@Component({
    selector: 'app-user-filter-toolbar',
    imports: [
    MatMenuModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDividerModule,
    MatSelectModule,
    MatOptionModule,
    MatChipsModule,
    MatTooltipModule,
    MatDividerModule,
    SelectComponent
],
    templateUrl: './user-filter-toolbar.component.html',
    styleUrl: './user-filter-toolbar.component.scss',
})
export class UserFilterToolbarComponent {
    /**
     * When true shows vertical toolbar.
     * Horizontal toolbar otherwise.
     * Vertical by default.
     */
    public vertical = model<boolean>(true);

    /**
     * When true shows sort widget.
     * Hide sort widget by default.
     */
    public showSort = model<boolean>(false);

    /**
     * When true shows cancel button.
     * Shows cancel button by default.
     */
    public showCancelButton = model<boolean>(false);

    /** Column sort. */
    public sort = model<UserOrder>(UserOrder.name_asc);
    protected previousSort?: string;
    protected innerSort = model<UserOrder>(UserOrder.name_asc);
    protected orderOptions = model(UserOrderOptions);

    /** Active users filter. */
    public active = model<ActiveFilter>(ActiveFilter.active);
    protected previousActive?: string;
    protected innerActive = model<ActiveFilter>(ActiveFilter.active);
    protected activeOptions = model(ActiveFilterOptions);

    /** Deleted users filter. */
    public deleted = model<DeletedFilter>(DeletedFilter.not_deleted);
    protected previousDeleted?: string;
    protected innerDeleted = model<DeletedFilter>(DeletedFilter.not_deleted);
    protected deletedOptions = model(DeletedFilterOptions);

    /** On close event emitter. */
    @Output() public onClose =
        new EventEmitter<OnUserFilterMenuListCloseEvent>();

    constructor() {
        effect(() => {
            if (this.sort() != this.previousSort) {
                this.previousSort = this.sort();
                this.innerSort.set(this.sort());
            }
            if (this.active() != this.previousActive) {
                this.previousActive = this.active();
                this.innerActive.set(this.active());
            }
            if (this.deleted() != this.previousDeleted) {
                this.previousDeleted = this.deleted();
                this.innerDeleted.set(this.deleted());
            }
        });
    }

    protected submit() {
        this.update();
        this.onClose.emit(this.payload);
    }

    protected cancel() {
        this.reset();
        this.onClose.emit(false);
    }

    protected preventClose(event: Event) {
        event.stopPropagation();
    }

    protected get payload(): OnUserFilterMenuListCloseEvent {
        return {
            sort: this.innerSort(),
            active: this.innerActive(),
            deleted: this.innerDeleted(),
        };
    }

    protected update() {
        this.sort.set(this.innerSort());
        this.active.set(this.innerActive());
        this.deleted.set(this.innerDeleted());
    }

    protected reset() {
        this.innerSort.set(this.sort());
        this.innerActive.set(this.active());
        this.innerDeleted.set(this.deleted());
    }
}

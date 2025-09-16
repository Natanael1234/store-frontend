import { CommonModule } from '@angular/common';
import { Component, EventEmitter, model, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ItemClickEvent } from '../../../../interfaces/item-click.interface';
import { UserTableRow } from '../user-table/interfaces/user-table-row.interface';
import { UserItemComponent } from './components/user-item/user-item.component';

@Component({
    selector: 'app-user-list',
    imports: [
        CommonModule,
        MatListModule,
        MatIconModule,
        MatDividerModule,
        MatTooltipModule,
        UserItemComponent,
    ],
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
})
export class UserListComponent {
    /** Users data (results from api). */
    public users = model<UserTableRow[]>([]);

    /** If loading. */
    public loading = model<boolean | undefined>(false);

    /** On item click event emitter. Used when user clicks row. */
    @Output() public itemClick = new EventEmitter<
        ItemClickEvent<UserTableRow>
    >();

    /**
     * On row click action.
     * @param e mouse event.
     * @param item table row data.
     */
    protected onItemClick(event: MouseEvent, item: UserTableRow) {
        if (this.loading()) return;
        this.itemClick.emit({ event, item });
    }
}

import { Component, inject, model } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';
import { OnUserFilterMenuListCloseEvent } from '../user-filter-toollbar/types/on-user-filter-menu-list-close-event.type';
import { UserFilterToolbarComponent } from '../user-filter-toollbar/user-filter-toolbar.component';
import { UserFilterUserDialogData } from './filter-dialog-data';

@Component({
    selector: 'app-user-filter-dialog',
    imports: [UserFilterToolbarComponent, MatDialogModule],
    styleUrl: './user-filter-dialog.component.scss',
    template: `
        <div class="wrapper">
            <app-user-filter-toolbar
                [showOrder]="true"
                [order]="order()"
                [active]="active()"
                [deleted]="deleted()"
                [showCancelButton]="true"
                [vertical]="true"
                (onClose)="closeFilterMenu($event)"></app-user-filter-toolbar>
        </div>
    `,
})
export class UserFilterDialogComponent {
    public data: UserFilterUserDialogData =
        inject<UserFilterUserDialogData>(MAT_DIALOG_DATA);
    public dialogRef: MatDialogRef<
        UserFilterDialogComponent,
        OnUserFilterMenuListCloseEvent
    > = inject(
        MatDialogRef<UserFilterDialogComponent, OnUserFilterMenuListCloseEvent>,
    );

    readonly order = model(this.data.order);
    readonly active = model(this.data.active);
    readonly deleted = model(this.data.deleted);

    protected closeFilterMenu(event: OnUserFilterMenuListCloseEvent): void {
        this.dialogRef.close(event);
    }
}

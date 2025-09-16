import {
    ChangeDetectionStrategy,
    Component,
    inject,
    model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface UserDialogData {
    updated: boolean;
}

/**
 * @title Dialog Overview
 */
@Component({
    selector: 'app-user-dialog',
    imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
    templateUrl: './user-dialog.component.html',
    styleUrl: './user-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDialogComponent {
    readonly dialogRef = inject(MatDialogRef<UserDialogComponent>);
    readonly data = inject<UserDialogData>(MAT_DIALOG_DATA);
    readonly userResult = model(this.data.updated);

    onNoClick(): void {
        this.dialogRef.close();
    }
}

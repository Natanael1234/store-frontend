import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface UserDialogData {
    updated: boolean;
}

@Component({
    selector: 'app-user-dialog',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogContent,
        MatDialogActions,
    ],
    template: `
        <h2 mat-dialog-title>User Dialog</h2>
        <mat-dialog-content>
            <p>user-dialog works!</p>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button (click)="onNoClick()">Cancelar</button>
        </mat-dialog-actions>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDialogComponent {
    readonly dialogRef = inject(MatDialogRef<UserDialogComponent>);
    readonly data = inject<UserDialogData>(MAT_DIALOG_DATA);

    // Model Signal inicializado com o valor vindo dos dados do diálogo
    readonly userResult = model<boolean>(this.data?.updated ?? false);

    onNoClick(): void {
        this.dialogRef.close();
    }
}

import { Component, EventEmitter, Output, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Icon } from '@enums/icons/icons.enum';

export type AlertType =
    'success' | 'info' | 'warning' | 'danger' | 'primary' | 'secondary' | 'light' | 'dark';

@Component({
    selector: 'app-alert',
    imports: [MatIconModule, MatButtonModule], // Removido CommonModule redundante
    styleUrl: './alert.component.scss',
    template: `
        <div
            class="container"
            [class.success]="type() === 'success'"
            [class.info]="type() === 'info'"
            [class.warning]="type() === 'warning'"
            [class.danger]="type() === 'danger'"
            [class.primary]="type() === 'primary'"
            [class.secondary]="type() === 'secondary'"
            [class.light]="type() === 'light'"
            [class.dark]="type() === 'dark'">
            <div class="content">
                @if (icon(); as currentIcon) {
                    <mat-icon aria-hidden="false" [fontIcon]="currentIcon"></mat-icon>
                }
                <div class="message">
                    <ng-content></ng-content>
                </div>
            </div>

            @if (showCloseButton()) {
                <button
                    (click)="onClose.emit()"
                    mat-icon-button
                    aria-label="Fechar alerta"
                    class="close-button">
                    <mat-icon>close</mat-icon>
                </button>
            }
        </div>
    `,
})
export class AlertComponent {
    protected readonly Icon = Icon;

    public readonly showCloseButton = model<boolean>(false);
    public readonly type = model<AlertType>('success');
    public readonly icon = model<Icon>();

    @Output() public readonly onClose = new EventEmitter<void>();
}

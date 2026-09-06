import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Icon } from '@enums/icons/icons.enum';

export type AlertType =
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'primary'
    | 'secondary'
    | 'light'
    | 'dark'; // TODO: separar

@Component({
    selector: 'app-alert',
    imports: [CommonModule, MatIconModule, MatButtonModule],
    styleUrl: './alert.component.scss',
    template: `
        <div
            [class.container]="true"
            [class.success]="type() == 'success'"
            [class.info]="type() == 'info'"
            [class.warning]="type() == 'warning'"
            [class.danger]="type() == 'danger'"
            [class.primary]="type() == 'primary'"
            [class.secondary]="type() == 'secondary'"
            [class.light]="type() == 'light'"
            [class.dark]="type() == 'dark'">
            <div class="content">
                @if (icon()) {
                    <mat-icon
                        aria-hidden="false"
                        [fontIcon]="icon()!"></mat-icon>
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
    public showCloseButton = model<boolean>();
    public type = model<AlertType>('success');
    public icon = model<Icon>();

    @Output() public onClose: EventEmitter<void> = new EventEmitter();
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CommonModule } from '@angular/common';

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
        <div [ngClass]="[type || '']" class="container">
            <div class="content">
                @if (icon) {
                    <mat-icon aria-hidden="false" [fontIcon]="icon"></mat-icon>
                }
                <div class="message">
                    <ng-content></ng-content>
                </div>
            </div>

            @if (showCloseButton) {
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
    @Input() public showCloseButton?: boolean;
    @Input() public type?: AlertType = 'success';
    @Input() public icon?: string;

    @Output() public onClose: EventEmitter<void> = new EventEmitter();
}

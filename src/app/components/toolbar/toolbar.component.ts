import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { leftMouseClickFilter } from '../../utils/mouse-events/mouse-click-filter';

@Component({
    selector: 'app-toolbar',
    imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterModule],
    styles: `
        .spacer {
            flex: 1 1 auto;
        }

        .mat-toolbar {
            gap: 0.5em;
        }
    `,
    template: `
        <mat-toolbar>
            <!-- theme button -->
            <button
                mat-icon-button
                aria-label="Botão menu"
                color="primary"
                (click)="fireToggleMenuEvent($event)">
                <mat-icon>menu</mat-icon>
            </button>

            <!-- title -->
            <span>Meus Produtos</span>

            <!-- spacer -->
            <span class="spacer"></span>

            <!-- theme button -->
            <button
                mat-icon-button
                aria-label="Botão alternar tema"
                (click)="fireToggleThemeEvent($event)">
                <mat-icon>{{ theme }}</mat-icon>
            </button>

            <!-- user button -->

            <button
                mat-icon-button
                aria-label="Botão usuário"
                [routerLink]="'login'">
                <mat-icon>person</mat-icon>
            </button>
        </mat-toolbar>
    `,
})
export class ToolbarComponent {
    @Input() theme: 'light_mode' | 'dark_mode' = 'light_mode'; // TODO: move to enum
    @Output() public toggleMenu = new EventEmitter();
    @Output() public toggleTheme = new EventEmitter();

    protected fireToggleMenuEvent(e: MouseEvent) {
        if (leftMouseClickFilter(e)) {
            this.toggleMenu.emit();
        }
    }

    protected fireToggleThemeEvent(e: MouseEvent) {
        if (leftMouseClickFilter(e)) {
            this.toggleTheme.emit();
        }
    }
}

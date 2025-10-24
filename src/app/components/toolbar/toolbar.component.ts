import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { leftMouseClickFilter } from '../../utils/mouse-events/mouse-click-filter';

@Component({
    selector: 'app-toolbar',
    imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterModule],
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
    @Input() theme: 'light_mode' | 'dark_mode' = 'light_mode';
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

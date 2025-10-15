
import { Component, EventEmitter, model, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { leftMouseClickFilter } from '../../utils/mouse-events/mouse-click-filter';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ListItem } from './types/list-item.model';

@Component({
    selector: 'app-list',
    imports: [MatListModule, MatDividerModule, ListItemComponent],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
})
export class ListComponent {
    public data = model<ListItem[]>([]);
    public loading = model<boolean>(false);
    @Output() public itemClick = new EventEmitter<string>();

    protected onItemClick(event: MouseEvent, id: string) {
        if (this.loading()) return;
        if (!leftMouseClickFilter(event)) return;
        this.itemClick.emit(id);
    }
}

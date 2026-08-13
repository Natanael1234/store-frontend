import { Component, EventEmitter, model, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ListItemComponent } from '@components/list/components/list-item/list-item.component';
import { ListItem } from '@components/list/types/list-item.model';
import { leftMouseClickFilter } from '@utils/mouse-events/mouse-click-filter';

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

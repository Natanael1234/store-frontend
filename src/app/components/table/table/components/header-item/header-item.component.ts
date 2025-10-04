import { Component, EventEmitter, model, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SortDirection } from '../../../../../enums/direction/direction.enum';
import { Sort } from '../../../../../interfaces/sort.interface';
import { leftMouseClickFilter } from '../../../../../utils/mouse-events/mouse-click-filter';
import { toggleSortDirecton } from '../../../table-utils/table-utils';

@Component({
    selector: 'app-header-item',
    imports: [MatIconModule],
    templateUrl: './header-item.component.html',
    styleUrl: './header-item.component.scss',
})
export class HeaderItemComponent {
    public id = model<string>();
    public label = model<string>('');
    public direction = model<SortDirection>(SortDirection.none);
    public disabled = model<boolean | undefined>(false);
    public sortable = model<boolean | undefined>(true);
    public loading = model<boolean | undefined>(false);

    @Output() public onSelect = new EventEmitter<Sort>();

    protected fireOnSelectEvent(event: MouseEvent) {
        if (this.loading()) return;
        if (!this.sortable()) return;
        if (this.disabled()) return;
        if (!leftMouseClickFilter(event)) return;
        this.toggleDirection();
        const columnId = this.id();
        const direction = this.direction();
        if (columnId === undefined) {
            return;
        } else {
            this.onSelect.emit({ columnId, direction });
        }
    }

    protected toggleDirection() {
        this.direction.update(toggleSortDirecton);
    }
}

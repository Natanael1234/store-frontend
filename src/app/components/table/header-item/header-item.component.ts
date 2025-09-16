import {
    Component,
    computed,
    EventEmitter,
    model,
    Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SortDirection } from '../../../enums/direction/direction.enum';
import { leftMouseClickFilter } from '../../../utils/mouse-events/mouse-click-filter';
import { toggleSortDirecton } from '../table-utils/table-utils';
import { HeaderItemselectEvent } from './header-item-select-event';

@Component({
    selector: 'app-header-item',
    imports: [MatIconModule],
    templateUrl: './header-item.component.html',
    styleUrl: './header-item.component.scss',
})
export class HeaderItemComponent<ColumnIdType> {
    public id = model<ColumnIdType>();
    public label = model<string>('');
    public direction = model<SortDirection>(SortDirection.none);
    public disabled = model<boolean | undefined>(false);
    public sortable = model<boolean | undefined>(true);
    public loading = model<boolean | undefined>(false);

    protected disabledClass = computed<string>(() =>
        this.disabled() || this.loading() ? 'disabled' : '',
    );

    protected labelClassList = computed<string[]>(() => [this.disabledClass()]);
    protected iconClassList = computed<string[]>(() => [
        this.direction() || 'hidden',
        this.disabledClass(),
    ]);

    @Output() public onSelect = new EventEmitter<
        HeaderItemselectEvent<ColumnIdType>
    >();

    protected fireOnSelectEvent(event: MouseEvent) {
        if (this.loading()) return;
        if (!this.sortable()) return;
        if (this.disabled()) return;
        if (!leftMouseClickFilter(event)) return;
        this.toggleDirection();
        const columnId = this.id();
        const direction = this.direction();
        if (columnId === undefined) {
            this.onSelect.emit(undefined);
        } else {
            this.onSelect.emit({ columnId, direction });
        }
    }

    protected toggleDirection() {
        this.direction.update(toggleSortDirecton);
    }
}

import {
    Component,
    computed,
    effect,
    EventEmitter,
    model,
    Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderItemComponent } from '@components/table/components/header-item/header-item.component';
import { RowItemComponent } from '@components/table/components/row-item/row-item.component';
import { Column } from '@components/table/model/column/column.model';
import { Row } from '@components/table/model/row/row.model';
import { sortToOrder } from '@components/table/table-utils/table-utils';
import { Sort } from '@interfaces/sort.interface';
import { leftMouseClickFilter } from '@utils/mouse-events/mouse-click-filter';
import _ from 'lodash';

@Component({
    selector: 'app-table',
    imports: [
        MatIconModule,
        MatTableModule,
        MatSortModule,
        MatTooltipModule,
        HeaderItemComponent,
        RowItemComponent,
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
})
export class TableComponent {
    public columns = model<Column[]>([]);
    public data = model<Row[]>([]);
    public loading = model<boolean | undefined>(false);
    @Output() public headerClick = new EventEmitter<string>(); // ex.: 'name_asc'
    @Output() public rowClick = new EventEmitter<string>(); // ex.: '891db31e-dfb5-42ed-b912-48b98463b004'

    protected displayedColumns: string[] = [];
    protected dataSource = computed(() => {
        return new MatTableDataSource<Row>(this.data());
    });
    private previousColumns: Column[] = [];

    constructor() {
        effect(() => {
            if (!_.isEqual(this.columns(), this.previousColumns)) {
                this.previousColumns = this.columns();
                this.displayedColumns = this.columns().map(
                    (column) => column.id,
                );
            }
        });
    }

    /**
     * Fires header click event.
     * @param sort ex.: { columnId: 'name', direction: 'asc' }.
     */
    protected fireHeaderClickEvent(sort: Sort) {
        if (this.loading() || !sort) return;
        const order = sortToOrder(sort);
        this.headerClick.emit(order);
    }

    /**
     *
     * @param event mouse event
     * @param id object identifier
     */
    protected fireRowClickEvent(event: MouseEvent, id: string) {
        if (this.loading()) return;
        if (!leftMouseClickFilter(event)) return;
        this.rowClick.emit(id);
    }
}

import { CommonModule } from '@angular/common';
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
import _ from 'lodash';
import { HeaderItemComponent } from '../../../../components/table/header-item/header-item.component';
import { RowItemComponent } from '../../../../components/table/row-item/row-item.component';
import { SortDirection } from '../../../../enums/direction/direction.enum';
import { Column } from '../../../../interfaces/column.interface';
import { RowClickEvent } from '../../../../interfaces/row-click.interface';
import { Sort } from '../../../../interfaces/sort.interface';
import { UserResponseDto } from '../../../../services/user/dtos/user.response/user.response.dto';
import { UserOrder } from '../../../../services/user/enums/user-order/user-order.enum';
import { UserColumnId } from './enums/user-column-id/user-column-id.enum';
import { UserColumnLabel } from './enums/user-column-name/user-column-label.enum';
import { UserTableRow } from './interfaces/user-table-row.interface';
import { TableSorter } from './sorter/table-sorter';
import { UserSortParam } from './types/user-sort-param.type';

@Component({
    selector: 'app-user-table',
    imports: [
        MatIconModule,
        MatTableModule,
        MatSortModule,
        MatTooltipModule,
        CommonModule,
        HeaderItemComponent,
        RowItemComponent,
    ],
    templateUrl: './user-table.component.html',
    styleUrl: './user-table.component.scss',
})
export class UserTableComponent {
    /** Users data (results from api). */
    public users = model<UserResponseDto[]>([]);

    /** When true shows table loading effects. */
    public loading = model<boolean | undefined>(false);

    /** Generates a user data source for the table, mapped from users array. */
    protected dataSource = computed(() => {
        // Maps the array of users results (from api) into an data source for the table model.
        const tableData: UserTableRow[] = (this.users() || []).map((user) => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                active: !!user.active,
                deleted: !!user.deletedAt,
            };
        });
        return new MatTableDataSource<UserTableRow>(tableData);
    });

    /** Name column model. */
    protected name = model<Column<UserColumnId>>({
        columnId: UserColumnId.name,
        direction: SortDirection.asc,
        label: UserColumnLabel.name,
    });

    /** Email column model. */
    protected email = model<Column<UserColumnId>>({
        columnId: UserColumnId.email,
        direction: SortDirection.asc,
        label: UserColumnLabel.email,
    });

    /** Active column model. */
    protected active = model<Column<UserColumnId>>({
        columnId: UserColumnId.active,
        direction: SortDirection.asc,
        label: UserColumnLabel.active,
    });

    /** Deleted column model. */
    protected deleted = model<Column<UserColumnId>>({
        columnId: UserColumnId.deleted,
        direction: SortDirection.desc,
        label: UserColumnLabel.deleted,
    });

    /**
     * Columns model array.
     * Contains all columns used in the table.
     */
    protected columns = model<Column<UserColumnId>[]>([
        this.name(),
        this.email(),
        this.active(),
        this.deleted(),
    ]);

    protected sorter = new TableSorter<
        UserColumnId,
        typeof UserColumnId,
        UserOrder,
        typeof UserOrder
    >(UserColumnId, UserOrder, this.columns());

    /** Fires an column(s) update. */
    public sort = model<UserSortParam>();

    /**
     * Previous column updates.
     * Used to make comparisons with the current column update in order to detect changes.
     */
    private prevSort: UserSortParam = [];

    /** If true active column's sort is enabled. */
    public activeSortEnabled = model<boolean | undefined>(true);
    /** If true deleted column's sort is enabled. */
    public deletedSortEnabled = model<boolean | undefined>(true);

    protected activeSortable = computed(
        () => this.activeSortEnabled() !== false,
    );

    protected deletedSortable = computed(
        () => this.deletedSortEnabled() !== false,
    );

    /** On update sort event emitter. */
    @Output() public updateSort = new EventEmitter<UserOrder[]>();

    /** On header click event emitter. */
    @Output() public headerClick = new EventEmitter<UserOrder[]>();

    /** On row click event emitter. */
    @Output() public rowClick = new EventEmitter<RowClickEvent<UserTableRow>>();

    /** Columns displayed in the table. */
    protected displayedColumns: string[] = [
        this.name().columnId,
        this.email().columnId,
        this.active().columnId,
        this.deleted().columnId,
    ];

    constructor() {
        // Detects changes in the sort model and updates the columns model accordingly.
        effect(() => {
            this.updateSortOnChange();
        });
    }

    private updateSortOnChange() {
        // If the sort param has changed
        if (this.sortParamHasChanged()) {
            this.updatePrevSort();
            const sort = this.sort();
            if (this.sortIsArray(sort)) {
                this.sorter.sortByOrderIds(sort as UserOrder[]);
            } else if (this.sortIsColumn(sort)) {
                this.sorter.sortByColumnIdAndDirection(sort as UserColumnId);
            } else if (this.sortIsOrder(sort)) {
                this.sorter.sortByOrderId(sort as UserOrder);
            }
            this.updateColumns();
            this.fireUpdateSortEvent();
        }
    }

    private sortParamHasChanged(): boolean {
        const sort = this.sort();
        const prevSort = this.prevSort;
        return !_.isEqual(prevSort, sort);
    }

    private updatePrevSort() {
        const sort = this.sort();
        this.prevSort = sort;
    }

    private sortIsArray(sortParam: UserSortParam): boolean {
        const sort = this.sort();
        return Array.isArray(sort);
    }

    private sortIsColumn(sortParam: UserSortParam): boolean {
        return (
            typeof sortParam === 'string' &&
            Object.values(UserColumnId).includes(sortParam as UserColumnId)
        );
    }

    private sortIsOrder(sortParam: UserSortParam): boolean {
        return (
            typeof sortParam === 'string' &&
            Object.values(UserOrder).includes(sortParam as UserOrder)
        );
    }

    /**
     * Called when table header cell is clicked.
     * Updates the th header cell direction.
     * @param sort sort state composed of column name and direction.
     */
    protected onSelectBySort(sort: Sort<UserColumnId> | undefined) {
        const loading = this.loading();
        if (loading || !sort) return;

        const isActiveColumn = sort.columnId === UserColumnId.active;
        if (isActiveColumn) {
            const activeSortable = this.activeSortable();
            if (!activeSortable) {
                return;
            }
        }

        const isDeletedColumn = sort.columnId === UserColumnId.deleted;
        if (isDeletedColumn) {
            const deletedSortable = this.deletedSortable();
            if (!deletedSortable) {
                return;
            }
        }

        this.sorter.sortBySortObject(sort);
        this.updateColumns();
        this.fireHeaderClickEvent();
    }

    /** Fires update sort event when the order of the columns cheanges due do sort being updated. */
    private fireUpdateSortEvent() {
        if (!this.loading()) {
            this.updateSort.emit(this.sorter.getOrderBy());
        }
    }

    /** Fires header click event when the order of the columns changes due to a click in a column. */
    private fireHeaderClickEvent() {
        if (!this.loading()) {
            this.headerClick.emit(this.sorter.getOrderBy());
        }
    }

    /**
     * Fires row click evend when one row is clicked.
     * @param e mouse event.
     * @param row table row data.
     */
    protected fireRowClickEvent(e: MouseEvent, row: UserTableRow) {
        if (this.loading()) {
            return;
        }
        this.rowClick.emit({ event: e, row });
    }

    /** Updates columns according to the sorter. */
    private updateColumns() {
        const columns = this.sorter.getColumns();
        this.columns.set(columns);
        const name = columns.find(
            (column) => column.columnId === UserColumnId.name,
        );
        const email = columns.find(
            (column) => column.columnId === UserColumnId.email,
        );
        const active = columns.find(
            (column) => column.columnId === UserColumnId.active,
        );
        const deleted = columns.find(
            (column) => column.columnId === UserColumnId.deleted,
        );
        if (name) this.name.set(name);
        if (email) this.email.set(email);
        if (active) this.active.set(active);
        if (deleted) this.deleted.set(deleted);
    }
}

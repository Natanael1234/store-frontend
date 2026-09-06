import { Column } from '@components/table/model/column/column.model';
import {
    orderToSort,
    sortToOrder,
    splitOrderData,
    toggleSortDirecton,
} from '@components/table/table-utils/table-utils';
import { SortDirection } from '@enums/direction/direction.enum';
import { Sort } from '@interfaces/sort.interface';

/**
 * ColumnIdType enum. @example UserColumnId.
 * OrderType enum. @example UserOrder.
 */
export class TableSorter {
    protected columns: Column[] = [];

    /** @param columns all column ids used in the table. */
    constructor(columns: Column[]) {
        this.columns = columns;
    }

    public getColumns(): Column[] {
        return this.columns;
    }

    public getDisplayedColumns() {
        return this.columns.map((column) => column.id);
    }

    public getColumn(columnId: string) {
        return this.columns.find((column) => column.id === columnId);
    }

    public getOrderBy(): string[] {
        const orders = this.columns
            .filter((column) => column.direction)
            .sort(
                (column1, column2) =>
                    (column1.position || 0) - (column2.position || 0),
            )
            .map((column: Column) =>
                sortToOrder({
                    columnId: column.id,
                    direction: column.direction,
                }),
            );
        return orders;
    }

    public getFirstOrderBy(): string {
        const orders = this.getOrderBy();
        return orders[0];
    }

    public sortBySortObject(sort: Sort | undefined) {
        if (!sort) return; // TODO:
        const columnId = sort.columnId;
        const direction = sort.direction;
        this.orderByColumnIdAndDirection(columnId, direction);
    }

    public orderByOrderId(orderId: string) {
        const { columnId, direction } = orderToSort(orderId);
        // order by column id and direction
        this.orderByColumnIdAndDirection(columnId, direction);
    }

    public orderByOrderIds(orderIds: string[]) {
        const sorts = orderIds.map((order) => splitOrderData(order));

        let rightShift = orderIds.length;
        this.columns

            .filter((column) =>
                sorts.find((sort) => sort.columnId == column.id),
            )
            .sort((column1, column2) => column1.position - column2.position)
            .map((column) => {
                const sortIdx = sorts.findIndex(
                    (sort) => sort.columnId == column.id,
                );
                column.position = sortIdx;
                const sort = sorts[sortIdx];
                column.direction = sort.direction;
                return column;
            });
        // .sort((column1, column2) => column1.position - column2.position);

        this.columns
            .filter(
                (column) => !sorts.find((sort) => sort.columnId == column.id),
            )
            .sort((column1, column2) => column1.position - column2.position)
            .map((column) => {
                column.position = rightShift++;
            });
    }

    public orderByColumnIdAndDirection(
        columnId: string,
        direction?: SortDirection,
    ) {
        // find column
        const idx = this.columns.findIndex((column) => column.id == columnId);
        if (idx < 0) {
            return;
        }

        // get the column
        const column = this.columns[idx];

        // toggle column direction
        if (direction === undefined) {
            column.direction = toggleSortDirecton(column.direction);
        } else {
            column.direction = direction;
        }

        // sets the selected column at the beggining

        // increment the position of other columns
        for (const column of this.columns) {
            if (column.position < idx) {
                column.position++;
            }
        }
        column.position = 0;
    }
}

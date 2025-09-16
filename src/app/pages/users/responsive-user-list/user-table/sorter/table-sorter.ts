import {
    orderToSort,
    sortToOrder,
    splitOrderData,
    toggleSortDirecton,
} from '../../../../../components/table/table-utils/table-utils';
import { SortDirection } from '../../../../../enums/direction/direction.enum';
import { Column } from '../../../../../interfaces/column.interface';
import { Sort } from '../../../../../interfaces/sort.interface';

/**
 * ColumnIdType enum. @example UserColumnId.
 * OrderType enum. @example UserOrder.
 */
export class TableSorter<
    ColumnId extends string,
    ColumnIdType extends Record<string, ColumnId>,
    OrderId extends string,
    OrderType extends Record<string, OrderId>,
> {
    protected columnEnum: ColumnIdType;
    protected orderEnum: OrderType;
    protected columns: Column<ColumnId>[] = [];

    /**
     *
     * @returns Returns the columns used in the table.
     */
    public getColumns(): Column<ColumnId>[] {
        return this.columns;
    }

    /** Generates an user order array from selected columns. Contains only ordered columns. */
    public getOrderBy(): OrderId[] {
        const orders = this.columns
            .filter((column) => column.direction)
            .map((column: Column<ColumnId>) =>
                sortToOrder<ColumnId, OrderId>({
                    columnId: column.columnId,
                    direction: column.direction,
                }),
            );
        return orders;
    }

    /**
     * @param columns all column ids used in the table.
     * @param orderEnum all possible orders types used in the table.
     */
    constructor(
        columnEnum: ColumnIdType,
        orderEnum: OrderType,
        columns: Column<ColumnId>[] = [],
    ) {
        this.columnEnum = columnEnum;
        this.orderEnum = orderEnum;
        this.columns = columns;
    }

    /** Sorts by column sort object */
    public sortBySortObject(sort: Sort<ColumnId> | undefined) {
        if (!sort) return; // TODO:
        const columnId = sort.columnId as unknown as ColumnId;
        const direction = sort.direction as unknown as SortDirection;
        this.sortByColumnIdAndDirection(columnId, direction);
    }

    /** Sorts by column id and direction.
     * @param columnId column id.
     * @param direction sort direction.
     * @returns
     */
    public sortByColumnIdAndDirection(
        columnId: ColumnId,
        direction?: SortDirection,
    ) {
        // get columns
        let columns = [...this.columns];
        // find column
        const idx = columns.findIndex((column) => column.columnId == columnId);
        if (idx < 0) {
            return;
        }
        // get the column
        const column = columns[idx];
        // removes the column from columns
        columns.splice(idx, 1);
        // toggle column direction
        if (direction === undefined) {
            column.direction = toggleSortDirecton(column.direction);
        } else {
            column.direction = direction;
        }
        // reorder columns
        // columns = columns.filter((column) => column.columnId == columnId);
        // adds the column at begin of columns
        columns.unshift(column);

        // updates columns
        this.columns = columns;
    }

    public sortByOrderId(orderId: OrderId) {
        const { columnId, direction } = orderToSort<OrderId, ColumnId>(orderId);
        // order by column id and direction
        this.sortByColumnIdAndDirection(columnId, direction);
    }

    /** Sets the order of multiple columns.
     * @param ordering ordering data. Columns not specified here will be not ordered.
     */
    public sortByOrderIds(ordering: OrderId[]) {
        const columns = [...this.columns];
        const normalizedOrderings = ordering.map((order) =>
            splitOrderData<OrderId, ColumnId>(order),
        );

        // updates column's direction property

        // finds and updates the directions of each column of the table
        // for each column
        for (const column of columns) {
            // searches the respective ordering parameter
            const normalizedOrdering = normalizedOrderings.find(
                ({ columnId }) => column.columnId == columnId,
            );

            // if found column ordering parameter
            if (normalizedOrdering) {
                // sets column direction as the same of the ordering data.
                column.direction = normalizedOrdering.direction;
            }
            // if not found column ordering parameter
            else {
                // sets column without direction.
                column.direction = SortDirection.none;
            }
        }

        // moves changed columns to begin of the ordering
        // runs through the column ordering from back to front
        for (let i = normalizedOrderings.length - 1; i > -1; i--) {
            const { columnId, direction } = normalizedOrderings[i];
            // searches the respective column
            const j = columns.findIndex(
                (column) => column.columnId == columnId,
            );
            // if found the column
            if (j > -1) {
                const column = columns[j];
                // if direction is defined
                if (direction) {
                    // moves it to begin
                    columns.splice(j, 1);
                    columns.unshift(column);
                }
            }
        }

        // At the end the columns should be ordered according to ordering parameter.
        // Columns without ordering will be at the end.

        this.columns = columns;
    }
}

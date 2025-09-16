import { SortDirection } from '../../../enums/direction/direction.enum';
import { Sort } from '../../../interfaces/sort.interface';

/**
 * Converts an Sort object into an Order object.
 * @param sort Sort object. Ex.: UserColumnId.name.
 * @returns Order object. Ex.: UserOrder.name_asc.
 */
export function sortToOrder<
    ColumnIdType extends string,
    OrderType extends string,
>(sort: Sort<ColumnIdType>): OrderType {
    return `${sort.columnId}_${sort.direction}` as unknown as OrderType;
}

/**
 * Converts an Order object into an Sort object.
 * @param order Order object.  Ex.: UserColumnId.name.
 * @returns Sort object. Ex.: { columnId: UserColumnId.name, direction: SortDirection.asc, }
 */
export function orderToSort<
    OrderType extends string,
    ColumnIdType extends string,
>(order: OrderType): Sort<ColumnIdType> {
    const [_columnId, _direction] = order.split('_');
    const columnId = _columnId as unknown as ColumnIdType;
    const direction = _direction as unknown as SortDirection;
    const sort: Sort<ColumnIdType> = { columnId, direction };
    return sort;
}

/**
 * Split an order value into an structured object.
 * @param order Order object. Example: UserOrder.name_asc.
 * @returns structured object. Example { column: UserColumnId.name, direction: SortDirection.asc }.
 */
export function splitOrderData<
    OrderType extends string,
    ColumnIdType extends string,
>(order: OrderType): Sort<ColumnIdType> {
    const [_columnId, _direction] = order.split('_');
    const columnId = _columnId as unknown as ColumnIdType;
    const direction = _direction as unknown as SortDirection;
    const sort: Sort<ColumnIdType> = { columnId, direction };
    return sort;
}

/**
 * Toggles sort direction as follows:
 * - "asc" -> "desc";
 * - "desc" -> "";
 * - "" =>  "asc".
 * @param currentDirecton sort direction.
 * @returns toggled sort direction.
 */
export function toggleSortDirecton(currentDirecton: SortDirection) {
    let newDirection;
    if (currentDirecton == SortDirection.asc) {
        newDirection = SortDirection.desc;
    } else if (currentDirecton == SortDirection.desc) {
        newDirection = SortDirection.none;
    } else {
        newDirection = SortDirection.asc;
    }
    return newDirection as SortDirection;
}

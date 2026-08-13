import { SortDirection } from '../../../enums/direction/direction.enum';
import { Sort } from '../../../interfaces/sort.interface';

/**
 * Converts an sort object into an order string.
 * @param sort Sort object. Ex.: {columnId:'name, direction: SortDirection.asc }
 * @returns Order string. Ex.: 'name_asc'.
 */
export function sortToOrder(sort: Sort): string {
    return `${sort.columnId}_${sort.direction}`;
}

/**
 * Converts an order string into an sort object.
 * @param order Order string. Ex.: 'name_asc'.
 * @returns Sort object. Ex.: { columnId: 'name', direction: SortDirection.asc, }
 */
export function orderToSort(order: string): Sort {
    const [_columnId, _direction] = order.split('_');
    const columnId = _columnId;
    const direction = _direction as unknown as SortDirection;
    const sort: Sort = { columnId, direction };
    return sort;
}

// TODO: unir ao orderToSort. mesmo métoto
/**
 * Split an order value into an structured object.
 * @param order order string. Ex.: 'name_asc'.
 * @returns structured object. Ex.: { column: UserColumnId.name, direction: SortDirection.asc }.
 */
export function splitOrderData(order: string): Sort {
    const [_columnId, _direction] = order.split('_');
    const columnId = _columnId;
    const direction = _direction as unknown as SortDirection;
    const sort: Sort = { columnId, direction };
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

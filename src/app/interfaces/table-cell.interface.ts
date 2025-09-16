import { SortDirection } from '../enums/direction/direction.enum';
import { UserColumnId } from '../pages/users/responsive-user-list/user-table/enums/user-column-id/user-column-id.enum';

/** Table header cell. */
export interface TableHeaderCell {
    /** column id. */
    columnId: UserColumnId;
    /** Column label. */
    label: string;
    /** Column direction. */
    direction: SortDirection;
}

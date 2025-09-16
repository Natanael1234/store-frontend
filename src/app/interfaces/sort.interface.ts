import { SortDirection } from '../enums/direction/direction.enum';

/** The current sort state. */
export interface Sort<ColumnIdType> {
    /** The id of the column being sorted. */
    columnId: ColumnIdType;
    /** The sort direction. */
    direction: SortDirection;
}

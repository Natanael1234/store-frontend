import { SortDirection } from '@enums/direction/direction.enum';

/** The current sort state. */
export interface Sort {
    /** The id of the column being sorted. */
    columnId: string;
    /** The sort direction. */
    direction: SortDirection;
}

import { SortDirection } from '../enums/direction/direction.enum';

/** Table column. */
export interface Column<ColumnIdType> {
    /** Column id. */
    columnId: ColumnIdType;
    /** Column direction. */
    direction: SortDirection;
    /** Column label. */
    label: string;
    /** If column is disabled. */
    disabled?: boolean;
}

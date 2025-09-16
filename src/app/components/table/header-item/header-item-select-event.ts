import { Sort } from '../../../interfaces/sort.interface';

export type HeaderItemselectEvent<ColumnIdType> =
    | Sort<ColumnIdType>
    | undefined;

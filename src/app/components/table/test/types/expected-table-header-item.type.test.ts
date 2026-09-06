import { SortDirection } from '@enums/direction/direction.enum';

export type _ExpectedTableHeaderItem = {
    id: string;
    label: string;
    direction: SortDirection;
    sortable?: boolean;
    disabled: boolean;
};

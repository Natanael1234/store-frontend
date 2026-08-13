import { SortDirection } from '../../../../../enums/direction/direction.enum';

// TODO: transform into class
/** Table column. */
export class Column {
    /** Column id. */
    id: string;
    /** Column direction. */
    direction: SortDirection;
    /** Column label. */
    label: string;
    /** If column is disabled. */
    disabled?: boolean;
    /** If column is sortable. */
    sortable?: boolean;
    /** Column position in the order by. Starting in 0. */
    position: number;
    /** If column should shrink to fit content width. */
    shrink?: boolean;

    constructor(options: {
        id: string;
        direction: SortDirection;
        label: string;
        disabled?: boolean;
        sortable?: boolean;
        position: number;
        shrink?: boolean;
    }) {
        this.id = options.id;
        this.direction = options.direction;
        this.label = options.label;
        this.disabled = options.disabled || false;
        this.sortable = options.sortable || false;
        this.position = options.position;
        this.shrink = options.shrink || false;
    }
}

/** Row click event. */
export interface RowClickEvent<RowType> {
    /** Mouse event. */
    event: MouseEvent;
    /** Clicked table row data. */
    row: RowType;
}

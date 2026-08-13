/** Item click event. */
export interface ItemClickEvent<ItemType> {
    /** Mouse event. */
    event: MouseEvent;
    /** Clicked list item data. */
    item: ItemType;
}

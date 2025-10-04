import { ItemIcon } from '../../models/item-icon/item-icon.model';
import { ItemLabel } from '../../models/item-label/item-label.model';

// TODO: test
export class ListItem {
    public id: string;
    public icons: ItemIcon[];
    public labels: ItemLabel[];

    constructor(options: {
        id: string;
        icons: ItemIcon[];
        labels: ItemLabel[];
    }) {
        this.id = options.id;
        this.icons = options.icons;
        this.labels = options.labels;
    }
}

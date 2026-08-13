import { ItemIcon } from '../../../../../models/item-icon/item-icon.model';
import { ItemLabel } from '../../../../../models/item-label/item-label.model';
import { ListItemComponent } from '../../list-item.component';

type ListItemData = { icons: ItemIcon[]; labels: ItemLabel[] };

export function _testSetComponentData(
    component: ListItemComponent,
    data: ListItemData,
    loading?: boolean,
) {
    component.icons.set(data.icons);
    component.labels.set(data.labels);
    if (typeof loading == 'boolean') {
        component.loading.set(loading);
    }
}

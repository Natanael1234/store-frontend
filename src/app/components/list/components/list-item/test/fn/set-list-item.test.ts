import { ListItemComponent } from '@components/list/components/list-item/list-item.component';
import { ItemIcon } from '@components/models/item-icon/item-icon.model';
import { ItemLabel } from '@components/models/item-label/item-label.model';

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

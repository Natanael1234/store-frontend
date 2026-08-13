import { Component, model } from '@angular/core';
import { ItemIcon } from '../../../../../models/item-icon/item-icon.model';
import { ItemLabel } from '../../../../../models/item-label/item-label.model';
import { ListItemComponent } from '../../list-item.component';

@Component({
    selector: 'app-list-item',
    template: '',
    providers: [
        { provide: ListItemComponent, useClass: MockListItemComponent },
    ],
})
export class MockListItemComponent {
    public labels = model<ItemLabel[]>([]);
    public icons = model<ItemIcon[]>([]);
    public loading = model<boolean>(false);
}

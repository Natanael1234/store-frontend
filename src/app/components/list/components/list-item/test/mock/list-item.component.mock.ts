import { Component, model } from '@angular/core';
import { ListItemComponent } from '@components/list/components/list-item/list-item.component';
import { ItemIcon } from '@components/models/item-icon/item-icon.model';
import { ItemLabel } from '@components/models/item-label/item-label.model';

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

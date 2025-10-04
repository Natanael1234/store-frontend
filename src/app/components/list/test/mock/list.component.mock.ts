import { Component, EventEmitter, model, Output } from '@angular/core';
import { ListComponent } from '../../list.component';
import { ListItem } from '../../types/list-item.model';

@Component({
    selector: 'app-list',
    template: '',
    providers: [{ provide: ListComponent, useClass: MockListComponent }],
})
export class MockListComponent {
    public data = model<ListItem[]>([]);
    public loading = model<boolean>(false);
    @Output() public itemClick = new EventEmitter<string>();
}

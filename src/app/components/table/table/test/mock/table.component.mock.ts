import { Component, EventEmitter, model, Output } from '@angular/core';
import { Column } from '../../model/column/column.model';
import { Row } from '../../model/row/row.model';
import { TableComponent } from '../../table.component';

// TODO: remover
@Component({
    selector: 'app-table',
    template: '',
    providers: [{ provide: TableComponent, useClass: MockTableComponent }],
})
export class MockTableComponent {
    public columns = model<Column[]>([]);
    public data = model<Row[]>([]);
    public loading = model<boolean | undefined>(false);
    @Output() public headerClick = new EventEmitter<string>();
    @Output() public rowClick = new EventEmitter<string>();
    constructor() {}
}

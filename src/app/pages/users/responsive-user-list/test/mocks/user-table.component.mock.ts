import { Component, EventEmitter, model, Output } from '@angular/core';
import { RowClickEvent } from '../../../../../interfaces/row-click.interface';
import { UserResponseDto } from '../../../../../services/user/dtos/user.response/user.response.dto';
import { UserOrder } from '../../../../../services/user/enums/user-order/user-order.enum';
import { UserTableRow } from '../../user-table/interfaces/user-table-row.interface';
import { UserSortParam } from '../../user-table/types/user-sort-param.type';
import { UserTableComponent } from '../../user-table/user-table.component';

@Component({
    selector: 'app-user-table',
    template: '',
    providers: [
        { provide: UserTableComponent, useClass: MockUserTableComponent },
    ],
})
export class MockUserTableComponent {
    public users = model<UserResponseDto[]>([]);
    public loading = model<boolean | undefined>(false);
    public sort = model<UserSortParam>();
    public activeSortEnabled = model<boolean | undefined>(true);
    public deletedSortEnabled = model<boolean | undefined>(true);
    @Output() public updateSort = new EventEmitter<UserOrder[]>();
    @Output() public headerClick = new EventEmitter<UserOrder[]>();
    @Output() public rowClick = new EventEmitter<RowClickEvent<UserTableRow>>();
    constructor() {}
}

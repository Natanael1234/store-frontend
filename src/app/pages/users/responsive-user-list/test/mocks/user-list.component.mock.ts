import { Component, EventEmitter, model, Output } from '@angular/core';
import { ItemClickEvent } from '../../../../../interfaces/item-click.interface';
import { UserResponseDto } from '../../../../../services/user/dtos/user.response/user.response.dto';
import { UserTableRow } from '../../user-table/interfaces/user-table-row.interface';

@Component({ selector: 'app-user-list', template: '' })
export class MockUserListComponent {
    public users = model<UserResponseDto[]>([]);
    public loading = model<boolean>(false);
    @Output() public itemClick = new EventEmitter<
        ItemClickEvent<UserTableRow>
    >();
}

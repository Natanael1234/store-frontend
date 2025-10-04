import { Component, EventEmitter, model, Output } from '@angular/core';
import { UserResponseDto } from '../../../../../services/user/dtos/user.response/user.response.dto';
// TODO: remover
@Component({ selector: 'app-user-list', template: '' })
export class MockListComponent {
    public users = model<UserResponseDto[]>([]);
    public loading = model<boolean>(false);
    @Output() public itemClick = new EventEmitter<string>();
}

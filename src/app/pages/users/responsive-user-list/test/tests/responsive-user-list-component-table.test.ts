import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserResponseDto } from '../../../../../services/user/dtos/user.response/user.response.dto';
import { ResponsiveUserListComponent } from '../../responsive-user-list.component';
import { UserSortParam } from '../../user-table/types/user-sort-param.type';
import { UserTableComponent } from '../../user-table/user-table.component';

export function testResponsiveUsersListComponentTable(
    fixture: ComponentFixture<ResponsiveUserListComponent>,
    options?:
        | {
              users: UserResponseDto[];
              sort: UserSortParam;
              loading: boolean;
              activeSortEnabled: boolean;
              deletedSortEnabled: boolean;
          }
        | false,
): UserTableComponent | null {
    const debugElements = fixture.debugElement.queryAll(
        By.directive(UserTableComponent),
    );
    expect(debugElements.length)
        .withContext(options ? 'user table defined' : 'user table not defined')
        .toEqual(options ? 1 : 0);
    if (!options) return null;
    const tableComponent = debugElements[0]
        .componentInstance as unknown as UserTableComponent;
    if (!options) return tableComponent;

    expect(tableComponent.loading())
        .withContext('loading')
        .toEqual(options.loading);
    expect(tableComponent.activeSortEnabled())
        .withContext('activeSortEnabled')
        .toEqual(options.activeSortEnabled);
    expect(tableComponent.deletedSortEnabled())
        .withContext('deletedSortEnabled')
        .toEqual(options.deletedSortEnabled);
    expect(tableComponent.users())
        .withContext('users data')
        .toEqual(options.users);
    expect(tableComponent.sort()).withContext('sort').toEqual(options.sort);
    return tableComponent;
}

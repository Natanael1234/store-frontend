import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ResponsiveUserListComponent } from '../../responsive-user-list.component';
import { UserListComponent } from '../../user-list/user-list.component';
import { UserTableRow } from '../../user-table/interfaces/user-table-row.interface';

export function testResponsiveUsersListComponentList(
    fixture: ComponentFixture<ResponsiveUserListComponent>,
    options?: { users: UserTableRow[]; loading: boolean } | false,
): UserListComponent | null {
    const debugElements = fixture.debugElement.queryAll(
        By.directive(UserListComponent),
    );
    expect(debugElements.length)
        .withContext(options ? 'user list defined' : 'user list not defined')
        .toEqual(options ? 1 : 0);
    if (!options) return null;
    const listComponent = debugElements[0]
        .componentInstance as unknown as UserListComponent;
    if (!options) return listComponent;
    expect(listComponent.users())
        .withContext('users data')
        .toEqual(options.users);
    expect(listComponent.loading())
        .withContext('loading')
        .toEqual(options.loading);
    return listComponent;
}

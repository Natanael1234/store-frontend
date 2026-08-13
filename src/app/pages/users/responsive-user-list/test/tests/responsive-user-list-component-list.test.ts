import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ListComponent } from '@components/list/list.component';
import { ListItem } from '@components/list/types/list-item.model';
import { ResponsiveUserListComponent } from '@pages/users/responsive-user-list/responsive-user-list.component';

export function _testResponsiveUsersListComponentList(
    fixture: ComponentFixture<ResponsiveUserListComponent>,
    options?: { data: ListItem[]; loading: boolean } | false,
): ListComponent | null {
    const debugElements = fixture.debugElement.queryAll(
        By.directive(ListComponent),
    );

    expect(debugElements.length)
        .withContext(options ? 'user list defined' : 'user list not defined')
        .toEqual(options ? 1 : 0);
    if (!options) return null;
    const responsiveUserlistComponent = debugElements[0]
        .componentInstance as unknown as ListComponent;
    if (!options) return responsiveUserlistComponent;
    expect(responsiveUserlistComponent.data())
        .withContext('users data')
        .toEqual(options.data);
    expect(responsiveUserlistComponent.loading())
        .withContext('loading')
        .toEqual(options.loading);
    return responsiveUserlistComponent;
}

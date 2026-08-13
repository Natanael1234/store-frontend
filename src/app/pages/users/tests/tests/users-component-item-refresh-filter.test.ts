import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActiveFilter } from '@enums/active-filter/active-filter.enum';
import { DeletedFilter } from '@enums/deleted-filter/deleted-filter.enum';
import { ResponsiveUserFiltersComponent } from '@pages/users/responsive-user-filters/responsive-user-filters.component';
import { ResponsiveUserListComponent } from '@pages/users/responsive-user-list/responsive-user-list.component';
import { UsersComponent } from '@pages/users/users.component';
import { UserOrder } from '@services/user/enums/user-order/user-order.enum';

export function _testUsersComponentRefreshFilter(
    fixture: ComponentFixture<UsersComponent>,
    options: {
        textQuery: string;
        orderBy: UserOrder[];
        active: ActiveFilter;
        deleted: DeletedFilter;
    },
) {
    const filters = fixture.debugElement.query(
        By.directive(ResponsiveUserFiltersComponent),
    ).componentInstance;
    const list = fixture.debugElement.query(
        By.directive(ResponsiveUserListComponent),
    ).componentInstance as ResponsiveUserListComponent;
    const { textQuery, orderBy, active, deleted } = options;
    expect(filters.textQuery())
        .withContext("users component filter's textQuery")
        .toEqual(textQuery);
    expect(filters.orderBy())
        .withContext("users component filter's orderBy")
        .toEqual(orderBy);
    expect(filters.active())
        .withContext("users component filter's active")
        .toEqual(active);
    expect(filters.deleted())
        .withContext("users component filter's deleted")
        .toEqual(deleted);
    expect(list.active())
        .withContext("users component filter's active")
        .toEqual(active);
    expect(list.deleted())
        .withContext("users component filter's deleted")
        .toEqual(deleted);
}

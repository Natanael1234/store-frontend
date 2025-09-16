import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActiveFilter } from '../../../../enums/active-filter/active-filter.enum';
import { DeletedFilter } from '../../../../enums/deleted-filter/deleted-filter.enum';
import { UserOrder } from '../../../../services/user/enums/user-order/user-order.enum';
import { ResponsiveUserFiltersComponent } from '../../responsive-user-filters/responsive-user-filters.component';
import { ResponsiveUserListComponent } from '../../responsive-user-list/responsive-user-list.component';
import { UsersComponent } from '../../users.component';

export function _testUsersComponentRefreshFilter(
    fixture: ComponentFixture<UsersComponent>,
    options: {
        textQuery: string;
        orderBy: UserOrder[];
        sort: UserOrder | UserOrder[];
        active: ActiveFilter;
        deleted: DeletedFilter;
    },
) {
    const filters = fixture.debugElement.query(
        By.directive(ResponsiveUserFiltersComponent),
    ).componentInstance;
    const list = fixture.debugElement.query(
        By.directive(ResponsiveUserListComponent),
    ).componentInstance;
    const { textQuery, orderBy, sort, active, deleted } = options;
    expect(filters.textQuery()).toEqual(textQuery);
    expect(filters.orderBy()).toEqual(orderBy);
    expect(filters.active()).toEqual(active);
    expect(filters.deleted()).toEqual(deleted);
    expect(list.sort()).toEqual(sort);
    expect(list.active()).toEqual(active);
    expect(list.deleted()).toEqual(deleted);
}

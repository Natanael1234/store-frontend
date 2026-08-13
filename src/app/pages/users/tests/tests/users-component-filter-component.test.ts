import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActiveFilter } from '@enums/active-filter/active-filter.enum';
import { DeletedFilter } from '@enums/deleted-filter/deleted-filter.enum';
import { ResponsiveUserFiltersComponent } from '@pages/users/responsive-user-filters/responsive-user-filters.component';
import { UsersComponent } from '@pages/users/users.component';
import { UserOrder } from '@services/user/enums/user-order/user-order.enum';

export function _testUsersComponentFilterComponent(
    fixture: ComponentFixture<UsersComponent>,
    options: {
        mobile: boolean;
        textQuery: string;
        active: ActiveFilter;
        deleted: DeletedFilter;
        orderBy: UserOrder[];
    },
) {
    const { mobile, textQuery, orderBy, active, deleted } = options;
    const filtersArr: DebugElement[] = fixture.debugElement.queryAll(
        By.directive(ResponsiveUserFiltersComponent),
    );
    expect(filtersArr.length)
        .withContext('number of responsive filters')
        .toEqual(1);
    const filters = filtersArr[0]
        .componentInstance as ResponsiveUserFiltersComponent;

    expect(filters.textQuery())
        .withContext("responsive filter's textQuery")
        .toEqual(textQuery);
    expect(filters.active())
        .withContext("responsive filter's active")
        .toEqual(active);
    expect(filters.deleted())
        .withContext("responsive filter's deleted")
        .toEqual(deleted);
    expect(filters.orderBy())
        .withContext("responsive filter's orderBy")
        .toEqual(orderBy);
    expect(filters.mobile())
        .withContext("responsive filter's mobile")
        .toEqual(mobile);
}

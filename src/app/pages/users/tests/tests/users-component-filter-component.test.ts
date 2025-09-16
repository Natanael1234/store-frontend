import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActiveFilter } from '../../../../enums/active-filter/active-filter.enum';
import { DeletedFilter } from '../../../../enums/deleted-filter/deleted-filter.enum';
import { UserOrder } from '../../../../services/user/enums/user-order/user-order.enum';
import { ResponsiveUserFiltersComponent } from '../../responsive-user-filters/responsive-user-filters.component';
import { UsersComponent } from '../../users.component';

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
    expect(filtersArr.length).toEqual(1);
    const filters = filtersArr[0]
        .componentInstance as ResponsiveUserFiltersComponent;

    expect(filters.textQuery()).toEqual(textQuery);
    expect(filters.active()).toEqual(active);
    expect(filters.deleted()).toEqual(deleted);
    expect(filters.orderBy()).toEqual(orderBy);
    expect(filters.mobile()).toEqual(mobile);
}

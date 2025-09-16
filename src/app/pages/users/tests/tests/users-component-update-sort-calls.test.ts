import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { _testMethodCalls } from '../../../../../test-utils/method-calls.test';
import { UserOrder } from '../../../../services/user/enums/user-order/user-order.enum';
import { ResponsiveUserFiltersComponent } from '../../responsive-user-filters/responsive-user-filters.component';
import { ResponsiveUserListComponent } from '../../responsive-user-list/responsive-user-list.component';
import { UsersComponent } from '../../users.component';

export function _testUsersComponentUpdateSortCalls(
    fixture: ComponentFixture<UsersComponent>,
    lastOrderBy: UserOrder[],
    expectedCalls: UserOrder[][],
) {
    const filters = fixture.debugElement.query(
        By.directive(ResponsiveUserFiltersComponent),
    ).componentInstance;
    const list = fixture.debugElement.query(
        By.directive(ResponsiveUserListComponent),
    ).componentInstance;

    // filter's orderBy should hae the orderBy of the last call

    expect(filters.orderBy())
        .withContext('filters orderBy updated')
        .toEqual(lastOrderBy);

    // has the expected number of calls?
    const calls = list.updateSort.emit.calls.all();
    const _expectedCalls = expectedCalls.map((expectedCall) => ({
        args: [expectedCall],
    }));
    _testMethodCalls(calls, _expectedCalls);
}

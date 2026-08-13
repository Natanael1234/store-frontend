import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ResponsiveUserFiltersComponent } from '@pages/users/responsive-user-filters/responsive-user-filters.component';
import { ResponsiveUserListComponent } from '@pages/users/responsive-user-list/responsive-user-list.component';
import { UsersComponent } from '@pages/users/users.component';
import { UserOrder } from '@services/user/enums/user-order/user-order.enum';
import { _testMethodCalls } from '../../../../../test-utils/method-calls.test';

export function _testUsersComponentHeaderClickEvent(
    fixture: ComponentFixture<UsersComponent>,
    expectedCalls: UserOrder[][],
    expectedOrderBy: UserOrder[],
) {
    // filter's orderBy should have the orderBy of the last call
    const filters = fixture.debugElement.query(
        By.directive(ResponsiveUserFiltersComponent),
    ).componentInstance;
    expect(filters.orderBy())
        .withContext('filters orderBy updated')
        .toEqual(expectedOrderBy);

    // has the expected number of calls?
    const list = fixture.debugElement.query(
        By.directive(ResponsiveUserListComponent),
    ).componentInstance;
    const calls = list.headerClick.emit.calls.all();
    const _expectedCalls = expectedCalls.map((expectedCall) => ({
        args: [expectedCall],
    }));
    _testMethodCalls(calls, _expectedCalls);
}

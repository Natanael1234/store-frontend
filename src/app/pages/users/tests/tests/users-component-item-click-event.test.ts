import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { _testMethodCalls } from '../../../../../test-utils/method-calls.test';
import { ResponsiveUserListComponent } from '../../responsive-user-list/responsive-user-list.component';
import { UsersComponent } from '../../users.component';

export function _testUsersComponentItemClickEvent(
    fixture: ComponentFixture<UsersComponent>,
    expectedCalls: { userId: string }[],
) {
    const list = fixture.debugElement.query(
        By.directive(ResponsiveUserListComponent),
    ).componentInstance;
    const _expectedCalls: { args: string[] }[] = expectedCalls.map(
        (expectedCall) => ({
            args: [expectedCall.userId],
        }),
    );
    const calls = list.itemClick.emit.calls.all();
    _testMethodCalls(calls, _expectedCalls);
}

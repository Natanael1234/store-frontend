import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserTableRow } from '../../../../components/table/table/interfaces/user-table-row.interface';
import { ActiveFilter } from '../../../../enums/active-filter/active-filter.enum';
import { DeletedFilter } from '../../../../enums/deleted-filter/deleted-filter.enum';
import { ResponsiveUserListComponent } from '../../responsive-user-list/responsive-user-list.component';
import { UsersComponent } from '../../users.component';

export function _testUsersComponentListComponent(
    fixture: ComponentFixture<UsersComponent>,
    expectedValues: {
        mobile: boolean;
        pageIndex: number;
        pageSize: number;
        loading: boolean;
        rows: UserTableRow[];
        active: ActiveFilter;
        deleted: DeletedFilter;
    },
) {
    const { mobile, loading, rows, active, deleted } = expectedValues;
    const responsiveLists: DebugElement[] = fixture.debugElement.queryAll(
        By.directive(ResponsiveUserListComponent),
    );
    expect(responsiveLists.length)
        .withContext('number of responsive lists')
        .toEqual(1);
    const list = responsiveLists[0]
        .componentInstance as ResponsiveUserListComponent;
    expect(list.mobile())
        .withContext("responsive list's mobile")
        .toEqual(mobile);
    expect(list.loading())
        .withContext("responsive list's loading")
        .toEqual(loading);

    expect(list.users()).withContext("responsive list's users").toEqual(rows);
    expect(list.active())
        .withContext("responsive list's active")
        .toEqual(active);
    expect(list.deleted())
        .withContext("responsive list's deleted")
        .toEqual(deleted);
}

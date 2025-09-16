import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { MatList } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { UserTableRow } from '../../user-table/interfaces/user-table-row.interface';
import { UserItemComponent } from '../components/user-item/user-item.component';
import { UserListComponent } from '../user-list.component';

export function testUserList(
    fixture: ComponentFixture<UserListComponent>,
    expectedList: UserTableRow[],
    loading: boolean = false,
) {
    fixture.detectChanges();
    const lists: DebugElement[] = fixture.debugElement.queryAll(
        By.directive(MatList),
    );

    const separatorCount =
        expectedList.length < 2 ? 0 : expectedList.length - 1;

    expect(lists.length).withContext('mat-list').toEqual(1);

    expect(lists[0].children.length)
        .withContext('mat-list children')
        .toEqual(expectedList.length + separatorCount);

    for (let i = 0; i < lists[0].children.length; i++) {
        const child = lists[0].children[i];
        const even = i % 2 === 0;
        if (even) {
            // expected item
            const expectedItem = expectedList[i / 2];

            // list item
            expect(child.nativeElement.tagName).toEqual('APP-USER-ITEM');
            const userItem: UserItemComponent = child.componentInstance;

            expect(userItem.name()).toEqual(expectedItem.name);
            expect(userItem.email()).toEqual(expectedItem.email);
            expect(userItem.active()).toEqual(expectedItem.active);
            expect(userItem.deleted()).toEqual(expectedItem.deleted);
            expect(userItem.loading()).toEqual(loading);
        } else {
            // divider
            expect(child.nativeElement.tagName).toEqual('MAT-DIVIDER');
        }
    }
}

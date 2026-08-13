import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { MatPaginator } from '@angular/material/paginator';
import { By } from '@angular/platform-browser';
import { UsersComponent } from '@pages/users/users.component';

export function _testUsersComponentPaginatorComponent(
    fixture: ComponentFixture<UsersComponent>,
    options: {
        mobile: boolean;
        pageIndex: number;
        pageSize: number;
        loading: boolean;
        length: number;
    },
) {
    const { mobile, pageIndex, pageSize, loading, length } = options;
    const paginators: DebugElement[] = fixture.debugElement.queryAll(
        By.directive(MatPaginator),
    );
    expect(paginators.length).withContext('number of paginators').toEqual(1);
    const paginator: MatPaginator = paginators[0].componentInstance;
    expect(paginator.pageIndex)
        .withContext("paginator's pageIndex")
        .toEqual(pageIndex);
    expect(paginator.pageSize)
        .withContext("paginator's pageSize")
        .toEqual(pageSize);
    expect(paginator.disabled)
        .withContext("paginator's disabled")
        .toEqual(loading);
    expect(paginator.hidePageSize)
        .withContext("paginator's hidePageSize")
        .toEqual(!!mobile);
    expect(paginator.pageSizeOptions)
        .withContext("paginator's pageSizeOptions")
        .toEqual([6, 12, 24]);
    expect(paginator.showFirstLastButtons)
        .withContext("paginator's showFirstLastButtons")
        .toEqual(true);
    expect(paginator.length).withContext("paginator's length").toEqual(length);
}

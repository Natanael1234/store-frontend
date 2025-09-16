import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { MatPaginator } from '@angular/material/paginator';
import { By } from '@angular/platform-browser';
import { UsersComponent } from '../../users.component';

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
    expect(paginators.length).toEqual(1);
    const paginator: MatPaginator = paginators[0].componentInstance;
    expect(paginator.pageIndex).toEqual(pageIndex);
    expect(paginator.pageSize).toEqual(pageSize);
    expect(paginator.disabled).toEqual(loading);
    expect(paginator.hidePageSize).toEqual(!!mobile);
    expect(paginator.pageSizeOptions).toEqual([6, 12, 24]);
    expect(paginator.showFirstLastButtons).toEqual(true);
    expect(paginator.length).toEqual(length);
}

import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Column } from '@components/table/model/column/column.model';
import { Row } from '@components/table/model/row/row.model';
import { TableComponent } from '@components/table/table.component';
import { ResponsiveUserListComponent } from '@pages/users/responsive-user-list/responsive-user-list.component';

export function _testResponsiveUsersListComponentTable(
    fixture: ComponentFixture<ResponsiveUserListComponent>,
    expected?: { columns: Column[]; data: Row[]; loading: boolean } | false,
): TableComponent | null {
    const debugElements = fixture.debugElement.queryAll(
        By.directive(TableComponent),
    );
    expect(debugElements.length)
        .withContext(expected ? 'user table defined' : 'user table not defined')
        .toEqual(expected ? 1 : 0);
    if (!expected) return null;
    const tableComponent = debugElements[0]
        .componentInstance as unknown as TableComponent;
    if (!expected) return tableComponent;
    expect(tableComponent.columns())
        .withContext('columns')
        .toEqual(expected.columns);
    expect(tableComponent.loading())
        .withContext('loading')
        .toEqual(expected.loading);
    expect(tableComponent.data()).withContext('data').toEqual(expected.data);
    return tableComponent;
}

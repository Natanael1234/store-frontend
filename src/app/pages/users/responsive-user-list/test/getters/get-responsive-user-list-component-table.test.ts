import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableComponent } from '@components/table/table/table.component';
import { ResponsiveUserListComponent } from '@pages/users/responsive-user-list/responsive-user-list.component';

export function _getResponsiveUserListComponentTable(
    fixture: ComponentFixture<ResponsiveUserListComponent>,
): TableComponent {
    const debugElements = fixture.debugElement.queryAll(
        By.directive(TableComponent),
    );
    const comp = debugElements[0].componentInstance as TableComponent;
    return comp;
}

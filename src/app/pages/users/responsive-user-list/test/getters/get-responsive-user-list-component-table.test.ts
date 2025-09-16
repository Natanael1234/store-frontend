import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ResponsiveUserListComponent } from '../../responsive-user-list.component';
import { UserTableComponent } from '../../user-table/user-table.component';

export function _getResponsiveUserListComponentTable(
    fixture: ComponentFixture<ResponsiveUserListComponent>,
): UserTableComponent {
    const debugElements = fixture.debugElement.queryAll(
        By.directive(UserTableComponent),
    );
    const comp = debugElements[0].componentInstance as UserTableComponent;
    return comp;
}

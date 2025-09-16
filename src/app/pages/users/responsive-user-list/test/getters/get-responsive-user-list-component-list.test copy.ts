import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ResponsiveUserListComponent } from '../../responsive-user-list.component';
import { UserListComponent } from '../../user-list/user-list.component';

export function _getResponsiveUserListComponentList(
    fixture: ComponentFixture<ResponsiveUserListComponent>,
): UserListComponent {
    const debugElements = fixture.debugElement.queryAll(
        By.directive(UserListComponent),
    );
    const comp = debugElements[0].componentInstance as UserListComponent;
    return comp;
}

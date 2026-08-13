import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ListComponent } from '@components/list/list.component';
import { ResponsiveUserListComponent } from '@pages/users/responsive-user-list/responsive-user-list.component';

export function _getResponsiveUserListComponentList(
    fixture: ComponentFixture<ResponsiveUserListComponent>,
): ListComponent {
    const debugElements = fixture.debugElement.queryAll(
        By.directive(ListComponent),
    );
    const comp = debugElements[0].componentInstance as ListComponent;
    return comp;
}

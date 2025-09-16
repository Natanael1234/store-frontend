import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaderItemComponent } from '../../../../../../components/table/header-item/header-item.component';
import { UserColumnId } from '../../enums/user-column-id/user-column-id.enum';
import { UserTableComponent } from '../../user-table.component';

export function _getUserTableComponentHeaderItem(
    fixture: ComponentFixture<UserTableComponent>,
    columnId: UserColumnId,
): HeaderItemComponent<UserColumnId> {
    const debugElements = fixture.debugElement
        .queryAll(By.directive(HeaderItemComponent))
        .filter((item) => item.componentInstance.id() === columnId);

    const item = debugElements[0]
        .componentInstance as HeaderItemComponent<UserColumnId>;
    return item;
}

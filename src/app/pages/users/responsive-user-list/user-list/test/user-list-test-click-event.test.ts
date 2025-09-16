import { DebugElement } from '@angular/core';
import { MouseButton } from '../../../../../enums/mouse-button/mouse-button.enum';
import { PointerType } from '../../../../../enums/pointer-type/pointer-type.enum';
import { ItemClickEvent } from '../../../../../interfaces/item-click.interface';
import { UserTableRow } from '../../user-table/interfaces/user-table-row.interface';
import { UserListComponent } from '../user-list.component';

export function testUserListClickEvent(
    component: UserListComponent,
    item: DebugElement,
    user: UserTableRow,
    loading: boolean,
) {
    spyOn(component.itemClick, 'emit');
    const event = new PointerEvent('click', {
        button: MouseButton.left,
        pointerType: PointerType.mouse,
    });
    // test if sort event enabled
    item.triggerEventHandler('click', event);
    if (loading) {
        expect(component.itemClick.emit)
            .withContext('itemClick event not fired')
            .not.toHaveBeenCalled();
    } else {
        // click event fired
        const expectedEvent: ItemClickEvent<UserTableRow> = {
            event,
            item: user,
        };
        expect(component.itemClick.emit)
            .withContext('itemClick event fired')
            .toHaveBeenCalledOnceWith(expectedEvent);
    }
}

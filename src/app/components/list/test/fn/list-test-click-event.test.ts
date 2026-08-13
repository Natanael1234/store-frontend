import { DebugElement } from '@angular/core';
import { ListComponent } from '@components/list/list.component';
import { MouseButton } from '@enums/mouse-button/mouse-button.enum';
import { PointerType } from '@enums/pointer-type/pointer-type.enum';

export function _testListClickEvent(
    component: ListComponent,
    item: DebugElement,
    loading: boolean,
    id: string,
) {
    const event = new PointerEvent('click', {
        button: MouseButton.left,
        pointerType: PointerType.mouse,
    });
    item.triggerEventHandler('click', event);
    if (loading) {
        expect(component.itemClick.emit)
            .withContext('itemClick event not fired')
            .not.toHaveBeenCalled();
    } else {
        expect(component.itemClick.emit)
            .withContext('itemClick event fired')
            .toHaveBeenCalledOnceWith(id);
    }
}

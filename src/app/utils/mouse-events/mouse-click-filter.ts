import { MouseButton } from '../../enums/mouse-button/mouse-button.enum';
import { PointerType } from '../../enums/pointer-type/pointer-type.enum';

export function leftMouseClickFilter(event: any) {
    if (event.pointerType == PointerType.pen) {
        return true;
    } else if (event.pointerType == PointerType.mouch) {
        return true;
    } else if (
        event.pointerType == PointerType.mouse &&
        event.button == MouseButton.left
    ) {
        return true;
    }
    return false;
}

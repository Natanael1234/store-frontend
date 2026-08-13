import { MouseButton } from '../../enums/mouse-button/mouse-button.enum';
import { PointerType } from '../../enums/pointer-type/pointer-type.enum';
import { leftMouseClickFilter } from './mouse-click-filter';

describe('leftMouseClickFilter', () => {
    it('should return true for left mouse click', () => {
        const event = {
            pointerType: PointerType.mouse,
            button: MouseButton.left,
        };
        expect(leftMouseClickFilter(event)).toBe(true);
    });

    it('should return false for right mouse click', () => {
        const event = {
            pointerType: PointerType.mouse,
            button: MouseButton.right,
        };
        expect(leftMouseClickFilter(event)).toBe(false);
    });

    it('should return false for middle mouse click', () => {
        const event = {
            pointerType: PointerType.mouse,
            button: MouseButton.middle,
        };
        expect(leftMouseClickFilter(event)).toBe(false);
    });

    it('should return true for touch events (not mouse)', () => {
        const event = {
            pointerType: PointerType.touch,
            button: MouseButton.left,
        };
        expect(leftMouseClickFilter(event)).toBe(true);
    });

    it('should return true for pen events (not mouse)', () => {
        const event = {
            pointerType: PointerType.pen,
            button: MouseButton.left,
        };
        expect(leftMouseClickFilter(event)).toBe(true);
    });
});

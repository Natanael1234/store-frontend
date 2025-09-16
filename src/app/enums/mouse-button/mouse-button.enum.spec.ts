import { MouseButton } from './mouse-button.enum';

describe('MouseButton', () => {
    it('should be defined', () => {
        expect(MouseButton).toBeDefined();
    });

    it('should have valid keys and values', () => {
        const options = { ...MouseButton } as any;
        expect(options).toEqual({
            left: 0,
            middle: 1,
            right: 2,
        });
    });
});

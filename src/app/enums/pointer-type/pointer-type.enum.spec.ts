import { PointerType } from '@enums/pointer-type/pointer-type.enum';

describe('PointerType', () => {
    it('should be defined', () => {
        expect(PointerType).toBeDefined();
    });

    it('should have valid keys and values', () => {
        const options = { ...PointerType } as any;
        expect(options).toEqual({
            mouse: 'mouse',
            pen: 'pen',
            touch: 'touch',
        });
    });
});

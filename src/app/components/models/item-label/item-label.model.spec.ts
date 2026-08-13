import { ItemLabel } from './item-label.model';

describe('ItemLabel model', () => {
    it('should be defined', () => {
        expect(ItemLabel).toBeTruthy();
    });

    it('should create an instance with all the given values', () => {
        const item = new ItemLabel({
            text: 'Meu texto',
            tooltip: 'Meu tooltip',
            disabled: true,
        });

        expect(item.text).toBe('Meu texto');
        expect(item.tooltip).toBe('Meu tooltip');
        expect(item.disabled).toBe(true);
    });

    it('should allow undefined text and tooltip', () => {
        const item = new ItemLabel({ disabled: false });

        expect(item.text).toBeUndefined();
        expect(item.tooltip).toBeUndefined();
        expect(item.disabled).toBe(false);
    });
});

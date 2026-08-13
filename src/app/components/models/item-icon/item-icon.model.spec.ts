import { ItemIcon } from '@components/models/item-icon/item-icon.model';

describe('ItemLabel model', () => {
    it('should be defined', () => {
        expect(ItemIcon).toBeTruthy();
    });

    it('should create an instance with all the given values', () => {
        const item = new ItemIcon({
            icon: 'home',
            tooltip: 'Meu tooltip',
            disabled: true,
        });

        expect(item.icon).toBe('home');
        expect(item.tooltip).toBe('Meu tooltip');
    });

    it('should allow undefined tooltip', () => {
        const item = new ItemIcon({ icon: 'user', disabled: true });
        expect(item.tooltip).toBeUndefined();
    });
});

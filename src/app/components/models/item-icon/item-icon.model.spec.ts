import { ItemIcon } from './item-icon.model';

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
        expect(item.disabled).toBe(true);
    });

    it('should allow undefined tooltip', () => {
        const item = new ItemIcon({ icon: 'user', disabled: true });
        expect(item.tooltip).toBeUndefined();
    });

    it('should allow false disabled', () => {
        const item = new ItemIcon({ icon: 'user', disabled: false });
        expect(item.disabled).toBeFalse();
    });

    it('disabled should be false by default', () => {
        const item = new ItemIcon({ icon: 'user' });
        expect(item.disabled).toBeFalse();
    });
});

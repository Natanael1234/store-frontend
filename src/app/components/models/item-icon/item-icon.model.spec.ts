import { ItemIcon } from '@components/models/item-icon/item-icon.model';
import { Icon } from '@enums/icons/icons.enum';

describe('ItemLabel model', () => {
    it('should be defined', () => {
        expect(ItemIcon).toBeTruthy();
    });

    it('should create an instance with all the given values', () => {
        const item = new ItemIcon({
            name: Icon.home,
            tooltip: 'Meu tooltip',
            disabled: true,
        });

        expect(item.name).toBe(Icon.home);
        expect(item.tooltip).toBe('Meu tooltip');
    });

    it('should allow undefined tooltip', () => {
        const item = new ItemIcon({ name: Icon.person, disabled: true });
        expect(item.tooltip).toBeUndefined();
    });
});

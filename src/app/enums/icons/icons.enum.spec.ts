import { Icon } from '@enums/icons/icons.enum';

describe('Icon enum', () => {
    it('should be defined', () => {
        expect(Icon).toBeDefined();
    });

    it('should have valid keys and values', () => {
        const options = { ...Icon } as any;
        expect(options).toEqual({
            visibility_off: 'visibility_off',
            visibility: 'visibility',
            send: 'send',
            checked: 'checked',
            home: 'home',
            person: 'person',
        });
    });
});

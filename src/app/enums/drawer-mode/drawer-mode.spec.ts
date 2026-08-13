import { DrawerMode } from './drawer-mode';

describe('DrawerMode enum', () => {
    it('should be defined', () => {
        expect(DrawerMode).toBeDefined();
    });

    it('should have valid keys and values', () => {
        const options = { ...DrawerMode } as any;
        expect(options).toEqual({
            over: 'over',
            push: 'push',
            side: 'side',
        });
    });
});

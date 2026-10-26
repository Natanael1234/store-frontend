import { Theme } from '@enums/theme/theme.enum';

describe('Theme', () => {
    it('should be defined', () => {
        expect(Theme).toBeDefined();
    });

    it('should have valid keys and values', () => {
        expect({ ...Theme } as unknown as any).toEqual({
            light_theme: 'light-theme',
            dark_theme: 'dark-theme',
        });
    });
});

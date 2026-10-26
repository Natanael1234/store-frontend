import { ThemeStorageValue } from '@enums/storage/values/theme/theme-storage-value.enum';

describe('ThemeStorageValue', () => {
    it('should be defined', () => {
        expect(ThemeStorageValue).toBeDefined();
    });

    it('should have valid keys and values', () => {
        const options = { ...ThemeStorageValue } as unknown as any;
        expect(options).toEqual({
            light_theme: 'light-theme',
            dark_theme: 'dark-theme',
        });
    });
});

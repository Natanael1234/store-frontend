import { Service } from '@angular/core';
import { StorageKey } from '@enums/storage/keys/storage-key.enum';
import { ThemeStorageValue } from '@enums/storage/values/theme/theme-storage-value.enum';
import { Theme } from '@enums/theme/theme.enum';

@Service()
export class ThemeService {
    public darkMode = false;

    constructor() {
        this.loadTheme();
    }

    toggleTheme(): void {
        this.darkMode = !this.darkMode;
        this.updateTheme();
    }

    private loadTheme(): void {
        const savedTheme = localStorage.getItem(StorageKey.theme);
        this.darkMode = savedTheme === ThemeStorageValue.dark_theme;
        this.updateTheme();
    }

    private updateTheme(): void {
        if (this.darkMode) {
            document.body.classList.remove(Theme.light_theme);
            document.body.classList.add(Theme.dark_theme);
            localStorage.setItem(StorageKey.theme, ThemeStorageValue.dark_theme);
        } else {
            document.body.classList.remove(Theme.dark_theme);
            document.body.classList.add(Theme.light_theme);
            localStorage.setItem(StorageKey.theme, ThemeStorageValue.light_theme);
        }
    }
}

import { TestBed } from '@angular/core/testing';
import { StorageKey } from '@enums/storage/keys/storage-key.enum';
import { ThemeStorageValue } from '@enums/storage/values/theme/theme-storage-value.enum';
import { ThemeService } from '@services/theme/theme.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('ThemeService', () => {
    let service: ThemeService;

    beforeEach(() => {
        // Mock do localStorage para o ambiente do Vitest/Node
        const localStorageMock = (() => {
            let store: Record<string, string> = {};
            return {
                getItem: vi.fn((key: string) => store[key] || null),
                setItem: vi.fn((key: string, value: string) => {
                    store[key] = value.toString();
                }),
                removeItem: vi.fn((key: string) => {
                    delete store[key];
                }),
                clear: vi.fn(() => {
                    store = {};
                }),
            };
        })();

        vi.stubGlobal('localStorage', localStorageMock);

        // Mock seguro do document.body
        if (typeof document === 'undefined') {
            vi.stubGlobal('document', {
                body: {
                    classList: {
                        add: vi.fn(),
                        remove: vi.fn(),
                    },
                },
            });
        }

        TestBed.configureTestingModule({
            providers: [ThemeService],
        });

        service = TestBed.inject(ThemeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should toggle theme correctly', () => {
        expect(service.darkMode).toBe(false);
        service.toggleTheme();
        expect(service.darkMode).toBe(true);
        expect(localStorage.getItem(StorageKey.theme)).toBe(ThemeStorageValue.dark_theme);
    });
});

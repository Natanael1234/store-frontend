import { TestBed } from '@angular/core/testing';
import { TokenService } from '@services/token/token.service';

let store: { [key: string]: string } = {};

export class LocalStorageMock implements Storage {
    constructor() {}
    getItem(key: string): string | null {
        return store[key] || null;
    }

    setItem(key: string, value: string): void {
        store[key] = value;
    }

    removeItem(key: string): void {
        delete store[key];
    }

    clear(): void {
        store = {};
    }

    key(index: number): string | null {
        return Object.keys(store)[index] || null;
    }

    get length(): number {
        return Object.keys(store).length;
    }
}

describe('TokenService.', () => {
    let service: TokenService;
    let localStorageMock: LocalStorageMock;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TokenService],
        });
        service = TestBed.inject(TokenService);
        localStorageMock = new LocalStorageMock();
        spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
        spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);
        spyOn(localStorage, 'removeItem').and.callFake(
            localStorageMock.removeItem,
        );
        spyOn(localStorage, 'clear').and.callFake(localStorageMock.clear);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set and get token', () => {
        const token = 'example_token';
        service.setAccessToken(token);
        expect(service.getAccessToken()).toEqual(token);
        expect(store['access_token']).toEqual(token);
    });

    it('should set and get refresh token', () => {
        const refreshToken = 'example_refresh_token';
        service.setRefreshToken(refreshToken);
        expect(service.getRefreshToken()).toEqual(refreshToken);
        expect(store['refresh_token']).toEqual(refreshToken);
    });

    it('should clear tokens', () => {
        service.setAccessToken('example_token');
        service.setRefreshToken('example_refresh_token');
        service.clearTokens();
        expect(service.getAccessToken()).toBeNull();
        expect(store['access_token']).toBeUndefined();
        expect(service.getRefreshToken()).toBeNull();
        expect(store['refresh_token']).toBeUndefined();
        expect(store).toEqual({});
    });
});

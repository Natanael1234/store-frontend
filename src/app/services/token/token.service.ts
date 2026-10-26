import { Service } from '@angular/core';
import { StorageKey } from '@enums/storage/keys/storage-key.enum';

@Service()
export class TokenService {
    constructor() {}

    getAccessToken(): string | null {
        return localStorage.getItem(StorageKey.access_token) || null;
    }

    setAccessToken(accessToken: string): void {
        localStorage.setItem(StorageKey.access_token, accessToken);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(StorageKey.refresh_token) || null;
    }

    setRefreshToken(refreshToken: string): void {
        localStorage.setItem(StorageKey.refresh_token, refreshToken);
    }

    clearTokens(): void {
        localStorage.removeItem(StorageKey.access_token);
        localStorage.removeItem(StorageKey.refresh_token);
    }
}

import { StorageKey } from '@enums/storage/keys/storage-key.enum';

describe('StorageKey', () => {
    it('should be defined', () => {
        expect(StorageKey).toBeDefined();
    });

    it('should have valid keys and values', () => {
        expect({ ...StorageKey } as unknown as any).toEqual({
            theme: 'theme',
            access_token: 'access_token',
            refresh_token: 'refresh_token',
        });
    });
});

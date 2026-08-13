import { DeletedFilter } from '@enums/deleted-filter/deleted-filter.enum';

describe('DeletedFilter', () => {
    it('should be defined', () => {
        expect(DeletedFilter).toBeDefined();
    });

    it('should have valid keys and values', () => {
        expect({ ...DeletedFilter } as unknown as any).toEqual({
            not_deleted: 'not_deleted',
            deleted: 'deleted',
            all: 'all',
        });
    });
});

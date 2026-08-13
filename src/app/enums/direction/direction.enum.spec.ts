import { SortDirection } from './direction.enum';

describe('SortDirection enum', () => {
    it('should be defined', () => {
        expect(SortDirection).toBeDefined();
    });

    it('should have valid keys and values', () => {
        const options = { ...SortDirection } as any;
        expect(options).toEqual({
            asc: 'asc',
            desc: 'desc',
            none: '',
        });
    });
});

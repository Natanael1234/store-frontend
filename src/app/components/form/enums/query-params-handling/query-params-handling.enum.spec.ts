import { QueryParamsHandling } from '@components/form/enums/query-params-handling/query-params-handling.enum';

describe('QueryParamsHandling enum', () => {
    it('should be defined', () => {
        expect(QueryParamsHandling).toBeDefined();
    });

    it('should have valid keys and values', () => {
        const options = { ...QueryParamsHandling } as any;
        expect(options).toEqual({
            merge: 'merge',
            preserve: 'preserve',
            replace: 'replace',
            empty: '',
        });
    });
});

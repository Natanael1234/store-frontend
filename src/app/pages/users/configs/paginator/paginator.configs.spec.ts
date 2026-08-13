import { PaginatorConfigs } from '@pages/users/configs/paginator/paginator.configs';

// TODO: check if all parameters matches
describe('PaginatorConfigs', () => {
    it('should de defined', () => {
        expect(PaginatorConfigs).toBeDefined();
    });

    it('should contain configs', () => {
        const obj: any = { ...PaginatorConfigs };
        const expected: any = {
            DEFAULT_LENGTH: 0,
            DEFAULT_COUNT: 0,
            DEFAULT_PAGE_INDEX: 0,
            DEFAULT_PAGE_SIZE: 12,
            PAGE_SIZES: [6, 12, 24],
        };
        expect(obj).toEqual(expected);
    });
});

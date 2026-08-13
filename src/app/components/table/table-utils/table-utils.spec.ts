import {
    orderToSort,
    sortToOrder,
    splitOrderData,
    toggleSortDirecton,
} from '@components/table/table-utils/table-utils';
import { SortDirection } from '@enums/direction/direction.enum';

enum ProductColumnId {
    name = 'name',
    price = 'price',
    date = 'date',
    category = 'category',
}

/** User column order. */
enum ProductOrder {
    name_asc = 'name_asc',
    name_desc = 'name_desc',
    price_asc = 'price_asc',
    price_desc = 'price_desc',
    date_asc = 'date_asc',
    date_desc = 'date_desc',
    category_asc = 'category_asc',
    category_desc = 'category_desc',
}

describe('Sort Utility Functions', () => {
    describe('sortToOrder', () => {
        it('should convert Sort object to Order string', () => {
            const order = sortToOrder({
                columnId: ProductColumnId.name,
                direction: SortDirection.asc,
            });
            expect(order).toBe('name_asc');
        });
    });

    describe('orderToSort', () => {
        it('should convert Order string to Sort object', () => {
            const sort = orderToSort(ProductOrder.name_asc);
            expect(sort).toEqual({
                columnId: ProductColumnId.name,
                direction: SortDirection.asc,
            });
        });
    });

    describe('splitOrderData', () => {
        it('should split Order string into structured object', () => {
            const result = splitOrderData(ProductOrder.date_asc);
            expect(result).toEqual({
                columnId: ProductColumnId.date,
                direction: SortDirection.asc,
            });
        });

        it('should handle empty direction', () => {
            const result = splitOrderData('category_' as ProductOrder);
            expect(result).toEqual({
                columnId: ProductColumnId.category,
                direction: SortDirection.none,
            });
        });
    });

    describe('toggleSortDirecton', () => {
        it('should convert Order asc to desc', () => {
            const direction = toggleSortDirecton(SortDirection.asc);
            expect(direction).toEqual(SortDirection.desc);
        });

        it('should convert Order desc to none', () => {
            const direction = toggleSortDirecton(SortDirection.desc);
            expect(direction).toEqual(SortDirection.none);
        });

        it('should convert Order none to asc', () => {
            const direction = toggleSortDirecton(SortDirection.none);
            expect(direction).toEqual(SortDirection.asc);
        });
    });
});

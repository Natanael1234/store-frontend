import { ColumnData } from '@components/table/model/column-data/column-data.model';

describe('ColumnData', () => {
    it('must create an instance with all the given values', () => {
        const column = new ColumnData({
            icon: 'home',
            label: 'Home label',
            tooltip: 'Home tooltip',
            disabled: true,
        });

        expect(column).toBeInstanceOf(ColumnData);
        expect(column.icon).toBe('home');
        expect(column.label).toBe('Home label');
        expect(column.tooltip).toBe('Home tooltip');
        expect(column.disabled).toBe(true);
    });

    it('must create an instance even without optional parameters', () => {
        const column = new ColumnData({});

        expect(column).toBeInstanceOf(ColumnData);
        expect(column.icon).toBeUndefined();
        expect(column.label).toBeUndefined();
        expect(column.tooltip).toBeUndefined();
        expect(column.disabled).toBeFalse();
    });

    it('should allow only a few fields', () => {
        const column = new ColumnData({ label: 'Only label' });

        expect(column.label).toBe('Only label');
        expect(column.icon).toBeUndefined();
    });
});

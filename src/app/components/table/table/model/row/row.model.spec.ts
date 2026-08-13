import { ColumnData } from '../column-data/column-data.model';
import { Row } from './row.model';

describe('RowData', () => {
    it('should create an instance with provided values', () => {
        const columns: { [key: string]: ColumnData } = {
            col1: new ColumnData({
                label: 'Label 1',
                tooltip: 'Tooltip 1',
                disabled: false,
            }),
            col2: new ColumnData({
                label: 'Label 2',
                icon: 'Tooltip 2',
                disabled: true,
            }),
        };

        const row = new Row({ id: 'row1', columns: columns });

        expect(row).toBeInstanceOf(Row);
        expect(row.id).toBe('row1');
        expect(row.columns).toEqual(columns);
    });
});

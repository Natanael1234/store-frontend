import { Column } from '@components/table/table/model/column/column.model';
import { TableSorter } from '@components/table/table/sorter/table-sorter';
import { SortDirection } from '@enums/direction/direction.enum';

describe('Table Sorter', () => {
    let columns: Column[];

    beforeEach(() => {
        columns = [
            new Column({
                id: 'col1',
                direction: SortDirection.asc,
                label: 'Column 1',
                disabled: false,
                sortable: true,
                position: 0,
                shrink: false,
            }),
            new Column({
                id: 'col2',
                direction: SortDirection.asc,
                label: 'Column 2',
                disabled: false,
                sortable: true,
                position: 1,
                shrink: false,
            }),
            new Column({
                id: 'col3',
                direction: SortDirection.asc,
                label: 'Column 3',
                disabled: false,
                sortable: false,
                position: 2,
                shrink: true,
            }),
            new Column({
                id: 'col4',
                direction: SortDirection.desc,
                label: 'Column 4',
                disabled: false,
                sortable: false,
                position: 3,
                shrink: true,
            }),
        ];
    });

    it('should create', () => {
        const sorter = new TableSorter(columns);
        expect(sorter).toBeTruthy();
    });

    it('should get columns', () => {
        const sorter = new TableSorter(columns);
        expect(sorter.getColumns()).toEqual(columns);
    });

    it('should get orderBy', () => {
        const sorter = new TableSorter(columns);
        expect(sorter.getOrderBy()).toEqual([
            'col1_asc',
            'col2_asc',
            'col3_asc',
            'col4_desc',
        ]);
    });

    it('should sort by sort object', () => {
        const sorter = new TableSorter(columns);
        sorter.sortBySortObject({
            columnId: 'col2',
            direction: SortDirection.desc,
        });
        expect(sorter.getColumns())
            .withContext('expected columns')
            .toEqual([
                new Column({
                    id: 'col1',
                    direction: SortDirection.asc,
                    label: 'Column 1',
                    disabled: false,
                    sortable: true,
                    position: 1,
                    shrink: false,
                }),
                new Column({
                    id: 'col2',
                    direction: SortDirection.desc,
                    label: 'Column 2',
                    disabled: false,
                    sortable: true,
                    position: 0,
                    shrink: false,
                }),
                new Column({
                    id: 'col3',
                    direction: SortDirection.asc,
                    label: 'Column 3',
                    disabled: false,
                    sortable: false,
                    position: 2,
                    shrink: true,
                }),
                new Column({
                    id: 'col4',
                    direction: SortDirection.desc,
                    label: 'Column 4',
                    disabled: false,
                    sortable: false,
                    position: 3,
                    shrink: true,
                }),
            ]);

        expect(sorter.getOrderBy()).toEqual([
            'col2_desc',
            'col1_asc',
            'col3_asc',
            'col4_desc',
        ]);
    });

    it('should sort by column id', () => {
        const sorter = new TableSorter(columns);
        sorter.orderByColumnIdAndDirection('col2');
        expect(sorter.getColumns())
            .withContext('expected columns')
            .toEqual([
                new Column({
                    id: 'col1',
                    direction: SortDirection.asc,
                    label: 'Column 1',
                    disabled: false,
                    sortable: true,
                    position: 1,
                    shrink: false,
                }),
                new Column({
                    id: 'col2',
                    direction: SortDirection.desc,
                    label: 'Column 2',
                    disabled: false,
                    sortable: true,
                    position: 0,
                    shrink: false,
                }),
                new Column({
                    id: 'col3',
                    direction: SortDirection.asc,
                    label: 'Column 3',
                    disabled: false,
                    sortable: false,
                    position: 2,
                    shrink: true,
                }),
                new Column({
                    id: 'col4',
                    direction: SortDirection.desc,
                    label: 'Column 4',
                    disabled: false,
                    sortable: false,
                    position: 3,
                    shrink: true,
                }),
            ]);

        expect(sorter.getOrderBy()).toEqual([
            'col2_desc',
            'col1_asc',
            'col3_asc',
            'col4_desc',
        ]);
    });

    it('should sort by column id and direction', () => {
        const sorter = new TableSorter(columns);
        sorter.orderByColumnIdAndDirection('col2', SortDirection.desc);
        expect(sorter.getColumns())
            .withContext('expected columns')
            .toEqual([
                new Column({
                    id: 'col1',
                    direction: SortDirection.asc,
                    label: 'Column 1',
                    disabled: false,
                    sortable: true,
                    position: 1,
                    shrink: false,
                }),
                new Column({
                    id: 'col2',
                    direction: SortDirection.desc,
                    label: 'Column 2',
                    disabled: false,
                    sortable: true,
                    position: 0,
                    shrink: false,
                }),
                new Column({
                    id: 'col3',
                    direction: SortDirection.asc,
                    label: 'Column 3',
                    disabled: false,
                    sortable: false,
                    position: 2,
                    shrink: true,
                }),
                new Column({
                    id: 'col4',
                    direction: SortDirection.desc,
                    label: 'Column 4',
                    disabled: false,
                    sortable: false,
                    position: 3,
                    shrink: true,
                }),
            ]);

        expect(sorter.getOrderBy()).toEqual([
            'col2_desc',
            'col1_asc',
            'col3_asc',
            'col4_desc',
        ]);
    });

    it('should sort by order id', () => {
        const sorter = new TableSorter(columns);
        sorter.orderByOrderId('col2_desc');
        expect(sorter.getColumns())
            .withContext('expected columns')
            .toEqual([
                new Column({
                    id: 'col1',
                    direction: SortDirection.asc,
                    label: 'Column 1',
                    disabled: false,
                    sortable: true,
                    position: 1,
                    shrink: false,
                }),
                new Column({
                    id: 'col2',
                    direction: SortDirection.desc,
                    label: 'Column 2',
                    disabled: false,
                    sortable: true,
                    position: 0,
                    shrink: false,
                }),
                new Column({
                    id: 'col3',
                    direction: SortDirection.asc,
                    label: 'Column 3',
                    disabled: false,
                    sortable: false,
                    position: 2,
                    shrink: true,
                }),
                new Column({
                    id: 'col4',
                    direction: SortDirection.desc,
                    label: 'Column 4',
                    disabled: false,
                    sortable: false,
                    position: 3,
                    shrink: true,
                }),
            ]);

        expect(sorter.getOrderBy()).toEqual([
            'col2_desc',
            'col1_asc',
            'col3_asc',
            'col4_desc',
        ]);
    });

    it('should sort by multiple order ids', () => {
        const sorter = new TableSorter(columns);
        sorter.orderByOrderIds([
            'col2_desc',
            'col1_asc',
            'col3_desc',
            'col4_asc',
        ]);
        expect(sorter.getColumns())
            .withContext('expected columns')
            .toEqual([
                new Column({
                    id: 'col1',
                    direction: SortDirection.asc,
                    label: 'Column 1',
                    disabled: false,
                    sortable: true,
                    position: 1,
                    shrink: false,
                }),
                new Column({
                    id: 'col2',
                    direction: SortDirection.desc,
                    label: 'Column 2',
                    disabled: false,
                    sortable: true,
                    position: 0,
                    shrink: false,
                }),
                new Column({
                    id: 'col3',
                    direction: SortDirection.desc,
                    label: 'Column 3',
                    disabled: false,
                    sortable: false,
                    position: 2,
                    shrink: true,
                }),
                new Column({
                    id: 'col4',
                    direction: SortDirection.asc,
                    label: 'Column 4',
                    disabled: false,
                    sortable: false,
                    position: 3,
                    shrink: true,
                }),
            ]);

        expect(sorter.getOrderBy()).toEqual([
            'col2_desc',
            'col1_asc',
            'col3_desc',
            'col4_asc',
        ]);
    });
});

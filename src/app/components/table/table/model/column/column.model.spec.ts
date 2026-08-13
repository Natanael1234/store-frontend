import { SortDirection } from '../../../../../enums/direction/direction.enum';
import { Column } from './column.model';

describe('Column', () => {
    it('should create a column with required properties', () => {
        const column = new Column({
            id: 'name',
            direction: SortDirection.asc,
            label: 'Name',
            position: 0,
        });

        expect(column.id).toBe('name');
        expect(column.direction).toBe(SortDirection.asc);
        expect(column.label).toBe('Name');
        expect(column.position).toBe(0);
    });

    it('should set sortable if provided', () => {
        const column = new Column({
            id: 'age',
            direction: SortDirection.desc,
            label: 'Age',
            position: 1,
            sortable: true,
        });

        expect(column.sortable).toBe(true);
    });

    it('should set disabled if provided', () => {
        const column = new Column({
            id: 'age',
            direction: SortDirection.desc,
            label: 'Age',
            position: 1,
            disabled: true,
        });

        expect(column.disabled).toBe(true);
    });

    it('should set shrink if provided', () => {
        const column = new Column({
            id: 'age',
            direction: SortDirection.desc,
            label: 'Age',
            position: 1,
            shrink: true,
        });

        expect(column.shrink).toBe(true);
    });

    it('should set optional properties as false if not provided', () => {
        const column = new Column({
            id: 'email',
            direction: SortDirection.none,
            label: 'Email',
            position: 2,
        });

        expect(column.sortable).toBeFalse();
        expect(column.disabled).toBeFalse();
        expect(column.shrink).toBeFalse();
    });

    it('should allow updating properties after creation', () => {
        const column = new Column({
            id: 'status',
            direction: SortDirection.asc,
            label: 'Status',
            position: 3,
        });

        column.disabled = true;
        column.shrink = true;
        column.sortable = false;

        expect(column.disabled).toBe(true);
        expect(column.shrink).toBe(true);
        expect(column.sortable).toBe(false);
    });

    it('should accept all sort directions', () => {
        const ascCol = new Column({
            id: 'ascCol',
            direction: SortDirection.asc,
            label: 'Ascending',
            position: 0,
        });
        const descCol = new Column({
            id: 'descCol',
            direction: SortDirection.desc,
            label: 'Descending',
            position: 1,
        });
        const noneCol = new Column({
            id: 'noneCol',
            direction: SortDirection.none,
            label: 'None',
            position: 2,
        });

        expect(ascCol.direction).toBe('asc');
        expect(descCol.direction).toBe('desc');
        expect(noneCol.direction).toBe('');
    });
});

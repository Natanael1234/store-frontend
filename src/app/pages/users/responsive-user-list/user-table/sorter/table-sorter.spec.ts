import { SortDirection } from '../../../../../enums/direction/direction.enum';
import { Column } from '../../../../../interfaces/column.interface';
import { UserOrder } from '../../../../../services/user/enums/user-order/user-order.enum';
import { UserColumnId } from '../enums/user-column-id/user-column-id.enum';
import { UserColumnLabel } from '../enums/user-column-name/user-column-label.enum';
import { TableSorter } from './table-sorter';

describe('Table Sorter', () => {
    let columns: Column<UserColumnId>[];

    beforeEach(() => {
        columns = [
            {
                columnId: UserColumnId.name,
                direction: SortDirection.asc,
                label: UserColumnLabel.name,
                disabled: false,
            },
            {
                columnId: UserColumnId.email,
                direction: SortDirection.asc,
                label: UserColumnLabel.email,
                disabled: false,
            },
            {
                columnId: UserColumnId.active,
                direction: SortDirection.asc,
                label: UserColumnLabel.active,
                disabled: false,
            },
            {
                columnId: UserColumnId.deleted,
                direction: SortDirection.desc,
                label: UserColumnLabel.deleted,
                disabled: false,
            },
        ];
    });

    it('should create', () => {
        const sorter = new TableSorter<
            UserColumnId,
            typeof UserColumnId,
            UserOrder,
            typeof UserOrder
        >(UserColumnId, UserOrder, columns);
        expect(sorter).toBeTruthy();
    });

    it('should get columns', () => {
        const sorter = new TableSorter<
            UserColumnId,
            typeof UserColumnId,
            UserOrder,
            typeof UserOrder
        >(UserColumnId, UserOrder, columns);
        expect(sorter.getColumns()).toEqual(columns);
    });

    it('should get orderBy', () => {
        const sorter = new TableSorter<
            UserColumnId,
            typeof UserColumnId,
            UserOrder,
            typeof UserOrder
        >(UserColumnId, UserOrder, columns);
        expect(sorter.getOrderBy()).toEqual([
            UserOrder.name_asc,
            UserOrder.email_asc,
            UserOrder.active_asc,
            UserOrder.deleted_desc,
        ]);
    });

    it('should sort by sort object', () => {
        const sorter = new TableSorter<
            UserColumnId,
            typeof UserColumnId,
            UserOrder,
            typeof UserOrder
        >(UserColumnId, UserOrder, columns);
        sorter.sortBySortObject({
            columnId: UserColumnId.email,
            direction: SortDirection.asc,
        });
        expect(sorter.getColumns()).toEqual([
            {
                columnId: UserColumnId.email,
                direction: SortDirection.asc,
                label: UserColumnLabel.email,
                disabled: false,
            },
            {
                columnId: UserColumnId.name,
                direction: SortDirection.asc,
                label: UserColumnLabel.name,
                disabled: false,
            },
            {
                columnId: UserColumnId.active,
                direction: SortDirection.asc,
                label: UserColumnLabel.active,
                disabled: false,
            },
            {
                columnId: UserColumnId.deleted,
                direction: SortDirection.desc,
                label: UserColumnLabel.deleted,
                disabled: false,
            },
        ]);

        expect(sorter.getOrderBy()).toEqual([
            UserOrder.email_asc,
            UserOrder.name_asc,
            UserOrder.active_asc,
            UserOrder.deleted_desc,
        ]);
    });

    it('should sort by column id', () => {
        const sorter = new TableSorter<
            UserColumnId,
            typeof UserColumnId,
            UserOrder,
            typeof UserOrder
        >(UserColumnId, UserOrder, columns);
        sorter.sortByColumnIdAndDirection(UserColumnId.email);
        expect(sorter.getColumns()).toEqual([
            {
                columnId: UserColumnId.email,
                direction: SortDirection.desc,
                label: UserColumnLabel.email,
                disabled: false,
            },
            {
                columnId: UserColumnId.name,
                direction: SortDirection.asc,
                label: UserColumnLabel.name,
                disabled: false,
            },
            {
                columnId: UserColumnId.active,
                direction: SortDirection.asc,
                label: UserColumnLabel.active,
                disabled: false,
            },
            {
                columnId: UserColumnId.deleted,
                direction: SortDirection.desc,
                label: UserColumnLabel.deleted,
                disabled: false,
            },
        ]);

        expect(sorter.getOrderBy()).toEqual([
            UserOrder.email_desc,
            UserOrder.name_asc,
            UserOrder.active_asc,
            UserOrder.deleted_desc,
        ]);
    });

    it('should sort by column id and direction', () => {
        const sorter = new TableSorter<
            UserColumnId,
            typeof UserColumnId,
            UserOrder,
            typeof UserOrder
        >(UserColumnId, UserOrder, columns);
        sorter.sortByColumnIdAndDirection(
            UserColumnId.email,
            SortDirection.asc,
        );
        expect(sorter.getColumns()).toEqual([
            {
                columnId: UserColumnId.email,
                direction: SortDirection.asc,
                label: UserColumnLabel.email,
                disabled: false,
            },
            {
                columnId: UserColumnId.name,
                direction: SortDirection.asc,
                label: UserColumnLabel.name,
                disabled: false,
            },
            {
                columnId: UserColumnId.active,
                direction: SortDirection.asc,
                label: UserColumnLabel.active,
                disabled: false,
            },
            {
                columnId: UserColumnId.deleted,
                direction: SortDirection.desc,
                label: UserColumnLabel.deleted,
                disabled: false,
            },
        ]);

        expect(sorter.getOrderBy()).toEqual([
            UserOrder.email_asc,
            UserOrder.name_asc,
            UserOrder.active_asc,
            UserOrder.deleted_desc,
        ]);
    });

    it('should sort by order id', () => {
        const sorter = new TableSorter<
            UserColumnId,
            typeof UserColumnId,
            UserOrder,
            typeof UserOrder
        >(UserColumnId, UserOrder, columns);
        sorter.sortByOrderId(UserOrder.email_desc);
        expect(sorter.getColumns()).toEqual([
            {
                columnId: UserColumnId.email,
                direction: SortDirection.desc,
                label: UserColumnLabel.email,
                disabled: false,
            },
            {
                columnId: UserColumnId.name,
                direction: SortDirection.asc,
                label: UserColumnLabel.name,
                disabled: false,
            },
            {
                columnId: UserColumnId.active,
                direction: SortDirection.asc,
                label: UserColumnLabel.active,
                disabled: false,
            },
            {
                columnId: UserColumnId.deleted,
                direction: SortDirection.desc,
                label: UserColumnLabel.deleted,
                disabled: false,
            },
        ]);

        expect(sorter.getOrderBy()).toEqual([
            UserOrder.email_desc,
            UserOrder.name_asc,
            UserOrder.active_asc,
            UserOrder.deleted_desc,
        ]);
    });

    it('should sort by multiple order ids', () => {
        const sorter = new TableSorter<
            UserColumnId,
            typeof UserColumnId,
            UserOrder,
            typeof UserOrder
        >(UserColumnId, UserOrder, columns);
        sorter.sortByOrderIds([
            UserOrder.email_desc,
            UserOrder.name_asc,
            UserOrder.active_desc,
            UserOrder.deleted_asc,
        ]);
        expect(sorter.getColumns()).toEqual([
            {
                columnId: UserColumnId.name,
                direction: SortDirection.asc,
                label: UserColumnLabel.name,
                disabled: false,
            },
            {
                columnId: UserColumnId.active,
                direction: SortDirection.desc,
                label: UserColumnLabel.active,
                disabled: false,
            },
            {
                columnId: UserColumnId.email,
                direction: SortDirection.desc,
                label: UserColumnLabel.email,
                disabled: false,
            },
            {
                columnId: UserColumnId.deleted,
                direction: SortDirection.none,
                label: UserColumnLabel.deleted,
                disabled: false,
            },
        ]);

        expect(sorter.getOrderBy()).toEqual([
            UserOrder.name_asc,
            UserOrder.active_desc,
            UserOrder.email_desc,
        ]);
    });
});

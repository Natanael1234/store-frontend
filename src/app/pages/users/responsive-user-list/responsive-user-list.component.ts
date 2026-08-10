import { A11yModule } from '@angular/cdk/a11y';

import {
    AfterViewInit,
    Component,
    computed,
    effect,
    EventEmitter,
    model,
    Output,
} from '@angular/core';
import { ListComponent } from '../../../components/list/list.component';
import { ListItem } from '../../../components/list/types/list-item.model';
import { ItemIcon } from '../../../components/models/item-icon/item-icon.model';
import { ItemLabel } from '../../../components/models/item-label/item-label.model';
import { UserColumnLabel } from '../../../components/table/table/enums/user-column-name/user-column-label.enum';
import { UserTableRow } from '../../../components/table/table/interfaces/user-table-row.interface';
import { ColumnData } from '../../../components/table/table/model/column-data/column-data.model';
import { Column } from '../../../components/table/table/model/column/column.model';
import { Row } from '../../../components/table/table/model/row/row.model';
import { TableSorter } from '../../../components/table/table/sorter/table-sorter';
import { TableComponent } from '../../../components/table/table/table.component';
import { ActiveFilter } from '../../../enums/active-filter/active-filter.enum';
import { DeletedFilter } from '../../../enums/deleted-filter/deleted-filter.enum';
import { SortDirection } from '../../../enums/direction/direction.enum';
import { UserOrder } from '../../../services/user/enums/user-order/user-order.enum';
import { UserColumnId } from '../types/user-column-id/user-column-id.enum';
import { UserOrderParam } from '../types/user-order-param.type';

@Component({
    selector: 'app-responsive-user-list',
    imports: [TableComponent, ListComponent, A11yModule],
    templateUrl: './responsive-user-list.component.html',
    styleUrl: './responsive-user-list.component.scss',
})
export class ResponsiveUserListComponent implements AfterViewInit {
    public mobile = model<boolean>(true);
    public loading = model<boolean | undefined>(false);
    public active = model<ActiveFilter>(ActiveFilter.active);
    public deleted = model<DeletedFilter>(DeletedFilter.not_deleted);
    public users = model<UserTableRow[]>([]);
    @Output() public headerClick = new EventEmitter();
    @Output() public itemClick = new EventEmitter<string>();

    protected activeOrderEnabled = computed<boolean>(
        () => this.active() == ActiveFilter.all,
    );
    protected deleteOrderEnabled = computed<boolean>(
        () => this.deleted() == DeletedFilter.all,
    );
    protected sorter = new TableSorter([
        new Column({
            id: UserColumnId.name,
            direction: SortDirection.asc,
            label: UserColumnLabel.name,
            disabled: this.loading(),
            sortable: true,
            position: 0,
            shrink: false,
        }),
        new Column({
            id: UserColumnId.email,
            direction: SortDirection.asc,
            label: UserColumnLabel.email,
            disabled: this.loading(),
            sortable: true,
            position: 1,
            shrink: false,
        }),
        new Column({
            id: UserColumnId.active,
            direction: SortDirection.asc,
            label: UserColumnLabel.active,
            disabled: this.loading(),
            sortable: this.activeOrderEnabled(),
            position: 2,
            shrink: true,
        }),
        new Column({
            id: UserColumnId.deleted,
            direction: SortDirection.desc,
            label: UserColumnLabel.deleted,
            disabled: this.loading(),
            sortable: this.deleteOrderEnabled(),
            position: 3,
            shrink: true,
        }),
    ]);
    protected columns = model<Column[]>(this.sorter.getColumns());
    protected listData = computed(() => {
        return (this.users() || []).map((user) => {
            return new ListItem({
                id: user.id,
                labels: [
                    new ItemLabel({
                        text: this.loading() ? '' : user.name,
                        tooltip: this.loading() ? undefined : user.name,
                        disabled: false,
                    }),
                    new ItemLabel({
                        text: this.loading() ? '' : user.email,
                        tooltip: this.loading() ? undefined : user.email,
                        disabled: false,
                    }),
                ],
                icons: [
                    new ItemIcon({
                        icon: this.loading() ? '' : 'checked',
                        tooltip: user.active ? 'Ativo' : undefined,
                        disabled: user.active ? false : true,
                    }),
                    new ItemIcon({
                        icon: this.loading() ? '' : 'checked',
                        tooltip: user.deleted ? 'Deletado' : undefined,
                        disabled: user.deleted ? false : true,
                    }),
                ],
            });
        });
    });
    protected tableData = computed(() => {
        return (this.users() || []).map((user) => {
            return new Row({
                id: user.id,
                columns: {
                    name: new ColumnData({
                        icon: undefined,
                        label: user.name,
                        tooltip: user.name,
                        disabled: false,
                    }),
                    email: new ColumnData({
                        icon: undefined,
                        label: user.email,
                        tooltip: user.email,
                        disabled: false,
                    }),
                    active: new ColumnData({
                        icon: 'checked',
                        label: undefined,
                        tooltip: user.active ? 'Ativo' : undefined,
                        disabled: user.active ? false : true,
                    }),
                    deleted: new ColumnData({
                        icon: 'checked',
                        label: undefined,
                        tooltip: user.deleted ? 'Deletado' : undefined,
                        disabled: user.deleted ? false : true,
                    }),
                },
            });
        });
    });

    constructor() {
        effect(() => {
            const activeColumn = this.sorter.getColumn(UserColumnId.active);
            if (
                activeColumn &&
                activeColumn?.sortable != this.activeOrderEnabled()
            ) {
                activeColumn.sortable = this.activeOrderEnabled();
            }

            const deletedColumn = this.sorter.getColumn(UserColumnId.deleted);
            if (
                deletedColumn &&
                deletedColumn?.sortable != this.deleteOrderEnabled()
            ) {
                deletedColumn.sortable = this.deleteOrderEnabled();
            }
        });
    }

    ngAfterViewInit() {}

    public updateSort(order: UserOrderParam) {
        if (this.loading() || !order) {
            return;
        } else if (this.orderIsArray(order as UserOrderParam)) {
            this.sorter.orderByOrderIds(order as UserOrder[]);
        } else if (this.orderIsColumn(order as UserOrderParam)) {
            this.sorter.orderByColumnIdAndDirection(order as UserColumnId);
        } else if (this.orderIsOrder(order as UserOrderParam)) {
            this.sorter.orderByOrderId(order as UserOrder);
        }
        this.refreshColumns();
    }

    public getOrderBy(): UserOrder[] {
        const orderBy = this.sorter.getOrderBy() as UserOrder[];
        return orderBy;
    }

    public getMobileOrderBy() {
        const orderBy = this.getOrderBy() || [];
        return orderBy?.length ? orderBy[0] : undefined;
    }

    private orderIsArray(orderParam: UserOrderParam): boolean {
        return Array.isArray(orderParam);
    }

    private orderIsColumn(orderParam: UserOrderParam): boolean {
        return (
            typeof orderParam === 'string' &&
            Object.values(UserColumnId).includes(orderParam as UserColumnId)
        );
    }

    private orderIsOrder(orderParam: UserOrderParam): boolean {
        return (
            typeof orderParam === 'string' &&
            Object.values(UserOrder).includes(orderParam as UserOrder)
        );
    }

    protected fireHeaderClickEvent(order: string) {
        this.sorter.orderByOrderId(order);
        this.refreshColumns();
        this.headerClick.emit();
    }

    protected fireRowClickEvent(userId: string) {
        this.itemClick.emit(userId);
    }

    private refreshColumns() {
        this.columns.set(this.sorter.getColumns());
    }
}

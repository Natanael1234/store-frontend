import { ComponentFixture } from '@angular/core/testing';
import { ActiveFilter } from '../../../../enums/active-filter/active-filter.enum';
import { DeletedFilter } from '../../../../enums/deleted-filter/deleted-filter.enum';
import { UserOrder } from '../../../../services/user/enums/user-order/user-order.enum';
import { UserTableRow } from '../../responsive-user-list/user-table/interfaces/user-table-row.interface';
import { UsersComponent } from '../../users.component';
import { _testUsersComponentAlertComponent as testAlert } from './users-component-alert-component.test';
import { _testUsersComponentFilterComponent as testFilter } from './users-component-filter-component.test';
import { _testUsersComponentListComponent as testList } from './users-component-list-component.test';
import { _testUsersComponentPaginatorComponent as testPaginator } from './users-component-paginator-component.test';

export function _testUsersComponent(
    fixture: ComponentFixture<UsersComponent>,
    options: {
        error?: string;
        mobile: boolean;
        loading: boolean;
        pageIndex: number;
        pageSize: number;
        rows: UserTableRow[];
        textQuery: string;
        orderBy: UserOrder[];
        active: ActiveFilter;
        deleted: DeletedFilter;
        length: number;
    },
) {
    testAlert(fixture, options);
    testFilter(fixture, options);
    testList(fixture, options);
    testPaginator(fixture, options);
}

import { ComponentFixture } from '@angular/core/testing';
import { UserTableRow } from '@components/table/table/interfaces/user-table-row.interface';
import { ActiveFilter } from '@enums/active-filter/active-filter.enum';
import { DeletedFilter } from '@enums/deleted-filter/deleted-filter.enum';
import { _testUsersComponentAlertComponent as testAlert } from '@pages/users/tests/tests/users-component-alert-component.test';
import { _testUsersComponentFilterComponent as testFilter } from '@pages/users/tests/tests/users-component-filter-component.test';
import { _testUsersComponentListComponent as testList } from '@pages/users/tests/tests/users-component-list-component.test';
import { _testUsersComponentPaginatorComponent as testPaginator } from '@pages/users/tests/tests/users-component-paginator-component.test';
import { UsersComponent } from '@pages/users/users.component';
import { UserOrder } from '@services/user/enums/user-order/user-order.enum';

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

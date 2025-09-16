import { RowClickEvent } from '../../../../../../interfaces/row-click.interface';
import { UserOrder } from '../../../../../../services/user/enums/user-order/user-order.enum';

import { UserTableRow } from '../../interfaces/user-table-row.interface';
import { UserTableComponent } from '../../user-table.component';
import { _testUserTableComponentHeaderClickEvent as testHeaderClickEvent } from './table-component-header-click-event.test';
import { _testUserTableComponentUpdateSortEvent as testUpdateSortEvent } from './test-user-table-component-update-sort-event.test';
import { _testUserTableRowClickEvent as testRowClickEvent } from './test-user-table-row-click-event';

export function testEvents(
    component: UserTableComponent,
    events: {
        updateSort?: UserOrder[] | false;
        headerClick?: UserOrder[] | false;
        rowClick?: RowClickEvent<UserTableRow> | false;
    },
) {
    testUpdateSortEvent(component, events.updateSort || false);
    testHeaderClickEvent(component, events.headerClick || false);
    testRowClickEvent(component, events.rowClick || false);
}

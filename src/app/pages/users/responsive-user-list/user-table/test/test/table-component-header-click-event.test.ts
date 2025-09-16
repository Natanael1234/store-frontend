import { UserOrder } from '../../../../../../services/user/enums/user-order/user-order.enum';
import { UserTableComponent } from '../../user-table.component';

// TODO: test left e right click
export function _testUserTableComponentHeaderClickEvent(
    component: UserTableComponent,
    event: UserOrder[] | false,
    context?: string,
) {
    if (event) {
        expect(component.headerClick.emit)
            .withContext(context || 'table header click event called')
            .toHaveBeenCalledOnceWith(event);
    } else {
        expect(component.headerClick.emit)
            .withContext(context || 'header click event not called')
            .not.toHaveBeenCalled();
    }
}

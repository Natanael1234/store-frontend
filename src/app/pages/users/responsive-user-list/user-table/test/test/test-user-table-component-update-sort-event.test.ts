import { UserOrder } from '../../../../../../services/user/enums/user-order/user-order.enum';
import { UserTableComponent } from '../../user-table.component';

export function _testUserTableComponentUpdateSortEvent(
    component: UserTableComponent,
    event: UserOrder[] | false,
    context?: string,
) {
    if (event) {
        expect(component.updateSort.emit)
            .withContext(context || 'update sort event called')
            .toHaveBeenCalledOnceWith(event);
    } else {
        expect(component.updateSort.emit)
            .withContext(context || 'update sort event not called')
            .not.toHaveBeenCalled();
    }
}

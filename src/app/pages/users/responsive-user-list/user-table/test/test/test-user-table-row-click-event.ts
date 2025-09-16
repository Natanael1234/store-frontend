import { RowClickEvent } from '../../../../../../interfaces/row-click.interface';
import { UserTableRow } from '../../interfaces/user-table-row.interface';
import { UserTableComponent } from '../../user-table.component';

export function _testUserTableRowClickEvent(
    component: UserTableComponent,
    event: RowClickEvent<UserTableRow> | false,
    context?: string,
) {
    if (event) {
        expect(component.rowClick.emit)
            .withContext(context || 'row row click event called')
            .toHaveBeenCalledWith(event);
    } else {
        expect(component.rowClick.emit)
            .withContext(context || 'row click event not called')
            .not.toHaveBeenCalled();
    }
}

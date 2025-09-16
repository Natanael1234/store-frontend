import { UserResponseDto } from '../../../../../../services/user/dtos/user.response/user.response.dto';
import { UserColumnId } from '../../enums/user-column-id/user-column-id.enum';
import { ExpectedTableRowItem } from '../types/expected-table-row-item.type.test';

export function _getUserTableComponentExpectedRows(
    users: UserResponseDto[],
    loading: boolean,
): ExpectedTableRowItem[][] {
    const expectedRows: ExpectedTableRowItem[][] = users.map((user) => {
        const expectedRow = [
            {
                id: UserColumnId.name,
                label: user.name,
                disabled: false,
                tooltip: user.name,
                loading: loading,
            },
            {
                id: UserColumnId.email,
                label: user.email,
                disabled: false,
                tooltip: user.email,
                loading: loading,
            },
            {
                id: UserColumnId.active,
                icon: 'checked',
                disabled: !user.active,
                tooltip: user.active ? 'Ativo' : undefined,
                loading: loading,
            },
            {
                id: UserColumnId.deleted,
                icon: 'checked',
                disabled: !user.deletedAt,
                tooltip: user.deletedAt ? 'Deletado' : undefined,
                loading: loading,
            },
        ];
        return expectedRow;
    });
    return expectedRows;
}

import { UserResponseDto } from '../../../../services/user/dtos/user.response/user.response.dto';
import { UserTableRow } from '../../responsive-user-list/user-table/interfaces/user-table-row.interface';

export function userResponseToUserTableRow(
    users: UserResponseDto[],
): UserTableRow[] {
    return users.map((user) => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            active: !!user.active,
            deleted: !!user.deletedAt,
        };
    });
}

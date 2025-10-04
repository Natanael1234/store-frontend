import { UserTableRow } from '../../../../components/table/table/interfaces/user-table-row.interface';
import { UserResponseDto } from '../../../../services/user/dtos/user.response/user.response.dto';

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

import { UserTableRow } from '../../../../../components/table/table/interfaces/user-table-row.interface';
import { _usersResponseDtos } from './users-response-dtos.data.test';

export const _usersItems: UserTableRow[] = _usersResponseDtos.map((userDto) => {
    return {
        id: userDto.id,
        name: userDto.name,
        email: userDto.email,
        active: userDto.active,
        deleted: !!userDto.deletedAt,
    };
}) as unknown as UserTableRow[];

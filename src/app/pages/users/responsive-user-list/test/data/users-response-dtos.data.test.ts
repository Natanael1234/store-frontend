import { Role } from '@services/user/dtos/role/role.enum';
import { UserResponseDto } from '@services/user/dtos/user.response/user.response.dto';

export const _usersResponseDtos: UserResponseDto[] = [
    {
        id: '891db31e-dfb5-42ed-b912-48b98463b004',
        name: 'User 1',
        email: 'user1@email.com',
        active: true,
        roles: [Role.root],
        created: '2024-02-03T19:05:21.689Z',
        updated: '2024-02-03T19:05:21.689Z',
        deletedAt: null,
    },
    {
        id: '891db31e-dfb5-42ed-b912-48b98463b005',
        name: 'User 2',
        email: 'user2@email.com',
        active: true,
        roles: [Role.user],
        created: '2024-02-03T19:05:21.689Z',
        updated: '2024-02-03T19:05:21.689Z',
        deletedAt: null,
    },
];

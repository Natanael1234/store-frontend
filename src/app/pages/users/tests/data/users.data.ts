import { Role } from '@services/user/dtos/role/role.enum';
import { UserResponseDto } from '@services/user/dtos/user.response/user.response.dto';

export const _usersComponentUsersData: UserResponseDto[] = [
    {
        id: '891db31e-dfb5-42ed-b912-48b98463b004',
        name: 'User 1',
        email: 'user1@email.com',
        roles: [Role.admin],
        active: true,
        created: '2025-04-08T12:30:00.000Z',
        updated: '2025-04-08T13:30:00.000Z',
        deletedAt: null,
    },
    {
        id: '891db31e-dfb5-42ed-b912-48b98463b005',
        name: 'User 2',
        email: 'user2@email.com',
        roles: [Role.admin],
        active: true,
        created: '2025-04-08T12:30:00.000Z',
        updated: '2025-04-08T13:30:00.000Z',
        deletedAt: '2025-04-08T15:30:00.000Z',
    },
    {
        id: '891db31e-dfb5-42ed-b912-48b98463b006',
        name: 'User 3',
        email: 'user3@email.com',
        roles: [Role.admin],
        active: false,
        created: '2025-04-08T12:30:00.000Z',
        updated: '2025-04-08T13:30:00.000Z',
        deletedAt: null,
    },
];

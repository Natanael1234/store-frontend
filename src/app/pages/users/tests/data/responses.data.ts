import { Role } from '@services/user/dtos/role/role.enum';
import { UserOrder } from '@services/user/enums/user-order/user-order.enum';

export const _usersComponentResponsesData = [
    {
        textQuery: '',
        orderBy: [
            UserOrder.name_asc,
            UserOrder.email_asc,
            UserOrder.active_asc,
            UserOrder.deleted_desc,
        ],
        results: [
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
        ],
        count: 3,
        page: 1,
        pageSize: 12,
    },
    {
        textQuery: 'test',
        orderBy: [
            UserOrder.active_desc,
            UserOrder.name_asc,
            UserOrder.email_asc,
            UserOrder.deleted_desc,
        ],
        results: [
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
        ],
        count: 1,
        page: 2,
        pageSize: 2,
    },
];

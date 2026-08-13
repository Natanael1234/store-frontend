import { UserOrder } from '@services/user/enums/user-order/user-order.enum';

/** TODO: test  */
export const UserOrderOptions = [
    { label: 'Nome (A-Z)', value: UserOrder.name_asc },
    { label: 'Nome (Z-A)', value: UserOrder.name_desc },
    { label: 'Email (A-Z)', value: UserOrder.email_asc },
    { label: 'Email (Z-A)', value: UserOrder.email_desc },
    { label: 'Ativos', value: UserOrder.active_desc },
    { label: 'Inativos', value: UserOrder.active_asc },
    { label: 'Não deletados', value: UserOrder.deleted_desc },
    { label: 'Deletados', value: UserOrder.deleted_asc },
];

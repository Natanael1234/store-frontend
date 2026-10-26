import { UserOrderOptions } from '@pages/users/responsive-user-filters/user-filter-toollbar/order-options/user-order.options';
import { UserOrder } from '@services/user/enums/user-order/user-order.enum';
import { describe, expect, it } from 'vitest';

describe('UserOrderOptions', () => {
    it('deve possuir a quantidade correta de opções', () => {
        expect(UserOrderOptions).toHaveLength(8);
    });

    it('deve conter as opções mapeadas com os labels e valores esperados', () => {
        const expectedOptions = [
            { label: 'Nome (A-Z)', value: UserOrder.name_asc },
            { label: 'Nome (Z-A)', value: UserOrder.name_desc },
            { label: 'Email (A-Z)', value: UserOrder.email_asc },
            { label: 'Email (Z-A)', value: UserOrder.email_desc },
            { label: 'Ativos', value: UserOrder.active_desc },
            { label: 'Inativos', value: UserOrder.active_asc },
            { label: 'Não deletados', value: UserOrder.deleted_desc },
            { label: 'Deletados', value: UserOrder.deleted_asc },
        ];

        expect(UserOrderOptions).toEqual(expectedOptions);
    });

    it('não deve conter valores indefinidos ou nulos nas propriedades de label e value', () => {
        UserOrderOptions.forEach((option) => {
            expect(option.label).toBeDefined();
            expect(option.label).not.toBe('');
            expect(option.value).toBeDefined();
        });
    });
});

import { ActiveFilterOptions } from '@constants/active-filter-options/active-filter-options';
import { ActiveFilter } from '@enums/active-filter/active-filter.enum';

describe('ActiveFilterOptions', () => {
    it('should be defined', () => {
        expect(ActiveFilterOptions).toBeDefined();
    });

    it('should have valid keys and values', () => {
        expect(ActiveFilterOptions).toEqual([
            { label: 'Ativos', value: ActiveFilter.active },
            { label: 'Inativos', value: ActiveFilter.inactive },
            { label: 'Todos', value: ActiveFilter.all },
        ]);
    });
});

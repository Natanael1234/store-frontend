import { ActiveFilter } from '@enums/active-filter/active-filter.enum';

export const ActiveFilterOptions = [
    { label: 'Ativos', value: ActiveFilter.active },
    { label: 'Inativos', value: ActiveFilter.inactive },
    { label: 'Todos', value: ActiveFilter.all },
];

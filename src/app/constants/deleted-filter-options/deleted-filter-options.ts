import { DeletedFilter } from '@enums/deleted-filter/deleted-filter.enum';

export const DeletedFilterOptions = [
    { label: 'Não deletados', value: DeletedFilter.not_deleted },
    { label: 'Deletados', value: DeletedFilter.deleted },
    { label: 'Todos', value: DeletedFilter.all },
];

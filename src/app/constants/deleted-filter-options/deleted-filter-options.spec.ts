import { DeletedFilter } from '../../enums/deleted-filter/deleted-filter.enum';
import { DeletedFilterOptions } from './deleted-filter-options';

describe('DeletedFilterOptions', () => {
    it('should be defined', () => {
        expect(DeletedFilterOptions).toBeDefined();
    });

    it('should have valid keys and values', () => {
        expect(DeletedFilterOptions).toEqual([
            { label: 'Não deletados', value: DeletedFilter.not_deleted },
            { label: 'Deletados', value: DeletedFilter.deleted },
            { label: 'Todos', value: DeletedFilter.all },
        ]);
    });
});

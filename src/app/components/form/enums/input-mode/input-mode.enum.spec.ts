import { InputMode } from './input-mode.enum';

describe('SortDirection enum', () => {
    it('should be defined', () => {
        expect(InputMode).toBeDefined();
    });

    it('should have valid keys and values', () => {
        const options = { ...InputMode } as any;
        expect(options).toEqual({
            none: 'none',
            text: 'text',
            decimal: 'decimal',
            numeric: 'numeric',
            tel: 'tel',
            email: 'email',
            url: 'url',
            search: 'search',
        });
    });
});

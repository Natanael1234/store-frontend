import { TextFormat } from './text-format.enum';

describe('TextFormat enum', () => {
    it('should be defined', () => {
        expect(TextFormat).toBeDefined();
    });

    it('should have valid keys and values', () => {
        const options = { ...TextFormat } as any;
        expect(options).toEqual({
            cnpj: 'cnpj',
            cpf: 'cpf',
            number: 'number',
            date: 'date',
            email: 'email',
            url: 'url',
            percentage: 'percentage',
            phone: 'phone',
            time: 'time',
            zipCode: 'zip-code',
            password: 'password',
            text: 'text',
        });
    });
});

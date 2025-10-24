import { TextInputFormat } from './text-input-format.enum';

describe('TextInputFormat enum', () => {
    it('should be defined', () => {
        expect(TextInputFormat).toBeDefined();
    });

    it('should have valid keys and values', () => {
        const options = { ...TextInputFormat } as any;
        expect(options).toEqual({
            cnpj: 'cnpj',
            cpf: 'cpf',
            integer: 'integer',
            float: 'float',
            date: 'date',
            email: 'email',
            percentage: 'percentage',
            phone: 'phone',
            time: 'time',
            zipCode: 'zip-code',
            password: 'password',
        });
    });
});

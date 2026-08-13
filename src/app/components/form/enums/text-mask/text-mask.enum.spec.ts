import { TextMask } from './text-mask.enum';

describe('TextMask enum', () => {
    it('should be defined', () => {
        expect(TextMask).toBeDefined();
    });

    it('should have valid keys and values', () => {
        const options = { ...TextMask } as any;
        expect(options).toEqual({
            currency: 'separator',
            cnpj: '00.000.000/0000-00',
            cpf: '000.000.000-00',
            date: 'd0/M0/0000',
            email: 'A*@A*.S*',
            phone: '(00) 90000-0000',
            time: 'Hh:m0',
            zipCode: '00000-000',
        });
    });
});

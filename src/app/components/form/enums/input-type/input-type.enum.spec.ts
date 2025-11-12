import { InputType } from './input-type.enum';

describe('FormElementType enum', () => {
    it('should be defined', () => {
        expect(InputType).toBeDefined();
    });

    it('should have valid keys and values', () => {
        const options = { ...InputType } as any;
        expect(options).toEqual({
            text: 'text',
            email: 'email',
            url: 'url',
            tel: 'tel',
            zipCode: 'zip-code',
            password: 'password',
            number: 'number',
            range: 'range',

            textArea: 'text-area',

            date: 'date',
            month: 'month',
            week: 'date-time',
            time: 'time',
            year: 'year',
            dateTimeLocal: 'date-time-local',
        });
    });
});

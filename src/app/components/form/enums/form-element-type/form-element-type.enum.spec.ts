import { FormElementType } from './form-element-type.enum';

describe('FormElementType enum', () => {
    it('should be defined', () => {
        expect(FormElementType).toBeDefined();
    });

    it('should have valid keys and values', () => {
        const options = { ...FormElementType } as any;
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

            select: 'select',
            checkbox: 'checkbox',
            radioButtons: 'radio-buttons',

            button: 'button',
            buttonGroup: 'button-group',

            label: 'label',
            divider: 'divider',
        });
    });
});

import { FormControl } from '@angular/forms';
import { FormElementType } from '../../../../enums/form-element-type/form-element-type.enum';
import { RadioButtons } from './radio-buttons-element.model';

describe('RadioButtons', () => {
    it('should create an instance with correct type', () => {
        const radio = new RadioButtons({
            control: new FormControl(),
            label: 'Escolha uma opção',
            name: 'radioField',
            options: [
                { value: '1', label: 'Opção 1' },
                { value: '2', label: 'Opção 2' },
            ],
        });

        expect(radio).toBeDefined();
        expect(radio.type).toBe(FormElementType.radioButtons);
        expect(radio.label).toBe('Escolha uma opção');
        expect(radio.name).toBe('radioField');
        expect(radio.options.length).toBe(2);
    });

    it('should initialize options correctly', () => {
        const radio = new RadioButtons({
            control: new FormControl(),
            options: [{ value: 'a', label: 'A' }],
        });

        expect(radio.options).toBeDefined();
        expect(radio.options[0].value).toBe('a');
        expect(radio.options[0].label).toBe('A');
    });

    it('should allow updating the options array', () => {
        const radio = new RadioButtons({
            control: new FormControl(),
            options: [{ value: '1', label: '1' }],
        });

        radio.options.push({ value: '2', label: '2' });
        expect(radio.options.length).toBe(2);
        expect(radio.options[1].value).toBe('2');
    });

    it('should be compatible with inherited FormControl', () => {
        const control = new FormControl('initial');
        const radio = new RadioButtons({
            control,
            options: [{ value: 'x', label: 'X' }],
        });

        expect(radio.control).toBe(control);
        expect(radio.control.value).toBe('initial');

        radio.control.setValue('newValue');
        expect(radio.control.value).toBe('newValue');
    });

    it('should allow setting and updating inherited properties', () => {
        const radio = new RadioButtons({
            control: new FormControl(),
            id: 'myRadio',
            label: 'Label',
            options: [],
        });

        expect(radio.id).toBe('myRadio');
        expect(radio.label).toBe('Label');
    });
});

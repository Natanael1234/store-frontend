import { FormControl } from '@angular/forms';
import { FormElementType } from '../../../../enums/form-element-type/form-element-type.enum';
import { Select } from './select-element.model';

describe('Select', () => {
    it('should create an instance with correct type', () => {
        const select = new Select({
            control: new FormControl(),
            label: 'Escolha uma opção',
            name: 'selectField',
            options: [
                { value: '1', label: 'Opção 1' },
                { value: '2', label: 'Opção 2' },
            ],
        });

        expect(select).toBeDefined();
        expect(select.type).toBe(FormElementType.select);
        expect(select.label).toBe('Escolha uma opção');
        expect(select.name).toBe('selectField');
        expect(select.options.length).toBe(2);
    });

    it('should initialize options correctly', () => {
        const select = new Select({
            control: new FormControl(),
            options: [{ value: 'a', label: 'A' }],
        });

        expect(select.options).toBeDefined();
        expect(select.options[0].value).toBe('a');
        expect(select.options[0].label).toBe('A');
    });

    it('should allow updating the options array', () => {
        const select = new Select({
            control: new FormControl(),
            options: [{ value: '1', label: '1' }],
        });

        select.options.push({ value: '2', label: '2' });
        expect(select.options.length).toBe(2);
        expect(select.options[1].value).toBe('2');
    });

    it('should be compatible with inherited FormControl', () => {
        const control = new FormControl('initial');
        const select = new Select({
            control,
            options: [{ value: 'x', label: 'X' }],
        });

        expect(select.control).toBe(control);
        expect(select.control.value).toBe('initial');

        select.control.setValue('newValue');
        expect(select.control.value).toBe('newValue');
    });

    it('should allow setting and updating inherited properties', () => {
        const select = new Select({
            control: new FormControl(),
            id: 'mySelect',
            label: 'Label',
            options: [],
        });

        expect(select.id).toBe('mySelect');
        expect(select.label).toBe('Label');
    });
});

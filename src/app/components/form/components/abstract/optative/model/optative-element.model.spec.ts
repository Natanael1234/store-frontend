import { FormControl } from '@angular/forms';
import { FormElementType } from '../../../../enums/form-element-type/form-element-type.enum';
import { OptativeFormControl, OptativeModel } from './optative-element.model';

// Criar uma subclasse concreta para testar a classe abstrata
class TestOptativeControl extends OptativeFormControl {
    public override type: FormElementType = FormElementType.select;
}

describe('OptativeModel.', () => {
    it('should initialize with options and control.', () => {
        const elementOptions: OptativeModel = {
            control: new FormControl(),
            options: [
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
            ],
        };

        const control = new TestOptativeControl(elementOptions);

        expect(control).toBeDefined();
        expect(control.control).toBe(elementOptions.control);
        expect(control.type).toBe(FormElementType.select);
        expect(control.options.length).toBe(2);
        expect(control.options[0].value).toBe('1');
        expect(control.options[1].label).toBe('Option 2');
    });

    it('should initialize options as empty array if none provided.', () => {
        const elementOptions: OptativeModel = {
            control: new FormControl(),
            options: [],
        };

        const control = new TestOptativeControl(elementOptions);
        expect(control.options).toEqual([]);
    });

    it('should be compatible with inherited properties from AbstractFormControl.', () => {
        const elementOptions: OptativeModel = {
            id: 'select-id',
            label: 'Select Label',
            control: new FormControl(),
            options: [{ value: 'a', label: 'A' }],
        };

        const control = new TestOptativeControl(elementOptions);
        expect(control.id).toBe('select-id');
        expect(control.type).toBe(FormElementType.select);
        expect(control.label).toBe('Select Label');
        expect(control.control.value).toBeNull();
    });

    it('should allow updating options array.', () => {
        const elementOptions: OptativeModel = {
            control: new FormControl(),
            options: [{ value: '1', label: 'Option 1' }],
        };

        const control = new TestOptativeControl(elementOptions);
        control.options.push({ value: '2', label: 'Option 2' });

        expect(control.options.length).toBe(2);
        expect(control.options[1].value).toBe('2');
    });
});

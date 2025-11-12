import { FormControl } from '@angular/forms';
import { FormElementType } from '../../../../enums/form-element-type/form-element-type.enum';
import { SelectModel } from './select-element.model';

describe('SelectModel', () => {
    it('should create an instance with correct type', () => {
        const select = new SelectModel({
            control: new FormControl(),
            options: [],
        });

        expect(select).toBeTruthy();
        expect(select.type).toBe(FormElementType.select);
    });

    it('should store options provided in constructor', () => {
        const options = [
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
        ];

        const select = new SelectModel({
            control: new FormControl(),
            options,
        });

        expect(select.options.length).toBe(2);
        expect(select.options[0].label).toBe('Option 1');
        expect(select.options[1].value).toBe('2');
    });

    it('should default to empty options when none are provided', () => {
        const select = new SelectModel({
            control: new FormControl(),
            options: [],
        });

        expect(select.options).toEqual([]);
    });
});

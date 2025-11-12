import { FormControl } from '@angular/forms';
import { FormElementType } from '../../../../enums/form-element-type/form-element-type.enum';
import { RadioGroupModel } from './radio-buttons-element.model';

describe('RadioGroupModel', () => {
    it('should have type FormElementType.radioButtons', () => {
        const element = new RadioGroupModel({
            control: new FormControl(),
            options: [],
        });
        expect(element.type).toBe(FormElementType.radioButtons);
    });

    it('should initialize options correctly', () => {
        const options = [
            { value: 'M', label: 'Male' },
            { value: 'F', label: 'Female' },
        ];
        const element = new RadioGroupModel({
            control: new FormControl(),
            options,
        });

        expect(element.options).toEqual(options);
    });

    it('should inherit properties from AbstractFormControl', () => {
        const control = new FormControl('M');
        const element = new RadioGroupModel({
            label: 'Gender',
            control,
            options: [{ value: 'M', label: 'Male' }],
            colSize: 6,
            colOffset: 3,
            breakLine: true,
        });
        expect(element.label).toBe('Gender');
        expect(element.control).toBe(control);
        expect(element.colSize).toBe(6);
        expect(element.colOffset).toBe(3);
        expect(element.breakLine).toBeTrue();
    });

    it('should default breakLine to false', () => {
        const element = new RadioGroupModel({
            control: new FormControl(),
            options: [{ value: 'M', label: 'Male' }],
        });

        expect(element.breakLine).toBeFalse();
    });
});

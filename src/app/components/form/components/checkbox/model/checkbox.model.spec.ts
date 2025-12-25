import { FormControl } from '@angular/forms';
import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { CheckboxModel } from './checkbox.model';

describe('CheckboxModel.', () => {
    it('should have type FormElementType.checkbox.', () => {
        const element = new CheckboxModel({
            control: new FormControl(false),
        });
        expect(element.type).toBe(FormElementType.checkbox);
    });

    it('should initialize label and FormControl.', () => {
        const control = new FormControl(true);
        const element = new CheckboxModel({ label: 'Accept terms', control });

        expect(element.label).toBe('Accept terms');
        expect(element.control).toBe(control);
    });

    it('should inherit properties from AbstractFormElement.', () => {
        const element = new CheckboxModel({
            label: 'Subscribe',
            control: new FormControl(false),
            autofocus: true,
            id: 'checkbox-1',
            colSize: 6,
            colOffset: 2,
            breakLine: true,
        });

        expect(element.id).toBe('checkbox-1');
        expect(element.autofocus).toBeTrue();
        expect(element.colSize).toBe(6);
        expect(element.colOffset).toBe(2);
        expect(element.breakLine).toBeTrue();
    });

    it('should default breakLine to false.', () => {
        const element = new CheckboxModel({
            control: new FormControl(false),
        });
        expect(element.breakLine).toBeFalse();
    });
});

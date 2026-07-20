import { FormControl } from '@angular/forms';
import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { CheckboxModel } from './checkbox.model';

describe('CheckboxModel.', () => {
    it('should have type FormElementType.checkbox.', () => {
        const element = new CheckboxModel({ control: new FormControl(false) });
        expect(element.type).toBe(FormElementType.checkbox);
    });

    it('should initialize label and FormControl.', () => {
        const control = new FormControl(true);
        const element = new CheckboxModel({ label: 'Accept terms', control });

        expect(element.label).toBe('Accept terms');
        expect(element.control).toBe(control);
    });

    it('should inherit properties from AbstractFormElement.', () => {
        const control = new FormControl(true);
        const model = new CheckboxModel({
            id: 'checkbox-1',
            label: 'Subscribe',
            control,
            focusable: true,
            autofocus: true,
            colSize: 6,
        });

        expect(model.id).toBe('checkbox-1');
        expect(model.control).toEqual(control);
        expect(model.focusable).toBeTrue();
        expect(model.autofocus).toBeTrue();
        expect(model.colSize).toBe(6);
    });
});

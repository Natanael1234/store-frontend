import { FormControl, Validators } from '@angular/forms';
import { FormElementType } from '../../../../enums/form-element-type/form-element-type.enum';
import { CheckboxElement } from './checkbox.model';

describe('CheckboxElement', () => {
    it('should create an instance with the correct type', () => {
        const checkbox = new CheckboxElement({
            control: new FormControl(false),
            label: 'Aceito os termos',
            name: 'terms',
        });

        expect(checkbox).toBeDefined();
        expect(checkbox.type).toBe(FormElementType.checkbox);
        expect(checkbox.label).toBe('Aceito os termos');
        expect(checkbox.name).toBe('terms');
        expect(checkbox.control.value).toBeFalse();
    });

    it('should allow setting the initial value via FormControl', () => {
        const checkbox = new CheckboxElement({
            control: new FormControl(true),
        });

        expect(checkbox.control.value).toBeTrue();
    });

    it('should inherit control validation from FormControl', () => {
        const control = new FormControl(null, Validators.requiredTrue);
        const checkbox = new CheckboxElement({ control });

        expect(checkbox.control.invalid).toBeTrue();

        checkbox.control.setValue(true);
        expect(checkbox.control.valid).toBeTrue();
    });

    it('should allow updating the control value', () => {
        const checkbox = new CheckboxElement({
            control: new FormControl(false),
        });

        checkbox.control.setValue(true);
        expect(checkbox.control.value).toBeTrue();

        checkbox.control.setValue(false);
        expect(checkbox.control.value).toBeFalse();
    });
});

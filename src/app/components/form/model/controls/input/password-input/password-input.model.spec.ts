import { FormControl } from '@angular/forms';
import { FormElementType } from '../../../../enums/form-element-type/form-element-type.enum';
import { TextFormat } from '../../../../enums/text-format/text-format.enum';
import { PasswordInputModel } from './password-input.model';

describe('PasswordInputModel', () => {
    it('should create a password input with default visible=false', () => {
        const model = new PasswordInputModel({
            control: new FormControl(''),
            visible: false,
        });

        expect(model).toBeTruthy();
        expect(model.type).toBe(FormElementType.password);
        expect(model.format).toBe(TextFormat.password);
        expect(model.mask).toBeNull();
        expect(model.visible).toBeFalse();
    });

    it('should set visible=true when explicitly passed', () => {
        const model = new PasswordInputModel({
            control: new FormControl(''),
            visible: true,
        });

        expect(model.visible).toBeTrue();
    });

    it('should default visible to false if not provided', () => {
        const model = new PasswordInputModel({
            control: new FormControl(''),
        });

        expect(model.visible).toBeFalse();
    });

    it('should keep inherited properties from TextInputModel', () => {
        const model = new PasswordInputModel({
            control: new FormControl(''),
            placeholder: 'Enter password',
        });

        expect(model.placeholder).toBe('Enter password');
    });

    // TODO: imcompleto
});

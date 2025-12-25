import { FormControl } from '@angular/forms';
import { AutoCompleteType } from '../../../../enums/auto-complete-type/auto-complete-type.enum';
import { FormElementType } from '../../../../enums/form-element-type/form-element-type.enum';
import { InputMode } from '../../../../enums/input-mode/input-mode.enum';
import { InputType } from '../../../../enums/input-type/input-type.enum';
import { TextFormat } from '../../../../enums/text-format/text-format.enum';
import { TextMask } from '../../../../enums/text-mask/text-mask.enum';
import { TextFieldModel } from './text-field.model';

describe('TextFieldModel.', () => {
    describe('type.', () => {
        it('should create a text field with text format by default.', () => {
            const field = new TextFieldModel({ control: new FormControl() });

            expect(field.type).toEqual(InputType.text);
        });

        it('should set text field type as password when format is password.', () => {
            const field = new TextFieldModel({
                control: new FormControl(),
                format: TextFormat.password,
            });

            expect(field.type).toEqual(InputType.text);
        });
    });

    describe('format.', () => {
        it('should set undefined format by default.', () => {
            const field = new TextFieldModel({ control: new FormControl() });

            expect(field.type).toBe(FormElementType.text);
        });

        it('should set CNPJ format.', () => {
            const field = new TextFieldModel({
                control: new FormControl(),
                format: TextFormat.cnpj,
            });

            expect(field.type).toBe(FormElementType.text);
            expect(field.format).toBe(TextFormat.cnpj);
            expect(field.mask).toBe(TextMask.cnpj);
            expect(field.inputMode).toBe(InputMode.numeric);
        });

        it('should set CPF format.', () => {
            const field = new TextFieldModel({
                control: new FormControl(),
                format: TextFormat.cpf,
            });

            expect(field.type).toBe(FormElementType.text);
            expect(field.format).toBe(TextFormat.cpf);
            expect(field.mask).toBe(TextMask.cpf);
            expect(field.inputMode).toBe(InputMode.numeric);
        });

        it('should set date format.', () => {
            const field = new TextFieldModel({
                control: new FormControl(),
                format: TextFormat.date,
            });

            expect(field.type).toBe(FormElementType.text);
            expect(field.format).toBe(TextFormat.date);
            expect(field.mask).toBe(TextMask.date);
            expect(field.inputMode).toBe(InputMode.numeric);
        });

        it('should set time format.', () => {
            const field = new TextFieldModel({
                control: new FormControl(),
                format: TextFormat.time,
            });

            expect(field.type).toBe(FormElementType.text);
            expect(field.format).toBe(TextFormat.time);
            expect(field.mask).toBe(TextMask.time);
            expect(field.inputMode).toBe(InputMode.numeric);
        });

        it('should set email format.', () => {
            const field = new TextFieldModel({
                control: new FormControl(),
                format: TextFormat.email,
            });

            expect(field.type).toBe(FormElementType.text);
            expect(field.format).toBe(TextFormat.email);
            expect(field.mask).toBe(TextMask.email);
            expect(field.inputMode).toBe(InputMode.email);
        });

        it('should set url format.', () => {
            const field = new TextFieldModel({
                control: new FormControl(),
                format: TextFormat.url,
            });

            expect(field.type).toBe(FormElementType.text);
            expect(field.format).toBe(TextFormat.url);
            expect(field.mask).toBeUndefined();
            expect(field.inputMode).toBe(InputMode.url);
        });

        it('should set phone format.', () => {
            const field = new TextFieldModel({
                control: new FormControl(),
                format: TextFormat.phone,
            });

            expect(field.type).toBe(FormElementType.text);
            expect(field.format).toBe(TextFormat.phone);
            expect(field.mask).toBe(TextMask.phone);
            expect(field.inputMode).toBe(InputMode.tel);
        });

        it('should set zip code format.', () => {
            const field = new TextFieldModel({
                control: new FormControl(),
                format: TextFormat.zipCode,
            });

            expect(field.type).toBe(FormElementType.text);
            expect(field.format).toBe(TextFormat.zipCode);
            expect(field.mask).toBe(TextMask.zipCode);
            expect(field.inputMode).toBe(InputMode.numeric);
        });
    });

    describe('inputMode.', () => {
        it('inputMode should be undefined.', () => {
            const model = new TextFieldModel({ control: new FormControl() });

            expect(model.inputMode).toEqual(InputMode.text);
        });

        it('inputMode should be set.', () => {
            const model = new TextFieldModel({
                control: new FormControl(),
                inputMode: InputMode.email,
            });

            expect(model.inputMode).toEqual(InputMode.email);
        });
    });

    describe('readonly.', () => {
        it('should set readonly = false by default.', () => {
            const model = new TextFieldModel({ control: new FormControl() });

            expect(model.readOnly).toEqual(false);
        });

        it('readonly should be set true.', () => {
            const model = new TextFieldModel({
                control: new FormControl(),
                readOnly: true,
            });

            expect(model.readOnly).toBeTrue();
        });

        it('readonly should be set false.', () => {
            const model = new TextFieldModel({
                control: new FormControl(),
                readOnly: false,
            });

            expect(model.readOnly).toBeFalse();
        });
    });

    describe('autocomplete.', () => {
        it('should set autocomplete = off by default.', () => {
            const model = new TextFieldModel({ control: new FormControl() });

            expect(model.autocomplete).toEqual(AutoCompleteType.off);
        });

        it('autocomplete should be set on.', () => {
            const model = new TextFieldModel({
                control: new FormControl(),
                autocomplete: AutoCompleteType.on,
            });

            expect(model.autocomplete).toEqual(AutoCompleteType.on);
        });

        it('autocomplete should be set off.', () => {
            const model = new TextFieldModel({
                control: new FormControl(),
                autocomplete: AutoCompleteType.off,
            });

            expect(model.autocomplete).toEqual(AutoCompleteType.off);
        });

        it('autocomplete should be set another type.', () => {
            const model = new TextFieldModel({
                control: new FormControl(),
                autocomplete: AutoCompleteType.country,
            });

            expect(model.autocomplete).toEqual(AutoCompleteType.country);
        });
    });

    describe('autofocus.', () => {
        it('should set autofocus = true.', () => {
            const model = new TextFieldModel({
                control: new FormControl(),
                autofocus: true,
            });

            expect(model.autofocus).toBeTrue();
        });

        it('should set autofocus = false.', () => {
            const model = new TextFieldModel({
                control: new FormControl(),
                autofocus: false,
            });

            expect(model.autofocus).toBeFalse();
        });

        it('focusable should be false by default.', () => {
            const model = new TextFieldModel({
                control: new FormControl(),
            });

            expect(model.autofocus).toBeFalse();
        });
    });

    describe('prefix.', () => {
        it('should use empty string for missing prefix.', () => {
            const field = new TextFieldModel({
                control: new FormControl(),
                format: TextFormat.number,
            });

            expect(field.prefix).toBe('');
        });

        it('should use provided prefix.', () => {
            const field = new TextFieldModel({
                control: new FormControl(),
                format: TextFormat.number,
                prefix: 'R$',
            });

            expect(field.prefix).toBe('R$');
        });
    });

    describe('suffix.', () => {
        it('should use empty string for missing suffix.', () => {
            const field = new TextFieldModel({
                control: new FormControl(),
                format: TextFormat.number,
            });

            expect(field.suffix).toBe('');
        });

        it('should use provided  suffix.', () => {
            const field = new TextFieldModel({
                control: new FormControl(),
                format: TextFormat.number,
                suffix: '%',
            });

            expect(field.suffix).toBe('%');
        });
    });

    describe('mask.', () => {
        it('should default to null mask and format if none provided.', () => {
            const field = new TextFieldModel({ control: new FormControl() });

            expect(field.mask).toBeUndefined();
            expect(field.format).toBeUndefined();
        });

        it('should set  mask and format if provided.', () => {
            const field = new TextFieldModel({
                control: new FormControl(),
                mask: TextMask.cnpj,
            });

            expect(field.mask).toEqual(TextMask.cnpj);
        });
    });

    describe('minLength.', () => {
        it('should correctly set minLength.', () => {
            const model = new TextFieldModel({
                control: new FormControl(),
                minLength: 2,
            });

            expect(model.minLength).toBe(2);
        });

        it('minLength should be undefined by default.', () => {
            const model = new TextFieldModel({ control: new FormControl() });

            expect(model.minLength).toBeUndefined();
        });
    });

    describe('maxLength.', () => {
        it('should correctly set maxLength.', () => {
            const model = new TextFieldModel({
                control: new FormControl(),
                maxLength: 2,
            });

            expect(model.maxLength).toBe(2);
        });

        it('maxLength should be undefined by default.', () => {
            const model = new TextFieldModel({ control: new FormControl() });

            expect(model.maxLength).toBeUndefined();
        });
    });
});

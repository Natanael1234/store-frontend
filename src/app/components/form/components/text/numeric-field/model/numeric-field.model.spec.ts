import { FormControl } from '@angular/forms';
import { AutoCompleteType } from '../../../../enums/auto-complete-type/auto-complete-type.enum';
import { FormElementType } from '../../../../enums/form-element-type/form-element-type.enum';
import { TextFormat } from '../../../../enums/text-format/text-format.enum';
import { NumericFieldModel } from './numeric-field.model';

describe('NumericFieldModel.', () => {
    it('should create a text input with default type and format.', () => {
        const model = new NumericFieldModel({
            control: new FormControl(),
            placeholder: 'Digite algo',
        });

        expect(model).toBeDefined();
        expect(model.type).toBe(FormElementType.text);
        expect(model.placeholder).toBe('Digite algo');
        expect(model.format).toBe(TextFormat.number);
    });

    describe('format.', () => {
        it('should have number text format.', () => {
            const model = new NumericFieldModel({
                control: new FormControl(),
            });

            expect(model.format).toEqual(TextFormat.number);
        });
    });

    describe('inputMode.', () => {
        it('inputMode should be undefined.', () => {
            const input = new NumericFieldModel({ control: new FormControl() });

            expect(input.inputMode).toBeUndefined();
        });
    });

    describe('readOnly.', () => {
        it('should set readOnly = false by default.', () => {
            const model = new NumericFieldModel({
                control: new FormControl(),
                readOnly: false,
            });

            expect(model.readOnly).toEqual(false);
        });

        it('readOnly should be set true.', () => {
            const input = new NumericFieldModel({
                control: new FormControl(),
                readOnly: true,
            });

            expect(input.readOnly).toBeTrue();
        });

        it('readOnly should be set false.', () => {
            const input = new NumericFieldModel({
                control: new FormControl(),
                readOnly: false,
            });

            expect(input.readOnly).toBeFalse();
        });
    });

    describe('autocomplete.', () => {
        it('should set autocomplete = off by default.', () => {
            const model = new NumericFieldModel({ control: new FormControl() });

            expect(model.autocomplete).toEqual(AutoCompleteType.off);
        });

        it('autocomplete should be set on.', () => {
            const model = new NumericFieldModel({
                control: new FormControl(),
                autocomplete: AutoCompleteType.on,
            });

            expect(model.autocomplete).toEqual(AutoCompleteType.on);
        });

        it('autocomplete should be set off.', () => {
            const model = new NumericFieldModel({
                control: new FormControl(),
                autocomplete: AutoCompleteType.off,
            });

            expect(model.autocomplete).toEqual(AutoCompleteType.off);
        });
    });

    describe('focusable.', () => {
        it('should set focusable = true.', () => {
            const model = new NumericFieldModel({
                control: new FormControl(),
                focusable: true,
            });

            expect(model.focusable).toBeTrue();
        });

        it('should set focusable = false.', () => {
            const model = new NumericFieldModel({
                control: new FormControl(),
                focusable: false,
            });

            expect(model.focusable).toBeFalse();
        });

        it('focusable should be true by default.', () => {
            const model = new NumericFieldModel({
                control: new FormControl(),
            });

            expect(model.focusable).toBeTrue();
        });
    });

    describe('autofocus.', () => {
        it('should set autofocus = true.', () => {
            const model = new NumericFieldModel({
                control: new FormControl(),
                autofocus: true,
            });

            expect(model.autofocus).toBeTrue();
        });

        it('should set autofocus = false.', () => {
            const model = new NumericFieldModel({
                control: new FormControl(),
                autofocus: false,
            });

            expect(model.autofocus).toBeFalse();
        });

        it('focusable should be false by default.', () => {
            const model = new NumericFieldModel({
                control: new FormControl(),
            });

            expect(model.autofocus).toBeFalse();
        });
    });

    describe('placeholder.', () => {
        it('should set placeholder.', () => {
            const model = new NumericFieldModel({
                control: new FormControl(),
                placeholder: 'Placeholder',
            });

            expect(model.placeholder).toEqual('Placeholder');
        });

        it('placeholder should beundefined by default.', () => {
            const model = new NumericFieldModel({ control: new FormControl() });

            expect(model.placeholder).toEqual(undefined);
        });
    });

    describe('minLength.', () => {
        it('should correctly set minLength.', () => {
            const model = new NumericFieldModel({
                control: new FormControl(),
                minLength: 2,
            });

            expect(model.minLength).toBe(2);
        });

        it('minLength should be undefined by default.', () => {
            const model = new NumericFieldModel({ control: new FormControl() });

            expect(model.minLength).toBeUndefined();
        });
    });

    describe('maxLength.', () => {
        it('should correctly set maxLength.', () => {
            const model = new NumericFieldModel({
                control: new FormControl(),
                maxLength: 2,
            });

            expect(model.maxLength).toBe(2);
        });

        it('maxLength should be undefined by default.', () => {
            const model = new NumericFieldModel({ control: new FormControl() });

            expect(model.maxLength).toBeUndefined();
        });
    });

    describe('min.', () => {
        it('should correctly set min.', () => {
            const model = new NumericFieldModel({
                control: new FormControl(),
                min: 2,
            });

            expect(model.min).toBe(2);
        });

        it('min should be undefined by default.', () => {
            const model = new NumericFieldModel({ control: new FormControl() });

            expect(model.min).toBeUndefined();
        });
    });

    describe('max.', () => {
        it('should correctly set max.', () => {
            const model = new NumericFieldModel({
                control: new FormControl(),
                max: 4,
            });

            expect(model.max).toBe(4);
        });

        it('max should be undefined by default.', () => {
            const model = new NumericFieldModel({ control: new FormControl() });

            expect(model.decimalPlaces).toBeUndefined();
        });
    });

    describe('leadZero.', () => {
        it('should correctly set leadZero = true.', () => {
            const model = new NumericFieldModel({
                control: new FormControl(),
                leadZero: true,
            });

            expect(model.leadZero).toBeTrue();
        });

        it('should correctly set leadZero = false.', () => {
            const model = new NumericFieldModel({
                control: new FormControl(),
                leadZero: false,
            });

            expect(model.leadZero).toBeFalse();
        });

        it('leadZero should be false by default.', () => {
            const model = new NumericFieldModel({ control: new FormControl() });

            expect(model.leadZero).toBeFalse();
        });
    });

    describe('decimalPlaces.', () => {
        it('should correctly set decimalPlaces.', () => {
            const model = new NumericFieldModel({
                control: new FormControl(),
                decimalPlaces: 2,
            });

            expect(model.decimalPlaces).toBe(2);
        });

        it('decimalPlaces should be undefined by default.', () => {
            const model = new NumericFieldModel({ control: new FormControl() });

            expect(model.decimalPlaces).toBeUndefined();
        });
    });

    describe('allowNegativeNumbers.', () => {
        it('should set allowNegativeNumbers = true.', () => {
            const model = new NumericFieldModel({
                control: new FormControl(),
                allowNegativeNumbers: true,
            });

            expect(model.allowNegativeNumbers).toBe(true);
        });

        it('allowNegativeNumbers should be true by default.', () => {
            const model = new NumericFieldModel({ control: new FormControl() });

            expect(model.allowNegativeNumbers).toBe(true);
        });

        it('should set allowNegativeNumbers = false.', () => {
            const model = new NumericFieldModel({
                control: new FormControl(),
                allowNegativeNumbers: false,
            });

            expect(model.allowNegativeNumbers).toBe(false);
        });
    });

    describe('prefix.', () => {
        it('should use empty string for missing prefix/suffix.', () => {
            const model = new NumericFieldModel({ control: new FormControl() });

            expect(model.prefix).toBe('');
            expect(model.suffix).toBe('');
        });

        it('should use provided prefix and suffix.', () => {
            const input = new NumericFieldModel({
                control: new FormControl(),
                prefix: 'R$',
                suffix: '%',
            });

            expect(input.prefix).toBe('R$');
            expect(input.suffix).toBe('%');
        });
    });

    describe('mask.', () => {
        it('mask should be undefined.', () => {
            const model = new NumericFieldModel({ control: new FormControl() });

            expect(model.mask).toBeUndefined();
        });
    });
});

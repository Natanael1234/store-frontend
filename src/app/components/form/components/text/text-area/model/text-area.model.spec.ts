import { FormControl } from '@angular/forms';
import { AutoCompleteType } from '../../../../enums/auto-complete-type/auto-complete-type.enum';
import { FormElementType } from '../../../../enums/form-element-type/form-element-type.enum';
import { InputMode } from '../../../../enums/input-mode/input-mode.enum';
import { TextAreaModel } from './text-area.model';

describe('TextAreaModel.', () => {
    it('should create an instance with default properties.', () => {
        const textArea = new TextAreaModel({
            control: new FormControl(''),
        });

        expect(textArea).toBeTruthy();
        expect(textArea instanceof TextAreaModel).toBeTrue();
        expect(textArea.type).toEqual(FormElementType.textArea);
        expect(textArea.format).toBeUndefined();
        expect(textArea.mask).toBeUndefined();
        expect(textArea.focusable).toBeTrue();
        expect(textArea.autofocus).toBeFalse();
        expect(textArea.readOnly).toBeFalse();
        expect(textArea.inputMode).toEqual(InputMode.text);
        expect(textArea.placeholder).toBeUndefined();
        expect(textArea.minLength).toBeUndefined();
        expect(textArea.maxLength).toBeUndefined();
        expect(textArea.autosizeMinRows).toBeUndefined();
        expect(textArea.autosizeMaxRows).toBeUndefined();
        expect(textArea.onBlur).toBeUndefined();
        expect(textArea.control).toBeInstanceOf(FormControl);
    });

    it('should accept optional properties.', () => {
        const onBlurFn = jasmine.createSpy('onBlur');
        const control = new FormControl('teste');

        const textArea = new TextAreaModel({
            control,
            placeholder: 'Digite seu texto',
            focusable: false,
            autofocus: true,
            readOnly: true,
            minLength: 10,
            maxLength: 100,
            autosizeMinRows: 2,
            autosizeMaxRows: 5,
            inputMode: InputMode.email,
            onBlur: onBlurFn,
            id: 'txt-1',
            label: 'Descrição',
        } as any); // "as any" se maxLength não estiver definido no tipo

        expect(textArea.placeholder).toEqual('Digite seu texto');
        expect(textArea.focusable).toEqual(false);
        expect(textArea.autofocus).toBeTrue();
        expect(textArea.readOnly).toEqual(true);
        expect(textArea.inputMode).toEqual(InputMode.email);
        expect(textArea.maxLength).toEqual(100);
        expect(textArea.autosizeMinRows).toEqual(2);
        expect(textArea.autosizeMaxRows).toEqual(5);
        expect(textArea.inputMode).toEqual(InputMode.email);
        expect(textArea.onBlur).toEqual(onBlurFn);
        expect(textArea.id).toEqual('txt-1');
        expect(textArea.label).toEqual('Descrição');
    });

    describe('autocomplete.', () => {
        it('should set autocomplete = off by default.', () => {
            const model = new TextAreaModel({ control: new FormControl() });

            expect(model.autocomplete).toEqual(AutoCompleteType.off);
        });

        it('autocomplete should be set on.', () => {
            const model = new TextAreaModel({
                control: new FormControl(),
                autocomplete: AutoCompleteType.on,
            });

            expect(model.autocomplete).toEqual(AutoCompleteType.on);
        });

        it('autocomplete should be set off.', () => {
            const model = new TextAreaModel({
                control: new FormControl(),
                autocomplete: AutoCompleteType.off,
            });

            expect(model.autocomplete).toEqual(AutoCompleteType.off);
        });
    });
});

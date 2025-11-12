import { FormControl } from '@angular/forms';
import { FormElementType } from '../../../../enums/form-element-type/form-element-type.enum';
import { InputMode } from '../../../../enums/input-mode/input-mode.enum';
import { TextAreaModel } from './text-area.model';

describe('TextAreaModel', () => {
    it('should create an instance with default properties', () => {
        const textArea = new TextAreaModel({
            control: new FormControl(''),
        });

        expect(textArea).toBeTruthy();
        expect(textArea instanceof TextAreaModel).toBeTrue();
        expect(textArea.type).toBe(FormElementType.textArea);
        expect(textArea.format).toBeNull();
        expect(textArea.mask).toBeNull();
        expect(textArea.placeholder).toBeNull();
        expect(textArea.minLength).toBeUndefined();
        expect(textArea.maxLength).toBeUndefined();
        expect(textArea.inputMode).toBeNull();
        expect(textArea.onBlur).toBeUndefined();
        expect(textArea.control).toBeInstanceOf(FormControl);
    });

    it('should accept optional properties', () => {
        const onBlurFn = jasmine.createSpy('onBlur');
        const control = new FormControl('teste');

        const textArea = new TextAreaModel({
            control,
            placeholder: 'Digite seu texto',
            minLength: 10,
            maxLength: 100,
            inputMode: InputMode.text,
            onBlur: onBlurFn,
            id: 'txt-1',
            label: 'Descrição',
        } as any); // "as any" se maxLength não estiver definido no tipo

        expect(textArea.placeholder).toBe('Digite seu texto');
        expect(textArea.minLength).toBe(10);
        expect(textArea.maxLength).toBe(100);
        expect(textArea.inputMode).toBe(InputMode.text);
        expect(textArea.onBlur).toBe(onBlurFn);
        expect(textArea.id).toBe('txt-1');
        expect(textArea.label).toBe('Descrição');
    });
});

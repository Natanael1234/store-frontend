import { ButtonStyle } from '../../../enums/button-style/button-style.enum';
import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { ButtonFormElement } from './button-form-element.model';

describe('ButtonFormElement', () => {
    it('should initialize with default values', () => {
        const element = new ButtonFormElement({});

        expect(element.type).toBe(FormElementType.button);
        expect(element.icon).toBeUndefined();
        expect(element.label).toBe('');
        expect(element.disabled).toBeFalse();
        expect(element.style).toBe(ButtonStyle.text);
        expect(element.clickCallback).toBeUndefined();
        expect(element.breakLine).toBeFalse();
    });

    it('should apply the given options correctly', () => {
        const element = new ButtonFormElement({
            id: 'submit-btn',
            icon: 'send',
            label: 'Enviar',
            disabled: true,
            style: ButtonStyle.filled,
            colSize: 6,
            colOffset: 3,
            breakLine: true,
        });

        expect(element.id).toBe('submit-btn');
        expect(element.icon).toBe('send');
        expect(element.label).toBe('Enviar');
        expect(element.disabled).toBeTrue();
        expect(element.style).toBe(ButtonStyle.filled);
        expect(element.colSize).toBe(6);
        expect(element.colOffset).toBe(3);
        expect(element.breakLine).toBeTrue();
    });

    it('should call the callback on click', () => {
        const callback = jasmine.createSpy('clickCallback');
        const element = new ButtonFormElement({
            label: 'Salvar',
            clickCallback: callback,
        });
        const mockEvent = new MouseEvent('click');
        element.clickCallback?.(mockEvent);

        expect(callback).toHaveBeenCalledOnceWith(mockEvent);
    });

    it('should use default ButtonStyle.text style if not given', () => {
        const element = new ButtonFormElement({
            label: 'Testar',
        });

        expect(element.style).toBe(ButtonStyle.text);
    });
});

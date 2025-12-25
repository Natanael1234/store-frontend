import { Icon } from '../../../../../enums/icons/icons.enum';
import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { ButtonStyle } from '../enum/button-style.enum';
import { ButtonModel } from './button.model';

describe('ButtonModel.', () => {
    it('should initialize with default values.', () => {
        const element = new ButtonModel({});

        expect(element.type).toBe(FormElementType.button);
        expect(element.icon).toBeUndefined();
        expect(element.label).toBe('');
        expect(element.style).toBe(ButtonStyle.text);
        expect(element.clickCallback).toBeUndefined();
        expect(element.autofocus).toBeFalse();
        expect(element.breakLine).toBeFalse();
    });

    it('should apply the given options correctly.', () => {
        const element = new ButtonModel({
            id: 'submit-btn',
            icon: Icon.send,
            label: 'Enviar',
            style: ButtonStyle.filled,
            colSize: 6,
            colOffset: 3,
            autofocus: true,
            breakLine: true,
        });

        expect(element.id).toBe('submit-btn');
        expect(element.icon).toBe(Icon.send);
        expect(element.label).toBe('Enviar');
        expect(element.style).toBe(ButtonStyle.filled);
        expect(element.colSize).toBe(6);
        expect(element.colOffset).toBe(3);
        expect(element.autofocus).toBeTrue();
        expect(element.breakLine).toBeTrue();
    });

    it('should call the callback on click.', () => {
        const callback = jasmine.createSpy('clickCallback');
        const element = new ButtonModel({
            label: 'Salvar',
            clickCallback: callback,
        });
        const mockEvent = new MouseEvent('click');
        element.clickCallback?.(mockEvent);

        expect(callback).toHaveBeenCalledOnceWith(mockEvent);
    });

    it('should use default ButtonStyle.text style if not given.', () => {
        const element = new ButtonModel({
            label: 'Testar',
        });

        expect(element.style).toBe(ButtonStyle.text);
    });
});

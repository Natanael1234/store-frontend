import { ButtonStyle } from '../../../enums/button-style/button-style.enum';
import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { ButtonFormElement } from './button.model';

describe('ButtonFormElement', () => {
    it('should create an instance with required properties', () => {
        const button = new ButtonFormElement({
            icon: 'save',
            label: 'Salvar',
        });

        expect(button).toBeInstanceOf(ButtonFormElement);
        expect(button.icon).toBe('save');
        expect(button.label).toBe('Salvar');
        expect(button.disabled).toBe(false); // valor padrão
        expect(button.style).toBe(ButtonStyle.flat); // valor padrão
        expect(button.type).toBe(FormElementType.button);
    });

    it('should set optional properties if provided', () => {
        const button = new ButtonFormElement({
            icon: 'delete',
            label: 'Excluir',
            disabled: true,
            style: ButtonStyle.elevated,
            id: 'btn-1',
        });

        expect(button.icon).toBe('delete');
        expect(button.label).toBe('Excluir');
        expect(button.disabled).toBe(true);
        expect(button.style).toBe(ButtonStyle.elevated);
        expect(button.id).toBe('btn-1');
    });

    // TODO: test click callback

    // it('should throw TypeScript error if required properties are missing', () => {
    //     // @ts-expect-error: icon is required
    //     const missingIcon: ButtonFormElementOptions = {
    //         label: 'Salvar',
    //     };

    //     // @ts-expect-error: label is required
    //     const missingLabel: ButtonFormElementOptions = {
    //         icon: 'save',
    //     };
    // });
});

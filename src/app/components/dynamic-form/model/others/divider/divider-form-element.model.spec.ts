import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { DividerFormElement } from './divider.-form-elementmodel';

describe('DividerFormElement', () => {
    it('should create an instance', () => {
        const divider = new DividerFormElement({ id: 'divider-1' });
        expect(divider).toBeInstanceOf(DividerFormElement);
    });

    it('should have the type FormElementType.divider', () => {
        const element = new DividerFormElement({});

        expect(element.type).toBe(FormElementType.divider);
    });

    it('should inherit properties from AbstractFormElement', () => {
        const element = new DividerFormElement({
            id: 'divider-1',
            colSize: 12,
            colOffset: 1,
            breakLine: true,
        });

        expect(element.id).toBe('divider-1');
        expect(element.colSize).toBe(12);
        expect(element.colOffset).toBe(1);
        expect(element.breakLine).toBeTrue();
    });

    it('should set breakLine to false by default', () => {
        const element = new DividerFormElement({});
        expect(element.breakLine).toBeFalse();
    });
});

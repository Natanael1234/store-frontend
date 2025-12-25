import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { DividerModel } from './divider.-form-elementmodel';

describe('DividerModel.', () => {
    it('should create an instance.', () => {
        const divider = new DividerModel({ id: 'divider-1' });
        expect(divider).toBeInstanceOf(DividerModel);
    });

    it('should have the type FormElementType.divider.', () => {
        const element = new DividerModel({});

        expect(element.type).toBe(FormElementType.divider);
    });

    it('should inherit properties from AbstractFormElement.', () => {
        const element = new DividerModel({
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

    it('should set breakLine to false by default.', () => {
        const element = new DividerModel({});
        expect(element.breakLine).toBeFalse();
    });
});

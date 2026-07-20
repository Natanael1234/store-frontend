import { FormElementType } from '../../enums/form-element-type/form-element-type.enum';
import { SpacerModel } from './spacer.model';

describe('SpacerModel.', () => {
    it('should create an instance.', () => {
        const spacer = new SpacerModel({ id: 'spacer-1' });
        expect(spacer).toBeInstanceOf(SpacerModel);
    });

    it('should have the type FormElementType.spacer.', () => {
        const element = new SpacerModel({});

        expect(element.type).toBe(FormElementType.spacer);
    });

    it('should inherit properties from AbstractFormElement.', () => {
        const element = new SpacerModel({ id: 'spacer-1', colSize: 12 });

        expect(element.id).toBe('spacer-1');
        expect(element.colSize).toBe(12);
    });
});

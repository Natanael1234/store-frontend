import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { LabelModel } from './label-form-element.model';

describe('LabelModel.', () => {
    it('should have the type FormElementType.label.', () => {
        const element = new LabelModel({ value: 'Nome' });
        expect(element.type).toBe(FormElementType.label);
    });

    it('should initialize the value correctly.', () => {
        const element = new LabelModel({ value: 'E-mail' });
        expect(element.value).toBe('E-mail');
    });

    it('should inherit the properties of AbstractFormElement.', () => {
        const element = new LabelModel({
            id: 'label-1',
            colSize: 6,
            value: 'Telefone',
        });

        expect(element.id).toBe('label-1');
        expect(element.colSize).toBe(6);
    });
});

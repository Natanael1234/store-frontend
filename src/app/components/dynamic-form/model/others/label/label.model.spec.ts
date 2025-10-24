import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { LabelFormElement } from './label.model';

describe('LabelFormElement', () => {
    it('should create an instance with value', () => {
        const label = new LabelFormElement({ id: 'lbl-1', value: 'Nome' });

        expect(label).toBeInstanceOf(LabelFormElement);
        expect(label.value).toBe('Nome');
        expect(label.type).toBe(FormElementType.label);
        expect(label.id).toBe('lbl-1');
    });

    it('should create an instance without id', () => {
        const label = new LabelFormElement({ value: 'Email' });

        expect(label.value).toBe('Email');
        expect(label.id).toBeUndefined();
        expect(label.type).toBe(FormElementType.label);
    });

    it('should fail if value is missing (TypeScript)', () => {
        // @ts-expect-error: value is required
        const labelMissingValue = new LabelFormElement({ id: 'lbl-2' });
    });
});

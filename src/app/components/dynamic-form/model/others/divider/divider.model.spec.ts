import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { DividerFormElement } from './divider.model';

describe('DividerFormElement', () => {
    it('should create an instance', () => {
        const divider = new DividerFormElement({ id: 'divider-1' });
        expect(divider).toBeInstanceOf(DividerFormElement);
    });

    it('should have the correct type', () => {
        const divider = new DividerFormElement({ id: 'divider-1' });
        expect(divider.type).toBe(FormElementType.divider);
    });

    it('should set the id if provided', () => {
        const divider = new DividerFormElement({ id: 'divider-1' });
        expect(divider.id).toBe('divider-1');
    });

    it('should have undefined id if not provided', () => {
        const divider = new DividerFormElement({});
        expect(divider.id).toBeUndefined();
    });
});

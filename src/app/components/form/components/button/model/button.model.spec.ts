import { Icon } from '../../../../../enums/icons/icons.enum';
import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { QueryParamsHandling } from '../../../enums/query-params-handling/query-params-handling.enum';
import { ButtonStyle } from '../enum/style/button-style.enum';
import { ButtonModel } from './button.model';

describe('ButtonModel.', () => {
    it('should initialize with default values.', () => {
        const model = new ButtonModel({});

        expect(model.type).toEqual(FormElementType.button);
        expect(model.id).toBeUndefined();
        expect(model.icon).toBeUndefined();
        expect(model.label).toEqual('');
        expect(model.style).toEqual(ButtonStyle.text);
        expect(model.clickCallback).toBeUndefined();
        expect(model.focusable).toEqual(true);
        expect(model.autofocus).toEqual(false);
        expect(model.colSize).toBeUndefined();
        expect(model.routerLink).toBeUndefined();
        expect(model.queryParams).toBeUndefined();
        expect(model.queryParamsHandling).toBeUndefined();
    });

    it('should apply the given options correctly.', () => {
        const model = new ButtonModel({
            id: 'submit-btn',
            type: FormElementType.submit,
            icon: Icon.send,
            label: 'Send',
            style: ButtonStyle.filled,
            routerLink: '/user',
            queryParams: [{ test: 'param' }],
            queryParamsHandling: 'merge',
            clickCallback: undefined,
            colSize: 6,
            focusable: true,
            autofocus: true,
        });

        expect(model.type).toEqual(FormElementType.submit);
        expect(model.id).toEqual('submit-btn');
        expect(model.icon).toEqual(Icon.send);
        expect(model.label).toEqual('Send');
        expect(model.style).toEqual(ButtonStyle.filled);
        expect(model.clickCallback).toBeUndefined();
        expect(model.focusable).toEqual(true);
        expect(model.autofocus).toEqual(true);
        expect(model.colSize).toEqual(6);
        expect(model.routerLink).toEqual('/user');
        expect(model.queryParams).toEqual([{ test: 'param' }]);
        expect(model.queryParamsHandling).toEqual(QueryParamsHandling.merge);
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

    // TODO: testar parâmetros individualmente
});

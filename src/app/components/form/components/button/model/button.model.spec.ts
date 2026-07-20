import { QueryParamsHandling } from '@angular/router';
import { Icon } from '../../../../../enums/icons/icons.enum';
import { ColSize } from '../../../../../types/col-size.type';
import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { ButtonStyle } from '../enum/style/button-style.enum';
import { ButtonModel } from './button.model';

// TODO: remover
function testButtonModel(options: {
    component: ButtonModel;
    type:
        | FormElementType.button
        | FormElementType.submit
        | FormElementType.reset;
    id?: string;
    icon?: Icon;
    label: string;
    style: ButtonStyle;
    clickCallback?: (event: MouseEvent) => void;
    focusable: boolean;
    autofocus: boolean;
    routerLink: string | string[] | null;
    queryParams: object | null;
    queryParamsHandling: QueryParamsHandling | null;
    colSize: ColSize | undefined;
}) {
    const component = options.component;

    expect(component.type).toEqual(options.type);
    if (options.id) {
        expect(component.id).toEqual(options.id);
    } else {
        expect(component.id).toBeUndefined();
    }
    expect(component.icon).toEqual(options.icon);
    expect(component.label).toEqual(options.label);
    expect(component.style).toEqual(options.style);
    expect(component.clickCallback).toBeUndefined();
    expect(component.focusable).toEqual(options.focusable);
    expect(component.autofocus).toEqual(options.autofocus);
    expect(component.routerLink).toEqual(options.routerLink ?? undefined);
    expect(component.queryParams).toEqual(options.queryParams ?? undefined);
    expect(component.queryParamsHandling).toEqual(
        options.queryParamsHandling ?? undefined,
    );
    expect(component.colSize).toEqual(options.colSize);
}

describe('ButtonModel.', () => {
    it('should initialize with default values.', () => {
        const element = new ButtonModel({});

        testButtonModel({
            component: element,
            type: FormElementType.button,
            id: undefined,
            icon: undefined,
            label: '',
            style: ButtonStyle.text,
            focusable: true,
            autofocus: false,
            colSize: undefined,
            routerLink: null,
            queryParams: null,
            queryParamsHandling: null,
        });
    });

    it('should apply the given options correctly.', () => {
        const element = new ButtonModel({
            id: 'submit-btn',
            type: FormElementType.submit,
            icon: Icon.send,
            label: 'Enviar',
            style: ButtonStyle.filled,
            routerLink: '/user',
            queryParams: [{ test: 'param' }],
            queryParamsHandling: 'merge',
            clickCallback: undefined,
            colSize: 6,
            focusable: true,
            autofocus: true,
        });

        testButtonModel({
            component: element,
            type: FormElementType.submit,
            id: 'submit-btn',
            icon: Icon.send,
            label: 'Enviar',
            style: ButtonStyle.filled,
            routerLink: '/user',
            queryParams: [{ test: 'param' }],
            queryParamsHandling: 'merge',
            clickCallback: undefined,
            colSize: 6,
            focusable: true,
            autofocus: true,
        });
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

    // TODO: testar parâmetros individualmente
});

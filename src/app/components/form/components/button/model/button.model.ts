import { QueryParamsHandling } from '@angular/router';
import { Icon } from '../../../../../enums/icons/icons.enum';
import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import {
    AbstractFormElementModel,
    AbstractFormElementOptions,
} from '../../abstract/abstract-form-element.model';
import { ButtonStyle } from '../enum/style/button-style.enum';

type ButtonFormElementOptions = AbstractFormElementOptions & {
    type?:
        | FormElementType.button
        | FormElementType.submit
        | FormElementType.reset;
    icon?: Icon;
    label?: string;
    style?: ButtonStyle;
    focusable?: boolean;
    autofocus?: boolean;
    clickCallback?: (event: MouseEvent) => void;
    routerLink?: string | string[];
    queryParams?: object;
    queryParamsHandling?: QueryParamsHandling;
    disabled?: boolean;
};

export class ButtonModel extends AbstractFormElementModel {
    public override readonly type:
        | FormElementType.button
        | FormElementType.submit
        | FormElementType.reset;
    public icon?: Icon;
    public label: string;
    public readonly style: ButtonStyle;
    public focusable?: boolean;
    public autofocus?: boolean;

    public clickCallback?: (event: MouseEvent) => void;
    public routerLink?: string | string[];
    public queryParams?: object;
    public queryParamsHandling?: QueryParamsHandling;

    public disabled?: boolean;

    constructor(options: ButtonFormElementOptions) {
        super(options);
        this.type = options.type ?? FormElementType.button;
        this.icon = options.icon;
        this.label = options.label ?? '';
        this.style = options.style ?? ButtonStyle.text;
        this.focusable = options.focusable ?? true;
        this.autofocus = options.autofocus ?? false;
        this.clickCallback = options.clickCallback;
        this.routerLink = options.routerLink;
        this.queryParams = options.queryParams;
        this.queryParamsHandling = options.queryParamsHandling;
        this.disabled = options.disabled ?? false;
    }
}

import { FormElementType } from '../../../../enums/form-element-type/form-element-type.enum';
import { InputMode } from '../../../../enums/input-mode/input-mode.enum';
import { TextFormat } from '../../../../enums/text-format/text-format.enum';
import { TextMask } from '../../../../enums/text-mask/text-mask.enum';
import {
    InputFormControlModel,
    InputFormControlOptions,
} from '../../model/input.model';

export type TextFieldOptions = InputFormControlOptions & {
    format?: TextFormat;
    mask?: TextMask;
    prefix?: string;
    suffix?: string;
};

export class TextFieldModel extends InputFormControlModel {
    public override readonly type:
        | FormElementType.text
        | FormElementType.password = FormElementType.text;
    public override readonly format?: TextFormat;
    public override readonly mask?: TextMask;
    public readonly prefix?: string;
    public readonly suffix?: string;

    constructor(options: TextFieldOptions) {
        super(options);
        this.format = options.format;
        this.prefix = (options as any).prefix ?? '';
        this.suffix = (options as any).suffix ?? '';

        switch (options.format) {
            case TextFormat.cnpj:
                this.mask = TextMask.cnpj;
                this.inputMode = InputMode.numeric;
                break;
            case TextFormat.cpf:
                this.mask = TextMask.cpf;
                this.inputMode = InputMode.numeric;
                break;
            case TextFormat.date:
                this.mask = TextMask.date;
                this.inputMode = InputMode.numeric;
                break;
            case TextFormat.email:
                this.mask = TextMask.email;
                this.inputMode = InputMode.email;
                break;
            case TextFormat.url:
                this.inputMode = InputMode.url;
                break;
            case TextFormat.password:
                this.mask = undefined;
                break;
            case TextFormat.phone:
                this.mask = TextMask.phone;
                this.inputMode = InputMode.tel;
                break;
            case TextFormat.time:
                this.mask = TextMask.time;
                this.inputMode = InputMode.numeric;
                break;
            case TextFormat.zipCode:
                this.mask = TextMask.zipCode;
                this.inputMode = InputMode.numeric;
                break;
            default:
                this.format = options.format ?? undefined;
                this.mask = options.mask ?? undefined;
                break;
        }
    }
}

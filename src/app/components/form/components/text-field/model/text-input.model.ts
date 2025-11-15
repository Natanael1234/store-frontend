import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { InputMode } from '../../../enums/input-mode/input-mode.enum';
import { TextFormat } from '../../../enums/text-format/text-format.enum';
import { TextMask } from '../../../enums/text-mask/text-mask.enum';
import { InputFormControlOptions } from '../../abstract/input/model/input-form-control-options.type';
import { InputFormControlModel } from '../../abstract/input/model/input.model';

type NumberInputOptions = InputFormControlOptions & {
    format: TextFormat.number;
    allowNegativeNumbers?: boolean;
    decimalPlaces?: number;
    min: number;
    max: number;
    step: number;
};

type TextInputOptions = InputFormControlOptions & {
    format?: TextFormat;
    mask?: TextMask;
    minLength?: number;
    inputMode?: InputMode.text | InputMode.none;
    prefix?: string;
    suffix?: string;
};

export type InputOptions = TextInputOptions | NumberInputOptions;

export class TextInputModel extends InputFormControlModel {
    public override readonly type:
        | FormElementType.text
        | FormElementType.password = FormElementType.text;
    public override readonly format?: TextFormat;
    public override readonly mask?: TextMask;
    public readonly prefix?: string;
    public readonly suffix?: string;
    // numeric
    public readonly min?: number;
    public readonly max?: number;
    public readonly step?: number;
    public readonly allowNegativeNumbers?: boolean;
    public readonly decimalPlaces?: number;

    constructor(options: InputOptions) {
        super(options);
        this.placeholder = options.placeholder ?? '';
        this.format = options.format;
        this.prefix = (options as any).prefix ?? '';
        this.suffix = (options as any).suffix ?? '';

        switch (options.format) {
            case TextFormat.cnpj:
                this.mask = TextMask.cnpj;
                break;
            case TextFormat.cpf:
                this.mask = TextMask.cpf;
                break;
            case TextFormat.date:
                this.mask = TextMask.date;
                break;
            case TextFormat.email:
                this.mask = TextMask.email;
                break;
            case TextFormat.number:
                this.mask = undefined;
                const numberOptions = options as NumberInputOptions;
                this.min = numberOptions.min;
                this.max = numberOptions.max;
                this.step = numberOptions.step;
                this.allowNegativeNumbers = numberOptions.allowNegativeNumbers;
                this.decimalPlaces = numberOptions.decimalPlaces;
                break;
            case TextFormat.password:
                this.mask = undefined;
                break;
            case TextFormat.phone:
                this.mask = TextMask.phone;
                break;
            case TextFormat.time:
                this.mask = TextMask.time;
                break;
            case TextFormat.zipCode:
                this.mask = TextMask.zipCode;
                break;
            default:
                this.format = options.format ?? undefined;
                this.mask = (options as any)['mask'] ?? undefined;
                break;
        }
    }
}

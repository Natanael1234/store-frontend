import { FormElementType } from '../../../../enums/form-element-type/form-element-type.enum';
import { TextInputFormat } from '../../../../enums/input-mask-type/text-input-format.enum';
import { InputMode } from '../../../../enums/input-mode/input-mode.enum';
import { TextMask } from '../../../../enums/text-mask/text-mask.enum';
import { InputFormControlOptions } from '../input-form-control-options.type';
import { InputFormControl } from '../input.model';

type IntegerInputOptions = InputFormControlOptions & {
    format: TextInputFormat.integer;
    allowNegativeNumbers?: boolean;
    min: number;
    max: number;
};

type FloatInputOptions = InputFormControlOptions & {
    format: TextInputFormat.float;
    allowNegativeNumbers?: boolean;
    min: number;
    max: number;
    decimalPlaces?: number;
};

type TextInputOptions = InputFormControlOptions & {
    format?: TextInputFormat | null;
    mask?: TextMask | null;
    minLength?: number;
    inputMode?: InputMode.text | InputMode.none | null;
    prefix?: string;
    suffix?: string;
    // dropSpecialCharacters?: boolean;
};

export type InputOptions =
    | TextInputOptions
    | IntegerInputOptions
    | FloatInputOptions;

export class TextInput extends InputFormControl {
    public override readonly type:
        | FormElementType.text
        | FormElementType.password = FormElementType.text;
    public override readonly format?: TextInputFormat | null;
    public override readonly mask?: TextMask | null;

    public readonly prefix?: string;
    public readonly suffix?: string;

    // numeric

    public readonly thousandSeparator = '.';
    public readonly decimalMarker = ',';
    public readonly allowNegativeNumbers?: boolean;
    // public readonly dropSpecialCharacters: boolean | null;

    constructor(options: InputOptions) {
        super(options);
        this.placeholder = options.placeholder ?? null;
        this.format = options.format;
        this.placeholder = options.placeholder ?? null;
        this.prefix = this.getPrefix(options);
        this.suffix = this.getSuffix(options);
        // this.dropSpecialCharacters = options.dropSpecialCharacters ?? null;

        switch (options.format) {
            case TextInputFormat.cnpj:
                this.mask = TextMask.cnpj;
                break;
            case TextInputFormat.cpf:
                this.mask = TextMask.cpf;
                break;
            case TextInputFormat.date:
                this.mask = TextMask.date;
                break;
            case TextInputFormat.email:
                this.mask = TextMask.email;
                break;
            case TextInputFormat.integer:
            case TextInputFormat.float:
                this.mask = this.getNumericMask(options);
                this.allowNegativeNumbers =
                    this.getAllowNegativeNumbers(options);
                break;
            case TextInputFormat.password:
                this.mask = null;
                break;
            case TextInputFormat.phone:
                this.mask = TextMask.phone;
                break;
            case TextInputFormat.time:
                this.mask = TextMask.time;
                break;
            case TextInputFormat.zipCode:
                this.mask = TextMask.zipCode;
                break;
            default:
                this.format = options.format ?? null;
                this.mask = options.mask ?? null;
                break;
        }
    }

    private getPrefix(options: InputOptions): string {
        return (options as any).prefix ?? '';
    }

    private getSuffix(options: InputOptions): string {
        return (options as any).suffix ?? '';
    }

    private getAllowNegativeNumbers(options: InputOptions): boolean {
        return (options as any).allowNegativeNumbers ?? true;
    }

    private getNumericMask(options: InputOptions) {
        const decimalPlaces = this.getNormalizedDecimalPlaces(options);
        const mask = `${TextMask.currency}.${decimalPlaces}` as TextMask;
        return mask;
    }

    private getNormalizedDecimalPlaces(options: InputOptions) {
        let decimalPlaces = (options as any).decimalPlaces ?? 0;
        if (!decimalPlaces || decimalPlaces < 0) {
            decimalPlaces = 0;
        }
        return decimalPlaces;
    }
}

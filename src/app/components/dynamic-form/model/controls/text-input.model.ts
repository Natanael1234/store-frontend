import { FormElementType } from '../../enums/dinamic-form-element-type/dinamic-form-element-type.enum';
import { TextInputFormat as TextFormat } from '../../enums/input-mask-type/text-input-format.enum';
import { TextMask } from '../../enums/text-mask/text-mask';
import { InputMode } from '../input-mode.enum';
import { InputFormControl, InputFormControlOptions } from './input.model';

type TextInputOptions = {
    type?: FormElementType;
    format?: TextFormat | null;
    mask?: TextMask | null;
    minLength?: number;
    inputMode?: InputMode.text | InputMode.none | null;
    prefix?: string;
    suffix?: string;
    // dropSpecialCharacters?: boolean;
};

type IntegerInputOptions = TextInputOptions & {
    format: TextFormat.integer;
    allowNegativeNumbers?: boolean;
    // TODO: implement
    min: number;
    max: number;
};
type FloatInputOptions = TextInputOptions & {
    format: TextFormat.float;
    decimalPlaces?: number;
    allowNegativeNumbers?: boolean;
    // TODO: implement
    min: number;
    max: number;
};

type NumberInputOptions = TextInputOptions &
    (FloatInputOptions | IntegerInputOptions);

type InputOptions = InputFormControlOptions &
    (TextInputOptions | NumberInputOptions);

export class TextInput extends InputFormControl {
    public override readonly type = FormElementType.text;
    public override readonly format?: TextFormat | null;
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
        this.prefix = options.prefix ?? '';
        this.suffix = options.suffix ?? '';
        // this.dropSpecialCharacters = options.dropSpecialCharacters ?? null;

        const numericOptions = options as NumberInputOptions;
        switch (options.format) {
            case TextFormat.cnpj:
                this.mask = TextMask.cnpj;
                break;
            case TextFormat.cpf:
                this.mask = TextMask.cpf;
                break;
            case TextFormat.integer:
            case TextFormat.float:
                const floatOptions = numericOptions as FloatInputOptions;
                this.mask = this.getNumericMask(floatOptions);
                this.allowNegativeNumbers =
                    floatOptions.allowNegativeNumbers ?? true;
                break;
            case TextFormat.date:
                this.mask = TextMask.date;
                break;
            case TextFormat.email:
                this.mask = TextMask.email;
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
                this.format = options.format ?? null;
                this.mask = options.mask ?? null;
                break;
        }
        console.log(this.mask);
    }

    private getNumericMask(options: NumberInputOptions) {
        const decimalPlaces = this.getNormalizedDecimalPlaces(options);
        const mask = `${TextMask.currency}.${decimalPlaces}` as TextMask;
        return mask;
    }

    private getNormalizedDecimalPlaces(options: NumberInputOptions) {
        let decimalPlaces = (options as FloatInputOptions).decimalPlaces ?? 0;
        if (!decimalPlaces || decimalPlaces < 0) {
            decimalPlaces = 0;
        }
        return decimalPlaces;
    }
}

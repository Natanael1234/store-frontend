import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { TextFormat } from '../../../enums/text-format/text-format.enum';
import {
    TextFieldModel,
    TextFieldOptions,
} from '../../text-field/model/text-field.model';

type NumericFieldOptions = Omit<
    TextFieldOptions & {
        leadZero?: boolean;
        allowNegativeNumbers?: boolean;
        decimalPlaces?: number;
        min?: number;
        max?: number;
        step?: number;
    },
    'inputMode' | 'mask' | 'format'
>;

export class NumericFieldModel extends TextFieldModel {
    public override readonly type = FormElementType.text;
    public override readonly format = TextFormat.number;
    public override readonly mask = undefined;
    public override readonly inputMode = undefined;

    public readonly min?: number;
    public readonly max?: number;
    public readonly step?: number;
    public readonly leadZero: boolean;
    public readonly allowNegativeNumbers: boolean;
    public readonly decimalPlaces?: number;

    constructor(options: NumericFieldOptions) {
        super(options);
        this.min = options.min;
        this.max = options.max;
        this.step = options.step;
        this.leadZero = options.leadZero ?? false;
        this.allowNegativeNumbers = options.allowNegativeNumbers ?? true;
        this.decimalPlaces = options.decimalPlaces;
    }
}

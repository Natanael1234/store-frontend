import { InputMode } from '../../../../enums/input-mode/input-mode.enum';
import { TextFormat } from '../../../../enums/text-format/text-format.enum';
import { AbstractFormControlModel } from '../../abstract-form-control.model';
import { AbstractFormControlOptions } from '../../abstract-form-control.type';
import { InputFormControlOptions } from './input-form-control-options.type';

export abstract class InputFormControlModel extends AbstractFormControlModel {
    public abstract readonly format?: TextFormat | null;
    public abstract readonly mask?: string | null;
    public minLength?: number;
    public maxLength?: number;
    public placeholder?: string;
    public readonly inputMode?: InputMode | null;
    public onBlur?: () => void;

    // TODO: debounceTime

    constructor(options: InputFormControlOptions) {
        super(options as AbstractFormControlOptions);
        this.minLength = options.minLength;
        this.maxLength = options.maxLength;
        this.placeholder = options.placeholder || undefined;
        this.inputMode = options.inputMode || InputMode.text;
        this.onBlur = options.onBlur;
    }
}

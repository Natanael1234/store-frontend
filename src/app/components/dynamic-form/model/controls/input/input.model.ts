import { TextInputFormat } from '../../../enums/input-mask-type/text-input-format.enum';
import { InputMode } from '../../../enums/input-mode/input-mode.enum';
import { AbstractFormControlOptions } from '../abstract-form-control.type';
import { AbstractFormControl } from './abstract/abstract-form-control.model';
import { InputFormControlOptions } from './input-form-control-options.type';

export abstract class InputFormControl extends AbstractFormControl {
    public abstract readonly format?: TextInputFormat | null;
    public abstract readonly mask?: string | null;
    public minLength?: number;
    public placeholder?: string | null;
    public readonly inputMode?: InputMode | null;
    public onBlur?: () => void;

    // TODO: debounceTime

    constructor(options: InputFormControlOptions) {
        super(options as AbstractFormControlOptions);
        this.minLength = options.maxLength;
        this.placeholder = options.placeholder || null;
        this.inputMode = options.inputMode || null;
        this.onBlur = options.onBlur;
    }
}

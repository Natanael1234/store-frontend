import { TextInputFormat } from '../../enums/input-mask-type/text-input-format.enum';
import { InputMode } from '../input-mode.enum';
import {
    AbstractFormControl,
    AbstractFormControlOptions,
} from './abstract-form-control.model';

export type InputFormControlOptions = AbstractFormControlOptions & {
    maxLength?: number;
    placeholder?: string | null;
    inputMode?: InputMode | null;
};

export abstract class InputFormControl extends AbstractFormControl {
    public abstract readonly format?: TextInputFormat | null;
    public abstract readonly mask?: string | null;
    public minLength?: number;
    public placeholder?: string | null;
    public readonly inputMode?: InputMode | null;

    // TODO: debounceTime

    constructor(options: InputFormControlOptions) {
        super(options as AbstractFormControlOptions);
        this.minLength = options.maxLength;
        this.placeholder = options.placeholder || null;
        this.inputMode = options.inputMode || null;
    }
}

import { AutoCompleteType } from '../../../enums/auto-complete-type/auto-complete-type.enum';
import { InputMode } from '../../../enums/input-mode/input-mode.enum';
import { TextFormat } from '../../../enums/text-format/text-format.enum';
import {
    AbstractFormControlModel,
    AbstractFormControlOptions,
} from '../../abstract/abstract-form-control.model';

export type InputFormControlOptions = AbstractFormControlOptions & {
    minLength?: number;
    maxLength?: number;
    placeholder?: string;
    inputMode?: InputMode;
    autocomplete?: AutoCompleteType;

    onBlur?: () => void;
};

export abstract class InputFormControlModel extends AbstractFormControlModel {
    public abstract readonly format?: TextFormat | null;
    public abstract readonly mask?: string | null;
    public minLength?: number;
    public maxLength?: number;
    public placeholder?: string;
    public inputMode?: InputMode;
    public autocomplete?: AutoCompleteType;
    public onBlur?: () => void;

    constructor(options: InputFormControlOptions) {
        super(options as AbstractFormControlOptions);
        this.minLength = options.minLength;
        this.maxLength = options.maxLength;
        this.placeholder = options.placeholder ?? undefined;
        this.inputMode = options.inputMode ?? InputMode.text;
        this.autocomplete = options.autocomplete ?? AutoCompleteType.off;
        this.onBlur = options.onBlur;
    }
}

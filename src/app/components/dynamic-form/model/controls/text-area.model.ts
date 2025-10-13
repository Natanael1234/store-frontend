import { FormElementType } from '../../enums/dinamic-form-element-type/dinamic-form-element-type.enum';
import { InputMode } from '../input-mode.enum';
import { InputFormControl, InputFormControlOptions } from './input.model';

export type _TextInputOptions = InputFormControlOptions & {
    minLength?: number;
    inputMode?: InputMode.text | InputMode.none | null;
};

export class TextArea extends InputFormControl {
    public override readonly type = FormElementType.textArea;
    public override readonly format = null;
    public override readonly mask? = null;
    public override readonly isInput = false;
    public override readonly isTextArea = true;

    constructor(options: _TextInputOptions) {
        super(options);
        this.placeholder = options.placeholder ?? null;
    }
}

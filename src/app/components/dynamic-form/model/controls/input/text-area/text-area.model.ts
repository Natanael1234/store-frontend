import { FormElementType } from '../../../../enums/form-element-type/form-element-type.enum';
import { InputMode } from '../../../../enums/input-mode/input-mode.enum';
import { InputFormControlOptions } from '../input-form-control-options.type';
import { InputFormControl } from '../input.model';

type TextAreaInputOptions = InputFormControlOptions & {
    minLength?: number;
    inputMode?: InputMode.text | InputMode.none | null;
};

export class TextArea extends InputFormControl {
    public override readonly type = FormElementType.textArea;
    public override readonly format = null;
    public override readonly mask? = null;

    constructor(options: TextAreaInputOptions) {
        super(options);
        this.placeholder = options.placeholder ?? null;
    }
}

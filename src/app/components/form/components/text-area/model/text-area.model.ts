import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { InputMode } from '../../../enums/input-mode/input-mode.enum';
import { InputFormControlOptions } from '../../abstract/input/model/input-form-control-options.type';
import { InputFormControlModel } from '../../abstract/input/model/input.model';

type TextAreaInputOptions = InputFormControlOptions & {
    minLength?: number;
    inputMode?: InputMode.text | InputMode.none | null;
    autosizeMinRows?: number;
    autosizeMaxRows?: number;
};

export class TextAreaModel extends InputFormControlModel {
    public override readonly type = FormElementType.textArea;
    public override readonly format = null;
    public override readonly mask? = null;
    public readonly autosizeMinRows?: number;
    public readonly autosizeMaxRows?: number;

    constructor(options: TextAreaInputOptions) {
        super(options);
        this.placeholder = options.placeholder;

        this.autosizeMinRows = options.autosizeMinRows;
        this.autosizeMaxRows = options.autosizeMaxRows;
    }
}

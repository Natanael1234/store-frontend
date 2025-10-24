import { FormElementType } from '../../../../enums/form-element-type/form-element-type.enum';
import { TextInputFormat } from '../../../../enums/input-mask-type/text-input-format.enum';
import { InputOptions, TextInput } from '../text-input/text-input.model';

type PasswordOptions = InputOptions & {
    visible: boolean;
};

export class PasswordInput extends TextInput {
    public override readonly type = FormElementType.password;
    public override readonly format = TextInputFormat.password;
    public override readonly mask? = null;
    public visible: boolean = true;
    // numeric or text

    constructor(options: PasswordOptions) {
        super(options);
        this.visible = !!options.visible;
    }
}

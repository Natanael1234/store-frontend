import { FormElementType } from '../../../../enums/form-element-type/form-element-type.enum';
import { TextFormat } from '../../../../enums/text-format/text-format.enum';
import { InputOptions, TextInputModel } from '../text-input/text-input.model';

type PasswordOptions = InputOptions & {
    visible?: boolean;
};

export class PasswordInputModel extends TextInputModel {
    public override readonly type = FormElementType.password;
    public override readonly format = TextFormat.password;
    public override readonly mask? = undefined;
    public visible: boolean = false;
    // numeric or text

    constructor(options: PasswordOptions) {
        super(options);
        this.visible = !!(options.visible ?? false);
    }
}

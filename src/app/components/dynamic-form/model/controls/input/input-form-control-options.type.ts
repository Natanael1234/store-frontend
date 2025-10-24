import { InputMode } from '../../../enums/input-mode/input-mode.enum';
import { AbstractFormControlOptions } from '../abstract-form-control.type';

export type InputFormControlOptions = AbstractFormControlOptions & {
    maxLength?: number;
    placeholder?: string | null;
    inputMode?: InputMode | null;
    onBlur?: () => void;
};

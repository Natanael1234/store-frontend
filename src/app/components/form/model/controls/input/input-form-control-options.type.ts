import { InputMode } from '../../../enums/input-mode/input-mode.enum';
import { AbstractFormControlOptions } from '../abstract-form-control.type';

export type InputFormControlOptions = AbstractFormControlOptions & {
    minLength?: number;
    maxLength?: number;
    placeholder?: string;
    inputMode?: InputMode | null;
    onBlur?: () => void;
};

import { AbstractFormControlOptions } from '../abstract-form-control.type';
import { AbstractFormControl } from '../input/abstract/abstract-form-control.model';

export type OptativeElementOptions = AbstractFormControlOptions & {
    value?: string;
    options: { value: string; label: string }[];
};

export abstract class OptativeFormControl extends AbstractFormControl {
    public options: { value: string; label: string }[];

    constructor(options: OptativeElementOptions) {
        super(options);
        this.options = options.options || [];
    }
}

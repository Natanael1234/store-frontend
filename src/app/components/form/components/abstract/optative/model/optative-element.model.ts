import {
    AbstractFormControlModel,
    AbstractFormControlOptions,
} from '../../abstract-form-control.model';

export type OptativeModel = AbstractFormControlOptions & {
    value?: string;
    options: { value: string; label: string }[];
};

export abstract class OptativeFormControl extends AbstractFormControlModel {
    public options: { value: string; label: string }[];

    constructor(options: OptativeModel) {
        super(options);
        this.options = options.options || [];
    }
}

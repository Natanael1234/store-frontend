import { Icon } from '@enums/icons/icons.enum';

// TODO: test
export class ItemIcon {
    public name?: Icon; // TODO: mudar para name
    public tooltip?: string;
    public disabled: boolean;

    constructor(options: {
        name?: Icon;
        tooltip?: string;
        disabled?: boolean;
    }) {
        this.name = options.name;
        this.tooltip = options.tooltip;
        this.disabled = options.disabled || false; // TODO: test false by default
    }
}

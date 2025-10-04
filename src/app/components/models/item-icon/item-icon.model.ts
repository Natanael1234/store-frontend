// TODO: test
export class ItemIcon {
    public icon: string;
    public tooltip?: string;
    public disabled?: boolean;

    constructor(options: {
        icon: string;
        tooltip?: string;
        disabled: boolean;
    }) {
        this.icon = options.icon;
        this.tooltip = options.tooltip;
        this.disabled = options.disabled || false; // TODO: test false by default
    }
}

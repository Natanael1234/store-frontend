export class ItemLabel {
    public text?: string;
    public tooltip?: string;
    public disabled?: boolean;

    constructor(options: {
        text?: string;
        tooltip?: string;
        disabled: boolean;
    }) {
        this.text = options.text;
        this.tooltip = options.tooltip;
        this.disabled = options.disabled;
    }
}

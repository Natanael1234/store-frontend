export class ColumnData {
    icon?: string;
    label?: string;
    tooltip?: string;
    disabled?: boolean;

    constructor(options: {
        icon?: string;
        label?: string;
        tooltip?: string;
        disabled?: boolean;
    }) {
        this.icon = options.icon;
        this.label = options.label;
        this.tooltip = options.tooltip;
        this.disabled = options.disabled || false; // TODO: test false by default
    }
}

import { CommonModule } from '@angular/common';
import { Component, computed, model } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-row-item',
    imports: [CommonModule, MatTooltipModule, MatIconModule, MatTooltipModule],
    styles: `
        #container {
            padding: 1em;
            display: grid;
            grid-template-columns: 1fr;
            &.label.icon {
                gap: 0.5em;
                grid-template-columns: auto 1fr;
            }
            &:not(.label).icon {
                justify-items: center;
            }
        }

        #icon.disabled {
            opacity: 0.05;
        }
    `,
    template: `
        <div
            id="container"
            [class.icon]="_showIcon()"
            [class.label]="_showLabel()"
            [class.disabled]="_disabled()"
            [matTooltip]="tooltip()">
            <!-- icon -->
            @if (_showIcon()) {
                <mat-icon
                    id="icon"
                    [class.skeleton-loader]="loading()"
                    [class.disabled]="_disabled()">
                    {{ _icon() }}
                </mat-icon>
            }

            <!-- label -->
            @if (_showLabel()) {
                <span
                    id="label"
                    [class.skeleton-loader]="loading()"
                    [class.disabled]="_disabled()">
                    {{ _label() }}
                </span>
            }
        </div>
    `,
})
export class RowItemComponent {
    public loading = model<boolean | undefined>(false);
    public disabled = model<boolean | undefined>(false);
    public icon = model<string | undefined>(undefined);
    public label = model<string | undefined>(undefined);
    // public ariaLabel = model<string | undefined>(undefined); // TODO:
    public tooltip = model<string | undefined>(undefined);

    protected _disabled = computed(() => this.loading() || this.disabled());
    protected _showIcon = computed(() => this.icon() !== undefined);
    protected _icon = computed(() => (this.loading() ? '' : this.icon()));
    protected _showLabel = computed(() => this.label() !== undefined);
    protected _label = computed(() => (this.loading() ? '' : this.label()));
}

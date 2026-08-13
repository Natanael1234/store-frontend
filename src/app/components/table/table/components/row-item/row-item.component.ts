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
            [ngClass]="containerClasses()"
            [matTooltip]="toolTip()">
            <!-- icon -->
            @if (showIcon()) {
                <mat-icon id="icon" [ngClass]="iconClasses()">
                    {{ innerIcon() }}
                </mat-icon>
            }

            <!-- label -->
            @if (showLabel()) {
                <span id="label" [ngClass]="labelClasses()">
                    {{ innerLabel() }}
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
    public toolTip = model<string | undefined>(undefined);

    protected innerDisabled = computed(() => this.loading() || this.disabled());

    protected showIcon = computed(() => this.icon() !== undefined);
    protected innerIcon = computed(() => (this.loading() ? '' : this.icon()));

    protected showLabel = computed(() => this.label() !== undefined);
    protected innerLabel = computed(() => (this.loading() ? '' : this.label()));

    protected containerClasses = computed(() => ({
        icon: this.showIcon(),
        label: this.showLabel(),
        disabled: this.innerDisabled(),
    }));

    protected iconClasses = computed(() => ({
        'skeleton-loader': this.loading(),
        disabled: this.innerDisabled(),
    }));

    protected labelClasses = computed(() => ({
        'skeleton-loader': this.loading(),
        disabled: this.innerDisabled(),
    }));
}

import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ItemIcon } from '@components/models/item-icon/item-icon.model';
import { ItemLabel } from '@components/models/item-label/item-label.model';
@Component({
    selector: 'app-list-item',
    imports: [CommonModule, MatIconModule, MatTooltipModule],
    styleUrl: './list-item.component.scss',
    template: `
        <div id="container" [class.loading]="_loading()">
            <div id="left-column">
                @for (label of labels(); track $index) {
                    <div
                        [class.skeleton-loader]="_loading()"
                        [class.disabled]="!!label?.disabled"
                        [matTooltip]="label.tooltip">
                        {{ loading() ? '' : label.text }}
                    </div>
                }
            </div>

            <div id="right-column">
                @for (icon of icons(); track $index) {
                    <mat-icon
                        [class.skeleton-loader]="_loading()"
                        [class.disabled]="!!icon?.disabled"
                        [matTooltip]="icon.tooltip">
                        {{ loading() ? '' : icon?.name }}
                    </mat-icon>
                }
            </div>
        </div>
    `,
})
export class ListItemComponent {
    public labels = model<ItemLabel[]>([]);
    public icons = model<ItemIcon[]>([]);
    public loading = model<boolean>(false);

    public _loading() {
        return !!this.loading();
    }
}

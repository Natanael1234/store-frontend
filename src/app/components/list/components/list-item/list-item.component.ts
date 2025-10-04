import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ItemIcon } from '../../../models/item-icon/item-icon.model';
import { ItemLabel } from '../../../models/item-label/item-label.model';
@Component({
    selector: 'app-list-item',
    imports: [CommonModule, MatIconModule, MatTooltipModule],
    templateUrl: './list-item.component.html',
    styleUrl: './list-item.component.scss',
})
export class ListItemComponent {
    public labels = model<ItemLabel[]>([]);
    public icons = model<ItemIcon[]>([]);
    public loading = model<boolean>(false);
}

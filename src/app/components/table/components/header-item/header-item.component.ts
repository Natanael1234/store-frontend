import { Component, EventEmitter, model, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { toggleSortDirecton } from '@components/table/table-utils/table-utils';
import { SortDirection } from '@enums/direction/direction.enum';
import { Sort } from '@interfaces/sort.interface';
import { leftMouseClickFilter } from '@utils/mouse-events/mouse-click-filter';

@Component({
    selector: 'app-header-item',
    imports: [MatIconModule],
    styles: `
        :host {
            display: flex;
            align-items: center; /* Opcional: alinha verticalmente */
            // justify-content: center; /* Opcional: centraliza o texto */
            // width: 100%;
            height: 55px;
        }

        #container {
            display: flex;
            flex-direction: row;
            gap: 0.3em;
            padding: 1em;
        }

        #label {
            &.disabled {
                opacity: 0.5;
            }
            transition: all 0.4s ease-in-out;
        }

        #arrow {
            margin-left: 0.3em;
            // font-size: 10px;

            $icon-size: 19px;
            font-size: $icon-size;
            height: $icon-size;
            width: $icon-size;

            transform: rotate(0deg);
            opacity: 0;

            &.asc {
                opacity: 1;
                transform: rotate(0deg);
            }
            &.desc {
                opacity: 1;
                transform: rotate(180deg);
            }
            &.hidden {
                opacity: 0;
            }
            transition: all 0.4s ease-in-out;

            &.disabled:not(.hidden) {
                opacity: 0.5;
            }
        }
    `,
    template: `
        <div id="container" (click)="fireOnSelectEvent($event)">
            <span id="label" [class.disabled]="_hasDisabledClass()">
                {{ label() }}
            </span>

            @if (this.isArrowIconVissible()) {
                <mat-icon
                    id="arrow"
                    [class]="_directionClass()"
                    [class.disabled]="_hasDisabledClass()">
                    arrow_downward
                </mat-icon>
            }
        </div>
    `,
})
export class HeaderItemComponent {
    public id = model<string>();
    public label = model<string>('');
    public direction = model<SortDirection>(SortDirection.none);
    public disabled = model<boolean | undefined>(false);
    public sortable = model<boolean | undefined>(true);
    public loading = model<boolean | undefined>(false);

    @Output() public onSelect = new EventEmitter<Sort>();

    protected fireOnSelectEvent(event: MouseEvent) {
        if (this.loading()) return;
        if (!this.sortable()) return;
        if (this.disabled()) return;
        if (!leftMouseClickFilter(event)) return;
        this.toggleDirection();
        const columnId = this.id();
        const direction = this.direction();
        if (columnId === undefined) {
            return;
        } else {
            this.onSelect.emit({ columnId, direction });
        }
    }

    protected toggleDirection() {
        this.direction.update(toggleSortDirecton);
    }

    protected _hasDisabledClass() {
        return this.disabled() || this.loading();
    }

    protected _directionClass() {
        return this.direction() || 'hidden';
    }

    protected isArrowIconVissible() {
        return this.sortable() !== false && this.loading() !== true;
    }
}

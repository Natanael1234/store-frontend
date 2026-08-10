import { CommonModule } from '@angular/common';
import { Component, effect, EventEmitter, model, Output } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ButtonComponent } from '../../../../components/form/components/button/button.component';
import { ButtonAppearance } from '../../../../components/form/components/button/enum/appearance/button-appearance.enum';
import { SelectFieldComponent } from '../../../../components/form/components/select/select-field.component';
import { FormElementType } from '../../../../components/form/enums/form-element-type/form-element-type.enum';
import { ActiveFilterOptions } from '../../../../constants/active-filter-options/active-filter-options';
import { DeletedFilterOptions } from '../../../../constants/deleted-filter-options/deleted-filter-options';
import { ActiveFilter } from '../../../../enums/active-filter/active-filter.enum';
import { DeletedFilter } from '../../../../enums/deleted-filter/deleted-filter.enum';
import { UserOrder } from '../../../../services/user/enums/user-order/user-order.enum';
import { UserOrderOptions } from './order-options/user-order.options';
import { OnUserFilterMenuListCloseEvent } from './types/on-user-filter-menu-list-close-event.type';

@Component({
    selector: 'app-user-filter-toolbar',
    imports: [
        MatMenuModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatDividerModule,
        MatSelectModule,
        MatOptionModule,
        MatChipsModule,
        MatTooltipModule,
        MatDividerModule,
        SelectFieldComponent,
        ButtonComponent,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        MatIconModule,
        MatSelectModule,
    ],
    styles: ['form { padding-left: 0px; padding-right: 0px; }'],
    template: `
        <!-- <button mat-button (click)="vertical.set(!vertical())">Mudar direção</button> -->
        <form class="grid">
            @if (showOrder()) {
                <div [attr.col]="vertical() ? 12 : 2">
                    <app-select-field
                        id="order-select"
                        label="Ordem"
                        [control]="form.controls.order"
                        [options]="UserOrderOptions" />
                </div>
            }

            <div [attr.col]="vertical() ? 12 : 2">
                <app-select-field
                    id="active-select"
                    label="Ativos"
                    [control]="form.controls.active"
                    [options]="ActiveFilterOptions" />
            </div>

            <div [attr.col]="vertical() ? 12 : 2">
                <app-select-field
                    id="deleted-select"
                    label="Deletados"
                    [control]="form.controls.deleted"
                    [options]="DeletedFilterOptions" />
            </div>

            @if (showCancelButton()) {
                <div [attr.col]="vertical() ? 6 : 2">
                    <app-button
                        id="cancel-button"
                        label="Cancelar"
                        [type]="FormElementType.button"
                        [appearance]="ButtonAppearance.filled"
                        (onClick)="cancel()" />
                </div>
            }

            <div [attr.col]="vertical() ? 6 : 2">
                <app-button
                    id="filter-button"
                    label="Filtrar"
                    [type]="FormElementType.button"
                    [appearance]="ButtonAppearance.filled"
                    (onClick)="submit()" />
            </div>
        </form>
    `,
})
export class UserFilterToolbarComponent {
    /**
     * When true shows vertical toolbar.
     * Horizontal toolbar otherwise.
     * Vertical by default.
     */
    public vertical = model<boolean>(true);
    private previousVertical: boolean = true;

    /**
     * When true shows order widget.
     * Hide order widget by default.
     */
    public showOrder = model<boolean>(false);
    private previousShowOrder: boolean = false;

    /**
     * When true shows cancel button.
     * Shows cancel button by default.
     */
    public showCancelButton = model<boolean>(false);
    private previousShowCancelButton: boolean = false;

    /** Column order. */
    public order = model<UserOrder>(UserOrder.name_asc);
    protected previousOrder?: string;
    protected orderOptions = model(UserOrderOptions);

    /** Active users filter. */
    public active = model<ActiveFilter>(ActiveFilter.active);
    protected previousActive?: string;
    protected activeOptions = model(ActiveFilterOptions);

    /** Deleted users filter. */
    public deleted = model<DeletedFilter>(DeletedFilter.not_deleted);
    protected previousDeleted?: string;
    protected deletedOptions = model(DeletedFilterOptions);

    protected form = new FormGroup({
        order: new FormControl({
            value: UserOrder.name_asc,
            disabled: false,
        }),
        active: new FormControl({
            value: ActiveFilter.active,
            disabled: false,
        }),
        deleted: new FormControl({
            value: DeletedFilter.not_deleted,
            disabled: false,
        }),
    });

    /** On close event emitter. */
    @Output() public onClose =
        new EventEmitter<OnUserFilterMenuListCloseEvent>();

    protected FormElementType = FormElementType;
    protected ButtonAppearance = ButtonAppearance;

    protected UserOrderOptions = UserOrderOptions;
    protected ActiveFilterOptions = ActiveFilterOptions;
    protected DeletedFilterOptions = DeletedFilterOptions;

    constructor() {
        effect(() => {
            if (this.showOrder() != this.previousShowOrder) {
                this.previousShowOrder = this.showOrder();
            }
            if (this.order() != this.previousOrder) {
                this.previousOrder = this.order();
                this.form.controls.order.setValue(this.order());
            }
            if (this.active() != this.previousActive) {
                this.previousActive = this.active();
                this.form.controls.active.setValue(this.active());
            }
            if (this.deleted() != this.previousDeleted) {
                this.previousDeleted = this.deleted();
                this.form.controls.deleted.setValue(this.deleted());
            }
            if (this.showCancelButton() != this.previousShowCancelButton) {
                this.previousShowCancelButton = this.showCancelButton();
            }
            if (this.vertical() != this.previousVertical) {
                this.previousVertical = this.vertical();
            }
        });
    }

    protected submit() {
        this.update();
        this.onClose.emit(this.payload);
    }

    protected cancel() {
        this.reset();
        this.onClose.emit(false);
    }

    protected update() {
        this.order.set(this.form.controls.order.value as UserOrder);
        this.active.set(this.form.controls.active.value as ActiveFilter);
        this.deleted.set(this.form.controls.deleted.value as DeletedFilter);
    }

    protected reset() {
        this.form.setValue({
            order: this.order(),
            active: this.active(),
            deleted: this.deleted(),
        });
    }

    protected get payload(): OnUserFilterMenuListCloseEvent {
        return this.form.getRawValue() as unknown as OnUserFilterMenuListCloseEvent;
    }
}

import { Component, effect, EventEmitter, model, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AbstractFormElementModel } from '../../../../components/form/components/abstract/abstract-form-element.model';
import { ButtonStyle } from '../../../../components/form/components/button/enum/button-style.enum';
import { ButtonModel } from '../../../../components/form/components/button/model/button.model';
import { SelectModel } from '../../../../components/form/components/select/model/select-element.model';
import { FormComponent } from '../../../../components/form/form.component';
import { ActiveFilterOptions } from '../../../../constants/active-filter-options/active-filter-options';
import { DeletedFilterOptions } from '../../../../constants/deleted-filter-options/deleted-filter-options';
import { ActiveFilter } from '../../../../enums/active-filter/active-filter.enum';
import { AlignItems } from '../../../../enums/align-items/align-items.enum';
import { DeletedFilter } from '../../../../enums/deleted-filter/deleted-filter.enum';
import { JustifyContent } from '../../../../enums/justify-content/justify-content.enum';
import { UserOrder } from '../../../../services/user/enums/user-order/user-order.enum';
import { UserOrderOptions } from './sort-options/user-sort.options';
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
        FormComponent,
    ],
    templateUrl: './user-filter-toolbar.component.html',
    styleUrl: './user-filter-toolbar.component.scss',
})
export class UserFilterToolbarComponent {
    /**
     * When true shows vertical toolbar.
     * Horizontal toolbar otherwise.
     * Vertical by default.
     */
    public vertical = model<boolean>(true);
    private previousVertical: boolean = true;
    protected justifyContent: JustifyContent = JustifyContent.initial;
    protected alignItems: AlignItems = AlignItems.initial;

    /**
     * When true shows sort widget.
     * Hide sort widget by default.
     */
    public showSort = model<boolean>(false);
    private previousShowSort: boolean = false;

    /**
     * When true shows cancel button.
     * Shows cancel button by default.
     */
    public showCancelButton = model<boolean>(false);
    private previousShowCancelButton: boolean = false;

    /** Column sort. */
    public sort = model<UserOrder>(UserOrder.name_asc);
    protected previousSort?: string;
    protected orderOptions = model(UserOrderOptions);

    /** Active users filter. */
    public active = model<ActiveFilter>(ActiveFilter.active);
    protected previousActive?: string;
    protected activeOptions = model(ActiveFilterOptions);

    /** Deleted users filter. */
    public deleted = model<DeletedFilter>(DeletedFilter.not_deleted);
    protected previousDeleted?: string;
    protected deletedOptions = model(DeletedFilterOptions);

    form = new FormGroup({
        sort: new FormControl({
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

    protected orderControl = new SelectModel({
        id: 'sort-select',
        label: 'Ordem',
        options: UserOrderOptions,
        control: this.form.controls.sort,
        colSize: 12,
    });

    protected activeControl = new SelectModel({
        id: 'active-select',
        label: 'Ativos',
        options: ActiveFilterOptions,
        control: this.form.controls.active,
        colSize: 12,
    });

    protected deletedControl = new SelectModel({
        id: 'deleted-select',
        label: 'Deletados',
        options: DeletedFilterOptions,
        control: this.form.controls.deleted,
        colSize: 12,
    });

    protected cancelButton = new ButtonModel({
        id: 'cancel-button',
        label: 'Cancelar',
        colSize: 5,
        clickCallback: (event: MouseEvent) => this.cancel(),
    });

    protected filterButton = new ButtonModel({
        id: 'filter-button',
        label: 'Filtrar',
        colSize: 5,
        style: ButtonStyle.filled,
        clickCallback: (event: MouseEvent) => this.submit(),
    });

    protected formElements: AbstractFormElementModel[] = [
        this.activeControl,
        this.deletedControl,
        this.filterButton,
    ];

    /** On close event emitter. */
    @Output() public onClose =
        new EventEmitter<OnUserFilterMenuListCloseEvent>();

    constructor() {
        effect(() => {
            if (this.showSort() != this.previousShowSort) {
                this.previousShowSort = this.showSort();
                this.updateOrderControlVisibility();
            }
            if (this.sort() != this.previousSort) {
                this.previousSort = this.sort();
                this.form.controls.sort.setValue(this.sort());
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
                this.updateCancelButtonVisibility();
            }

            if (this.vertical() != this.previousVertical) {
                this.previousVertical = this.vertical();
                this.updateTemplateDirection();
            }
            this.updateTemplateDirection();
        });
    }

    private updateOrderControlVisibility() {
        if (this.showSort()) {
            this.insertFormElement(this.orderControl, 0);
        } else {
            this.removeFormElement(this.orderControl.id!);
        }
    }

    private updateCancelButtonVisibility() {
        if (this.showCancelButton()) {
            this.insertFormElement(this.cancelButton, this.formElements.length);
        } else {
            this.removeFormElement(this.cancelButton.id!);
        }
    }

    private updateTemplateDirection() {
        const vertical = this.vertical();
        this.orderControl.colSize = vertical ? 12 : 2;
        this.activeControl.colSize = vertical ? 12 : 2;
        this.deletedControl.colSize = vertical ? 12 : 2;
        this.filterButton.colSize = vertical ? 5 : 2;
        this.cancelButton.colSize = vertical ? 5 : 2;
        this.justifyContent = vertical
            ? JustifyContent.center
            : JustifyContent.initial;
        this.alignItems = vertical ? AlignItems.initial : AlignItems.center;
    }

    private insertFormElement(element: AbstractFormElementModel, idx: number) {
        this.removeFormElement(element.id!);
        this.formElements.splice(idx, 0, element);
    }

    private removeFormElement(id: string) {
        const idx = this.getElementIdx(id);
        if (idx > -1) {
            this.formElements.splice(idx, 1);
        }
    }

    private getElementIdx(id: string) {
        return this.formElements.findIndex((e) => e.id == id);
    }

    protected submit() {
        this.update();
        this.onClose.emit(this.payload);
    }

    protected cancel() {
        this.reset();
        this.onClose.emit(false);
    }

    protected preventClose(event: Event) {
        event.stopPropagation();
    }

    protected update() {
        this.sort.set(this.form.controls.sort.value as UserOrder);
        this.active.set(this.form.controls.active.value as ActiveFilter);
        this.deleted.set(this.form.controls.deleted.value as DeletedFilter);
    }

    protected reset() {
        this.form.setValue({
            sort: this.sort(),
            active: this.active(),
            deleted: this.deleted(),
        });
    }

    protected get payload(): OnUserFilterMenuListCloseEvent {
        return this.form.getRawValue() as unknown as OnUserFilterMenuListCloseEvent;
    }
}

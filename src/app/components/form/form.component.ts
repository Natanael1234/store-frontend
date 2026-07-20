import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, model, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { AbstractFormElementModel } from './components/abstract/abstract-form-element.model';
import { ButtonComponent } from './components/button/button.component';
import { ButtonModel } from './components/button/model/button.model';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { CheckboxModel } from './components/checkbox/model/checkbox.model';
import { LabelModel } from './components/label/model/label-form-element.model';
import { RadioGroupModel } from './components/radio-group/model/radio-buttons-element.model';
import { RadioGroupComponent } from './components/radio-group/radio-group.component';
import { SelectModel } from './components/select/model/select-element.model';
import { SelectFieldComponent } from './components/select/select-field.component';
import { NumericFieldModel } from './components/text/numeric-field/model/numeric-field.model';
import { NumericFieldComponent } from './components/text/numeric-field/numeric-field.component';
import { TextAreaModel } from './components/text/text-area/model/text-area.model';
import { TextAreaFieldComponent } from './components/text/text-area/text-area.component';
import { TextFieldModel } from './components/text/text-field/model/text-field.model';
import { TextFieldComponent } from './components/text/text-field/text-field.component';
import { FormElementType } from './enums/form-element-type/form-element-type.enum';
import { TextFormat } from './enums/text-format/text-format.enum';

@Component({
    selector: 'app-form',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        TextFieldModule,
        MatSelectModule,
        MatRadioModule,
        MatDividerModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        CommonModule,
        TextFieldComponent,
        NumericFieldComponent,
        ButtonComponent,
        SelectFieldComponent,
        TextAreaFieldComponent,
        CheckboxComponent,
        RadioGroupComponent,
        //  AutofocusDirective,
    ],
    providers: [],
    styles: ``,
    template: `
        <form [class.flex-grid]="true">
            @for (e of elements(); track $index) {
                <!-- col size class -->
                @let colSizeClass = e.colSize ? 'col-' + e.colSize : '';

                @let spacerClass =
                    e.type == FormElementType.spacer ? 'spacer' : '';
                <!-- wraper classes -->
                @let wrapperClasses =
                    ['field-wrapper', colSizeClass, spacerClass];

                <div [class]="wrapperClasses">
                    @switch (e.type) {
                        <!-- TEXT INPUT -->
                        @case (FormElementType.text) {
                            @let textField = castToTextFieldModel(e);
                            @if (textField.format == TextFormat.number) {
                                @let numericField =
                                    castToNumericFieldModel(textField);
                                <app-numeric-field
                                    [id]="numericField.id"
                                    [label]="numericField.label"
                                    [placeholder]="numericField.placeholder"
                                    [control]="numericField.control"
                                    [focusable]="numericField.focusable"
                                    [autofocus]="numericField.autofocus"
                                    [readOnly]="numericField.readOnly"
                                    [minLength]="numericField.minLength"
                                    [maxLength]="numericField.maxLength"
                                    [min]="numericField.min"
                                    [max]="numericField.max"
                                    [step]="numericField.step"
                                    [prefix]="numericField.prefix"
                                    [suffix]="numericField.suffix"
                                    [allowNegativeNumbers]="
                                        numericField.allowNegativeNumbers
                                    "
                                    [decimalPlaces]="numericField.decimalPlaces"
                                    [leadZero]="numericField.leadZero"
                                    (onBlur)="
                                        numericField.onBlur
                                            ? numericField.onBlur()
                                            : false
                                    " />
                            } @else {
                                <app-text-field
                                    [id]="textField.id"
                                    [mask]="textField.mask"
                                    [label]="textField.label"
                                    [placeholder]="textField.placeholder"
                                    [control]="textField.control"
                                    [focusable]="textField.focusable"
                                    [autofocus]="textField.autofocus"
                                    [readOnly]="textField.readOnly"
                                    [autocomplete]="textField.autocomplete"
                                    [format]="textField.format"
                                    [minLength]="textField.minLength"
                                    [maxLength]="textField.maxLength"
                                    [prefix]="textField.prefix"
                                    [suffix]="textField.suffix"
                                    (onBlur)="
                                        textField.onBlur
                                            ? textField.onBlur()
                                            : false
                                    " />
                            }
                        }
                        <!-- TEXT AREA -->
                        @case (FormElementType.textArea) {
                            @let textAreaField = castToTextAreaFieldModel(e);
                            <app-text-area-field
                                [id]="textAreaField.id"
                                [label]="textAreaField.label"
                                [placeholder]="textAreaField.placeholder"
                                [control]="textAreaField.control"
                                [focusable]="textAreaField.focusable"
                                [autofocus]="!!textAreaField.autofocus"
                                [minLength]="textAreaField.minLength"
                                [maxLength]="textAreaField.maxLength"
                                [autosizeMinRows]="
                                    textAreaField.autosizeMinRows
                                "
                                [autosizeMaxRows]="
                                    textAreaField.autosizeMaxRows
                                "
                                (onBlur)="
                                    textAreaField.onBlur
                                        ? textAreaField.onBlur()
                                        : false
                                " />
                        }

                        <!-- SELECT -->
                        @case (FormElementType.select) {
                            @let selectField = castToSelectFieldModel(e);
                            <app-select-field
                                [id]="selectField.id"
                                [label]="selectField.label"
                                [control]="selectField.control"
                                [options]="selectField.options"
                                [autofocus]="selectField.autofocus" />
                        }
                        <!-- RADIO BUTTONS -->
                        @case (FormElementType.radioGroup) {
                            @let radioGroup = castToRadioGroupModel(e);

                            <app-radio-group
                                [id]="radioGroup.id"
                                [label]="radioGroup.label"
                                [control]="radioGroup.control"
                                [options]="radioGroup.options"
                                [focusable]="radioGroup.focusable"
                                [autofocus]="radioGroup.autofocus" />
                        }
                        <!-- CHECKBOX -->
                        @case (FormElementType.checkbox) {
                            @let checkbox = castToCheckboxModel(e);
                            <app-checkbox
                                [id]="checkbox.id"
                                [label]="checkbox.label"
                                [control]="checkbox.control"
                                [focusable]="checkbox.focusable"
                                [autofocus]="checkbox.autofocus" />
                        }
                        <!-- LABEL -->
                        @case (FormElementType.label) {
                            @let label = castToLabelModel(e);
                            <mat-label [id]="label.id" class="app-form-label">
                                {{ label.value }}
                            </mat-label>
                        }
                        <!-- DIVIDER -->
                        @case (FormElementType.divider) {
                            <mat-divider class="app-divider" />
                        }
                        <!-- SPACER -->
                        @case (FormElementType.spacer) {}
                        <!-- BUTTON -->
                        @default {
                            @if (
                                e.type == FormElementType.button ||
                                e.type == FormElementType.submit ||
                                e.type == FormElementType.reset
                            ) {
                                @let button = castToButtonModel(e);
                                <app-button
                                    [id]="button.id"
                                    [type]="button.type"
                                    [icon]="button.icon"
                                    [label]="button.label"
                                    [style]="button.style"
                                    [focusable]="button.focusable"
                                    [autofocus]="button.autofocus"
                                    [routerLink]="button.routerLink"
                                    [queryParams]="button.queryParams"
                                    [queryParamsHandling]="
                                        button.queryParamsHandling
                                    "
                                    (onClick)="
                                        button.clickCallback
                                            ? button.clickCallback($event)
                                            : false
                                    " />
                            }
                        }
                    }
                </div>
            }
        </form>
    `,
})
export class FormComponent {
    public elements = model<AbstractFormElementModel[]>([]);

    protected TextFormat = TextFormat;

    // TODO: é ncessário? remover?
    @ViewChild('autosize') protected autosize!: CdkTextareaAutosize;
    protected FormElementType = FormElementType;

    protected castToTextFieldModel(e: AbstractFormElementModel) {
        return e as unknown as TextFieldModel;
    }

    protected castToNumericFieldModel(e: AbstractFormElementModel) {
        return e as unknown as NumericFieldModel;
    }

    protected castToTextAreaFieldModel(e: AbstractFormElementModel) {
        return e as unknown as TextAreaModel;
    }

    protected castToSelectFieldModel(e: AbstractFormElementModel) {
        return e as unknown as SelectModel;
    }

    protected castToRadioGroupModel(e: AbstractFormElementModel) {
        return e as unknown as RadioGroupModel;
    }

    protected castToCheckboxModel(e: AbstractFormElementModel) {
        return e as unknown as CheckboxModel;
    }

    protected castToLabelModel(e: AbstractFormElementModel) {
        return e as unknown as LabelModel;
    }

    protected castToButtonModel(e: AbstractFormElementModel) {
        return e as unknown as ButtonModel;
    }
}

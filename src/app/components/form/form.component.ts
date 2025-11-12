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
import { AlignItems } from '../../enums/align-items/align-items.enum';
import { JustifyContent } from '../../enums/justify-content/justify-content.enum';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { NumericFieldComponent } from './components/numeric-field/numeric-field.component';
import { RadioGroupComponent } from './components/radio-group/radio-group.component';
import { SelectFieldComponent } from './components/select/select-field.component';
import { TextAreaFieldComponent } from './components/text-area/text-area.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { FormElementType } from './enums/form-element-type/form-element-type.enum';
import { TextFormat } from './enums/text-format/text-format.enum';
import { AbstractFormElementModel } from './model/abstract-form-element.model';
import { TextAreaModel } from './model/controls/input/text-area/text-area.model';
import { TextInputModel } from './model/controls/input/text-input/text-input.model';
import { RadioGroupModel } from './model/controls/optative/radio-group/radio-buttons-element.model';
import { SelectModel } from './model/controls/optative/select/select-element.model';
import { CheckboxModel } from './model/controls/other/checkbox/checkbox.model';
import { ButtonModel } from './model/others/button/button-form-element.model';
import { LabelModel } from './model/others/label/label-form-element.model';

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
    ],
    providers: [],
    templateUrl: './form.component.html',
    styleUrl: './form.component.scss',
})
export class FormComponent {
    protected TextFormat = TextFormat;
    public formElements = model<AbstractFormElementModel[]>([]);

    public justifyContent = model<JustifyContent>(JustifyContent.initial);
    public alignItems = model<AlignItems>(AlignItems.initial);

    @ViewChild('autosize') autosize!: CdkTextareaAutosize;
    FormElementType = FormElementType;

    protected castToTextInput(e: AbstractFormElementModel) {
        return e as unknown as TextInputModel;
    }

    protected castToNumberInput(e: AbstractFormElementModel) {
        return e as unknown as TextInputModel;
    }

    protected castToTextArea(e: AbstractFormElementModel) {
        return e as unknown as TextAreaModel;
    }

    protected castToSelect(e: AbstractFormElementModel) {
        return e as unknown as SelectModel;
    }

    protected castToRadioGroup(e: AbstractFormElementModel) {
        return e as unknown as RadioGroupModel;
    }

    protected castToCheckbox(e: AbstractFormElementModel) {
        return e as unknown as CheckboxModel;
    }

    protected castToLabel(e: AbstractFormElementModel) {
        return e as unknown as LabelModel;
    }

    protected castToButton(e: AbstractFormElementModel) {
        return e as unknown as ButtonModel;
    }
}

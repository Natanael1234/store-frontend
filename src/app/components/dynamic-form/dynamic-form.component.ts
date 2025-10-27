import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, model, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { provideNgxMask } from 'ngx-mask';
import { AlignItems } from '../../enums/align-items/align-items.enum';
import { JustifyContent } from '../../enums/justify-content/justify-content.enum';
import { DynamicButtonComponent } from './components/dynamic-button/dynamic-button.component';
import { DynamicSelectCheckbox } from './components/dynamic-checkbox/dynamic-checkbox.component';
import { DynamicRadioButtonsComponent } from './components/dynamic-radio-buttons/dynamic-radio-buttons.component';
import { DynamicSelectFieldComponent } from './components/dynamic-select/dynamic-select-field.component';
import { DynamicTextAreaFieldComponent } from './components/dynamic-text-area-field/dynamic-text-area-field.component';
import { DynamicTextFieldComponent } from './components/dynamic-text-field/dynamic-text-field.component';
import { FormElementType } from './enums/form-element-type/form-element-type.enum';
import { AbstractFormElement } from './model/abstract-form-element.model';
import { InputFormControl } from './model/controls/input/input.model';
import { TextArea } from './model/controls/input/text-area/text-area.model';
import { TextInput } from './model/controls/input/text-input/text-input.model';
import { RadioButtons } from './model/controls/optative/radio-buttons/radio-buttons-element.model';
import { Select } from './model/controls/optative/select/select-element.model';
import { CheckboxElement } from './model/controls/other/checkbox/checkbox.model';
import { ButtonFormElement } from './model/others/button/button-form-element.model';
import { LabelFormElement } from './model/others/label/label-form-element.model';

@Component({
    selector: 'app-dynamic-form',
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
        DynamicTextFieldComponent,
        DynamicButtonComponent,
        DynamicSelectFieldComponent,
        DynamicTextAreaFieldComponent,
        DynamicSelectCheckbox,
        DynamicRadioButtonsComponent,
    ],
    providers: [provideNgxMask()],
    templateUrl: './dynamic-form.component.html',
    styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent {
    public formElements = model<AbstractFormElement[]>([]);

    public justifyContent = model<JustifyContent>(JustifyContent.initial);
    public alignItems = model<AlignItems>(AlignItems.initial);

    @ViewChild('autosize') autosize!: CdkTextareaAutosize;
    FormElementType = FormElementType;

    protected getFormat(e: AbstractFormElement) {
        return (e as any)['format'];
    }

    protected castToFormControl(e: AbstractFormElement) {
        return e as unknown as FormControl;
    }

    protected castToInput(e: AbstractFormElement) {
        return e as unknown as InputFormControl;
    }

    protected castToTextInput(e: AbstractFormElement) {
        return e as unknown as TextInput;
    }

    protected castToTextArea(e: AbstractFormElement) {
        return e as unknown as TextArea;
    }

    protected castToSelect(e: AbstractFormElement) {
        return e as unknown as Select;
    }

    protected castToRadioButtons(e: AbstractFormElement) {
        return e as unknown as RadioButtons;
    }

    protected castToCheckbox(e: AbstractFormElement) {
        return e as unknown as CheckboxElement;
    }

    protected castToLabel(e: AbstractFormElement) {
        return e as unknown as LabelFormElement;
    }

    protected castToButton(e: AbstractFormElement) {
        return e as unknown as ButtonFormElement;
    }
}

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
import { TextAreaComponent } from './components/text/text-area/text-area.component';
import { TextFieldModel } from './components/text/text-field/model/text-field.model';
import { TextFieldComponent } from './components/text/text-field/text-field.component';
import { AutofocusDirective } from './directives/autofocus/autofocus.directive';
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
        TextAreaComponent,
        CheckboxComponent,
        RadioGroupComponent,
        AutofocusDirective,
    ],
    providers: [],
    templateUrl: './form.component.html',
    styleUrl: './form.component.scss',
})
export class FormComponent {
    public elements = model<AbstractFormElementModel[]>([]);
    public justifyContent = model<JustifyContent>(JustifyContent.initial);
    public alignItems = model<AlignItems>(AlignItems.initial);

    protected TextFormat = TextFormat;

    // TODO: é ncessário? remover?
    @ViewChild('autosize') protected autosize!: CdkTextareaAutosize;
    FormElementType = FormElementType;

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

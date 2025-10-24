import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { FormElementType } from '../../enums/form-element-type/form-element-type.enum';
import { TextInputFormat } from '../../enums/input-mask-type/text-input-format.enum';
import { RadioButtons } from '../../model/controls/optative/radio-buttons/radio-buttons-element.model';
import { isRequired } from '../is-required-checker';

@Component({
    selector: 'app-dynamic-radio-buttons',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatRadioModule,
        MatFormFieldModule,
    ],
    templateUrl: './dynamic-radio-buttons.component.html',
    styleUrl: './dynamic-radio-buttons.component.scss',
})
export class DynamicRadioButtonsComponent {
    @Input() radioButtons?: RadioButtons;

    FormElementType = FormElementType;
    TextInputFormat = TextInputFormat;

    protected isRequired(e?: RadioButtons) {
        return isRequired(e);
    }
}

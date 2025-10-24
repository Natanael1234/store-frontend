import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, Input as checkbox } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormElementType } from '../../enums/form-element-type/form-element-type.enum';
import { CheckboxElement } from '../../model/controls/other/checkbox/checkbox.model';
import { isRequired } from '../is-required-checker';

@Component({
    selector: 'app-dynamic-checkbox',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        TextFieldModule,
        CommonModule,
        MatIconModule,
        MatCheckboxModule,
    ],
    templateUrl: './dynamic-checkbox.component.html',
    styleUrl: './dynamic-checkbox.component.scss',
})
export class DynamicSelectCheckbox {
    @checkbox() checkbox?: CheckboxElement;

    FormElementType = FormElementType;

    protected isRequired(e?: CheckboxElement): boolean {
        return isRequired(e);
    }
}

import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormElementType } from '../../enums/form-element-type/form-element-type.enum';
import { TextInputFormat } from '../../enums/input-mask-type/text-input-format.enum';
import { TextArea } from '../../model/controls/input/text-area/text-area.model';

@Component({
    selector: 'app-dynamic-text-area-field',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        TextFieldModule,
        CommonModule,
        MatIconModule,
    ],
    templateUrl: './dynamic-text-area-field.component.html',
    styleUrl: './dynamic-text-area-field.component.scss',
})
export class DynamicTextAreaFieldComponent {
    @Input() textArea?: TextArea;

    FormElementType = FormElementType;
    TextInputFormat = TextInputFormat;

    protected getStep(e?: TextArea) {
        return (e as any)['step'] ?? null;
    }

    protected getMinLength(e?: TextArea) {
        return (e as any)['maxLength'] ?? null;
    }

    protected getMaxLength(input?: TextArea) {
        return (input as any)['maxLength'] ?? null;
    }

    protected getError(e: TextArea) {
        return (e as any)['error'] ?? ''; // TODO: funcionando?
    }
}

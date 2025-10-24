import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective } from 'ngx-mask';
import { FormElementType } from '../../enums/form-element-type/form-element-type.enum';
import { TextInputFormat } from '../../enums/input-mask-type/text-input-format.enum';
import { TextInput } from '../../model/controls/input/text-input/text-input.model';

@Component({
    selector: 'app-dynamic-text-field',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        TextFieldModule,
        NgxMaskDirective,
        CommonModule,
        MatIconModule,
        MatIconButton,
    ],
    templateUrl: './dynamic-text-field.component.html',
    styleUrl: './dynamic-text-field.component.scss',
})
export class DynamicTextFieldComponent {
    @Input() input?: TextInput;

    FormElementType = FormElementType;
    TextInputFormat = TextInputFormat;

    protected isVisible(e?: TextInput) {
        return !!(e as any) ? ['visible'] : false;
    }

    protected getMin(e?: TextInput) {
        return (e as any)['min'] ?? null;
    }

    protected getMax(e?: TextInput) {
        return (e as any)['max'] ?? null;
    }

    protected getStep(e?: TextInput) {
        return (e as any)['step'] ?? null;
    }

    protected getMinLength(e?: TextInput) {
        return (e as any)['maxLength'] ?? null;
    }

    protected getMaxLength(input?: TextInput) {
        return (input as any)['maxLength'] ?? null;
    }

    protected getThousandSeparator(input?: TextInput) {
        return (input as any)['thousandSeparator'];
    }
    protected getDecimalMarker(e?: TextInput) {
        return (e as any)['decimalMarker'];
    }
    protected getAllowNegativeNumbers(input?: TextInput) {
        return (input as any)['allowNegativeNumbers'];
    }

    protected toggleVisibility(input?: TextInput) {
        (input as any)['visible'] = !(input as any)['visible'];
    }

    protected getError(e: TextInput) {
        return (e as any)['error'] ?? ''; // TODO: funcionando?
    }
}

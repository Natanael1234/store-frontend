import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormElementType } from '../../enums/form-element-type/form-element-type.enum';
import { TextInputFormat } from '../../enums/input-mask-type/text-input-format.enum';
import { TextInput } from '../../model/controls/input/text-input/text-input.model';
import { Select } from '../../model/controls/optative/select/select-element.model';

@Component({
    selector: 'app-dynamic-select-field',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        TextFieldModule,
        CommonModule,
        MatIconModule,
        MatSelectModule,
    ],
    templateUrl: './dynamic-select-field.component.html',
    styleUrl: './dynamic-select-field.component.scss',
})
export class DynamicSelectFieldComponent {
    @Input() select?: Select;

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

import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { Component, model, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormElementType } from './enums/form-element-type/form-element-type.enum';
import { AbstractFormElement } from './model/controls/abstract-form-element.model';
import { CheckboxElement } from './model/controls/checkbox.model';
import { InputFormControl } from './model/controls/input.model';
import { Radios } from './model/controls/radio-buttons-element.model';
import { Select } from './model/controls/select-element.model';
import { TextArea } from './model/controls/text-area.model';
import { ButtonFormElement } from './model/others/button.model';
import { DividerFormElement } from './model/others/divider.model';
import { LabelFormElement } from './model/others/label.model';

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
        NgxMaskDirective,
        MatIconModule,
        MatButtonModule,
    ],
    providers: [provideNgxMask()],
    templateUrl: './dynamic-form.component.html',
    styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent {
    public formElements = model<AbstractFormElement[]>([]);
    @ViewChild('autosize') autosize!: CdkTextareaAutosize;

    protected type = FormElementType;

    protected getFormat(e: AbstractFormElement) {
        return (e as any)['format'];
    }

    protected getTextLabel(e: AbstractFormElement) {
        return (e as any)['label'];
    }

    protected isRequired(e: AbstractFormElement): boolean {
        if (!e) return false;
        const control = (e as any)['control'] as FormControl;
        if (!control) return false;
        if (!control.validator) return false;
        const validator = control.validator({} as any);
        if (!validator) return false;
        return validator && validator['required'] === true;
    }

    protected getTabIndex(e: AbstractFormElement) {
        return (e as any)['focusable'] ? 0 : -1;
    }

    protected getMin(e: AbstractFormElement) {
        return (e as any)['min'] ?? null;
    }

    protected getMax(e: AbstractFormElement) {
        return (e as any)['max'] ?? null;
    }

    protected getStep(e: AbstractFormElement) {
        return (e as any)['step'] ?? null;
    }

    protected getMask(e: AbstractFormElement) {
        return (e as any)['mask'] ?? null;
    }

    protected getMinLength(e: AbstractFormElement) {
        return (e as any)['maxLength'] ?? null;
    }

    protected getMaxLength(e: AbstractFormElement) {
        return (e as any)['maxLength'] ?? null;
    }

    protected getThousandSeparator(e: AbstractFormElement) {
        return (e as any)['thousandSeparator'];
    }
    protected getDecimalMarker(e: AbstractFormElement) {
        return (e as any)['decimalMarker'];
    }
    protected getAllowNegativeNumbers(e: AbstractFormElement) {
        return (e as any)['allowNegativeNumbers'];
    }
    protected getPrefix(e: AbstractFormElement) {
        return (e as any)['prefix'] ?? '';
    }

    protected getSuffix(e: AbstractFormElement) {
        return (e as any)['suffix'] ?? ' ';
    }

    protected getErrorMessage(e: AbstractFormElement) {
        const error = this.getError(e);
        if (error) {
            const message = error();
            return message;
        }
    }

    protected getError(e: AbstractFormElement) {
        return (e as any)['error'] ?? '';
    }

    protected castToFormControl(e: AbstractFormElement) {
        return e as unknown as FormControl;
    }

    protected castToInput(e: AbstractFormElement) {
        return e as unknown as InputFormControl;
    }

    protected castToSelect(e: AbstractFormElement) {
        return e as unknown as Select;
    }

    protected castToRadios(e: AbstractFormElement) {
        return e as unknown as Radios;
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

    protected isDivider(e: AbstractFormElement) {
        return e instanceof DividerFormElement;
    }

    protected isLabel(e: AbstractFormElement) {
        return e instanceof LabelFormElement;
    }

    protected isRadioButtons(e: AbstractFormElement) {
        return e instanceof Radios;
    }

    protected isSelect(e: AbstractFormElement) {
        return e instanceof Select;
    }

    protected isTextArea(e: AbstractFormElement) {
        return e instanceof TextArea;
    }

    // protected isRangeable(e: AbstractFormElement) {
    //     return (
    //         e instanceof FormElementType.date ||
    //         e instanceof FormElementType.month ||
    //         e instanceof FormElementType.week ||
    //         e instanceof FormElementType.time ||
    //         e instanceof FormElementType.dateTimeLocal ||
    //         e instanceof FormElementType.number ||
    //         e instanceof FormElementType.range
    //     );
    // }
}

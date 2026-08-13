import { ComponentHarness } from '@angular/cdk/testing';
import {
    MatErrorHarness,
    MatFormFieldHarness,
} from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { AutoCompleteType } from '@components/form/enums/auto-complete-type/auto-complete-type.enum';

type NumericFieldState = {
    id: string;
    type: string;
    value: string;
    label: string | null;
    placeholder: string;
    isFocusable: boolean;
    isFocused: boolean;
    isReadOnly: boolean;
    autocomplete: AutoCompleteType;
    minLength: number | null;
    maxLength: number | null;
    min: number | null;
    max: number | null;
    step: number | null;
    prefix: string;
    suffix: string;
    errors: string[];
    hasValidStructure: boolean | { [key: string]: string };
};
export class NumericFieldHarness extends ComponentHarness {
    static hostSelector = 'app-numeric-field';

    /** Harnesses filhos */

    private fieldHarness = this.locatorFor(MatFormFieldHarness);
    private labelHarness = this.locatorFor(MatFormFieldHarness);
    private inputHarness = this.locatorFor(MatInputHarness);
    private errorHarness = this.locatorForOptional(MatErrorHarness);

    private fieldHarnesses = this.locatorForAll(MatFormFieldHarness);
    private labelHarnessess = this.locatorForAll(MatFormFieldHarness);
    private inputHarnesses = this.locatorForAll(MatInputHarness);
    private errorHarnesses = this.locatorForAll(MatErrorHarness);

    private fieldElement = this.locatorFor('mat-form-field');
    private labelElement = this.locatorFor('mat-label');
    private prefixElement = this.locatorForOptional('[matTextPrefix]');
    private inputElement = this.locatorFor('input');
    private suffixElement = this.locatorForOptional('[matTextSuffix]');
    private errorElement = this.locatorForOptional('mat-error');

    private fieldElements = this.locatorForAll('mat-form-field');
    private labelElements = this.locatorForAll('mat-label');
    private prefixElements = this.locatorForAll('[matTextPrefix]');
    private inputElements = this.locatorForAll('input');
    private suffixElements = this.locatorForAll('[matTextSuffix]');
    private errorElements = this.locatorForAll('mat-error');
    private iconElements = this.locatorForAll('mat-icon');
    private buttonElements = this.locatorForAll('button');

    private hostChildrenElements = this.locatorForAll(':scope > *');

    // -----------------------------
    // Métodos utilitários públicos
    // -----------------------------

    async getInputHarness() {
        return await this.inputHarness();
    }

    async getInputsHarnesses() {
        return await this.inputHarnesses();
    }

    async getHostChildrenCount() {
        return (await this.hostChildrenElements()).length;
    }

    async getLabelCount() {
        return (await this.labelHarnessess()).length;
    }

    async getInputCount() {
        return (await this.inputElements()).length;
    }

    async getButtonCount() {
        return (await this.buttonElements()).length;
    }

    async getIconCount() {
        return (await this.iconElements()).length;
    }

    async getPrefixCount() {
        return (await this.prefixElements()).length;
    }

    async getSuffixCount() {
        return (await this.suffixElements()).length;
    }

    async getErrorCount() {
        return (await this.errorHarnesses()).length;
    }

    async isHostChildAField() {
        const hostChildren = await this.hostChildrenElements();
        if (hostChildren.length < 1) return false;
        const tagName = await hostChildren[0].getProperty('tagName');
        return tagName == 'MAT-FORM-FIELD';
    }

    async getLabel() {
        const field = await this.fieldHarness();
        const label = await field.hasLabel();
        return label;
    }

    async getErrors() {
        const field = await this.fieldHarness();
        const errors = await field.getErrors();
        return errors;
    }

    async getFieldAppearance() {
        const field = await this.fieldHarness();
        const appearance = await field.getAppearance();
        return appearance;
    }

    async getLabelText(): Promise<string | null> {
        const field = await this.fieldHarness();
        const label = await field.getLabel();
        return label;
    }

    async getInputPlaceholder(): Promise<string> {
        const input = await this.inputHarness();
        const placeholder = await input.getPlaceholder();
        return placeholder;
    }

    async getInputType() {
        const input = await this.inputHarness();
        const type = await input.getType();
        return type;
    }

    async getInputValue(): Promise<string> {
        const input = await this.inputHarness();
        const value = await input.getValue();
        return value;
    }

    async setInputValue(value: string): Promise<void> {
        const input = await this.inputHarness();
        await input.setValue(value);
    }

    async getInputTabIndex() {
        const input = await this.inputHarness();
        const host = await input.host();
        return await host.getAttribute('tabindex');
    }

    async getAutocomplete(): Promise<AutoCompleteType> {
        const input = await this.inputHarness();
        const host = await input.host();
        return host.getAttribute('autocomplete') as Promise<AutoCompleteType>;
    }

    async isInputFocused(): Promise<boolean> {
        const input = await this.inputHarness();
        const focused = input.isFocused();
        return focused;
    }

    async isInputReadOnly() {
        const input = await this.inputHarness();
        return await input.isReadonly();
    }

    async isInputDisabled(): Promise<boolean> {
        const input = await this.inputHarness();
        const isDisabled = input.isDisabled();
        return isDisabled;
    }

    async blurInput(): Promise<void> {
        const input = await this.inputHarness();
        await input.blur();
    }

    async focusInput(): Promise<void> {
        const input = await this.inputHarness();
        await input.focus();
    }

    async isFocusable(): Promise<boolean> {
        const input = await this.inputHarness();
        const host = await input.host();
        const tabIndex = await host.getAttribute('tabindex');
        return tabIndex != '-1';
    }

    async getInputId(): Promise<string> {
        const input = await this.inputHarness();
        const host = await input.host();
        const id = await host.getAttribute('id');
        return id ?? '';
    }

    async getInputMinLength() {
        const input = await this.inputHarness();
        const host = await input?.host();
        const minLength = await host?.getAttribute('minlength');
        return minLength ?? null;
    }

    async getInputMaxLength() {
        const input = await this.inputHarness();
        const host = await input?.host();
        const minLength = await host?.getAttribute('maxLength');
        return minLength ?? null;
    }

    async getInputMin() {
        const input = await this.inputHarness();
        const host = await input?.host();
        const min = await host?.getAttribute('min');
        return min ?? null;
    }

    async getInputMax() {
        const input = await this.inputHarness();
        const host = await input?.host();
        const max = await host?.getAttribute('max');
        return max ?? null;
    }

    async getInputStep() {
        const input = await this.inputHarness();
        const host = await input?.host();
        const step = await host?.getAttribute('step');
        return step ?? null;
    }

    // -----------------------------z
    // Prefix/Suffix
    // -----------------------------

    async getPrefixText() {
        const field = await this.fieldHarness();
        return await field.getPrefixText();
    }

    async getSuffixText() {
        const field = await this.fieldHarness();
        return await field.getSuffixText();
    }

    async hasValidStructure() {
        const errors: any = {};

        const hasValidChildrenCount = (await this.getHostChildrenCount()) == 1;
        if (!hasValidChildrenCount) {
            errors['hasValidChildrenCount'] =
                `Invalid children count: ${hasValidChildrenCount}.`;
        }

        const isHostChildAField = await this.isHostChildAField();
        if (!isHostChildAField) {
            errors['isHostChildAField'] =
                `Host child is not a field ${isHostChildAField}.`;
        }

        const appearance = await this.getFieldAppearance();
        const hasValidAppearance = appearance == 'outline'; // TODO: create a enum
        if (!hasValidAppearance) {
            errors['hasValidAppearance'] =
                `Has invalid field appearance: "${appearance}".`;
        }

        const labelCount = await this.getLabelCount();
        const hasValidLabelCount = labelCount == 1;
        if (!hasValidLabelCount) {
            errors['hasValidLabelCount'] =
                `Has invalid number of label elements ${labelCount}.`;
        }

        const prefixCount = await this.getPrefixCount();
        const hasValidPrefixCount = prefixCount <= 1;
        if (!hasValidPrefixCount) {
            errors['hasValidPrefixCount'] =
                `Has invalid number of prefix elements ${prefixCount}.`;
        }

        const inputCount = await this.getInputCount();
        const hasValidInputCount = inputCount == 1;
        if (!hasValidInputCount) {
            errors['hasValidInputCount'] =
                `Has invalid number of input elements : ${inputCount}.`;
        }

        const suffixCount = await this.getSuffixCount();
        const hasValidSuffixCount = suffixCount <= 1;
        if (!hasValidSuffixCount) {
            errors[`hasValidSuffixCount`] =
                `Has invalid number of suffix elements: ${suffixCount}.`;
        }

        const buttonCount = await this.getButtonCount();
        const hasValidButtonCount = buttonCount == 0;
        if (!hasValidButtonCount) {
            errors['hasValidButtonCount'] =
                `Has invalid number of button elements ${buttonCount}.`;
        }

        const iconCount = await this.getIconCount();
        const validIconCount = iconCount == 0;
        if (!validIconCount) {
            errors['hasNoIcons'] =
                `Has invalid number of icon elements ${iconCount}.`;
        }

        const errorCount = await this.getErrorCount();
        const hasValidErrorCount = errorCount <= 1;
        if (!hasValidErrorCount) {
            errors['hasValidErrorCount'] =
                `Has invalid number of error elements ${errorCount}.`;
        }

        return Object.keys(errors).length == 0 ? true : errors;
    }

    async getState(): Promise<NumericFieldState> {
        const id = await this.getInputId()!;
        const type = await this.getInputType();
        const value = await this.getInputValue();
        const label = await this.getLabelText();
        const placeholder = await this.getInputPlaceholder();
        const isFocusable = await this.isFocusable();
        const isFocused = await this.isInputFocused();
        const isReadOnly = await this.isInputReadOnly();
        const autocomplete = await this.getAutocomplete();
        const _minLength = await this.getInputMinLength();
        const minLength = _minLength != null ? Number(_minLength) : null;
        let _maxLength = await this.getInputMaxLength();
        const maxLength = _maxLength != null ? Number(_maxLength) : null;
        const _min = await this.getInputMin();
        const min = _min != null ? Number(_min) : null;
        let _max = await this.getInputMax();
        const max = _max != null ? Number(_max) : null;
        let _step = await this.getInputStep();
        const step = _step != null ? Number(_step) : null;
        const prefix = await this.getPrefixText();
        const suffix = await this.getSuffixText();
        const _errors = await this.getErrors();
        const errors: string[] = [];
        for (const _error of _errors) {
            errors.push(await _error.getText());
        }
        const hasValidStructure = await this.hasValidStructure();

        const state = {
            id,
            type,
            value,
            label,
            placeholder,
            isFocusable,
            isFocused,
            isReadOnly,
            autocomplete,
            minLength,
            maxLength,
            min,
            max,
            step,
            prefix,
            suffix,
            errors,
            hasValidStructure,
        };
        return state;
    }
}

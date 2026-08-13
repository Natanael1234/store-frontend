import { ComponentHarness } from '@angular/cdk/testing';
import {
    MatErrorHarness,
    MatFormFieldHarness,
} from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { AutoCompleteType } from '@components/form/enums/auto-complete-type/auto-complete-type.enum';
import { InputMode } from '@components/form/enums/input-mode/input-mode.enum';

type TextFieldState = {
    id: string;
    /** input type (text) */
    type: string;
    value: string;
    label: string | null;
    inputmode: InputMode | null;
    placeholder: string;
    isFocusable: boolean;
    isFocused: boolean;
    isReadOnly: boolean;
    autocomplete: AutoCompleteType;
    minLength: number | null;
    maxLength: number | null;
    prefix: string;
    suffix: string;
    errors: string[];
    hasValidStructure: boolean | { [key: string]: string };
};
export class TextFieldHarness extends ComponentHarness {
    static hostSelector = 'app-text-field';

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

    private hostChildrenElements = this.locatorForAll(':scope > *');

    // -----------------------------
    // Métodos utilitários públicos
    // -----------------------------

    async getInputHarness() {
        return await this.inputHarness();
    }

    async getHostTagName() {
        const hostEl = await this.host();
        return await hostEl.getProperty('tagName');
    }

    async getInputsHarnesses() {
        return await this.inputHarnesses();
    }

    async getChildCount() {
        return (await this.hostChildrenElements()).length;
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

    async getPrefixCount() {
        return (await this.prefixElements()).length;
    }

    async getSuffixCount() {
        return (await this.suffixElements()).length;
    }

    async getErrorCount() {
        return (await this.errorHarnesses()).length;
    }

    async getErrorHanerness() {
        return this.errorHarness();
    }

    async getErrorMessage() {
        const errorHarness = await this.getErrorHanerness();
        const message = errorHarness?.getText();
        return message;
    }

    async isHostChildAField() {
        const hostChildren = await this.hostChildrenElements();
        if (hostChildren.length < 1) return false;
        const tagName = await hostChildren[0].getProperty('tagName');
        return tagName == 'MAT-FORM-FIELD';
    }

    async isChildAField() {
        const hostChildren = await this.hostChildrenElements();
        if (hostChildren.length < 1) return false;
        const tagName = await hostChildren[0].getProperty('tagName');
        return tagName == 'MAT-FORM-FIELD';
    }

    async getErrors() {
        const field = await this.fieldHarness();
        return await field.getErrors();
    }

    async getFieldAppearance() {
        const field = await this.fieldHarness();
        return await field.getAppearance();
    }

    async getLabelText(): Promise<string | null> {
        const field = await this.fieldHarness();
        return field.getLabel();
    }

    async getInputPlaceholder(): Promise<string> {
        const input = await this.inputHarness();
        return input.getPlaceholder();
    }

    async getInputType() {
        const input = await this.inputHarness();
        return input.getType();
    }

    async getInputMode() {
        const input = await this.inputElement();
        const str = await input.getAttribute('inputmode');
        const inputmode = str == 'null' ? null : str;
        return inputmode as InputMode | null;
    }

    async getInputValue(): Promise<string> {
        const input = await this.inputHarness();
        return input.getValue();
    }

    async setInputValue(value: string): Promise<void> {
        const input = await this.inputHarness();
        await input.setValue(value);
        await input.blur();
    }

    async getInputTabIndex() {
        const input = await this.inputHarness();

        const host = await input.host();
        return host.getAttribute('tabindex');
    }

    async isInputReadOnly(): Promise<boolean> {
        const input = await this.inputHarness();
        return input.isReadonly();
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

    async isInputDisabled(): Promise<boolean> {
        const input = await this.inputHarness();
        return input.isDisabled();
    }

    async blurInput(): Promise<void> {
        const input = await this.inputHarness();
        await input.blur();
    }

    async focusInput(): Promise<void> {
        const input = await this.inputHarness();
        await input.focus();
    }

    async isInputFocusable(): Promise<boolean> {
        const input = await this.inputHarness();
        const host = await input.host();
        const tabIndex = await host.getAttribute('tabindex');
        return tabIndex != '-1';
    }

    async getInputId(): Promise<string> {
        const input = await this.inputHarness();
        const host = await input.host();
        return (await host.getAttribute('id')) ?? '';
    }

    async getInputMinLength() {
        const input = await this.inputHarness();
        const host = await input?.host();
        const minLength = host?.getAttribute('minlength');
        return minLength ?? null;
    }

    async getInputMaxLength() {
        const input = await this.inputHarness();
        const host = await input?.host();
        const minLength = host?.getAttribute('maxLength');
        return minLength ?? null;
    }

    // -----------------------------
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

    async hasValidStructure(): Promise<boolean | { [key: string]: string }> {
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

        const errorCount = await this.getErrorCount();
        const hasValidErrorCount = errorCount <= 1;
        if (!hasValidErrorCount) {
            errors['hasValidErrorCount'] =
                `Has invalid number of error elements ${errorCount}.`;
        }

        return Object.keys(errors).length == 0 ? true : errors;
    }

    async getState(): Promise<TextFieldState> {
        const id = await this.getInputId()!;
        const type = await this.getInputType();
        const value = await this.getInputValue();
        const label = await this.getLabelText();
        const placeholder = await this.getInputPlaceholder();
        const inputmode = await this.getInputMode();
        const isFocusable = await this.isInputFocusable();
        const isFocused = await this.isInputFocused();
        const isReadOnly = await this.isInputReadOnly();
        const autocomplete = await this.getAutocomplete();
        const _minLength = await this.getInputMinLength();
        const minLength = _minLength != null ? Number(_minLength) : null;
        const _maxLength = await this.getInputMaxLength();
        const maxLength = _maxLength != null ? Number(_maxLength) : null;
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
            inputmode,
            placeholder,
            isFocusable,
            isFocused,
            isReadOnly,
            autocomplete,
            minLength,
            maxLength,
            prefix,
            suffix,
            errors,
            hasValidStructure,
        };
        return state;
    }
}

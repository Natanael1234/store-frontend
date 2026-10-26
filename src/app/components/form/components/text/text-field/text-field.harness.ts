import { ComponentHarness } from '@angular/cdk/testing';
import { MatErrorHarness, MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { AutoCompleteType } from '@components/form/enums/auto-complete-type/auto-complete-type.enum';
import { InputMode } from '@components/form/enums/input-mode/input-mode.enum';

export type TextFieldState = {
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
    public static hostSelector = 'app-text-field';

    /** Harnesses filhos */
    private readonly fieldHarness = this.locatorFor(MatFormFieldHarness);
    private readonly labelHarness = this.locatorFor(MatFormFieldHarness);
    private readonly inputHarness = this.locatorFor(MatInputHarness);
    private readonly errorHarness = this.locatorForOptional(MatErrorHarness);

    private readonly fieldHarnesses = this.locatorForAll(MatFormFieldHarness);
    private readonly labelHarnessess = this.locatorForAll(MatFormFieldHarness);
    private readonly inputHarnesses = this.locatorForAll(MatInputHarness);
    private readonly errorHarnesses = this.locatorForAll(MatErrorHarness);

    private readonly fieldElement = this.locatorFor('mat-form-field');
    private readonly labelElement = this.locatorFor('mat-label');
    private readonly prefixElement = this.locatorForOptional('[matTextPrefix]');
    private readonly inputElement = this.locatorFor('input');
    private readonly suffixElement = this.locatorForOptional('[matTextSuffix]');
    private readonly errorElement = this.locatorForOptional('mat-error');

    private readonly fieldElements = this.locatorForAll('mat-form-field');
    private readonly labelElements = this.locatorForAll('mat-label');
    private readonly prefixElements = this.locatorForAll('[matTextPrefix]');
    private readonly inputElements = this.locatorForAll('input');
    private readonly suffixElements = this.locatorForAll('[matTextSuffix]');
    private readonly errorElements = this.locatorForAll('mat-error');

    private readonly hostChildrenElements = this.locatorForAll(':scope > *');

    // -----------------------------
    // Métodos utilitários públicos
    // -----------------------------

    public async getInputHarness(): Promise<MatInputHarness> {
        return await this.inputHarness();
    }

    public async getHostTagName(): Promise<string> {
        const hostEl = await this.host();
        return (await hostEl.getProperty('tagName')) as string;
    }

    public async getInputsHarnesses(): Promise<MatInputHarness[]> {
        return await this.inputHarnesses();
    }

    public async getChildCount(): Promise<number> {
        return (await this.hostChildrenElements()).length;
    }

    public async getHostChildrenCount(): Promise<number> {
        return (await this.hostChildrenElements()).length;
    }

    public async getLabelCount(): Promise<number> {
        return (await this.labelHarnessess()).length;
    }

    public async getInputCount(): Promise<number> {
        return (await this.inputElements()).length;
    }

    public async getPrefixCount(): Promise<number> {
        return (await this.prefixElements()).length;
    }

    public async getSuffixCount(): Promise<number> {
        return (await this.suffixElements()).length;
    }

    public async getErrorCount(): Promise<number> {
        return (await this.errorHarnesses()).length;
    }

    public async getErrorHanerness(): Promise<MatErrorHarness | null> {
        return await this.errorHarness();
    }

    public async getErrorMessage(): Promise<string | undefined> {
        const errorHarness = await this.getErrorHanerness();
        return errorHarness ? await errorHarness.getText() : undefined;
    }

    public async isHostChildAField(): Promise<boolean> {
        const hostChildren = await this.hostChildrenElements();
        if (hostChildren.length < 1) return false;
        const tagName = await hostChildren[0].getProperty('tagName');
        return tagName === 'MAT-FORM-FIELD';
    }

    public async isChildAField(): Promise<boolean> {
        const hostChildren = await this.hostChildrenElements();
        if (hostChildren.length < 1) return false;
        const tagName = await hostChildren[0].getProperty('tagName');
        return tagName === 'MAT-FORM-FIELD';
    }

    public async getErrors() {
        const field = await this.fieldHarness();
        return await field.getErrors();
    }

    public async getFieldAppearance() {
        const field = await this.fieldHarness();
        return await field.getAppearance();
    }

    public async getLabelText(): Promise<string | null> {
        const field = await this.fieldHarness();
        return await field.getLabel();
    }

    public async getInputPlaceholder(): Promise<string> {
        const input = await this.inputHarness();
        return await input.getPlaceholder();
    }

    public async getInputType(): Promise<string> {
        const input = await this.inputHarness();
        return await input.getType();
    }

    public async getInputMode(): Promise<InputMode | null> {
        const input = await this.inputElement();
        const str = await input.getAttribute('inputmode');
        const inputmode = str === 'null' || !str ? null : str;
        return inputmode as InputMode | null;
    }

    public async getInputValue(): Promise<string> {
        const input = await this.inputHarness();
        return await input.getValue();
    }

    public async setInputValue(value: string): Promise<void> {
        const input = await this.inputHarness();
        await input.setValue(value);
        await input.blur();
    }

    public async getInputTabIndex(): Promise<string | null> {
        const input = await this.inputHarness();
        const host = await input.host();
        return await host.getAttribute('tabindex');
    }

    public async isInputReadOnly(): Promise<boolean> {
        const input = await this.inputHarness();
        return await input.isReadonly();
    }

    public async getAutocomplete(): Promise<AutoCompleteType> {
        const input = await this.inputHarness();
        const host = await input.host();
        return (await host.getAttribute('autocomplete')) as AutoCompleteType;
    }

    public async isInputFocused(): Promise<boolean> {
        const input = await this.inputHarness();
        return await input.isFocused();
    }

    public async isInputDisabled(): Promise<boolean> {
        const input = await this.inputHarness();
        return await input.isDisabled();
    }

    public async blurInput(): Promise<void> {
        const input = await this.inputHarness();
        await input.blur();
    }

    public async focusInput(): Promise<void> {
        const input = await this.inputHarness();
        await input.focus();
    }

    public async isInputFocusable(): Promise<boolean> {
        const input = await this.inputHarness();
        const host = await input.host();
        const tabIndex = await host.getAttribute('tabindex');
        return tabIndex !== '-1';
    }

    public async getInputId(): Promise<string> {
        const input = await this.inputHarness();
        const host = await input.host();
        return (await host.getAttribute('id')) ?? '';
    }

    public async getInputMinLength(): Promise<string | null> {
        const input = await this.inputHarness();
        const host = await input?.host();
        const minLength = await host?.getAttribute('minlength');
        return minLength ?? null;
    }

    public async getInputMaxLength(): Promise<string | null> {
        const input = await this.inputHarness();
        const host = await input?.host();
        const maxLength = await host?.getAttribute('maxlength');
        return maxLength ?? null;
    }

    // -----------------------------
    // Prefix/Suffix
    // -----------------------------

    public async getPrefixText(): Promise<string> {
        const field = await this.fieldHarness();
        return await field.getPrefixText();
    }

    public async getSuffixText(): Promise<string> {
        const field = await this.fieldHarness();
        return await field.getSuffixText();
    }

    public async hasValidStructure(): Promise<boolean | { [key: string]: string }> {
        const errors: { [key: string]: string } = {};

        const hasValidChildrenCount = (await this.getHostChildrenCount()) === 1;
        if (!hasValidChildrenCount) {
            errors['hasValidChildrenCount'] = `Invalid children count: ${hasValidChildrenCount}.`;
        }

        const isHostChildAField = await this.isHostChildAField();
        if (!isHostChildAField) {
            errors['isHostChildAField'] = `Host child is not a field ${isHostChildAField}.`;
        }

        const appearance = await this.getFieldAppearance();
        const hasValidAppearance = appearance === 'outline';
        if (!hasValidAppearance) {
            errors['hasValidAppearance'] = `Has invalid field appearance: "${appearance}".`;
        }

        const labelCount = await this.getLabelCount();
        const hasValidLabelCount = labelCount === 1;
        if (!hasValidLabelCount) {
            errors['hasValidLabelCount'] = `Has invalid number of label elements ${labelCount}.`;
        }

        const prefixCount = await this.getPrefixCount();
        const hasValidPrefixCount = prefixCount <= 1;
        if (!hasValidPrefixCount) {
            errors['hasValidPrefixCount'] = `Has invalid number of prefix elements ${prefixCount}.`;
        }

        const inputCount = await this.getInputCount();
        const hasValidInputCount = inputCount === 1;
        if (!hasValidInputCount) {
            errors['hasValidInputCount'] = `Has invalid number of input elements : ${inputCount}.`;
        }

        const suffixCount = await this.getSuffixCount();
        const hasValidSuffixCount = suffixCount <= 1;
        if (!hasValidSuffixCount) {
            errors['hasValidSuffixCount'] =
                `Has invalid number of suffix elements: ${suffixCount}.`;
        }

        const errorCount = await this.getErrorCount();
        const hasValidErrorCount = errorCount <= 1;
        if (!hasValidErrorCount) {
            errors['hasValidErrorCount'] = `Has invalid number of error elements ${errorCount}.`;
        }

        return Object.keys(errors).length === 0 ? true : errors;
    }

    public async getState(): Promise<TextFieldState> {
        const id = await this.getInputId();
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

        return {
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
    }
}

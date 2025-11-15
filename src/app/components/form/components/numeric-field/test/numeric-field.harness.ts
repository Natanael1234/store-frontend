import { ComponentHarness } from '@angular/cdk/testing';
import {
    MatErrorHarness,
    MatFormFieldHarness,
} from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';

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

    async isHostChildrenAField() {
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

    async isInputRightAligned() {
        const input = await this.inputHarness();
        const host = await input?.host();
        const hasClass = await host?.hasClass('right-aligned');
        return hasClass ?? false;
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
}

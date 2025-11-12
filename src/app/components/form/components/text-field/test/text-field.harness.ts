import { ComponentHarness } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import {
    MatErrorHarness,
    MatFormFieldHarness,
} from '@angular/material/form-field/testing';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';

export class TextFieldHarness extends ComponentHarness {
    static hostSelector = 'app-text-field';

    /** Harnesses filhos */

    private fieldHarness = this.locatorFor(MatFormFieldHarness);
    private labelHarness = this.locatorFor(MatFormFieldHarness);
    private inputHarness = this.locatorFor(MatInputHarness);
    private buttonHarness = this.locatorForOptional(MatButtonHarness);
    private iconHarness = this.locatorForOptional(MatIconHarness);
    private errorHarness = this.locatorForOptional(MatErrorHarness);

    private fieldHarnesses = this.locatorForAll(MatFormFieldHarness);
    private labelHarnessess = this.locatorForAll(MatFormFieldHarness);
    private inputHarnesses = this.locatorForAll(MatInputHarness);
    private iconHarnessess = this.locatorForAll(MatIconHarness);
    private buttonHarnesses = this.locatorForAll(MatButtonHarness);
    private errorHarnesses = this.locatorForAll(MatErrorHarness);

    private fieldElement = this.locatorFor('mat-form-field');
    private labelElement = this.locatorFor('mat-label');
    private prefixElement = this.locatorForOptional('[matTextPrefix]');
    private inputElement = this.locatorFor('input');
    private iconElement = this.locatorForOptional('mat-icon');
    private suffixElement = this.locatorForOptional('[matTextSuffix]');
    private buttonElement = this.locatorForOptional('button');
    private errorElement = this.locatorForOptional('mat-error');

    private fieldElements = this.locatorForAll('mat-form-field');
    private labelElements = this.locatorForAll('mat-label');
    private prefixElements = this.locatorForAll('[matTextPrefix]');
    private inputElements = this.locatorForAll('input');
    private iconElements = this.locatorForAll('mat-icon');
    private suffixElements = this.locatorForAll('[matTextSuffix]');
    private buttonElements = this.locatorForAll('button');
    private errorElements = this.locatorForAll('mat-error');

    private hostChildrenElements = this.locatorForAll(':scope > *');
    private iconInsideButton = this.locatorForAll(
        ':scope > mat-form-field button > mat-icon',
    );

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
        return (await this.iconHarnessess()).length;
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
        return await field.hasLabel();
    }

    async getErrors() {
        const field = await this.fieldHarness();
        return await field.getErrors();
    }

    async getFormAppearance() {
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

    async getInputValue(): Promise<string> {
        const input = await this.inputHarness();
        return input.getValue();
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

    // -----------------------------
    // Controles de senha / ícone
    // -----------------------------

    async hasPasswordToggleButton(): Promise<boolean> {
        return (await this.buttonHarness()) !== null;
    }

    async setPasswordVisible(visible: boolean): Promise<boolean> {
        const button = await this.buttonHarness();
        if (!button) return false;
        const inputType = await this.getInputType();
        const isVisible = inputType != FormElementType.password;
        if ((visible && !isVisible) || (!visible && isVisible)) {
            const button = await this.buttonHarness();
            if (button) await button.click();
        }
        return true;
    }

    async clickPasswordToggle(): Promise<void> {
        const button = await this.buttonHarness();
        if (button) await button.click();
    }

    async getPasswordIconName(): Promise<string | null> {
        const icon = await this.iconHarness();
        return icon ? icon.getName() : null;
    }

    async buttonContainsIcon(): Promise<boolean> {
        const buttonIcons = await this.iconInsideButton();
        return buttonIcons.length == 1;
    }
}

import { ComponentHarness } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatErrorHarness, MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { AutoCompleteType } from '@components/form/enums/auto-complete-type/auto-complete-type.enum';
import { FormElementType } from '@components/form/enums/form-element-type/form-element-type.enum';
import { InputType } from '@components/form/enums/input-type/input-type.enum';
import { Icon } from '@enums/icons/icons.enum';

type TextFieldState = {
    id: string;
    /** input type (text or password) */
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
    errors: string[];
    hasValidStructure: boolean | { [key: string]: string };
};

export class PasswordFieldHarness extends ComponentHarness {
    public static hostSelector = 'app-password-field';

    /** Harnesses filhos */
    private readonly fieldHarness = this.locatorFor(MatFormFieldHarness);
    private readonly labelHarness = this.locatorFor(MatFormFieldHarness);
    private readonly inputHarness = this.locatorFor(MatInputHarness);
    private readonly buttonHarness = this.locatorForOptional(MatButtonHarness);
    private readonly iconHarness = this.locatorForOptional(MatIconHarness);
    private readonly errorHarness = this.locatorForOptional(MatErrorHarness);

    private readonly fieldHarnesses = this.locatorForAll(MatFormFieldHarness);
    private readonly labelHarnessess = this.locatorForAll(MatFormFieldHarness);
    private readonly inputHarnesses = this.locatorForAll(MatInputHarness);
    private readonly iconHarnessess = this.locatorForAll(MatIconHarness);
    private readonly buttonHarnesses = this.locatorForAll(MatButtonHarness);
    private readonly errorHarnesses = this.locatorForAll(MatErrorHarness);

    private readonly fieldElement = this.locatorFor('mat-form-field');
    private readonly labelElement = this.locatorFor('mat-label');
    private readonly inputElement = this.locatorFor('input');
    private readonly iconElement = this.locatorForOptional('mat-icon');
    private readonly buttonElement = this.locatorForOptional('button');
    private readonly errorElement = this.locatorForOptional('mat-error');

    private readonly fieldElements = this.locatorForAll('mat-form-field');
    private readonly labelElements = this.locatorForAll('mat-label');
    private readonly inputElements = this.locatorForAll('input');
    private readonly iconElements = this.locatorForAll('mat-icon');
    private readonly buttonElements = this.locatorForAll('button');
    private readonly errorElements = this.locatorForAll('mat-error');

    private readonly hostChildrenElements = this.locatorForAll(':scope > *');
    private readonly iconInsideButton = this.locatorForAll(
        ':scope > mat-form-field button > mat-icon',
    );

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

    public async getButtonCount(): Promise<number> {
        return (await this.buttonElements()).length;
    }

    public async getIconCount(): Promise<number> {
        return (await this.iconHarnessess()).length;
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
    // Controles de senha / ícone
    // -----------------------------

    public async hasPasswordToggleButton(): Promise<boolean> {
        return (await this.buttonHarness()) !== null;
    }

    public async setPasswordVisible(visible: boolean): Promise<boolean> {
        const button = await this.buttonHarness();
        if (!button) return false;
        const inputType = await this.getInputType();
        const isVisible = inputType !== FormElementType.password;
        if ((visible && !isVisible) || (!visible && isVisible)) {
            await button.click();
        }
        return true;
    }

    public async clickPasswordToggle(): Promise<void> {
        const button = await this.buttonHarness();
        if (button) await button.click();
    }

    public async getPasswordIconName(): Promise<string | null> {
        const icon = await this.iconHarness();
        return icon ? await icon.getName() : null;
    }

    public async buttonContainsIcon(): Promise<boolean> {
        const buttonIcons = await this.iconInsideButton();
        return buttonIcons.length === 1;
    }

    public async isTextVisible(): Promise<boolean> {
        const type = await this.getInputType();
        return type === InputType.text;
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

        const inputCount = await this.getInputCount();
        const hasValidInputCount = inputCount === 1;
        if (!hasValidInputCount) {
            errors['hasValidInputCount'] = `Has invalid number of input elements : ${inputCount}.`;
        }

        const buttonCount = await this.getButtonCount();
        const hasValidButtonCount = buttonCount <= 1;
        if (!hasValidButtonCount) {
            errors['hasValidButtonCount'] = `Has invalid number of button elements ${buttonCount}.`;
        }

        const iconCount = await this.getIconCount();
        const validIconCount = iconCount <= 1;
        if (!validIconCount) {
            errors['hasNoIcons'] = `Has invalid number of icon elements ${iconCount}.`;
        }

        const type = await this.getInputType();
        if (buttonCount > 0) {
            const iconName = await this.getPasswordIconName();

            const isValidIcon =
                (iconName === Icon.visibility && type === InputType.password) ||
                (iconName === Icon.visibility_off && type === InputType.text);
            if (!isValidIcon) {
                errors['hasValidIcon'] =
                    `Has invalid icon name "${iconName}" for input type "${type}".`;
            }
        }

        const buttonsContainsIcon = await this.buttonContainsIcon();
        if (buttonCount === 1 && !buttonsContainsIcon) {
            errors['buttonsContainsIcon'] = `Button does not contain icon.`;
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
        const isFocusable = await this.isInputFocusable();
        const isFocused = await this.isInputFocused();
        const isReadOnly = await this.isInputReadOnly();
        const autocomplete = await this.getAutocomplete();
        const _minLength = await this.getInputMinLength();
        const minLength = _minLength != null ? Number(_minLength) : null;
        const _maxLength = await this.getInputMaxLength();
        const maxLength = _maxLength != null ? Number(_maxLength) : null;
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
            placeholder,
            isFocusable,
            isFocused,
            isReadOnly,
            autocomplete,
            minLength,
            maxLength,
            errors,
            hasValidStructure,
        };
    }
}

import { ComponentHarness } from '@angular/cdk/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatSelectHarness } from '@angular/material/select/testing';

/**
 * Harness para testar o componente SelectFieldComponent
 */
export class SelectFieldHarness extends ComponentHarness {
    static hostSelector = 'app-select-field';

    // Locators internos

    private readonly fieldHarness = this.locatorFor(MatFormFieldHarness);
    private readonly hostChildrenElements = this.locatorForAll(':scope > *');
    private readonly formFieldElement = this.locatorFor('mat-form-field');
    private readonly labelElement = this.locatorForOptional(
        'mat-form-field mat-label',
    );
    private readonly selectElement = this.locatorFor(
        ':scope mat-form-field mat-select',
    );
    private readonly matSelectHarness = this.locatorFor(MatSelectHarness);
    private readonly matSelectsEls = this.locatorForAll(
        ':scope mat-form-field mat-select',
    );
    private readonly optionsEl = this.locatorForAll('mat-option');
    private readonly errorEl = this.locatorForOptional('mat-error');

    async getHostChildrenCount() {
        return (await this.hostChildrenElements()).length;
    }

    async isHostChildAMatFormField() {
        const hostChildren = await this.hostChildrenElements();
        if (hostChildren.length < 1) return false;
        const tagName = await hostChildren[0].getProperty('tagName');
        return tagName == 'MAT-FORM-FIELD';
    }

    async getHostChildTagNames(): Promise<string[]> {
        const children = await this.hostChildrenElements();
        const tagNames: string[] = [];
        for (const child of children) {
            const tag = (
                (await child.getProperty('tagName')) as string
            ).toLowerCase();
            tagNames.push(tag);
        }
        return tagNames;
    }

    async getFieldHarness() {
        const field = await this.fieldHarness();
        return field;
    }
    async getFieldAppearance() {
        const field = await this.fieldHarness();
        return await field.getAppearance();
    }

    async getSelect() {
        return await this.selectElement();
    }

    async getSelectHarness() {
        return await this.matSelectHarness();
    }

    async getOptionsHarnesses() {
        const selects = await this.matSelectHarness();
        const options = selects.getOptions();
        return options;
    }

    async hostConstainsOnlyAFormField() {
        const tags = await this.getHostChildTagNames();
        if (tags.length != 1) return false;
        return tags.every((tag) => ['mat-form-field'].includes(tag));
    }

    /** 🔹 Retorna o texto do label */
    async getLabelText(): Promise<string | null> {
        const label = await this.labelElement();
        return label ? ((await label.text())?.trim() ?? null) : null;
    }

    /** 🔹 Retorna o id do <mat-select> */
    async getSelectId(): Promise<string | null> {
        const select = await this.selectElement();
        return await select.getAttribute('id');
    }

    /** 🔹 Retorna o tabindex do <mat-select> */
    async getTabIndex(): Promise<number | null> {
        const select = await this.selectElement();
        const tabindex = await select.getAttribute('tabindex');
        return tabindex !== null ? Number(tabindex) : null;
    }

    /** 🔹 Retorna as opções exibidas no <mat-select> */
    async getOptions(): Promise<{ selected: boolean; label: string | null }[]> {
        const select = await this.getSelectHarness();
        const isOpen = await select.isOpen();

        // if select menu is not open opens it
        if (!isOpen) {
            await select.open();
        }
        const options = await select.getOptions();

        const results: { selected: boolean; label: string | null }[] = [];

        for (const option of options) {
            const selected = await option.isSelected();
            const label = (await option.getText())?.trim() ?? null;
            results.push({ selected, label });
        }

        // if select menu was not open before, closes it again
        if (!isOpen) {
            await select.close();
        }

        return results;
    }

    async clickOption(label: string) {
        const select = await this.getSelectHarness();
        const isOpen = await select.isOpen();
        if (!isOpen) {
            await select.open();
        }
        const options = await select.getOptions();
        for (const option of options) {
            const _label = (await option.getText())?.trim() ?? null;
            if (_label == label) {
                await option.click();
                return true;
            }
        }
        await select.close();
        return false;
    }

    /** 🔹 Retorna a lista de labels (strings) das opções */
    async getOptionLabels(): Promise<string[]> {
        const options = await this.getOptions();
        return options.map((o) => o.label ?? '');
    }

    /** 🔹 Retorna a mensagem de erro (se existir) */
    async getErrorMessage(): Promise<string | null> {
        const error = await this.errorEl();
        return error ? ((await error.text())?.trim() ?? null) : null;
    }

    async hasOneAndOnlyOneMatSelect(): Promise<boolean> {
        const selects = await this.matSelectsEls();
        return selects.length == 1;
    }

    /** 🔹 Conta o número de opções */
    async getOptionCount(): Promise<number> {
        const options = await this.optionsEl();
        return options.length;
    }

    /** 🔹 Retorna todas as classes aplicadas ao mat-form-field */
    async getFormFieldClasses(): Promise<string[]> {
        const field = await this.formFieldElement();
        const classAttr = (await field.getAttribute('class')) ?? '';
        return classAttr
            .split(/\s+/)
            .map((c) => c.trim())
            .filter(Boolean);
    }

    /** 🔹 Verifica se o campo possui uma mensagem de erro visível */
    async hasVisibleError(): Promise<boolean> {
        const classes = await this.getFormFieldClasses();
        if (
            classes.includes('ng-touched') &&
            classes.includes('ng-dirty') &&
            classes.includes('ng-invalid')
        ) {
            return true;
        }
        return false;
    }

    async isSelectFocused(): Promise<boolean> {
        const select = await this.matSelectHarness();
        const focused = select.isFocused();
        return focused;
    }

    async hasValidStructure(): Promise<boolean | { [key: string]: string }> {
        const errors: any = {};

        const hasValidChildrenCount = (await this.getHostChildrenCount()) == 1;
        if (!hasValidChildrenCount) {
            errors['hasValidChildrenCount'] =
                `Invalid children count: ${hasValidChildrenCount}.`;
        }

        const isHostChildAField = await this.isHostChildAMatFormField();
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

        // TODO: testar label

        return Object.keys(errors).length == 0 ? true : errors;
    }

    async getState() {
        const selectHarness = await this.getSelectHarness();
        const id = await this.getSelectId();
        const label = await this.getLabelText();
        const selectedValueLabel = await selectHarness.getValueText();
        const isOpen = await selectHarness.isOpen();
        const focused = await this.isSelectFocused();
        const disabled = await selectHarness.isDisabled();
        const options = await this.getOptions();
        // const formFieldClasses = await this.getFormFieldClasses();

        const hasError = await this.hasVisibleError();
        const hasValidStructure = await this.hasValidStructure();

        const state = {
            id,
            label,
            selectedValueLabel,
            isOpen,
            focused,
            disabled,
            hasError,
            options,
            // formFieldClasses,
            hasValidStructure,
        };
        return state;
    }
}

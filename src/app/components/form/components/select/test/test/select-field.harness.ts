import { ComponentHarness } from '@angular/cdk/testing';
import { MatOptionHarness } from '@angular/material/core/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatSelectHarness } from '@angular/material/select/testing';

/**
 * Harness para testar o componente SelectFieldComponent
 */
export class SelectFieldHarness extends ComponentHarness {
    static hostSelector = 'app-select-field';

    // Locators internos

    private readonly fieldHarness = this.locatorFor(MatFormFieldHarness);
    private readonly hostChildrenEl = this.locatorForAll(':scope > *');
    private readonly formFieldEl = this.locatorFor('mat-form-field');
    private readonly label = this.locatorForOptional(
        'mat-form-field mat-label',
    );
    private readonly select = this.locatorFor(
        ':scope mat-form-field mat-select',
    );
    private readonly selectHarness = this.locatorFor(MatSelectHarness);
    private readonly selectsEls = this.locatorForAll(
        ':scope mat-form-field mat-select',
    );
    private readonly optionsEl = this.locatorForAll('mat-option');
    private readonly errorEl = this.locatorForOptional('mat-error');

    async getHostChildTagNames(): Promise<string[]> {
        const children = await this.hostChildrenEl();
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
        return await this.select();
    }

    async getSelected() {
        const select = await this.select();
        const options = await select.selectOptions();
    }

    async getSelectHarness() {
        return await this.selectHarness();
    }

    async getOptionsHarnesses() {
        const selects = await this.selectHarness();
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
        const label = await this.label();
        return label ? ((await label.text())?.trim() ?? null) : null;
    }

    /** 🔹 Retorna o id do <mat-select> */
    async getSelectId(): Promise<string | null> {
        const select = await this.select();
        return await select.getAttribute('id');
    }

    /** 🔹 Retorna o tabindex do <mat-select> */
    async getTabIndex(): Promise<number | null> {
        const select = await this.select();
        const tabindex = await select.getAttribute('tabindex');
        return tabindex !== null ? Number(tabindex) : null;
    }

    /** 🔹 Retorna as opções exibidas no <mat-select> */
    async getOptions(): Promise<{ selected: boolean; label: string | null }[]> {
        const select = await this.getSelectHarness();
        await select.open();
        const options = await select.getOptions();

        const results: { selected: boolean; label: string | null }[] = [];
        MatOptionHarness;

        for (const option of options) {
            const selected = await option.isSelected();
            const label = (await option.getText())?.trim() ?? null;
            results.push({ selected, label });
        }

        return results;
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

    async hasOneAndOnlyOneSelect(): Promise<boolean> {
        const selects = await this.selectsEls();
        return selects.length == 1;
    }

    /** 🔹 Conta o número de opções */
    async getOptionCount(): Promise<number> {
        const options = await this.optionsEl();
        return options.length;
    }

    /** 🔹 Retorna todas as classes aplicadas ao mat-form-field */
    async getFormFieldClasses(): Promise<string[]> {
        const field = await this.formFieldEl();
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
}

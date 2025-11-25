import { ComponentHarness } from '@angular/cdk/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';

export class CheckboxHarness extends ComponentHarness {
    static hostSelector = 'app-checkbox';
    private readonly hostChildren = this.locatorForAll(':scope > *');
    private readonly checkboxHarnesses = this.locatorForAll(MatCheckboxHarness);
    private checkboxHarness = this.locatorFor(MatCheckboxHarness);

    async countHostChildren() {
        const children = await this.hostChildren();
        return children.length;
    }

    async hostContainsASingleCheckbox() {
        const children = await this.hostChildren();
        if (children.length != 1) return false;
        const tagName = await children[0].getProperty('tagName');
        return tagName == 'MAT-CHECKBOX';
    }

    async getHostChildrenTagNames(): Promise<string[]> {
        const children = await this.hostChildren();
        const tagNames: string[] = [];
        for (const child of children) {
            const tag = (
                (await child.getProperty('tagName')) as string
            ).toLowerCase();
            tagNames.push(tag);
        }
        return tagNames;
    }

    async getCheckboxHarness() {
        return this.checkboxHarness();
    }

    async getCheckboxHarnesses() {
        return this.checkboxHarnesses();
    }

    async getCheckboxId(): Promise<string> {
        const checkbox = await this.checkboxHarness();
        const host = await checkbox.host();
        return (await host.getAttribute('id')) ?? '';
    }

    async getLabel(): Promise<string> {
        const checkbox = await this.checkboxHarness();
        const host = await checkbox.host();
        return (await host.text()) ?? '';
    }

    async isChecked() {
        const checkbox = await this.checkboxHarness();
        return checkbox.isChecked();
    }

    async isDisabled() {
        const checkbox = await this.checkboxHarness();
        return checkbox.isDisabled();
    }

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

    /** 🔹 Retorna todas as classes aplicadas ao mat-form-field */
    async getFormFieldClasses(): Promise<string[]> {
        const harness = await this.checkboxHarness();
        const host = await harness.host();
        const classAttr = (await host.getAttribute('class')) ?? '';
        return classAttr
            .split(/\s+/)
            .map((c) => c.trim())
            .filter(Boolean);
    }

    async getButtonChildTagNames(): Promise<string[]> {
        const children = await this.hostChildren();
        const tagNames: string[] = [];
        for (const child of children) {
            const tag = (
                (await child.getProperty('tagName')) as string
            ).toLowerCase();
            tagNames.push(tag);
        }

        return tagNames;
    }

    async getInnerButtonLabel() {
        const label = (await this.checkboxHarness()).getLabelText();
        return label;
    }

    async click() {
        const checkbox = await this.checkboxHarness();

        (await checkbox._input()).click();
    }
}

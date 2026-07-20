import { ComponentHarness } from '@angular/cdk/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';

type CheckboxState = {
    id: string;
    label: string | null;
    isFocused: boolean;
    isChecked: boolean;
    isDisabled: boolean;
    hasError: boolean;
    hasValidStructure: boolean | { [key: string]: string };
};

export class CheckboxHarness extends ComponentHarness {
    static hostSelector = 'app-checkbox';
    private readonly hostChildrenElements = this.locatorForAll(':scope > *');
    private readonly matCheckboxHarnesses =
        this.locatorForAll(MatCheckboxHarness);
    private readonly matCheckboxHarness = this.locatorFor(MatCheckboxHarness);

    async getHostChildrenCount() {
        return (await this.hostChildrenElements()).length;
    }

    async hostContainsASingleCheckbox() {
        const children = await this.hostChildrenElements();
        if (children.length != 1) return false;
        const tagName = await children[0].getProperty('tagName');
        return tagName == 'MAT-CHECKBOX';
    }

    async isHostChildACheckbox() {
        const hostChildren = await this.hostChildrenElements();
        if (hostChildren.length < 1) return false;
        const tagName = await hostChildren[0].getProperty('tagName');
        return tagName == 'MAT-CHECKBOX';
    }

    async getHostChildrenTagNames(): Promise<string[]> {
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

    async getMatCheckboxHarness() {
        return this.matCheckboxHarness();
    }

    async getMatCheckboxHarnesses() {
        return this.matCheckboxHarnesses();
    }

    async getCheckboxId(): Promise<string> {
        const checkbox = await this.matCheckboxHarness();
        const host = await checkbox.host();
        return (await host.getAttribute('id')) ?? '';
    }

    async getLabel(): Promise<string> {
        const checkbox = await this.matCheckboxHarness();
        const host = await checkbox.host();
        return (await host.text()) ?? '';
    }

    async isChecked() {
        const checkbox = await this.matCheckboxHarness();
        return checkbox.isChecked();
    }

    async isDisabled() {
        const checkbox = await this.matCheckboxHarness();
        return checkbox.isDisabled();
    }

    async isCheckboxFocused(): Promise<boolean> {
        const checkbox = await this.matCheckboxHarness();
        const input = await checkbox._input();
        const isFocused = await input.isFocused();
        return isFocused;
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
        const harness = await this.matCheckboxHarness();
        const host = await harness.host();
        const classAttr = (await host.getAttribute('class')) ?? '';
        return classAttr
            .split(/\s+/)
            .map((c) => c.trim())
            .filter(Boolean);
    }

    async getButtonChildTagNames(): Promise<string[]> {
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

    async getInnerButtonLabel() {
        const label = (await this.matCheckboxHarness()).getLabelText();
        return label;
    }

    async click() {
        const checkbox = await this.matCheckboxHarness();
        (await checkbox._input()).click();
    }

    async hasValidStructure(): Promise<boolean | { [key: string]: string }> {
        const errors: any = {};

        const hasValidChildrenCount = (await this.getHostChildrenCount()) == 1;
        if (!hasValidChildrenCount) {
            errors['hasValidChildrenCount'] =
                `Invalid children count: ${hasValidChildrenCount}.`;
        }

        const isHostChildACheckbox = await this.isHostChildACheckbox();
        if (!isHostChildACheckbox) {
            errors['isHostChildACheckbox'] =
                `Host child is not a checkbox ${isHostChildACheckbox}.`;
        }

        // TODO: testar label

        return Object.keys(errors).length == 0 ? true : errors;
    }

    async getState(): Promise<CheckboxState> {
        const id = await this.getCheckboxId();
        const label = await this.getLabel();
        const isFocused = await this.isCheckboxFocused();
        const isChecked = await this.isChecked();
        const isDisabled = await this.isDisabled();
        const hasError = await this.hasVisibleError();
        const hasValidStructure = await this.hasValidStructure();

        return {
            id,
            label,
            isFocused,
            isChecked,
            isDisabled,
            hasError,
            hasValidStructure,
        };
    }
}

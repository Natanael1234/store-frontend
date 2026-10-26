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
    public static hostSelector = 'app-checkbox';

    private readonly hostChildrenElements = this.locatorForAll(':scope > *');
    private readonly matCheckboxHarnesses = this.locatorForAll(MatCheckboxHarness);
    private readonly matCheckboxHarness = this.locatorFor(MatCheckboxHarness);

    public async getHostChildrenCount(): Promise<number> {
        return (await this.hostChildrenElements()).length;
    }

    public async hostContainsASingleCheckbox(): Promise<boolean> {
        const children = await this.hostChildrenElements();
        if (children.length !== 1) return false;
        const tagName = await children[0].getProperty('tagName');
        return tagName === 'MAT-CHECKBOX';
    }

    public async isHostChildACheckbox(): Promise<boolean> {
        const hostChildren = await this.hostChildrenElements();
        if (hostChildren.length < 1) return false;
        const tagName = await hostChildren[0].getProperty('tagName');
        return tagName === 'MAT-CHECKBOX';
    }

    public async getHostChildrenTagNames(): Promise<string[]> {
        const children = await this.hostChildrenElements();
        const tagNames: string[] = [];
        for (const child of children) {
            const tag = ((await child.getProperty('tagName')) as string).toLowerCase();
            tagNames.push(tag);
        }
        return tagNames;
    }

    public async getMatCheckboxHarness(): Promise<MatCheckboxHarness> {
        return await this.matCheckboxHarness();
    }

    public async getMatCheckboxHarnesses(): Promise<MatCheckboxHarness[]> {
        return await this.matCheckboxHarnesses();
    }

    public async getCheckboxId(): Promise<string> {
        const checkbox = await this.matCheckboxHarness();
        const host = await checkbox.host();
        return (await host.getAttribute('id')) ?? '';
    }

    public async getLabel(): Promise<string> {
        const checkbox = await this.matCheckboxHarness();
        const host = await checkbox.host();
        return (await host.text()) ?? '';
    }

    public async setValue(checked: boolean): Promise<void> {
        const checkbox = await this.matCheckboxHarness();
        const isChecked = await checkbox.isChecked();

        // Se já estiver no estado desejado, alterna primeiro para forçar o evento de mudança
        if (isChecked === checked) {
            if (checked) {
                await checkbox.uncheck();
            } else {
                await checkbox.check();
            }
        }

        // Aplica o estado final desejado
        if (checked) {
            await checkbox.check();
        } else {
            await checkbox.uncheck();
        }

        await checkbox.blur();
    }

    public async isChecked(): Promise<boolean> {
        const checkbox = await this.matCheckboxHarness();
        return await checkbox.isChecked();
    }

    public async isDisabled(): Promise<boolean> {
        const checkbox = await this.matCheckboxHarness();
        return await checkbox.isDisabled();
    }

    public async isCheckboxFocused(): Promise<boolean> {
        const checkbox = await this.matCheckboxHarness();
        const input = await checkbox._input();
        return await input.isFocused();
    }

    /** Retorna todas as classes aplicadas ao mat-checkbox */
    public async getMatCheckboxClasses(): Promise<string[]> {
        const harness = await this.matCheckboxHarness();
        const host = await harness.host();
        const classAttr = (await host.getAttribute('class')) ?? '';
        return classAttr
            .split(/\s+/)
            .map((c) => c.trim())
            .filter(Boolean);
    }

    public async hasVisibleError(): Promise<boolean> {
        const classes = await this.getMatCheckboxClasses();
        if (
            classes.includes('ng-touched') &&
            classes.includes('ng-dirty') &&
            classes.includes('ng-invalid')
        ) {
            return true;
        }
        return false;
    }

    public async getButtonChildTagNames(): Promise<string[]> {
        const children = await this.hostChildrenElements();
        const tagNames: string[] = [];
        for (const child of children) {
            const tag = ((await child.getProperty('tagName')) as string).toLowerCase();
            tagNames.push(tag);
        }
        return tagNames;
    }

    public async getInnerButtonLabel(): Promise<string> {
        const label = await (await this.matCheckboxHarness()).getLabelText();
        return label;
    }

    public async click(): Promise<void> {
        const checkbox = await this.matCheckboxHarness();
        await (await checkbox._input()).click();
    }

    public async hasValidStructure(): Promise<boolean | { [key: string]: string }> {
        const errors: { [key: string]: string } = {};

        const hasValidChildrenCount = (await this.getHostChildrenCount()) === 1;
        if (!hasValidChildrenCount) {
            errors['hasValidChildrenCount'] = `Invalid children count: ${hasValidChildrenCount}.`;
        }

        const isHostChildACheckbox = await this.isHostChildACheckbox();
        if (!isHostChildACheckbox) {
            errors['isHostChildACheckbox'] =
                `Host child is not a checkbox ${isHostChildACheckbox}.`;
        }

        // TODO: testar label

        return Object.keys(errors).length === 0 ? true : errors;
    }

    public async getState(): Promise<CheckboxState> {
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

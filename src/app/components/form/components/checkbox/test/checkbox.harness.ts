import { ComponentHarness } from '@angular/cdk/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';

export class CheckboxHarness extends ComponentHarness {
    static hostSelector = 'app-checkbox';
    private readonly hostChildren = this.locatorForAll(':scope > *');
    private checkboxHarness = this.locatorFor(MatCheckboxHarness);

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

    async hostContainsOnlyACheckbox(): Promise<boolean> {
        const tags = await this.getHostChildrenTagNames();
        if (tags.length != 1) return false;
        return tags.every((tag) => ['mat-checkbox'].includes(tag));
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
}

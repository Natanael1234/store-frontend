import { ComponentHarness } from '@angular/cdk/testing';
import { MatIconHarness } from '@angular/material/icon/testing';

export class ButtonHarness extends ComponentHarness {
    static hostSelector = 'app-radio-group';
    private readonly hostChildren = this.locatorForAll(':scope > *');
    private button = this.locatorFor('button');
    private readonly buttonChildren = this.locatorForAll(':scope > button > *');
    private icon = this.locatorFor(MatIconHarness);
    private label = this.locatorForOptional('mat-label');

    private innerButtonIcon = this.locatorForOptional(
        ':scope > button > mat-icon',
    );
    private innerButtonIcons = this.locatorForAll(':scope > button > mat-icon');
    private innerButtonLabel = this.locatorFor(
        ':scope > button > .mdc-button__label > mat-label',
    );
    private innerButtonLabels = this.locatorForAll(
        ':scope > button > .mdc-button__label > mat-label',
    );

    async getButton() {
        return await this.button();
    }

    async getButtonClasses() {
        const classes =
            (await (await this.button()).getAttribute('class')) ?? '';
        return classes.split(' ');
    }

    async isButtonDisabled() {
        const button = await this.button();
        return await button.getProperty('disabled');
    }

    async getIcon() {
        return await this.icon();
    }

    async getIconText() {
        const icon = await this.icon();
        return icon.getName();
    }

    async getInnerButtonLabelText(): Promise<string | null> {
        const label = await this.getInnerButtonLabel();
        return label ? (await label.text()).trim() : null;
    }

    // async isDisabled(): Promise<boolean> {
    //     const button = await this.button();
    //     return await button.isDisabled();
    // }

    async getHostChildTagNames(): Promise<string[]> {
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

    async hostContainsOnlyAButton(): Promise<boolean> {
        const tags = await this.getHostChildTagNames();
        if (tags.length != 1) return false;
        return tags.every((tag) => ['button'].includes(tag));
    }

    async getButtonChildTagNames(): Promise<string[]> {
        const children = await this.buttonChildren();
        const tagNames: string[] = [];
        for (const child of children) {
            const tag = (
                (await child.getProperty('tagName')) as string
            ).toLowerCase();
            tagNames.push(tag);
        }

        return tagNames;
    }

    async hasNoIcon() {
        const icons = await this.innerButtonIcons();
        return icons.length == 0;
    }

    async hasOnlyOneIcon() {
        const icons = await this.innerButtonIcons();
        return icons.length == 1;
    }

    async hasOnlyOneLabel() {
        const labels = await this.innerButtonLabels();
        return labels.length == 1;
    }

    async isIconBeforeLabel(): Promise<boolean> {
        const children = await this.buttonChildren();
        let iconIdx = -1;
        let labelIdx = -1;
        for (let i = 0; i < children.length; i++) {
            if ((await children[i].getProperty('tagName')) == 'MAT-ICON') {
                iconIdx = i;
            }
            if (await children[i].hasClass('mdc-button__label')) {
                labelIdx = i;
            }
        }
        return iconIdx < labelIdx;
    }

    async getInnerButtonLabel() {
        const label = await this.innerButtonLabel();
        return label;
    }
}

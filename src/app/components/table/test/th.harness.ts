import { ComponentHarness } from '@angular/cdk/testing';
import { HeaderItemHarness } from '@components/table/components/header-item/header-item.harness';

export class ThHarness extends ComponentHarness {
    static hostSelector = 'th';

    private readonly hostChildren = this.locatorForAll(':scope > *');
    private readonly headerItemElement = this.locatorFor('app-header-item');
    private readonly headerItem = this.locatorFor(HeaderItemHarness);

    async getErrors() {
        const errors: string[] = [];
        const children = await this.hostChildren();
        for (const child of children) {
            const tagName = await child.getProperty('tagName');
            if (tagName != 'APP-HEADER-ITEM') {
                errors.push(
                    `Invalid TH child. Expected APP-HEADER-ITEM. Found ${tagName}.`,
                );
            }
        }
        const headerItem = await this.headerItem();
        const headerItemErrors = await headerItem.getErrors();
        errors.push(...headerItemErrors);
        return errors;
    }

    async isShrunken() {
        const host = await this.host();
        const isShrunken = await host.hasClass('class');
        return isShrunken;
    }

    async getState() {
        const item = await this.headerItem();
        const { label, icon } = await item.getState();
        let shrink = await this.isShrunken();
        const state = { label, icon, shrink };
        return state;
    }
}

import { ComponentHarness } from '@angular/cdk/testing';
import { THeadTRHarness } from '@components/table/test/thead-tr.harness';

export class THeadHarness extends ComponentHarness {
    static hostSelector = 'thead';

    private readonly tr = this.locatorFor(THeadTRHarness);
    private readonly hostChildren = this.locatorForAll(':scope > *');

    async triggerLeftClick(column?: number | undefined) {
        const tr = await this.tr();
        await tr.triggerLeftClick(column);
    }

    async triggerMiddleClick(column?: number | undefined) {
        const tr = await this.tr();
        await tr.triggerMiddleClick(column);
    }

    async triggerRightClick(column?: number | undefined) {
        const tr = await this.tr();
        await tr.triggerRightClick(column);
    }

    async triggerTouch(column?: number | undefined) {
        const tr = await this.tr();
        await tr.triggerTouch(column);
    }

    async triggerPenClick(column?: number | undefined) {
        const tr = await this.tr();
        await tr.triggerPenClick(column);
    }

    async getErrors() {
        const errors: string[] = [];
        const children = await this.hostChildren();
        if (children.length != 1) {
            errors.push(
                `Expected thead had 1 child. Found ${children.length}.`,
            );
        }
        const tagName = await children[0].getProperty('tagName');
        if (tagName != 'TR') {
            errors.push(`Invalid THEAD child. Expected TR. Found ${tagName}.`);
        }
        const tr = await this.tr();
        const rowErrors = await tr.getErrors();
        errors.push(...rowErrors);
        return errors;
    }

    async getState() {
        const tr = await this.tr();
        const state = await tr.getState();
        return state;
    }
}

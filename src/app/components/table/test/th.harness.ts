import { ComponentHarness } from '@angular/cdk/testing';
import { HeaderItemHarness } from '@components/table/components/header-item/header-item.harness';
import { MouseButton } from '@enums/mouse-button/mouse-button.enum';
import { PointerType } from '@enums/pointer-type/pointer-type.enum';

export class ThHarness extends ComponentHarness {
    static hostSelector = 'th';

    private readonly hostChildren = this.locatorForAll(':scope > *');
    private readonly headerItemElement = this.locatorFor('app-header-item');
    private readonly headerItem = this.locatorFor(HeaderItemHarness);

    async triggerLeftClick() {
        const td = await this.host();
        await td.dispatchEvent('click', {
            pointerType: PointerType.mouse,
            button: MouseButton.left,
        });
    }

    async triggerMiddleClick() {
        const host = await this.host();
        await host.dispatchEvent('click', {
            pointerType: PointerType.mouse,
            button: MouseButton.middle,
        });
    }

    async triggerRightClick() {
        const host = await this.host();
        await host.dispatchEvent('click', {
            pointerType: PointerType.mouse,
            button: MouseButton.right,
        });
    }

    async triggerTouch() {
        const host = await this.host();
        await host.dispatchEvent('pointerdown', {
            pointerType: PointerType.touch,
            button: MouseButton.left,
        });
    }

    async triggerPenClick(): Promise<void> {
        const host = await this.host();
        await host.dispatchEvent('click', {
            pointerType: PointerType.pen,
            button: MouseButton.left,
        } as any);
    }

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

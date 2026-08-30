import { ComponentHarness } from '@angular/cdk/testing';
import { RowItemHarness } from '@components/table/components/row-item/row-item.harness';
import { MouseButton } from '@enums/mouse-button/mouse-button.enum';
import { PointerType } from '@enums/pointer-type/pointer-type.enum';

export class TdHarness extends ComponentHarness {
    static hostSelector = 'td';

    private readonly hostChildren = this.locatorForAll(':scope > *');
    private readonly rowItem = this.locatorFor(RowItemHarness);

    async getErrors() {
        const errors: string[] = [];
        const children = await this.hostChildren();
        for (const child of children) {
            const tagName = await child.getProperty('tagName');
            if (tagName != 'APP-ROW-ITEM') {
                errors.push(
                    `Invalid TREAD TH child. Expected APP-ROW-ITEM. Found ${tagName}.`,
                );
            }
        }
        const rowItem = await this.rowItem();
        const rowItemError = await rowItem.getErrors();
        errors.push(...rowItemError);
        return errors;
    }

    async isShrunken() {
        const host = await this.host();
        const isShrunken = await host.hasClass('class');
        return isShrunken;
    }

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
        // Dispara no elemento
        await host.dispatchEvent('click', {
            pointerType: PointerType.pen,
            button: MouseButton.left,
        } as any);
    }

    async getState(): Promise<{
        icon?: { name: string; loading: boolean; disabled: boolean };
        label?: { text: string; loading: boolean; disabled: boolean };
        shrink: boolean;
    }> {
        const item = await this.rowItem();
        const { icon, label } = await item.getState();
        let shrink = await this.isShrunken();
        const state = { icon, label, shrink };
        return state;
    }
}

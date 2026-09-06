import { ComponentHarness } from '@angular/cdk/testing';
import { TdHarness } from '@components/table/test/td.harness';
import { MouseButton } from '@enums/mouse-button/mouse-button.enum';
import { PointerType } from '@enums/pointer-type/pointer-type.enum';

export class TBodyTrHarness extends ComponentHarness {
    static hostSelector = 'tr';

    private readonly hostChildren = this.locatorForAll(':scope > *');
    private readonly tds = this.locatorForAll(TdHarness);

    async triggerLeftClick(column?: number | undefined) {
        if (column != null) {
            const td = (await this.tds())[column];
            await td.triggerLeftClick();
        } else {
            const host = await this.host();
            await host.dispatchEvent('click', {
                pointerType: PointerType.mouse,
                button: MouseButton.left,
            });
        }
    }

    async triggerMiddleClick(column?: number | undefined) {
        if (column != null) {
            const td = (await this.tds())[column];
            await td.triggerLeftClick();
        } else {
            const host = await this.host();
            await host.dispatchEvent('click', {
                pointerType: PointerType.mouse,
                button: MouseButton.middle,
            });
        }
    }

    async triggerRightClick(column?: number | undefined) {
        if (column != null) {
            const td = (await this.tds())[column];
            await td.triggerLeftClick();
        } else {
            const host = await this.host();
            await host.dispatchEvent('click', {
                pointerType: PointerType.mouse,
                button: MouseButton.right,
            });
        }
    }

    async triggerTouch(column?: number | undefined) {
        if (column != null) {
            const td = (await this.tds())[column];
            await td.triggerTouch();
        } else {
            const host = await this.host();
            await host.dispatchEvent('pointerdown', {
                pointerType: PointerType.touch,
                button: MouseButton.left,
            });
        }
    }

    async triggerPenClick(column?: number | undefined) {
        if (column != null) {
            const td = (await this.tds())[column];
            await td.triggerPenClick();
        } else {
            const host = await this.host();
            await host.dispatchEvent('click', {
                pointerType: PointerType.pen,
                button: MouseButton.left,
            });
        }
    }

    async getErrors() {
        const errors: string[] = [];
        const children = await this.hostChildren();
        for (const child of children) {
            const tagName = await child.getProperty('tagName');
            if (tagName != 'TD') {
                errors.push(
                    `Invalid HOST child. Expected TD. Found ${tagName}.`,
                );
            }
        }
        const cells = await this.tds();
        for (const cellHarness of cells) {
            const cellErrors = await cellHarness.getErrors();
            errors.push(...cellErrors);
        }
        return errors;
    }

    async getState() {
        const tds = await this.tds();
        const headers: {
            icon?: { name: string; loading: boolean; disabled: boolean };
            label?: { text: string; loading: boolean; disabled: boolean };
            shrink: boolean;
        }[] = [];
        for (const th of tds) {
            const thState = await th.getState();
            headers.push(thState);
        }
        return headers;
    }
}

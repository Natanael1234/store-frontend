import { ComponentHarness } from '@angular/cdk/testing';
import { ListItemHarness } from '@components/list/components/list-item/list-item.harness';
import { MouseButton } from '@enums/mouse-button/mouse-button.enum';
import { PointerType } from '@enums/pointer-type/pointer-type.enum';

export class ListHarness extends ComponentHarness {
    static hostSelector = 'app-list';
    private readonly hostChildren = this.locatorForAll(':scope > *');
    private readonly listChildren = this.locatorForAll(':scope > * > *');
    private readonly itemHarnesses = this.locatorForAll(ListItemHarness);

    async getItensData() {
        const itemHarnesses = await this.itemHarnesses();
        const _itens: any[] = [];
        for (const itemHarness of itemHarnesses) {
            _itens.push(await itemHarness.getData());
        }
        return _itens;
    }

    async getItem(idx: number) {
        const item = await this.itemHarnesses();
        return item[idx];
    }

    async click(idx: number) {
        const button = await this.getItem(idx);
        const host = await button.host();
        await host.dispatchEvent('click', {
            pointerType: PointerType.mouse,
            button: MouseButton.left,
        });
    }

    async hasValidStructure(): Promise<boolean | { [key: string]: string }> {
        const errors: any = {};

        const hostChildren = await this.hostChildren();
        if ((await hostChildren).length != 1) {
            errors['hostChildrenCount'] =
                `Host has invalid child count. Expected 1. Found ${hostChildren.length}.`;
        }

        const hostChildTagName = await hostChildren[0].getProperty('tagName');
        if (hostChildTagName != 'MAT-LIST') {
            errors['hostChildTagName'] =
                `Host child should be a mat-list. Found ${hostChildTagName}.`;
        }

        const listChildren = await this.listChildren();
        for (let i = 0; i < listChildren.length; i++) {
            const listChild = listChildren[i];
            const tagName = await listChild.getProperty('tagName');
            const even = i % 2 == 0;
            if (even) {
                if (tagName != 'APP-LIST-ITEM') {
                    errors['invalidListChild'] =
                        `List child should be a mat-list-item'. Found ${hostChildTagName}. ${i}`;
                }
            } else {
                if (tagName != 'MAT-DIVIDER') {
                    errors['invalidListChild'] =
                        `List child should be a mat-divider'. Found ${hostChildTagName}. ${i}`;
                }
            }
        }

        return Object.keys(errors).length == 0 ? true : errors;
    }

    async getState() {
        const hasValidStructure = await this.hasValidStructure();
        const items = await this.getItensData();
        return { hasValidStructure, items };
    }
}

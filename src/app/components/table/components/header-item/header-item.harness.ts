import { ComponentHarness, TestElement } from '@angular/cdk/testing';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MouseButton } from '@enums/mouse-button/mouse-button.enum';
import { PointerType } from '@enums/pointer-type/pointer-type.enum';

export class HeaderItemHarness extends ComponentHarness {
    static hostSelector = 'app-row-item';

    private readonly hostChildElements = this.locatorForAll(':scope > *');
    private readonly containerChildElements =
        this.locatorForAll('#container > *');
    private readonly labelChildElements = this.locatorForAll('#label > *');

    private readonly containerElement = this.locatorFor('#container');
    private readonly labelElement = this.locatorFor('#label');
    private readonly iconElement = this.locatorForOptional('#arrow');

    private readonly iconHarnesses = this.locatorForAll(MatIconHarness);

    async getLabel() {
        const label = await this.labelElement();
        const disabled = await label.hasClass('disabled');
        const text = await label.text();
        return { text, disabled };
    }

    async getIcon() {
        const icon = await this.iconElement();
        if (!icon) return undefined;
        const disabled = await icon.hasClass('disabled');
        let direction: 'asc' | 'desc' | 'hidden' | undefined;
        if (await icon.hasClass('asc')) {
            direction = 'asc';
        } else if (await icon.hasClass('desc')) {
            direction = 'desc';
        } else if (await icon.hasClass('hidden')) {
            direction = 'hidden';
        }
        return { disabled, direction };
    }

    async triggerLeftClick() {
        const container = await this.getContainer();
        await container.dispatchEvent('click', {
            pointerType: PointerType.mouse,
            button: MouseButton.left,
        });
    }

    // TODO: implement in other tests
    async triggerMiddleClick() {
        const container = await this.getContainer();
        await container.dispatchEvent('click', {
            pointerType: PointerType.mouse,
            button: MouseButton.middle,
        });
    }

    // TODO: implement in other tests
    async triggerRightClick() {
        const container = await this.getContainer();
        await container.dispatchEvent('click', {
            pointerType: PointerType.mouse,
            button: MouseButton.right,
        });
    }

    // TODO: implement in other tests
    async triggerTouch() {
        const container = await this.getContainer();
        await container.dispatchEvent('pointerdown', {
            pointerType: 'touch',
            button: 0,
        });
    }

    // TODO: implement in other tests
    async triggerPenClick(): Promise<void> {
        const container = await this.getContainer();

        // Cria o PointerEvent de 'click' com pointerType 'pen'
        const penEvent = new PointerEvent('click', {
            bubbles: true,
            cancelable: true,
            pointerType: 'pen',
            button: 0,
        });

        // Dispara no elemento
        await container.dispatchEvent('click', {
            pointerType: 'pen',
            button: 0,
        } as any);
    }

    private async getTagNames(testElements: TestElement[]) {
        const tagNames: string[] = [];
        for (const childElement of testElements) {
            const tag = (
                (await childElement.getProperty('tagName')) as string
            ).toLowerCase();
            tagNames.push(tag);
        }
        return tagNames;
    }

    async getHostChildTagNames(): Promise<string[]> {
        return this.getTagNames(await this.hostChildElements());
    }

    async getLabelChildTagNames(): Promise<string[]> {
        return this.getTagNames(await this.labelChildElements());
    }

    async containsOnlyAContainer() {
        const childElements = await this.hostChildElements();
        if (childElements.length != 1) return false;
        if ((await childElements[0].getProperty('tagName')) != 'DIV') {
            return false;
        }
        const clazz = (await childElements[0].getAttribute('class')) as string;
        if (!clazz) {
            return false;
        }
        const classes = clazz.split(' ');
        return classes;
    }

    async getContainerChildElements() {
        const containerChildElements = await this.containerChildElements();
        return containerChildElements;
    }

    async getContainerChildrenTagNames() {
        const containerChildElements = await this.getContainerChildElements();
        const tagNames: string[] = [];
        for (const containerChildElement of containerChildElements) {
            const tag = (
                (await containerChildElement.getProperty('tagName')) as string
            ).toLowerCase();
            tagNames.push(tag);
        }
        return tagNames;
    }

    async getContainer() {
        const container = await this.containerElement();
        return container;
    }

    async hasValidStructure(): Promise<boolean | { [key: string]: string }> {
        const errors: any = {};

        // container

        const hostChildren = await this.hostChildElements();
        if (hostChildren.length != 1) {
            errors['hostChlidCount'] =
                `Host should have 1 child. Found ${hostChildren.length}.`;
        }

        const hostChildTagName = await hostChildren[0].getProperty('tagName');
        if (hostChildTagName != 'DIV') {
            errors['hostChildType'] =
                `Host child should be a DIV. Found ${hostChildTagName}.`;
        }

        const hostChildId = await hostChildren[0].getProperty('id');
        if (hostChildId != 'container') {
            errors['hostChildId'] =
                `Host child should have id "container". Found "${hostChildId}".`;
        }

        const containerChildren = await this.containerChildElements();
        if (containerChildren.length == 0) {
            errors['emptyContainer'] = `Container is empty.`;
        }
        if (containerChildren.length > 2) {
            errors['invalidContainerChildCount'] =
                `Container have more than two children.`;
        }

        // label
        const firstContainerChild = containerChildren[0];
        const firstContainerChildTagName =
            await firstContainerChild.getProperty('tagName');
        if (firstContainerChildTagName != 'SPAN') {
            errors['invalidFirstContainerChild'] =
                `First container child should be a SPAN. Found ${firstContainerChildTagName}`;
        }
        const firstContainerChildId =
            await firstContainerChild.getProperty('id');
        if (firstContainerChildId != 'label') {
            errors['invalidSecondContainerChildId'] =
                `Second container child should have id "label". Found "${firstContainerChildId}".`;
        }
        const labelChildren = await this.labelChildElements();
        if (labelChildren.length) {
            errors['invalidLabelChildren'] = 'Label should not have children.';
        }

        // icon
        if (containerChildren.length > 1) {
            const secondContainerChild = containerChildren[1];
            const secondContainerChildTagName =
                await secondContainerChild.getProperty('tagName');
            if (secondContainerChildTagName != 'MAT-ICON') {
                errors['invalidSecondContainerChild'] =
                    `Second container child should be a MAT-ICON. $Found ${secondContainerChildTagName}.`;
            }
            const secondContainerChildId =
                await secondContainerChild.getProperty('id');
            if (secondContainerChildId != 'arrow') {
                errors['invalidSecondContainerChildId'] =
                    `Second container child should have id "arrow". Found "${secondContainerChildId}".`;
            }

            const iconName = await secondContainerChild.text();
            if (iconName != 'arrow_downward') {
                errors['invalidIconName'] =
                    `Inalid icon name. Expected arrow_downward. Found ${iconName}`;
            }
        }

        return Object.keys(errors).length == 0 ? true : errors;
    }

    async getState() {
        const hasValidStructure = await this.hasValidStructure();
        const label = await this.getLabel();
        const icon = await this.getIcon();
        if (icon) {
            return { hasValidStructure, label, icon };
        }
        return { hasValidStructure, label };
    }
}

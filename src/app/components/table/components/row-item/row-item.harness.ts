import { ComponentHarness } from '@angular/cdk/testing';
import { MouseButton } from '@enums/mouse-button/mouse-button.enum';
import { PointerType } from '@enums/pointer-type/pointer-type.enum';

export class RowItemHarness extends ComponentHarness {
    static hostSelector = 'app-row-item';

    private readonly hostChildElement = this.locatorFor(':scope > *');
    private readonly hostChildElements = this.locatorForAll(':scope > *');
    private readonly containerChildElements =
        this.locatorForAll('#container > *');
    private readonly labelChildElements = this.locatorForAll('#label > *');

    private readonly containerElement = this.locatorFor('#container');
    private readonly labelElement = this.locatorForOptional('#label');
    private readonly iconElement = this.locatorForOptional('#icon');

    async containsLabel() {
        return !!(await this.labelElement());
    }

    async containsIcon() {
        return !!(await this.iconElement());
    }

    async getLabel() {
        const label = await this.labelElement();
        if (!label) return undefined;
        const disabled = await label.hasClass('disabled');
        const loading = await label.hasClass('skeleton-loader');
        const text = await label.text();
        return { text, loading, disabled };
    }

    async getIcon() {
        const icon = await this.iconElement();
        if (!icon) return undefined;
        const disabled = await icon.hasClass('disabled');
        const loading = await icon.hasClass('skeleton-loader');
        const name = await icon.getProperty('innerText');
        return { name, loading, disabled };
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
    async triggerTouch() {
        const container = await this.getContainer();
        await container.dispatchEvent('pointerdown', {
            pointerType: 'touch',
            button: 0,
        });
    }

    async getHostChildTagNames(): Promise<string[]> {
        const childElements = await this.hostChildElements();
        const tagNames: string[] = [];
        for (const childElement of childElements) {
            const tag = (
                (await childElement.getProperty('tagName')) as string
            ).toLowerCase();
            tagNames.push(tag);
        }
        return tagNames;
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

    async getContainersClasses() {
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

    async getChildElement() {
        return this.hostChildElement();
    }

    async getChildElements() {
        return this.hostChildElements();
    }

    async getText(): Promise<string> {
        const host = await this.host();
        return host.text();
    }

    async getErrors() {
        const errors: string[] = [];

        // container

        const hostChildren = await this.hostChildElements();
        if (hostChildren.length != 1) {
            errors.push(
                `APP-ROW-ITEM Host should have 1 child. Found ${hostChildren.length}.`,
            );
        }

        const hostChildTagName = await hostChildren[0].getProperty('tagName');
        if (hostChildTagName != 'DIV') {
            errors.push(
                `Invalid APP-ROW-ITEM host child. Expected DIV. Found ${hostChildTagName}.`,
            );
        }

        const hostChildId = await hostChildren[0].getProperty('id');
        if (hostChildId != 'container') {
            errors.push(
                `Invalid APP-ROW-ITEM host child id. Expected "container". Found "${hostChildId}".`,
            );
        }

        // container children

        const showLabel = await this.containsLabel();
        const showIcon = await this.containsIcon();
        const containerChildren = await this.containerChildElements();
        if (showIcon && showLabel) {
            if (containerChildren.length != 2) {
                errors.push(
                    `APP-ROW-ITEM container should have 2 children. Found ${containerChildren.length}`,
                );
            }
        } else if (showIcon || showLabel) {
            if (containerChildren.length != 1) {
                errors.push(
                    `APP-ROW-ITEM container should contain 1 child. Found ${containerChildren.length}.`,
                );
            }
        } else {
            if (containerChildren.length) {
                errors.push(
                    `APP-ROW-ITEM container should contain 0 children. Found ${containerChildren.length}.`,
                );
            }
        }

        // icon

        if (showIcon) {
            const secondContainerChild = containerChildren[0];
            const secondContainerChildTagName =
                await secondContainerChild.getProperty('tagName');
            if (secondContainerChildTagName != 'MAT-ICON') {
                errors.push(
                    `Invalid APP-ROW-ITEM second container child. Expected MAT-ICON. $Found ${secondContainerChildTagName}.`,
                );
            }

            const secondContainerChildId =
                await secondContainerChild.getProperty('id');
            if (secondContainerChildId != 'icon') {
                errors.push(
                    `Invalid APP-ROW-ITEM second container child id. Expected "arrow". Found "${secondContainerChildId}".`,
                );
            }
            const iconName = await secondContainerChild.text(); // TODO: ?
        }

        // label

        if (showLabel) {
            const firstContainerChild = containerChildren[showIcon ? 1 : 0];
            const firstContainerChildTagName =
                await firstContainerChild.getProperty('tagName');
            if (firstContainerChildTagName != 'SPAN') {
                errors.push(
                    `Invalid APP-ROW-ITEM first container child. Expected SPAN. Found ${firstContainerChildTagName}`,
                );
            }
            const firstContainerChildId =
                await firstContainerChild.getProperty('id');
            if (firstContainerChildId != 'label') {
                errors.push(
                    `Invalid APP-ROW-ITEM container child id. Expected "label". Found "${firstContainerChildId}".`,
                );
            }
            const labelChildren = await this.labelChildElements();
            if (labelChildren.length) {
                errors.push('APP-ROW-ITEM label should not have children.');
            }
        }

        return errors;
    }

    async getState(): Promise<{
        errors?: string[];
        icon?: { name: string; loading: boolean; disabled: boolean };
        label?: { text: string; loading: boolean; disabled: boolean };
    }> {
        const errors = await this.getErrors();
        const icon = await this.getIcon();
        const label = await this.getLabel();
        const result: any = {};
        if (errors.length) {
            result.errors = errors;
        }
        if (icon) {
            result.icon = icon;
        }
        if (label) {
            result.label = label;
        }
        return result;
    }
}

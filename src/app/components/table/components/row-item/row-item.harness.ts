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
        return { direction, disabled };
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

        // container children

        const showLabel = await this.containsLabel();
        const showIcon = await this.containsIcon();
        const containerChildren = await this.containerChildElements();
        if (showIcon && showLabel) {
            if (containerChildren.length != 2) {
                errors['invalidContainerChildCount'] =
                    `Container should have two children.`;
            }
        } else if (showIcon || showLabel) {
            if (containerChildren.length != 1) {
                errors['invalidContainerChildCount'] =
                    `Container should contain 1 child. Found ${containerChildren.length}.`;
            }
        } else {
            if (containerChildren.length) {
                errors['invalidContainerChildCount'] =
                    `Container should contain 0 children. Found ${containerChildren.length}.`;
            }
        }

        // icon

        if (showIcon) {
            const secondContainerChild = containerChildren[0];
            const secondContainerChildTagName =
                await secondContainerChild.getProperty('tagName');
            if (secondContainerChildTagName != 'MAT-ICON') {
                errors['invalidSecondContainerChild'] =
                    `Second container child should be a MAT-ICON. $Found ${secondContainerChildTagName}.`;
            }

            const secondContainerChildId =
                await secondContainerChild.getProperty('id');
            if (secondContainerChildId != 'icon') {
                errors['invalidSecondContainerChildId'] =
                    `Second container child should have id "arrow". Found "${secondContainerChildId}".`;
            }
            const iconName = await secondContainerChild.text();
        }

        // label

        if (showLabel) {
            const firstContainerChild = containerChildren[showIcon ? 1 : 0];

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
                errors['invalidLabelChildren'] =
                    'Label should not have children.';
            }
        }

        return Object.keys(errors).length == 0 ? true : errors;
    }

    async getState() {
        const hasValidStructure = await this.hasValidStructure();
        const label = await this.getLabel();
        const icon = await this.getIcon();
        if (icon) {
            if (label) {
                return { hasValidStructure, icon, label };
            } else {
                return { hasValidStructure, icon };
            }
        } else if (label) {
            return { hasValidStructure, label };
        }
        return { hasValidStructure };
    }
}

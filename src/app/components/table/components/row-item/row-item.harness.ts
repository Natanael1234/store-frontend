import { ComponentHarness } from '@angular/cdk/testing';
import { MatIconHarness } from '@angular/material/icon/testing';

export class RowItemHarness extends ComponentHarness {
    static hostSelector = 'app-row-item';

    private readonly childElement = this.locatorFor(':scope > *');
    private readonly childElements = this.locatorForAll(':scope > *');

    private readonly containerElement = this.locatorForAll('#container');

    private readonly containerChildElements =
        this.locatorForAll('#container > *');

    private readonly iconElement = this.locatorForAll('#container > mat-icon');

    private readonly iconHarnesses = this.locatorForAll(MatIconHarness);

    async getHostChildTagNames(): Promise<string[]> {
        const childElements = await this.childElements();
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
        const childElements = await this.childElements();
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
        const childElements = await this.childElements();
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
        return this.childElement();
    }

    async getChildElements() {
        return this.childElements();
    }

    async getText(): Promise<string> {
        const host = await this.host();
        return host.text();
    }
}

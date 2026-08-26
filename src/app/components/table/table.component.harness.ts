import { ComponentHarness } from '@angular/cdk/testing';
import { TableHarness } from '@components/table/test/table.harness';

export class TableComponentHarness extends ComponentHarness {
    static hostSelector = 'app-table';

    private readonly table = this.locatorFor(TableHarness);
    private readonly hostChild = this.locatorFor(':scope > *');
    private readonly hostChildren = this.locatorForAll(':scope > *');
    private readonly tableChildren = this.locatorForAll('table > *');

    async getHostChildTagNames(): Promise<string[]> {
        const childElements = await this.hostChildren();
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
        const childElements = await this.hostChildren();
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
        const containerChildElements = await this.tableChildren();
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

    async getContainersClasses() {
        const childElements = await this.hostChildren();
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
        return this.hostChild();
    }

    async getChildElements() {
        return this.hostChildren();
    }

    async getText(): Promise<string> {
        const host = await this.host();
        return host.text();
    }

    async getErrors() {
        const errors: string[] = [];
        const hostChildren = await this.hostChildren();
        if (hostChildren.length != 1) {
            errors.push(
                `Host should have 1 child. Found ${hostChildren.length}.`,
            );
        }
        const tagName = await hostChildren[0].getProperty('tagName');
        if (tagName != 'TABLE') {
            errors.push(
                `Invalid HOST child. Expected TABLE. Found ${tagName}.`,
            );
        }

        const table = await this.table();
        const tableErrors = await table.getErrors();
        errors.push(...tableErrors);

        return errors;
    }

    async getState() {
        const state: any = {};
        const errors = await this.getErrors();
        if (errors.length) {
            state.errors = errors;
        }
        const tableHarness = await this.table();
        const { headers, rows } = await tableHarness.getState();
        state.headers = headers;
        state.rows = rows;
        return state;
    }
}

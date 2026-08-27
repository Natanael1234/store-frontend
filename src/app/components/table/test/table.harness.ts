import { ComponentHarness } from '@angular/cdk/testing';
import { TBodyHarness } from '@components/table/test/tbody.harness';
import { TFootHarness } from '@components/table/test/tfoot.harness';
import { THeadHarness } from '@components/table/test/thead.harness';

export class TableHarness extends ComponentHarness {
    static hostSelector = 'table';

    private readonly hostChildren = this.locatorForAll(':scope > *');
    private readonly theads = this.locatorForAll(THeadHarness);
    private readonly tbodies = this.locatorForAll(TBodyHarness);
    private readonly tfoots = this.locatorForAll(TFootHarness);

    async getErrors() {
        const errors: string[] = [];
        const hostChildren = await this.hostChildren();
        if (hostChildren.length != 3) {
            errors.push(
                `TABLE child count should be 3. Found ${hostChildren.length}.`,
            );
        }
        // thead
        const firstTableChildTabName =
            await hostChildren[0].getProperty('tagName');
        if (firstTableChildTabName != 'THEAD') {
            errors.push(
                `Invalid TABLE child. Expected THEAD. Found ${firstTableChildTabName}.`,
            );
        }
        // tbody
        const secondTableChildTabName =
            await hostChildren[1].getProperty('tagName');
        if (secondTableChildTabName != 'TBODY') {
            errors.push(
                `Invalid TABLE child. Expected TBODY. Found ${secondTableChildTabName}.`,
            );
        }
        // tfoot
        const thirdTableChildTabName =
            await hostChildren[2].getProperty('tagName');
        if (thirdTableChildTabName != 'TFOOT') {
            errors.push(
                `Invalid TABLE child. Expected TFOOT. Found ${thirdTableChildTabName}.`,
            );
        }

        // header
        const theads = await this.theads();
        if (theads.length > 1) {
            errors.push(`TABLE should have 1 THEAD. Found ${theads.length}.`);
        }
        const headerErrors = await theads[0].getErrors();
        errors.push(...headerErrors);

        // body
        const tbodies = await this.tbodies();
        if (tbodies.length > 1) {
            errors.push(`TABLE should have 1 TBODY. Found ${tbodies.length}.`);
        }
        const bodyErrors = await tbodies[0].getErrors();
        errors.push(...bodyErrors);

        // footer
        const tfoots = await this.tfoots();
        if (tfoots.length > 1) {
            errors.push(`TABLE should have 1 TFOOT. Found ${tfoots.length}.`);
        }
        const footerErrors = await tfoots[0].getErrors();
        errors.push(...footerErrors);

        return errors;
    }

    async getState(): Promise<{
        headers: {
            label: { text: string; disabled: boolean };
            icon?: {
                disabled: boolean;
                direction: 'asc' | 'desc' | 'hidden' | undefined;
            };
            shrink: boolean;
        }[][];
        rows: {
            icon?: { name: string; loading: boolean; disabled: boolean };
            label: { text: string; loading: boolean; disabled: boolean };
            shrink: boolean;
        }[][];
    }> {
        const treads = await this.theads();
        const tbodies = await this.tbodies();
        const headers = await treads[0].getState();
        const rows = await tbodies[0].getState();
        const state: any = { headers, rows };
        return state;
    }
}

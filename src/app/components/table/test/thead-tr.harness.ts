import { ComponentHarness } from '@angular/cdk/testing';
import { ThHarness } from '@components/table/test/th.harness';

export class THeadTRHarness extends ComponentHarness {
    static hostSelector = 'tr';

    private readonly hostChildren = this.locatorForAll(':scope > *');
    private readonly ths = this.locatorForAll(ThHarness);

    async getErrors() {
        const errors: string[] = [];
        const children = await this.hostChildren();
        for (const child of children) {
            const tagName = await child.getProperty('tagName');
            if (tagName != 'TH') {
                errors.push(
                    `Invalid HOST child. Expected TH. Found ${tagName}.`,
                );
            }
        }
        const cells = await this.ths();
        for (const cell of cells) {
            const cellError = await cell.getErrors();
            errors.push(...cellError);
        }
        return errors;
    }

    async getState() {
        const ths = await this.ths();
        const headers: {
            label: {
                text: string;
                disabled: boolean;
            };
            icon?: {
                disabled: boolean;
                direction: 'asc' | 'desc' | 'hidden' | undefined;
            };
            shrink: boolean;
        }[] = [];
        for (const th of ths) {
            const thState = await th.getState();
            headers.push(thState);
        }
        return headers;
    }
}

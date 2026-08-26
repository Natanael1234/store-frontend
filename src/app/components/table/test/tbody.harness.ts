import { ComponentHarness } from '@angular/cdk/testing';
import { TBodyTrHarness } from '@components/table/test/tbody-tr.harness';

export class TBodyHarness extends ComponentHarness {
    static hostSelector = 'tbody';

    private readonly hostChildren = this.locatorForAll(':scope > *');
    private readonly trs = this.locatorForAll(TBodyTrHarness);

    async getErrors() {
        const errors: string[] = [];
        const tbodyChildren = await this.hostChildren();
        for (const tbodyChild of tbodyChildren) {
            const tbodyChildTagName = await tbodyChild.getProperty('tagName');
            if (tbodyChildTagName != 'TR') {
                errors.push(
                    `Invalid TBODY child. Expected TR. Found ${tbodyChildTagName}.`,
                );
            }
        }
        const rows = await this.trs();
        for (const row of rows) {
            const rowErrors = await row.getErrors();
            errors.push(...rowErrors);
        }
        return errors;
    }

    async getState(): Promise<
        {
            icon?: {
                direction: 'asc' | 'desc' | 'hidden' | undefined;
                disabled: boolean;
            };
            label?: { text: string; disabled: boolean };
            shrink: boolean;
        }[][]
    > {
        const trs = await this.trs();
        const state: any[][] = [];
        for (const tr of trs) {
            const trState = await tr.getState();
            state.push(trState);
        }
        return state;
    }
}

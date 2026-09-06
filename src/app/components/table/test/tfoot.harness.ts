import { ComponentHarness } from '@angular/cdk/testing';

export class TFootHarness extends ComponentHarness {
    static hostSelector = 'tfoot';

    private readonly hostChildren = this.locatorForAll(':scope > *');

    async getErrors() {
        const errors: string[] = [];
        const tfootChildren = await this.hostChildren();
        if (tfootChildren.length != 0) {
            errors.push(
                `Expected TFOOT had 0 child. Found ${tfootChildren.length}.`,
            );
        }
        return errors;
    }
}

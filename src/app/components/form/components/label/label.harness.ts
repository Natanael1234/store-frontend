import { ComponentHarness } from '@angular/cdk/testing';

export class LabelHarness extends ComponentHarness {
    static hostSelector = 'mat-label.app-form-label';

    async getText(): Promise<string> {
        const host = await this.host();
        return host.text();
    }

    async getState() {
        const text = await this.getText();
        return { text, hasValidStructure: true };
    }
}

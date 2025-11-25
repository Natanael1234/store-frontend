import { ComponentHarness } from '@angular/cdk/testing';

export class DividerHarness extends ComponentHarness {
    static hostSelector = 'mat-divider.app-divider';

    /** Retorna se o divider está na vertical */
    async isVertical(): Promise<boolean> {
        return (await this.host()).hasClass('mat-divider-vertical');
    }

    /** Retorna se o divider está inset */
    async isInset(): Promise<boolean> {
        return (await this.host()).hasClass('mat-divider-inset');
    }
}

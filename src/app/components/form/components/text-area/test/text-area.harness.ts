import { ComponentHarness } from '@angular/cdk/testing';
import {
    MatErrorHarness,
    MatFormFieldHarness,
} from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';

export class TextAreaFieldHarness extends ComponentHarness {
    static hostSelector = 'app-text-area-field';

    /** Harnesses filhos */

    private fieldHarness = this.locatorFor(MatFormFieldHarness);
    private labelHarness = this.locatorFor(MatFormFieldHarness);
    private textAreaHarness = this.locatorFor(MatInputHarness);
    private errorHarness = this.locatorForOptional(MatErrorHarness);

    private fieldHarnesses = this.locatorForAll(MatFormFieldHarness);
    private labelHarnessess = this.locatorForAll(MatFormFieldHarness);
    private textAreaHarnesses = this.locatorForAll(MatInputHarness);
    private errorHarnesses = this.locatorForAll(MatErrorHarness);

    private fieldElement = this.locatorFor('mat-form-field');
    private labelElement = this.locatorFor('mat-label');
    private prefixElement = this.locatorForOptional('[matTextPrefix]');
    private textAreaElement = this.locatorFor('textarea');
    private errorElement = this.locatorForOptional('mat-error');

    private fieldElements = this.locatorForAll('mat-form-field');
    private labelElements = this.locatorForAll('mat-label');
    private textAreaElements = this.locatorForAll('textarea');
    private errorElements = this.locatorForAll('mat-error');

    private hostChildrenElements = this.locatorForAll(':scope > *');

    async getTextAreaHarness() {
        return await this.textAreaHarness();
    }

    async getTextAreasHarnesses() {
        return await this.textAreaHarnesses();
    }

    async getHostChildrenCount() {
        return (await this.hostChildrenElements()).length;
    }

    async getLabelCount() {
        return (await this.labelHarnessess()).length;
    }

    async getTextAreaCount() {
        return (await this.textAreaElements()).length;
    }

    async getErrorCount() {
        return (await this.errorHarnesses()).length;
    }

    async isHostChildrenAField() {
        const hostChildren = await this.hostChildrenElements();
        if (hostChildren.length < 1) return false;
        const tagName = await hostChildren[0].getProperty('tagName');
        return tagName == 'MAT-FORM-FIELD';
    }

    async getErrors() {
        const field = await this.fieldHarness();
        return await field.getErrors();
    }

    async getFieldppearance() {
        const field = await this.fieldHarness();
        return await field.getAppearance();
    }

    async getLabelText(): Promise<string | null> {
        const field = await this.fieldHarness();
        return field.getLabel();
    }

    async getTextAreaPlaceholder(): Promise<string> {
        const textArea = await this.textAreaHarness();
        return textArea.getPlaceholder();
    }

    async getTextAreaType() {
        const textArea = await this.textAreaHarness();
        return textArea.getType();
    }

    async getTextAreaValue(): Promise<string> {
        const textArea = await this.textAreaHarness();
        return textArea.getValue();
    }

    async setTextAreaValue(value: string): Promise<void> {
        const textArea = await this.textAreaHarness();
        await textArea.setValue(value);
    }

    async getTextAreaTabIndex() {
        const textArea = await this.textAreaHarness();
        const host = await textArea.host();
        return await host.getAttribute('tabindex');
    }

    async isTextAreaDisabled(): Promise<boolean> {
        const textArea = await this.textAreaHarness();
        return textArea.isDisabled();
    }

    async blurTextArea(): Promise<void> {
        const textArea = await this.textAreaHarness();
        await textArea.blur();
    }

    async focusTextArea(): Promise<void> {
        const textArea = await this.textAreaHarness();
        await textArea.focus();
    }

    async getTextAreaId(): Promise<string> {
        const textArea = await this.textAreaHarness();
        const host = await textArea.host();
        return (await host.getAttribute('id')) ?? '';
    }

    async getTextAreaMinLength() {
        const textArea = await this.textAreaHarness();
        const host = await textArea?.host();
        const minLength = host?.getAttribute('minlength');
        return minLength ?? null;
    }

    async getTextAreaMaxLength() {
        const textArea = await this.textAreaHarness();
        const host = await textArea?.host();
        const minLength = host?.getAttribute('maxLength');
        return minLength ?? null;
    }

    async getTextAreaAutosizeMinRows() {
        const textArea = await this.textAreaHarness();
        const host = await textArea?.host();
        const autosizeMinRows = host?.getAttribute('cdkAutosizeMinRows');
        return autosizeMinRows ?? null;
    }

    async getTextAreaAutosizeMaxRows() {
        const textArea = await this.textAreaHarness();
        const host = await textArea?.host();
        const autosizeMaxRows = host?.getAttribute('cdkAutosizeMaxRows');
        return autosizeMaxRows ?? null;
    }

    async getColSizesClasses() {
        const classes = await this.getClasses();
        const filteredClasses = classes.filter((clazz) =>
            clazz.match(/^col\-(1|2|3|4|5|6|7|8|9|10|11|12)$/),
        );
        return filteredClasses;
    }

    async getColOffsetClasses() {
        const classes = await this.getClasses();
        const filteredClasses = classes.filter((clazz) =>
            clazz.match(/^offset\-(1|2|3|4|5|6|7|8|9|10|11|12|13)$/),
        );
        return filteredClasses;
    }

    async getClasses(): Promise<string[]> {
        const host = await this.host();
        const clazzStr = await host.getAttribute('class');
        const classes = clazzStr?.split(' ') ?? [];
        return classes;
    }
}

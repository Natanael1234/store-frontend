import { ComponentHarness } from '@angular/cdk/testing';
import {
    MatErrorHarness,
    MatFormFieldHarness,
} from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';

type TextAreaState = {
    id: string;
    value: string;
    label: string | null;
    placeholder: string;
    isFocusable: boolean;
    isFocused: boolean;
    isReadOnly: boolean;
    minLength: number | null;
    maxLength: number | null;
    autosizeMinRows: number | null;
    autosizeMaxRows: number | null;
    errors: string[];
    hasValidStructure: boolean | { [key: string]: string };
};

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

    async isHostChildAField() {
        const hostChildren = await this.hostChildrenElements();
        if (hostChildren.length < 1) return false;
        const tagName = await hostChildren[0].getProperty('tagName');
        return tagName == 'MAT-FORM-FIELD';
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

    async getFieldAppearance() {
        const field = await this.fieldHarness();
        return await field.getAppearance();
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

    async istextAreaFocused(): Promise<boolean> {
        const textArea = await this.textAreaHarness();
        const focused = textArea.isFocused();
        return focused;
    }

    async isTextAreaReadOnly() {
        const textArea = await this.textAreaHarness();
        return await textArea.isReadonly();
    }

    async isTextAreaFocused(): Promise<boolean> {
        const textArea = await this.textAreaHarness();
        const focused = textArea.isFocused();
        return focused;
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

    async isTextAreaFocusable(): Promise<boolean> {
        const textArea = await this.textAreaHarness();
        const host = await textArea.host();
        const tabIndex = await host.getAttribute('tabindex');
        return tabIndex != '-1';
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

    async getClasses(): Promise<string[]> {
        const host = await this.host();
        const clazzStr = await host.getAttribute('class');
        const classes = clazzStr?.split(' ') ?? [];
        return classes;
    }

    async hasValidStructure(): Promise<boolean | { [key: string]: string }> {
        const errors: any = {};

        const hasValidChildrenCount = (await this.getHostChildrenCount()) == 1;
        if (!hasValidChildrenCount) {
            errors['hasValidChildrenCount'] =
                `Invalid children count: ${hasValidChildrenCount}.`;
        }

        const isHostChildAField = await this.isHostChildAField();
        if (!isHostChildAField) {
            errors['isHostChildAField'] =
                `Host child is not a field ${isHostChildAField}.`;
        }

        const appearance = await this.getFieldAppearance();
        const hasValidAppearance = appearance == 'outline'; // TODO: create a enum
        if (!hasValidAppearance) {
            errors['hasValidAppearance'] =
                `Has invalid field appearance: "${appearance}".`;
        }

        const labelCount = await this.getLabelCount();
        const hasValidLabelCount = labelCount == 1;
        if (!hasValidLabelCount) {
            errors['hasValidLabelCount'] =
                `Has invalid number of label elements ${labelCount}.`;
        }

        const texAreaCount = await this.getTextAreaCount();
        const hasValidTextAreaCount = texAreaCount == 1;
        if (!hasValidTextAreaCount) {
            errors['hasValidInputCount'] =
                `Has invalid number of text area elements : ${texAreaCount}.`;
        }

        const errorCount = await this.getErrorCount();
        const hasValidErrorCount = errorCount <= 1;
        if (!hasValidErrorCount) {
            errors['hasValidErrorCount'] =
                `Has invalid number of error elements ${errorCount}.`;
        }

        return Object.keys(errors).length == 0 ? true : errors;
    }

    async getState(): Promise<TextAreaState> {
        const id = await this.getTextAreaId()!;
        const value = await this.getTextAreaValue();
        const label = await this.getLabelText();
        const placeholder = await this.getTextAreaPlaceholder();
        const isFocusable = await this.isTextAreaFocusable();
        const isFocused = await this.isTextAreaFocused();
        const isReadOnly = await this.isTextAreaReadOnly();
        const _minLength = await this.getTextAreaMinLength();
        const minLength = _minLength != null ? Number(_minLength) : null;
        let _maxLength = await this.getTextAreaMaxLength();
        const maxLength = _maxLength != null ? Number(_maxLength) : null;
        let _autosizeMinRows = await this.getTextAreaAutosizeMinRows();
        const autosizeMinRows =
            _autosizeMinRows != null ? Number(_autosizeMinRows) : null;
        let _autosizeMaxRows = await this.getTextAreaAutosizeMaxRows();
        const autosizeMaxRows =
            _autosizeMaxRows != null ? Number(_autosizeMaxRows) : null;

        const _errors = await this.getErrors();
        const errors: string[] = [];
        for (const _error of _errors) {
            errors.push(await _error.getText());
        }
        const hasValidStructure = await this.hasValidStructure();

        const state = {
            id,
            value,
            label,
            placeholder,
            isFocusable,
            isFocused,
            isReadOnly,
            minLength,
            maxLength,
            autosizeMinRows,
            autosizeMaxRows,
            errors,
            hasValidStructure,
        };
        return state;
    }
}

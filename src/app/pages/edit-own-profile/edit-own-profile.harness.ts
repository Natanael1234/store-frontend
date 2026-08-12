import { ComponentHarness } from '@angular/cdk/testing';
import { MatProgressBarHarness } from '@angular/material/progress-bar/testing';
import { isEqual } from 'lodash';
import { AlertHarness } from '../../components/alert/alert.harness';
import { ButtonHarness } from '../../components/form/components/button/button.harness';
import { TextFieldHarness } from '../../components/form/components/text/text-field/text-field.harness';

type TextFieldState = {
    hasValidStructure: boolean | { [key: string]: string };
};

export class EditOwnProfileHarness extends ComponentHarness {
    static hostSelector = 'app-edit-own-profile';

    private readonly hostChildElement = this.locatorForOptional(':scope > *');
    private readonly hostChildrenElements = this.locatorForAll(':scope > *');
    private readonly wrapperChildrenElements = this.locatorForAll(
        ':scope > form > div > *',
    );
    private readonly buttonHarnesses = this.locatorForAll(ButtonHarness);

    private readonly formChildrenElements =
        this.locatorForAll(':scope > form > *');

    private progressBarHarness = this.locatorForOptional(MatProgressBarHarness);
    private alertHarness = this.locatorForOptional(AlertHarness);
    private textFieldHarnesses = this.locatorForAll(TextFieldHarness);

    async getHostChildrenCount() {
        return (await this.hostChildrenElements()).length;
    }

    async getHostChildTagName() {
        const child = await this.hostChildElement();
        const tagName = await child?.getProperty('tagName');
        return tagName;
    }

    async isHostChildAForm() {
        const tagName = await this.getHostChildTagName();
        const isForm = (await tagName) == 'FORM';
        return isForm;
    }

    async getFormClasses() {
        const form = await this.hostChildElement();
        const classStr = await form?.getAttribute('class');
        const classes = (classStr ?? '').split(' ') as string[];
        return classes;
    }

    async formIncludesGridClass() {
        const formClasses = await this.getFormClasses();
        const foundClass = formClasses.includes('grid');
        return foundClass;
    }

    async getFormChildren() {
        const children = await this.formChildrenElements();
        return children;
    }

    async getFormChildrenCount() {
        const children = await this.formChildrenElements();
        return children.length;
    }

    async getFormChildrenTagNames() {
        const children = await this.formChildrenElements();
        const tagsNames = await Promise.all(
            children.map(async (child) => await child.getProperty('tagName')),
        );
        return tagsNames as string[];
    }

    async getWrapperChildElements() {
        const formChildren = await this.wrapperChildrenElements();
        return formChildren;
    }

    async getInvalidChildrenTagNames() {
        const formChildTagNames = await this.getFormChildrenTagNames();
        const invalidFormChildTagNames = await formChildTagNames.filter(
            (tagName) => tagName !== 'DIV',
        );
        return invalidFormChildTagNames;
    }

    async getWrapperCols(): Promise<number[]> {
        const formChildrenEls = await this.formChildrenElements();
        const wrapperCols: any[] = [];
        for (let i = 0; i < formChildrenEls.length; i++) {
            const formChildrenEl = formChildrenEls[i];
            const col = (await formChildrenEl.getAttribute('col')) ?? '';
            if (col.trim() === '') {
                wrapperCols.push(undefined);
            } else if (!Number.isNaN(Number(col))) {
                wrapperCols.push(+col);
            } else {
                wrapperCols.push(undefined);
            }
        }
        return wrapperCols;
    }

    async getWrapperChildrenTagNames(): Promise<string[]> {
        const wrapperChildrenEls = await this.getWrapperChildElements();
        const wrapperChildtagNames: string[] = await Promise.all(
            wrapperChildrenEls.map(
                async (wrapperChildElement) =>
                    (await wrapperChildElement.getProperty(
                        'tagName',
                    )) as string,
            ),
        );
        return wrapperChildtagNames;
    }

    async getProgressBarHarness() {
        return this.progressBarHarness();
    }

    async getAlertHarness() {
        const alertHarness = await this.alertHarness();
        return alertHarness;
    }

    async getNameFieldHarness() {
        const textFieldsHarnesses = await this.textFieldHarnesses();
        return textFieldsHarnesses[0];
    }

    async getButtonHarnesses() {
        return this.buttonHarnesses();
    }

    async getButtonById(id: string) {
        const buttonHarnesses = await this.getButtonHarnesses();
        for (const buttonHarness of buttonHarnesses) {
            if ((await buttonHarness.getId()) == id) {
                return buttonHarness;
            }
        }
        return null;
    }

    async getSaveButton() {
        return this.getButtonById('save-button');
    }

    async getCancelBtton() {
        return this.getButtonById('cancel-button');
    }

    async clickSaveButton() {
        const button = await this.getSaveButton()!;
        await button!.click();
    }

    async clickCancelButton() {
        const button = await this.getCancelBtton()!;
        await button!.click();
    }

    async getMainError() {
        const alertHarness = await this.getAlertHarness();
        const message = alertHarness?.getTextMessage();
        return message;
    }

    async getNameValue() {
        const field = await this.getNameFieldHarness();
        const value = await field.getInputValue();
        return value;
    }

    async setNameValue(value: string) {
        const field = await this.getNameFieldHarness();
        await field.setInputValue(value);
    }

    async getNameError() {
        const field = await this.getNameFieldHarness();
        const error = await field.getErrorMessage();
        return error;
    }

    async getValues() {
        const values = { name: await this.getNameValue() };
        return values;
    }

    async setValues(values: { name: string }) {
        await this.setNameValue(values.name);
    }

    async getErrors() {
        const main = await this.getMainError();
        const name = await this.getNameError();

        const values: { main?: string; name?: string } = {};

        if (main != undefined) {
            values.main = main;
        }
        if (name != undefined) {
            values.name = name;
        }

        return values;
    }

    async hasValidStructure(): Promise<boolean | { [key: string]: string }> {
        const errors: any = {};

        const hasValidChildrenCount = (await this.getHostChildrenCount()) == 1;
        if (!hasValidChildrenCount) {
            errors['hasValidChildrenCount'] =
                `Invalid children count: ${hasValidChildrenCount}.`;
        }

        const hostChildTagName = await this.getHostChildTagName();
        if (hostChildTagName !== 'FORM') {
            errors['isHostChildAForm'] =
                `Host child should be a form. Found: ${hostChildTagName}.`;
        }

        if (!(await this.formIncludesGridClass())) {
            errors['gridClassMissingFromTheForm'] =
                `Grid class missing from the form.`;
        }

        const formChildrenCount = await this.getFormChildrenCount();
        if (formChildrenCount < 3 || formChildrenCount > 5) {
            errors['formChildCount'] =
                `Invalid form child count. Expected from 7 to 9. Found ${formChildrenCount}.`;
        }

        const invalidFormChildTagNames =
            await this.getInvalidChildrenTagNames();
        if (invalidFormChildTagNames.length) {
            errors['invalidFormChildTagName'] =
                `Invalid from children. Expected divs.  Found ${invalidFormChildTagNames}.`;
        }

        const wrapperChildtagNames = await this.getWrapperChildrenTagNames();
        const wrapperCols = await this.getWrapperCols();

        if (
            isEqual(wrapperChildtagNames, [
                'MAT-PROGRESS-BAR',
                'APP-ALERT',
                'APP-TEXT-FIELD',
                'APP-BUTTON',
                'APP-BUTTON',
            ])
        ) {
            if (!isEqual([12, 12, 12, 12, 12], wrapperCols)) {
                errors['invalidWrapperCols'] =
                    `Invalid form wrapper cols. Found ${JSON.stringify(wrapperCols)}.`;
            }
        } else if (
            isEqual(wrapperChildtagNames, [
                'MAT-PROGRESS-BAR',
                'APP-TEXT-FIELD',
                'APP-BUTTON',
                'APP-BUTTON',
            ])
        ) {
            if (!isEqual([12, 12, 12, 12], wrapperCols)) {
                errors['invalidWrapperCols'] =
                    `Invalid form wrapper cols. Found ${JSON.stringify(wrapperCols)}.`;
            }
        } else if (
            isEqual(wrapperChildtagNames, [
                'APP-ALERT',
                'APP-TEXT-FIELD',
                'APP-BUTTON',
                'APP-BUTTON',
            ])
        ) {
            if (!isEqual([12, 12, 12, 12], wrapperCols)) {
                errors['invalidWrapperCols'] =
                    `Invalid form wrapper cols. Found ${JSON.stringify(wrapperCols)}.`;
            }
        } else if (
            isEqual(wrapperChildtagNames, [
                'APP-TEXT-FIELD',
                'APP-BUTTON',
                'APP-BUTTON',
            ])
        ) {
            if (!isEqual([12, 12, 12], wrapperCols)) {
                errors['invalidWrapperCols'] =
                    `Invalid form wrapper cols. Found ${JSON.stringify(wrapperCols)}.`;
            }
        } else {
            errors['invalidWrapperChildren'] =
                `Invalid wrapper children. Found ${wrapperChildtagNames}.`;
        }

        return Object.keys(errors).length == 0 ? true : errors;
    }

    async getState(): Promise<TextFieldState> {
        const hasValidStructure = await this.hasValidStructure();

        const state = { hasValidStructure };
        return state;
    }
}

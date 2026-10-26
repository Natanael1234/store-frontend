import { ComponentHarness } from '@angular/cdk/testing';
import { MatProgressBarHarness } from '@angular/material/progress-bar/testing';
import { AlertHarness } from '@components/alert/alert.harness';
import { ButtonHarness } from '@components/form/components/button/button.harness';
import { PasswordFieldHarness } from '@components/form/components/text/password-field/password-field.harness';
import { isEqual } from 'lodash';

type NewPasswordState = {
    hasValidStructure: boolean | { [key: string]: string };
};

export class NewPasswordHarness extends ComponentHarness {
    public static hostSelector = 'app-new-password';

    private readonly hostChildElement = this.locatorForOptional(':scope > *');
    private readonly hostChildrenElements = this.locatorForAll(':scope > *');
    private readonly wrapperChildrenElements = this.locatorForAll(':scope > form > div > *');

    private readonly buttonHarnesses = this.locatorForAll(ButtonHarness);
    private readonly formChildrenElements = this.locatorForAll(':scope > form > *');

    private readonly progressBarHarness = this.locatorForOptional(MatProgressBarHarness);
    private readonly alertHarness = this.locatorForOptional(AlertHarness);
    private readonly passwordFieldHarnesses = this.locatorForAll(PasswordFieldHarness);

    public async getHostChildrenCount(): Promise<number> {
        return (await this.hostChildrenElements()).length;
    }

    public async getHostChildTagName(): Promise<string | undefined> {
        const child = await this.hostChildElement();
        if (!child) return undefined;
        return (await child.getProperty('tagName')) as string;
    }

    public async isHostChildAForm(): Promise<boolean> {
        const tagName = await this.getHostChildTagName();
        return tagName === 'FORM';
    }

    public async getFormClasses(): Promise<string[]> {
        const form = await this.hostChildElement();
        if (!form) return [];
        const classStr = await form.getAttribute('class');
        return (classStr ?? '').split(' ') as string[];
    }

    public async formIncludesGridClass(): Promise<boolean> {
        const formClasses = await this.getFormClasses();
        return formClasses.includes('grid');
    }

    public async getFormChildren() {
        return await this.formChildrenElements();
    }

    public async getFormChildrenCount(): Promise<number> {
        const children = await this.formChildrenElements();
        return children.length;
    }

    public async getFormChildrenTagNames(): Promise<string[]> {
        const children = await this.formChildrenElements();
        const tagsNames = await Promise.all(
            children.map(async (child) => (await child.getProperty('tagName')) as string),
        );
        return tagsNames;
    }

    public async getWrapperChildElements() {
        return await this.wrapperChildrenElements();
    }

    public async getInvalidChildrenTagNames(): Promise<string[]> {
        const formChildTagNames = await this.getFormChildrenTagNames();
        return formChildTagNames.filter((tagName) => tagName !== 'DIV');
    }

    public async getWrapperCols(): Promise<(number | undefined)[]> {
        const formChildrenEls = await this.formChildrenElements();
        const wrapperCols: (number | undefined)[] = [];
        for (const formChildrenEl of formChildrenEls) {
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

    public async getWrapperChildrenTagNames(): Promise<string[]> {
        const wrapperChildrenEls = await this.getWrapperChildElements();
        const wrapperChildtagNames: string[] = await Promise.all(
            wrapperChildrenEls.map(
                async (wrapperChildElement) =>
                    (await wrapperChildElement.getProperty('tagName')) as string,
            ),
        );
        return wrapperChildtagNames;
    }

    public async getProgressBarHarness() {
        return await this.progressBarHarness();
    }

    public async getAlertHarness() {
        return await this.alertHarness();
    }

    public async getPasswordFieldHarness() {
        const textFieldsHarnesses = await this.passwordFieldHarnesses();
        return textFieldsHarnesses[0];
    }

    public async getRepeatPasswordFieldHarness() {
        const textFieldsHarnesses = await this.passwordFieldHarnesses();
        return textFieldsHarnesses[1];
    }

    public async getButtonHarnesses() {
        return await this.buttonHarnesses();
    }

    public async getButtonById(id: string): Promise<ButtonHarness | null> {
        const buttonHarnesses = await this.getButtonHarnesses();
        for (const buttonHarness of buttonHarnesses) {
            if ((await buttonHarness.getId()) === id) {
                return buttonHarness;
            }
        }
        return null;
    }

    public async getSaveButton() {
        return await this.getButtonById('save-button');
    }

    public async getCancelButton() {
        return await this.getButtonById('cancel-button');
    }

    public async clickSaveButton(): Promise<void> {
        const button = await this.getSaveButton();
        if (button) await button.click();
    }

    public async clickCancelButton(): Promise<void> {
        const button = await this.getCancelButton();
        if (button) await button.click();
    }

    public async getMainError(): Promise<string | undefined> {
        const alertHarness = await this.getAlertHarness();
        return alertHarness ? await alertHarness.getTextMessage() : undefined;
    }

    public async getPasswordValue(): Promise<string> {
        const field = await this.getPasswordFieldHarness();
        return await field.getInputValue();
    }

    public async setPasswordValue(value: string): Promise<void> {
        const field = await this.getPasswordFieldHarness();
        await field.setInputValue(value);
    }

    public async getPasswordError(): Promise<string | undefined> {
        const field = await this.getPasswordFieldHarness();
        return await field.getErrorMessage();
    }

    public async getRepeatPasswordValue(): Promise<string> {
        const field = await this.getRepeatPasswordFieldHarness();
        return await field.getInputValue();
    }

    public async setRepeatPasswordValue(value: string): Promise<void> {
        const field = await this.getRepeatPasswordFieldHarness();
        await field.setInputValue(value);
    }

    public async getRepeatPasswordError(): Promise<string | undefined> {
        const field = await this.getRepeatPasswordFieldHarness();
        return await field.getErrorMessage();
    }

    public async getValues() {
        return {
            password: await this.getPasswordValue(),
            repeatPassword: await this.getRepeatPasswordValue(),
        };
    }

    public async setValues(values: { password: string; repeatPassword: string }): Promise<void> {
        await this.setPasswordValue(values.password);
        await this.setRepeatPasswordValue(values.repeatPassword);
    }

    public async getErrors() {
        const main = await this.getMainError();
        const password = await this.getPasswordError();
        const repeatPassword = await this.getRepeatPasswordError();

        const values: {
            main?: string;
            password?: string;
            repeatPassword?: string;
        } = {};

        if (main !== undefined) {
            values.main = main;
        }
        if (password !== undefined) {
            values.password = password;
        }
        if (repeatPassword !== undefined) {
            values.repeatPassword = repeatPassword;
        }
        return values;
    }

    public async hasValidStructure(): Promise<boolean | { [key: string]: string }> {
        const errors: { [key: string]: string } = {};

        const hasValidChildrenCount = (await this.getHostChildrenCount()) === 1;
        if (!hasValidChildrenCount) {
            errors['hasValidChildrenCount'] = `Invalid children count: ${hasValidChildrenCount}.`;
        }

        const hostChildTagName = await this.getHostChildTagName();
        if (hostChildTagName !== 'FORM') {
            errors['isHostChildAForm'] = `Host child should be a form. Found: ${hostChildTagName}.`;
        }

        if (!(await this.formIncludesGridClass())) {
            errors['gridClassMissingFromTheForm'] = `Grid class missing from the form.`;
        }

        const formChildrenCount = await this.getFormChildrenCount();
        if (formChildrenCount < 3 || formChildrenCount > 6) {
            errors['formChildCount'] =
                `Invalid form child count. Expected from 3 to 6. Found ${formChildrenCount}.`;
        }

        const invalidFormChildTagNames = await this.getInvalidChildrenTagNames();
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
                'APP-PASSWORD-FIELD',
                'APP-PASSWORD-FIELD',
                'APP-BUTTON',
                'APP-BUTTON',
            ])
        ) {
            if (!isEqual([12, 12, 12, 12, 12, 12], wrapperCols)) {
                errors['invalidWrapperCols'] =
                    `Invalid form wrapper cols. Found ${JSON.stringify(wrapperCols)}.`;
            }
        } else if (
            isEqual(wrapperChildtagNames, [
                'MAT-PROGRESS-BAR',
                'APP-PASSWORD-FIELD',
                'APP-PASSWORD-FIELD',
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
                'APP-ALERT',
                'APP-PASSWORD-FIELD',
                'APP-PASSWORD-FIELD',
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
                'APP-PASSWORD-FIELD',
                'APP-PASSWORD-FIELD',
                'APP-BUTTON',
                'APP-BUTTON',
            ])
        ) {
            if (!isEqual([12, 12, 12, 12], wrapperCols)) {
                errors['invalidWrapperCols'] =
                    `Invalid form wrapper cols. Found ${JSON.stringify(wrapperCols)}.`;
            }
        } else {
            errors['invalidWrapperChildren'] =
                `Invalid wrapper children. Found ${wrapperChildtagNames}.`;
        }

        return Object.keys(errors).length == 0 ? true : errors;
    }

    public async getState(): Promise<NewPasswordState> {
        const hasValidStructure = await this.hasValidStructure();
        return {
            hasValidStructure,
        };
    }
}

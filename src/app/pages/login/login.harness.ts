import { ComponentHarness } from '@angular/cdk/testing';
import { MatProgressBarHarness } from '@angular/material/progress-bar/testing';
import { AlertHarness } from '@components/alert/alert.harness';
import { ButtonHarness } from '@components/form/components/button/button.harness';
import { PasswordFieldHarness } from '@components/form/components/text/password-field/password-field.harness';
import { TextFieldHarness } from '@components/form/components/text/text-field/text-field.harness';
import { isEqual } from 'lodash';

type LoginState = {
    hasValidStructure: boolean | { [key: string]: string };
};

export class LoginHarness extends ComponentHarness {
    public static hostSelector = 'app-login';

    private readonly hostChildElement = this.locatorForOptional(':scope > *');
    private readonly hostChildrenElements = this.locatorForAll(':scope > *');
    private readonly wrapperChildrenElements = this.locatorForAll(':scope > form > div > *');
    private readonly buttonHarnesses = this.locatorForAll(ButtonHarness);

    private readonly formChildrenElements = this.locatorForAll(':scope > form > *');

    private readonly progressBarHarness = this.locatorForOptional(MatProgressBarHarness);
    private readonly alertHarness = this.locatorForOptional(AlertHarness);
    private readonly textFieldHarness = this.locatorFor(TextFieldHarness);
    private readonly passwordFieldHarness = this.locatorFor(PasswordFieldHarness);

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
            if (col.trim() === '' || Number.isNaN(Number(col))) {
                wrapperCols.push(undefined);
            } else {
                wrapperCols.push(+col);
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

    public async getEmailFieldHarness() {
        return this.textFieldHarness();
    }

    public async getPasswordFieldHarness() {
        return this.passwordFieldHarness();
    }

    public async getButtonHarnesseses() {
        return await this.buttonHarnesses();
    }

    public async getButtonById(id: string): Promise<ButtonHarness | null> {
        const buttonHarnesses = await this.getButtonHarnesseses();
        for (const buttonHarness of buttonHarnesses) {
            if ((await buttonHarness.getId()) === id) {
                return buttonHarness;
            }
        }
        return null;
    }

    public async getLoginButton() {
        return await this.getButtonById('login-button');
    }

    public async getRegisterButton() {
        return await this.getButtonById('register-button');
    }

    public async clickLoginButton(): Promise<void> {
        const button = await this.getLoginButton();
        if (button) await button.click();
    }

    public async clickRegisterButton(): Promise<void> {
        const button = await this.getRegisterButton();
        if (button) await button.click();
    }

    public async getMainError(): Promise<string | undefined> {
        const alertHarness = await this.getAlertHarness();
        return alertHarness ? await alertHarness.getTextMessage() : undefined;
    }

    public async getEmailValue(): Promise<string> {
        const field = await this.getEmailFieldHarness();
        return await field.getInputValue();
    }

    public async setEmailValue(value: string): Promise<void> {
        const field = await this.getEmailFieldHarness();
        await field.setInputValue(value);
    }

    public async getEmailrror(): Promise<string | undefined> {
        const field = await this.getEmailFieldHarness();
        return await field.getErrorMessage();
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

    public async getValues() {
        return {
            email: await this.getEmailValue(),
            password: await this.getPasswordValue(),
        };
    }

    public async setValues(values: { email: string; password: string }): Promise<void> {
        await this.setEmailValue(values.email);
        await this.setPasswordValue(values.password);
    }

    public async getErrors() {
        const main = await this.getMainError();
        const email = await this.getEmailrror();
        const password = await this.getPasswordError();

        const values: { main?: string; email?: string; password?: string } = {};

        if (main !== undefined) {
            values.main = main;
        }
        if (email !== undefined) {
            values.email = email;
        }
        if (password !== undefined) {
            values.password = password;
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
                `Invalid form children. Expected divs. Found ${invalidFormChildTagNames}.`;
        }

        const wrapperChildtagNames = await this.getWrapperChildrenTagNames();
        const wrapperCols = await this.getWrapperCols();

        const expectedSets = [
            [
                'MAT-PROGRESS-BAR',
                'APP-ALERT',
                'APP-TEXT-FIELD',
                'APP-PASSWORD-FIELD',
                'APP-BUTTON',
                'APP-BUTTON',
            ],
            [
                'MAT-PROGRESS-BAR',
                'APP-TEXT-FIELD',
                'APP-PASSWORD-FIELD',
                'APP-BUTTON',
                'APP-BUTTON',
            ],
            ['APP-ALERT', 'APP-TEXT-FIELD', 'APP-PASSWORD-FIELD', 'APP-BUTTON', 'APP-BUTTON'],
            ['APP-TEXT-FIELD', 'APP-PASSWORD-FIELD', 'APP-BUTTON', 'APP-BUTTON'],
        ];

        let matched = false;
        for (const set of expectedSets) {
            if (isEqual(wrapperChildtagNames, set)) {
                matched = true;
                const expectedCols = new Array(set.length).fill(12);
                if (!isEqual(expectedCols, wrapperCols)) {
                    errors['invalidWrapperCols'] =
                        `Invalid form wrapper cols. Found ${JSON.stringify(wrapperCols)}.`;
                }
                break;
            }
        }

        if (!matched) {
            errors['invalidWrapperChildren'] =
                `Invalid wrapper children. Found ${wrapperChildtagNames}.`;
        }

        return Object.keys(errors).length === 0 ? true : errors;
    }

    public async getState(): Promise<LoginState> {
        const hasValidStructure = await this.hasValidStructure();
        return {
            hasValidStructure,
        };
    }
}

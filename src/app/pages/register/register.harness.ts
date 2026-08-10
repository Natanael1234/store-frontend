import { ComponentHarness } from '@angular/cdk/testing';
import { isEqual } from 'lodash';
import { AlertHarness } from '../../components/alert/alert.harness';
import { ButtonHarness } from '../../components/form/components/button/button.harness';
import { CheckboxHarness } from '../../components/form/components/checkbox/checkbox.harness';
import { PasswordFieldHarness } from '../../components/form/components/text/password-field/password-field.harness';
import { TextFieldHarness } from '../../components/form/components/text/text-field/text-field.harness';

type TextFieldState = {
    hasValidStructure: boolean | { [key: string]: string };
};

export class RegisterHarness extends ComponentHarness {
    static hostSelector = 'app-register';

    private readonly hostChildElement = this.locatorForOptional(':scope > *');
    private readonly hostChildrenElements = this.locatorForAll(':scope > *');
    private readonly wrapperChildrenElements = this.locatorForAll(
        ':scope > form > div > *',
    );
    private readonly buttonHarnesses = this.locatorForAll(ButtonHarness);

    private readonly formChildrenElements =
        this.locatorForAll(':scope > form > *');

    private alertHarness = this.locatorForOptional(AlertHarness);
    private textFieldHarnesses = this.locatorForAll(TextFieldHarness);
    private passwordFieldHarnesses = this.locatorForAll(PasswordFieldHarness);
    private checkboxHarness = this.locatorFor(CheckboxHarness);

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

    async getAlertHarness() {
        const alertHarness = await this.alertHarness();
        return alertHarness;
    }

    async getNameFieldHarness() {
        const textFieldsHarnesses = await this.textFieldHarnesses();
        return textFieldsHarnesses[0];
    }

    async getEmailFieldHarness() {
        const textFieldsHarnesses = await this.textFieldHarnesses();
        return textFieldsHarnesses[1];
    }

    async getPasswordFieldHarness() {
        const textFieldsHarnesses = await this.passwordFieldHarnesses();
        return textFieldsHarnesses[0];
    }

    async getRepeatPasswordFieldHarness() {
        const textFieldsHarnesses = await this.passwordFieldHarnesses();
        return textFieldsHarnesses[1];
    }

    async getAcceptTermsCheckboxHarness() {
        const checkboxHarness = await this.checkboxHarness();
        return checkboxHarness;
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

    async getRegisterButton() {
        return this.getButtonById('register-button');
    }

    async getLoginButton() {
        return this.getButtonById('login-button');
    }

    async clickRegisterButton() {
        const button = await this.getRegisterButton()!;
        await button!.click();
    }

    async clickLoginButton() {
        const button = await this.getLoginButton()!;
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

    async getEmailValue() {
        const field = await this.getEmailFieldHarness();
        const value = await field.getInputValue();
        return value;
    }

    async setEmailValue(value: string) {
        const field = await this.getEmailFieldHarness();
        await field.setInputValue(value);
    }

    async getEmailrror() {
        const field = await this.getEmailFieldHarness();
        const error = await field.getErrorMessage();
        return error;
    }

    async getPasswordValue() {
        const field = await this.getPasswordFieldHarness();
        const value = await field.getInputValue();
        return value;
    }

    async setPasswordValue(value: string) {
        const field = await this.getPasswordFieldHarness();
        await field.setInputValue(value);
    }

    async getPasswordError() {
        const field = await this.getPasswordFieldHarness();
        const error = await field.getErrorMessage();
        return error;
    }

    async getRepeatPasswordValue() {
        const field = await this.getRepeatPasswordFieldHarness();
        const value = await field.getInputValue();
        return value;
    }

    async setRepeatPasswordValue(value: string) {
        const field = await this.getRepeatPasswordFieldHarness();
        await field.setInputValue(value);
    }

    async getRepeatPasswordError() {
        const field = await this.getRepeatPasswordFieldHarness();
        const error = await field.getErrorMessage();
        return error;
    }

    async getAcceptTermsValue() {
        const checkbox = await this.getAcceptTermsCheckboxHarness();
        const value = await checkbox.isChecked();
        return value;
    }

    async setAcceptTermsValue(value: boolean) {
        const checkbox = await this.getAcceptTermsCheckboxHarness();
        await checkbox.setValue(value);
    }

    async getAcceptTermsError() {
        const field = await this.getAcceptTermsCheckboxHarness();
        const error = await field.hasVisibleError();
        return error;
    }

    async getValues() {
        const values = {
            name: await this.getNameValue(),
            email: await this.getEmailValue(),
            password: await this.getPasswordValue(),
            repeatPassword: await this.getRepeatPasswordValue(),
            acceptTerms: await this.getAcceptTermsValue(),
        };
        return values;
    }

    async setValues(values: {
        name: string;
        email: string;
        password: string;
        repeatPassword: string;
        acceptTerms: boolean;
    }) {
        await this.setNameValue(values.name);
        await this.setEmailValue(values.email);
        await this.setPasswordValue(values.password);
        await this.setRepeatPasswordValue(values.repeatPassword);
        await this.setAcceptTermsValue(values.acceptTerms);
    }

    async getErrors() {
        const main = await this.getMainError();
        const name = await this.getNameError();
        const email = await this.getEmailrror();
        const password = await this.getPasswordError();
        const repeatPassword = await this.getRepeatPasswordError();
        const acceptTerms = await this.getAcceptTermsError();

        const values: {
            main?: string;
            name?: string;
            email?: string;
            password?: string;
            repeatPassword?: string;
            acceptTerms?: true;
        } = {};

        if (main != undefined) {
            values.main = main;
        }
        if (name != undefined) {
            values.name = name;
        }
        if (email != undefined) {
            values.email = email;
        }
        if (password != undefined) {
            values.password = password;
        }
        if (repeatPassword != undefined) {
            values.repeatPassword = repeatPassword;
        }
        if (acceptTerms) {
            values.acceptTerms = acceptTerms;
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
        if (formChildrenCount < 7 || formChildrenCount > 9) {
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
                'APP-TEXT-FIELD',
                'APP-PASSWORD-FIELD',
                'APP-PASSWORD-FIELD',
                'APP-CHECKBOX',
                'APP-BUTTON',
                'APP-BUTTON',
            ])
        ) {
            if (!isEqual([12, 12, 12, 12, 12, 12, 12, 12, 12], wrapperCols)) {
                errors['invalidWrapperCols'] =
                    `Invalid form wrapper cols. Found ${JSON.stringify(wrapperCols)}.`;
            }
        } else if (
            isEqual(wrapperChildtagNames, [
                'MAT-PROGRESS-BAR',
                'APP-TEXT-FIELD',
                'APP-TEXT-FIELD',
                'APP-PASSWORD-FIELD',
                'APP-PASSWORD-FIELD',
                'APP-CHECKBOX',
                'APP-BUTTON',
                'APP-BUTTON',
            ])
        ) {
            if (!isEqual([12, 12, 12, 12, 12, 12, 12, 12], wrapperCols)) {
                errors['invalidWrapperCols'] =
                    `Invalid form wrapper cols. Found ${JSON.stringify(wrapperCols)}.`;
            }
        } else if (
            isEqual(wrapperChildtagNames, [
                'APP-ALERT',
                'APP-TEXT-FIELD',
                'APP-TEXT-FIELD',
                'APP-PASSWORD-FIELD',
                'APP-PASSWORD-FIELD',
                'APP-CHECKBOX',
                'APP-BUTTON',
                'APP-BUTTON',
            ])
        ) {
            if (!isEqual([12, 12, 12, 12, 12, 12, 12, 12], wrapperCols)) {
                errors['invalidWrapperCols'] =
                    `Invalid form wrapper cols. Found ${JSON.stringify(wrapperCols)}.`;
            }
        } else if (
            isEqual(wrapperChildtagNames, [
                'APP-TEXT-FIELD',
                'APP-TEXT-FIELD',
                'APP-PASSWORD-FIELD',
                'APP-PASSWORD-FIELD',
                'APP-CHECKBOX',
                'APP-BUTTON',
                'APP-BUTTON',
            ])
        ) {
            if (!isEqual([12, 12, 12, 12, 12, 12, 12], wrapperCols)) {
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

        const state = {
            hasValidStructure,
        };
        return state;
    }
}

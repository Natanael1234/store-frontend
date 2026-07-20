import { ComponentHarness, TestElement } from '@angular/cdk/testing';
import { FormFieldWrapperElementHarness } from './form-field-wrapper.element.harness';

export class FormElementHarness extends ComponentHarness {
    static hostSelector = 'form';

    private readonly hostChildElement = this.locatorFor(':scope > *');
    private readonly hostChildElements = this.locatorForAll(':scope > *');

    private readonly wrapersHarness = this.locatorFor(
        FormFieldWrapperElementHarness,
    );

    private readonly wrapersHarnesses = this.locatorForAll(
        FormFieldWrapperElementHarness,
    );

    async countFieldFormWrappers() {
        const formFieldWrapper = await this.getFormFieldWrapperHarnesses();
        return formFieldWrapper.length;
    }

    async getFormFieldWrapperHarness() {
        return this.wrapersHarness();
    }

    async getFormFieldWrapperHarnesses() {
        return this.wrapersHarnesses();
    }

    async getHostChildElements(): Promise<TestElement[]> {
        return await this.hostChildElements();
    }

    async countHostChildElements(): Promise<number> {
        const children = await this.hostChildElements();
        return children.length;
    }

    async getHostTagName() {
        const hostEl = await this.host();
        return await hostEl.getProperty('tagName');
    }

    async getHostChildTagName() {
        const child = await this.hostChildElement();
        const tagName = await child.getProperty('tagName');
        return tagName;
    }

    async getClasses(): Promise<string[]> {
        const host = await this.host();
        const clazzStr = await host.getAttribute('class');
        const classes = clazzStr?.split(' ') ?? [];
        return classes;
    }

    async hasValidStructure() {
        const errors: any = {};

        const hostTagName = await this.getHostTagName();
        if (hostTagName !== 'FORM') {
            errors['hostTagName'] = `Invalid tag name ${hostTagName}.`;
        }

        const hostChildElements = await this.getHostChildElements();
        for (const [i, hostChildElement] of hostChildElements.entries()) {
            const childTagName = await hostChildElement.getProperty('tagName');
            if (childTagName !== 'DIV') {
                errors[`formElementChild[${i}]`] =
                    `Invalid form element child tag: ${childTagName}.`;
            }
            const classStr =
                (await hostChildElement.getProperty('class')) || '';
            const classes = classStr.split(' ');
            if (!classes.includes('field-wrapper')) {
                errors[`formElementChildClass[${i}]`] =
                    `Invalid classes: ${classes}.`;
            }
        }

        return Object.keys(errors).length == 0 ? true : errors;
    }
}

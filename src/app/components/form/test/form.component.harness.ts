import { ComponentHarness } from '@angular/cdk/testing';
import { FormFieldWrapperHarness } from './form-field-wrapper.harness';
import { FormHarness } from './form.harness';

export class FormComponentHarness extends ComponentHarness {
    static hostSelector = 'app-form';

    private readonly hostChildElements = this.locatorForAll(':scope > *');

    private readonly formHarness = this.locatorFor(FormHarness);
    private readonly formHarnesses = this.locatorForAll(FormHarness);

    private readonly wrapersHarness = this.locatorFor(FormFieldWrapperHarness);
    private readonly wrapersHarnesses = this.locatorForAll(
        FormFieldWrapperHarness,
    );

    private formElements = this.locatorForAll('form');
    private formElement = this.locatorFor('form');

    private readonly formChildrenElements =
        this.locatorForAll(':scope > form > *');

    private readonly formFieldWrapperElements = this.locatorForAll(
        ':scope > form > div.field-wrapper',
    );
    private readonly fieldWrapperChildrenElements = this.locatorForAll(
        ':scope > form > div.wrapper > *',
    );

    async countForms() {
        const forms = await this.formHarnesses();
        return forms.length;
    }

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

    async getHost() {
        return this.host();
    }

    async getFormElement() {
        return this.formElement();
    }

    async getFormElements() {
        return this.formElements();
    }

    async getHostChildrenElements() {
        return this.hostChildElements();
    }

    async getHostChildrenCount() {
        return (await this.hostChildElements()).length;
    }

    async getFormChildrenElements() {
        return this.formChildrenElements();
    }

    async getFormFieldWrappersElements() {
        return this.formFieldWrapperElements();
    }

    async getFieldWrapperChildrenElements() {
        return this.fieldWrapperChildrenElements();
    }

    async getFormHarness() {
        return this.formHarness();
    }

    async getFormHarnesses() {
        return this.formHarnesses();
    }
}

import { ComponentHarness, TestElement } from '@angular/cdk/testing';
import { FormFieldWrapperHarness } from './form-field-wrapper.harness';

export class FormHarness extends ComponentHarness {
    static hostSelector = 'form';

    private readonly hostChildElements = this.locatorForAll(':scope > *');

    private readonly wrapersHarness = this.locatorFor(FormFieldWrapperHarness);
    private readonly wrapersHarnesses = this.locatorForAll(
        FormFieldWrapperHarness,
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

    async countChildren(): Promise<number> {
        const children = await this.hostChildElements();
        return children.length;
    }

    async getChildren(): Promise<TestElement[]> {
        return await this.hostChildElements();
    }

    async hasSingleAlignItemClass() {
        const classes = await this.getAlignItemClasses();
        return classes.length == 1;
    }

    async hasSingleJustifyuContentClass() {
        const classes = await this.getJustifyContentClasses();
        return classes.length == 1;
    }

    async getAlignItemClasses() {
        const classes = await this.getClasses();
        const filteredClasses = classes.filter((clazz) =>
            clazz.match(
                /^align-items\-(flex\-start|flex\-end|center|space\-between|space\-around|space\-evenly|initial|inherit)$/,
            ),
        );
        return filteredClasses;
    }

    async getJustifyContentClasses() {
        const classes = await this.getClasses();
        const filteredClasses = classes.filter((clazz) =>
            clazz.match(
                /^justify\-content\-(normal|stretch|center|flex\-start|flex-end|start|end|baseline|initial|inherit)$/,
            ),
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

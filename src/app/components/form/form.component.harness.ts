import { ComponentHarness } from '@angular/cdk/testing';
import { ButtonHarness } from './components/button/button.harness';
import { CheckboxHarness } from './components/checkbox/checkbox.harness';
import { DividerHarness } from './components/divider/divider.harness';
import { LabelHarness } from './components/label/label.harness';
import { RadioGroupHarness } from './components/radio-group/radio-group.harness';
import { SelectFieldHarness } from './components/select/select-field.harness';
import { NumericFieldHarness } from './components/text/numeric-field/numeric-field.harness';
import { TextAreaFieldHarness } from './components/text/text-area/text-area.harness';
import { TextFieldHarness } from './components/text/text-field/text-field.harness';
import { FormFieldWrapperElementHarness } from './form-field-wrapper.element.harness';
import { FormElementHarness } from './form.element.harness';

export class FormComponentHarness extends ComponentHarness {
    static hostSelector = 'app-form';

    private readonly hostChildElement = this.locatorFor(':scope > *');
    private readonly hostChildElements = this.locatorForAll(':scope > *');

    private readonly formHarness = this.locatorFor(FormElementHarness);
    private readonly formHarnesses = this.locatorForAll(FormElementHarness);

    private readonly wrapersHarness = this.locatorFor(
        FormFieldWrapperElementHarness,
    );
    private readonly wrapersHarnesses = this.locatorForAll(
        FormFieldWrapperElementHarness,
    );

    private readonly formItemHarnesses = this.locatorForAll(
        TextFieldHarness,
        NumericFieldHarness,
        TextAreaFieldHarness,
        SelectFieldHarness,
        RadioGroupHarness,
        CheckboxHarness,
        ButtonHarness,
        LabelHarness,
        DividerHarness,
    );

    private readonly formItemHarness = this.locatorFor(
        TextFieldHarness,
        NumericFieldHarness,
        TextAreaFieldHarness,
        SelectFieldHarness,
        RadioGroupHarness,
        CheckboxHarness,
        ButtonHarness,
        LabelHarness,
        DividerHarness,
    );

    private formElements = this.locatorForAll('form');
    private formElement = this.locatorFor('form');

    private readonly formChildElements =
        this.locatorForAll(':scope > form > *');

    private readonly wrapperElements = this.locatorForAll(
        ':scope > form > div.field-wrapper',
    );
    private readonly wrapperChildrenElements = this.locatorForAll(
        ':scope > form > div.wrapper > *',
    );

    async getHostTagName() {
        const host = await this.host();
        return await host.getProperty('tagName');
    }

    async getHostChildTagName() {
        const child = await this.hostChildElement();
        const tagName = await child.getProperty('tagName');
        return tagName;
    }

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

    async getItemHarness() {
        return this.formItemHarness();
    }

    async getItemHarnesses() {
        return this.formItemHarnesses();
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

    async getHostChildElements() {
        return this.hostChildElements();
    }

    async getHostChildrenCount() {
        return (await this.hostChildElements()).length;
    }

    async getFormChildElements() {
        return this.formChildElements();
    }

    async getFormFieldWrappersElements() {
        return this.wrapperElements();
    }

    async getFieldWrapperChildrenElements() {
        return this.wrapperChildrenElements();
    }

    async getFormHarness() {
        return this.formHarness();
    }

    async getFormHarnesses() {
        return this.formHarnesses();
    }

    /**
     * Returns grid/form gap.
     * Ex.: "16px".
     * @returns
     */
    async getGridGap() {
        const formEl = await this.getFormElement();
        const gap = await formEl.getCssValue('gap');
        return gap;
    }

    async getFormWidth() {
        const formEl = await this.formElement();
        const widthStr = await formEl.getCssValue('width');
        const width = this.parsePixelSizeStringToNumber(widthStr);
        return width;
    }

    async getWrapper(wrapperIdx: number) {
        const wrappersHarnesses = await this.getFormFieldWrapperHarnesses();
        const wrapperHarness = wrappersHarnesses[wrapperIdx];
        return wrapperHarness;
    }

    async getWrapperData(wrapperIdx: number) {
        const harness = await this.getWrapper(wrapperIdx);
        const host = await harness.host();
        const dimensions = await host.getDimensions();
        const width = dimensions.width;
        return { width };
    }

    async hasValidStructure() {
        const errors: any = {};

        // host should contain only one form
        const hostChildElements = await this.getHostChildElements();
        if (hostChildElements.length !== 1) {
            errors['hasValidChildrenCount'] =
                `Invalid children count: ${hostChildElements.length}.`;
        }
        const hostChildElement = hostChildElements[0];
        const hostChildTagName =
            await hostChildElements[0].getProperty('tagName');
        if (hostChildTagName !== 'FORM') {
            errors['hostChildTagName'] =
                `Invalid tag name ${hostChildTagName}.`;
        }
        const formElement = hostChildElements[0];

        const gap = await this.getGridGap();
        if (gap != '16px') {
            errors[`invalidGap`] = `Invalid form/grid gap.`;
        }

        // form should contain classes
        const formClassStr =
            (await hostChildElement.getAttribute('class')) || '';
        const formClasses = formClassStr.split(' ');
        // console.log(formClasses);
        if (!formClasses.includes('flex-grid')) {
            errors[`missingFormFlexGridClass`] =
                `Missing 'flex-grid' class on form element.`;
        }

        // form children (wrappers)
        const formChildElements = await this.getFormChildElements();
        for (const [i, formChildElement] of formChildElements.entries()) {
            // form child should be a div
            const tagName = await formChildElement.getProperty('tagName');
            if (tagName !== 'DIV') {
                errors[`formChildElement[${i}].tagName`] = tagName;
            }
            // form child should contain wrapper class
            const classStr =
                (await formChildElement.getAttribute('class')) || '';
            const classes = classStr.split(' ');
            if (!classes.includes('field-wrapper')) {
                errors[`formChild[${i}].class`] =
                    `Missing 'field-wrapper' class`;
            }
        }

        // wrapper should contains only valid children
        const validWrapperChildTags = [
            'APP-NUMERIC-FIELD',
            'APP-TEXT-FIELD',
            'APP-TEXT-AREA-FIELD',
            'APP-SELECT-FIELD',
            'APP-RADIO-GROUP',
            'APP-CHECKBOX',
            'MAT-LABEL',
            'MAT-DIVIDER',
            'APP-BUTTON',
        ];
        const wrapperChildElements = await this.wrapperChildrenElements();
        for (const [i, wrapperChildElement] of wrapperChildElements.entries()) {
            const tagName = await wrapperChildElement.getProperty('tagName');
            if (!validWrapperChildTags.includes(tagName)) {
                errors[`invalidWrapperChild`] = tagName;
            }
        }

        return Object.keys(errors).length == 0 ? true : errors;
    }

    protected parsePixelSizeStringToNumber(gridWidth: string) {
        const width: number = parseFloat(gridWidth);
        return width;
    }

    protected calculateColSize(gridWidth: number, colWidth: number) {
        let colSize = (colWidth * 12) / gridWidth;
        return Math.round(colSize);
    }

    /** form element state */
    async getState() {
        const hasValidStructure = await this.hasValidStructure();
        const formElement = await this.hostChildElement();
        const gridWidthCSS = await formElement.getCssValue('width');
        const wrappersHarnesses = await this.getFormFieldWrapperHarnesses();
        const children: any = [];
        for (let i = 0; i < wrappersHarnesses.length; i++) {
            const wrapperHarness = wrappersHarnesses[i];
            const type = await wrapperHarness.getHostChildTagName();
            const wrapperHost = await wrapperHarness.host();
            // col size
            const colWidthCSS = await wrapperHost.getCssValue('width');
            let colSize = this.calculateColSize(
                this.parsePixelSizeStringToNumber(gridWidthCSS),
                this.parsePixelSizeStringToNumber(colWidthCSS),
            );
            const child = { type, colSize };
            children.push(child);
        }
        return { hasValidStructure, children };
    }
}

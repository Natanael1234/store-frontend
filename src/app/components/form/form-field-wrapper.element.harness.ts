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

export class FormFieldWrapperElementHarness extends ComponentHarness {
    static hostSelector = 'div.field-wrapper';

    private readonly hostChildElement = this.locatorForOptional(':scope > *');
    private readonly hostChildElements = this.locatorForAll(':scope > *');

    private readonly childrenHarnesses = this.locatorForAll(
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

    private readonly childHarness = this.locatorForOptional(
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

    async getHostTagName() {
        const hostEl = await this.host();
        return await hostEl.getProperty('tagName');
    }

    async getHostChildTagName() {
        const child = await this.hostChildElement();
        if (child) {
            const tagName = await child.getProperty('tagName');
            return tagName;
        } else {
            return 'SPACER';
        }
    }

    async getHostChildElement() {
        return this.hostChildElement();
    }

    async getHostChildElements() {
        return this.hostChildElements();
    }

    async getChildHarness() {
        return this.childHarness();
    }

    async getChildrenHarness() {
        return this.childrenHarnesses();
    }

    async getHostChildrenCount() {
        const children = await this.hostChildElements();
        return children.length;
    }

    async getColSize() {
        const sizes = await this.getColSizes();
        const size = sizes[0] ?? null;
    }

    async getColSizes() {
        const classes = await this.getColSizesClasses();
        const sizes = classes.map((clazz) =>
            Number(clazz.replace(/^col-$/, '')),
        );
        return sizes;
    }

    async hasSingleFlexGridClass() {
        const classes = await this.getFlexGridClasses();
        return classes.length == 1;
    }

    async hasSingleColSizesClass() {
        const classes = await this.getColSizesClasses();
        return classes.length == 1;
    }

    async getFlexGridClasses() {
        const classes = await this.getClasses();
        const filteredClasses = classes.filter((clazz) => clazz == 'flex-grid');
        return filteredClasses;
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
}

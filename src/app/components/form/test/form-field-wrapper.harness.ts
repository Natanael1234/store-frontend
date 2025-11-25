import { ComponentHarness } from '@angular/cdk/testing';
import { ButtonHarness } from '../components/button/test/button.harness';
import { CheckboxHarness } from '../components/checkbox/test/checkbox.harness';
import { DividerHarness } from '../components/divider/test/divider.harness';
import { LabelHarness } from '../components/label/test/label.harness';
import { NumericFieldHarness } from '../components/numeric-field/test/numeric-field.harness';
import { RadioGroupHarness } from '../components/radio-group/test/radio-group.harness';
import { SelectFieldHarness } from '../components/select/test/test/select-field.harness';
import { TextAreaFieldHarness } from '../components/text-area/test/text-area.harness';
import { TextFieldHarness } from '../components/text-field/test/text-field.harness';

export class FormFieldWrapperHarness extends ComponentHarness {
    static hostSelector = '.field-wrapper';

    private readonly childElement = this.locatorFor(':scope > *');
    private readonly childrenElements = this.locatorForAll(':scope > *');

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

    private readonly childHarness = this.locatorFor(
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

    async getChildTagName() {
        const child = await this.childHarness();
        const host = await child.host();
        const tagName = await host.getProperty('tagName');
        return tagName;
    }

    async getChildElement() {
        return this.childElement();
    }

    async getChildrenElements() {
        return this.childrenElements();
    }

    async getChildHarness() {
        return this.childHarness();
    }

    async getChildrenHarnessess() {
        return this.childrenHarnesses();
    }

    async getChildrenCount() {
        const children = await this.childrenElements();
        return children.length;
    }

    async getColSize() {
        const sizes = await this.getColSizes();
        const size = sizes[0] ?? null;
    }

    async getColOffset() {
        const offsets = await this.getColOffsets();
        const size = offsets[0] ?? null;
    }

    async getColSizes() {
        const classes = await this.getColSizesClasses();
        const sizes = classes.map((clazz) =>
            Number(clazz.replace(/^col-$/, '')),
        );
        return sizes;
    }

    async getColOffsets() {
        const classes = await this.getColOffsetClasses();
        const offsets = classes.map((clazz) =>
            Number(clazz.replace(/^offset-$/, '')),
        );
        return offsets;
    }

    async hasSingleFlexGridClass() {
        const classes = await this.getFlexGridClasses();
        return classes.length == 1;
    }

    async hasSingleColSizesClass() {
        const classes = await this.getColSizesClasses();
        return classes.length == 1;
    }

    async hasSingleColOffsetClass() {
        const classes = await this.getColOffsetClasses();
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

    async getColOffsetClasses() {
        const classes = await this.getClasses();
        const filteredClasses = classes.filter((clazz) =>
            clazz.match(/^offset\-(1|2|3|4|5|6|7|8|9|10|11|12|13)$/),
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

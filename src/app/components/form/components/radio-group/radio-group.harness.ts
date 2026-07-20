import {
    MatRadioButtonHarness,
    MatRadioGroupHarness,
} from '@angular/material/radio/testing';

import { ComponentHarness } from '@angular/cdk/testing';

export class RadioGroupHarness extends ComponentHarness {
    static hostSelector = 'app-radio-group';

    private readonly hostChildrenElements = this.locatorForAll(':scope > *');

    private groupHarness = this.locatorFor(MatRadioGroupHarness);
    private groupsHarnesses = this.locatorForAll(MatRadioGroupHarness);
    private labelEl = this.locatorForOptional('mat-label');
    private radioButtonsHarnesses = this.locatorForAll(MatRadioButtonHarness);

    async getHostChildrenCount() {
        return (await this.hostChildrenElements()).length;
    }

    async getHostChildTagNames(): Promise<string[]> {
        const children = await this.hostChildrenElements();
        const tagNames: string[] = [];
        for (const child of children) {
            const tag = (
                (await child.getProperty('tagName')) as string
            ).toLowerCase();
            tagNames.push(tag);
        }
        return tagNames;
    }

    async hostConstainsOnlyARadioGroup() {
        const tags = await this.getHostChildTagNames();
        if (tags.length != 1) return false;
        return tags[0] == 'mat-radio-group';
    }

    async isHostChildARadioGroup() {
        const hostChildren = await this.hostChildrenElements();
        if (hostChildren.length < 1) return false;
        const tagName = await hostChildren[0].getProperty('tagName');
        return tagName == 'MAT-RADIO-GROUP';
    }

    async getGroup() {
        return await this.groupHarness();
    }

    async getGroups() {
        return await this.groupsHarnesses();
    }

    async getGroupId(): Promise<string | null> {
        const groupHost = await (await this.groupHarness()).host();
        return await groupHost.getAttribute('id');
    }

    async getGroupLabel(): Promise<string | null> {
        const label = await this.labelEl();
        return label ? (await label.text()).trim() : null;
    }

    async getCheckedValue(): Promise<string | null> {
        const group = await this.groupHarness();
        return group.getCheckedValue();
    }

    async getRadioButtons(): Promise<MatRadioButtonHarness[]> {
        return await this.radioButtonsHarnesses();
    }

    /** 🔹 Retorna todas as classes aplicadas ao mat-form-field */
    async getFormFieldClasses(): Promise<string[]> {
        const field = await this.groupHarness();
        const host = await field.host();
        const classAttr = (await host.getAttribute('class')) ?? '';
        return classAttr
            .split(/\s+/)
            .map((c) => c.trim())
            .filter(Boolean);
    }

    /** 🔹 Verifica se o campo possui uma mensagem de erro visível */
    async hasVisibleError(): Promise<boolean> {
        const classes = await this.getFormFieldClasses();
        if (
            classes.includes('ng-touched') &&
            classes.includes('ng-dirty') &&
            classes.includes('ng-invalid')
        ) {
            return true;
        }
        return false;
    }

    async getOptions() {
        const radioButtons = await this.getRadioButtons();
        const options = [];
        for (const radioButton of radioButtons) {
            const option = {
                id: await radioButton.getId(),
                value: await radioButton.getValue(),
                label: await radioButton.getLabelText(),
                isChecked: await radioButton.isChecked(),
                isFocused: await radioButton.isFocused(),
                isDisabled: await radioButton.isDisabled(),
            };
            options.push(option);
        }
        return options;
    }

    async hasValidStructure(): Promise<boolean | { [key: string]: string }> {
        const errors: any = {};

        const hasValidChildrenCount = (await this.getHostChildrenCount()) == 1;
        if (!hasValidChildrenCount) {
            errors['hasValidChildrenCount'] =
                `Invalid children count: ${hasValidChildrenCount}.`;
        }

        const isHostChildARadioGroup = await this.isHostChildARadioGroup();
        if (!isHostChildARadioGroup) {
            errors['isHostChildARadioGroup'] =
                `Host child is not a radio group ${isHostChildARadioGroup}.`;
        }

        // TODO: testar label

        return Object.keys(errors).length == 0 ? true : errors;
    }

    async getState() {
        const id = await this.getGroupId();
        const label = await this.getGroupLabel();
        const value = await this.getCheckedValue();
        const options = await this.getOptions();
        const isFocused = options.some((item) => item.isFocused);
        const hasError = await this.hasVisibleError();
        const hasValidStructure = await this.hasValidStructure();

        return {
            id,
            label,
            value,
            isFocused,
            options,
            hasError,
            hasValidStructure,
        };
    }
}

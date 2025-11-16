import {
    MatRadioButtonHarness,
    MatRadioGroupHarness,
} from '@angular/material/radio/testing';

import { ComponentHarness } from '@angular/cdk/testing';

export class RadioGroupHarness extends ComponentHarness {
    static hostSelector = 'app-radio-group';

    private readonly hostChildren = this.locatorForAll(':scope > *');

    private groupHarness = this.locatorFor(MatRadioGroupHarness);
    private groupsHarnesses = this.locatorForAll(MatRadioGroupHarness);
    private labelEl = this.locatorForOptional('mat-label');
    private radioButtonsHarnesses = this.locatorForAll(MatRadioButtonHarness);

    async getHostChildTagNames(): Promise<string[]> {
        const children = await this.hostChildren();
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
}

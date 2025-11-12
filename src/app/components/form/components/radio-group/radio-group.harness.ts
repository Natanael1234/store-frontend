import {
    MatRadioButtonHarness,
    MatRadioGroupHarness,
} from '@angular/material/radio/testing';

import { ComponentHarness } from '@angular/cdk/testing';

export class RadioGroupHarness extends ComponentHarness {
    static hostSelector = 'app-radio-group';

    private group = this.locatorFor(MatRadioGroupHarness);
    private groups = this.locatorForAll(MatRadioGroupHarness);
    private label = this.locatorForOptional('mat-label');
    private radioButtons = this.locatorForAll(MatRadioButtonHarness);

    async getGroup() {
        return await this.group();
    }

    async getGroups() {
        return await this.groups();
    }

    async getGroupId(): Promise<string | null> {
        const groupHost = await (await this.group()).host();
        return await groupHost.getAttribute('id');
    }

    async getGroupLabel(): Promise<string | null> {
        const label = await this.label();
        return label ? (await label.text()).trim() : null;
    }

    async getCheckedValue(): Promise<string | null> {
        const group = await this.group();
        return group.getCheckedValue();
    }

    async getRadioButtons(): Promise<MatRadioButtonHarness[]> {
        return await this.radioButtons();
    }
}

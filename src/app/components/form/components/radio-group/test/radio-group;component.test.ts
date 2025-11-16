import { FormControl } from '@angular/forms';
import { RadioGroupHarness } from './radio-group.harness';

export async function _testRadioGroup(options: {
    harness: RadioGroupHarness;
    id: string;
    label: string;
    control: FormControl;
    disabled: boolean;
    radioButtons: { label: any; value: any }[];
    error: boolean;
}) {
    const harness = options.harness;
    const control = options.control;

    expect(await harness.hostConstainsOnlyARadioGroup())
        .withContext('contains only a radio group')
        .toBeTrue();

    const group = await harness.getGroup();
    const label = await harness.getGroupLabel();
    const radioButtons = await harness.getRadioButtons();

    expect(label).withContext('label').toEqual(options.label);
    expect(radioButtons.length)
        .withContext('radio button count')
        .toEqual(options.radioButtons.length);
    expect(control.value)
        .withContext('control.value matches checked value')
        .toEqual(await group.getCheckedValue());

    if (options.error) {
        expect(await harness.hasVisibleError())
            .withContext('has visible error')
            .toBeTrue();
    } else {
        expect(await harness.hasVisibleError())
            .withContext('has visible error')
            .toBeFalse();
    }

    for (let i = 0; i < radioButtons.length; i++) {
        const radioButton = radioButtons[i];

        expect(await radioButton.getLabelText())
            .withContext('radio button label')
            .toEqual(options.radioButtons[i].label);
        expect(await radioButton.getValue())
            .withContext('radio button value')
            .toEqual(options.radioButtons[i].value);
        if (options.control.value == (await radioButton.getValue())) {
            expect(await radioButton.isChecked())
                .withContext('radio button is checked')
                .toBeTrue();
        } else {
            expect(await radioButton.isChecked())
                .withContext('radio button is checked')
                .toBeFalse();
        }
        if (options.disabled) {
            expect(await radioButton.isDisabled())
                .withContext('radio button is disabled')
                .toBeTrue();
        } else {
            expect(await radioButton.isDisabled())
                .withContext('radio button is disabled')
                .toBeFalse();
        }
    }
}

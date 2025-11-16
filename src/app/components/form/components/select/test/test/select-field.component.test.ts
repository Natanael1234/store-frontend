import { FormControl } from '@angular/forms';
import { SelectFieldComponent } from '../../select-field.component';
import { SelectFieldHarness } from './select-field.harness';

export async function _testSelectField(options: {
    component: SelectFieldComponent;
    harness: SelectFieldHarness;
    id: true | string;
    label: string;
    focusable: boolean | undefined;
    disabled: boolean | undefined;
    control: FormControl<string | null>;
    options: {
        value: string;
        label: string;
    }[];
    error: boolean;
}) {
    const component = options.component;
    const harness = options.harness;
    const control = component.control();

    // form field
    expect(await harness.hostConstainsOnlyAFormField())
        .withContext('host contains only a field')
        .toBeTrue();

    // appearance
    expect(await harness.getFieldAppearance()).toEqual('outline');

    // select
    expect(await harness.hasOneAndOnlyOneSelect())
        .withContext('only one select')
        .toBeTrue();
    const selectHerness = await harness.getSelectHarness();

    // id
    const id = await harness.getSelectId();
    if (options.id === true) {
        expect(id?.startsWith('mat-select-'))
            .withContext('generated id')
            .toBeTrue();
    } else {
        expect(id).withContext('id').toEqual(options.id);
    }

    // label
    expect(await harness.getLabelText())
        .withContext('label')
        .toEqual(options.label);

    // focusable TODO: não funciona na prática
    // if (options.focusable || options.focusable == null) {
    //     expect(await (await harness.getSelect()).getAttribute('tabIndex'))
    //         .withContext('tabIndex')
    //         .toEqual('0');
    // } else {
    //     expect(await (await harness.getSelect()).getAttribute('tabIndex'))
    //         .withContext('tabIndex')
    //         .toEqual('-1');
    // }

    // options
    await selectHerness.open();
    const optionsHarness = await harness.getOptions();
    expect(optionsHarness.length)
        .withContext('option count')
        .toEqual(options.options.length);
    for (let i = 0; i < optionsHarness.length; i++) {
        // option label
        expect(optionsHarness[i].label).toEqual(options.options[i].label);
        // option value/control
        if (options.options[i].value == control!.value) {
            expect(optionsHarness[i].selected)
                .withContext('selected option')
                .toBeTrue();
        } else {
            expect(optionsHarness[i].selected)
                .withContext('selected option')
                .toBeFalse();
        }
    }

    expect(await harness.hasVisibleError())
        .withContext('visible error')
        .toEqual(options.error);

    if (options.disabled) {
        expect(await selectHerness.isDisabled())
            .withContext('radio button is disabled')
            .toBeTrue();
    } else {
        expect(await selectHerness.isDisabled())
            .withContext('radio button is disabled')
            .toBeFalse();
    }
}

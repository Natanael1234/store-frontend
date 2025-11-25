import { FormControl } from '@angular/forms';
import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { NumericFieldComponent } from '../numeric-field.component';
import { NumericFieldHarness } from './numeric-field.harness';

async function testType(options: {
    component: NumericFieldComponent;
    harness: NumericFieldHarness;
    type: FormElementType;
}) {
    const harness = options.harness;

    expect(await harness.getInputType())
        .withContext('input type')
        .toEqual(FormElementType.text);
}

async function testPrefix(options: {
    component: NumericFieldComponent;
    harness: NumericFieldHarness;
    prefix: string | null;
}): Promise<void> {
    const harness = options.harness;
    if (options.prefix) {
        expect(await harness.getPrefixCount())
            .withContext('prefix count')
            .toEqual(1);
    } else {
        expect(await harness.getPrefixCount())
            .withContext('prefix count')
            .toEqual(0);
    }
    const prefix = (await harness.getPrefixText())?.trim();
    if (options.prefix != null) {
        expect(prefix).withContext('prefix').toEqual(options.prefix);
    } else {
        expect(prefix).withContext('prefix').toEqual('');
    }
}

async function testSuffix(options: {
    component: NumericFieldComponent;
    harness: NumericFieldHarness;
    suffix: string | null;
}) {
    const harness = options.harness;
    if (options.suffix) {
        expect(await harness.getSuffixCount())
            .withContext('suffix count')
            .toEqual(1);
    } else {
        expect(await harness.getSuffixCount())
            .withContext('suffix count')
            .toEqual(0);
    }
    const suffix = (await harness.getSuffixText())?.trim();
    if (options.suffix != null) {
        expect(suffix).withContext('suffix').toEqual(options.suffix);
    } else {
        expect(suffix).withContext('suffix').toEqual('');
    }
}

async function testLabel(options: {
    component: NumericFieldComponent;
    harness: NumericFieldHarness;
    label: string | null;
}) {
    const harness = options.harness;

    expect(await harness.getLabelCount())
        .withContext('label count')
        .toEqual(1);

    expect(await harness.getLabelText())
        .withContext('text label')
        .toEqual(options.label);
}

async function testField(options: {
    component: NumericFieldComponent;
    harness: NumericFieldHarness;
    label: string | null;
}) {
    const harness = options.harness;

    // child

    expect(await harness.getHostChildrenCount())
        .withContext('host children count')
        .toEqual(1);

    expect(await harness.isHostChildrenAField())
        .withContext('host child is field')
        .toBeTrue();

    await testLabel(options);

    // appearance

    expect(await harness.getFieldAppearance())
        .withContext('appearance')
        .toEqual('outline');
}

async function testError(options: {
    component: NumericFieldComponent;
    harness: NumericFieldHarness;
    control: FormControl;
    error: string;
}) {
    const harness = options.harness;

    options.control.markAsPristine();
    options.control.markAsUntouched();
    options.control.updateValueAndValidity();

    expect(await harness.getErrorCount())
        .withContext('error count')
        .toEqual(0);
    let errors = await harness.getErrors();
    expect(errors.length).withContext('field has no error').toEqual(0);

    options.control.markAsDirty();
    options.control.markAsTouched();
    options.control.updateValueAndValidity();

    if (options.error) {
        expect(await harness.getErrorCount())
            .withContext('error count')
            .toEqual(1);
    } else {
        expect(await harness.getErrorCount())
            .withContext('error count')
            .toEqual(0);
    }
    errors = await harness.getErrors();
    if (options.error ?? false != false) {
        expect(errors.length).withContext('field has one error').toEqual(1);
        expect(await errors[0].getText())
            .withContext('error message')
            .toEqual(options.error);
    } else {
        expect(errors.length).withContext('field has no error').toEqual(0);
    }
}

async function testInput(options: {
    component: NumericFieldComponent;
    harness: NumericFieldHarness;
    id: true | string;
    type: FormElementType;
    controlValue: string;
    inputValue: string;
    label: string | null;
    placeholder: string | null;
    control: FormControl;
    focusable: boolean | null;
    readOnly: boolean | null;
    minLength: number | null;
    maxLength: number | null;
    min: number | null;
    max: number | null;
    step: number | null;
    error: string;
    breakLine: boolean;
}): Promise<void> {
    const harness = options.harness;
    const component = options.component;

    expect(await harness.getInputCount())
        .withContext('input count')
        .toEqual(1);

    // id
    if (options.id === true) {
        expect(await harness.getInputId())
            .withContext('id')
            .toMatch(/mat-input-a\d+/);
    } else {
        expect(await harness.getInputId())
            .withContext('id')
            .toEqual(options.id);
    }

    // tabIndex/focusable

    expect(await harness.getInputTabIndex())
        .withContext('tabIndex')
        .toEqual(String(options.focusable ? 0 : -1));

    // readonly

    if (options.readOnly) {
        expect(await harness.isInputReadOnly())
            .withContext('readonly')
            .toBeTrue();
    } else {
        expect(await harness.isInputReadOnly())
            .withContext('readonly')
            .toBeFalse();
    }

    // placeholder

    expect(await harness.getInputPlaceholder())
        .withContext('placeholder')
        .toEqual(options.placeholder ?? '');

    // minlength

    if (options.minLength) {
        expect(await harness.getInputMinLength())
            .withContext('minlength')
            .toEqual(String(options.minLength));
    } else {
        expect(await harness.getInputMinLength())
            .withContext('minlength')
            .toBeNull();
    }

    // maxlength

    if (options.maxLength) {
        expect(await harness.getInputMaxLength())
            .withContext('maxlength')
            .toEqual(String(options.maxLength));
    } else {
        expect(await harness.getInputMaxLength())
            .withContext('maxlength')
            .toBeNull();
    }

    // min

    if (options.min) {
        expect(await harness.getInputMin())
            .withContext('min')
            .toEqual(String(options.min));
    } else {
        expect(await harness.getInputMin())
            .withContext('min')
            .toBeNull();
    }

    // max

    if (options.max) {
        expect(await harness.getInputMax())
            .withContext('max')
            .toEqual(String(options.max));
    } else {
        expect(await harness.getInputMax())
            .withContext('max')
            .toBeNull();
    }

    // step

    if (options.step) {
        expect(await harness.getInputStep())
            .withContext('step')
            .toEqual(String(options.step));
    } else {
        expect(await harness.getInputStep())
            .withContext('step')
            .toBeNull();
    }

    // diabled

    expect(await harness.isInputDisabled())
        .withContext('disabled')
        .toEqual(options.control.disabled);

    // blur

    const spy = spyOn(options.component.onBlur, 'emit');
    await harness.blurInput();
    expect(spy).withContext('onBlur event').toHaveBeenCalledOnceWith();

    // value

    expect(component.control()).withContext('component.control').toBeDefined();
    expect(component.control()?.value)
        .withContext('control value')
        .toEqual(options.controlValue);
    expect(await harness.getInputValue())
        .withContext('input value')
        .toEqual(options.inputValue);
}

export async function _testNumericFieldComponent(options: {
    component: NumericFieldComponent;
    harness: NumericFieldHarness;
    id: true | string;
    type: FormElementType;
    controlValue: string;
    inputValue: string;
    label: string | null;
    placeholder: string | null;
    readOnly: boolean; // TODO:test
    control: FormControl;
    focusable: boolean | null;
    minLength: number | null;
    maxLength: number | null;
    min: number | null;
    max: number | null;
    step: number | null;
    prefix: string | null;
    suffix: string | null;
    leadZero: boolean; // TODO:test
    allowNegativeValues: boolean;
    error: string;
    breakLine: boolean;
}): Promise<void> {
    const harness = options.harness;

    // button

    expect(await harness.getButtonCount())
        .withContext('button count')
        .toEqual(0);

    // icon

    expect(await harness.getIconCount())
        .withContext('icon count')
        .toEqual(0);

    await testField(options);
    await testLabel(options);
    await testError(options);
    await testType(options);
    await testPrefix(options);
    await testSuffix(options);
    await testInput(options);
}

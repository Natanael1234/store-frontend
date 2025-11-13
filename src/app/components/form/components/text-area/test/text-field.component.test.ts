import { FormControl } from '@angular/forms';
import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { TextFormat } from '../../../enums/text-format/text-format.enum';
import { TextAreaComponent } from '../text-area.component';
import { TextAreaHarness } from './text-area.harness';

async function testLabel(options: {
    component: TextAreaComponent;
    harness: TextAreaHarness;
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
    component: TextAreaComponent;
    harness: TextAreaHarness;
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

    expect(await harness.getFormAppearance())
        .withContext('appearance')
        .toEqual('outline');
}

async function testError(options: {
    component: TextAreaComponent;
    harness: TextAreaHarness;
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
        expect(await errors[0].getText()).toEqual(options.error);
    } else {
        expect(errors.length).withContext('field has no error').toEqual(0);
    }
}

export async function testTextArea(options: {
    component: TextAreaComponent;
    harness: TextAreaHarness;
    id: true | string;
    value: string;
    label: string | null;
    placeholder: string | null;
    control: FormControl;
    focusable: boolean | null;
    minLength: number | null;
    maxLength: number | null;
    autosizeMinRows: number;
    autosizeMaxRows: number;
    error: string;
    breakLine: boolean;
}): Promise<void> {
    const harness = options.harness;

    expect(await harness.getTextAreaCount())
        .withContext('input count')
        .toEqual(1);

    // id
    if (options.id === true) {
        expect(await harness.getTextAreaId())
            .withContext('id')
            .toMatch(/mat-input-a\d+/);
    } else {
        expect(await harness.getTextAreaId())
            .withContext('id')
            .toEqual(options.id);
    }

    // tabIndex/focusable

    expect(await harness.getTextAreaTabIndex()).toEqual(
        String(options.focusable ? 0 : -1),
    );

    // placeholder

    expect(await harness.getTextAreaPlaceholder())
        .withContext('placeholder')
        .toEqual(options.placeholder ?? '');

    // minlength

    if (options.minLength) {
        expect(await harness.getTextAreaMinLength())
            .withContext('minlength')
            .toEqual(String(options.minLength));
    } else {
        expect(await harness.getTextAreaMinLength())
            .withContext('minlength')
            .toBeNull();
    }

    // maxlength

    if (options.maxLength) {
        expect(await harness.getTextAreaMaxLength())
            .withContext('maxlength')
            .toEqual(String(options.maxLength));
    } else {
        expect(await harness.getTextAreaMaxLength())
            .withContext('maxlength')
            .toBeNull();
    }

    // autosizeMinRows

    if (options.autosizeMinRows) {
        expect(await harness.getTextAreaAutosizeMinRows())
            .withContext('autosizeMinRows')
            .toEqual(String(options.autosizeMinRows));
    } else {
        expect(await harness.getTextAreaAutosizeMinRows())
            .withContext('autosizeMinRows')
            .toBeNull();
    }

    // autosizeMaxRows

    if (options.autosizeMaxRows) {
        expect(await harness.getTextAreaAutosizeMaxRows())
            .withContext('autosizeMaxRows')
            .toEqual(String(options.autosizeMaxRows));
    } else {
        expect(await harness.getTextAreaAutosizeMaxRows())
            .withContext('autosizeMaxRows')
            .toBeNull();
    }

    // disabled

    expect(await harness.isTextAreaDisabled())
        .withContext('disabled')
        .toEqual(options.control.disabled);

    // blur

    const spy = spyOn(options.component.onBlur, 'emit');
    await harness.blurTextArea();
    expect(spy).toHaveBeenCalledOnceWith();
}

async function testValue(options: {
    component: TextAreaComponent;
    harness: TextAreaHarness;
    control: FormControl;
    value: string;
}) {
    const harness = options.harness;
    const component = options.component;

    expect(component.control()?.value)
        .withContext('control.value')
        .toEqual(options.value);

    expect(await harness.getTextAreaValue())
        .withContext('input value')
        .toEqual(options.value);
}

export async function _testTextAreaComponent(options: {
    component: TextAreaComponent;
    harness: TextAreaHarness;
    id: true | string;
    type: FormElementType;
    value: string;
    label: string | null;
    placeholder: string | null;
    control: FormControl;
    focusable: boolean | null;
    format: TextFormat | null;
    minLength: number | null;
    maxLength: number | null;
    prefix: string | null;
    suffix: string | null;
    error: string;
    autosizeMinRows: number;
    autosizeMaxRows: number;
    breakLine: boolean;
}): Promise<void> {
    await testField(options);
    await testLabel(options);
    await testError(options);
    await testTextArea(options);
    await testValue(options);
}

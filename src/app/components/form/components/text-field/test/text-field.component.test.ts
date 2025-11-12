import { FormControl } from '@angular/forms';
import { Icon } from '../../../../../enums/icons/icons.enum';
import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { TextFormat } from '../../../enums/text-format/text-format.enum';
import { TextFieldComponent } from '../text-field.component';
import { TextFieldHarness } from './text-field.harness';

async function testNonPassword(options: {
    component: TextFieldComponent;
    harness: TextFieldHarness;
    format: TextFormat | null;
    type: FormElementType;
}) {
    const harness = options.harness;

    // type

    expect(await harness.getInputType())
        .withContext('input type')
        .toEqual(options.type);

    // button

    expect(await harness.getButtonCount())
        .withContext('button count')
        .toEqual(0);

    expect(await harness.hasPasswordToggleButton())
        .withContext('has toggle button')
        .toBeFalse();

    // icon

    expect(await harness.getIconCount())
        .withContext('icon count')
        .toEqual(0);
}

async function testPassword(options: {
    component: TextFieldComponent;
    harness: TextFieldHarness;
    format: TextFormat | null;
    type: FormElementType;
}) {
    const harness = options.harness;

    // button

    await harness.setPasswordVisible(false);
    expect(await harness.getButtonCount())
        .withContext('button count')
        .toEqual(1);
    expect(await harness.hasPasswordToggleButton())
        .withContext('has toggle')
        .toBeTrue();

    await harness.setPasswordVisible(true);
    expect(await harness.getButtonCount())
        .withContext('button count')
        .toEqual(1);
    expect(await harness.hasPasswordToggleButton())
        .withContext('has toggle')
        .toBeTrue();

    // type

    await harness.setPasswordVisible(false);
    expect(await harness.getInputType())
        .withContext('input type')
        .toEqual(FormElementType.password);

    await harness.setPasswordVisible(true);
    expect(await harness.getInputType())
        .withContext('input type')
        .toEqual(FormElementType.text);

    // icon

    await harness.setPasswordVisible(true);
    expect(await harness.buttonContainsIcon())
        .withContext('button contains icon')
        .toBeTrue();
    expect(await harness.getIconCount())
        .withContext('icon count')
        .toEqual(1);
    expect(await harness.getPasswordIconName())
        .withContext('visibility icon')
        .toEqual(Icon.visibility_off);

    await harness.setPasswordVisible(false);
    expect(await harness.buttonContainsIcon())
        .withContext('button contains icon')
        .toBeTrue();
    expect(await harness.getIconCount())
        .withContext('icon count')
        .toEqual(1);
    expect(await harness.getPasswordIconName())
        .withContext('visibility icon')
        .toEqual(Icon.visibility);
}

async function testPrefix(options: {
    component: TextFieldComponent;
    harness: TextFieldHarness;
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
    component: TextFieldComponent;
    harness: TextFieldHarness;
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
    component: TextFieldComponent;
    harness: TextFieldHarness;
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
    component: TextFieldComponent;
    harness: TextFieldHarness;
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
    component: TextFieldComponent;
    harness: TextFieldHarness;
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

async function testInput(options: {
    component: TextFieldComponent;
    harness: TextFieldHarness;
    id: true | string;
    type: FormElementType;
    maskedValue: string;
    label: string | null;
    placeholder: string | null;
    control: FormControl;
    focusable: boolean | null;
    format: TextFormat | null;
    minLength: number | null;
    maxLength: number | null;
    error: string;
    breakLine: boolean;
}): Promise<void> {
    const harness = options.harness;

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

    expect(await harness.getInputTabIndex()).toEqual(
        String(options.focusable ? 0 : -1),
    );

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

    // diabled

    expect(await harness.isInputDisabled())
        .withContext('disabled')
        .toEqual(options.control.disabled);

    // blur

    const spy = spyOn(options.component.onBlur, 'emit');
    await harness.blurInput();
    expect(spy).toHaveBeenCalledOnceWith();
}

async function testValue(options: {
    component: TextFieldComponent;
    harness: TextFieldHarness;
    control: FormControl;
    maskedValue: string;
}) {
    const harness = options.harness;
    const component = options.component;
    const componentControl = component.control();
    expect(componentControl?.value)
        .withContext('control.value')
        .toEqual(options.control.value);

    // masked value

    expect(await harness.getInputValue())
        .withContext('masked value')
        .toEqual(options.maskedValue);
}

export async function _testTextFieldComponent(options: {
    component: TextFieldComponent;
    harness: TextFieldHarness;
    id: true | string;
    type: FormElementType;
    maskedValue: string;
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
    breakLine: boolean;
}): Promise<void> {
    await testField(options);
    await testLabel(options);
    await testError(options);
    if (options.format == TextFormat.password) {
        await testPassword(options);
    } else {
        await testNonPassword(options);
    }
    await testPrefix(options);
    await testSuffix(options);
    await testInput(options);
    await testValue(options);
}

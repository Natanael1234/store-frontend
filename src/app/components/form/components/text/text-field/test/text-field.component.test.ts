import { Icon } from '../../../../../../enums/icons/icons.enum';
import { AutoCompleteType } from '../../../../enums/auto-complete-type/auto-complete-type.enum';
import { FormElementType } from '../../../../enums/form-element-type/form-element-type.enum';
import { TextFormat } from '../../../../enums/text-format/text-format.enum';
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

    expect(await harness.getChilCount())
        .withContext('host children count')
        .toEqual(1);

    expect(await harness.isChildAField())
        .withContext('host child is field')
        .toBeTrue();

    await testLabel(options);

    // appearance

    expect(await harness.getFieldAppearance())
        .withContext('appearance')
        .toEqual('outline');
}

async function testError(options: {
    component: TextFieldComponent;
    harness: TextFieldHarness;
    error: string;
}) {
    const harness = options.harness;
    const component = options.component;
    const control = component.control()!;

    control.markAsPristine();
    control.markAsUntouched();
    control.updateValueAndValidity();

    expect(await harness.getErrorCount())
        .withContext('error count')
        .toEqual(0);
    let errors = await harness.getErrors();
    expect(errors.length).withContext('field has no error').toEqual(0);

    control.markAsDirty();
    control.markAsTouched();
    control.updateValueAndValidity();

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
            .withContext('erro message')
            .toEqual(options.error);
    } else {
        expect(errors.length).withContext('field has no error').toEqual(0);
    }
}

async function testInput(options: {
    component: TextFieldComponent;
    harness: TextFieldHarness;
    id: true | string;
    type: FormElementType;
    controlValue: string;
    inputValue: string;
    label: string | null;
    placeholder: string | null;
    focusable: boolean | null;
    focused?: boolean;
    readOnly: boolean | null;
    autocomplete: AutoCompleteType | null;
    format: TextFormat | null;
    minLength: number | null;
    maxLength: number | null;
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

    if (options.focusable) {
        expect(await harness.getInputTabIndex())
            .withContext('tabIndex')
            .toEqual('0');
    } else {
        expect(await harness.getInputTabIndex())
            .withContext('tabIndex')
            .toEqual('-1');
    }

    // focused

    if (options.focused === true) {
        expect(await harness.isInputFocused())
            .withContext('input focused')
            .toBeTrue();
    } else if (options.focused === false) {
        expect(await harness.isInputFocused())
            .withContext('input focused')
            .toBeFalse();
    }

    // readonly

    if (options.readOnly) {
        expect(await harness.isInputReadOnly())
            .withContext('readOnly')
            .toBeTrue();
    } else {
        expect(await harness.isInputReadOnly())
            .withContext('readOnly')
            .toBeFalse();
    }

    // autocomplete

    expect(await harness.getAutocomplete())
        .withContext('autocomplete')
        .toEqual(options.autocomplete ?? AutoCompleteType.off);

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
        .toEqual(options.component.control()!.disabled);

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

export async function _testTextFieldComponent(options: {
    component: TextFieldComponent;
    harness: TextFieldHarness;
    id: true | string;
    type: FormElementType;
    controlValue: string;
    inputValue: string;
    label: string | null;
    placeholder: string | null;
    focusable: boolean | null;
    focused?: boolean;
    readOnly: boolean | null;
    autocomplete: AutoCompleteType | null;
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
}

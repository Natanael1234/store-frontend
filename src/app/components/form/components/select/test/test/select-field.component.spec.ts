import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { FormControl, Validators } from '@angular/forms';
import { SelectFieldComponent } from '../../select-field.component';
import { _testSelectField } from './select-field.component.test';
import { SelectFieldHarness } from './select-field.harness';

describe('SelectFieldComponent', () => {
    let component: SelectFieldComponent;
    let fixture: ComponentFixture<SelectFieldComponent>;
    let harness: SelectFieldHarness;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SelectFieldComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(SelectFieldComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render component with values', async () => {
        const control = new FormControl<string | null>(null);
        component.control.set(control);
        fixture.detectChanges();
        harness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            SelectFieldHarness,
        );
        component.id.set('select-id');
        component.label.set('Gender');
        component.options.set([
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
        ]);
        component.focusable.set(true);
        fixture.detectChanges();

        await _testSelectField({
            component,
            harness,
            id: 'select-id',
            label: 'Gender',
            focusable: true,
            control: control,
            required: false,
            options: [
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
            ],
            error: true,
        });
    });

    describe('bidings', () => {
        describe('id', () => {
            it('should bind id', async () => {
                const control = new FormControl<string | null>(null);
                component.control.set(control);
                fixture.detectChanges();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    SelectFieldHarness,
                );
                component.id.set('select-id');
                fixture.detectChanges();

                await _testSelectField({
                    component,
                    harness,
                    id: 'select-id',
                    label: '',
                    focusable: undefined,
                    control: control,
                    required: false,
                    options: [],
                    error: false,
                });
            });

            it('should user generated id by default', async () => {
                const control = new FormControl<string | null>(null);
                component.control.set(control);
                fixture.detectChanges();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    SelectFieldHarness,
                );
                fixture.detectChanges();

                await _testSelectField({
                    component,
                    harness,
                    id: true,
                    label: '',
                    focusable: undefined,
                    control: control,
                    required: false,
                    options: [],
                    error: false,
                });
            });
        });

        describe('label', () => {
            it('should bind label', async () => {
                const control = new FormControl<string | null>(null);
                component.control.set(control);
                fixture.detectChanges();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    SelectFieldHarness,
                );
                component.label.set('Select Label');
                fixture.detectChanges();

                await _testSelectField({
                    component,
                    harness,
                    id: true,
                    label: 'Select Label',
                    focusable: undefined,
                    control: control,
                    required: false,
                    options: [],
                    error: false,
                });
            });

            it('label should be empty by default', async () => {
                const control = new FormControl<string | null>(null);
                component.control.set(control);
                fixture.detectChanges();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    SelectFieldHarness,
                );
                fixture.detectChanges();

                await _testSelectField({
                    component,
                    harness,
                    id: true,
                    label: '',
                    focusable: undefined,
                    control: control,
                    required: false,
                    options: [],
                    error: false,
                });
            });
        });

        describe('control', () => {
            it('should reflect FormControl value changes', async () => {
                const control = new FormControl<string | null>(null, {});
                component.control.set(control);
                fixture.detectChanges();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    SelectFieldHarness,
                );
                component.options.set([
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                ]);
                control.setValue('2');
                fixture.detectChanges();

                await _testSelectField({
                    component,
                    harness,
                    id: true,
                    label: '',
                    focusable: undefined,
                    control: control,
                    required: false,
                    options: [
                        { value: '1', label: 'Option 1' },
                        { value: '2', label: 'Option 2' },
                    ],
                    error: false,
                });
            });

            it('should change FormControl value on option click', async () => {
                const control = new FormControl<string | null>(null);
                component.control.set(control);
                fixture.detectChanges();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    SelectFieldHarness,
                );
                component.options.set([
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                ]);
                fixture.detectChanges();

                await _testSelectField({
                    component,
                    harness,
                    id: true,
                    label: '',
                    focusable: undefined,
                    control: control,
                    required: false,
                    options: [
                        { value: '1', label: 'Option 1' },
                        { value: '2', label: 'Option 2' },
                    ],
                    error: false,
                });
            });
        });

        describe('focusable', () => {
            it('should use tabIndex = 0 by default', async () => {
                const control = new FormControl<string | null>(null);
                component.control.set(control);
                fixture.detectChanges();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    SelectFieldHarness,
                );

                await _testSelectField({
                    component,
                    harness,
                    id: true,
                    label: '',
                    focusable: true,
                    control: control,
                    required: false,
                    options: [],
                    error: false,
                });
            });

            it('should use tabIndex = -1 when focusable = false', async () => {
                const control = new FormControl<string | null>(null);
                component.control.set(control);
                fixture.detectChanges();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    SelectFieldHarness,
                );
                component.focusable.set(false);
                fixture.detectChanges();

                await _testSelectField({
                    component,
                    harness,
                    id: true,
                    label: '',
                    focusable: false,
                    control: control,
                    required: false,
                    options: [],
                    error: false,
                });
            });

            it('should use tabIndex = 0 when focusable = true', async () => {
                const control = new FormControl<string | null>(null);
                component.control.set(control);
                fixture.detectChanges();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    SelectFieldHarness,
                );

                await _testSelectField({
                    component,
                    harness,
                    id: true,
                    label: '',
                    focusable: true,
                    control: control,
                    required: false,
                    options: [],
                    error: false,
                });
            });
        });

        describe('required', () => {
            it('should show required error whrn form conytrol is marked as required', async () => {
                const control = new FormControl<string | null>(null, {
                    validators: [Validators.required],
                });
                component.control.set(control);
                fixture.detectChanges();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    SelectFieldHarness,
                );

                await _testSelectField({
                    component,
                    harness,
                    id: true,
                    label: '',
                    focusable: true,
                    control: control,
                    required: true,
                    options: [],
                    error: false,
                });
            });

            it('should use tabIndex = -1 when focusable = false', async () => {
                const control = new FormControl<string | null>(null);
                component.control.set(control);
                fixture.detectChanges();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    SelectFieldHarness,
                );
                component.focusable.set(false);
                fixture.detectChanges();

                await _testSelectField({
                    component,
                    harness,
                    id: true,
                    label: '',
                    focusable: false,
                    control: control,
                    required: false,
                    options: [],
                    error: false,
                });
            });

            it('should use tabIndex = 0 when focusable = true', async () => {
                const control = new FormControl<string | null>(null);
                component.control.set(control);
                fixture.detectChanges();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    SelectFieldHarness,
                );

                await _testSelectField({
                    component,
                    harness,
                    id: true,
                    label: '',
                    focusable: true,
                    control: control,
                    required: false,
                    options: [],
                    error: false,
                });
            });
        });

        describe('options', () =>
            it('should render select field with options', async () => {
                const control = new FormControl<string | null>(null);
                component.control.set(control);
                fixture.detectChanges();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    SelectFieldHarness,
                );
                component.options.set([
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                ]);
                fixture.detectChanges();

                await _testSelectField({
                    component,
                    harness,
                    id: true,
                    label: '',
                    focusable: undefined,
                    control: control,
                    required: false,
                    options: [
                        { value: '1', label: 'Option 1' },
                        { value: '2', label: 'Option 2' },
                    ],
                    error: false,
                });
            }));

        it('should render select field without options when options is undefined', async () => {
            component = fixture.componentInstance;
            const control = new FormControl(null);
            component.control.set(control);
            fixture.detectChanges();
            harness = await TestbedHarnessEnvironment.harnessForFixture(
                fixture,
                SelectFieldHarness,
            );
            component.options.set(undefined);
            fixture.detectChanges();

            await _testSelectField({
                component,
                harness,
                id: true,
                label: '',
                focusable: undefined,
                control: control,
                required: false,
                options: [],
                error: false,
            });
        });

        it('should render select field without options when options is empty array', async () => {
            const control = new FormControl(null);
            component.control.set(control);
            fixture.detectChanges();
            harness = await TestbedHarnessEnvironment.harnessForFixture(
                fixture,
                SelectFieldHarness,
            );
            component.options.set([]);
            fixture.detectChanges();

            await _testSelectField({
                component,
                harness,
                id: true,
                label: '',
                focusable: undefined,
                control: control,
                required: false,
                options: [],
                error: false,
            });
        });
    });
});

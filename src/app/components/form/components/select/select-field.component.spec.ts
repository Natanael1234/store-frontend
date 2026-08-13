import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentHarness } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SelectFieldComponent } from '@components/form/components/select/select-field.component';
import { SelectFieldHarness } from '@components/form/components/select/select-field.harness';

describe('SelectFieldComponent.', () => {
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

    it('should create.', () => {
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
            { value: '1', label: 'Male' },
            { value: '2', label: 'Female' },
        ]);

        const state = await harness.getState();
        fixture.detectChanges();

        expect(state).toEqual({
            id: 'select-id',
            label: 'Gender',
            selectedValueLabel: '',
            isOpen: false,
            focused: false,
            disabled: false,
            hasError: false,
            options: [
                { selected: false, label: 'Male' },
                { selected: false, label: 'Female' },
            ],
            hasValidStructure: true,
        });
    });

    describe('bidings.', () => {
        describe('id.', () => {
            it('should bind id', async () => {
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
                    { value: '1', label: 'Male' },
                    { value: '2', label: 'Female' },
                ]);

                fixture.detectChanges();

                const state = await harness.getState();
                //
                expect(state).toEqual({
                    id: 'select-id',
                    label: 'Gender',
                    selectedValueLabel: '',
                    isOpen: false,
                    focused: false,
                    disabled: false,
                    hasError: false,
                    options: [
                        { selected: false, label: 'Male' },
                        { selected: false, label: 'Female' },
                    ],
                    hasValidStructure: true,
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
                component.label.set('Gender');
                component.options.set([
                    { value: '1', label: 'Male' },
                    { value: '2', label: 'Female' },
                ]);
                fixture.detectChanges();

                const state = await harness.getState();

                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-select-[a-z0-9]+$/),
                    label: 'Gender',
                    selectedValueLabel: '',
                    isOpen: false,
                    focused: false,
                    disabled: false,
                    hasError: false,
                    options: [
                        { selected: false, label: 'Male' },
                        { selected: false, label: 'Female' },
                    ],
                    hasValidStructure: true,
                });
            });
        });

        describe('label.', () => {
            it('should bind label', async () => {
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
                    { value: '1', label: 'Male' },
                    { value: '2', label: 'Female' },
                ]);

                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: 'select-id',
                    label: 'Gender',
                    selectedValueLabel: '',
                    isOpen: false,
                    focused: false,
                    disabled: false,
                    hasError: false,
                    options: [
                        { selected: false, label: 'Male' },
                        { selected: false, label: 'Female' },
                    ],
                    hasValidStructure: true,
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
                component.id.set('select-id');
                component.options.set([
                    { value: '1', label: 'Male' },
                    { value: '2', label: 'Female' },
                ]);

                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: 'select-id',
                    label: '',
                    selectedValueLabel: '',
                    isOpen: false,
                    focused: false,
                    disabled: false,
                    hasError: false,
                    options: [
                        { selected: false, label: 'Male' },
                        { selected: false, label: 'Female' },
                    ],
                    hasValidStructure: true,
                });
            });
        });

        describe('control.', () => {
            it('should reflect value from FormControl', async () => {
                const control = new FormControl<string | null>('1', {});
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

                // initial state
                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-select-[a-z0-9]+$/),
                    label: '',
                    selectedValueLabel: 'Option 1',
                    isOpen: false,
                    focused: false,
                    disabled: false,
                    hasError: false,
                    options: [
                        { selected: true, label: 'Option 1' },
                        { selected: false, label: 'Option 2' },
                    ],
                    hasValidStructure: true,
                });
            });

            it('should reflect value from FormControl when it is null', async () => {
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
                fixture.detectChanges();

                // initial state
                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-select-[a-z0-9]+$/),
                    label: '',
                    selectedValueLabel: '',
                    isOpen: false,
                    focused: false,
                    disabled: false,
                    hasError: false,
                    options: [
                        { selected: false, label: 'Option 1' },
                        { selected: false, label: 'Option 2' },
                    ],
                    hasValidStructure: true,
                });
            });

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

                // altered state
                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-select-[a-z0-9]+$/),
                    label: '',
                    selectedValueLabel: 'Option 2',
                    isOpen: false,
                    focused: false,
                    disabled: false,
                    hasError: false,
                    options: [
                        { selected: false, label: 'Option 1' },
                        { selected: true, label: 'Option 2' },
                    ],
                    hasValidStructure: true,
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

                // initial state
                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-select-[a-z0-9]+$/),
                    label: '',
                    selectedValueLabel: '',
                    isOpen: false,
                    focused: false,
                    disabled: false,
                    hasError: false,
                    options: [
                        { selected: false, label: 'Option 1' },
                        { selected: false, label: 'Option 2' },
                    ],
                    hasValidStructure: true,
                });

                // open select and click option 2
                const selectHerness = await harness.getSelectHarness();
                await selectHerness.open();
                const optionsHarnesses = await harness.getOptionsHarnesses();
                await optionsHarnesses[1].click();
                fixture.detectChanges();

                // form control value change to option 2 value?
                expect(control.value)
                    .withContext('form control value')
                    .toEqual('2');

                // selected option change to option 2?
                let state2 = await harness.getState();

                expect(state2).toEqual({
                    id: jasmine.stringMatching(/^mat-select-[a-z0-9]+$/),
                    label: '',
                    selectedValueLabel: 'Option 2',
                    isOpen: false,
                    focused: true,
                    disabled: false,
                    hasError: false,
                    options: [
                        { selected: false, label: 'Option 1' },
                        { selected: true, label: 'Option 2' },
                    ],
                    hasValidStructure: true,
                });
            });
        });

        describe('disabled.', () => {
            it('should set not disabled by default', async () => {
                const control = new FormControl<string | null>(null);
                control.enable();
                component.control.set(control);
                fixture.detectChanges();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    SelectFieldHarness,
                );
                component.id.set('select-id');
                component.label.set('Gender');
                component.options.set([
                    { value: '1', label: 'Male' },
                    { value: '2', label: 'Female' },
                ]);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: 'select-id',
                    label: 'Gender',
                    selectedValueLabel: '',
                    isOpen: false,
                    focused: false,
                    disabled: false, // <---- test
                    hasError: false,
                    options: [
                        { selected: false, label: 'Male' },
                        { selected: false, label: 'Female' },
                    ],
                    hasValidStructure: true,
                });
            });

            it('should set not disabled', async () => {
                const control = new FormControl<string | null>(null);
                component.control.set(control);
                component.control.set(control);
                fixture.detectChanges();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    SelectFieldHarness,
                );
                component.id.set('select-id');
                component.label.set('Gender');
                component.options.set([
                    { value: '1', label: 'Male' },
                    { value: '2', label: 'Female' },
                ]);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: 'select-id',
                    label: 'Gender',
                    selectedValueLabel: '',
                    isOpen: false,
                    focused: false,
                    disabled: false, // <---- test
                    hasError: false,
                    options: [
                        { selected: false, label: 'Male' },
                        { selected: false, label: 'Female' },
                    ],
                    hasValidStructure: true,
                });
            });

            it('should set disabled', async () => {
                const control = new FormControl<string | null>(null);
                control.disable();
                component.control.set(control);
                fixture.detectChanges();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    SelectFieldHarness,
                );
                component.id.set('select-id');
                component.label.set('Gender');
                component.options.set([
                    { value: '1', label: 'Male' },
                    { value: '2', label: 'Female' },
                ]);
                fixture.detectChanges();

                const state = await harness.getState();

                expect(state).toEqual({
                    id: 'select-id',
                    label: 'Gender',
                    selectedValueLabel: '',
                    isOpen: false,
                    focused: false,
                    disabled: true, // <---- test
                    hasError: false,
                    options: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('error.', () => {
            it('should show error when form control is invalid', async () => {
                const control = new FormControl<string | null>(null, {
                    validators: [Validators.required],
                });
                component.control.set(control);
                control.markAsDirty();
                control.markAsTouched();
                control.updateValueAndValidity();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    SelectFieldHarness,
                );
                component.id.set('select-id');
                component.label.set('Gender');
                component.options.set([]);

                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: 'select-id',
                    label: 'Gender',
                    selectedValueLabel: '',
                    isOpen: false,
                    focused: false,
                    disabled: false,
                    hasError: true,
                    options: [],
                    hasValidStructure: true,
                });
            });

            it('should not show error when form control is not invalid', async () => {
                const control = new FormControl<string | null>(null);
                component.control.set(control);
                control.markAsDirty();
                control.markAsTouched();
                control.updateValueAndValidity();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    SelectFieldHarness,
                );
                component.id.set('select-id');
                component.label.set('Gender');
                component.options.set([]);

                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: 'select-id',
                    label: 'Gender',
                    selectedValueLabel: '',
                    isOpen: false,
                    focused: false,
                    disabled: false,
                    hasError: false,
                    options: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('options', () => {
            it('should render select field with options', async () => {
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
                    { value: '1', label: 'Male' },
                    { value: '2', label: 'Female' },
                ]);

                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: 'select-id',
                    label: 'Gender',
                    selectedValueLabel: '',
                    isOpen: false,
                    focused: false,
                    disabled: false,
                    hasError: false,
                    options: [
                        { selected: false, label: 'Male' },
                        { selected: false, label: 'Female' },
                    ],
                    hasValidStructure: true,
                });
            });

            it('should render select field without options', async () => {
                const control = new FormControl<string | null>(null);
                component.control.set(control);
                fixture.detectChanges();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    SelectFieldHarness,
                );
                component.id.set('select-id');
                component.label.set('Gender');
                component.options.set([]);

                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: 'select-id',
                    label: 'Gender',
                    selectedValueLabel: '',
                    isOpen: false,
                    focused: false,
                    disabled: false,
                    hasError: false,
                    options: [],
                    hasValidStructure: true,
                });
            });

            it('should render select field without options by default', async () => {
                const control = new FormControl<string | null>(null);
                component.control.set(control);
                fixture.detectChanges();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    SelectFieldHarness,
                );
                component.id.set('select-id');
                component.label.set('Gender');

                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: 'select-id',
                    label: 'Gender',
                    selectedValueLabel: '',
                    isOpen: false,
                    focused: false,
                    disabled: false,
                    hasError: false,
                    options: [],
                    hasValidStructure: true,
                });
            });
        });
    });
});

describe('autofocus.', () => {
    /** As the first focusable element is automatically focused creates a scenario where the field is the second focusable element. */
    @Component({
        selector: 'autofocus-test',
        imports: [SelectFieldComponent],
        template: `
            <!-- button is focused by default -->
            <button>Test</button>
            <app-select-field
                id="select-id"
                [control]="control"
                [options]="[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                ]" />
        `,
    })
    class AutofocusTestComponent {
        control = new FormControl('');
    }

    class TestHarness extends ComponentHarness {
        static hostSelector = 'autofocus-test';
        private selectFieldHarness = this.locatorFor(SelectFieldHarness);
        getSelectFieldHarness() {
            return this.selectFieldHarness();
        }
    }

    let testHarness: TestHarness;
    let fixture: ComponentFixture<AutofocusTestComponent>;
    let selectFieldHarness: SelectFieldHarness;
    let selectFieldComponent: SelectFieldComponent;

    beforeEach(async () => {
        fixture = TestBed.createComponent(AutofocusTestComponent);
        fixture.detectChanges();
        testHarness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            TestHarness,
        );
        selectFieldComponent =
            fixture.debugElement.children[1].componentInstance;
        selectFieldHarness = await testHarness.getSelectFieldHarness();
    });

    it('should set autofocus = false by default.', async () => {
        selectFieldComponent.label.set('Gender');
        selectFieldComponent.options.set([
            { value: '1', label: 'Male' },
            { value: '2', label: 'Female' },
        ]);
        fixture.detectChanges();

        const state = await selectFieldHarness.getState();
        expect(state).toEqual({
            id: 'select-id',
            label: 'Gender',
            selectedValueLabel: '',
            isOpen: false,
            focused: false,
            disabled: false,
            hasError: false,
            options: [
                { selected: false, label: 'Male' },
                { selected: false, label: 'Female' },
            ],
            hasValidStructure: true,
        });
    });

    it('should set autofocus = false.', async () => {
        selectFieldComponent.label.set('Gender');
        selectFieldComponent.options.set([
            { value: '1', label: 'Male' },
            { value: '2', label: 'Female' },
        ]);
        selectFieldComponent.autofocus.set(false);
        fixture.detectChanges();

        const state = await selectFieldHarness.getState();
        expect(state).toEqual({
            id: 'select-id',
            label: 'Gender',
            selectedValueLabel: '',
            isOpen: false,
            focused: false,
            disabled: false,
            hasError: false,
            options: [
                { selected: false, label: 'Male' },
                { selected: false, label: 'Female' },
            ],
            hasValidStructure: true,
        });
    });

    it('should set autofocus = true.', async () => {
        selectFieldComponent.label.set('Gender');
        selectFieldComponent.options.set([
            { value: '1', label: 'Male' },
            { value: '2', label: 'Female' },
        ]);
        selectFieldComponent.autofocus.set(true);
        fixture.detectChanges();

        const state = await selectFieldHarness.getState();
        expect(state).toEqual({
            id: 'select-id',
            label: 'Gender',
            selectedValueLabel: '',
            isOpen: false,
            focused: true,
            disabled: false,
            hasError: false,
            options: [
                { selected: false, label: 'Male' },
                { selected: false, label: 'Female' },
            ],
            hasValidStructure: true,
        });
    });
});

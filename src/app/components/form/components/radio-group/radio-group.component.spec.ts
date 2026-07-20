import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentHarness } from '@angular/cdk/testing';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AutofocusDirective } from '../../directives/autofocus/autofocus.directive';
import { RadioGroupComponent } from './radio-group.component';
import { RadioGroupHarness } from './radio-group.harness';

describe('RadioGroupComponent.', () => {
    let component: RadioGroupComponent;
    let fixture: ComponentFixture<RadioGroupComponent>;
    let control: FormControl;
    let harness: RadioGroupHarness;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RadioGroupComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RadioGroupComponent);

        component = fixture.componentInstance;
        control = new FormControl();
        component.control.set(control);
        fixture.detectChanges();
        harness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            RadioGroupHarness,
        );
    });

    it('should create.', () => {
        expect(component).toBeTruthy();
    });

    describe('bidings.', () => {
        describe('id.', () => {
            it('should bind id', async () => {
                component.id.set('radio-group-id');

                const state = await harness.getState();
                expect(state).toEqual({
                    id: 'radio-group-id',
                    label: '',
                    value: null,
                    options: [],
                    isFocused: false,
                    hasError: false,
                    hasValidStructure: true,
                });
            });

            it('should user empty id by default', async () => {
                const state = await harness.getState();
                expect(state).toEqual({
                    id: '',
                    label: '',
                    value: null,
                    options: [],
                    isFocused: false,
                    hasError: false,
                    hasValidStructure: true,
                });
            });
        });

        describe('label.', () => {
            it('should bind label', async () => {
                component.label.set('Radio Group');

                const state = await harness.getState();
                expect(state).toEqual({
                    id: '',
                    label: 'Radio Group',
                    value: null,
                    options: [],
                    isFocused: false,
                    hasError: false,
                    hasValidStructure: true,
                });
            });

            it('label should be empty by default', async () => {
                const state = await harness.getState();
                expect(state).toEqual({
                    id: '',
                    label: '',
                    value: null,
                    options: [],
                    isFocused: false,
                    hasError: false,
                    hasValidStructure: true,
                });
            });
        });

        describe('disabled.', () => {
            it('should set component disabled', async () => {
                control.disable();
                component.control.set(control);
                component.label.set('Radio Group');
                component.options.set([
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                ]);

                const state = await harness.getState();
                expect(state).toEqual({
                    id: '',
                    label: 'Radio Group',
                    value: null,
                    options: [
                        {
                            id: jasmine.stringMatching(/^mat-radio-[a-z0-9]+$/),
                            value: 'option1',
                            label: 'Option 1',
                            isChecked: false,
                            isFocused: false,
                            isDisabled: true,
                        },
                        {
                            id: jasmine.stringMatching(/^mat-radio-[a-z0-9]+$/),
                            value: 'option2',
                            label: 'Option 2',
                            isChecked: false,
                            isFocused: false,
                            isDisabled: true,
                        },
                    ],
                    isFocused: false,
                    hasError: false,
                    hasValidStructure: true,
                });
            });

            it('label should set component not disabled', async () => {
                control.enable();
                component.label.set('Radio Group');
                component.options.set([
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                ]);

                const state = await harness.getState();
                expect(state).toEqual({
                    id: '',
                    label: 'Radio Group',
                    value: null,
                    options: [
                        {
                            id: jasmine.stringMatching(/^mat-radio-[a-z0-9]+$/),
                            value: 'option1',
                            label: 'Option 1',
                            isChecked: false,
                            isFocused: false,
                            isDisabled: false,
                        },
                        {
                            id: jasmine.stringMatching(/^mat-radio-[a-z0-9]+$/),
                            value: 'option2',
                            label: 'Option 2',
                            isChecked: false,
                            isFocused: false,
                            isDisabled: false,
                        },
                    ],
                    isFocused: false,
                    hasError: false,
                    hasValidStructure: true,
                });
            });
        });

        xdescribe('focusable.', () => {
            it('should use tabIndex = 0 by default', async () => {
                component.options.set([
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                ]);

                const state = await harness.getState();
                expect(state).toEqual({
                    id: '',
                    label: '',
                    value: null,
                    options: [
                        {
                            id: jasmine.stringMatching(/^mat-radio-[a-z0-9]+$/),
                            value: '1',
                            label: 'Option 1',
                            isChecked: true,
                            isFocused: true,
                            isDisabled: false,
                        },
                        {
                            id: jasmine.stringMatching(/^mat-radio-[a-z0-9]+$/),
                            value: '2',
                            label: 'Option 2',
                            isChecked: false,
                            isFocused: false,
                            isDisabled: false,
                        },
                    ],
                    isFocused: true,
                    hasError: false,
                    hasValidStructure: true,
                });
            });

            xit('should use tabIndex = -1 when focusable = false.', () => {});

            xit('should use tabIndex = 0 when focusable = true.', () => {});
        });

        describe('options', () => {
            it('should render radio group with options', async () => {
                component.options.set([
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                ]);
                const radios = await harness.getRadioButtons();
                await radios[0].check();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: '',
                    label: '',
                    value: '1',
                    options: [
                        {
                            id: jasmine.stringMatching(/^mat-radio-[a-z0-9]+$/),
                            value: '1',
                            label: 'Option 1',
                            isChecked: true,
                            isFocused: true,
                            isDisabled: false,
                        },
                        {
                            id: jasmine.stringMatching(/^mat-radio-[a-z0-9]+$/),
                            value: '2',
                            label: 'Option 2',
                            isChecked: false,
                            isFocused: false,
                            isDisabled: false,
                        },
                    ],
                    isFocused: true,
                    hasError: false,
                    hasValidStructure: true,
                });
            });

            it('should render radio group when options is an empty array', async () => {
                component.options.set([]);
                const state = await harness.getState();
                expect(state).toEqual({
                    id: '',
                    label: '',
                    value: null,
                    options: [],
                    isFocused: false,
                    hasError: false,
                    hasValidStructure: true,
                });
            });

            it('should render radio group when options is not defined', async () => {
                const state = await harness.getState();
                expect(state).toEqual({
                    id: '',
                    label: '',
                    value: null,
                    options: [],
                    isFocused: false,
                    hasError: false,
                    hasValidStructure: true,
                });
            });
        });

        describe('control.', () => {
            it('should reflect FormControl value changes', async () => {
                component.options.set([
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                ]);
                control.setValue('2');

                const state = await harness.getState();
                expect(state).toEqual({
                    id: '',
                    label: '',
                    value: '2',
                    options: [
                        {
                            id: jasmine.stringMatching(/^mat-radio-[a-z0-9]+$/),
                            value: '1',
                            label: 'Option 1',
                            isChecked: false,
                            isFocused: false,
                            isDisabled: false,
                        },
                        {
                            id: jasmine.stringMatching(/^mat-radio-[a-z0-9]+$/),
                            value: '2',
                            label: 'Option 2',
                            isChecked: true,
                            isFocused: false,
                            isDisabled: false,
                        },
                    ],
                    isFocused: false,
                    hasError: false,
                    hasValidStructure: true,
                });
            });

            it('should change FormControl value on option check', async () => {
                component.options.set([
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                ]);
                const radios = await harness.getRadioButtons();
                await radios[0].check();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: '',
                    label: '',
                    value: '1',
                    options: [
                        {
                            id: jasmine.stringMatching(/^mat-radio-[a-z0-9]+$/),
                            value: '1',
                            label: 'Option 1',
                            isChecked: true,
                            isFocused: true,
                            isDisabled: false,
                        },
                        {
                            id: jasmine.stringMatching(/^mat-radio-[a-z0-9]+$/),
                            value: '2',
                            label: 'Option 2',
                            isChecked: false,
                            isFocused: false,
                            isDisabled: false,
                        },
                    ],
                    isFocused: true,
                    hasError: false,
                    hasValidStructure: true,
                });
            });
        });

        describe('error.', () => {
            it('should display error', async () => {
                component.options.set([
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                ]);
                control.setValidators([Validators.required]);
                control.markAsDirty();
                control.markAsTouched();
                control.updateValueAndValidity();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: '',
                    label: '',
                    value: null,
                    options: [
                        {
                            id: jasmine.stringMatching(/^mat-radio-[a-z0-9]+$/),
                            value: '1',
                            label: 'Option 1',
                            isChecked: false,
                            isFocused: false,
                            isDisabled: false,
                        },
                        {
                            id: jasmine.stringMatching(/^mat-radio-[a-z0-9]+$/),
                            value: '2',
                            label: 'Option 2',
                            isChecked: false,
                            isFocused: false,
                            isDisabled: false,
                        },
                    ],
                    isFocused: false,
                    hasError: true,
                    hasValidStructure: true,
                });
            });

            it('should not display error', async () => {
                component.options.set([
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                ]);
                control.setValidators([Validators.required]);
                const radios = await harness.getRadioButtons();
                await radios[0].check();
                control.markAsDirty();
                control.markAsTouched();
                control.updateValueAndValidity();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: '',
                    label: '',
                    value: '1',
                    options: [
                        {
                            id: jasmine.stringMatching(/^mat-radio-[a-z0-9]+$/),
                            value: '1',
                            label: 'Option 1',
                            isChecked: true,
                            isFocused: true,
                            isDisabled: false,
                        },
                        {
                            id: jasmine.stringMatching(/^mat-radio-[a-z0-9]+$/),
                            value: '2',
                            label: 'Option 2',
                            isChecked: false,
                            isFocused: false,
                            isDisabled: false,
                        },
                    ],
                    isFocused: true,
                    hasError: false,
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
        imports: [RadioGroupComponent, AutofocusDirective],
        template: `
            <!-- button is focused by default -->
            <button>Test</button>
            <app-radio-group
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
        private radioGroupHarness = this.locatorFor(RadioGroupHarness);
        getRadioGroupHarness() {
            return this.radioGroupHarness();
        }
    }

    let testHarness: TestHarness;
    let fixture: ComponentFixture<AutofocusTestComponent>;
    let radioGroupHarness: RadioGroupHarness;
    let radioGroupComponent: RadioGroupComponent;
    let loader: any;

    beforeEach(async () => {
        fixture = TestBed.createComponent(AutofocusTestComponent);
        fixture.detectChanges();
        testHarness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            TestHarness,
        );
        radioGroupComponent =
            fixture.debugElement.children[1].componentInstance;
        radioGroupHarness = await testHarness.getRadioGroupHarness();

        loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('should set autofocus = false by default.', async () => {
        radioGroupComponent.label.set('Gender');
        radioGroupComponent.options.set([
            { value: '1', label: 'Male' },
            { value: '2', label: 'Female' },
        ]);
        fixture.detectChanges();
        await fixture.whenStable();

        const state = await radioGroupHarness.getState();
        expect(state).toEqual({
            id: 'select-id',
            label: 'Gender',
            value: null,
            options: [
                {
                    id: jasmine.stringMatching(/^mat-radio-[a-z0-9]+$/),
                    value: '1',
                    label: 'Male',
                    isChecked: false,
                    isFocused: false,
                    isDisabled: false,
                },
                {
                    id: jasmine.stringMatching(/^mat-radio-[a-z0-9]+$/),
                    value: '2',
                    label: 'Female',
                    isChecked: false,
                    isFocused: false,
                    isDisabled: false,
                },
            ],
            isFocused: false,
            hasError: false,
            hasValidStructure: true,
        });
    });

    it('should set autofocus = false.', async () => {
        radioGroupComponent.label.set('Gender');
        radioGroupComponent.options.set([
            { value: '1', label: 'Male' },
            { value: '2', label: 'Female' },
        ]);
        radioGroupComponent.autofocus.set(false);
        fixture.detectChanges();
        await fixture.whenStable();

        const state = await radioGroupHarness.getState();
        expect(state).toEqual({
            id: 'select-id',
            label: 'Gender',
            value: null,
            options: [
                {
                    id: jasmine.stringMatching(/^mat-radio-[a-z0-9]+$/),
                    value: '1',
                    label: 'Male',
                    isChecked: false,
                    isFocused: false,
                    isDisabled: false,
                },
                {
                    id: jasmine.stringMatching(/^mat-radio-[a-z0-9]+$/),
                    value: '2',
                    label: 'Female',
                    isChecked: false,
                    isFocused: false,
                    isDisabled: false,
                },
            ],
            isFocused: false,
            hasError: false,
            hasValidStructure: true,
        });
    });

    it('should set autofocus = true.', async () => {
        radioGroupComponent.label.set('Gender');
        radioGroupComponent.options.set([
            { value: '1', label: 'Male' },
            { value: '2', label: 'Female' },
        ]);
        radioGroupComponent.autofocus.set(true);
        fixture.detectChanges();
        await fixture.whenStable();

        const state = await radioGroupHarness.getState();
        expect(state).toEqual({
            id: 'select-id',
            label: 'Gender',
            value: null,
            options: [
                {
                    id: jasmine.stringMatching(/^mat-radio-[a-z0-9]+$/),
                    value: '1',
                    label: 'Male',
                    isChecked: false,
                    isFocused: true,
                    isDisabled: false,
                },
                {
                    id: jasmine.stringMatching(/^mat-radio-[a-z0-9]+$/),
                    value: '2',
                    label: 'Female',
                    isChecked: false,
                    isFocused: false,
                    isDisabled: false,
                },
            ],
            isFocused: true,
            hasError: false,
            hasValidStructure: true,
        });
    });
});

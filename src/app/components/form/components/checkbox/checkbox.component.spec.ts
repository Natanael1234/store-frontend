import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentHarness } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CheckboxComponent } from './checkbox.component';
import { CheckboxHarness } from './checkbox.harness';

describe('CheckboxFormElement.', () => {
    let component: CheckboxComponent;
    let fixture: ComponentFixture<CheckboxComponent>;
    let harness: CheckboxHarness;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CheckboxComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CheckboxComponent);
        component = fixture.componentInstance;
    });

    it('should create', async () => {
        const control = new FormControl(false);
        component.control.set(control);
        fixture.detectChanges();
        harness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            CheckboxHarness,
        );

        expect(component).toBeTruthy();
    });

    describe('id.', () => {
        it('should render the id correctly', async () => {
            component.id.set('checkbox-id');
            const control = new FormControl(false);
            component.control.set(control);
            fixture.detectChanges();
            harness = await TestbedHarnessEnvironment.harnessForFixture(
                fixture,
                CheckboxHarness,
            );

            const state = await harness.getState();
            expect(state).toEqual({
                id: 'checkbox-id',
                label: '',
                isFocused: false,
                isDisabled: false,
                isChecked: false,
                hasError: false,
                hasValidStructure: true,
            });
        });

        it('should render empty id by default', async () => {
            const control = new FormControl(false);
            component.control.set(control);
            fixture.detectChanges();
            harness = await TestbedHarnessEnvironment.harnessForFixture(
                fixture,
                CheckboxHarness,
            );

            const state = await harness.getState();
            expect(state).toEqual({
                id: '',
                label: '',
                isFocused: false,
                isDisabled: false,
                isChecked: false,
                hasError: false,
                hasValidStructure: true,
            });
        });
    });

    describe('label.', () => {
        it('should render the label correctly', async () => {
            component.label.set('Accept terms');
            const control = new FormControl(false);
            component.control.set(control);
            fixture.detectChanges();
            harness = await TestbedHarnessEnvironment.harnessForFixture(
                fixture,
                CheckboxHarness,
            );

            const state = await harness.getState();
            expect(state).toEqual({
                id: '',
                label: 'Accept terms',
                isFocused: false,
                isDisabled: false,
                isChecked: false,
                hasError: false,
                hasValidStructure: true,
            });
        });

        it('should render empty label by default', async () => {
            const control = new FormControl(false);
            component.control.set(control);
            fixture.detectChanges();
            harness = await TestbedHarnessEnvironment.harnessForFixture(
                fixture,
                CheckboxHarness,
            );

            const state = await harness.getState();
            expect(state).toEqual({
                id: '',
                label: '',
                isFocused: false,
                isDisabled: false,
                isChecked: false,
                hasError: false,
                hasValidStructure: true,
            });
        });
    });

    describe('control.', () => {
        describe('value.', () => {
            it('should reflect FormControl value = true', async () => {
                const control = new FormControl(true);
                component.control.set(control);
                fixture.detectChanges();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    CheckboxHarness,
                );

                const state = await harness.getState();
                expect(state).toEqual({
                    id: '',
                    label: '',
                    isFocused: false,
                    isDisabled: false,
                    isChecked: true,
                    hasError: false,
                    hasValidStructure: true,
                });
            });

            it('should reflect FormControl value = false', async () => {
                const control = new FormControl(false);
                component.control.set(control);
                fixture.detectChanges();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    CheckboxHarness,
                );

                const state = await harness.getState();
                expect(state).toEqual({
                    id: '',
                    label: '',
                    isFocused: false,
                    isDisabled: false,
                    isChecked: false,
                    hasError: false,
                    hasValidStructure: true,
                });
            });

            it('should change FormControl value from false to true on chekbox click', async () => {
                const control = new FormControl(false);
                component.control.set(control);
                fixture.detectChanges();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    CheckboxHarness,
                );
                await harness.click();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: '',
                    label: '',
                    isFocused: false,
                    isDisabled: false,
                    isChecked: true,
                    hasError: false,
                    hasValidStructure: true,
                });
            });

            it('should change FormControl value from true to false on chekbox click', async () => {
                const control = new FormControl(true);
                component.control.set(control);
                fixture.detectChanges();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    CheckboxHarness,
                );
                await harness.click();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: '',
                    label: '',
                    isFocused: false,
                    isDisabled: false,
                    isChecked: false,
                    hasError: false,
                    hasValidStructure: true,
                });
            });
        });

        describe('disabled.', () => {
            it('should be enabled when form control is enabled', async () => {
                const control = new FormControl(false);
                control.enable();
                component.control.set(control);
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    CheckboxHarness,
                );
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: '',
                    label: '',
                    isFocused: false,
                    isDisabled: false,
                    isChecked: false,
                    hasError: false,
                    hasValidStructure: true,
                });
            });

            it('should be disabled when form control is disabled', async () => {
                const control = new FormControl(false);
                control.disable();
                component.control.set(control);
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    CheckboxHarness,
                );
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: '',
                    label: '',
                    isFocused: false,
                    isDisabled: true,
                    isChecked: false,
                    hasError: false,
                    hasValidStructure: true,
                });
            });
        });

        describe('required.', () => {
            it('should display * when the control is required', async () => {
                const control = new FormControl(false);
                component.control.set(control);
                component.label.set('Email Notifications');
                component.control.set(new FormControl('', Validators.required));
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    CheckboxHarness,
                );

                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: '',
                    label: 'Email Notifications *',
                    isFocused: false,
                    isDisabled: false,
                    isChecked: false,
                    hasError: false,
                    hasValidStructure: true,
                });
            });

            it('should not display * when the control is not required', async () => {
                const control = new FormControl(false);
                component.control.set(control);
                component.label.set('Optional Field');
                fixture.detectChanges();
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    CheckboxHarness,
                );

                const state = await harness.getState();
                expect(state).toEqual({
                    id: '',
                    label: 'Optional Field',
                    isFocused: false,
                    isDisabled: false,
                    isChecked: false,
                    hasError: false,
                    hasValidStructure: true,
                });
            });
        });
    });
});

describe('CheckboxFormElement.', () => {
    describe('autofocus.', () => {
        /** As the first focusable element is automatically focused creates a scenario where the field is the second focusable element. */
        @Component({
            selector: 'autofocus-test',
            imports: [CheckboxComponent],
            template: `
                <!-- button is focused by default -->
                <button>Test</button>
                <app-checkbox
                    id="input"
                    [control]="control"
                    [autofocus]="false" />
            `,
        })
        class AutofocusTestComponent {
            control = new FormControl('');
        }

        class TestHarness extends ComponentHarness {
            static hostSelector = 'autofocus-test';
            private checkboxHarness = this.locatorFor(CheckboxHarness);
            getNumericFieldHarness() {
                return this.checkboxHarness();
            }
        }

        let testHarness: TestHarness;
        let testFixture: ComponentFixture<AutofocusTestComponent>;
        let checkboxdHarness: CheckboxHarness;
        let checkboxComponent: CheckboxComponent;

        beforeEach(async () => {
            testFixture = TestBed.createComponent(AutofocusTestComponent);
            testHarness = await TestbedHarnessEnvironment.harnessForFixture(
                testFixture,
                TestHarness,
            );
            checkboxComponent =
                testFixture.debugElement.children[1].componentInstance;
            checkboxComponent.control.set(new FormControl(false));
            checkboxdHarness = await testHarness.getNumericFieldHarness();
            testFixture.detectChanges();
        });

        it('should set autofocus = false by default.', async () => {
            const state = await checkboxdHarness.getState();
            expect(state).toEqual({
                id: 'input',
                label: '',
                isFocused: false,
                isDisabled: false,
                isChecked: false,
                hasError: false,
                hasValidStructure: true,
            });
        });

        it('should set autofocus = false.', async () => {
            checkboxComponent.autofocus.set(true);
            testFixture.detectChanges();

            const state = await checkboxdHarness.getState();
            expect(state).toEqual({
                id: 'input',
                label: '',
                isFocused: true,
                isDisabled: false,
                isChecked: false,
                hasError: false,
                hasValidStructure: true,
            });
        });

        it('should set autofocus = true.', async () => {
            checkboxComponent.autofocus.set(false);
            testFixture.detectChanges();

            const state = await checkboxdHarness.getState();
            expect(state).toEqual({
                id: 'input',
                label: '',
                isFocused: false,
                isDisabled: false,
                isChecked: false,
                hasError: false,
                hasValidStructure: true,
            });
        });
    });
});

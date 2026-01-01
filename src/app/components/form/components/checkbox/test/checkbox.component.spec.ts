import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentHarness } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CheckboxComponent } from '../checkbox.component';
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

    async function testCheckbox(options: {
        harness: CheckboxHarness;
        id: string;
        label: string;
        control: FormControl;
        focusable: boolean;
        focused?: boolean;
        error: boolean;
    }) {
        const checkboxHarness = options.harness;
        expect(await checkboxHarness.countHostChildren()).toEqual(1);
        expect(await checkboxHarness.hostContainsASingleCheckbox()).toBeTrue();
        const matCheckboxHarness =
            await checkboxHarness.getMatCheckboxHarness();

        // const matCheckbox = fixture.debugElement.children[0];
        // const input = matCheckbox.query(By.css('input')).nativeElement;

        // id
        expect(await checkboxHarness.getCheckboxId());

        // label
        expect(await checkboxHarness.getLabel()).toEqual(options.label);

        // control
        if (options.control.value === true) {
            expect(await checkboxHarness.isChecked()).toBeTrue();
        } else {
            expect(await checkboxHarness.isChecked()).toBeFalse();
        }

        // disabled
        if (options.control.disabled) {
            expect(await checkboxHarness.isDisabled())
                .withContext('disabled')
                .toBeTrue();
        } else {
            expect(await checkboxHarness.isDisabled())
                .withContext('disabled')
                .toBeFalse();
        }

        // error
        if (options.error) {
            expect(await checkboxHarness.hasVisibleError())
                .withContext('checkbox has errors')
                .toBeTrue();
        } else {
            expect(await checkboxHarness.hasVisibleError())
                .withContext('checkbox has errors')
                .toBeFalse();
        }

        // TODO: focusable

        // focused

        if (options.focused === true) {
            expect(await checkboxHarness.isCheckboxFocused())
                .withContext('input focused')
                .toBeTrue();
        } else if (options.focused === false) {
            expect(await checkboxHarness.isCheckboxFocused())
                .withContext('input focused')
                .toBeFalse();
        }
    }

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

            await testCheckbox({
                harness,
                id: 'checkbox-id',
                label: '',
                control: control,
                focusable: true,
                error: false,
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

            await testCheckbox({
                harness,
                id: '',
                label: '',
                control: control,
                focusable: true,
                error: false,
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

            await testCheckbox({
                harness,
                id: '',
                label: 'Accept terms',
                control: control,
                focusable: true,
                error: false,
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

            await testCheckbox({
                harness,
                id: '',
                label: '',
                control: control,
                focusable: true,
                error: false,
            });
        });
    });

    describe('control.', () => {
        describe('value.', () => {
            {
                it('should reflect FormControl value = true', async () => {
                    const control = new FormControl(true);
                    component.control.set(control);
                    fixture.detectChanges();
                    harness = await TestbedHarnessEnvironment.harnessForFixture(
                        fixture,
                        CheckboxHarness,
                    );

                    await testCheckbox({
                        harness,
                        id: '',
                        label: '',
                        control: control,
                        focusable: true,
                        error: false,
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

                    await testCheckbox({
                        harness,
                        id: '',
                        label: '',
                        control: control,
                        focusable: false,
                        error: false,
                    });
                });

                it('should change FormControl value from true to false on chekbox click', async () => {
                    const control = new FormControl(false);
                    component.control.set(control);
                    fixture.detectChanges();
                    harness = await TestbedHarnessEnvironment.harnessForFixture(
                        fixture,
                        CheckboxHarness,
                    );
                    await harness.click();

                    await testCheckbox({
                        harness,
                        id: '',
                        label: '',
                        control: control,
                        focusable: true,
                        error: false,
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

                    await testCheckbox({
                        harness,
                        id: '',
                        label: '',
                        control: control,
                        focusable: false,
                        error: false,
                    });
                });
            }
        });

        describe('disabled.', () => {
            it('should be disabled when form control is disabled', async () => {
                const control = new FormControl({
                    value: false,
                    updateOn: true,
                });
                component.label.set('Email Notifications');
                component.control.set(new FormControl('', Validators.required));
                harness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    CheckboxHarness,
                );

                fixture.detectChanges();

                await testCheckbox({
                    harness,
                    id: '',
                    label: 'Email Notifications *',
                    control: control,
                    focusable: true,
                    error: false,
                });
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

            await testCheckbox({
                harness,
                id: '',
                label: 'Email Notifications *',
                control: control,
                focusable: true,
                error: false,
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

            await testCheckbox({
                harness,
                id: '',
                label: 'Optional Field',
                control: control,
                focusable: true,
                error: false,
            });
        });
    });

    describe('focusable.', () => {
        it('should be focusable by default.', async () => {
            const control = new FormControl(false);
            component.control.set(control);
            fixture.detectChanges();
            fixture.detectChanges();
            harness = await TestbedHarnessEnvironment.harnessForFixture(
                fixture,
                CheckboxHarness,
            );

            await testCheckbox({
                harness,
                id: '',
                label: '',
                control: control,
                focusable: true,
                error: false,
            });
        });

        it('should not be focusable when focusable = true.', async () => {
            const control = new FormControl(false);
            component.control.set(control);
            component.focusable.set(false);
            fixture.detectChanges();
            fixture.detectChanges();
            harness = await TestbedHarnessEnvironment.harnessForFixture(
                fixture,
                CheckboxHarness,
            );

            await testCheckbox({
                harness,
                id: '',
                label: '',
                control: control,
                focusable: true,
                error: false,
            });
        });

        it('should not be focusable when focusable = false.', async () => {
            const control = new FormControl(false);
            component.control.set(control);
            component.focusable.set(false);
            fixture.detectChanges();
            fixture.detectChanges();
            harness = await TestbedHarnessEnvironment.harnessForFixture(
                fixture,
                CheckboxHarness,
            );

            await testCheckbox({
                harness,
                id: '',
                label: '',
                control: control,
                focusable: false,
                error: false,
            });
        });
    });

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
            private numericFieldHarness = this.locatorFor(CheckboxHarness);
            getNumericFieldHarness() {
                return this.numericFieldHarness();
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
            await testCheckbox({
                harness: checkboxdHarness,
                id: '',
                label: '',
                control: checkboxComponent.control()!,
                focusable: true,
                focused: false,
                error: false,
            });
        });

        it('should set autofocus = false.', async () => {
            const tf = testFixture.debugElement.children[1]
                .componentInstance as CheckboxComponent;
            tf.autofocus.set(false);
            testFixture.detectChanges();

            await testCheckbox({
                harness: checkboxdHarness,
                id: '',
                label: '',
                control: checkboxComponent.control()!,
                focusable: true,
                focused: false,
                error: false,
            });
        });

        it('should set autofocus = true.', async () => {
            const tf = testFixture.debugElement.children[1]
                .componentInstance as CheckboxComponent;
            tf.autofocus.set(true);
            testFixture.detectChanges();

            await testCheckbox({
                harness: checkboxdHarness,
                id: '',
                label: '',
                control: checkboxComponent.control()!,
                focusable: true,
                focused: true,
                error: false,
            });
        });
    });
});

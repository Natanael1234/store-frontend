import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
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
        id: string;
        label: string;
        control: FormControl;
        focusable: boolean;
        error: boolean;
    }) {
        expect(await harness.countHostChildren()).toEqual(1);
        expect(await harness.hostContainsASingleCheckbox()).toBeTrue();
        const checkboxHarness = await harness.getCheckboxHarness();

        // const matCheckbox = fixture.debugElement.children[0];
        // const input = matCheckbox.query(By.css('input')).nativeElement;

        // id
        expect(await harness.getCheckboxId());

        // label
        expect(await harness.getLabel()).toEqual(options.label);

        // control
        if (options.control.value === true) {
            expect(await harness.isChecked()).toBeTrue();
        } else {
            expect(await harness.isChecked()).toBeFalse();
        }

        // disabled
        if (options.control.disabled) {
            expect(await harness.isDisabled())
                .withContext('disabled')
                .toBeTrue();
        } else {
            expect(await harness.isDisabled())
                .withContext('disabled')
                .toBeFalse();
        }

        // error
        if (options.error) {
            expect(await harness.hasVisibleError())
                .withContext('checkbox has errors')
                .toBeTrue();
        } else {
            expect(await harness.hasVisibleError())
                .withContext('checkbox has errors')
                .toBeFalse();
        }

        // TODO: focusable
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
                id: '',
                label: 'Optional Field',
                control: control,
                focusable: true,
                error: false,
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
                id: '',
                label: 'Optional Field',
                control: control,
                focusable: true,
                error: false,
            });
        });
    });

    // TODO: not working
    xdescribe('focusable.', () => {
        it('should be focusable by default.', () => {
            const control = new FormControl(false);
            component.control.set(control);
            fixture.detectChanges();

            testCheckbox({
                id: '',
                label: '',
                control: control,
                focusable: true,
                error: false,
            });
        });

        it('should not be focusable when focusable = true.', () => {
            const control = new FormControl(false);
            component.control.set(control);
            component.focusable.set(false);
            fixture.detectChanges();

            testCheckbox({
                id: '',
                label: '',
                control: control,
                focusable: true,
                error: false,
            });
        });

        it('should not be focusable when focusable = false.', () => {
            const control = new FormControl(false);
            component.control.set(control);
            component.focusable.set(false);
            fixture.detectChanges();

            testCheckbox({
                id: '',
                label: '',
                control: control,
                focusable: false,
                error: false,
            });
        });
    });
});

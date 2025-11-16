import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl, Validators } from '@angular/forms';
import { RadioGroupComponent } from '../radio-group.component';
import { RadioGroupHarness } from './radio-group.harness';
import { _testRadioGroup } from './radio-group;component.test';

describe('RadioGroupComponent', () => {
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

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('bidings', () => {
        describe('id', () => {
            it('should bind id', async () => {
                component.id.set('radio-group-id');

                await _testRadioGroup({
                    harness,
                    id: 'radio-group-id',
                    label: '',
                    disabled: false,
                    control: control,
                    radioButtons: [],
                    error: false,
                });
            });

            it('should user empty id by default', async () => {
                await _testRadioGroup({
                    harness,
                    id: '',
                    label: '',
                    disabled: false,
                    control: control,
                    radioButtons: [],
                    error: false,
                });
            });
        });

        describe('label', () => {
            it('should bind label', async () => {
                component.label.set('Radio Group');

                await _testRadioGroup({
                    harness,
                    id: '',
                    label: 'Radio Group',
                    disabled: false,
                    control: control,
                    radioButtons: [],
                    error: false,
                });
            });

            it('label should be empty by default', async () => {
                await _testRadioGroup({
                    harness,
                    id: '',
                    label: '',
                    disabled: false,
                    control: control,
                    radioButtons: [],
                    error: false,
                });
            });
        });

        describe('diabled', () => {
            it('should set component disabled', async () => {
                const control = new FormControl();
                control.disable();
                component.label.set('Radio Group');

                await _testRadioGroup({
                    harness,
                    id: '',
                    label: 'Radio Group',
                    disabled: true,
                    control: control,
                    radioButtons: [],
                    error: false,
                });
            });

            it('label should set component not disabled', async () => {
                await _testRadioGroup({
                    harness,
                    id: '',
                    label: '',
                    disabled: false,
                    control: control,
                    radioButtons: [],
                    error: false,
                });
            });

            it('label should be not disabled by default', async () => {
                await _testRadioGroup({
                    harness,
                    id: '',
                    label: '',
                    disabled: false,
                    control: control,
                    radioButtons: [],
                    error: false,
                });
            });
        });

        xdescribe('focusable', () => {
            it('should use tabIndex = 0 by default', async () => {});

            xit('should use tabIndex = -1 when focusable = false', () => {});

            xit('should use tabIndex = 0 when focusable = true', () => {});
        });

        describe('options', () =>
            it('should render radio group with options', async () => {
                component.options.set([
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                ]);
                const radios = await harness.getRadioButtons();
                await radios[0].check();

                await _testRadioGroup({
                    harness,
                    id: '',
                    label: '',
                    disabled: false,
                    control: control,
                    radioButtons: [
                        { label: 'Option 1', value: '1' },
                        { label: 'Option 2', value: '2' },
                    ],
                    error: false,
                });
            }));

        describe('control', () => {
            it('should reflect FormControl value changes', async () => {
                component.options.set([
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                ]);
                control.setValue('2');

                await _testRadioGroup({
                    harness,
                    id: '',
                    label: '',
                    disabled: false,
                    control: control,
                    radioButtons: [
                        { label: 'Option 1', value: '1' },
                        { label: 'Option 2', value: '2' },
                    ],
                    error: false,
                });
            });

            it('should change FormControl value on option check', async () => {
                component.options.set([
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                ]);
                const radios = await harness.getRadioButtons();
                await radios[0].check();

                await _testRadioGroup({
                    harness,
                    id: '',
                    label: '',
                    disabled: false,
                    control: control,
                    radioButtons: [
                        { label: 'Option 1', value: '1' },
                        { label: 'Option 2', value: '2' },
                    ],
                    error: false,
                });

                expect(control.value).toEqual('1');
            });
        });

        it('should render radio group field without options when options is undefined', async () => {
            component.options.set(undefined);
            fixture.detectChanges();

            await _testRadioGroup({
                harness,
                id: '',
                label: '',
                disabled: false,
                control: control,
                radioButtons: [],
                error: false,
            });
        });

        it('should render radio group without options when options is empty array', async () => {
            component.options.set([]);
            fixture.detectChanges();

            await _testRadioGroup({
                harness,
                id: '',
                label: '',
                disabled: false,
                control: control,
                radioButtons: [],
                error: false,
            });
        });

        describe('error', () => {
            it('should display', async () => {
                component.options.set([
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                ]);
                control.setValidators([Validators.required]);
                control.markAsDirty();
                control.markAsTouched();
                control.updateValueAndValidity();

                await _testRadioGroup({
                    harness,
                    id: '',
                    label: '',
                    disabled: false,
                    control: control,
                    radioButtons: [
                        { label: 'Option 1', value: '1' },
                        { label: 'Option 2', value: '2' },
                    ],
                    error: true,
                });
            });

            it('should not display', async () => {
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

                await _testRadioGroup({
                    harness,
                    id: '',
                    label: '',
                    disabled: false,
                    control: control,
                    radioButtons: [
                        { label: 'Option 1', value: '1' },
                        { label: 'Option 2', value: '2' },
                    ],
                    error: false,
                });
            });
        });
    });
});

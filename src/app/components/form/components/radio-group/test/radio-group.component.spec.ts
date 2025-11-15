import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl } from '@angular/forms';
import { RadioGroupComponent } from '../radio-group.component';
import { RadioGroupHarness } from './radio-group.harness';

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

    async function testRadioGroup(expected: {
        id: string;
        label: string;
        control: FormControl;
        radioButtons: { label: any; value: any }[];
    }) {
        expect(fixture.debugElement.children.length).toEqual(1);

        const groups = await harness.getGroups();
        const group = await harness.getGroup();
        const label = await harness.getGroupLabel();
        const radioButtons = await harness.getRadioButtons();

        expect(groups.length).toEqual(1);
        expect(await group.getId()).toEqual(expected.id);
        expect(label).toEqual(expected.label);
        expect(radioButtons.length).toEqual(expected.radioButtons.length);
        expect(control.value).toEqual(control.value);

        for (let i = 0; i < radioButtons.length; i++) {
            const radioButton = radioButtons[i];
            expect(await radioButton.getLabelText()).toEqual(
                expected.radioButtons[i].label,
            );
            expect(await radioButton.getValue()).toEqual(
                expected.radioButtons[i].value,
            );
            if (expected.control.value == (await radioButton.getValue())) {
                expect(await radioButton.isChecked()).toBeTrue();
            } else {
                expect(await radioButton.isChecked()).toBeFalse();
            }
        }
    }

    describe('bidings', () => {
        describe('id', () => {
            it('should bind id', async () => {
                component.id.set('radio-group-id');

                await testRadioGroup({
                    id: 'radio-group-id',
                    label: '',
                    control: control,
                    radioButtons: [],
                });
            });

            it('should user empty id by default', async () => {
                await testRadioGroup({
                    id: '',
                    label: '',
                    control: control,
                    radioButtons: [],
                });
            });
        });

        describe('label', () => {
            it('should bind label', async () => {
                component.label.set('Radio Group');

                await testRadioGroup({
                    id: '',
                    label: 'Radio Group',
                    control: control,
                    radioButtons: [],
                });
            });

            it('label should be empty by default', async () => {
                await testRadioGroup({
                    id: '',
                    label: '',
                    control: control,
                    radioButtons: [],
                });
            });
        });

        // TODO:
        xdescribe('focusable', () => {
            it('should use tabIndex = 0 by default', () => {});

            it('should use tabIndex = -1 when focusable = false', () => {});

            it('should use tabIndex = 0 when focusable = true', () => {});
        });

        describe('options', () =>
            it('should render radio group with options', async () => {
                component.options.set([
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                ]);
                const radios = await harness.getRadioButtons();
                await radios[0].check();

                await testRadioGroup({
                    id: '',
                    label: '',
                    control: control,
                    radioButtons: [
                        { label: 'Option 1', value: '1' },
                        { label: 'Option 2', value: '2' },
                    ],
                });
            }));

        describe('control', () => {
            it('should reflect FormControl value changes', async () => {
                component.options.set([
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                ]);
                control.setValue('2');

                await testRadioGroup({
                    id: '',
                    label: '',
                    control: control,
                    radioButtons: [
                        { label: 'Option 1', value: '1' },
                        { label: 'Option 2', value: '2' },
                    ],
                });
            });

            it('should change FormControl value on option check', async () => {
                component.options.set([
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                ]);
                const radios = await harness.getRadioButtons();
                await radios[0].check();

                await testRadioGroup({
                    id: '',
                    label: '',
                    control: control,
                    radioButtons: [
                        { label: 'Option 1', value: '1' },
                        { label: 'Option 2', value: '2' },
                    ],
                });

                expect(control.value).toEqual('1');
            });
        });

        it('should render radio group field without options when options is undefined', async () => {
            component.options.set(undefined);
            fixture.detectChanges();

            await testRadioGroup({
                id: '',
                label: '',
                control: control,
                radioButtons: [],
            });
        });

        it('should render radio group without options when options is empty array', async () => {
            component.options.set([]);
            fixture.detectChanges();

            await testRadioGroup({
                id: '',
                label: '',
                control: control,
                radioButtons: [],
            });
        });

        // TODO:
        xdescribe('error', () => {
            xit('should display error message from error', () => {});

            xit('should not display error message when error is not defined', () => {});
        });
    });
});

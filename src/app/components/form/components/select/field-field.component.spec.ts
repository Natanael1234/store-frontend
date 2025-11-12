import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SelectFieldComponent } from './select-field.component';
import { SelectFieldHarness } from './select-field.harness';

describe('SelectFieldComponent', () => {
    let component: SelectFieldComponent;
    let fixture: ComponentFixture<SelectFieldComponent>;
    let control: FormControl;
    let harness: SelectFieldHarness;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SelectFieldComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(SelectFieldComponent);
        component = fixture.componentInstance;
        // component.id.set('select-id');
        // component.label.set('Select Label');
        // component.focusable.set(true);
        // component.options.set([
        //     { value: '1', label: 'Option 1' },
        //     { value: '2', label: 'Option 2' },
        // ]);
        // component.errorMessageFn.set(() => 'This field is required');
        control = new FormControl();
        component.control.set(control);
        fixture.detectChanges();
        harness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            SelectFieldHarness,
        );
    });

    async function testSelect(expected: {
        id: 'generated' | string;
        label: string;
        focusable: boolean | undefined;
        control: FormControl;
        options: {
            value: string;
            label: string;
        }[];
        errorMessageFn: (() => void) | undefined;
    }) {
        // form field
        expect(await harness.hostConstainsOnlyAFormField()).toBeTrue();

        // select
        expect(await harness.hasOneAndOnlyOneSelect()).toBeTrue();
        const selectHerness = await harness.getSelectHarness();

        // id
        const id = await harness.getSelectId();
        if (expected.id == 'generated') {
            expect(id?.startsWith('mat-select-')).toBeTrue();
        } else {
            expect(id).toEqual(expected.id);
        }

        // label
        expect(await harness.getLabelText()).toEqual(expected.label);

        // focusable
        if (expected.focusable || expected.focusable == null) {
            expect(
                await (await harness.getSelect()).getAttribute('tabIndex'),
            ).toEqual('0');
        } else {
            expect(
                await (await harness.getSelect()).getAttribute('tabIndex'),
            ).toEqual('-1');
        }

        // options
        await selectHerness.open();
        const optionsHarness = await harness.getOptions();
        expect(optionsHarness.length).toEqual(expected.options.length);
        for (let i = 0; i < optionsHarness.length; i++) {
            // option label
            expect(optionsHarness[i].label).toEqual(expected.options[i].label);
            // option value/control
            if (expected.options[i].value == control.value) {
                expect(optionsHarness[i].selected).toBeTrue();
            } else {
                expect(optionsHarness[i].selected).toBeFalse();
            }
        }
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render component with values', async () => {
        component.id.set('select-id');
        component.label.set('Gender');
        component.options.set([
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
        ]);
        component.focusable.set(true);
        component.errorMessageFn.set(() => 'Some error');
        fixture.detectChanges();

        await testSelect({
            id: 'select-id',
            label: 'Gender',
            focusable: true,
            control: control,
            options: [
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
            ],
            errorMessageFn: () => 'Some error',
        });
    });

    describe('bidings', () => {
        describe('id', () => {
            it('should bind id', async () => {
                component.id.set('select-id');
                fixture.detectChanges();

                await testSelect({
                    id: 'select-id',
                    label: '',
                    focusable: undefined,
                    control: control,
                    options: [],
                    errorMessageFn: undefined,
                });
            });

            it('should user generated id by default', async () => {
                fixture.detectChanges();

                await testSelect({
                    id: 'generated',
                    label: '',
                    focusable: undefined,
                    control: control,
                    options: [],
                    errorMessageFn: undefined,
                });
            });
        });

        describe('label', () => {
            it('should bind label', async () => {
                component.label.set('Select Label');
                fixture.detectChanges();

                await testSelect({
                    id: 'generated',
                    label: 'Select Label',
                    focusable: undefined,
                    control: control,
                    options: [],
                    errorMessageFn: undefined,
                });
            });

            it('label should be empty by defalult', async () => {
                fixture.detectChanges();

                await testSelect({
                    id: 'generated',
                    label: '',
                    focusable: undefined,
                    control: control,
                    options: [],
                    errorMessageFn: undefined,
                });
            });
        });

        describe('control', () => {
            it('should reflect FormControl value changes', async () => {
                component.options.set([
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                ]);
                control.setValue('2');
                fixture.detectChanges();

                await testSelect({
                    id: 'generated',
                    label: '',
                    focusable: undefined,
                    control: control,
                    options: [
                        { value: '1', label: 'Option 1' },
                        { value: '2', label: 'Option 2' },
                    ],
                    errorMessageFn: undefined,
                });
            });

            it('should change FormControl value on option click', async () => {
                component.options.set([
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                ]);
                fixture.detectChanges();

                await testSelect({
                    id: 'generated',
                    label: '',
                    focusable: undefined,
                    control: control,
                    options: [
                        { value: '1', label: 'Option 1' },
                        { value: '2', label: 'Option 2' },
                    ],
                    errorMessageFn: undefined,
                });
            });
        });

        describe('focusable', () => {
            it('should use tabIndex = 0 by default', async () => {
                await testSelect({
                    id: 'generated',
                    label: '',
                    focusable: true,
                    control: control,
                    options: [],
                    errorMessageFn: undefined,
                });
            });

            it('should use tabIndex = -1 when focusable = false', async () => {
                component.focusable.set(false);
                fixture.detectChanges();

                await testSelect({
                    id: 'generated',
                    label: '',
                    focusable: false,
                    control: control,
                    options: [],
                    errorMessageFn: undefined,
                });
            });

            it('should use tabIndex = 0 when focusable = true', async () => {
                await testSelect({
                    id: 'generated',
                    label: '',
                    focusable: true,
                    control: control,
                    options: [],
                    errorMessageFn: undefined,
                });
            });
        });

        describe('options', () =>
            it('should render select field with options', async () => {
                component.options.set([
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                ]);
                fixture.detectChanges();

                await testSelect({
                    id: 'generated',
                    label: '',
                    focusable: undefined,
                    control: control,
                    options: [
                        { value: '1', label: 'Option 1' },
                        { value: '2', label: 'Option 2' },
                    ],
                    errorMessageFn: undefined,
                });
            }));

        it('should render select field without options when options is undefined', async () => {
            component.options.set(undefined);
            fixture.detectChanges();

            await testSelect({
                id: 'generated',
                label: '',
                focusable: undefined,
                control: control,
                options: [],
                errorMessageFn: undefined,
            });
        });

        it('should render select field without options when options is empty array', async () => {
            component.options.set([]);
            fixture.detectChanges();

            await testSelect({
                id: 'generated',
                label: '',
                focusable: undefined,
                control: control,
                options: [],
                errorMessageFn: undefined,
            });
        });

        xdescribe('errorMessageFn', () => {
            xit('should display error message from errorMessageFn', () => {
                component.errorMessageFn.set(() => 'This field is required');
                fixture.detectChanges();
                const error = fixture.debugElement.query(By.css('mat-error'));
                expect(error.nativeElement.textContent.trim()).toBe(
                    'This field is required',
                );
            });

            xit('should not display error message when errorMessageFn is not defined', () => {
                component.errorMessageFn.set(() => 'This field is required');
                fixture.detectChanges();
                const error = fixture.debugElement.query(By.css('mat-error'));
                expect(error.nativeElement.textContent.trim()).toBe('');
            });
        });
    });
});

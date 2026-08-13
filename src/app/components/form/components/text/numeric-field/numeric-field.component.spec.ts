import { ComponentHarness } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NumericFieldComponent } from '@components/form/components/text/numeric-field/numeric-field.component';
import { NumericFieldHarness } from '@components/form/components/text/numeric-field/numeric-field.harness';
import { AutoCompleteType } from '@components/form/enums/auto-complete-type/auto-complete-type.enum';
import { FormElementType } from '@components/form/enums/form-element-type/form-element-type.enum';
import { maxLengthValidator } from '@validators/max-length/max-length.validator';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

describe('NumericFieldComponent.', () => {
    let component: NumericFieldComponent;
    let fixture: ComponentFixture<NumericFieldComponent>;
    let harness: NumericFieldHarness;
    let control: FormControl;
    let pipe: NgxMaskPipe;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                NumericFieldComponent,
                NgxMaskDirective,
            ],
            providers: [provideNgxMask(), NgxMaskPipe],
        }).compileComponents();

        pipe = TestBed.inject(NgxMaskPipe);

        fixture = TestBed.createComponent(NumericFieldComponent);
        control = new FormControl('');
        component = fixture.componentInstance;
        component.control.set(control);
        fixture.detectChanges();

        harness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            NumericFieldHarness,
        );
    });

    it('should create.', () => {
        expect(component).toBeTruthy();
    });

    it('should validate component with all properties', async () => {
        component.id.set('quantity');
        component.label.set('Quantity');
        component.placeholder.set('Type the quantity');
        component.readOnly.set(false);
        component.focusable.set(true);
        component.autofocus.set(true);
        component.minLength.set(17);
        component.maxLength.set(20); // including formatting characters
        component.min.set(5);
        component.max.set(12345679);
        component.step.set(1);
        component.prefix.set('R$');
        component.suffix.set('reais');
        component.leadZero.set(true);
        component.allowNegativeNumbers.set(true);
        component.decimalPlaces.set(2);
        const control = new FormControl('12345678.91', {
            validators: [maxLengthValidator(5)],
        });
        component.control.set(control);

        const state = await harness.getState();
        expect(state).toEqual({
            id: 'quantity',
            type: FormElementType.text,
            value: '12.345.678,91',
            label: 'Quantity',
            placeholder: 'Type the quantity',
            isReadOnly: false,
            autocomplete: AutoCompleteType.off,
            isFocusable: true,
            isFocused: true,
            minLength: 17,
            maxLength: 20,
            min: 5,
            max: 12345679,
            step: 1,
            prefix: 'R$',
            suffix: 'reais',
            errors: [],
            hasValidStructure: true,
        });

        // TODO: test blur event
        // const spy = spyOn(options.component.onBlur, 'emit');
        // await harness.blurInput();
        // expect(spy).withContext('onBlur event').toHaveBeenCalledOnceWith();
    });

    it('should set component without optional properties', async () => {
        const control = new FormControl('9667', {
            validators: [Validators.maxLength(10)],
            updateOn: 'change',
        });
        component.control.set(control);
        component.decimalPlaces.set(2);
        fixture.detectChanges();

        const state = await harness.getState();
        expect(state).toEqual({
            id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
            type: FormElementType.text,
            value: '9.667',
            label: '',
            placeholder: '',
            isReadOnly: false,
            autocomplete: AutoCompleteType.off,
            isFocusable: true,
            isFocused: false,
            minLength: null,
            maxLength: null,
            min: null,
            max: null,
            step: null,
            prefix: '',
            suffix: '',
            errors: [],
            hasValidStructure: true,
        });
    });

    describe('parameters:.', () => {
        describe('id:.', () => {
            it('should set id', async () => {
                component.id.set('test-id');
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: 'test-id',
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should generate id', async () => {
                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('label:.', () => {
            it('should set label', async () => {
                component.label.set('Test label');
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: 'Test label',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should empty label by default', async () => {
                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('placeholder:.', () => {
            it('should set placeholder', async () => {
                component.placeholder.set('Test placeholder');
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: 'Test placeholder',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should empty placeholder by default', async () => {
                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('focusable:.', () => {
            it('should set focusable =true by default', async () => {
                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set focusable = true', async () => {
                component.focusable.set(true);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set focusable = false', async () => {
                component.focusable.set(false);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: false,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        xdescribe('autofocus.', () => {
            /** As the first focusable element is automatically focused creates a scenario where the field is the second focusable element. */
            @Component({
                selector: 'autofocus-test',
                imports: [NumericFieldComponent],
                template: `
                    <!-- button is focused by default -->
                    <button>Test</button>
                    <app-numeric-field
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
                private numericFieldHarness =
                    this.locatorFor(NumericFieldHarness);
                getNumericFieldHarness() {
                    return this.numericFieldHarness();
                }
            }

            let testHarness: TestHarness;
            let fixture: ComponentFixture<AutofocusTestComponent>;
            let numericFieldHarness: NumericFieldHarness;
            let numericFieldComponent: NumericFieldComponent;

            beforeEach(async () => {
                fixture = TestBed.createComponent(AutofocusTestComponent);
                fixture.detectChanges();
                testHarness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    TestHarness,
                );
                numericFieldComponent =
                    fixture.debugElement.children[1].componentInstance;
                numericFieldHarness =
                    await testHarness.getNumericFieldHarness();
            });

            it('should set autofocus = false by default.', async () => {
                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: false,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set autofocus = false.', async () => {
                const tf = fixture.debugElement.children[1]
                    .componentInstance as NumericFieldComponent;
                tf.autofocus.set(false);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set autofocus = true.', async () => {
                const tf = fixture.debugElement.children[1]
                    .componentInstance as NumericFieldComponent;
                tf.autofocus.set(true);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('readOnly:.', () => {
            it('should set readOnly = false by default', async () => {
                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set readOnly = true', async () => {
                component.readOnly.set(true);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: true,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set readOnly = false', async () => {
                component.readOnly.set(false);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('autocomplete.', () => {
            it('should set autocomplete = off by default.', async () => {
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('autocomplete should be set on.', async () => {
                component.autocomplete.set(AutoCompleteType.on);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.on,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('autocomplete should be set off.', async () => {
                component.autocomplete.set(AutoCompleteType.off);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('minLength:.', () => {
            it('should not set minLength', async () => {
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set minLength', async () => {
                component.minLength.set(5);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: 5,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('maxLength:.', () => {
            it('should not set maxLength', async () => {
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set maxLength', async () => {
                component.maxLength.set(5);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: 5,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('min:.', () => {
            it('should not set min', async () => {
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set min', async () => {
                component.min.set(5);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: 5,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('max:.', () => {
            it('should not set max', async () => {
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set max', async () => {
                component.max.set(5);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: 5,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('step:.', () => {
            it('should not set step', async () => {
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set step', async () => {
                component.step.set(5);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: 5,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('prefix:.', () => {
            it('should not set prefix', async () => {
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set prefix', async () => {
                component.prefix.set('R$');
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: 'R$',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('suffix:.', () => {
            it('should not set prefix', async () => {
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set suffix', async () => {
                component.suffix.set('reais');
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: 'reais',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        xdescribe('leadZero:.', () => {
            xit('should not set leadZero', async () => {
                control.setValue('005');
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '5',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set leadZero', async () => {
                control.setValue('0005');
                component.leadZero.set(true);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '0,005',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set leadZero with limited decimal places', fakeAsync(async () => {
                control.setValue('0005');
                component.decimalPlaces.set(2);
                component.leadZero.set(true);

                await fixture.whenStable();
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '0,005',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            }));
        });

        describe('decimalPlaces:.', () => {
            it('should not set decimalPlaces (unlimited by default)', async () => {
                component.control.set(new FormControl('1567.54546'));

                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '1.567,54546',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set decimalPlaces = 2', async () => {
                component.control.set(new FormControl('1567.54545'));
                component.decimalPlaces.set(2);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '1.567,54',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set decimalPlaces = 0', async () => {
                component.control.set(new FormControl('1567.54545'));
                component.decimalPlaces.set(0);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '1.567',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('allowNegativeNumbers:.', () => {
            it('should not set allowNegativeNumbers (allow by default)', async () => {
                component.control.set(new FormControl('-1567'));
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '-1.567',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set allowNegativeNumbers = true', async () => {
                component.allowNegativeNumbers.set(true);
                component.control.set(new FormControl('-2567'));
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '-2.567',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set allowNegativeNumbers = false', async () => {
                component.allowNegativeNumbers.set(false);
                component.control.set(new FormControl('-3567'));
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '3.567',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('blur', () => {
            it('should fire blur event.', async () => {
                const spy = jasmine.createSpy('onBlur spy');
                component.onBlur.subscribe(spy);
                await harness.blurInput();
                expect(spy).toHaveBeenCalledOnceWith(undefined);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should not fire blur event.', async () => {
                const spy = jasmine.createSpy('onBlur spy');
                component.onBlur.subscribe(spy);
                expect(spy).not.toHaveBeenCalled();
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    label: '',
                    placeholder: '',
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    isFocusable: true,
                    isFocused: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });
    });
});

describe('NumericFieldComponent.', () => {
    describe('autofocus.', () => {
        /** As the first focusable element is automatically focused creates a scenario where the field is the second focusable element. */
        @Component({
            selector: 'autofocus-test',
            imports: [NumericFieldComponent],
            template: `
                <!-- button is focused by default -->
                <button>Test</button>
                <app-numeric-field id="text-field-id" [control]="control" />
            `,
        })
        class AutofocusTestComponent {
            control = new FormControl('');
        }

        class TestHarness extends ComponentHarness {
            static hostSelector = 'autofocus-test';
            private textFieldHarness = this.locatorFor(NumericFieldHarness);
            getTextFieldHarness() {
                return this.textFieldHarness();
            }
        }

        let testHarness: TestHarness;
        let fixture: ComponentFixture<AutofocusTestComponent>;
        let textFieldHarness: NumericFieldHarness;
        let textFieldComponent: NumericFieldComponent;

        beforeEach(async () => {
            fixture = TestBed.createComponent(AutofocusTestComponent);
            fixture.detectChanges();
            testHarness = await TestbedHarnessEnvironment.harnessForFixture(
                fixture,
                TestHarness,
            );
            textFieldComponent =
                fixture.debugElement.children[1].componentInstance;
            textFieldHarness = await testHarness.getTextFieldHarness();
        });

        it('should set autofocus = false by default.', async () => {
            fixture.detectChanges();

            const state = await textFieldHarness.getState();
            expect(state).toEqual({
                id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                type: FormElementType.text,
                value: '',
                label: '',
                placeholder: '',
                isReadOnly: false,
                autocomplete: AutoCompleteType.off,
                isFocusable: true,
                isFocused: false,
                minLength: null,
                maxLength: null,
                min: null,
                max: null,
                step: null,
                prefix: '',
                suffix: '',
                errors: [],
                hasValidStructure: true,
            });
        });

        it('should set autofocus = false.', async () => {
            textFieldComponent.autofocus.set(false);
            fixture.detectChanges();

            const state = await textFieldHarness.getState();
            expect(state).toEqual({
                id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                type: FormElementType.text,
                value: '',
                label: '',
                placeholder: '',
                isReadOnly: false,
                autocomplete: AutoCompleteType.off,
                isFocusable: true,
                isFocused: false,
                minLength: null,
                maxLength: null,
                min: null,
                max: null,
                step: null,
                prefix: '',
                suffix: '',
                errors: [],
                hasValidStructure: true,
            });
        });

        it('should set autofocus = true.', async () => {
            textFieldComponent.autofocus.set(true);
            fixture.detectChanges();

            const state = await textFieldHarness.getState();
            expect(state).toEqual({
                id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                type: FormElementType.text,
                value: '',
                label: '',
                placeholder: '',
                isReadOnly: false,
                autocomplete: AutoCompleteType.off,
                isFocusable: true,
                isFocused: true,
                minLength: null,
                maxLength: null,
                min: null,
                max: null,
                step: null,
                prefix: '',
                suffix: '',
                errors: [],
                hasValidStructure: true,
            });
        });
    });
});

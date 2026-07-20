import { ComponentHarness } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { AutoCompleteType } from '../../../enums/auto-complete-type/auto-complete-type.enum';
import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { TextFormat } from '../../../enums/text-format/text-format.enum';
import { TextMask } from '../../../enums/text-mask/text-mask.enum';
import { TextFieldComponent } from './text-field.component';
import { TextFieldHarness } from './text-field.harness';

describe('TextFieldComponent.', () => {
    let component: TextFieldComponent;
    let fixture: ComponentFixture<TextFieldComponent>;
    let harness: TextFieldHarness;
    let control: FormControl;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                TextFieldComponent,
                NgxMaskDirective,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TextFieldComponent);
        control = new FormControl('');
        component = fixture.componentInstance;
        component.control.set(control);
        fixture.detectChanges();

        harness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            TextFieldHarness,
        );
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should validate component with all properties.', async () => {
        const control = new FormControl('96675977091', {
            validators: [Validators.maxLength(10)],
            updateOn: 'change',
        });
        component.id.set('quantity');
        component.label.set('Quantity');
        component.placeholder.set('Type the quantity');
        component.control.set(control);
        component.mask.set(TextMask.currency);
        component.focusable.set(true);
        component.autofocus.set(false);
        component.format.set(TextFormat.cpf);
        component.minLength.set(3);
        component.maxLength.set(14); // including formatting characters
        component.prefix.set('R$');
        component.suffix.set('reais');
        fixture.detectChanges();

        const state = await harness.getState();
        expect(state).toEqual({
            id: 'quantity',
            type: FormElementType.text,
            value: '96 675 977 091',
            isPassword: false,
            label: 'Quantity',
            placeholder: 'Type the quantity',
            isFocusable: true,
            isFocused: false,
            isReadOnly: false,
            autocomplete: AutoCompleteType.off,
            minLength: 3,
            maxLength: 14,
            prefix: 'R$',
            suffix: 'reais',
            errors: [],
            hasValidStructure: true,
        });
    });

    it('should set component without optional properties.', async () => {
        const control = new FormControl('9667', {
            validators: [Validators.maxLength(10)],
            updateOn: 'change',
        });
        component.control.set(control);
        fixture.detectChanges();

        const state = await harness.getState();
        expect(state).toEqual({
            id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
            type: FormElementType.text,
            value: '9667',
            isPassword: false,
            label: '',
            placeholder: '',
            isFocusable: true,
            isFocused: false,
            isReadOnly: false,
            autocomplete: AutoCompleteType.off,
            minLength: null,
            maxLength: null,
            prefix: '',
            suffix: '',
            errors: [],
            hasValidStructure: true,
        });
    });

    describe('parameters.', () => {
        describe('id.', () => {
            it('should set id.', async () => {
                component.id.set('test-id');
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: 'test-id',
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should generate id.', async () => {
                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('label.', () => {
            it('should set label.', async () => {
                component.label.set('Test label');
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: 'Test label',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should empty label by default.', async () => {
                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('format.', () => {
            it('should set text format by default.', async () => {
                component.format.set(undefined);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set text format.', async () => {
                component.format.set(TextFormat.text);
                component.autofocus.set(undefined);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set password format.', async () => {
                component.format.set(TextFormat.password);
                component.autofocus.set(undefined);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.password,
                    value: '',
                    isPassword: true,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set password format.', async () => {
                component.format.set(TextFormat.password);
                component.autofocus.set(undefined);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.password,
                    value: '',
                    isPassword: true,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set password format and make text visible.', async () => {
                component.format.set(TextFormat.password);
                component.autofocus.set(undefined);
                await harness.clickPasswordToggle();
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: true,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: true,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set password format and make text invisible.', async () => {
                component.format.set(TextFormat.password);
                component.autofocus.set(undefined);
                await harness.clickPasswordToggle();
                fixture.detectChanges();
                await harness.clickPasswordToggle();
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.password,
                    value: '',
                    isPassword: true,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: true,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set custom format.', async () => {
                control.setValue('67351279004');
                component.format.set(TextFormat.cpf);
                component.autofocus.set(undefined);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '67351279004',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('focusable.', () => {
            it('should set focusable by default.', async () => {
                await harness.focusInput();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: true,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set focusable.', async () => {
                component.focusable.set(true);
                fixture.detectChanges();
                await harness.focusInput();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: true,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set not focusable.', async () => {
                component.focusable.set(false);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: false,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('readOnly.', () => {
            it('should set not readonly by default.', async () => {
                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set readonly = true.', async () => {
                component.readOnly.set(true);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: true,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set readonly = false.', async () => {
                component.readOnly.set(false);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('autocomplete.', () => {
            it('should set not autocomplete by default.', async () => {
                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set autocomplete = on.', async () => {
                component.autocomplete.set(AutoCompleteType.on);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.on,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set autocomplete = off.', async () => {
                component.autocomplete.set(AutoCompleteType.off);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set autocomplete = another type.', async () => {
                component.autocomplete.set(AutoCompleteType.country);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.country,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('minLength.', () => {
            it('should not set minLength.', async () => {
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set minLength.', async () => {
                component.minLength.set(5);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: 5,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('maxLength.', () => {
            it('should not set maxLength.', async () => {
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set maxLength.', async () => {
                component.maxLength.set(5);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: 5,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('prefix.', () => {
            it('should not set prefix.', async () => {
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set prefix.', async () => {
                component.prefix.set('R$');
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: 'R$',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });

        describe('suffix.', () => {
            it('should not set prefix.', async () => {
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should set suffix.', async () => {
                component.suffix.set('reais');
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: 'reais',
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
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });

            it('should not fire blur event.', async () => {
                // Arrange
                const spy = jasmine.createSpy('onBlur spy');
                component.onBlur.subscribe(spy);
                expect(spy).not.toHaveBeenCalled();
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    type: FormElementType.text,
                    value: '',
                    isPassword: false,
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    autocomplete: AutoCompleteType.off,
                    minLength: null,
                    maxLength: null,
                    prefix: '',
                    suffix: '',
                    errors: [],
                    hasValidStructure: true,
                });
            });
        });
    });
});

describe('TextFieldComponent.', () => {
    describe('autofocus.', () => {
        /** As the first focusable element is automatically focused creates a scenario where the field is the second focusable element. */
        @Component({
            selector: 'autofocus-test',
            imports: [TextFieldComponent],
            template: `
                <!-- button is focused by default -->
                <button>Test</button>
                <app-text-field id="text-field-id" [control]="control" />
            `,
        })
        class AutofocusTestComponent {
            control = new FormControl('');
        }

        class TestHarness extends ComponentHarness {
            static hostSelector = 'autofocus-test';
            private textFieldHarness = this.locatorFor(TextFieldHarness);
            getTextFieldHarness() {
                return this.textFieldHarness();
            }
        }

        let testHarness: TestHarness;
        let fixture: ComponentFixture<AutofocusTestComponent>;
        let textFieldHarness: TextFieldHarness;
        let textFieldComponent: TextFieldComponent;

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
                isPassword: false,
                label: '',
                placeholder: '',
                isFocusable: true,
                isFocused: false,
                isReadOnly: false,
                autocomplete: AutoCompleteType.off,
                minLength: null,
                maxLength: null,
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
                isPassword: false,
                label: '',
                placeholder: '',
                isFocusable: true,
                isFocused: false,
                isReadOnly: false,
                autocomplete: AutoCompleteType.off,
                minLength: null,
                maxLength: null,
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
                isPassword: false,
                label: '',
                placeholder: '',
                isFocusable: true,
                isFocused: true,
                isReadOnly: false,
                autocomplete: AutoCompleteType.off,
                minLength: null,
                maxLength: null,
                prefix: '',
                suffix: '',
                errors: [],
                hasValidStructure: true,
            });
        });
    });
});

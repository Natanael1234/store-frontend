import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentHarness } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { FormElementType } from '../../../../enums/form-element-type/form-element-type.enum';
import { TextFormat } from '../../../../enums/text-format/text-format.enum';
import { TextAreaComponent } from '../text-area.component';
import { TextAreaFieldHarness } from './text-area.harness';
import { _testTextAreaComponent } from './text-field.component.test';

const loremIpsum =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

describe('TextAreaComponent.', () => {
    let component: TextAreaComponent;
    let fixture: ComponentFixture<TextAreaComponent>;
    let control: FormControl;
    let harness: TextAreaFieldHarness;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, TextAreaComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TextAreaComponent);
        control = new FormControl('');
        component = fixture.componentInstance;
        component.control.set(control);
        fixture.detectChanges();

        harness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            TextAreaFieldHarness,
        );
    });

    it('should create..', () => {
        expect(component).toBeTruthy();
    });

    it('should validate component with all properties.', async () => {
        const control = new FormControl(loremIpsum, {
            validators: [Validators.maxLength(10)],
            updateOn: 'change',
        });
        component.id.set('description');
        component.label.set('Description');
        component.placeholder.set('Description placeholder');
        component.control.set(control);
        component.focusable.set(true);
        component.autofocus.set(false);
        component.readOnly.set(false);
        component.minLength.set(3);
        component.maxLength.set(14); // including formatting characters
        component.breakLine.set(false);
        component.autosizeMinRows.set(2);
        component.autosizeMaxRows.set(6);
        fixture.detectChanges();

        await _testTextAreaComponent({
            component,
            harness,
            id: 'description',
            type: FormElementType.text,
            controlValue: loremIpsum,
            textAreaValue: loremIpsum,
            label: 'Description',
            placeholder: 'Description placeholder',
            focusable: true,
            focused: true,
            readOnly: false,
            format: TextFormat.cpf,
            minLength: 3,
            maxLength: 14,
            prefix: 'R$',
            suffix: 'reais',
            error: 'Máximo de 10 caracteres.',
            autosizeMinRows: 2,
            autosizeMaxRows: 6,
            breakLine: false,
        });
    });

    describe('parameters.', () => {
        describe('id.', () => {
            it('should set id.', async () => {
                component.id.set('test-id');
                fixture.detectChanges();
                await _testTextAreaComponent({
                    component,
                    harness,
                    id: 'test-id',
                    type: FormElementType.text,
                    controlValue: '',
                    textAreaValue: '',
                    label: '',
                    placeholder: '',
                    focusable: true,
                    focused: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    breakLine: false,
                });
            });

            it('should generate id.', async () => {
                await _testTextAreaComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    controlValue: '',
                    textAreaValue: '',
                    label: '',
                    placeholder: '',
                    focusable: true,
                    focused: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    breakLine: false,
                });
            });
        });

        describe('label.', () => {
            it('should set label.', async () => {
                component.label.set('Test label');
                fixture.detectChanges();

                await _testTextAreaComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    controlValue: '',
                    textAreaValue: '',
                    label: 'Test label',
                    placeholder: '',
                    focusable: true,
                    focused: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    breakLine: false,
                });
            });

            it('should empty label by default.', async () => {
                await _testTextAreaComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    controlValue: '',
                    textAreaValue: '',
                    label: '',
                    placeholder: '',
                    focusable: true,
                    focused: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    breakLine: false,
                });
            });
        });

        describe('focusable.', () => {
            it('should set focusable = true by default.', async () => {
                await _testTextAreaComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    controlValue: '',
                    textAreaValue: '',
                    label: '',
                    placeholder: '',
                    focusable: true,
                    focused: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    breakLine: false,
                });
            });

            it('should set focusable.', async () => {
                component.focusable.set(true);
                fixture.detectChanges();

                await _testTextAreaComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    controlValue: '',
                    textAreaValue: '',
                    label: '',
                    placeholder: '',
                    focusable: true,
                    focused: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    breakLine: false,
                });
            });

            it('should set not focusable.', async () => {
                component.focusable.set(false);
                fixture.detectChanges();

                await _testTextAreaComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    controlValue: '',
                    textAreaValue: '',
                    label: '',
                    placeholder: '',
                    focusable: false,
                    focused: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    breakLine: false,
                });
            });
        });

        describe('autofocus.', () => {
            /** As the first focusable element is automatically focused creates a scenario where the field is the second focusable element. */
            @Component({
                selector: 'autofocus-test',
                imports: [TextAreaComponent],
                template: `
                    <!-- button is focused by default -->
                    <button>Test</button>
                    <app-text-area-field
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
                    this.locatorFor(TextAreaFieldHarness);
                getNumericFieldHarness() {
                    return this.numericFieldHarness();
                }
            }

            let testHarness: TestHarness;
            let fixture: ComponentFixture<AutofocusTestComponent>;
            let textFieldHarness: TextAreaFieldHarness;
            let textFieldComponent: TextAreaComponent;

            beforeEach(async () => {
                fixture = TestBed.createComponent(AutofocusTestComponent);
                fixture.detectChanges();
                testHarness = await TestbedHarnessEnvironment.harnessForFixture(
                    fixture,
                    TestHarness,
                );
                textFieldComponent =
                    fixture.debugElement.children[1].componentInstance;
                textFieldHarness = await testHarness.getNumericFieldHarness();
            });

            it('should set autofocus = false by default.', async () => {
                await _testTextAreaComponent({
                    component: textFieldComponent,
                    harness: textFieldHarness,
                    id: true,
                    type: FormElementType.text,
                    controlValue: '',
                    textAreaValue: '',
                    label: '',
                    placeholder: '',
                    focusable: true,
                    focused: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    breakLine: false,
                });
            });

            it('should set autofocus = false.', async () => {
                const tf = fixture.debugElement.children[1]
                    .componentInstance as TextAreaComponent;
                tf.autofocus.set(false);
                fixture.detectChanges();

                await _testTextAreaComponent({
                    component: textFieldComponent,
                    harness: textFieldHarness,
                    id: true,
                    type: FormElementType.text,
                    controlValue: '',
                    textAreaValue: '',
                    label: '',
                    placeholder: '',
                    focusable: true,
                    focused: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    breakLine: false,
                });
            });

            it('should set autofocus = true.', async () => {
                const tf = fixture.debugElement.children[1]
                    .componentInstance as TextAreaComponent;
                tf.autofocus.set(true);
                fixture.detectChanges();

                await _testTextAreaComponent({
                    component: textFieldComponent,
                    harness: textFieldHarness,
                    id: true,
                    type: FormElementType.text,
                    textAreaValue: '',
                    controlValue: '',
                    label: '',
                    placeholder: '',
                    focusable: true,
                    focused: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    breakLine: false,
                });
            });
        });

        describe('readOnly.', () => {
            it('should set not readonly by default.', async () => {
                await _testTextAreaComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    controlValue: '',
                    textAreaValue: '',
                    label: '',
                    placeholder: '',
                    focusable: true,
                    focused: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    breakLine: false,
                });
            });

            it('should set readonly = true.', async () => {
                component.readOnly.set(true);
                fixture.detectChanges();

                await _testTextAreaComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    controlValue: '',
                    textAreaValue: '',
                    label: '',
                    placeholder: '',
                    focusable: true,
                    focused: true,
                    readOnly: true,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    breakLine: false,
                });
            });

            it('should set readonly = false.', async () => {
                component.readOnly.set(false);
                fixture.detectChanges();

                await _testTextAreaComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    controlValue: '',
                    textAreaValue: '',
                    label: '',
                    placeholder: '',
                    focusable: true,
                    focused: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    breakLine: false,
                });
            });
        });

        describe('minLength.', () => {
            it('should not set minLength.', async () => {
                fixture.detectChanges();

                await _testTextAreaComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    controlValue: '',
                    textAreaValue: '',
                    label: '',
                    placeholder: '',
                    focusable: true,
                    focused: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    breakLine: false,
                });
            });

            it('should set minLength.', async () => {
                component.minLength.set(5);
                fixture.detectChanges();

                await _testTextAreaComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    controlValue: '',
                    textAreaValue: '',
                    label: '',
                    placeholder: '',
                    focusable: true,
                    focused: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: 5,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    breakLine: false,
                });
            });
        });

        describe('maxLength.', () => {
            it('should not set maxLength.', async () => {
                fixture.detectChanges();

                await _testTextAreaComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    controlValue: '',
                    textAreaValue: '',
                    label: '',
                    placeholder: '',
                    focusable: true,
                    focused: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    breakLine: false,
                });
            });

            it('should set maxLength.', async () => {
                component.maxLength.set(5);
                fixture.detectChanges();

                await _testTextAreaComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    controlValue: '',
                    textAreaValue: '',
                    label: '',
                    placeholder: '',
                    focusable: true,
                    focused: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: 5,
                    prefix: null,
                    suffix: null,
                    error: '',
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    breakLine: false,
                });
            });
        });

        // TODO: autosizeMinRows
        // TODO: autosizeMaxRows
    });
});

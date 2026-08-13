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
import { TextAreaFieldComponent } from '@components/form/components/text/text-area/text-area.component';
import { TextAreaFieldHarness } from '@components/form/components/text/text-area/text-area.harness';

const loremIpsum =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

describe('TextAreaComponent.', () => {
    let component: TextAreaFieldComponent;
    let fixture: ComponentFixture<TextAreaFieldComponent>;
    let control: FormControl;
    let harness: TextAreaFieldHarness;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, TextAreaFieldComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TextAreaFieldComponent);
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
        component.autosizeMinRows.set(2);
        component.autosizeMaxRows.set(6);
        control.markAsDirty();
        control.markAsTouched();
        control.updateValueAndValidity();
        fixture.detectChanges();

        const state = await harness.getState();
        expect(state).toEqual({
            id: 'description',
            value: loremIpsum,
            label: 'Description',
            placeholder: 'Description placeholder',
            isFocusable: true,
            isFocused: false,
            isReadOnly: false,
            minLength: 3,
            maxLength: 14,
            errors: ['Máximo de 10 caracteres.'],
            autosizeMinRows: 2,
            autosizeMaxRows: 6,
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
                    value: '',
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    minLength: null,
                    maxLength: null,
                    errors: [],
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    hasValidStructure: true,
                });
            });

            it('should generate id.', async () => {
                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    value: '',
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    minLength: null,
                    maxLength: null,
                    errors: [],
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
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
                    value: '',
                    label: 'Test label',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    minLength: null,
                    maxLength: null,
                    errors: [],
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    hasValidStructure: true,
                });
            });

            it('should empty label by default.', async () => {
                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    value: '',
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    minLength: null,
                    maxLength: null,
                    errors: [],
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    hasValidStructure: true,
                });
            });
        });

        describe('placeholder.', () => {
            it('should set placeholder.', async () => {
                component.placeholder.set('Test placeholder');
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    value: '',
                    label: '',
                    placeholder: 'Test placeholder',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    minLength: null,
                    maxLength: null,
                    errors: [],
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    hasValidStructure: true,
                });
            });

            it('should empty placeholder by default.', async () => {
                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    value: '',
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    minLength: null,
                    maxLength: null,
                    errors: [],
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    hasValidStructure: true,
                });
            });
        });

        describe('focusable.', () => {
            it('should set focusable = true by default.', async () => {
                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    value: '',
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    minLength: null,
                    maxLength: null,
                    errors: [],
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    hasValidStructure: true,
                });
            });

            it('should set focusable.', async () => {
                component.focusable.set(true);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    value: '',
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    minLength: null,
                    maxLength: null,
                    errors: [],
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    hasValidStructure: true,
                });
            });

            it('should set not focusable.', async () => {
                component.focusable.set(false);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    value: '',
                    label: '',
                    placeholder: '',
                    isFocusable: false,
                    isFocused: false,
                    isReadOnly: false,
                    minLength: null,
                    maxLength: null,
                    errors: [],
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    hasValidStructure: true,
                });
            });
        });

        describe('readOnly.', () => {
            it('should set not readonly by default.', async () => {
                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    value: '',
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    minLength: null,
                    maxLength: null,
                    errors: [],
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    hasValidStructure: true,
                });
            });

            it('should set readonly = true.', async () => {
                component.readOnly.set(true);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    value: '',
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: true,
                    minLength: null,
                    maxLength: null,
                    errors: [],
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    hasValidStructure: true,
                });
            });

            it('should set readonly = false.', async () => {
                component.readOnly.set(false);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    value: '',
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    minLength: null,
                    maxLength: null,
                    errors: [],
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
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
                    value: '',
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    minLength: null,
                    maxLength: null,
                    errors: [],
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    hasValidStructure: true,
                });
            });

            it('should set minLength.', async () => {
                component.minLength.set(5);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    value: '',
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    minLength: 5,
                    maxLength: null,
                    errors: [],
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
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
                    value: '',
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    minLength: null,
                    maxLength: null,
                    errors: [],
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    hasValidStructure: true,
                });
            });

            it('should set maxLength.', async () => {
                component.maxLength.set(5);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    value: '',
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    minLength: null,
                    maxLength: 5,
                    errors: [],
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    hasValidStructure: true,
                });
            });
        });

        describe('autosizeMinRows.', () => {
            it('should not set autosizeMinRows.', async () => {
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    value: '',
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    minLength: null,
                    maxLength: null,
                    errors: [],
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    hasValidStructure: true,
                });
            });

            it('should set autosizeMinRows.', async () => {
                component.autosizeMinRows.set(5);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    value: '',
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    minLength: null,
                    maxLength: null,
                    errors: [],
                    autosizeMinRows: 5,
                    autosizeMaxRows: 6,
                    hasValidStructure: true,
                });
            });
        });

        describe('autosizeMaxRows.', () => {
            it('should not set autosizeMaxRows.', async () => {
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    value: '',
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    minLength: null,
                    maxLength: null,
                    errors: [],
                    autosizeMinRows: 2,
                    autosizeMaxRows: 6,
                    hasValidStructure: true,
                });
            });

            it('should set autosizeMaxRows.', async () => {
                component.autosizeMaxRows.set(5);
                fixture.detectChanges();

                const state = await harness.getState();
                expect(state).toEqual({
                    id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                    value: '',
                    label: '',
                    placeholder: '',
                    isFocusable: true,
                    isFocused: false,
                    isReadOnly: false,
                    minLength: null,
                    maxLength: null,
                    errors: [],
                    autosizeMinRows: 2,
                    autosizeMaxRows: 5,
                    hasValidStructure: true,
                });
            });
        });
    });
});

describe('TextAreaComponent.', () => {
    describe('autofocus.', () => {
        /** As the first focusable element is automatically focused creates a scenario where the field is the second focusable element. */
        @Component({
            selector: 'autofocus-test',
            imports: [TextAreaFieldComponent],
            template: `
                <!-- button is focused by default -->
                <button>Test</button>
                <app-text-area-field id="text-area-id" [control]="control" />
            `,
        })
        class AutofocusTestComponent {
            control = new FormControl('');
        }

        class TestHarness extends ComponentHarness {
            static hostSelector = 'autofocus-test';
            private textFieldHarness = this.locatorFor(TextAreaFieldHarness);
            getTextFieldHarness() {
                return this.textFieldHarness();
            }
        }

        let testHarness: TestHarness;
        let fixture: ComponentFixture<AutofocusTestComponent>;
        let textAreaFieldHarness: TextAreaFieldHarness;
        let textAreaFieldComponent: TextAreaFieldComponent;

        beforeEach(async () => {
            fixture = TestBed.createComponent(AutofocusTestComponent);
            fixture.detectChanges();
            testHarness = await TestbedHarnessEnvironment.harnessForFixture(
                fixture,
                TestHarness,
            );
            textAreaFieldComponent =
                fixture.debugElement.children[1].componentInstance;
            textAreaFieldHarness = await testHarness.getTextFieldHarness();
        });

        it('should set autofocus = false by default.', async () => {
            fixture.detectChanges();

            const state = await textAreaFieldHarness.getState();
            expect(state).toEqual({
                id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                value: '',
                label: '',
                placeholder: '',
                isFocusable: true,
                isFocused: false,
                isReadOnly: false,
                minLength: null,
                maxLength: null,
                errors: [],
                autosizeMinRows: 2,
                autosizeMaxRows: 6,
                hasValidStructure: true,
            });
        });

        it('should set autofocus = false.', async () => {
            textAreaFieldComponent.autofocus.set(false);
            fixture.detectChanges();

            const state = await textAreaFieldHarness.getState();
            expect(state).toEqual({
                id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                value: '',
                label: '',
                placeholder: '',
                isFocusable: true,
                isFocused: false,
                isReadOnly: false,
                minLength: null,
                maxLength: null,
                errors: [],
                autosizeMinRows: 2,
                autosizeMaxRows: 6,
                hasValidStructure: true,
            });
        });

        it('should set autofocus = true.', async () => {
            textAreaFieldComponent.autofocus.set(true);
            fixture.detectChanges();

            const state = await textAreaFieldHarness.getState();
            expect(state).toEqual({
                id: jasmine.stringMatching(/^mat-input-[a-z0-9]+$/),
                value: '',
                label: '',
                placeholder: '',
                isFocusable: true,
                isFocused: true,
                isReadOnly: false,
                minLength: null,
                maxLength: null,
                errors: [],
                autosizeMinRows: 2,
                autosizeMaxRows: 6,
                hasValidStructure: true,
            });
        });
    });
});

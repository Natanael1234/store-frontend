import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { TextFormat } from '../../../enums/text-format/text-format.enum';
import { TextMask } from '../../../enums/text-mask/text-mask.enum';
import { TextFieldComponent } from '../text-field.component';
import { _testTextFieldComponent } from './text-field.component.test';
import { TextFieldHarness } from './text-field.harness';

describe('TextFieldComponent:', () => {
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

    it('should validate component with all properties', async () => {
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
        component.format.set(TextFormat.cpf);
        component.minLength.set(3);
        component.maxLength.set(14); // including formatting characters
        component.prefix.set('R$');
        component.suffix.set('reais');
        component.breakLine.set(false);
        fixture.detectChanges();

        await _testTextFieldComponent({
            component,
            harness,
            id: 'quantity',
            type: FormElementType.text,
            maskedValue: '96 675 977 091',
            label: 'Quantity',
            placeholder: 'Type the quantity',
            control,
            focusable: true,
            readOnly: false,
            format: TextFormat.cpf,
            minLength: 3,
            maxLength: 14,
            prefix: 'R$',
            suffix: 'reais',
            error: 'Máximo de 10 caracteres.',
            breakLine: false,
        });
    });

    xit('should set component without optional properties', async () => {
        const control = new FormControl('9667', {
            validators: [Validators.maxLength(10)],
            updateOn: 'change',
        });
        fixture.detectChanges();

        await _testTextFieldComponent({
            component,
            harness,
            id: true,
            type: FormElementType.text,
            maskedValue: '',
            label: '',
            placeholder: '',
            control,
            focusable: true,
            readOnly: false,
            format: TextFormat.cpf,
            minLength: null,
            maxLength: null,
            prefix: null,
            suffix: null,
            error: '',
            breakLine: false,
        });
    });

    describe('parameters:', () => {
        describe('id:', () => {
            it('should set id', async () => {
                component.id.set('test-id');
                fixture.detectChanges();
                await _testTextFieldComponent({
                    component,
                    harness,
                    id: 'test-id',
                    type: FormElementType.text,
                    maskedValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    breakLine: false,
                });
            });

            it('should generate id', async () => {
                await _testTextFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    maskedValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    breakLine: false,
                });
            });
        });

        describe('label:', () => {
            it('should set label', async () => {
                component.label.set('Test label');
                fixture.detectChanges();

                await _testTextFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    maskedValue: '',
                    label: 'Test label',
                    placeholder: '',
                    control,
                    focusable: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    breakLine: false,
                });
            });

            it('should empty label by default', async () => {
                await _testTextFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    maskedValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    breakLine: false,
                });
            });
        });

        describe('format:', () => {
            it('should set password format when format is password', async () => {
                component.format.set(TextFormat.password);
                fixture.detectChanges();

                await _testTextFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    maskedValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    readOnly: false,
                    format: TextFormat.password,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    breakLine: false,
                });
            });

            it('should set password text when format is undefined', async () => {
                component.format.set(undefined);
                fixture.detectChanges();

                await _testTextFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    maskedValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    readOnly: false,
                    format: null,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    breakLine: false,
                });
            });

            it('should set password format', async () => {
                component.format.set(TextFormat.password);
                fixture.detectChanges();

                await _testTextFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.password,
                    maskedValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    readOnly: false,
                    format: TextFormat.password,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    breakLine: false,
                });
            });

            it('should set custom format', async () => {
                component.format.set(TextFormat.cnpj);
                fixture.detectChanges();

                await _testTextFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    maskedValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    readOnly: false,
                    format: null,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    breakLine: false,
                });
            });
        });

        describe('focusable:', () => {
            it('should set focusable = true by default', async () => {
                await _testTextFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    maskedValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    breakLine: false,
                });
            });

            it('should set focusable', async () => {
                component.focusable.set(true);
                fixture.detectChanges();

                await _testTextFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    maskedValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    breakLine: false,
                });
            });

            it('should set not focusable', async () => {
                component.focusable.set(false);
                fixture.detectChanges();

                await _testTextFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    maskedValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: false,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    breakLine: false,
                });
            });
        });

        describe('readOnly:', () => {
            it('should set not readonly by default.', async () => {
                await _testTextFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    maskedValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    breakLine: false,
                });
            });

            it('should set readonly = true.', async () => {
                component.readOnly.set(true);
                fixture.detectChanges();

                await _testTextFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    maskedValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    readOnly: true,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    breakLine: false,
                });
            });

            it('should set readonly = false.', async () => {
                component.readOnly.set(false);
                fixture.detectChanges();

                await _testTextFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    maskedValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    breakLine: false,
                });
            });
        });

        describe('minLength:', () => {
            it('should not set minLength', async () => {
                fixture.detectChanges();

                await _testTextFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    maskedValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    breakLine: false,
                });
            });

            it('should set minLength', async () => {
                component.minLength.set(5);
                fixture.detectChanges();

                await _testTextFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    maskedValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: 5,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    breakLine: false,
                });
            });
        });

        describe('maxLength:', () => {
            it('should not set maxLength', async () => {
                fixture.detectChanges();

                await _testTextFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    maskedValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    breakLine: false,
                });
            });

            it('should set maxLength', async () => {
                component.maxLength.set(5);
                fixture.detectChanges();

                await _testTextFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    maskedValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: 5,
                    prefix: null,
                    suffix: null,
                    error: '',
                    breakLine: false,
                });
            });
        });

        describe('prefix:', () => {
            it('should not set prefix', async () => {
                fixture.detectChanges();

                await _testTextFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    maskedValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    breakLine: false,
                });
            });

            it('should set prefix', async () => {
                component.prefix.set('R$');
                fixture.detectChanges();

                await _testTextFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    maskedValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: 'R$',
                    suffix: null,
                    error: '',
                    breakLine: false,
                });
            });
        });

        describe('suffix:', () => {
            it('should not set prefix', async () => {
                fixture.detectChanges();

                await _testTextFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    maskedValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    breakLine: false,
                });
            });

            it('should set suffix', async () => {
                component.suffix.set('reais');
                fixture.detectChanges();

                await _testTextFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    maskedValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    readOnly: false,
                    format: TextFormat.cpf,
                    minLength: null,
                    maxLength: null,
                    prefix: null,
                    suffix: 'reais',
                    error: '',
                    breakLine: false,
                });
            });
        });
    });
});

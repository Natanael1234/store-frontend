import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { maxLengthValidator } from '../../../../../validators/max-length/max-length.validator';
import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { NumericFieldComponent } from '../numeric-field.component';
import { _testNumericFieldComponent } from './numeric-field.component.test';
import { NumericFieldHarness } from './numeric-field.harness';

describe('TextFieldComponent', () => {
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

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should validate component with all properties', async () => {
        component.id.set('quantity');
        component.label.set('Quantity');
        component.placeholder.set('Type the quantity');
        component.focusable.set(true);
        component.minLength.set(17);
        component.maxLength.set(20); // including formatting characters
        component.min.set(5);
        component.max.set(12345679);
        component.step.set(1);
        component.prefix.set('R$');
        component.suffix.set('reais');
        component.allowNegativeNumbers.set(true);
        component.decimalPlaces.set(2);
        component.breakLine.set(false);
        const control = new FormControl('12345678.91', {
            validators: [maxLengthValidator(5)],
        });
        component.control.set(control);

        await _testNumericFieldComponent({
            component,
            harness,
            id: 'quantity',
            type: FormElementType.text,
            inputValue: '12.345.678,91',
            controlValue: '12345678.91',
            label: 'Quantity',
            placeholder: 'Type the quantity',
            control,
            focusable: true,
            minLength: 17,
            maxLength: 20,
            min: 5,
            max: 12345679,
            step: 1,
            prefix: 'R$',
            suffix: 'reais',
            allowNegativeValues: true,
            error: 'O comprimento máximo permitido é 5.',
            breakLine: false,
        });
    });

    it('should set component without optional properties', async () => {
        const control = new FormControl('9667', {
            validators: [Validators.maxLength(10)],
            updateOn: 'change',
        });
        component.control.set(control);
        component.decimalPlaces.set(2);
        fixture.detectChanges();

        await _testNumericFieldComponent({
            component,
            harness,
            id: true,
            type: FormElementType.text,
            inputValue: '9.667',
            controlValue: '9667',
            label: '',
            placeholder: '',
            control,
            focusable: true,
            minLength: null,
            maxLength: null,
            min: null,
            max: null,
            step: null,
            prefix: null,
            suffix: null,
            allowNegativeValues: false,
            error: '',
            breakLine: false,
        });
    });

    describe('parameters', () => {
        describe('id', () => {
            it('should set id', async () => {
                component.id.set('test-id');
                fixture.detectChanges();
                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: 'test-id',
                    type: FormElementType.text,
                    inputValue: '',
                    controlValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    allowNegativeValues: true,
                    breakLine: false,
                });
            });

            it('should generate id', async () => {
                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '',
                    controlValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });
        });

        describe('label', () => {
            it('should set label', async () => {
                component.label.set('Test label');
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '',
                    controlValue: '',
                    label: 'Test label',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });

            it('should empty label by default', async () => {
                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '',
                    controlValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });
        });

        describe('placeholder', () => {
            it('should set placeholder', async () => {
                component.placeholder.set('Test placeholder');
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '',
                    controlValue: '',
                    label: '',
                    placeholder: 'Test placeholder',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });

            it('should empty placeholder by default', async () => {
                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '',
                    controlValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });
        });

        describe('focusable', () => {
            it('should set focusable by default', async () => {
                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '',
                    controlValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    error: '',
                    breakLine: false,
                    allowNegativeValues: true,
                });
            });

            it('should set focusable', async () => {
                component.focusable.set(true);
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '',
                    controlValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });

            it('should set not focusable', async () => {
                component.focusable.set(false);
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '',
                    controlValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: false,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });
        });

        describe('minLength', () => {
            it('should not set minLength', async () => {
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '',
                    controlValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });

            it('should set minLength', async () => {
                component.minLength.set(5);
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '',
                    controlValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: 5,
                    maxLength: null,
                    min: null,
                    max: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: true,
                    step: null,
                    error: '',
                    breakLine: false,
                });
            });
        });

        describe('maxLength', () => {
            it('should not set maxLength', async () => {
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '',
                    controlValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });

            it('should set maxLength', async () => {
                component.maxLength.set(5);
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '',
                    controlValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: 5,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });
        });

        describe('min', () => {
            it('should not set min', async () => {
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '',
                    controlValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });

            it('should set min', async () => {
                component.min.set(5);
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '',
                    controlValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: 5,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });
        });

        describe('max', () => {
            it('should not set max', async () => {
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '',
                    controlValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });

            it('should set max', async () => {
                component.max.set(5);
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '',
                    controlValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: 5,
                    step: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });
        });

        describe('step', () => {
            it('should not set step', async () => {
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '',
                    controlValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });

            it('should set step', async () => {
                component.step.set(5);
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '',
                    controlValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: 5,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });
        });

        describe('prefix', () => {
            it('should not set prefix', async () => {
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '',
                    controlValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });

            it('should set prefix', async () => {
                component.prefix.set('R$');
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '',
                    controlValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: 'R$',
                    suffix: null,
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });
        });

        describe('suffix', () => {
            it('should not set prefix', async () => {
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '',
                    controlValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });

            it('should set suffix', async () => {
                component.suffix.set('reais');
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '',
                    controlValue: '',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: 'reais',
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });
        });

        describe('decimalPlaces', () => {
            it('should not set decimalPlaces (unlimited by default)', async () => {
                component.control.set(new FormControl('1567.54546'));
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '1.567,54546',
                    controlValue: '1567.54546',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });

            it('should set decimalPlaces = 2', async () => {
                component.allowNegativeNumbers.set(true);
                component.control.set(new FormControl('1567.5'));
                component.decimalPlaces.set(2);
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '1.567,5',
                    controlValue: '1567.5',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });

            it('should set allowNegativeNumbers = false', async () => {
                component.allowNegativeNumbers.set(false);
                component.control.set(new FormControl('-3567'));
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '3.567',
                    controlValue: '-3567', // should remove "-" ?
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: false,
                    error: '',
                    breakLine: false,
                });
            });
        });

        describe('allowNegativeNumbers', () => {
            it('should not set allowNegativeNumbers (allow by default)', async () => {
                component.control.set(new FormControl('-1567'));
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '-1.567',
                    controlValue: '-1567',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });

            it('should set allowNegativeNumbers = true', async () => {
                component.allowNegativeNumbers.set(true);
                component.control.set(new FormControl('-2567'));
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '-2.567',
                    controlValue: '-2567',
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: true,
                    error: '',
                    breakLine: false,
                });
            });

            it('should set allowNegativeNumbers = false', async () => {
                component.allowNegativeNumbers.set(false);
                component.control.set(new FormControl('-3567'));
                fixture.detectChanges();

                await _testNumericFieldComponent({
                    component,
                    harness,
                    id: true,
                    type: FormElementType.text,
                    inputValue: '3.567',
                    controlValue: '-3567', // should remove "-" ?
                    label: '',
                    placeholder: '',
                    control,
                    focusable: true,
                    minLength: null,
                    maxLength: null,
                    min: null,
                    max: null,
                    step: null,
                    prefix: null,
                    suffix: null,
                    allowNegativeValues: false,
                    error: '',
                    breakLine: false,
                });
            });
        });
    });
});

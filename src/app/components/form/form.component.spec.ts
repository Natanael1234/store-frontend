import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { of } from 'rxjs';
import { UserConfigs } from '../../configs/user/user.configs';
import { Icon } from '../../enums/icons/icons.enum';
import { cepValidator } from '../../validators/cep/cep.validator';
import { cnpjValidator } from '../../validators/cnpj/cnpj.validator';
import { cpfValidator } from '../../validators/cpf/cpf.validator';
import { dateValidator } from '../../validators/date/date.validator';
import { emailValidator } from '../../validators/email/email.validator';
import { maxLengthValidator } from '../../validators/max-length/max-length.validator';
import { maxValidator } from '../../validators/max/max.validator';
import { minLengthValidator } from '../../validators/min-length/min-length.validator';
import { minValidator } from '../../validators/min/min.validator';
import { nameValidator } from '../../validators/name/name.validator';
import { requiredValidator } from '../../validators/required/required.validator';
import { strongPasswordValidator } from '../../validators/strong-password/strong-password.validator';
import { timeValidator } from '../../validators/time/time.validator';
import { AbstractFormElementModel } from './components/abstract/abstract-form-element.model';
import { ButtonComponent } from './components/button/button.component';
import { ButtonStyle } from './components/button/enum/style/button-style.enum';
import { ButtonModel } from './components/button/model/button.model';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { CheckboxModel } from './components/checkbox/model/checkbox.model';
import { DividerModel } from './components/divider/model/divider.-form-elementmodel';
import { LabelModel } from './components/label/model/label-form-element.model';
import { RadioGroupModel } from './components/radio-group/model/radio-buttons-element.model';
import { RadioGroupComponent } from './components/radio-group/radio-group.component';
import { SelectModel } from './components/select/model/select-element.model';
import { SelectFieldComponent } from './components/select/select-field.component';
import { NumericFieldModel } from './components/text/numeric-field/model/numeric-field.model';
import { NumericFieldComponent } from './components/text/numeric-field/numeric-field.component';
import { TextAreaModel } from './components/text/text-area/model/text-area.model';
import { TextAreaFieldComponent } from './components/text/text-area/text-area.component';
import { TextFieldModel } from './components/text/text-field/model/text-field.model';
import { TextFieldComponent } from './components/text/text-field/text-field.component';
import { FormFieldWrapperElementHarness } from './form-field-wrapper.element.harness';
import { FormComponent } from './form.component';
import { FormComponentHarness } from './form.component.harness';
import { FormElementHarness } from './form.element.harness';
import { SpacerModel } from './spacer/model/spacer.model';

describe('FormComponent.', () => {
    let formComponent: FormComponent;
    let fixture: ComponentFixture<FormComponent>;
    let harness: FormComponentHarness;

    let form = new FormGroup(
        {
            number: new FormControl(
                { value: '-1265.89', disabled: false },
                {
                    validators: [
                        requiredValidator(),
                        minValidator(-1000),
                        maxValidator(2000),
                    ],
                },
            ),
            name: new FormControl(
                { value: 'x', disabled: false },
                {
                    validators: [
                        nameValidator({
                            required: true,
                            minLength: UserConfigs.NAME_MIN_LENGTH,
                            maxLength: UserConfigs.NAME_MAX_LENGTH,
                        }),
                    ],
                },
            ),
            email: new FormControl(
                { value: 'user@email.com', disabled: false },
                { validators: [emailValidator({ required: true })] },
            ),
            password: new FormControl(
                { value: 'Senha123$', disabled: false },
                {
                    validators: [
                        requiredValidator(),
                        minLengthValidator(UserConfigs.PASSWORD_MIN_LENGTH),
                        maxLengthValidator(UserConfigs.PASSWORD_MAX_LENGTH),
                        strongPasswordValidator(),
                    ],
                },
            ),
            phone: new FormControl(
                { value: '91998689855', disabled: false },
                { validators: [requiredValidator()] },
            ),
            zipCode: new FormControl(
                { value: '31810050', disabled: false },
                { validators: [cepValidator()] },
            ),
            date: new FormControl(
                { value: '05/05/2025', disabled: false },
                { validators: [dateValidator()] },
            ),
            time: new FormControl(
                { value: '23:03', disabled: false },
                { validators: [timeValidator()] },
            ),
            cnpj: new FormControl(
                { value: '32599768000110', disabled: false },
                { validators: [cnpjValidator()] },
            ),
            cpf: new FormControl(
                { value: '31946183423', disabled: false },
                { validators: [cpfValidator()] },
            ),
            amount: new FormControl(
                { value: '-3456.0', disabled: false },
                {
                    validators: [
                        // TODO: não está validando no início
                        requiredValidator(),
                        minValidator(-5),
                        maxValidator(100),
                    ],
                },
            ),
            price: new FormControl(
                { value: '1231.11', disabled: false },
                {
                    validators: [
                        // TODO: não está validando no início
                        requiredValidator(),
                        minValidator(-5),
                        maxValidator(100),
                    ],
                },
            ),
            description: new FormControl(
                { value: 'Blá\nblá\nblá', disabled: false },
                { validators: [requiredValidator()] },
            ),
            disabledDescription: new FormControl(
                { value: 'Blá\nblá\nblá\nblá', disabled: true },
                { validators: [requiredValidator()] },
            ),
            level: new FormControl(
                { value: 'B', disabled: false },
                { validators: [Validators.required] },
            ),
            gender: new FormControl(
                { value: 'M', disabled: false },
                { validators: [requiredValidator()] },
            ),
            acceptTerms: new FormControl(
                { value: false, disabled: false },
                { validators: [requiredValidator()] },
            ),
        },
        { updateOn: 'blur' },
    );

    let numericFieldModel: NumericFieldModel;
    let spacerModel: SpacerModel;
    let textFieldModel: TextFieldModel;
    let textAreaModel: TextAreaModel;
    let dividerModel: DividerModel;
    let labelModel: LabelModel;
    let selectFieldModel: SelectModel;
    let radioGroupModel: RadioGroupModel;
    let checkboxModel: CheckboxModel;
    let buttonModel: ButtonModel;
    let formElements: AbstractFormElementModel[];

    function getComponent(idx: number) {
        const wrappers = fixture.debugElement.queryAll(By.css('form > div'));
        const child = wrappers[idx].children[0];
        const comp = child.componentInstance;
        return comp;
    }
    function getWrapperElement(idx: number) {
        const wrappers = fixture.debugElement.queryAll(By.css('form > div'));
        const child = wrappers[idx];
        return child.nativeElement;
    }

    function getNumericFieldComponent() {
        return getComponent(0) as NumericFieldComponent;
    }
    function getSpacerWrapperElement() {
        const element = getWrapperElement(1);
        return element;
    }
    function getTextFieldComponent() {
        return getComponent(2) as TextFieldComponent;
    }
    function getTextAreaComponent() {
        return getComponent(3) as TextAreaFieldComponent;
    }
    function getSelectFieldComponent() {
        return getComponent(4) as SelectFieldComponent;
    }
    function getRadioGroupFieldComponent() {
        return getComponent(5) as RadioGroupComponent;
    }
    function getCheckboxComponent() {
        return getComponent(6) as CheckboxComponent;
    }
    function getLabelElement() {
        const debugElements = fixture.debugElement.queryAll(
            By.css('form > div'),
        );
        const debugElement = debugElements[7].children[0];
        const nativeElement = debugElement.nativeElement;
        return nativeElement;
    }
    function getDividerComponent() {
        return getComponent(8) as MatDivider;
    }
    function getButtonComponent() {
        return getComponent(9) as ButtonComponent;
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FormComponent,
                ReactiveFormsModule,
                MatInputModule,
                MatSelectModule,
                MatRadioModule,
                MatDividerModule,
                MatCheckboxModule,
                NgxMaskDirective,
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: convertToParamMap({ id: '123' }),
                            queryParamMap: convertToParamMap({}),
                        },
                        params: of({ id: '123' }),
                        queryParams: of({}),
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(FormComponent);
        formComponent = fixture.componentInstance;
        fixture.detectChanges();

        numericFieldModel = new NumericFieldModel({
            id: 'amout',
            label: 'Amount',
            control: form.controls.amount,
            focusable: true,
            autofocus: false,
            readOnly: false,
            minLength: 3,
            maxLength: 7,
            min: -200.0533,
            max: 100.343,
            allowNegativeNumbers: true,
            leadZero: false,
            decimalPlaces: 2,
            step: 1,
            onBlur: () => console.log('On text input blur'),
            colSize: 6,
        });
        spacerModel = new SpacerModel({ colSize: 2 });
        textFieldModel = new TextFieldModel({
            id: 'name ',
            mask: undefined,
            label: 'Nome',
            control: form.controls.name,
            focusable: true,
            autofocus: false,
            readOnly: false,
            minLength: 3,
            maxLength: 7,
            onBlur: () => console.log('On text input blur'),
            colSize: 6,
        });
        textAreaModel = new TextAreaModel({
            id: 'description',
            label: 'Descrição',
            placeholder: 'Insira uma descrição',
            focusable: true,
            autofocus: false,
            readOnly: false,
            maxLength: 200,
            control: form.controls.description,
            colSize: 12,
            onBlur: () => console.log('On text area blur'),
        });
        dividerModel = new DividerModel({
            id: 'test-divider',
            colSize: 11,
        });
        labelModel = new LabelModel({
            id: 'test-label',
            value: 'Outro label',
            colSize: 12,
        });
        selectFieldModel = new SelectModel({
            id: 'gender',
            label: 'Gênero',
            options: [
                { label: 'Masculino', value: 'M' },
                { label: 'Feminino', value: 'F' },
            ],
            control: form.controls.gender,
            colSize: 7,
        });
        radioGroupModel = new RadioGroupModel({
            id: 'level',
            label: 'Nível',
            options: [
                { label: 'Begginer', value: 'B' },
                { label: 'Intermmediate', value: 'I' },
                { label: 'Advanced', value: 'A' },
            ],
            control: form.controls.level,
            focusable: true,
            colSize: 12,
        });
        checkboxModel = new CheckboxModel({
            id: 'accept-terms',
            label: 'Aceito os termos',
            control: form.controls.acceptTerms,
            focusable: true,
            autofocus: false,
            colSize: 4,
        });
        buttonModel = new ButtonModel({
            id: 'flat-button',
            icon: Icon.checked,
            label: 'Botão plano',
            style: ButtonStyle.text,
            routerLink: '/products',
            colSize: 2,
            focusable: true,
            autofocus: false,
        });
        formElements = [
            numericFieldModel,
            spacerModel,
            textFieldModel,
            textAreaModel,
            selectFieldModel,
            radioGroupModel,
            checkboxModel,
            labelModel,
            dividerModel,
            buttonModel,
        ];
        form.markAllAsTouched();
        form.markAllAsDirty();
        form.updateValueAndValidity();

        harness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            FormComponentHarness,
        );
    });

    it('should create.', () => {
        expect(formComponent).toBeTruthy();
    });

    it('should render an empty form.', async () => {
        fixture.detectChanges();

        const state: any = await harness.getState();
        expect(state).toEqual({ hasValidStructure: true, children: [] });
    });

    describe('form with multiple elements.', () => {
        let formHarness: FormElementHarness;
        let wrapperHarnessess: FormFieldWrapperElementHarness[];

        beforeEach(async () => {
            formComponent.elements.set(formElements);
            fixture.detectChanges();
            formHarness = await harness.getFormHarness();
            wrapperHarnessess =
                await formHarness.getFormFieldWrapperHarnesses();
        });

        it('should render an form with fields.', async () => {
            const state = await harness.getState();

            expect(state).toEqual({
                hasValidStructure: true,
                children: [
                    { type: 'APP-NUMERIC-FIELD', colSize: 6 },
                    { type: 'SPACER', colSize: 2 },
                    { type: 'APP-TEXT-FIELD', colSize: 6 },
                    { type: 'APP-TEXT-AREA-FIELD', colSize: 12 },
                    { type: 'APP-SELECT-FIELD', colSize: 7 },
                    { type: 'APP-RADIO-GROUP', colSize: 12 },
                    { type: 'APP-CHECKBOX', colSize: 4 },
                    { type: 'MAT-LABEL', colSize: 12 },
                    { type: 'MAT-DIVIDER', colSize: 11 },
                    { type: 'APP-BUTTON', colSize: 2 },
                ],
            });
        });

        describe('numeric field.', () => {
            it('should render numeric field with correct models.', async () => {
                const numericFieldComponent = getNumericFieldComponent();

                expect(numericFieldComponent.id())
                    .withContext('id')
                    .toEqual(numericFieldModel.id);
                expect(numericFieldComponent.label())
                    .withContext('label')
                    .toEqual(numericFieldModel.label);
                expect(numericFieldComponent.placeholder())
                    .withContext('placeholder')
                    .toEqual(numericFieldModel.placeholder);
                expect(numericFieldComponent.focusable())
                    .withContext('focusable')
                    .toEqual(numericFieldModel.focusable);
                expect(numericFieldComponent.autofocus())
                    .withContext('autofocus')
                    .toEqual(numericFieldModel.autofocus);
                expect(numericFieldComponent.readOnly())
                    .withContext('readOnly')
                    .toEqual(numericFieldModel.readOnly);
                expect(numericFieldComponent.control())
                    .withContext('control')
                    .toEqual(numericFieldModel.control);
                expect(numericFieldComponent.minLength())
                    .withContext('minLength')
                    .toEqual(numericFieldModel.minLength);
                expect(numericFieldComponent.maxLength())
                    .withContext('maxLength')
                    .toEqual(numericFieldModel.maxLength);
                expect(numericFieldComponent.prefix())
                    .withContext('prefix')
                    .toEqual(numericFieldModel.prefix);
                expect(numericFieldComponent.suffix())
                    .withContext('suffix')
                    .toEqual(numericFieldModel.suffix);
                expect(numericFieldComponent.min())
                    .withContext('min')
                    .toEqual(numericFieldModel.min);
                expect(numericFieldComponent.max())
                    .withContext('max')
                    .toEqual(numericFieldModel.max);
                expect(numericFieldComponent.step())
                    .withContext('step')
                    .toEqual(numericFieldModel.step);
                expect(numericFieldComponent.leadZero())
                    .withContext('leadZero')
                    .toEqual(numericFieldModel.leadZero);
                expect(numericFieldComponent.allowNegativeNumbers())
                    .withContext('allowNegativeNumbers')
                    .toEqual(numericFieldModel.allowNegativeNumbers);
                expect(numericFieldComponent.decimalPlaces())
                    .withContext('decimalPlaces')
                    .toEqual(numericFieldModel.decimalPlaces);
            });

            it('numeric field should delegate blur event to to the component.', async () => {
                const numericFieldComponent = getNumericFieldComponent();

                spyOn(numericFieldComponent.onBlur, 'emit');
                const input = fixture.debugElement.query(
                    By.css('APP-NUMERIC-FIELD input'),
                ).nativeElement;
                input.dispatchEvent(new Event('blur'));

                expect(numericFieldComponent.onBlur.emit)
                    .withContext('onBlur event')
                    .toHaveBeenCalledOnceWith();
            });
        });

        describe('spacer', () => {
            it('should render spacer', () => {
                const spacerWrapperElement = getSpacerWrapperElement();
                expect(spacerWrapperElement).toBeDefined();
                expect(spacerWrapperElement).not.toBeNull();
                expect(spacerWrapperElement.children.length).toEqual(0);
                expect(
                    spacerWrapperElement.classList.contains('spacer'),
                ).toBeTrue();
                expect(spacerWrapperElement.children.length).toEqual(0);
            });
        });

        describe('text field.', () => {
            it('should render text field with correct models.', async () => {
                const textFieldComponent = getTextFieldComponent();

                expect(textFieldComponent.id())
                    .withContext('id')
                    .toEqual(textFieldModel.id);
                expect(textFieldComponent.mask())
                    .withContext('mask')
                    .toEqual(textFieldModel.mask);
                expect(textFieldComponent.label())
                    .withContext('label')
                    .toEqual(textFieldModel.label);
                expect(textFieldComponent.placeholder())
                    .withContext('placeholder')
                    .toEqual(textFieldModel.placeholder);
                expect(textFieldComponent.control())
                    .withContext('control')
                    .toEqual(textFieldModel.control);
                expect(textFieldComponent.focusable())
                    .withContext('focusable')
                    .toEqual(textFieldModel.focusable);
                expect(textFieldComponent.autofocus())
                    .withContext('autofocus')
                    .toEqual(textFieldModel.autofocus);
                expect(textFieldComponent.autocomplete())
                    .withContext('autocomplete')
                    .toEqual(textFieldModel.autocomplete);
                expect(textFieldComponent.readOnly())
                    .withContext('readOnly')
                    .toEqual(numericFieldModel.readOnly);
                expect(textFieldComponent.format())
                    .withContext('format')
                    .toEqual(textFieldModel.format);
                expect(textFieldComponent.minLength())
                    .withContext('minLength')
                    .toEqual(textFieldModel.minLength);
                expect(textFieldComponent.maxLength())
                    .withContext('maxLength')
                    .toEqual(textFieldModel.maxLength);
                expect(textFieldComponent.prefix())
                    .withContext('prefix')
                    .toEqual(textFieldModel.prefix);
                expect(textFieldComponent.suffix())
                    .withContext('suffix')
                    .toEqual(textFieldModel.suffix);
            });

            it('text field should delegate blur event to to the component.', async () => {
                const textFieldComponent = getTextFieldComponent();

                spyOn(textFieldComponent.onBlur, 'emit');
                const input = fixture.debugElement.query(
                    By.css('APP-TEXT-FIELD input'),
                ).nativeElement;
                input.dispatchEvent(new Event('blur'));

                expect(textFieldComponent.onBlur.emit)
                    .withContext('onBlur event')
                    .toHaveBeenCalledOnceWith();
            });
        });

        describe('text area.', () => {
            it('should render text field with correct models.', async () => {
                const textAreaComponent = getTextAreaComponent();

                expect(textAreaComponent.id())
                    .withContext('id')
                    .toEqual(textAreaModel.id);
                expect(textAreaComponent.label())
                    .withContext('label')
                    .toEqual(textAreaModel.label);
                expect(textAreaComponent.placeholder())
                    .withContext('placeholder')
                    .toEqual(textAreaModel.placeholder);
                expect(textAreaComponent.control())
                    .withContext('control')
                    .toEqual(textAreaModel.control);
                expect(textAreaComponent.focusable())
                    .withContext('focusable')
                    .toEqual(textAreaModel.focusable);
                expect(textAreaComponent.autofocus())
                    .withContext('autofocus')
                    .toEqual(textAreaModel.autofocus);
                expect(textAreaComponent.readOnly())
                    .withContext('readOnly')
                    .toEqual(textAreaModel.readOnly);
                expect(textAreaComponent.minLength())
                    .withContext('minLength')
                    .toEqual(textAreaModel.minLength);
                expect(textAreaComponent.maxLength())
                    .withContext('maxLength')
                    .toEqual(textAreaModel.maxLength);
                expect(textAreaComponent.autosizeMinRows())
                    .withContext('autosizeMinRows')
                    .toEqual(textAreaModel.autosizeMaxRows);
                expect(textAreaComponent.autosizeMinRows())
                    .withContext('autosizeMaxRows')
                    .toEqual(textAreaModel.autosizeMaxRows);
            });

            it('text field should delegate blur event to to the component.', async () => {
                const textAreaComponent = getTextAreaComponent();

                spyOn(textAreaComponent.onBlur, 'emit');
                const input = fixture.debugElement.query(
                    By.css('APP-TEXT-AREA-FIELD textarea'),
                ).nativeElement;
                input.dispatchEvent(new Event('blur'));

                expect(textAreaComponent.onBlur.emit)
                    .withContext('onBlur event')
                    .toHaveBeenCalledOnceWith();
            });
        });

        describe('select field.', () => {
            it('should render select field with correct models.', () => {
                const selectFieldComponent = getSelectFieldComponent();

                expect(selectFieldComponent.id())
                    .withContext('id')
                    .toEqual(selectFieldModel.id);
                expect(selectFieldComponent.label())
                    .withContext('label')
                    .toEqual(selectFieldModel.label);
                expect(selectFieldComponent.control())
                    .withContext('control')
                    .toEqual(selectFieldModel.control);
                expect(selectFieldComponent.autofocus())
                    .withContext('autofocus')
                    .toEqual(radioGroupModel.autofocus);
                expect(selectFieldComponent.options())
                    .withContext('options')
                    .toEqual(selectFieldModel.options);
            });
        });

        describe('radio group.', () => {
            it('should render radio group with correct models.', () => {
                const radioGroupComponent = getRadioGroupFieldComponent();

                expect(radioGroupComponent.id())
                    .withContext('id')
                    .toEqual(radioGroupModel.id);
                expect(radioGroupComponent.label())
                    .withContext('label')
                    .toEqual(radioGroupModel.label);
                expect(radioGroupComponent.control())
                    .withContext('control')
                    .toEqual(radioGroupModel.control);
                expect(radioGroupComponent.focusable())
                    .withContext('focusable')
                    .toEqual(radioGroupModel.focusable);
                expect(radioGroupComponent.autofocus())
                    .withContext('autofocus')
                    .toEqual(radioGroupModel.autofocus);
                expect(radioGroupComponent.options())
                    .withContext('options')
                    .toEqual(radioGroupModel.options);
            });
        });

        describe('checkbox.', () => {
            it('should render checkbox with correct models.', async () => {
                const checkBoxComponent = getCheckboxComponent();

                expect(checkBoxComponent.id())
                    .withContext('id')
                    .toEqual(checkboxModel.id);
                expect(checkBoxComponent.label())
                    .withContext('label')
                    .toEqual(checkboxModel.label);
                expect(checkBoxComponent.control())
                    .withContext('control')
                    .toEqual(checkboxModel.control);
                expect(checkBoxComponent.focusable())
                    .withContext('focusable')
                    .toEqual(checkboxModel.focusable);
                expect(checkBoxComponent.autofocus())
                    .withContext('autofocus')
                    .toEqual(checkboxModel.autofocus);
            });
        });

        describe('label.', () => {
            it('should render label with correct models.', async () => {
                const element = getLabelElement();

                expect(await element.getAttribute('id'))
                    .withContext('id')
                    .toEqual(labelModel.id);
                expect(await element.textContent.trim())
                    .withContext('text content')
                    .toEqual(labelModel.value);
            });
        });

        describe('divider.', () => {
            it('should render divider.', async () => {
                const divider = getDividerComponent();
                expect(divider).toBeDefined();
                expect(divider).not.toBeNull();
            });
        });

        describe('button.', () => {
            it('should render button with correct models.', async () => {
                const buttonComponent = getButtonComponent();

                expect(buttonComponent.id())
                    .withContext('id')
                    .toEqual(buttonModel.id);
                expect(buttonComponent.icon())
                    .withContext('icon')
                    .toEqual(buttonModel.icon);
                expect(buttonComponent.label())
                    .withContext('label')
                    .toEqual(buttonModel.label);
                expect(buttonComponent.style())
                    .withContext('style')
                    .toEqual(buttonModel.style);
                expect(buttonComponent.focusable())
                    .withContext('focusable')
                    .toEqual(buttonModel.focusable);
                expect(buttonComponent.autofocus())
                    .withContext('autofocus')
                    .toEqual(buttonModel.autofocus);
                expect(buttonComponent.routerLink())
                    .withContext('routerLink')
                    .toEqual(buttonModel.routerLink);
                expect(buttonComponent.queryParams())
                    .withContext('queryParams')
                    .toEqual(buttonModel.queryParams);
                expect(buttonComponent.queryParamsHandling())
                    .withContext('queryParamsHandling')
                    .toEqual(buttonModel.queryParamsHandling);
            });
        });
    });
});

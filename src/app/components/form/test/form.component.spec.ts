import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { NgxMaskDirective } from 'ngx-mask';
import { UserConfigs } from '../../../configs/user/user.configs';
import { AlignItems } from '../../../enums/align-items/align-items.enum';
import { Icon } from '../../../enums/icons/icons.enum';
import { JustifyContent } from '../../../enums/justify-content/justify-content.enum';
import { cepValidator } from '../../../validators/cep/cep.validator';
import { cnpjValidator } from '../../../validators/cnpj/cnpj.validator';
import { cpfValidator } from '../../../validators/cpf/cpf.validator';
import { dateValidator } from '../../../validators/date/date.validator';
import { emailValidator } from '../../../validators/email/email.validator';
import { maxLengthValidator } from '../../../validators/max-length/max-length.validator';
import { maxValidator } from '../../../validators/max/max.validator';
import { minLengthValidator } from '../../../validators/min-length/min-length.validator';
import { minValidator } from '../../../validators/min/min.validator';
import { nameValidator } from '../../../validators/name/name.validator';
import { requiredValidator } from '../../../validators/required/required.validator';
import { strongPasswordValidator } from '../../../validators/strong-password/strong-password.validator';
import { timeValidator } from '../../../validators/time/time.validator';
import { AbstractFormElementModel } from '../components/abstract/abstract-form-element.model';
import { ButtonStyle } from '../components/button/enum/button-style.enum';
import { ButtonModel } from '../components/button/model/button.model';
import { ButtonHarness } from '../components/button/test/button.harness';
import { CheckboxModel } from '../components/checkbox/model/checkbox.model';
import { CheckboxHarness } from '../components/checkbox/test/checkbox.harness';
import { DividerModel } from '../components/divider/model/divider.-form-elementmodel';
import { DividerHarness } from '../components/divider/test/divider.harness';
import { LabelModel } from '../components/label/model/label-form-element.model';
import { LabelHarness } from '../components/label/test/label.harness';
import { RadioGroupModel } from '../components/radio-group/model/radio-buttons-element.model';
import { RadioGroupHarness } from '../components/radio-group/test/radio-group.harness';
import { SelectModel } from '../components/select/model/select-element.model';
import { SelectFieldHarness } from '../components/select/test/test/select-field.harness';
import { NumericFieldModel } from '../components/text/numeric-field/model/numeric-field.model';
import { NumericFieldComponent } from '../components/text/numeric-field/numeric-field.component';
import { NumericFieldHarness } from '../components/text/numeric-field/test/numeric-field.harness';
import { TextAreaModel } from '../components/text/text-area/model/text-area.model';
import { TextAreaFieldHarness } from '../components/text/text-area/test/text-area.harness';
import { TextAreaComponent } from '../components/text/text-area/text-area.component';
import { TextFieldModel } from '../components/text/text-field/model/text-field.model';
import { TextFieldHarness } from '../components/text/text-field/test/text-field.harness';
import { TextFieldComponent } from '../components/text/text-field/text-field.component';
import { FormComponent } from '../form.component';
import { FormFieldWrapperHarness } from './form-field-wrapper.harness';
import { FormComponentHarness } from './form.component.harness';
import { FormHarness } from './form.harness';

describe('FormComponent.', () => {
    let component: FormComponent;
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
    let textFieldModel: TextFieldModel;
    let textAreaModel: TextAreaModel;
    let dividerModel: DividerModel;
    let labelModel: LabelModel;
    let selectFieldModel: SelectModel;
    let radioGroupModel: RadioGroupModel;
    let checkboxModel: CheckboxModel;
    let buttonModel: ButtonModel;
    let formElements: AbstractFormElementModel[];

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
        }).compileComponents();

        fixture = TestBed.createComponent(FormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        numericFieldModel = new NumericFieldModel({
            id: 'amout',
            label: 'Amount',
            control: form.controls.amount,
            focusable: true,
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
        textFieldModel = new TextFieldModel({
            id: 'name',
            mask: undefined,
            label: 'Nome',
            control: form.controls.name,
            focusable: true,
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
            maxLength: 200,
            control: form.controls.description,

            colSize: 12,
            onBlur: () => console.log('On text area blur'),
        });
        dividerModel = new DividerModel({
            id: 'test-divider',
            colSize: 12,
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
            colSize: 12,
        });
        checkboxModel = new CheckboxModel({
            id: 'accept-terms',
            label: 'Aceito os termos',
            control: form.controls.acceptTerms,
            colSize: 4,
        });
        buttonModel = new ButtonModel({
            id: 'flat-button',
            icon: Icon.checked,
            label: 'Botão plano',
            style: ButtonStyle.text,
            colSize: 2,
            colOffset: 1,
        });
        formElements = [
            numericFieldModel,
            textFieldModel,
            textAreaModel,
            dividerModel,
            labelModel,
            selectFieldModel,
            radioGroupModel,
            checkboxModel,
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
        expect(component).toBeTruthy();
    });

    it('should render an empty form.', async () => {
        fixture.detectChanges();

        // host contains one form

        expect(await harness.getHostChildrenCount())
            .withContext('host children count')
            .toEqual(1);
        expect(await harness.countForms())
            .withContext('form count')
            .toEqual(1);
        const hostChildren = await harness.getHostChildrenElements();
        expect(await hostChildren[0].getProperty('tagName'))
            .withContext('host child is a form')
            .toEqual('FORM');

        const formHarness = await harness.getFormHarness();

        // form classes
        expect(await formHarness.hasSingleAlignItemClass())
            .withContext('has single align-item class')
            .toBeTrue();
        expect(await formHarness.hasSingleJustifyuContentClass())
            .withContext('has single justify-content class')
            .toBeTrue();
        expect(await formHarness.getJustifyContentClasses())
            .withContext('justify content')
            .toEqual(['justify-content-initial']);
        expect(await formHarness.hasSingleAlignItemClass())
            .withContext('has single align-items class')
            .toBeTrue();
        expect(await formHarness.getAlignItemClasses())
            .withContext('align items')
            .toEqual(['align-items-initial']);

        // form contains no children

        const formChildren = await harness.getFormChildrenElements();
        expect(formChildren.length).withContext('form child count').toEqual(0);
    });

    describe('form with multiple elements.', () => {
        let formHarness: FormHarness;
        let wrapperHarnessess: FormFieldWrapperHarness[];

        beforeEach(async () => {
            component.elements.set(formElements);
            component.justifyContent.set(JustifyContent.center);
            component.alignItems.set(AlignItems.flex_end);
            component.elements.set(formElements);
            fixture.detectChanges();
            formHarness = await harness.getFormHarness();
            wrapperHarnessess =
                await formHarness.getFormFieldWrapperHarnesses();
        });

        it('should render an form with fields.', async () => {
            // host contains one form

            expect(await harness.getHostChildrenCount())
                .withContext('host children count')
                .toEqual(1);
            expect(await harness.countForms())
                .withContext('form count')
                .toEqual(1);
            const hostChildren = await harness.getHostChildrenElements();
            expect(await hostChildren[0].getProperty('tagName'))
                .withContext('host child is a form')
                .toEqual('FORM');

            const formHarness = await harness.getFormHarness();

            // form classes

            expect(await formHarness.hasSingleAlignItemClass())
                .withContext('has single align-item class')
                .toBeTrue();
            expect(await formHarness.hasSingleJustifyuContentClass())
                .withContext('has single justify-content class')
                .toBeTrue();
            expect(await formHarness.getJustifyContentClasses())
                .withContext('justify content')
                .toEqual(['justify-content-center']);
            expect(await formHarness.hasSingleAlignItemClass())
                .withContext('has single align-items class')
                .toBeTrue();
            expect(await formHarness.getAlignItemClasses())
                .withContext('align items')
                .toEqual(['align-items-flex-end']);

            // form contains children wrappers

            expect(await formHarness.countChildren())
                .withContext('form child count')
                .toEqual(formElements.length);

            expect(await formHarness.countFieldFormWrappers())
                .withContext('form field wrapper count')
                .toEqual(formElements.length);

            const formChildrenElements = await formHarness.getChildren();
            for (let i = 0; i < formChildrenElements.length; i++) {
                expect(await formChildrenElements[i].getProperty('tagName'))
                    .withContext('form field wrapper is div')
                    .toEqual('DIV');
            }

            const wrapperHarnesses =
                await formHarness.getFormFieldWrapperHarnesses();
            expect(wrapperHarnesses)
                .withContext('wrapper count')
                .toHaveSize(formElements.length);
        });

        describe('numeric field.', () => {
            it('should render form with numeric field.', async () => {
                const wrapperHarness = wrapperHarnessess[0];
                const wrapperHost = await wrapperHarness.host();
                expect(await wrapperHost.getProperty('tagName'))
                    .withContext('tag')
                    .toEqual('DIV');
                expect(await wrapperHarness.getColSizesClasses())
                    .withContext('numeric field col size classes')
                    .toEqual(
                        (numericFieldModel.colSize ?? false)
                            ? [`col-${numericFieldModel.colSize}`]
                            : [],
                    );
                expect(await wrapperHarness.getColOffsetClasses())
                    .withContext('numeric field col offset classes')
                    .toEqual(
                        (numericFieldModel.colOffset ?? false)
                            ? [`offset-${numericFieldModel.colOffset}`]
                            : [],
                    );
                expect(await wrapperHarness.getChildrenCount())
                    .withContext('numeric field wrapper child count')
                    .toEqual(1);
                const wrapperChildrenEl =
                    await wrapperHarness.getChildElement();
                expect(await wrapperChildrenEl.getProperty('tagName'))
                    .withContext('tag')
                    .toEqual('APP-NUMERIC-FIELD');
                const numericFieldHarness =
                    (await wrapperHarness.getChildHarness()) as NumericFieldHarness;

                expect(await numericFieldHarness.getInputValue())
                    .withContext('value')
                    .toEqual('-3.456,0');
                expect(await numericFieldHarness.getLabelText())
                    .withContext('label')
                    .toEqual(numericFieldModel.label ?? null);
            });

            it('should render numeric field with correct models.', async () => {
                const component: NumericFieldComponent =
                    fixture.debugElement.query(
                        By.css('APP-NUMERIC-FIELD'),
                    ).componentInstance;

                expect(component.id())
                    .withContext('id')
                    .toEqual(numericFieldModel.id);
                expect(component.label())
                    .withContext('label')
                    .toEqual(numericFieldModel.label);
                expect(component.placeholder())
                    .withContext('placeholder')
                    .toEqual(numericFieldModel.placeholder);
                expect(component.readOnly())
                    .withContext('readOnly')
                    .toEqual(numericFieldModel.readOnly);
                expect(component.control())
                    .withContext('control')
                    .toEqual(numericFieldModel.control);
                expect(component.focusable())
                    .withContext('focusable')
                    .toEqual(numericFieldModel.focusable);
                expect(component.minLength())
                    .withContext('minLength')
                    .toEqual(numericFieldModel.minLength);
                expect(component.maxLength())
                    .withContext('maxLength')
                    .toEqual(numericFieldModel.maxLength);
                expect(component.prefix())
                    .withContext('prefix')
                    .toEqual(numericFieldModel.prefix);
                expect(component.suffix())
                    .withContext('suffix')
                    .toEqual(numericFieldModel.suffix);
                expect(component.min())
                    .withContext('min')
                    .toEqual(numericFieldModel.min);
                expect(component.max())
                    .withContext('max')
                    .toEqual(numericFieldModel.max);
                expect(component.step())
                    .withContext('step')
                    .toEqual(numericFieldModel.step);
                expect(component.leadZero())
                    .withContext('leadZero')
                    .toEqual(numericFieldModel.leadZero);
                expect(component.allowNegativeNumbers())
                    .withContext('allowNegativeNumbers')
                    .toEqual(numericFieldModel.allowNegativeNumbers);
                expect(component.decimalPlaces())
                    .withContext('decimalPlaces')
                    .toEqual(numericFieldModel.decimalPlaces);
            });

            it('numeric field should delegate blur event to to the component.', async () => {
                const component: NumericFieldComponent =
                    fixture.debugElement.query(
                        By.css('APP-NUMERIC-FIELD'),
                    ).componentInstance;

                spyOn(component.onBlur, 'emit');
                const input = fixture.debugElement.query(
                    By.css('APP-NUMERIC-FIELD input'),
                ).nativeElement;
                input.dispatchEvent(new Event('blur'));

                expect(component.onBlur.emit)
                    .withContext('onBlur event')
                    .toHaveBeenCalledOnceWith();
            });
        });

        describe('text field.', () => {
            it('should render form with text field,', async () => {
                const wrapperHarness = wrapperHarnessess[1];
                const wrapperHost = await wrapperHarness.host();
                expect(await wrapperHost.getProperty('tagName'))
                    .withContext('')
                    .toEqual('DIV');
                expect(await wrapperHarness.getColSizesClasses())
                    .withContext('text field col size classes')
                    .toEqual(
                        (textFieldModel.colSize ?? false)
                            ? [`col-${textFieldModel.colSize}`]
                            : [],
                    );
                expect(await wrapperHarness.getColOffsetClasses())
                    .withContext('text field col offset classes')
                    .toEqual(
                        (textFieldModel.colOffset ?? false)
                            ? [`offset-${textFieldModel.colOffset}`]
                            : [],
                    );
                expect(await wrapperHarness.getChildrenCount())
                    .withContext('text field wrapper child count')
                    .toEqual(1);
                const wrapperChildrenEl =
                    await wrapperHarness.getChildElement();
                expect(await wrapperChildrenEl.getProperty('tagName'))
                    .withContext('tag')
                    .toEqual('APP-TEXT-FIELD');
                const textFieldHarness =
                    (await wrapperHarness.getChildHarness()) as TextFieldHarness;

                expect(await textFieldHarness.getInputValue())
                    .withContext('value')
                    .toEqual(textFieldModel.control.value);
                expect(await textFieldHarness.getLabelText())
                    .withContext('label')
                    .toEqual(textFieldModel.label ?? null);
            });

            it('should render text field with correct models.', async () => {
                const component: TextFieldComponent =
                    fixture.debugElement.query(
                        By.css('APP-TEXT-FIELD'),
                    ).componentInstance;

                expect(component.id())
                    .withContext('id')
                    .toEqual(textFieldModel.id);
                expect(component.mask())
                    .withContext('mask')
                    .toEqual(textFieldModel.mask);
                expect(component.label())
                    .withContext('label')
                    .toEqual(textFieldModel.label);
                expect(component.placeholder())
                    .withContext('placeholder')
                    .toEqual(textFieldModel.placeholder);
                expect(component.control())
                    .withContext('control')
                    .toEqual(textFieldModel.control);
                expect(component.focusable())
                    .withContext('focusable')
                    .toEqual(textFieldModel.focusable);
                expect(component.readOnly())
                    .withContext('readOnly')
                    .toEqual(numericFieldModel.readOnly);
                expect(component.format())
                    .withContext('format')
                    .toEqual(textFieldModel.format);
                expect(component.minLength())
                    .withContext('minLength')
                    .toEqual(textFieldModel.minLength);
                expect(component.maxLength())
                    .withContext('maxLength')
                    .toEqual(textFieldModel.maxLength);
                expect(component.prefix())
                    .withContext('prefix')
                    .toEqual(textFieldModel.prefix);
                expect(component.suffix())
                    .withContext('suffix')
                    .toEqual(textFieldModel.suffix);
            });

            it('text field should delegate blur event to to the component.', async () => {
                const component: TextFieldComponent =
                    fixture.debugElement.query(
                        By.css('APP-TEXT-FIELD'),
                    ).componentInstance;

                spyOn(component.onBlur, 'emit');
                const input = fixture.debugElement.query(
                    By.css('APP-TEXT-FIELD input'),
                ).nativeElement;
                input.dispatchEvent(new Event('blur'));

                expect(component.onBlur.emit)
                    .withContext('onBlur event')
                    .toHaveBeenCalledOnceWith();
            });
        });

        describe('text area.', () => {
            it('should render form with text area.', async () => {
                const wrapperHarness = wrapperHarnessess[2];

                const wrapperHost = await wrapperHarness.host();
                expect(await wrapperHost.getProperty('tagName'))
                    .withContext('tag')
                    .toEqual('DIV');
                expect(await wrapperHarness.getColSizesClasses())
                    .withContext('textArea col size classes')
                    .toEqual(
                        (textAreaModel.colSize ?? false)
                            ? [`col-${textAreaModel.colSize}`]
                            : [],
                    );
                expect(await wrapperHarness.getColOffsetClasses())
                    .withContext('text area col offset classes')
                    .toEqual(
                        (textAreaModel.colOffset ?? false)
                            ? [`offset-${textAreaModel.colOffset}`]
                            : [],
                    );
                expect(await wrapperHarness.getChildrenCount())
                    .withContext('text area wrapper child count')
                    .toEqual(1);
                const childEl = await wrapperHarness.getChildElement();
                expect(await childEl.getProperty('tagName'))
                    .withContext('tag')
                    .toEqual('APP-TEXT-AREA-FIELD');
                const textAreaFieldHarness =
                    (await wrapperHarness.getChildHarness()) as TextAreaFieldHarness;
                expect(await textAreaFieldHarness.getTextAreaValue())
                    .withContext('value')
                    .toEqual(textAreaModel.control.value);
                expect(await textAreaFieldHarness.getLabelText())
                    .withContext('label')
                    .toEqual(textAreaModel.label ?? null);
            });

            it('should render text field with correct models.', async () => {
                const component: TextAreaComponent = fixture.debugElement.query(
                    By.css('APP-TEXT-AREA-FIELD'),
                ).componentInstance;

                expect(component.id())
                    .withContext('id')
                    .toEqual(textAreaModel.id);
                expect(component.label())
                    .withContext('label')
                    .toEqual(textAreaModel.label);
                expect(component.placeholder())
                    .withContext('placeholder')
                    .toEqual(textAreaModel.placeholder);
                expect(component.control())
                    .withContext('control')
                    .toEqual(textAreaModel.control);
                expect(component.focusable())
                    .withContext('focusable')
                    .toEqual(textAreaModel.focusable);
                expect(component.minLength())
                    .withContext('minLength')
                    .toEqual(textAreaModel.minLength);
                expect(component.maxLength())
                    .withContext('maxLength')
                    .toEqual(textAreaModel.maxLength);
                expect(component.autosizeMinRows())
                    .withContext('autosizeMinRows')
                    .toEqual(textAreaModel.autosizeMaxRows);
            });

            it('text field should delegate blur event to to the component.', async () => {
                const component: TextAreaComponent = fixture.debugElement.query(
                    By.css('APP-TEXT-AREA-FIELD'),
                ).componentInstance;

                spyOn(component.onBlur, 'emit');
                const input = fixture.debugElement.query(
                    By.css('APP-TEXT-AREA-FIELD textarea'),
                ).nativeElement;
                input.dispatchEvent(new Event('blur'));

                expect(component.onBlur.emit)
                    .withContext('onBlur event')
                    .toHaveBeenCalledOnceWith();
            });
        });

        describe('select.', () => {
            it('should render form with select.', async () => {
                const wrapperHarness = wrapperHarnessess[5];
                const wrapperHost = await wrapperHarness.host();
                expect(await wrapperHost.getProperty('tagName'))
                    .withContext('tag')
                    .toEqual('DIV');
                expect(await wrapperHarness.getColSizesClasses())
                    .withContext('select field col size classes')
                    .toEqual(
                        (selectFieldModel.colSize ?? false)
                            ? [`col-${selectFieldModel.colSize}`]
                            : [],
                    );
                expect(await wrapperHarness.getColOffsetClasses())
                    .withContext('select field col offset classes')
                    .toEqual(
                        (selectFieldModel.colOffset ?? false)
                            ? [`offset-${selectFieldModel.colOffset}`]
                            : [],
                    );
                expect(await wrapperHarness.getChildrenCount())
                    .withContext('select wrapper child count')
                    .toEqual(1);
                const childrenEl = await wrapperHarness.getChildElement();
                expect(await childrenEl.getProperty('tagName'))
                    .withContext('tag')
                    .toEqual('APP-SELECT-FIELD');
                const selectFieldHarness =
                    (await wrapperHarness.getChildHarness()) as SelectFieldHarness;
                const matSelect = await selectFieldHarness.getSelectHarness();
                await matSelect.open();
                fixture.detectChanges();
                const optionHarnesses =
                    await selectFieldHarness.getOptionsHarnesses();
                expect(optionHarnesses).toHaveSize(2);

                expect(await optionHarnesses[0].isSelected()).toBeTrue();
                expect(await optionHarnesses[1].isSelected()).toBeFalse();

                expect(await optionHarnesses[0].getText()).toEqual(
                    selectFieldModel.options[0].label,
                );
                expect(await optionHarnesses[1].getText()).toEqual(
                    selectFieldModel.options[1].label,
                );
            });
        });

        describe('radio group.', () => {
            it('should render form with radio group.', async () => {
                const wrapperHarness = wrapperHarnessess[6];
                const wrapperHost = await wrapperHarness.host();
                expect(await wrapperHost.getProperty('tagName'))
                    .withContext('')
                    .toEqual('DIV');
                expect(await wrapperHarness.getColSizesClasses())
                    .withContext('radio group col size classes')
                    .toEqual(
                        (radioGroupModel.colSize ?? false)
                            ? [`col-${radioGroupModel.colSize}`]
                            : [],
                    );
                expect(await wrapperHarness.getColOffsetClasses())
                    .withContext('radio group col offset classes')
                    .toEqual(
                        (radioGroupModel.colOffset ?? false)
                            ? [`offset-${radioGroupModel.colOffset}`]
                            : [],
                    );
                expect(await wrapperHarness.getChildrenCount())
                    .withContext('radio group wrapper child count')
                    .toEqual(1);
                const childrenEl = await wrapperHarness.getChildElement();
                expect(await childrenEl.getProperty('tagName'))
                    .withContext('tag')
                    .toEqual('APP-RADIO-GROUP');
                const radioGroupHarness =
                    (await wrapperHarness.getChildHarness()) as RadioGroupHarness;
                expect(await radioGroupHarness.getCheckedValue()).toEqual(
                    radioGroupModel.control.value,
                );
            });
        });

        describe('checkbox.', () => {
            it('should render form with checkbox.', async () => {
                const wrapperHarness = wrapperHarnessess[7];
                const wrapperHost = await wrapperHarness.host();
                expect(await wrapperHost.getProperty('tagName'))
                    .withContext('tag')
                    .toEqual('DIV');
                expect(await wrapperHarness.getColSizesClasses())
                    .withContext('checkbox col size classes')
                    .toEqual(
                        (checkboxModel.colSize ?? false)
                            ? [`col-${checkboxModel.colSize}`]
                            : [],
                    );
                expect(await wrapperHarness.getColOffsetClasses())
                    .withContext('checkbox col offset classes')
                    .toEqual(
                        (checkboxModel.colOffset ?? false)
                            ? [`offset-${checkboxModel.colOffset}`]
                            : [],
                    );
                expect(await wrapperHarness.getChildrenCount())
                    .withContext('checkbox wrapper child count')
                    .toEqual(1);
                const childrenEl = await wrapperHarness.getChildElement();
                expect(await childrenEl.getProperty('tagName'))
                    .withContext('tag')
                    .toEqual('APP-CHECKBOX');
                // TODO:?
                const checkboxHarness =
                    (await wrapperHarness.getChildHarness()) as CheckboxHarness;
            });
        });

        describe('label.', () => {
            it('should render form with label.', async () => {
                const wrapperHarness = wrapperHarnessess[4];

                const wrapperHost = await wrapperHarness.host();
                expect(await wrapperHost.getProperty('tagName'))
                    .withContext('tag')
                    .toEqual('DIV');
                expect(await wrapperHarness.getColSizesClasses())
                    .withContext('label col size classes')
                    .toEqual(
                        (labelModel.colSize ?? false)
                            ? [`col-${labelModel.colSize}`]
                            : [],
                    );
                expect(await wrapperHarness.getColOffsetClasses())
                    .withContext('label col offset classes')
                    .toEqual(
                        (labelModel.colOffset ?? false)
                            ? [`offset-${labelModel.colOffset}`]
                            : [],
                    );
                expect(await wrapperHarness.getChildrenCount())
                    .withContext('label wrapper child count')
                    .toEqual(1);
                const childrenEl = await wrapperHarness.getChildElement();
                expect(await childrenEl.getProperty('tagName'))
                    .withContext('tag')
                    .toEqual('MAT-LABEL');
                const labelHarness =
                    (await wrapperHarness.getChildHarness()) as LabelHarness;
                expect(await labelHarness.getText()).toEqual(labelModel.value);
            });
        });

        describe('divider.', () => {
            it('should render form divider.', async () => {
                const wrapperHarness = wrapperHarnessess[3];

                expect(await wrapperHarness.getColSizesClasses())
                    .withContext('divider col size classes')
                    .toEqual(
                        (dividerModel.colSize ?? false)
                            ? [`col-${dividerModel.colSize}`]
                            : [],
                    );
                expect(await wrapperHarness.getColOffsetClasses())
                    .withContext('divider col offset classes')
                    .toEqual(
                        (dividerModel.colOffset ?? false)
                            ? [`offset-${dividerModel.colOffset}`]
                            : [],
                    );
                expect(await wrapperHarness.getChildrenCount())
                    .withContext('divider wrapper child count')
                    .toEqual(1);
                const dividerEl = await wrapperHarness.getChildElement();
                expect(await dividerEl.getProperty('tagName'))
                    .withContext('tag')
                    .toEqual('MAT-DIVIDER');
                const dividerHarness =
                    (await wrapperHarness.getChildHarness()) as DividerHarness; // TODO:

                const wrapperHost = await wrapperHarness.host();
                expect(await wrapperHost.getProperty('tagName'))
                    .withContext('tag')
                    .toEqual('DIV');
            });
        });

        describe('button.', () => {
            it('should render form with button.', async () => {
                const wrapperHarness = wrapperHarnessess[8];
                const wrapperHost = await wrapperHarness.host();
                expect(await wrapperHost.getProperty('tagName'))
                    .withContext('tag')
                    .toEqual('DIV');
                expect(await wrapperHarness.getColSizesClasses())
                    .withContext('button col size classes')
                    .toEqual(
                        (buttonModel.colSize ?? false)
                            ? [`col-${buttonModel.colSize}`]
                            : [],
                    );
                expect(await wrapperHarness.getColOffsetClasses())
                    .withContext('button col offset classes')
                    .toEqual(
                        (buttonModel.colOffset ?? false)
                            ? [`offset-${buttonModel.colOffset}`]
                            : [],
                    );
                expect(await wrapperHarness.getChildrenCount())
                    .withContext('button wrapper child count')
                    .toEqual(1);
                const childrenEl = await wrapperHarness.getChildElement();
                expect(await childrenEl.getProperty('tagName'))
                    .withContext('tag')
                    .toEqual('APP-BUTTON');
                const buttonHarness =
                    (await wrapperHarness.getChildHarness()) as ButtonHarness;

                expect(await buttonHarness.getInnerButtonLabelText())
                    .withContext('label')
                    .toEqual(buttonModel.label);
            });
        });
    });
});

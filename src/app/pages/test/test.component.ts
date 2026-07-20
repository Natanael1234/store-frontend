import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AbstractFormElementModel } from '../../components/form/components/abstract/abstract-form-element.model';
import { ButtonStyle } from '../../components/form/components/button/enum/style/button-style.enum';
import { ButtonModel } from '../../components/form/components/button/model/button.model';
import { CheckboxModel } from '../../components/form/components/checkbox/model/checkbox.model';
import { DividerModel } from '../../components/form/components/divider/model/divider.-form-elementmodel';
import { LabelModel } from '../../components/form/components/label/model/label-form-element.model';
import { RadioGroupModel } from '../../components/form/components/radio-group/model/radio-buttons-element.model';
import { SelectModel } from '../../components/form/components/select/model/select-element.model';
import { NumericFieldModel } from '../../components/form/components/text/numeric-field/model/numeric-field.model';
import { TextAreaModel } from '../../components/form/components/text/text-area/model/text-area.model';
import { TextFieldModel } from '../../components/form/components/text/text-field/model/text-field.model';
import { FormElementType } from '../../components/form/enums/form-element-type/form-element-type.enum';
import { TextFormat } from '../../components/form/enums/text-format/text-format.enum';
import { FormComponent } from '../../components/form/form.component';
import { SpacerModel } from '../../components/form/spacer/model/spacer.model';
import { UserConfigs } from '../../configs/user/user.configs';
import { Icon } from '../../enums/icons/icons.enum';
import { ResponsityService } from '../../services/responsivity/responsivity.service';
import { cepValidator } from '../../validators/cep/cep.validator';
import { cnpjValidator } from '../../validators/cnpj/cnpj.validator';
import { cpfValidator } from '../../validators/cpf/cpf.validator';
import { dateValidator } from '../../validators/date/date.validator';
import { emailValidator } from '../../validators/email/email.validator';
import { maxValidator } from '../../validators/max/max.validator';
import { minValidator } from '../../validators/min/min.validator';
import { nameValidator } from '../../validators/name/name.validator';
import { requiredTrueValidator } from '../../validators/required-true/required-true.validator';
import { requiredValidator } from '../../validators/required/required.validator';
import { strongPasswordValidator } from '../../validators/strong-password/strong-password.validator';
import { timeValidator } from '../../validators/time/time.validator';

@Component({
    selector: 'app-test',
    imports: [FormComponent],
    templateUrl: './test.component.html',
    styleUrl: './test.component.scss',
})
export class TestComponent {
    public formElements: AbstractFormElementModel[] = [];

    protected responsivity: ResponsityService = inject(ResponsityService);
    private resizeSubscription!: Subscription;

    form = new FormGroup(
        {
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
                { validators: [strongPasswordValidator()] },
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
                { value: undefined, disabled: false },
                { validators: [Validators.required] },
            ),
            gender: new FormControl(
                { value: null, disabled: false },
                { validators: [requiredValidator()] },
            ),
            acceptTerms: new FormControl(
                { value: false, disabled: false },
                { validators: [requiredTrueValidator()] },
            ),
        },
        { updateOn: 'blur' },
    );

    constructor() {}

    public ngAfterViewInit() {
        this.resizeSubscription = this.responsivity.mobile.subscribe(
            (mobile) => {
                this.setFormItems(mobile);
            },
        );
    }

    setFormItems(mobile: boolean) {
        this.formElements = [
            new TextFieldModel({
                id: 'name',
                mask: undefined,
                label: 'Nome',
                control: this.form.controls.name,
                autofocus: true,
                minLength: 3,
                maxLength: 7,
                onBlur: () => console.log('On text input blur'),
                colSize: mobile ? 12 : 6,
            }),
            ...(mobile ? [] : [new SpacerModel({ colSize: 2 })]),
            new TextFieldModel({
                id: 'email',
                format: TextFormat.email,
                label: 'Email',
                placeholder: 'Insira um email',
                maxLength: 200,
                control: this.form.controls.email,
                colSize: mobile ? 12 : 4,
            }),
            new TextFieldModel({
                id: 'password',
                format: TextFormat.password,
                label: 'Senha',
                placeholder: 'Insira a senha',
                maxLength: 12,
                colSize: mobile ? 12 : 12,
                control: this.form.controls.password,
            }),
            new TextFieldModel({
                id: 'phone',
                format: TextFormat.phone,
                label: 'Fone',
                placeholder: 'Insira seu telefone',
                maxLength: 14,
                focusable: false,
                control: this.form.controls.phone,
                colSize: mobile ? 12 : 4,
            }),
            new TextFieldModel({
                id: 'zip-code',
                format: TextFormat.zipCode,
                label: 'CEP',
                control: this.form.controls.zipCode,
                colSize: mobile ? 12 : 4,
            }),
            ...(mobile ? [] : [new SpacerModel({ colSize: 3 })]),
            new TextFieldModel({
                id: 'date',
                format: TextFormat.date,
                label: 'Data',
                control: this.form.controls.date,
                colSize: mobile ? 12 : 3,
            }),
            ...(mobile ? [] : [new SpacerModel({ colSize: 12 })]),
            new TextFieldModel({
                id: 'time',
                format: TextFormat.time,
                label: 'Horário',
                control: this.form.controls.time,
                colSize: mobile ? 12 : 3,
            }),
            new TextFieldModel({
                id: 'cnpj',
                format: TextFormat.cnpj,
                label: 'CNPJ',
                control: this.form.controls.cnpj,
                colSize: mobile ? 12 : 5,
            }),
            new TextFieldModel({
                id: 'cpf',
                format: TextFormat.cpf,
                label: 'CPF',
                control: this.form.controls.cpf,
                colSize: mobile ? 12 : 6,
            }),
            new NumericFieldModel({
                id: 'amount',
                prefix: 'R$ ',
                label: 'Quantidade',
                allowNegativeNumbers: true,
                control: this.form.controls.amount,
                min: 3,
                max: 300,
                step: 5,
                colSize: mobile ? 12 : 12,
            }),
            new NumericFieldModel({
                id: 'price',
                suffix: ' %',
                label: 'Preço',
                decimalPlaces: 2,
                allowNegativeNumbers: false,
                leadZero: true,
                control: this.form.controls.price,
                colSize: mobile ? 12 : 12,
            }),
            new TextAreaModel({
                id: 'description',
                label: 'Descrição',
                placeholder: 'Insira uma descrição',
                maxLength: 200,
                control: this.form.controls.description,
                colSize: mobile ? 12 : 12,
                onBlur: () => console.log('On text area blur'),
            }),
            new TextAreaModel({
                id: 'disabled-description',
                label: 'Área de texto desabilitada',
                placeholder: 'Placeholder',
                maxLength: 200,
                colSize: mobile ? 12 : 12,
                autosizeMinRows: 2,
                autosizeMaxRows: 2,
                control: this.form.controls.disabledDescription,
            }),
            new DividerModel({
                id: 'test-divider',
                colSize: mobile ? 12 : 12,
            }),
            new LabelModel({
                id: 'test-label',
                value: 'Outro label',
                colSize: mobile ? 12 : 12,
            }),

            new SelectModel({
                focusable: false,
                id: 'gender',
                label: 'Gênero',
                options: [
                    { label: 'Masculino', value: 'M' },
                    { label: 'Feminino', value: 'F' },
                ],
                control: this.form.controls.gender,
                colSize: mobile ? 12 : 7,
            }),
            new RadioGroupModel({
                id: 'level',
                label: 'Nível',

                options: [
                    { label: 'Begginer', value: 'B' },
                    { label: 'Intermmediate', value: 'I' },
                    { label: 'Advanced', value: 'A' },
                ],
                control: this.form.controls.level,
                colSize: mobile ? 12 : 12,
            }),
            new CheckboxModel({
                id: 'accept-terms',
                label: 'Aceito os termos',
                control: this.form.controls.acceptTerms,
                colSize: 4,
            }),
            new LabelModel({
                id: 'test-label',
                value: 'Test label',
                colSize: mobile ? 12 : 12,
            }),

            new SpacerModel({
                colSize: mobile ? 12 : 1,
            }),

            new ButtonModel({
                id: 'flat-button',
                icon: Icon.checked,
                label: 'Botão plano',
                style: ButtonStyle.text,
                colSize: mobile ? 12 : 2,
            }),
            new ButtonModel({
                id: 'elevated-button',
                type: FormElementType.button,
                icon: Icon.checked,
                label: 'Botão elevado BUTTON',
                style: ButtonStyle.elevated,
                colSize: mobile ? 12 : 2,
            }),
            new ButtonModel({
                id: 'filled-button',
                type: FormElementType.submit,
                icon: Icon.checked,
                label: 'Botão preenchido SUBMIT',
                style: ButtonStyle.filled,
                colSize: mobile ? 12 : 2,
            }),
            new ButtonModel({
                id: 'outlined-button',
                type: FormElementType.reset,
                icon: Icon.checked,
                label: 'Botão contornado RESET',
                style: ButtonStyle.outlined,
                colSize: mobile ? 12 : 2,
            }),
            new ButtonModel({
                id: 'tonal-button',
                type: FormElementType.button,
                icon: Icon.checked,
                label: 'Botão tonal LINKS',
                style: ButtonStyle.tonal,
                colSize: mobile ? 12 : 2,
                routerLink: ['/users'],
                queryParams: { ref: 'testando' },
                queryParamsHandling: 'replace',
            }),
        ];

        this.form.markAllAsTouched();
        this.form.markAllAsDirty();
        this.form.updateValueAndValidity();
    }
}

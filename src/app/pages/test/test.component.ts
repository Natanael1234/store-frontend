import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractFormElementModel } from '../../components/form/components/abstract/abstract-form-element.model';
import { ButtonStyle } from '../../components/form/components/button/enum/button-style.enum';
import { ButtonModel } from '../../components/form/components/button/model/button-form-element.model';
import { CheckboxModel } from '../../components/form/components/checkbox/model/checkbox.model';
import { DividerModel } from '../../components/form/components/divider/model/divider.-form-elementmodel';
import { LabelModel } from '../../components/form/components/label/model/label-form-element.model';
import { RadioGroupModel } from '../../components/form/components/radio-group/model/radio-buttons-element.model';
import { SelectModel } from '../../components/form/components/select/model/select-element.model';
import { TextAreaModel } from '../../components/form/components/text-area/model/text-area.model';
import { TextInputModel } from '../../components/form/components/text-field/model/text-input.model';
import { TextFormat } from '../../components/form/enums/text-format/text-format.enum';
import { FormComponent } from '../../components/form/form.component';
import { UserConfigs } from '../../configs/user/user.configs';
import { EmailConstants } from '../../constants/email/email.constants';
import { Icon } from '../../enums/icons/icons.enum';
import { TextMessage } from '../../messages/text/text.messages';
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

const _NameMessage = new TextMessage({
    minLength: UserConfigs.NAME_MIN_LENGTH,
    maxLength: UserConfigs.NAME_MAX_LENGTH,
});

const _EmailMessage = new TextMessage({
    maxLength: EmailConstants.MAX_LENGTH,
});

function getNameError(control: FormControl) {
    if (control.hasError('null')) {
        return _NameMessage.NULL;
    } else if (control.hasError('required')) {
        return _NameMessage.REQUIRED;
    } else if (control.hasError('name')) {
        return _NameMessage.INVALID;
    } else if (control.hasError('minlength')) {
        return _NameMessage.MIN_LEN;
    } else if (control.hasError('maxlength')) {
        return _NameMessage.MAX_LEN;
    } else {
        return undefined;
    }
}

function getEmailError(control: FormControl) {
    if (control.hasError('null')) {
        return _EmailMessage.NULL;
    } else if (control.hasError('required')) {
        return _EmailMessage.REQUIRED;
    } else if (control.hasError('email')) {
        return _EmailMessage.INVALID;
    } else if (control.hasError('minlength')) {
        return _EmailMessage.MIN_LEN;
    } else if (control.hasError('maxlength')) {
        return _EmailMessage.MAX_LEN;
    } else {
        return undefined;
    }
}

function getMandatoryError(control: FormControl) {
    if (control.hasError('null')) {
        return _EmailMessage.NULL;
    } else if (control.hasError('required')) {
        return _EmailMessage.REQUIRED;
    } else {
        return undefined;
    }
}

@Component({
    selector: 'app-test',
    imports: [FormComponent],
    templateUrl: './test.component.html',
    styleUrl: './test.component.scss',
})
export class TestComponent {
    public formElements: AbstractFormElementModel[];

    form = new FormGroup(
        {
            name: new FormControl(
                { value: 'x', disabled: false },
                {
                    validators: [
                        nameValidator({
                            required: true,
                            minlength: UserConfigs.NAME_MIN_LENGTH,
                            maxlength: UserConfigs.NAME_MAX_LENGTH,
                        }),
                    ],
                },
            ),
            email: new FormControl(
                { value: 'user@email.com', disabled: false },
                { validators: [requiredValidator(), emailValidator()] },
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
                { value: undefined, disabled: false },
                { validators: [Validators.required] },
            ),
            gender: new FormControl(
                { value: null, disabled: false },
                { validators: [requiredValidator()] },
            ),
            acceptTerms: new FormControl(
                { value: false, disabled: false },
                { validators: [requiredValidator()] },
            ),
        },
        { updateOn: 'blur' },
    );

    constructor() {
        this.formElements = [
            new TextInputModel({
                id: 'name',
                mask: undefined,
                label: 'Nome',
                control: this.form.controls.name,
                minLength: 3,
                maxLength: 7,
                onBlur: () => console.log('On text input blur'),
                colSize: 6,
            }),
            new TextInputModel({
                id: 'email',
                format: TextFormat.email,
                label: 'Email',
                placeholder: 'Insira um email',
                maxLength: 200,
                control: this.form.controls.email,
                colSize: 12,
            }),
            new TextInputModel({
                id: 'password',
                format: TextFormat.password,
                label: 'Senha',
                placeholder: 'Insira a senha',
                maxLength: 12,
                colSize: 12,
                control: this.form.controls.password,
            }),
            new TextInputModel({
                id: 'phone',
                format: TextFormat.phone,
                label: 'Fone',
                placeholder: 'Insira seu telefone',
                maxLength: 14,
                focusable: false,
                control: this.form.controls.phone,
                colSize: 4,
            }),
            new TextInputModel({
                id: 'zip-code',
                format: TextFormat.zipCode,
                label: 'CEP',
                control: this.form.controls.zipCode,
                colSize: 4,
                breakLine: true,
            }),
            new TextInputModel({
                id: 'date',
                format: TextFormat.date,
                label: 'Data',
                control: this.form.controls.date,
                colSize: 3,
            }),
            new TextInputModel({
                id: 'time',
                format: TextFormat.time,
                label: 'Horário',
                control: this.form.controls.time,
                colSize: 3,
                breakLine: true,
            }),
            new TextInputModel({
                id: 'cnpj',
                format: TextFormat.cnpj,
                label: 'CNPJ',
                control: this.form.controls.cnpj,
                colSize: 5,
            }),
            new TextInputModel({
                id: 'cpf',
                format: TextFormat.cpf,
                label: 'CPF',
                control: this.form.controls.cpf,
                colSize: 6,
            }),
            new TextInputModel({
                id: 'amount',
                format: TextFormat.number,
                prefix: 'R$ ',
                label: 'Quantidade',
                allowNegativeNumbers: true,
                control: this.form.controls.amount,
                // TODO: implement
                min: 3,
                max: 300,
                step: 5,
                colSize: 12,
            }),
            new TextInputModel({
                id: 'price',
                format: TextFormat.number,
                suffix: ' %',
                label: 'Preço',
                decimalPlaces: 2,
                allowNegativeNumbers: false,
                // TODO: implement
                control: this.form.controls.price,

                colSize: 12,
            }),
            new TextAreaModel({
                id: 'description',
                label: 'Descrição',
                placeholder: 'Insira uma descrição',
                maxLength: 200,
                control: this.form.controls.description,

                colSize: 12,
                onBlur: () => console.log('On text area blur'),
            }),
            new TextAreaModel({
                id: 'disabled-description',
                label: 'Área de texto desabilitada',
                placeholder: 'Placeholder',
                maxLength: 200,
                colSize: 12,
                autosizeMinRows: 2,
                autosizeMaxRows: 2,
                control: this.form.controls.disabledDescription,
            }),
            new DividerModel({
                id: 'test-divider',
                colSize: 12,
            }),
            new LabelModel({
                id: 'test-label',
                value: 'Outro label',
                colSize: 12,
            }),

            new SelectModel({
                id: 'gender',
                label: 'Gênero',
                options: [
                    { label: 'Masculino', value: 'M' },
                    { label: 'Feminino', value: 'F' },
                ],
                control: this.form.controls.gender,
                colSize: 7,
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
                colSize: 12,
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
                colSize: 12,
            }),

            new ButtonModel({
                id: 'flat-button',
                icon: Icon.checked,
                label: 'Botão plano',
                style: ButtonStyle.text,
                colSize: 2,
                colOffset: 1,
            }),
            new ButtonModel({
                id: 'elevated-button',
                icon: Icon.checked,
                label: 'Botão elevado',
                style: ButtonStyle.elevated,
                colSize: 2,
            }),
            new ButtonModel({
                id: 'filled-button',
                icon: Icon.checked,
                label: 'Botão preenchido',
                style: ButtonStyle.filled,
                colSize: 2,
            }),
            new ButtonModel({
                id: 'outlined-button',
                icon: Icon.checked,
                label: 'Botão contornado',
                style: ButtonStyle.outlined,
                colSize: 2,
            }),
            new ButtonModel({
                id: 'tonal-button',
                icon: Icon.checked,
                label: 'Botão tonal',
                style: ButtonStyle.tonal,
                colSize: 2,
            }),
        ];

        this.form.markAllAsTouched();
        this.form.markAllAsDirty();
        this.form.updateValueAndValidity();
    }
}

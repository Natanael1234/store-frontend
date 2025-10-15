import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { FormElementType } from '../../components/dynamic-form/enums/form-element-type/form-element-type.enum';
import { TextInputFormat } from '../../components/dynamic-form/enums/input-mask-type/text-input-format.enum';
import { AbstractFormElement } from '../../components/dynamic-form/model/controls/abstract-form-element.model';
import { CheckboxElement } from '../../components/dynamic-form/model/controls/checkbox.model';
import { Radios } from '../../components/dynamic-form/model/controls/radio-buttons-element.model';
import { Select } from '../../components/dynamic-form/model/controls/select-element.model';
import { TextArea } from '../../components/dynamic-form/model/controls/text-area.model';
import { TextInput } from '../../components/dynamic-form/model/controls/text-input.model';
import {
    ButtonFormElement,
    ButtonStyle,
} from '../../components/dynamic-form/model/others/button.model';
import { DividerFormElement } from '../../components/dynamic-form/model/others/divider.model';
import { LabelFormElement } from '../../components/dynamic-form/model/others/label.model';
import { UserConfigs } from '../../configs/user/user.configs';
import { EmailConstants } from '../../constants/email/email.constants';
import { TextMessage } from '../../messages/text/text.messages';
import { emailValidator } from '../../validators/email/email.validator';
import { nameValidator } from '../../validators/name/name.validator';
import { strongPasswordValidator } from '../../validators/strong-password/strong-password.validator';

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
    imports: [DynamicFormComponent],
    templateUrl: './test.component.html',
    styleUrl: './test.component.scss',
})
export class TestComponent {
    public formElements: AbstractFormElement[];

    form = new FormGroup({
        name: new FormControl(
            { value: '', disabled: false },
            { validators: this.nameValidators },
        ),
        email: new FormControl(
            { value: 'user@email.com', disabled: false },
            { validators: this.emailValidators },
        ),
        password: new FormControl(
            { value: 'Senha123$', disabled: false },
            { validators: this.passwordValidators },
        ),
        phone: new FormControl(
            { value: '91998689855', disabled: false },
            { validators: [Validators.required] },
        ),
        zipCode: new FormControl(
            { value: '31810050', disabled: false },
            { validators: [] },
        ),
        date: new FormControl(
            { value: '05/05/2025', disabled: false },
            { validators: [] },
        ),
        time: new FormControl(
            { value: '23:03', disabled: false },
            { validators: [] },
        ),
        cnpj: new FormControl(
            { value: '32599768000110', disabled: false },
            { validators: [] },
        ),
        cpf: new FormControl(
            { value: '31946183423', disabled: false },
            { validators: [] },
        ),
        amount: new FormControl(
            { value: '-3456', disabled: false },
            { validators: [] },
        ),
        price: new FormControl(
            { value: '1231,11', disabled: false },
            { validators: [] },
        ),
        description: new FormControl(
            { value: 'Blá\nblá\nblá', disabled: false },
            { validators: [Validators.required] },
        ),
        disabledDescription: new FormControl(
            {
                value: 'Blá\nblá\nblá\nblá',
                disabled: true,
            },
            { validators: [Validators.required] },
        ),
        level: new FormControl(
            { value: undefined, disabled: false },
            { validators: [Validators.required] },
        ),
        gender: new FormControl(
            { value: undefined, disabled: false },
            { validators: [Validators.required] },
        ),
        acceptTerms: new FormControl(
            { value: false, disabled: false },
            { validators: [Validators.requiredTrue] },
        ),
    });

    constructor() {
        this.formElements = [
            new Select({
                id: 'gender',
                label: 'Gênero',
                name: 'gender',
                options: [
                    { label: 'Masculino', value: 'M' },
                    { label: 'Feminino', value: 'F' },
                ],
                control: this.form.controls.gender,
                errorMessageFn: () =>
                    getMandatoryError(this.form.controls.level),
            }),
            new Radios({
                id: 'level',
                label: 'Nível',
                name: 'level',
                options: [
                    { label: 'Begginer', value: 'B' },
                    { label: 'Intermmediate', value: 'I' },
                    { label: 'Advanced', value: 'A' },
                ],
                control: this.form.controls.level,
            }),
            new CheckboxElement({
                id: 'accept-terms',
                label: 'Aceito os termos',
                name: 'accept-terms',
                control: this.form.controls.acceptTerms,
            }),
            new LabelFormElement({ id: 'test-label', value: 'Test label' }),
            new TextInput({
                id: 'name',
                mask: null,
                name: 'name',
                label: 'Nome',
                control: this.form.controls.name,
                errorMessageFn: () => getNameError(this.form.controls.name),
            }),
            new TextInput({
                id: 'email',
                format: TextInputFormat.email,
                name: 'email',
                label: 'Email',
                placeholder: 'Insira um email',
                maxLength: 200,
                control: this.form.controls.email,
                errorMessageFn: () => getEmailError(this.form.controls.email),
            }),
            new TextInput({
                id: 'password',
                type: FormElementType.password,
                name: 'password',
                label: 'Senha',
                placeholder: 'Insira a senha',
                maxLength: 12,
                control: this.form.controls.password,
            }),
            new TextInput({
                id: 'phone',
                format: TextInputFormat.phone,
                name: 'phone',
                label: 'Fone',
                placeholder: 'Insira seu telefone',
                maxLength: 14,
                focusable: false,
                control: this.form.controls.phone,
            }),
            new TextInput({
                id: 'zip-code',
                format: TextInputFormat.zipCode,
                name: 'zip-code',
                label: 'CEP',
                control: this.form.controls.zipCode,
            }),
            new TextInput({
                id: 'date',
                format: TextInputFormat.date,
                name: 'date',
                label: 'Data',
                control: this.form.controls.date,
            }),
            new TextInput({
                id: 'time',
                format: TextInputFormat.time,
                name: 'time',
                label: 'Horário',
                control: this.form.controls.time,
            }),
            new TextInput({
                id: 'cnpj',
                format: TextInputFormat.cnpj,
                name: 'cnpj',
                label: 'CNPJ',
                control: this.form.controls.cnpj,
            }),
            new TextInput({
                id: 'cpf',
                format: TextInputFormat.cpf,
                name: 'cpf',
                label: 'CPF',
                control: this.form.controls.cpf,
            }),
            new TextInput({
                id: 'amount',
                format: TextInputFormat.integer,
                prefix: 'R$ ',
                name: 'int',
                label: 'Quantidade',
                allowNegativeNumbers: true,
                control: this.form.controls.amount,
            }),
            new TextInput({
                id: 'price',
                format: TextInputFormat.float,
                name: 'price',
                suffix: ' %',
                label: 'Preço',
                decimalPlaces: 2,
                allowNegativeNumbers: false,
                control: this.form.controls.price,
            }),
            new TextArea({
                id: 'description',
                label: 'Descrição',
                placeholder: 'Insira uma descrição',
                name: 'text',
                maxLength: 200,
                control: this.form.controls.description,
            }),
            new TextArea({
                id: 'disabled-description',
                label: 'Área de texto desabilitada',
                placeholder: 'Placeholder',
                name: 'text-disabled',
                maxLength: 200,
                control: this.form.controls.disabledDescription,
            }),
            new DividerFormElement({ id: 'test-divider' }),
            new LabelFormElement({
                id: 'test-label',
                value: 'Outro label',
            }),

            new ButtonFormElement({
                id: 'flat-button',
                icon: 'checked',
                label: 'Botão plano',
                style: ButtonStyle.flat,
            }),
            new ButtonFormElement({
                id: 'elevated-button',
                icon: 'checked',
                label: 'Botão elevado',
                style: ButtonStyle.elevated,
            }),
            new ButtonFormElement({
                id: 'filled-button',
                icon: 'checked',
                label: 'Botão preenchido',
                style: ButtonStyle.filled,
            }),
            new ButtonFormElement({
                id: 'outlined-button',
                icon: 'checked',
                label: 'Botão contornado',
                style: ButtonStyle.outlined,
            }),
            new ButtonFormElement({
                id: 'tonal-button',
                icon: 'checked',
                label: 'Botão tonal',
                style: ButtonStyle.tonal,
            }),
        ];

        this.form.markAllAsTouched();
        this.form.updateValueAndValidity();
    }

    protected get nameValidators() {
        return [
            nameValidator({
                required: true,
                minlength: UserConfigs.NAME_MIN_LENGTH,
                maxlength: UserConfigs.NAME_MAX_LENGTH,
            }),
        ];
    }

    protected get emailValidators() {
        return [
            Validators.required, // mover para o validador
            emailValidator(),
        ];
    }

    protected get passwordValidators() {
        return [
            Validators.required,
            Validators.minLength(UserConfigs.PASSWORD_MIN_LENGTH),
            Validators.maxLength(UserConfigs.PASSWORD_MAX_LENGTH),
            strongPasswordValidator(),
        ];
    }
}

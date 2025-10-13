import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { FormElementType } from '../../components/dynamic-form/enums/dinamic-form-element-type/dinamic-form-element-type.enum';
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

@Component({
    selector: 'app-test',
    imports: [DynamicFormComponent],
    templateUrl: './test.component.html',
    styleUrl: './test.component.scss',
})
export class TestComponent {
    public formElements: AbstractFormElement[];

    form = new FormGroup({
        name: new FormControl({
            value: 'João da Silva',
            disabled: true,
        }),
        email: new FormControl('user@email.com'),
        password: new FormControl('Senha123$'),
        phone: new FormControl('91998689855'),
        zipCode: new FormControl('31810050'),
        date: new FormControl('05/05/2025'),
        time: new FormControl('23:03'),
        cnpj: new FormControl('32599768000110'),
        cpf: new FormControl('31946183423'),
        amount: new FormControl('-3456'),
        price: new FormControl('1231,11'),
        description: new FormControl('Blá\nblá\nblá'),
        disabledDescription: new FormControl({
            value: 'Blá\nblá\nblá\nblá',
            disabled: true,
        }),
        level: new FormControl('I'),
        gender: new FormControl('M'),
    });

    constructor() {
        this.formElements = [
            new LabelFormElement({ id: 'test-label', value: 'Test label' }),
            new TextInput({
                id: 'name',
                mask: null,
                name: 'name',
                label: 'Nome',
                value: 'João da Silva',
                required: true,
                disabled: true,
                control: this.form.controls.name,
            }),
            new TextInput({
                id: 'email',
                format: TextInputFormat.email,
                name: 'email',
                label: 'Email',
                value: 'user@email.com',
                placeholder: 'Insira um email',
                maxLength: 200,
                required: true,
                disabled: false,
                control: this.form.controls.email,
            }),
            new TextInput({
                id: 'password',
                type: FormElementType.password,
                name: 'password',
                label: 'Senha',
                value: 'Senha123$',
                placeholder: 'Insira a senha',
                maxLength: 12,
                required: true,
                disabled: false,
                control: this.form.controls.password,
            }),
            new TextInput({
                id: 'phone',
                format: TextInputFormat.phone,
                name: 'phone',
                label: 'Fone',
                placeholder: 'Insira seu telefone',
                value: '91998689855',
                maxLength: 14,
                required: true,
                focusable: false,
                disabled: false,
                control: this.form.controls.phone,
            }),
            new TextInput({
                id: 'zip-code',
                format: TextInputFormat.zipCode,
                name: 'zip-code',
                label: 'CEP',
                value: '99999999',
                required: false,
                disabled: false,
                control: this.form.controls.zipCode,
            }),
            new TextInput({
                id: 'date',
                format: TextInputFormat.date,
                name: 'date',
                label: 'Data',
                value: '05/05/2025',
                required: false,
                disabled: false,
                control: this.form.controls.date,
            }),
            new TextInput({
                id: 'time',
                format: TextInputFormat.time,
                name: 'time',
                label: 'Horário',
                value: '23:03',
                required: false,
                disabled: false,
                control: this.form.controls.time,
            }),
            new TextInput({
                id: 'cnpj',
                format: TextInputFormat.cnpj,
                name: 'cnpj',
                label: 'CNPJ',
                value: '',
                required: false,
                disabled: false,
                control: this.form.controls.cnpj,
            }),
            new TextInput({
                id: 'cpf',
                format: TextInputFormat.cpf,
                name: 'cpf',
                label: 'CPF',
                value: '31946183423',
                required: false,
                disabled: false,
                control: this.form.controls.cpf,
            }),
            new TextInput({
                id: 'amount',
                format: TextInputFormat.integer,
                prefix: 'R$ ',
                name: 'int',
                label: 'Quantidade',
                value: '-3456',
                required: false,
                disabled: false,
                allowNegativeNumbers: true,
                control: this.form.controls.amount,
            }),
            new TextInput({
                id: 'price',
                format: TextInputFormat.float,
                name: 'price',
                suffix: ' %',
                label: 'Preço',
                value: '1231,11',
                required: false,
                disabled: false,
                decimalPlaces: 2,
                allowNegativeNumbers: false,
                control: this.form.controls.price,
            }),

            new TextArea({
                id: 'description',
                label: 'Descrição',
                placeholder: 'Insira uma descrição',
                name: 'text',
                value: 'Mensagem de teste...',
                maxLength: 200,
                required: false,
                disabled: false,
                control: this.form.controls.description,
            }),
            new TextArea({
                id: 'disabled-description',
                label: 'Área de texto desabilitada',
                placeholder: 'Placeholder',
                name: 'text-disabled',
                value: 'Mensagem de teste...',
                maxLength: 200,
                required: false,
                disabled: true,
                control: this.form.controls.disabledDescription,
            }),

            new DividerFormElement({ id: 'test-divider' }),
            new LabelFormElement({
                id: 'test-label',
                value: 'Outro label',
            }),
            new Select({
                id: 'gender',
                label: 'Gênero',
                name: 'gender',
                options: [
                    { label: 'Masculino', value: 'M' },
                    { label: 'Feminino', value: 'F' },
                ],
                value: undefined,
                required: true,
                disabled: false,
                control: this.form.controls.gender,
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
                required: true,
                disabled: false,
                control: this.form.controls.level,
            }),

            new CheckboxElement({
                id: 'accept-terms',
                label: 'Aceito os termos',
                name: 'accept-terms',
                value: true,
                required: false,
                disabled: false,
                control: this.form.controls.gender,
            }),

            new ButtonFormElement({
                id: 'flat-button',
                icon: 'checked',
                label: 'Botão plano',
                disabled: false,
                style: ButtonStyle.flat,
            }),
            new ButtonFormElement({
                id: 'elevated-button',
                icon: 'checked',
                label: 'Botão elevado',
                disabled: false,
                style: ButtonStyle.elevated,
            }),
            new ButtonFormElement({
                id: 'filled-button',
                icon: 'checked',
                label: 'Botão preenchido',
                disabled: false,
                style: ButtonStyle.filled,
            }),
            new ButtonFormElement({
                id: 'outlined-button',
                icon: 'checked',
                label: 'Botão contornado',
                disabled: false,
                style: ButtonStyle.outlined,
            }),
            new ButtonFormElement({
                id: 'tonal-button',
                icon: 'checked',
                label: 'Botão tonal',
                disabled: false,
                style: ButtonStyle.tonal,
            }),
        ];
    }
}

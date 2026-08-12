import { Component, inject } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../../components/form/components/button/button.component';
import { ButtonAppearance } from '../../components/form/components/button/enum/appearance/button-appearance.enum';
import { CheckboxComponent } from '../../components/form/components/checkbox/checkbox.component';
import { RadioGroupComponent } from '../../components/form/components/radio-group/radio-group.component';
import { SelectFieldComponent } from '../../components/form/components/select/select-field.component';
import { NumericFieldComponent } from '../../components/form/components/text/numeric-field/numeric-field.component';
import { PasswordFieldComponent } from '../../components/form/components/text/password-field/password-field.component';
import { TextAreaFieldComponent } from '../../components/form/components/text/text-area/text-area.component';
import { TextFieldComponent } from '../../components/form/components/text/text-field/text-field.component';
import { AutoCompleteType } from '../../components/form/enums/auto-complete-type/auto-complete-type.enum';
import { FormElementType } from '../../components/form/enums/form-element-type/form-element-type.enum';
import { InputMode } from '../../components/form/enums/input-mode/input-mode.enum';
import { TextFormat } from '../../components/form/enums/text-format/text-format.enum';
import { TextMask } from '../../components/form/enums/text-mask/text-mask.enum';
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
    imports: [
        // FormComponent,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        // AlertComponent,
        MatProgressBarModule,
        TextFieldComponent,
        PasswordFieldComponent,
        TextAreaFieldComponent,
        NumericFieldComponent,
        SelectFieldComponent,
        RadioGroupComponent,
        CheckboxComponent,
        ButtonComponent,
        MatDivider,
    ],
    styleUrl: './test.component.scss',
    templateUrl: './test.component.html',
})
export class TestComponent {
    protected responsivity: ResponsityService = inject(ResponsityService);
    private resizeSubscription!: Subscription;

    protected formGroup = new FormGroup(
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

    protected mobile: boolean = true;

    protected AutoCompleteType = AutoCompleteType;
    protected TextFormat = TextFormat;
    protected TextMask = TextMask;
    protected FormElementType = FormElementType;
    protected ButtonAppearance = ButtonAppearance;
    protected Icon = Icon;
    protected InputMode = InputMode;

    protected acceptTermsLabel =
        'Aceito os <a href="/terms-of-use" target="_blank" class="link-modern">termos</a>'; // TODO: test

    constructor() {}

    onTextFieldBlur() {
        console.log('On text input blur');
    }

    onTextAreaBlur() {
        console.log('On text area blur');
    }

    public ngAfterViewInit() {
        this.resizeSubscription = this.responsivity.mobile.subscribe(
            (mobile) => {
                this.mobile = mobile;
                // this.formGroup.markAllAsTouched();
                // this.formGroup.markAllAsDirty();
                // this.formGroup.updateValueAndValidity();
            },
        );
    }

    public ngOnDestroy() {
        this.resizeSubscription?.unsubscribe();
    }
}

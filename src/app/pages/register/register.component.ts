import { Component, inject } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router, RouterModule } from '@angular/router';
import { AlertComponent } from '../../components/alert/alert.component';
import { AbstractFormElementModel } from '../../components/form/components/abstract/abstract-form-element.model';
import { ButtonStyle } from '../../components/form/components/button/enum/style/button-style.enum';
import { ButtonModel } from '../../components/form/components/button/model/button.model';
import { CheckboxModel } from '../../components/form/components/checkbox/model/checkbox.model';
import { TextFieldModel } from '../../components/form/components/text/text-field/model/text-field.model';
import { AutoCompleteType } from '../../components/form/enums/auto-complete-type/auto-complete-type.enum';
import { FormElementType } from '../../components/form/enums/form-element-type/form-element-type.enum';
import { TextFormat } from '../../components/form/enums/text-format/text-format.enum';
import { FormComponent } from '../../components/form/form.component';
import { UserConfigs } from '../../configs/user/user.configs';
import { EmailConstants } from '../../constants/email/email.constants';
import { EmailMessage } from '../../messages/email/email.messages';
import { PasswordMessage } from '../../messages/password/password.messages';
import { TextMessage } from '../../messages/text/text.messages';
import { AuthService } from '../../services/auth/auth.service';
import { AuthResponseDto } from '../../services/auth/dtos/auth.response.dto';
import { RegisterRequestDto } from '../../services/auth/dtos/register.request.dto';
import { emailValidator } from '../../validators/email/email.validator';
import { matchingPasswordValidator } from '../../validators/matching-password/matching-password.validator';
import { nameValidator } from '../../validators/name/name.validator';
import {
    RemoteValidationContext,
    remoteValidator,
} from '../../validators/remote/remote.validator';
import { requiredTrueValidator } from '../../validators/required-true/required-true.validator';
import { strongPasswordValidator } from '../../validators/strong-password/strong-password.validator';

const _NameMessage = new TextMessage({
    minLength: UserConfigs.NAME_MIN_LENGTH,
    maxLength: UserConfigs.NAME_MAX_LENGTH,
});

const _EmailMessage = new EmailMessage({
    maxLength: EmailConstants.MAX_LENGTH,
});

const _PasswordMessage = new PasswordMessage({
    minLength: UserConfigs.PASSWORD_MIN_LENGTH,
    maxLength: UserConfigs.PASSWORD_MAX_LENGTH,
});

@Component({
    selector: 'app-register',
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        AlertComponent,
        MatProgressBarModule,
        FormComponent,
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent {
    private authService: AuthService = inject(AuthService);
    private router: Router = inject(Router);

    protected data?: any;
    protected mainError?: string;
    protected loading: boolean = false;

    private submitted = false;

    protected maxPasswordLength = UserConfigs.PASSWORD_MAX_LENGTH;
    protected maxEmailLength = EmailConstants.MAX_LENGTH;
    protected maxUsernameLength = UserConfigs.NAME_MAX_LENGTH;

    protected showPassword: boolean = false;
    protected showRepeatPassword: boolean = false;

    protected acceptTermsBlurred = false;

    protected nameRemoteValidationContext: RemoteValidationContext = {};
    protected emailRemoteValidationContext: RemoteValidationContext = {};
    protected passwordRemoteValidationContext: RemoteValidationContext = {};
    protected repeatPasswordRemoteValidationContext: RemoteValidationContext =
        {};
    protected acceptTermsRemoteValidationContext: RemoteValidationContext = {};

    form = new FormGroup({
        name: new FormControl('', {
            validators: [
                nameValidator({
                    required: true,
                    minLength: UserConfigs.NAME_MIN_LENGTH,
                    maxLength: UserConfigs.NAME_MAX_LENGTH,
                }),
                remoteValidator(this.nameRemoteValidationContext),
            ],
            updateOn: 'blur',
        }),
        email: new FormControl('', {
            validators: [
                emailValidator({ required: true }),
                remoteValidator(this.emailRemoteValidationContext),
            ],
            updateOn: 'blur',
        }),
        password: new FormControl('', {
            validators: [
                strongPasswordValidator(),
                remoteValidator(this.passwordRemoteValidationContext),
            ],
            updateOn: 'blur',
        }),
        repeatPassword: new FormControl('', {
            validators: [
                matchingPasswordValidator('password'),
                remoteValidator(this.repeatPasswordRemoteValidationContext),
            ],
            updateOn: 'blur',
        }),
        acceptTerms: new FormControl(false, {
            validators: [
                requiredTrueValidator(),
                remoteValidator(this.acceptTermsRemoteValidationContext),
            ],
            updateOn: 'blur', // TODO: criar enum
        }),
    });

    protected nameControl = new TextFieldModel({
        id: 'name-input',
        label: 'Nome',
        control: this.form.controls.name,
        colSize: 12,
        autocomplete: AutoCompleteType.off,
        maxLength: UserConfigs.NAME_MAX_LENGTH,
    });

    protected emailControl = new TextFieldModel({
        id: 'email-input',
        format: TextFormat.email,
        label: 'E-mail',
        control: this.form.controls.email,
        colSize: 12,
        autocomplete: AutoCompleteType.off,
        maxLength: EmailConstants.MAX_LENGTH,
    });

    protected passwordControl = new TextFieldModel({
        id: 'password-input',
        label: 'Senha',
        format: TextFormat.password,
        control: this.form.controls.password,
        colSize: 12,
        autocomplete: AutoCompleteType.new_password,
        onBlur: () => this.onPasswordBlur(),
    });

    protected repeatPasswordControl = new TextFieldModel({
        id: 'repeat-password-input',
        format: TextFormat.password,
        label: 'Repita a senha',
        control: this.form.controls.repeatPassword,
        colSize: 12,
        autocomplete: AutoCompleteType.off,
        maxLength: UserConfigs.PASSWORD_MAX_LENGTH,
    });

    protected acceptTermsControl = new CheckboxModel({
        id: 'accept-terms-checkbox',
        label: 'Aceito os termos',
        control: this.form.controls.acceptTerms,
        colSize: 12,
        autofocus: true,
    });

    protected registerButton = new ButtonModel({
        id: 'register',
        label: 'Registrar',
        style: ButtonStyle.filled,
        colSize: 12,
        type: FormElementType.submit,
        disabled: false,
        clickCallback: () => this.onSubmit(),
    });

    protected loginButton = new ButtonModel({
        id: 'register',
        label: 'Já tem uma conta? <b>Login</b>',
        style: ButtonStyle.outlined,
        routerLink: '/login',
        colSize: 12,
        // type="button"
        // [disabled]="loading"
    });

    protected elements: AbstractFormElementModel[] = [
        this.nameControl,
        this.emailControl,
        this.passwordControl,
        this.repeatPasswordControl,
        this.acceptTermsControl,
        this.registerButton,
        this.loginButton,
    ];

    protected onSubmit() {
        this.submitted = true;
        this.form.updateValueAndValidity();
        if (!this.form.valid) {
            return;
        }

        const data = this.form.getRawValue() as RegisterRequestDto;
        this.mainError = undefined;

        this.loading = true;
        this.form.disable();

        const observable = this.authService.register(data);

        this.nameRemoteValidationContext.remoteError = undefined;
        this.emailRemoteValidationContext.remoteError = undefined;
        this.passwordRemoteValidationContext.remoteError = undefined;
        this.repeatPasswordRemoteValidationContext.remoteError = undefined;
        this.acceptTermsRemoteValidationContext.remoteError = undefined;
        this.form.controls.acceptTerms.markAllAsTouched();
        this.form.updateValueAndValidity();

        observable.subscribe({
            next: (authResponse: AuthResponseDto) => {
                this.loading = false;
            },
            error: (error: any) => {
                this.loading = false;
                if (typeof error == 'string') {
                    this.mainError = error;
                } else if (typeof error.error?.message == 'string') {
                    this.mainError = error.error.message;
                } else {
                    // name
                    if (error.error?.message?.name) {
                        this.nameRemoteValidationContext.remoteError =
                            error.error?.message.name;
                    }
                    // email
                    if (error.error?.message?.email) {
                        this.emailRemoteValidationContext.remoteError =
                            error.error?.message.email;
                    }
                    // password
                    if (error.error?.message?.password) {
                        this.passwordRemoteValidationContext.remoteError =
                            error.error?.message.password;
                    }
                    // repeat password
                    if (error.error?.message?.repeatPassword) {
                        this.repeatPasswordRemoteValidationContext.remoteError =
                            error.error?.message.repeatPassword;
                    }
                    // accept terms
                    if (error.error?.message?.acceptTerms) {
                        this.acceptTermsRemoteValidationContext.remoteError =
                            error.error?.message.acceptTerms;
                    }
                    this.mainError = undefined;
                    this.form.updateValueAndValidity();
                    this.form.markAllAsTouched();
                }

                this.form.enable();
            },
            complete: () => {
                this.mainError = undefined;
                this.loading = false;
                this.form.reset();
                this.acceptTermsBlurred = false;
                this.router.navigate(['/login']);
            },
        });
    }

    protected onPasswordBlur() {
        this.form.controls.repeatPassword.updateValueAndValidity({
            emitEvent: false,
        });
    }

    protected togglePasswordVisibility(event: Event) {
        event.stopPropagation();
        this.showPassword = !this.showPassword;
    }

    protected toggleRepeatPasswordVisibility(event: Event) {
        event.stopPropagation();
        this.showRepeatPassword = !this.showRepeatPassword;
    }
}

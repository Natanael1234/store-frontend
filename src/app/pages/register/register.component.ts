import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { AlertComponent } from '@components/alert/alert.component';
import { ButtonComponent } from '@components/form/components/button/button.component';
import { CheckboxComponent } from '@components/form/components/checkbox/checkbox.component';
import { PasswordFieldComponent } from '@components/form/components/text/password-field/password-field.component';
import { TextFieldComponent } from '@components/form/components/text/text-field/text-field.component';
import { UserConfigs } from '@configs/user/user.configs';
import { Icon } from '@enums/icons/icons.enum';
import { AbstractFormComponent } from '@pages/abstract-form.component';
import { AuthService } from '@services/auth/auth.service';
import { AuthResponseDto } from '@services/auth/dtos/auth.response.dto';
import { RegisterRequestDto } from '@services/auth/dtos/register.request.dto';
import { emailValidator } from '@validators/email/email.validator';
import { matchingPasswordValidator } from '@validators/matching-password/matching-password.validator';
import { nameValidator } from '@validators/name/name.validator';
import { RemoteValidationContext, remoteValidator } from '@validators/remote/remote.validator';
import { requiredTrueValidator } from '@validators/required-true/required-true.validator';
import { strongPasswordValidator } from '@validators/strong-password/strong-password.validator';

@Component({
    selector: 'app-register',
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        AlertComponent,
        MatProgressBarModule,
        TextFieldComponent,
        PasswordFieldComponent,
        CheckboxComponent,
        ButtonComponent,
    ],
    styles: `
        // .invalid ::ng-deep .mdc-checkbox__background {
        //     border-color: var(--mdc-filled-text-field-error-label-text-color) !important;
        // }

        // .invalid ::ng-deep label {
        //     color: var(--mdc-filled-text-field-error-label-text-color);
        // }
    `,
    template: `
        <form [formGroup]="formGroup" class="grid">
            <!-- loading progress -->
            @if (loading()) {
                <div [attr.col]="12">
                    <mat-progress-bar mode="indeterminate"></mat-progress-bar>
                </div>
            }

            <!-- main error -->
            @if (mainError()) {
                <div [attr.col]="12">
                    <app-alert
                        [showCloseButton]="true"
                        type="danger"
                        [icon]="Icon.warning"
                        (onClose)="mainError.set(undefined)">
                        {{ mainError() }}
                    </app-alert>
                </div>
            }

            <!-- name -->
            <div [attr.col]="12">
                <app-text-field
                    id="name-input"
                    label="Nome"
                    [control]="formGroup.controls.name"
                    [autofocus]="true"
                    [format]="TextFormat.text"
                    [minLength]="UserConfigs.NAME_MIN_LENGTH"
                    [maxLength]="UserConfigs.NAME_MAX_LENGTH" />
            </div>

            <!-- email -->
            <div [attr.col]="12">
                <app-text-field
                    id="email-input"
                    [mask]="TextMask.email"
                    label="Email"
                    [inputMode]="InputMode.email"
                    [control]="formGroup.controls.email"
                    [format]="TextFormat.email"
                    [maxLength]="EmailConstants.MAX_LENGTH" />
            </div>

            <!-- password -->
            <div [attr.col]="12">
                <app-password-field
                    id="password-input"
                    label="Senha"
                    [control]="formGroup.controls.password"
                    [autocomplete]="AutoCompleteType.new_password"
                    [minLength]="UserConfigs.PASSWORD_MIN_LENGTH"
                    [maxLength]="UserConfigs.PASSWORD_MAX_LENGTH"
                    (onBlur)="onPasswordBlur()" />
            </div>

            <!-- repeat password -->
            <div [attr.col]="12">
                <app-password-field
                    id="repeat-password-input"
                    label="Repita a senha"
                    [control]="formGroup.controls.repeatPassword"
                    [minLength]="UserConfigs.PASSWORD_MIN_LENGTH"
                    [maxLength]="UserConfigs.PASSWORD_MAX_LENGTH" />
            </div>

            <!-- accept terms -->
            <div [attr.col]="12">
                <app-checkbox
                    id="accept-terms-checkbox"
                    [label]="acceptTermsLabel"
                    [control]="formGroup.controls.acceptTerms" />
            </div>

            <!-- register button -->
            <div [attr.col]="12">
                <app-button
                    id="register-button"
                    [type]="FormElementType.button"
                    label="Registrar"
                    [appearance]="ButtonAppearance.filled"
                    [disabled]="loading()"
                    (onClick)="onSubmit()" />
            </div>

            <!-- login button -->
            <div [attr.col]="12">
                <app-button
                    id="login-button"
                    [type]="FormElementType.button"
                    label="Já tem uma conta? <b>Login</b>"
                    [appearance]="ButtonAppearance.outlined"
                    [disabled]="loading()"
                    routerLink="/login" />
            </div>
        </form>
    `,
})
export class RegisterComponent extends AbstractFormComponent<RegisterRequestDto, AuthResponseDto> {
    protected Icon = Icon;

    private readonly authService = inject(AuthService);

    protected readonly nameRemoteValidationContext = new RemoteValidationContext();
    protected readonly emailRemoteValidationContext = new RemoteValidationContext();
    protected readonly passwordRemoteValidationContext = new RemoteValidationContext();
    protected readonly repeatPasswordRemoteValidationContext = new RemoteValidationContext();
    protected readonly acceptTermsRemoteValidationContext = new RemoteValidationContext();

    protected readonly formGroup = new FormGroup({
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

    protected readonly acceptTermsLabel =
        'Aceito os <a href="/terms-of-use" target="_blank" class="link-modern">termos de uso</a>.'; // TODO: test

    protected override navigateAfterComplete(): void {
        this.navigateToLogin();
    }

    protected fireSubmitRequest() {
        const data = this.getFormData();
        return this.authService.register(data);
    }

    protected setRemoteErrors(errors: {
        main?: string;
        name?: string;
        email?: string;
        password?: string;
        repeatPassword?: string;
        acceptTerms?: boolean;
    }): void {
        const { main, name, email, password, repeatPassword, acceptTerms } = errors;
        this.mainError.set(main);
        this.nameRemoteValidationContext.setError(name);
        this.emailRemoteValidationContext.setError(email);
        this.passwordRemoteValidationContext.setError(password);
        this.repeatPasswordRemoteValidationContext.setError(repeatPassword);
        this.acceptTermsRemoteValidationContext.setError(acceptTerms);
        this.formGroup.updateValueAndValidity();
        this.formGroup.markAllAsTouched();
    }

    protected clearRemoteErrors(): void {
        this.mainError.set(undefined);
        this.nameRemoteValidationContext.clear();
        this.emailRemoteValidationContext.clear();
        this.passwordRemoteValidationContext.clear();
        this.repeatPasswordRemoteValidationContext.clear();
        this.acceptTermsRemoteValidationContext.clear();
        this.formGroup.controls.acceptTerms.markAllAsTouched();
        this.formGroup.updateValueAndValidity();
    }

    /**
     * Forces matching password and repeatPassword validation after password field blur
     */
    protected onPasswordBlur(): void {
        this.formGroup.controls.repeatPassword.updateValueAndValidity({
            emitEvent: false,
        });
    }
}

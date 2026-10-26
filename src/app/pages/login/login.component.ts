import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { AlertComponent } from '@components/alert/alert.component';
import { ButtonComponent } from '@components/form/components/button/button.component';
import { PasswordFieldComponent } from '@components/form/components/text/password-field/password-field.component';
import { TextFieldComponent } from '@components/form/components/text/text-field/text-field.component';
import { Icon } from '@enums/icons/icons.enum';
import { AbstractFormComponent } from '@pages/abstract-form.component';
import { AuthService } from '@services/auth/auth.service';
import { AuthResponseDto } from '@services/auth/dtos/auth.response.dto';
import { LoginRequestDto } from '@services/auth/dtos/login.request.dto';
import { emailValidator } from '@validators/email/email.validator';
import { RemoteValidationContext, remoteValidator } from '@validators/remote/remote.validator';

import { strongPasswordValidator } from '@validators/strong-password/strong-password.validator';

@Component({
    selector: 'app-login',
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        AlertComponent,
        MatProgressBarModule,
        TextFieldComponent,
        PasswordFieldComponent,
        ButtonComponent,
    ],
    template: `
        <form [formGroup]="formGroup" class="grid">
            <!-- loading progress TODO: mover para a barra principal? -->

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
                        (onClose)="mainError()">
                        {{ mainError() }}
                    </app-alert>
                </div>
            }

            <!-- email  -->

            <div [attr.col]="12">
                <app-text-field
                    id="email-input"
                    [mask]="TextMask.email"
                    label="Email"
                    [inputMode]="InputMode.email"
                    [control]="formGroup.controls.email"
                    [format]="TextFormat.email"
                    [autocomplete]="AutoCompleteType.on"
                    [maxLength]="EmailConstants.MAX_LENGTH" />
            </div>

            <!-- password -->

            <div [attr.col]="12">
                <app-password-field
                    id="password-input"
                    label="Senha"
                    [control]="formGroup.controls.password"
                    [autocomplete]="AutoCompleteType.current_password"
                    [minLength]="UserConfigs.PASSWORD_MIN_LENGTH"
                    [maxLength]="UserConfigs.PASSWORD_MAX_LENGTH" />
            </div>

            <!-- login button -->

            <div [attr.col]="12">
                <app-button
                    id="login-button"
                    [type]="FormElementType.button"
                    label="Login"
                    [appearance]="ButtonAppearance.filled"
                    [disabled]="!!loading()"
                    (onClick)="onSubmit()" />
            </div>

            <!-- register button -->

            <div [attr.col]="12">
                <app-button
                    id="register-button"
                    [type]="FormElementType.button"
                    label="Não tem tem uma conta? <b>Cadastre-se</b>"
                    [appearance]="ButtonAppearance.outlined"
                    [disabled]="!!loading()"
                    routerLink="/register" />
            </div>
        </form>
    `,
})
export class LoginComponent extends AbstractFormComponent<LoginRequestDto, AuthResponseDto> {
    protected Icon = Icon;

    private authService: AuthService = inject(AuthService);
    protected emailRemoteValidationContext = new RemoteValidationContext();
    protected passwordRemoteValidationContext = new RemoteValidationContext();
    protected formGroup = new FormGroup({
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
    });

    protected override navigateAfterComplete(): void {
        this.navigateToHome();
    }

    protected fireSubmitRequest() {
        const data = this.getFormData();
        return this.authService.login(data);
    }

    protected setRemoteErrors(errors: { main?: string; email?: string; password?: string }): void {
        const { main, email, password } = errors;
        this.mainError.set(main);
        this.emailRemoteValidationContext.setError(email);
        this.passwordRemoteValidationContext.setError(password);
        this.formGroup.updateValueAndValidity();
        this.formGroup.markAllAsTouched();
    }

    protected clearRemoteErrors(): void {
        this.mainError.set(undefined);
        this.emailRemoteValidationContext.clear();
        this.passwordRemoteValidationContext.clear();
        this.formGroup.updateValueAndValidity();
    }
}

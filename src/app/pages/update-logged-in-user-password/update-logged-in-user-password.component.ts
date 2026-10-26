import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { AlertComponent } from '@components/alert/alert.component';
import { ButtonComponent } from '@components/form/components/button/button.component';
import { PasswordFieldComponent } from '@components/form/components/text/password-field/password-field.component';
import { Icon } from '@enums/icons/icons.enum';
import { AuthInterceptor } from '@interceptors/auth/auth.interceptor';
import { AbstractFormComponent } from '@pages/abstract-form.component';
import { AuthService } from '@services/auth/auth.service';
import { AuthResponseDto } from '@services/auth/dtos/auth.response.dto';
import { UpdateLoggedInUserPasswordRequestDto } from '@services/auth/dtos/update-logged-in-user-password.request.dto';
import { matchingPasswordValidator } from '@validators/matching-password/matching-password.validator';
import { RemoteValidationContext, remoteValidator } from '@validators/remote/remote.validator';
import { strongPasswordValidator } from '@validators/strong-password/strong-password.validator';

@Component({
    selector: 'app-update-logged-in-user-password',
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        AlertComponent,
        MatProgressBarModule,
        PasswordFieldComponent,
        ButtonComponent,
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    styles: `
        .invalid ::ng-deep .mdc-checkbox__background {
            border-color: var(--mdc-filled-text-field-error-label-text-color) !important;
        }

        .invalid ::ng-deep label {
            color: var(--mdc-filled-text-field-error-label-text-color);
        }
    `,
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
                        (onClose)="mainError.set(undefined)">
                        {{ mainError() }}
                    </app-alert>
                </div>
            }

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

            <!-- save button -->

            <div [attr.col]="12">
                <app-button
                    id="save-button"
                    [type]="FormElementType.button"
                    label="Salvar"
                    [appearance]="ButtonAppearance.filled"
                    [disabled]="!!loading()"
                    (onClick)="onSubmit()" />
            </div>

            <!-- cancel button -->

            <div [attr.col]="12">
                <app-button
                    id="cancel-button"
                    [type]="FormElementType.button"
                    label="Cancelar"
                    [appearance]="ButtonAppearance.outlined"
                    [disabled]="!!loading()"
                    routerLink="/" />
            </div>
        </form>
    `,
})
export class UpdateLoggedInUserPasswordComponent extends AbstractFormComponent<
    UpdateLoggedInUserPasswordRequestDto,
    AuthResponseDto
> {
    protected Icon = Icon;

    private authService: AuthService = inject(AuthService);
    protected passwordRemoteValidationContext = new RemoteValidationContext();
    protected repeatPasswordRemoteValidationContext = new RemoteValidationContext();
    protected formGroup = new FormGroup({
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
    });

    protected override navigateAfterComplete(): void {
        this.navigateToHome();
    }

    protected fireSubmitRequest() {
        const data = this.getFormData();
        return this.authService.updateLoggedInUserPassword(data);
    }

    protected setRemoteErrors(errors: {
        main?: string;
        password?: string;
        repeatPassword?: string;
    }): void {
        const { main, password, repeatPassword } = errors;
        this.mainError.set(main);
        this.passwordRemoteValidationContext.setError(password);
        this.repeatPasswordRemoteValidationContext.setError(repeatPassword);
        this.formGroup.updateValueAndValidity();
        this.formGroup.markAllAsTouched();
    }

    protected clearRemoteErrors(): void {
        this.mainError.set(undefined);
        this.passwordRemoteValidationContext.clear();
        this.repeatPasswordRemoteValidationContext.clear();
        this.formGroup.updateValueAndValidity();
    }

    /**
     * forces matching password and repeatPàssword validation after password field blur
     */
    protected onPasswordBlur() {
        this.formGroup.controls.repeatPassword.updateValueAndValidity({
            emitEvent: false,
        });
    }
}

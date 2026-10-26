import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AlertComponent } from '@components/alert/alert.component';
import { ButtonComponent } from '@components/form/components/button/button.component';
import { PasswordFieldComponent } from '@components/form/components/text/password-field/password-field.component';
import { Icon } from '@enums/icons/icons.enum';
import { AbstractFormComponent } from '@pages/abstract-form.component';
import { AuthService } from '@services/auth/auth.service';
import { AuthResponseDto } from '@services/auth/dtos/auth.response.dto';
import { NewPasswordRequestDto } from '@services/auth/dtos/new-password.request.dto';
import { matchingPasswordValidator } from '@validators/matching-password/matching-password.validator';
import { RemoteValidationContext, remoteValidator } from '@validators/remote/remote.validator';
import { strongPasswordValidator } from '@validators/strong-password/strong-password.validator';

@Component({
    selector: 'app-new-password',
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
                    [disabled]="loading()"
                    (onClick)="onSubmit()" />
            </div>

            <!-- cancel button -->
            <div [attr.col]="12">
                <app-button
                    id="cancel-button"
                    [type]="FormElementType.button"
                    label="Cancelar"
                    [appearance]="ButtonAppearance.outlined"
                    [disabled]="loading()"
                    routerLink="/" />
            </div>
        </form>
    `,
})
export class NewPasswordComponent
    extends AbstractFormComponent<NewPasswordRequestDto, AuthResponseDto>
    implements OnInit
{
    protected Icon = Icon;

    private readonly authService = inject(AuthService);
    private readonly activatedRoute = inject(ActivatedRoute);

    protected readonly hashRemoteValidationContext = new RemoteValidationContext();
    protected readonly passwordRemoteValidationContext = new RemoteValidationContext();
    protected readonly repeatPasswordRemoteValidationContext = new RemoteValidationContext();

    protected readonly formGroup = new FormGroup({
        hash: new FormControl('', {}),
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

    public ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            const hash = params['hash'] || null;
            this.formGroup.controls.hash.setValue(hash);
        });
    }

    protected override navigateAfterComplete(): void {
        this.navigateToLogin();
    }

    protected fireSubmitRequest() {
        const data = this.getFormData();
        return this.authService.createNewPassword(data);
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
     * Forces matching password and repeatPassword validation after password field blur
     */
    protected onPasswordBlur(): void {
        this.formGroup.controls.repeatPassword.updateValueAndValidity({
            emitEvent: false,
        });
    }
}

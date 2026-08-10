import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { AlertComponent } from '../../components/alert/alert.component';
import { ButtonComponent } from '../../components/form/components/button/button.component';
import { PasswordFieldComponent } from '../../components/form/components/text/password-field/password-field.component';
import { UserConfigs } from '../../configs/user/user.configs';
import { AuthInterceptor } from '../../interceptors/auth/auth.interceptor';
import { PasswordMessage } from '../../messages/password/password.messages';
import { AuthService } from '../../services/auth/auth.service';
import { AuthResponseDto } from '../../services/auth/dtos/auth.response.dto';
import { UpdateLoggedInUserPasswordRequestDto } from '../../services/auth/dtos/update-logged-in-user-password.request.dto';
import { matchingPasswordValidator } from '../../validators/matching-password/matching-password.validator';
import {
    RemoteValidationContext,
    remoteValidator,
} from '../../validators/remote/remote.validator';
import { strongPasswordValidator } from '../../validators/strong-password/strong-password.validator';
import { AbstractFormComponent } from '../abstract-form.component';

const _PasswordMessage = new PasswordMessage({
    minLength: UserConfigs.PASSWORD_MIN_LENGTH,
    maxLength: UserConfigs.PASSWORD_MAX_LENGTH,
});

@Component({
    selector: 'app-password',
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
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    templateUrl: './update-logged-in-user-password.component.html',
    styleUrl: './update-logged-in-user-password.component.scss',
})
export class UpdateLoggedInUserPasswordComponent extends AbstractFormComponent<
    UpdateLoggedInUserPasswordRequestDto,
    AuthResponseDto
> {
    private authService: AuthService = inject(AuthService);
    protected passwordRemoteValidationContext = new RemoteValidationContext();
    protected repeatPasswordRemoteValidationContext =
        new RemoteValidationContext();
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
        this.mainError = main;
        this.passwordRemoteValidationContext.setError(password);
        this.repeatPasswordRemoteValidationContext.setError(repeatPassword);
        this.formGroup.updateValueAndValidity();
        this.formGroup.markAllAsTouched();
    }

    protected clearRemoteErrors(): void {
        this.mainError = undefined;
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

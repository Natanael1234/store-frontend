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
import { CheckboxComponent } from '../../components/form/components/checkbox/checkbox.component';
import { PasswordFieldComponent } from '../../components/form/components/text/password-field/password-field.component';
import { TextFieldComponent } from '../../components/form/components/text/text-field/text-field.component';
import { UserConfigs } from '../../configs/user/user.configs';
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
import { AbstractFormComponent } from '../abstract-form.component';

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
    styleUrl: './register.component.scss',
    templateUrl: './register.component.html',
})
export class RegisterComponent extends AbstractFormComponent<
    RegisterRequestDto,
    AuthResponseDto
> {
    private authService: AuthService = inject(AuthService);
    protected nameRemoteValidationContext = new RemoteValidationContext();
    protected emailRemoteValidationContext = new RemoteValidationContext();
    protected passwordRemoteValidationContext = new RemoteValidationContext();
    protected repeatPasswordRemoteValidationContext =
        new RemoteValidationContext();
    protected acceptTermsRemoteValidationContext =
        new RemoteValidationContext();
    protected formGroup = new FormGroup({
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
        const { main, name, email, password, repeatPassword, acceptTerms } =
            errors;
        this.mainError = main;
        this.nameRemoteValidationContext.setError(name);
        this.emailRemoteValidationContext.setError(email);
        this.passwordRemoteValidationContext.setError(password);
        this.repeatPasswordRemoteValidationContext.setError(repeatPassword);
        this.acceptTermsRemoteValidationContext.setError(acceptTerms);
        this.formGroup.updateValueAndValidity();
        this.formGroup.markAllAsTouched();
    }

    protected clearRemoteErrors(): void {
        this.mainError = undefined;
        this.nameRemoteValidationContext.clear();
        this.emailRemoteValidationContext.clear();
        this.passwordRemoteValidationContext.clear();
        this.repeatPasswordRemoteValidationContext.clear();
        this.acceptTermsRemoteValidationContext.clear();
        this.formGroup.controls.acceptTerms.markAllAsTouched();
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

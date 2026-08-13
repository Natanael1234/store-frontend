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
import { AlertComponent } from '@components/alert/alert.component';
import { ButtonComponent } from '@components/form/components/button/button.component';
import { PasswordFieldComponent } from '@components/form/components/text/password-field/password-field.component';
import { TextFieldComponent } from '@components/form/components/text/text-field/text-field.component';
import { AbstractFormComponent } from '@pages/abstract-form.component';
import { AuthService } from '@services/auth/auth.service';
import { AuthResponseDto } from '@services/auth/dtos/auth.response.dto';
import { LoginRequestDto } from '@services/auth/dtos/login.request.dto';
import { emailValidator } from '@validators/email/email.validator';
import {
    RemoteValidationContext,
    remoteValidator,
} from '@validators/remote/remote.validator';

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
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent extends AbstractFormComponent<
    LoginRequestDto,
    AuthResponseDto
> {
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

    protected setRemoteErrors(errors: {
        main?: string;
        email?: string;
        password?: string;
    }): void {
        const { main, email, password } = errors;
        this.mainError = main;
        this.emailRemoteValidationContext.setError(email);
        this.passwordRemoteValidationContext.setError(password);
        this.formGroup.updateValueAndValidity();
        this.formGroup.markAllAsTouched();
    }

    protected clearRemoteErrors(): void {
        this.mainError = undefined;
        this.emailRemoteValidationContext.clear();
        this.passwordRemoteValidationContext.clear();
        this.formGroup.updateValueAndValidity();
    }
}

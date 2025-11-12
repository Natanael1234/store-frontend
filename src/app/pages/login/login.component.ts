import { Component, inject } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router, RouterModule } from '@angular/router';
import { AlertComponent } from '../../components/alert/alert.component';
import { UserConfigs } from '../../configs/user/user.configs';
import { EmailConstants } from '../../constants/email/email.constants';
import { EmailMessage } from '../../messages/email/email.messages';
import { PasswordMessage } from '../../messages/password/password.messages';
import { FirstErrorMessagePipe } from '../../pipes/first-error-message.pipe';
import { AuthService } from '../../services/auth/auth.service';
import { AuthResponseDto } from '../../services/auth/dtos/auth.response.dto';
import { LoginRequestDto } from '../../services/auth/dtos/login.request.dto';
import { emailValidator } from '../../validators/email/email.validator';
import { maxLengthValidator } from '../../validators/max-length/max-length.validator';
import { minLengthValidator } from '../../validators/min-length/min-length.validator';
import {
    RemoteValidationContext,
    remoteValidator,
} from '../../validators/remote/remote.validator';
import { requiredValidator } from '../../validators/required/required.validator';
import { strongPasswordValidator } from '../../validators/strong-password/strong-password.validator';

const _EmailMessage = new EmailMessage({
    maxLength: EmailConstants.MAX_LENGTH,
});

const _PasswordMessage = new PasswordMessage({
    minLength: UserConfigs.PASSWORD_MIN_LENGTH,
    maxLength: UserConfigs.PASSWORD_MAX_LENGTH,
});

@Component({
    selector: 'app-login',
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCardModule,
        AlertComponent,
        MatProgressBarModule,
        FirstErrorMessagePipe,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    private authService: AuthService = inject(AuthService);
    private router: Router = inject(Router);

    protected data?: any;
    protected mainError?: string;
    protected loading: boolean = false;

    protected maxPasswordLength = UserConfigs.PASSWORD_MAX_LENGTH;
    protected maxEmailLength = EmailConstants.MAX_LENGTH;

    protected showPassword: boolean = false;

    protected emailRemoteValidationContext: RemoteValidationContext = {};
    protected passwordRemoteValidationContext: RemoteValidationContext = {};

    protected emailControl = new FormControl('', {
        validators: [
            // TODO: update tests
            requiredValidator(),
            // TODO: update tests
            emailValidator(),
            remoteValidator(this.emailRemoteValidationContext),
        ],
        updateOn: 'blur',
    });
    protected passwordControl = new FormControl('', {
        validators: [
            // TODO: update tests
            requiredValidator(),
            // TODO: update tests
            minLengthValidator(UserConfigs.PASSWORD_MIN_LENGTH),
            // TODO: update tests
            maxLengthValidator(UserConfigs.PASSWORD_MAX_LENGTH),
            strongPasswordValidator(),
            remoteValidator(this.passwordRemoteValidationContext),
        ],
        updateOn: 'blur',
    });
    form = new FormGroup({
        email: this.emailControl,
        password: this.passwordControl,
    });

    protected onSubmit() {
        if (!this.form.valid) {
            return;
        }
        this.form.updateValueAndValidity();

        const data = this.form.getRawValue() as LoginRequestDto;
        this.mainError = undefined;

        this.loading = true;
        this.form.disable();

        const observable = this.authService.login(data);

        this.emailRemoteValidationContext.remoteError = undefined;
        this.passwordRemoteValidationContext.remoteError = undefined;

        this.form.updateValueAndValidity();

        observable.subscribe({
            next: (authResponse: AuthResponseDto) => {
                this.loading = false;
            },
            error: (remoteError: any) => {
                this.loading = false;
                // TODO: replace else if by if
                if (typeof remoteError == 'string') {
                    this.mainError = remoteError;
                } else if (typeof remoteError.error?.message == 'string') {
                    this.mainError = remoteError.error.message;
                } else {
                    // email
                    if (remoteError.error?.message?.email) {
                        this.emailRemoteValidationContext.remoteError =
                            remoteError.error?.message.email;
                    }
                    // password
                    if (remoteError.error?.message?.password) {
                        this.passwordRemoteValidationContext.remoteError =
                            remoteError.error?.message.password;
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
                this.router.navigate(['/']);
            },
        });
    }

    protected getEmailErrorMessage() {
        const emailFormControl = this.form.controls.email;
        let emailErrorMessage: string | null | undefined = '';
        if (emailFormControl.hasError('null')) {
            emailErrorMessage = _EmailMessage.NULL;
        } else if (emailFormControl.hasError('required')) {
            emailErrorMessage = _EmailMessage.REQUIRED;
        } else if (emailFormControl.hasError('email')) {
            emailErrorMessage = _EmailMessage.INVALID;
        } else if (emailFormControl.hasError('minlength')) {
            emailErrorMessage = _EmailMessage.MIN_LEN;
        } else if (emailFormControl.hasError('maxlength')) {
            emailErrorMessage = _EmailMessage.MAX_LEN;
        } else if (emailFormControl.hasError('remote')) {
            // TODO:
            emailErrorMessage = this.emailRemoteValidationContext.remoteError;
        }

        return emailErrorMessage;
    }

    protected getPasswordErrorMessage() {
        const passwordFormControl = this.form.controls.password;

        let passwordErrorMessage = '';
        if (passwordFormControl.hasError('null')) {
            passwordErrorMessage = _PasswordMessage.NULL;
        }
        if (passwordFormControl.hasError('required')) {
            passwordErrorMessage = _PasswordMessage.REQUIRED;
        }
        if (passwordFormControl.hasError('weakPassword')) {
            passwordErrorMessage = _PasswordMessage.INVALID;
        }
        if (passwordFormControl.hasError('minlength')) {
            passwordErrorMessage = _PasswordMessage.INVALID;
        }
        if (passwordFormControl.hasError('maxlength')) {
            passwordErrorMessage = _PasswordMessage.INVALID;
        }
        if (passwordFormControl.hasError('invalidPassword')) {
            passwordErrorMessage = _PasswordMessage.INVALID;
        }
        // TODO:
        if (passwordFormControl.hasError('remote')) {
            passwordErrorMessage = this.passwordRemoteValidationContext
                .remoteError as string;
        }
        return passwordErrorMessage;
    }

    protected togglePasswordVisibility(event: Event) {
        event.stopPropagation();
        this.showPassword = !this.showPassword;
    }
}

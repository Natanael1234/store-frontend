import { Component, inject } from '@angular/core';
import { AuthResponseDto } from '../../services/auth/dtos/auth.response.dto';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserConfigs } from '../../configs/user/user.configs';
import {
  RemoteValidationContext,
  remoteValidator,
} from '../../validators/remote/remote.validator';
import { emailValidator } from '../../validators/email/email.validator';
import { EmailConstants } from '../../constants/email/email.constants';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { EmailMessage } from '../../messages/email/email.messages';
import { PasswordMessage } from '../../messages/password/password.messages';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AlertComponent } from '../../components/alert/alert.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoginRequestDto } from '../../services/auth/dtos/login.request.dto';
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
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCardModule,
        AlertComponent,
        MatProgressBarModule,
        // RouterModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
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

  form = new FormGroup({
    email: new FormControl('', {
      validators: this.emailValidators,
      updateOn: 'blur',
    }),
    password: new FormControl('', {
      validators: this.passwordValidators,
      updateOn: 'blur',
    }),
  });

  protected get emailValidators() {
    return [
      Validators.required, // mover para o validador
      emailValidator(),
      remoteValidator(this.emailRemoteValidationContext),
    ];
  }

  protected get passwordValidators() {
    return [
      Validators.required,
      Validators.minLength(UserConfigs.PASSWORD_MIN_LENGTH),
      Validators.maxLength(UserConfigs.PASSWORD_MAX_LENGTH),
      strongPasswordValidator(),
      remoteValidator(this.passwordRemoteValidationContext),
    ];
  }

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

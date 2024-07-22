import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  EmailValidator,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { RegisterRequestDto } from '../../services/auth/dtos/register.request.dto';
import { EmailConstants } from '../../constants/email/email.constants';
import { strongPasswordValidator } from '../../validators/strong-password/strong-password.validator';
import { matchingFieldsValidator } from '../../validators/matching-password/matching-password.validator';
import { PasswordMessage } from '../../messages/password/password.messages';
import { TextMessage } from '../../messages/text/text.messages';
import { EmailMessage } from '../../messages/email/email.messages';
import { AlertComponent } from '../../components/alert/alert.component';
import { Router } from '@angular/router';
import { AuthResponseDto } from '../../services/auth/dtos/auth.response.dto';
import { UserConfigs } from '../../configs/user/user.configs';
import {
  RemoteValidationContext,
  remoteValidator,
} from '../../validators/remote/remote.validator';
import { emailValidator } from '../../validators/email/email.validator';
import { nameValidator } from '../../validators/name/name.validator';

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
  standalone: true,
  imports: [
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

  maxPasswordLength = UserConfigs.PASSWORD_MAX_LENGTH;
  maxEmailLength = EmailConstants.MAX_LENGTH;
  maxUsernameLength = UserConfigs.NAME_MAX_LENGTH;

  showPassword: boolean = false;
  showRepeatPassword: boolean = false;

  nameRemoteValidationContext: RemoteValidationContext = {};
  emailRemoteValidationContext: RemoteValidationContext = {};
  passwordRemoteValidationContext: RemoteValidationContext = {};
  repeatPasswordRemoteValidationContext: RemoteValidationContext = {};
  acceptTermsRemoteValidationContext: RemoteValidationContext = {};

  form = new FormGroup({
    name: new FormControl('', {
      validators: [
        nameValidator({
          required: true,
          minlength: UserConfigs.NAME_MIN_LENGTH,
          maxlength: UserConfigs.NAME_MAX_LENGTH,
        }),
        remoteValidator(this.nameRemoteValidationContext),
      ],
      updateOn: 'change',
    }),
    email: new FormControl('', {
      validators: [
        Validators.required, // mover para o validador
        emailValidator(),
        remoteValidator(this.emailRemoteValidationContext),
      ],
      updateOn: 'change',
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(UserConfigs.PASSWORD_MIN_LENGTH),
        Validators.maxLength(UserConfigs.PASSWORD_MAX_LENGTH),
        strongPasswordValidator(),
        remoteValidator(this.passwordRemoteValidationContext),
      ],
      updateOn: 'change',
    }),
    repeatPassword: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(UserConfigs.PASSWORD_MAX_LENGTH),
        matchingFieldsValidator('password'),
        remoteValidator(this.repeatPasswordRemoteValidationContext),
      ],
      updateOn: 'change',
    }),
    acceptTerms: new FormControl(false, {
      validators: [
        Validators.requiredTrue,
        remoteValidator(this.acceptTermsRemoteValidationContext),
      ],
      updateOn: 'change',
    }),
  });

  protected onSubmit() {
    this.submitted = true;
    if (!this.form.valid) {
      return;
    }
    this.form.updateValueAndValidity();

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
        this.router.navigate(['/login']);
      },
    });
  }

  protected getNameErrorMessage() {
    const nameFormControl: FormControl = this.form.controls.name;

    if (nameFormControl.hasError('null')) {
      return _NameMessage.NULL;
    }
    if (nameFormControl.hasError('required')) {
      return _NameMessage.REQUIRED;
    }
    if (nameFormControl.hasError('name')) {
      return _NameMessage.INVALID;
    }
    if (nameFormControl.hasError('minlength')) {
      return _NameMessage.MIN_LEN;
    }
    if (nameFormControl.hasError('maxlength')) {
      return _NameMessage.MAX_LEN;
    }
    if (nameFormControl.hasError('remote')) {
      return this.nameRemoteValidationContext.remoteError;
    }
    return '';
  }

  protected getEmailErrorMessage() {
    const emailFormControl = this.form.controls.email;
    if (emailFormControl.hasError('null')) {
      return _EmailMessage.NULL;
    }
    if (emailFormControl.hasError('required')) {
      return _EmailMessage.REQUIRED;
    }
    if (emailFormControl.hasError('email')) {
      return _EmailMessage.INVALID;
    }
    if (emailFormControl.hasError('minlength')) {
      return _EmailMessage.MIN_LEN;
    }
    if (emailFormControl.hasError('maxlength')) {
      return _EmailMessage.MAX_LEN;
    }
    if (emailFormControl.hasError('remote')) {
      return this.emailRemoteValidationContext.remoteError;
    }

    return '';
  }

  protected getPasswordErrorMessage() {
    const passwordFormControl = this.form.controls.password;

    if (passwordFormControl.hasError('null')) {
      return _PasswordMessage.NULL;
    }
    if (passwordFormControl.hasError('required')) {
      return _PasswordMessage.REQUIRED;
    }
    if (passwordFormControl.hasError('weakPassword')) {
      return _PasswordMessage.STRONG;
    }
    if (passwordFormControl.hasError('minlength')) {
      return _PasswordMessage.MIN_LEN;
    }
    if (passwordFormControl.hasError('maxlength')) {
      return _PasswordMessage.MAX_LEN;
    }
    if (passwordFormControl.hasError('invalidPassword')) {
      return _PasswordMessage.INVALID;
    }
    if (passwordFormControl.hasError('remote')) {
      return this.passwordRemoteValidationContext.remoteError;
    }
    return '';
  }

  protected getRepeatPasswordErrorMessage() {
    const repeatPasswordFormControl = this.form.controls.repeatPassword;
    if (repeatPasswordFormControl.hasError('required')) {
      return _PasswordMessage.REQUIRED;
    }
    if (repeatPasswordFormControl.hasError('matchingFields')) {
      return _PasswordMessage.DONT_MATCHES;
    }
    if (repeatPasswordFormControl.hasError('maxlength')) {
      return _PasswordMessage.MAX_LEN;
    }
    if (repeatPasswordFormControl.hasError('remote')) {
      return this.repeatPasswordRemoteValidationContext.remoteError;
    }
    return '';
  }

  protected get acceptTermsHasError() {
    const acceptTerms = this.form.controls.acceptTerms;
    return (
      (acceptTerms.hasError('required') || acceptTerms.hasError('remote')) &&
      (!acceptTerms.pristine || this.submitted)
    );
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

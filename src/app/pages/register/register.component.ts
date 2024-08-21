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
  ValidatorFn,
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
import { debounceTime, tap } from 'rxjs';

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

  protected maxPasswordLength = UserConfigs.PASSWORD_MAX_LENGTH;
  protected maxEmailLength = EmailConstants.MAX_LENGTH;
  protected maxUsernameLength = UserConfigs.NAME_MAX_LENGTH;

  protected showPassword: boolean = false;
  protected showRepeatPassword: boolean = false;

  protected acceptTermsBlurred = false;

  protected nameRemoteValidationContext: RemoteValidationContext = {};
  protected emailRemoteValidationContext: RemoteValidationContext = {};
  protected passwordRemoteValidationContext: RemoteValidationContext = {};
  protected repeatPasswordRemoteValidationContext: RemoteValidationContext = {};
  protected acceptTermsRemoteValidationContext: RemoteValidationContext = {};

  form = new FormGroup({
    name: new FormControl('', {
      validators: this.nameValidators,
      updateOn: 'blur',
    }),
    email: new FormControl('', {
      validators: this.emailValidators,
      updateOn: 'blur',
    }),
    password: new FormControl('', {
      validators: this.passwordValidators,
      updateOn: 'blur',
    }),
    repeatPassword: new FormControl('', {
      validators: this.repeatPasswordValidators,
      updateOn: 'blur',
    }),
    acceptTerms: new FormControl(false, {
      validators: this.acceptTermsValidator,
      updateOn: 'blur',
    }),
  });

  protected get nameValidators() {
    return [
      nameValidator({
        required: true,
        minlength: UserConfigs.NAME_MIN_LENGTH,
        maxlength: UserConfigs.NAME_MAX_LENGTH,
      }),
      remoteValidator(this.nameRemoteValidationContext),
    ];
  }

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

  protected get repeatPasswordValidators() {
    return [
      Validators.required,
      Validators.maxLength(UserConfigs.PASSWORD_MAX_LENGTH),
      matchingFieldsValidator('password'),
      remoteValidator(this.repeatPasswordRemoteValidationContext),
    ];
  }

  protected get acceptTermsValidator() {
    return [
      Validators.requiredTrue,
      remoteValidator(this.acceptTermsRemoteValidationContext),
    ];
  }

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

    let nameError: string | null | undefined = '';
    if (nameFormControl.hasError('null')) {
      nameError = _NameMessage.NULL;
    } else if (nameFormControl.hasError('required')) {
      nameError = _NameMessage.REQUIRED;
    } else if (nameFormControl.hasError('name')) {
      nameError = _NameMessage.INVALID;
    } else if (nameFormControl.hasError('minlength')) {
      nameError = _NameMessage.MIN_LEN;
    } else if (nameFormControl.hasError('maxlength')) {
      nameError = _NameMessage.MAX_LEN;
    } else if (nameFormControl.hasError('remote')) {
      nameError = this.nameRemoteValidationContext.remoteError;
    }
    return nameError;
  }

  protected onPasswordBlur(e: FocusEvent) {
    this.form.controls.repeatPassword.updateValueAndValidity({
      emitEvent: false,
    });
  }

  protected getEmailErrorMessage() {
    const emailFormControl = this.form.controls.email;
    let emailError: string | null | undefined = '';
    if (emailFormControl.hasError('null')) {
      emailError = _EmailMessage.NULL;
    } else if (emailFormControl.hasError('required')) {
      emailError = _EmailMessage.REQUIRED;
    } else if (emailFormControl.hasError('email')) {
      emailError = _EmailMessage.INVALID;
    } else if (emailFormControl.hasError('minlength')) {
      emailError = _EmailMessage.MIN_LEN;
    } else if (emailFormControl.hasError('maxlength')) {
      emailError = _EmailMessage.MAX_LEN;
    } else if (emailFormControl.hasError('remote')) {
      emailError = this.emailRemoteValidationContext.remoteError;
    }

    return emailError;
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
    const required = acceptTerms.hasError('required');
    const hasError = acceptTerms.hasError('remote');
    const pristine = acceptTerms.pristine;
    const submitted = this.submitted;

    const blurred = this.acceptTermsBlurred;

    const showError =
      (required || hasError) && (!pristine || submitted || blurred);

    return showError;
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

import { Component, inject } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from '../../components/alert/alert.component';
import { UserConfigs } from '../../configs/user/user.configs';
import { PasswordMessage } from '../../messages/password/password.messages';
import { AuthService } from '../../services/auth/auth.service';
import { AuthResponseDto } from '../../services/auth/dtos/auth.response.dto';
import { NewPasswordRequestDto } from '../../services/auth/dtos/new-password.request.dto';
import { matchingPasswordValidator } from '../../validators/matching-password/matching-password.validator';
import {
    RemoteValidationContext,
    remoteValidator,
} from '../../validators/remote/remote.validator';
import { strongPasswordValidator } from '../../validators/strong-password/strong-password.validator';

const _PasswordMessage = new PasswordMessage({
    minLength: UserConfigs.PASSWORD_MIN_LENGTH,
    maxLength: UserConfigs.PASSWORD_MAX_LENGTH,
});

@Component({
    selector: 'app-password',
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
    templateUrl: './new-password.component.html',
    styleUrl: './new-password.component.scss',
})
export class NewPasswordComponent {
    private authService: AuthService = inject(AuthService);
    private router: Router = inject(Router);

    protected data?: any;
    protected mainError?: string;
    protected loading: boolean = false;

    protected maxPasswordLength = UserConfigs.PASSWORD_MAX_LENGTH;

    protected showPassword: boolean = false;
    protected showRepeatPassword: boolean = false;

    protected hashRemoteValidationContext: RemoteValidationContext = {};
    protected passwordRemoteValidationContext: RemoteValidationContext = {};
    protected repeatPasswordRemoteValidationContext: RemoteValidationContext =
        {};

    form = new FormGroup({
        hash: new FormControl('', {}),
        password: new FormControl('', {
            validators: this.passwordValidators,
            updateOn: 'blur',
        }),
        repeatPassword: new FormControl('', {
            validators: this.repeatPasswordValidators,
            updateOn: 'blur',
        }),
    });

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            const hash = params['hash'] || null;
            this.form.controls.hash.setValue(hash);
        });
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
            matchingPasswordValidator('password'),
            remoteValidator(this.repeatPasswordRemoteValidationContext),
        ];
    }

    protected onSubmit() {
        if (!this.form.valid) {
            return;
        }
        this.form.updateValueAndValidity();

        const data = this.form.getRawValue() as NewPasswordRequestDto;
        this.mainError = undefined;

        this.loading = true;
        this.form.disable();

        const observable = this.authService.createNewPassword(data);

        this.passwordRemoteValidationContext.remoteError = undefined;
        this.repeatPasswordRemoteValidationContext.remoteError = undefined;

        this.form.updateValueAndValidity();

        this.mainError = undefined;

        observable.subscribe({
            next: (authResponse: AuthResponseDto) => {
                this.loading = false;
            },
            error: (remoteError: any) => {
                if (typeof remoteError == 'string') {
                    this.mainError = remoteError;
                    this.loading = false;
                } else if (typeof remoteError.error?.message == 'string') {
                    this.mainError = remoteError.error.message;
                } else {
                    // hash
                    if (remoteError.error?.message?.hash) {
                        this.mainError = remoteError.error?.message.hash;
                    }

                    // password
                    if (remoteError.error?.message?.password) {
                        this.passwordRemoteValidationContext.remoteError =
                            remoteError.error?.message.password;
                    }

                    // repeat password
                    if (remoteError.error?.message?.repeatPassword) {
                        this.repeatPasswordRemoteValidationContext.remoteError =
                            remoteError.error?.message.repeatPassword;
                    }

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

    protected onPasswordBlur(e: FocusEvent) {
        this.form.controls.repeatPassword.updateValueAndValidity({
            emitEvent: false,
        });
    }

    protected getPasswordErrorMessage() {
        const passwordFormControl = this.form.controls.password;

        let passwordErrorMessage = '';
        if (passwordFormControl.hasError('null')) {
            passwordErrorMessage = _PasswordMessage.NULL;
        } else if (passwordFormControl.hasError('required')) {
            passwordErrorMessage = _PasswordMessage.REQUIRED;
        } else if (passwordFormControl.hasError('weakPassword')) {
            passwordErrorMessage = _PasswordMessage.STRONG as string;
        } else if (passwordFormControl.hasError('minlength')) {
            passwordErrorMessage = _PasswordMessage.MIN_LEN as string;
        } else if (passwordFormControl.hasError('maxlength')) {
            passwordErrorMessage = _PasswordMessage.MAX_LEN as string;
        } else if (passwordFormControl.hasError('invalidPassword')) {
            passwordErrorMessage = _PasswordMessage.INVALID;
        } else if (passwordFormControl.hasError('remote')) {
            passwordErrorMessage = this.passwordRemoteValidationContext
                .remoteError as string;
        }
        return passwordErrorMessage;
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

    protected togglePasswordVisibility(event: Event) {
        event.stopPropagation();
        this.showPassword = !this.showPassword;
    }

    protected toggleRepeatPasswordVisibility(event: Event) {
        event.stopPropagation();
        this.showRepeatPassword = !this.showRepeatPassword;
    }
}

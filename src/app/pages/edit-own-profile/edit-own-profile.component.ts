import { Component, inject } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { AlertComponent } from '../../components/alert/alert.component';
import { UserConfigs } from '../../configs/user/user.configs';
import { EmailConstants } from '../../constants/email/email.constants';
import { EmailMessage } from '../../messages/email/email.messages';
import { PasswordMessage } from '../../messages/password/password.messages';
import { TextMessage } from '../../messages/text/text.messages';
import { AuthService } from '../../services/auth/auth.service';
import { EditOwnProfileRequestDto } from '../../services/auth/dtos/edit-own-profile.request.dto';
import { nameValidator } from '../../validators/name/name.validator';
import {
    RemoteValidationContext,
    remoteValidator,
} from '../../validators/remote/remote.validator';

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
    selector: 'app-edit-own-profile',
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
    templateUrl: './edit-own-profile.component.html',
    styleUrl: './edit-own-profile.component.scss',
})
export class EditOwnProfileComponent {
    private authService: AuthService = inject(AuthService);
    private router: Router = inject(Router);

    protected data?: any;
    protected mainError?: string;
    protected loading: boolean = false;

    protected maxPasswordLength = UserConfigs.PASSWORD_MAX_LENGTH;
    protected maxEmailLength = EmailConstants.MAX_LENGTH;
    protected maxUsernameLength = UserConfigs.NAME_MAX_LENGTH;

    protected nameRemoteValidationContext: RemoteValidationContext = {};

    form = new FormGroup({
        name: new FormControl('', {
            validators: this.nameValidators,
            updateOn: 'blur',
        }),
    });

    protected get nameValidators() {
        return [
            nameValidator({
                required: true,
                minLength: UserConfigs.NAME_MIN_LENGTH,
                maxLength: UserConfigs.NAME_MAX_LENGTH,
            }),
            remoteValidator(this.nameRemoteValidationContext),
        ];
    }

    protected onSubmit() {
        if (!this.form.valid) {
            return;
        }
        this.form.updateValueAndValidity();

        const data = this.form.getRawValue() as EditOwnProfileRequestDto;
        this.mainError = undefined;

        this.loading = true;
        this.form.disable();

        const observable = this.authService.editOwnProfile(data);

        this.nameRemoteValidationContext.remoteError = undefined;
        this.form.updateValueAndValidity();

        observable.subscribe({
            next: (response: true) => {
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

                    this.mainError = undefined;
                    this.form.updateValueAndValidity();
                    this.form.markAllAsTouched();
                }

                this.form.enable();
            },
            complete: () => {
                this.mainError = undefined;
                this.loading = false;
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
}

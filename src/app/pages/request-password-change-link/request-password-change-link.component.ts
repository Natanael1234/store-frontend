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
import { Router } from '@angular/router';
import { AlertComponent } from '../../components/alert/alert.component';
import { EmailConstants } from '../../constants/email/email.constants';
import { EmailMessage } from '../../messages/email/email.messages';
import { AuthService } from '../../services/auth/auth.service';
import { RequestPasswordChangeLinkRequestDto } from '../../services/auth/dtos/request-password-creation-link.request.dto';
import { emailValidator } from '../../validators/email/email.validator';
import {
    RemoteValidationContext,
    remoteValidator,
} from '../../validators/remote/remote.validator';

const _EmailMessage = new EmailMessage({
    maxLength: EmailConstants.MAX_LENGTH,
});

@Component({
    selector: 'app-request-password-change',
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
    templateUrl: './request-password-change-link.component.html',
    styleUrl: './request-password-change-link.component.scss',
})
export class RequestPasswordChangeLinkComponent {
    private authService: AuthService = inject(AuthService);
    private router: Router = inject(Router);

    protected data?: any;
    protected mainError?: string;
    protected loading: boolean = false;

    protected maxEmailLength = EmailConstants.MAX_LENGTH;

    protected emailRemoteValidationContext: RemoteValidationContext = {};

    form = new FormGroup({
        email: new FormControl('', {
            validators: [
                emailValidator({ required: true }),
                remoteValidator(this.emailRemoteValidationContext),
            ],
            updateOn: 'blur',
        }),
    });

    protected onSubmit() {
        if (!this.form.valid) {
            return;
        }
        this.form.updateValueAndValidity();

        const data =
            this.form.getRawValue() as RequestPasswordChangeLinkRequestDto;
        this.mainError = undefined;

        this.loading = true;
        this.form.disable();

        const observable = this.authService.requestPasswordChangeLink(data);

        this.emailRemoteValidationContext.remoteError = undefined;

        this.form.updateValueAndValidity();

        observable.subscribe({
            next: (authResponse: boolean) => {
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
            emailErrorMessage = _EmailMessage.INVALID;
        } else if (emailFormControl.hasError('maxlength')) {
            emailErrorMessage = _EmailMessage.INVALID;
        } else if (emailFormControl.hasError('remote')) {
            emailErrorMessage = this.emailRemoteValidationContext.remoteError;
        }

        return emailErrorMessage;
    }
}

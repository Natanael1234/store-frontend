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
import { TextFieldComponent } from '../../components/form/components/text/text-field/text-field.component';
import { AuthService } from '../../services/auth/auth.service';
import { RequestPasswordChangeLinkRequestDto } from '../../services/auth/dtos/request-password-creation-link.request.dto';
import { emailValidator } from '../../validators/email/email.validator';
import {
    RemoteValidationContext,
    remoteValidator,
} from '../../validators/remote/remote.validator';
import { AbstractFormComponent } from '../abstract-form.component';

@Component({
    selector: 'app-request-password-change',
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        AlertComponent,
        MatProgressBarModule,
        TextFieldComponent,
        ButtonComponent,
    ],
    templateUrl: './request-password-change-link.component.html',
    styleUrl: './request-password-change-link.component.scss',
})
export class RequestPasswordChangeLinkComponent extends AbstractFormComponent<
    RequestPasswordChangeLinkRequestDto,
    any
> {
    private authService: AuthService = inject(AuthService);
    protected emailRemoteValidationContext = new RemoteValidationContext();

    formGroup = new FormGroup({
        email: new FormControl('', {
            validators: [
                emailValidator({ required: true }),
                remoteValidator(this.emailRemoteValidationContext),
            ],
            updateOn: 'blur',
        }),
    });

    protected override navigateAfterComplete(): void {
        this.navigateToHome();
    }

    protected fireSubmitRequest() {
        const data = this.getFormData();
        return this.authService.requestPasswordChangeLink(data);
    }

    protected setRemoteErrors(errors: {
        main?: string;
        email?: string;
        password?: string;
    }): void {
        const { main, email } = errors;
        this.mainError = main;
        this.emailRemoteValidationContext.setError(email);
        this.formGroup.updateValueAndValidity();
        this.formGroup.markAllAsTouched();
    }

    protected clearRemoteErrors(): void {
        this.mainError = undefined;
        this.emailRemoteValidationContext.clear();
        this.formGroup.updateValueAndValidity();
    }
}

import { Component, inject } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AlertComponent } from '@components/alert/alert.component';
import { ButtonComponent } from '@components/form/components/button/button.component';
import { PasswordFieldComponent } from '@components/form/components/text/password-field/password-field.component';
import { AbstractFormComponent } from '@pages/abstract-form.component';
import { AuthService } from '@services/auth/auth.service';
import { AuthResponseDto } from '@services/auth/dtos/auth.response.dto';
import { NewPasswordRequestDto } from '@services/auth/dtos/new-password.request.dto';
import { matchingPasswordValidator } from '@validators/matching-password/matching-password.validator';
import {
    RemoteValidationContext,
    remoteValidator,
} from '@validators/remote/remote.validator';
import { strongPasswordValidator } from '@validators/strong-password/strong-password.validator';

@Component({
    selector: 'app-new-password',
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        AlertComponent,
        MatProgressBarModule,
        PasswordFieldComponent,
        ButtonComponent,
    ],
    templateUrl: './new-password.component.html',
    styleUrl: './new-password.component.scss',
})
export class NewPasswordComponent extends AbstractFormComponent<
    NewPasswordRequestDto,
    AuthResponseDto
> {
    private authService: AuthService = inject(AuthService);
    private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

    protected hashRemoteValidationContext = new RemoteValidationContext();
    protected passwordRemoteValidationContext = new RemoteValidationContext();
    protected repeatPasswordRemoteValidationContext =
        new RemoteValidationContext();

    protected formGroup = new FormGroup({
        hash: new FormControl('', {}),
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
    });

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            const hash = params['hash'] || null;
            this.formGroup.controls.hash.setValue(hash);
        });
    }

    protected override navigateAfterComplete(): void {
        this.navigateToLogin();
    }

    protected fireSubmitRequest() {
        const data = this.getFormData();
        return this.authService.createNewPassword(data);
    }

    protected setRemoteErrors(errors: {
        main?: string;
        password?: string;
        repeatPassword?: string;
    }): void {
        const { main, password, repeatPassword } = errors;
        this.mainError = main;
        this.passwordRemoteValidationContext.setError(password);
        this.repeatPasswordRemoteValidationContext.setError(repeatPassword);
        this.formGroup.updateValueAndValidity();
        this.formGroup.markAllAsTouched();
    }

    protected clearRemoteErrors(): void {
        this.mainError = undefined;
        this.passwordRemoteValidationContext.clear();
        this.repeatPasswordRemoteValidationContext.clear();
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

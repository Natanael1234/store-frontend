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
import { TextFieldComponent } from '@components/form/components/text/text-field/text-field.component';
import { UserConfigs } from '@configs/user/user.configs';
import { AbstractFormComponent } from '@pages/abstract-form.component';
import { AuthService } from '@services/auth/auth.service';
import { EditOwnProfileRequestDto } from '@services/auth/dtos/edit-own-profile.request.dto';
import { nameValidator } from '@validators/name/name.validator';
import {
    RemoteValidationContext,
    remoteValidator,
} from '@validators/remote/remote.validator';

@Component({
    selector: 'app-edit-own-profile',
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
    templateUrl: './edit-own-profile.component.html',
    styleUrl: './edit-own-profile.component.scss',
})
export class EditOwnProfileComponent extends AbstractFormComponent<
    EditOwnProfileRequestDto,
    true
> {
    private authService: AuthService = inject(AuthService);
    protected nameRemoteValidationContext = new RemoteValidationContext();
    protected formGroup = new FormGroup({
        name: new FormControl('', {
            validators: [
                nameValidator({
                    required: true,
                    minLength: UserConfigs.NAME_MIN_LENGTH,
                    maxLength: UserConfigs.NAME_MAX_LENGTH,
                }),
                remoteValidator(this.nameRemoteValidationContext),
            ],
            updateOn: 'blur',
        }),
    });

    protected override navigateAfterComplete(): void {
        this.navigateToHome();
    }

    protected fireSubmitRequest() {
        const data = this.getFormData();
        return this.authService.editOwnProfile(data);
    }

    protected setRemoteErrors(errors: {
        main?: string;
        name?: string;
        email?: string;
        password?: string;
        repeatPassword?: string;
        acceptTerms?: boolean;
    }): void {
        const { main, name } = errors;
        this.mainError = main;
        this.nameRemoteValidationContext.setError(name);
        this.formGroup.markAllAsTouched();
    }

    protected clearRemoteErrors(): void {
        this.mainError = undefined;
        this.nameRemoteValidationContext.clear();
        this.formGroup.updateValueAndValidity();
    }
}

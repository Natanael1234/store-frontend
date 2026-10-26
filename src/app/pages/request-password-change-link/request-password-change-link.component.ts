import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { AlertComponent } from '@components/alert/alert.component';
import { ButtonComponent } from '@components/form/components/button/button.component';
import { TextFieldComponent } from '@components/form/components/text/text-field/text-field.component';
import { Icon } from '@enums/icons/icons.enum';
import { AbstractFormComponent } from '@pages/abstract-form.component';
import { AuthService } from '@services/auth/auth.service';
import { RequestPasswordChangeLinkRequestDto } from '@services/auth/dtos/request-password-creation-link.request.dto';
import { emailValidator } from '@validators/email/email.validator';
import { RemoteValidationContext, remoteValidator } from '@validators/remote/remote.validator';

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
    template: `
        <form [formGroup]="formGroup" class="grid">
            <!-- loading progress -->
            @if (loading()) {
                <div [attr.col]="12">
                    <mat-progress-bar mode="indeterminate"></mat-progress-bar>
                </div>
            }

            <!-- main error -->
            @if (mainError()) {
                <div [attr.col]="12">
                    <app-alert
                        [showCloseButton]="true"
                        type="danger"
                        [icon]="Icon.warning"
                        (onClose)="mainError.set(undefined)">
                        {{ mainError() }}
                    </app-alert>
                </div>
            }

            <!-- email -->
            <div [attr.col]="12">
                <app-text-field
                    id="email-input"
                    [mask]="TextMask.email"
                    label="Email"
                    [inputMode]="InputMode.email"
                    [control]="formGroup.controls.email"
                    [format]="TextFormat.email"
                    [autocomplete]="AutoCompleteType.on"
                    [maxLength]="EmailConstants.MAX_LENGTH" />
            </div>

            <!-- request button -->
            <div [attr.col]="12">
                <app-button
                    id="request-button"
                    [type]="FormElementType.button"
                    label="Mudar senha"
                    [appearance]="ButtonAppearance.filled"
                    [disabled]="loading()"
                    (onClick)="onSubmit()" />
            </div>

            <!-- cancel button -->
            <div [attr.col]="12">
                <app-button
                    id="cancel-button"
                    [type]="FormElementType.button"
                    label="Cancelar"
                    [appearance]="ButtonAppearance.outlined"
                    [disabled]="loading()"
                    routerLink="/" />
            </div>
        </form>
    `,
})
export class RequestPasswordChangeLinkComponent extends AbstractFormComponent<
    RequestPasswordChangeLinkRequestDto,
    any
> {
    protected Icon = Icon;

    private readonly authService = inject(AuthService);
    protected readonly emailRemoteValidationContext = new RemoteValidationContext();

    protected readonly formGroup = new FormGroup({
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

    protected setRemoteErrors(errors: { main?: string; email?: string; password?: string }): void {
        const { main, email } = errors;
        this.mainError.set(main);
        this.emailRemoteValidationContext.setError(email);
        this.formGroup.updateValueAndValidity();
        this.formGroup.markAllAsTouched();
    }

    protected clearRemoteErrors(): void {
        this.mainError.set(undefined);
        this.emailRemoteValidationContext.clear();
        this.formGroup.updateValueAndValidity();
    }
}

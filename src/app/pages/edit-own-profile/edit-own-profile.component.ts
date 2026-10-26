import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { AlertComponent } from '@components/alert/alert.component';
import { ButtonComponent } from '@components/form/components/button/button.component';
import { TextFieldComponent } from '@components/form/components/text/text-field/text-field.component';
import { UserConfigs } from '@configs/user/user.configs';
import { Icon } from '@enums/icons/icons.enum';
import { AbstractFormComponent } from '@pages/abstract-form.component';
import { AuthService } from '@services/auth/auth.service';
import { EditOwnProfileRequestDto } from '@services/auth/dtos/edit-own-profile.request.dto';
import { nameValidator } from '@validators/name/name.validator';
import { RemoteValidationContext, remoteValidator } from '@validators/remote/remote.validator';

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
    template: `
        <form [formGroup]="formGroup" class="grid">
            <!-- loading progress TODO: mover para a barra principal? -->
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

            <!-- name -->
            <div [attr.col]="12">
                <app-text-field
                    id="name-input"
                    label="Nome"
                    [control]="formGroup.controls.name"
                    [autofocus]="true"
                    [format]="TextFormat.text"
                    [minLength]="UserConfigs.NAME_MIN_LENGTH"
                    [maxLength]="UserConfigs.NAME_MAX_LENGTH" />
            </div>

            <!-- save button -->
            <div [attr.col]="12">
                <app-button
                    id="save-button"
                    [type]="FormElementType.button"
                    label="Salvar"
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
export class EditOwnProfileComponent extends AbstractFormComponent<
    EditOwnProfileRequestDto,
    boolean
> {
    protected readonly Icon = Icon;

    private readonly authService = inject(AuthService);

    protected readonly nameRemoteValidationContext = new RemoteValidationContext();

    protected readonly formGroup = new FormGroup({
        name: new FormControl('', {
            nonNullable: true,
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

    protected setRemoteErrors(errors: { main?: string; name?: string }): void {
        const { main, name } = errors;
        this.mainError.set(main);
        this.nameRemoteValidationContext.setError(name);
        this.formGroup.markAllAsTouched();
    }

    protected clearRemoteErrors(): void {
        this.mainError.set(undefined);
        this.nameRemoteValidationContext.clear();
        this.formGroup.updateValueAndValidity();
    }
}

import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ButtonAppearance } from '../components/form/components/button/enum/appearance/button-appearance.enum';
import { AutoCompleteType } from '../components/form/enums/auto-complete-type/auto-complete-type.enum';
import { FormElementType } from '../components/form/enums/form-element-type/form-element-type.enum';
import { InputMode } from '../components/form/enums/input-mode/input-mode.enum';
import { TextFormat } from '../components/form/enums/text-format/text-format.enum';
import { TextMask } from '../components/form/enums/text-mask/text-mask.enum';
import { UserConfigs } from '../configs/user/user.configs';
import { EmailConstants } from '../constants/email/email.constants';

export abstract class AbstractFormComponent<FormDataDto, RequestResponseDto> {
    protected abstract formGroup: FormGroup;
    protected loading: boolean = false;
    protected mainError?: string;
    protected router: Router = inject(Router);

    protected TextFormat = TextFormat;
    protected TextMask = TextMask;
    protected AutoCompleteType = AutoCompleteType;
    protected ButtonAppearance = ButtonAppearance;
    protected FormElementType = FormElementType;
    protected InputMode = InputMode;
    protected EmailConstants = EmailConstants;
    protected UserConfigs = UserConfigs;

    protected onSubmit() {
        if (!this.canSubmit()) {
            return;
        }
        this.onBeforeSubmit();
        const observable = this.fireSubmitRequest();
        this.clearRemoteErrors();
        observable.subscribe({
            next: (authResponse) => this.onSubmitNext(authResponse),
            error: (error: HttpErrorResponse) => this.onSubmitError(error),
            complete: () => this.onSubmitComplete(),
        });
    }

    protected canSubmit() {
        this.formGroup.updateValueAndValidity();
        return this.isFormValid();
    }

    protected onBeforeSubmit() {
        this.startLoading();
        this.disableForm();
    }

    protected onSubmitNext(authResponse: RequestResponseDto) {
        // this.stopLoading();
    }

    protected onSubmitComplete() {
        this.clearRemoteErrors();
        this.resetForm();
        this.stopLoading();
        this.navigateAfterComplete();
    }

    protected onSubmitError(error: HttpErrorResponse) {
        if (typeof error == 'string') {
            this.setRemoteErrors({ main: error });
        } else if (typeof error.error?.message == 'string') {
            this.setRemoteErrors({ main: error.error.message });
        } else {
            this.setRemoteErrors(error.error?.message ?? {});
        }
        this.enableform();
        this.stopLoading();
    }

    protected navigateAfterComplete(): void {}

    protected disableForm() {
        this.formGroup.disable();
    }

    protected enableform() {
        this.formGroup.enable();
    }

    protected resetForm() {
        this.formGroup.reset();
    }

    protected isFormValid() {
        return this.formGroup.valid;
    }

    protected abstract fireSubmitRequest(): Observable<RequestResponseDto>;

    protected getFormData() {
        return this.formGroup.getRawValue() as FormDataDto;
    }

    protected navigateToHome() {
        this.navigateTo(['/']);
    }

    protected navigateToLogin() {
        this.navigateTo(['/login']);
    }

    protected navigateToRegister() {
        this.navigateTo(['/register']);
    }

    protected navigateTo(commands: readonly any[], extras?: NavigationExtras) {
        if (extras) {
            return this.router.navigate(commands, extras);
        } else {
            return this.router.navigate(commands);
        }
    }

    protected abstract setRemoteErrors(errors?: any): void;

    protected abstract clearRemoteErrors(): void;

    protected startLoading(): void {
        this.loading = true;
    }

    protected stopLoading(): void {
        this.loading = false;
    }
}

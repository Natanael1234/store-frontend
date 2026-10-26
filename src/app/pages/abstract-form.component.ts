import { HttpErrorResponse } from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ButtonAppearance } from '@components/form/components/button/enum/appearance/button-appearance.enum';
import { AutoCompleteType } from '@components/form/enums/auto-complete-type/auto-complete-type.enum';
import { FormElementType } from '@components/form/enums/form-element-type/form-element-type.enum';
import { InputMode } from '@components/form/enums/input-mode/input-mode.enum';
import { TextFormat } from '@components/form/enums/text-format/text-format.enum';
import { TextMask } from '@components/form/enums/text-mask/text-mask.enum';
import { UserConfigs } from '@configs/user/user.configs';
import { EmailConstants } from '@constants/email/email.constants';
import { Observable } from 'rxjs';

export abstract class AbstractFormComponent<FormDataDto, RequestResponseDto> {
    protected abstract formGroup: FormGroup;

    protected readonly loading = signal<boolean>(false);
    protected readonly mainError = signal<string | undefined>(undefined);

    protected readonly router = inject(Router);

    // Proteção contra vazamento de memória (Memory Leak) ao destruir o componente
    // Nota: Requer que a classe seja instanciada no contexto de injeção (o que é padrão em componentes Angular)
    // protected readonly destroyRef = inject(DestroyRef);

    // Exposição de Enums e Constantes para templates
    protected readonly TextFormat = TextFormat;
    protected readonly TextMask = TextMask;
    protected readonly AutoCompleteType = AutoCompleteType;
    protected readonly ButtonAppearance = ButtonAppearance;
    protected readonly FormElementType = FormElementType;
    protected readonly InputMode = InputMode;
    protected readonly EmailConstants = EmailConstants;
    protected readonly UserConfigs = UserConfigs;

    protected onSubmit(): void {
        if (!this.canSubmit()) {
            return;
        }
        this.onBeforeSubmit();

        this.clearRemoteErrors();

        this.fireSubmitRequest()
            // .pipe(takeUntilDestroyed()) // Adicionar se desejar segurança contra unsubscription pendente
            .subscribe({
                next: (authResponse) => this.onSubmitNext(authResponse),
                error: (error: HttpErrorResponse) => this.onSubmitError(error),
                complete: () => this.onSubmitComplete(),
            });
    }

    protected canSubmit(): boolean {
        this.formGroup.updateValueAndValidity();
        return this.isFormValid();
    }

    protected onBeforeSubmit(): void {
        this.startLoading();
        this.disableForm();
    }

    protected onSubmitNext(authResponse: RequestResponseDto): void {
        // Hook opcional
        // this.stopLoading();
    }

    protected onSubmitComplete(): void {
        this.clearRemoteErrors();
        this.resetForm();
        this.stopLoading();
        this.navigateAfterComplete();
    }

    protected onSubmitError(error: HttpErrorResponse): void {
        if (typeof error === 'string') {
            this.setRemoteErrors({ main: error });
        } else if (typeof error.error?.message === 'string') {
            this.setRemoteErrors({ main: error.error.message });
        } else {
            this.setRemoteErrors(error.error?.message ?? {});
        }
        this.enableForm();
        this.stopLoading();
    }

    protected navigateAfterComplete(): void {}

    protected disableForm(): void {
        this.formGroup.disable();
    }

    protected enableForm(): void {
        this.formGroup.enable();
    }

    protected resetForm(): void {
        this.formGroup.reset();
    }

    protected isFormValid(): boolean {
        return this.formGroup.valid;
    }

    protected abstract fireSubmitRequest(): Observable<RequestResponseDto>;

    protected getFormData(): FormDataDto {
        return this.formGroup.getRawValue() as FormDataDto;
    }

    protected navigateToHome(): Promise<boolean> {
        return this.navigateTo(['/']);
    }

    protected navigateToLogin(): Promise<boolean> {
        return this.navigateTo(['/login']);
    }

    protected navigateToRegister(): Promise<boolean> {
        return this.navigateTo(['/register']);
    }

    protected navigateTo(commands: readonly any[], extras?: NavigationExtras): Promise<boolean> {
        return extras ? this.router.navigate(commands, extras) : this.router.navigate(commands);
    }

    protected abstract setRemoteErrors(errors?: any): void;

    protected abstract clearRemoteErrors(): void;

    protected startLoading(): void {
        this.loading.set(true);
    }

    protected stopLoading(): void {
        this.loading.set(false);
    }
}

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Location } from '@angular/common';
import { HttpStatusCode } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavigationExtras, provideRouter, Router } from '@angular/router';
import { AlertComponent } from '@components/alert/alert.component';
import { ButtonComponent } from '@components/form/components/button/button.component';
import { ButtonAppearance } from '@components/form/components/button/enum/appearance/button-appearance.enum';
import { TextFieldComponent } from '@components/form/components/text/text-field/text-field.component';
import { AutoCompleteType } from '@components/form/enums/auto-complete-type/auto-complete-type.enum';
import { TextFormat } from '@components/form/enums/text-format/text-format.enum';
import { UserConfigs } from '@configs/user/user.configs';
import { EmailConstants } from '@constants/email/email.constants';
import { ExceptionName } from '@enums/exception-names/exception-text.enum';
import { LoginComponent } from '@pages/login/login.component';
import { RequestPasswordChangeLinkComponent } from '@pages/request-password-change-link/request-password-change-link.component';
import { RequestPasswordLinkHarness } from '@pages/request-password-change-link/request-password-link.harness';
import { AuthService } from '@services/auth/auth.service';
import { of, Subject, throwError } from 'rxjs';

describe('RequestPasswordChangeLinkComponent.', () => {
    let fixture: ComponentFixture<RequestPasswordChangeLinkComponent>;
    let component: RequestPasswordChangeLinkComponent;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let router: Router;
    let harness: RequestPasswordLinkHarness;

    function getTextFieldComponents() {
        return fixture.debugElement
            .queryAll(By.directive(TextFieldComponent))
            .map((field) => field.componentInstance) as TextFieldComponent[];
    }

    function getButtonComponents() {
        return fixture.debugElement
            .queryAll(By.directive(ButtonComponent))
            .map((button) => button.componentInstance) as ButtonComponent[];
    }

    function getEmailFieldComponent() {
        return getTextFieldComponents().find(
            (field) => field.id() == 'email-input',
        );
    }

    function getRequestButtonComponent() {
        return getButtonComponents().find(
            (button) => button.id() == 'request-button',
        );
    }

    function getCancelButtonComponent() {
        return getButtonComponents().find(
            (button) => button.id() == 'cancel-button',
        );
    }

    beforeEach(async () => {
        const spy = jasmine.createSpyObj('AuthService.', [
            'requestPasswordChangeLink',
        ]);
        await TestBed.configureTestingModule({
            imports: [
                RequestPasswordChangeLinkComponent,
                FormsModule,
                ReactiveFormsModule,
                MatProgressBarModule,
                AlertComponent,
                FormsModule,
                ReactiveFormsModule,
                MatProgressBarModule,
                AlertComponent,
                TextFieldComponent,
                ButtonComponent,
            ],
            providers: [
                provideAnimationsAsync(),
                { provide: AuthService, useValue: spy },
                provideRouter([
                    {
                        path: '',
                        component: LoginComponent,
                        title: 'Home Page',
                    },
                ]),
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(RequestPasswordChangeLinkComponent);
        authServiceSpy = TestBed.inject(
            AuthService,
        ) as jasmine.SpyObj<AuthService>;
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
        harness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            RequestPasswordLinkHarness,
        );
    });

    it('should create.', async () => {
        expect(component).toBeTruthy();

        const state = await harness.getState();
        expect(state).toEqual({ hasValidStructure: true });

        const emailField = getEmailFieldComponent()!;

        expect(emailField).toBeDefined();
        expect(emailField).not.toBeNull();
        expect(emailField.id()).toEqual('email-input');
        expect(emailField.label()).toEqual('Email');
        expect(emailField.format()).toEqual(TextFormat.email);
        expect(emailField.placeholder()).toBeUndefined();
        expect(emailField.control()).toBeDefined();
        expect(emailField.control()).not.toBeNull();
        expect(emailField.control()?.disabled).toBeFalse();
        expect(emailField.focusable()).toBeUndefined();
        expect(emailField.autofocus()).toBeUndefined();
        expect(emailField.readOnly()).toBeUndefined();
        expect(emailField.autocomplete()).toEqual(AutoCompleteType.on);
        expect(emailField.minLength()).toBeUndefined();
        expect(emailField.maxLength()).toEqual(EmailConstants.MAX_LENGTH);
        expect(emailField.prefix()).toBeUndefined();
        expect(emailField.suffix()).toBeUndefined();

        const requestButton = getRequestButtonComponent()!;

        expect(requestButton).toBeDefined();
        expect(requestButton).not.toBeNull();
        expect(requestButton.id()).toEqual('request-button');
        expect(requestButton.label()).toEqual('Mudar senha');
        expect(requestButton.icon()).toBeUndefined();
        expect(requestButton.appearance()).toEqual(ButtonAppearance.filled);
        expect(requestButton.disabled()).toBeFalse();
        expect(requestButton.focusable()).toBeUndefined();
        expect(requestButton.autofocus()).toBeUndefined();
        expect(requestButton.routerLink()).toBeUndefined();
        expect(requestButton.queryParams()).toBeUndefined();
        expect(requestButton.queryParamsHandling()).toBeUndefined();

        const cancelButton = getCancelButtonComponent()!;

        expect(cancelButton).toBeDefined();
        expect(cancelButton).not.toBeNull();
        expect(cancelButton.id()).toEqual('cancel-button');
        expect(cancelButton.label()).toEqual('Cancelar');
        expect(cancelButton.icon()).toBeUndefined();
        expect(cancelButton.appearance()).toEqual(ButtonAppearance.outlined);
        expect(cancelButton.disabled()).toBeFalse();
        expect(cancelButton.focusable()).toBeUndefined();
        expect(cancelButton.autofocus()).toBeUndefined();
        expect(cancelButton.routerLink()).toEqual('/');
        expect(cancelButton.queryParams()).toBeUndefined();
        expect(cancelButton.queryParamsHandling()).toBeUndefined();
    });

    it('should cancel and go to home page.', async () => {
        const location = TestBed.inject(Location);
        const routerSpy = spyOn(component['router'], 'navigate');

        authServiceSpy.requestPasswordChangeLink.and.returnValue(of(true));

        await harness.clickRequestButton();
        expect(location.path()).toBe('');
        expect(routerSpy).not.toHaveBeenCalled();
        expect(authServiceSpy.requestPasswordChangeLink).not.toHaveBeenCalled();

        const values = await harness.getValues();
        expect(values).toEqual({ email: '' });

        const errors = await harness.getErrors();
        expect(errors).toEqual({});
    });

    it("should sucessfully call service's requestPasswordChangeLink method on submit.", async () => {
        // TODO: testar se está autenticado
        const location = TestBed.inject(Location);

        const routerSpy = spyOn(component['router'], 'navigate');
        component['formGroup'].setValue({ email: 'john@example.com' });
        authServiceSpy.requestPasswordChangeLink.and.returnValue(of(true));
        await harness.clickRequestButton();
        expect(location.path()).toBe('');
        expect(
            authServiceSpy.requestPasswordChangeLink,
        ).toHaveBeenCalledOnceWith({ email: 'john@example.com' });

        const values = await harness.getValues();
        expect(values).toEqual({ email: '' });

        const errors = await harness.getErrors();
        expect(errors).toEqual({});

        expect(routerSpy).toHaveBeenCalledWith(['/']);
    });

    describe('errors.', () => {
        describe('local errors.', () => {
            let routerSpy: jasmine.Spy<
                (
                    commands: readonly any[],
                    extras?: NavigationExtras,
                ) => Promise<boolean>
            >;

            beforeEach(() => {
                authServiceSpy.requestPasswordChangeLink.and.returnValue(
                    of(true),
                );
                routerSpy = spyOn(component['router'], 'navigate');
                spyOn(router, 'navigateByUrl');
            });

            describe('on blur.', () => {
                it('should handle local error.', async () => {
                    await harness.setValues({ email: 'john@' });

                    const location = TestBed.inject(Location);
                    expect(
                        authServiceSpy.requestPasswordChangeLink,
                    ).not.toHaveBeenCalled();
                    const errors = await harness.getErrors();
                    expect(errors).toEqual({
                        email: 'E-mail inválido.',
                    });
                    const values = await harness.getValues();
                    expect(values).toEqual({
                        email: 'john@',
                    });

                    expect(location.path()).toBe('');
                    expect(routerSpy).not.toHaveBeenCalled();
                });

                describe('validations.', () => {
                    describe('email.', () => {
                        it('should reject empty string.', async () => {
                            await harness.setValues({
                                email: undefined as unknown as string,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                email: 'O campo é obrigatório.',
                            });
                        });

                        it('should reject email with invalid format.', async () => {
                            await harness.setValues({ email: '@email.com' });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                email: 'E-mail inválido.',
                            });
                        });

                        it('should accept email with min length.', async () => {
                            await harness.setValues({
                                email: 'w@x.com', // TODO: deveria aceitar w@x.c?
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({});
                        });

                        it('should accept name with max length.', async () => {
                            await harness.setValues({
                                email:
                                    'X'.repeat(
                                        UserConfigs.NAME_MAX_LENGTH - 4,
                                    ) + '@x.c',
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({});
                        });
                    });
                });
            });

            describe('on submit.', () => {
                it('should handle local error.', async () => {
                    const location = TestBed.inject(Location);
                    await harness.setValues({ email: 'john@' });
                    await harness.clickCancelButton();

                    expect(
                        authServiceSpy.requestPasswordChangeLink,
                    ).not.toHaveBeenCalled();
                    expect(location.path()).toBe('');
                    expect(routerSpy).not.toHaveBeenCalled();
                    const errors = await harness.getErrors();
                    expect(errors).toEqual({ email: 'E-mail inválido.' });
                    const values = await harness.getValues();
                    expect(values).toEqual({ email: 'john@' });
                });
            });
        });

        describe('remote errors.', () => {
            let routerSpy: jasmine.Spy<
                (
                    commands: readonly any[],
                    extras?: NavigationExtras,
                ) => Promise<boolean>
            >;

            beforeEach(() => {
                routerSpy = spyOn(component['router'], 'navigate');
                spyOn(router, 'navigateByUrl');
            });

            it('should handle main remote error.', async () => {
                const exception: any = new Error('Request failed!');
                exception.error = {
                    error: ExceptionName.unprocessable_entity,
                    message: 'Algo deu errado!',
                };
                exception.message = 'Some error';
                exception.name = 'HttpErrorResponse';
                exception.status = HttpStatusCode.UnprocessableEntity;
                exception.statusText = 'Unprocessable Entity';
                const location = TestBed.inject(Location);
                authServiceSpy.requestPasswordChangeLink.and.returnValue(
                    throwError(() => exception),
                );
                await harness.setValues({ email: 'john@email.com' });
                await harness.clickRequestButton();
                fixture.detectChanges();

                expect(
                    authServiceSpy.requestPasswordChangeLink,
                ).toHaveBeenCalledWith({ email: 'john@email.com' });

                const errors = await harness.getErrors();
                expect(errors).toEqual({ main: 'Algo deu errado!' });
                const values = await harness.getValues();
                expect(values).toEqual({ email: 'john@email.com' });

                expect(location.path()).toBe('');
                expect(routerSpy).not.toHaveBeenCalled();
            });

            it('should handle form fields remote errors.', async () => {
                const exception: any = new Error('Request failed!');
                exception.error = {
                    error: ExceptionName.unprocessable_entity,
                    message: { email: 'Error 1', password: 'Error 2' },
                };
                exception.message = 'Algo deu errado!';
                exception.name = 'HttpErrorResponse';
                exception.status = HttpStatusCode.UnprocessableEntity;
                exception.statusText = 'Unprocessable Entity';
                const location = TestBed.inject(Location);
                authServiceSpy.requestPasswordChangeLink.and.returnValue(
                    throwError(() => exception),
                );
                await harness.setValues({ email: 'john@email.com' });
                await harness.clickRequestButton();
                fixture.detectChanges();

                expect(location.path()).toBe('');
                expect(
                    authServiceSpy.requestPasswordChangeLink,
                ).toHaveBeenCalledWith({ email: 'john@email.com' });

                const errors = await harness.getErrors();
                expect(errors).toEqual({ email: 'Error 1' });
                const values = await harness.getValues();
                expect(values).toEqual({ email: 'john@email.com' });

                expect(routerSpy).not.toHaveBeenCalled();
            });
        });
    });

    describe('loading.', () => {
        it('should show loading while requesting.', async () => {
            let subject = new Subject<any>();

            component['formGroup'].setValue({ email: 'john@example.com' });
            authServiceSpy.requestPasswordChangeLink.and.returnValue(
                subject.asObservable(),
            );

            fixture.detectChanges();

            let progressBarHarness = await harness.getProgressBarHarness();
            expect(progressBarHarness).toBeNull();

            await harness.clickRequestButton();
            fixture.detectChanges();

            progressBarHarness = await harness.getProgressBarHarness();
            expect(progressBarHarness).toBeDefined();
            expect(progressBarHarness).not.toBeNull();

            subject.next(true);
            subject.complete();
            fixture.detectChanges();

            progressBarHarness = await harness.getProgressBarHarness();
            expect(progressBarHarness).toBeNull();
        });

        it('should stop to show loading after remote error', async () => {
            const exception: any = new Error('Request failed!');
            exception.error = {
                error: ExceptionName.unprocessable_entity,
                message: 'Algo deu errado!',
            };
            exception.message = 'Some error';
            exception.name = 'HttpErrorResponse';
            exception.status = HttpStatusCode.UnprocessableEntity;
            exception.statusText = 'Unprocessable Entity';

            fixture.detectChanges();

            authServiceSpy.requestPasswordChangeLink.and.returnValue(
                throwError(() => exception),
            );
            await harness.setValues({ email: 'john@example.com' });
            await harness.clickRequestButton();
            fixture.detectChanges();

            let progressBarHarness = await harness.getProgressBarHarness();
            expect(progressBarHarness).toBeNull();
        });
    });
});

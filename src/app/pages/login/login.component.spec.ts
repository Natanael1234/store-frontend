import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Location } from '@angular/common';
import { HttpStatusCode } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavigationExtras, provideRouter, Router } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { AlertComponent } from '../../components/alert/alert.component';
import { ButtonComponent } from '../../components/form/components/button/button.component';
import { ButtonAppearance } from '../../components/form/components/button/enum/appearance/button-appearance.enum';
import { PasswordFieldComponent } from '../../components/form/components/text/password-field/password-field.component';
import { TextFieldComponent } from '../../components/form/components/text/text-field/text-field.component';
import { AutoCompleteType } from '../../components/form/enums/auto-complete-type/auto-complete-type.enum';
import { TextFormat } from '../../components/form/enums/text-format/text-format.enum';
import { UserConfigs } from '../../configs/user/user.configs';
import { EmailConstants } from '../../constants/email/email.constants';
import { ExceptionName } from '../../enums/exception-names/exception-text.enum';
import { AuthService } from '../../services/auth/auth.service';
import { Role } from '../../services/user/dtos/role/role.enum';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from './login.component';
import { LoginHarness } from './login.harness';

describe('LoginComponent.', () => {
    let fixture: ComponentFixture<LoginComponent>;
    let component: LoginComponent;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let router: Router;
    let harness: LoginHarness;

    function getTextFieldComponents() {
        return fixture.debugElement
            .queryAll(By.directive(TextFieldComponent))
            .map((field) => field.componentInstance) as TextFieldComponent[];
    }

    function getPasswordFieldComponents() {
        return fixture.debugElement
            .queryAll(By.directive(PasswordFieldComponent))
            .map(
                (field) => field.componentInstance,
            ) as PasswordFieldComponent[];
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

    function getPasswordFieldComponent() {
        return getPasswordFieldComponents().find(
            (field) => field.id() == 'password-input',
        );
    }

    function getLoginButtonComponent() {
        return getButtonComponents().find(
            (button) => button.id() == 'login-button',
        );
    }

    function getRegisterButtonComponent() {
        return getButtonComponents().find(
            (button) => button.id() == 'register-button',
        );
    }

    beforeEach(async () => {
        const spy = jasmine.createSpyObj('AuthService', ['login']);
        await TestBed.configureTestingModule({
            imports: [
                LoginComponent,
                FormsModule,
                ReactiveFormsModule,
                MatProgressBarModule,
                AlertComponent,
                TextFieldComponent,
                PasswordFieldComponent,
                ButtonComponent,
            ],
            providers: [
                provideAnimationsAsync(),
                { provide: AuthService, useValue: spy },
                provideRouter([
                    {
                        path: 'register',
                        component: RegisterComponent,
                        title: 'Register Page',
                    },
                ]),
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(LoginComponent);
        authServiceSpy = TestBed.inject(
            AuthService,
        ) as jasmine.SpyObj<AuthService>;
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
        harness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            LoginHarness,
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

        const passwordField = getPasswordFieldComponent()!;

        expect(passwordField).toBeDefined();
        expect(passwordField).not.toBeNull();
        expect(passwordField.id()).toEqual('password-input');
        expect(passwordField.label()).toEqual('Senha');
        expect(passwordField.placeholder()).toBeUndefined();
        expect(passwordField.control()).toBeDefined();
        expect(passwordField.control()).not.toBeNull();
        expect(passwordField.control()?.disabled).toBeFalse();
        expect(passwordField.focusable()).toBeUndefined();
        expect(passwordField.autofocus()).toBeUndefined();
        expect(passwordField.readOnly()).toBeUndefined();
        expect(passwordField.autocomplete()).toEqual(
            AutoCompleteType.current_password,
        );
        expect(passwordField.minLength()).toEqual(
            UserConfigs.PASSWORD_MIN_LENGTH,
        );
        expect(passwordField.maxLength()).toEqual(
            UserConfigs.PASSWORD_MAX_LENGTH,
        );

        const loginButton = getLoginButtonComponent()!;

        expect(loginButton).toBeDefined();
        expect(loginButton).not.toBeNull();
        expect(loginButton.id()).toEqual('login-button');
        expect(loginButton.label()).toEqual('Login');
        expect(loginButton.icon()).toBeUndefined();
        expect(loginButton.appearance()).toEqual(ButtonAppearance.filled);
        expect(loginButton.disabled()).toBeFalse();
        expect(loginButton.focusable()).toBeUndefined();
        expect(loginButton.autofocus()).toBeUndefined();
        expect(loginButton.routerLink()).toBeUndefined();
        expect(loginButton.queryParams()).toBeUndefined();
        expect(loginButton.queryParamsHandling()).toBeUndefined();

        const registerButton = getRegisterButtonComponent()!;

        expect(registerButton).toBeDefined();
        expect(registerButton).not.toBeNull();
        expect(registerButton.id()).toEqual('register-button');
        expect(registerButton.label()).toEqual(
            'Não tem tem uma conta? <b>Cadastre-se</b>',
        );
        expect(registerButton.icon()).toBeUndefined();
        expect(registerButton.appearance()).toEqual(ButtonAppearance.outlined);
        expect(registerButton.disabled()).toBeFalse();
        expect(registerButton.focusable()).toBeUndefined();
        expect(registerButton.autofocus()).toBeUndefined();
        expect(registerButton.routerLink()).toEqual('/register');
        expect(registerButton.queryParams()).toBeUndefined();
        expect(registerButton.queryParamsHandling()).toBeUndefined();
    });

    it('should go to register page.', async () => {
        const location = TestBed.inject(Location);
        const routerSpy = spyOn(component['router'], 'navigate');

        authServiceSpy.login.and.returnValue(
            of({
                status: 'success',
                data: {
                    user: {
                        id: '891db31e-dfb5-42ed-b912-48b98463b004',
                        name: 'John Williams',
                        email: 'john@example.com',
                        roles: [Role.user],
                        active: true,
                        created: '2024-02-03T19:05:21.689Z',
                        updated: '2024-02-03T19:05:21.689Z',
                        deletedAt: null,
                    },
                    payload: {
                        type: 'bearer',
                        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY5ODcxMjEsImV4cCI6MTcwNzA3MzUyMSwic3ViIjoiODkxZGIzMWUtZGZiNS00MmVkLWI5MTItNDhiOTg0NjNiMDA0In0.LaW-Z0DkU5ZheRtst0mvZ3WtMgMmMeawJVke9qtCVyE',
                        refreshToken:
                            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY5ODcxMjEsImV4cCI6NDI5ODk4NzEyMSwic3ViIjoiODkxZGIzMWUtZGZiNS00MmVkLWI5MTItNDhiOTg0NjNiMDA0IiwianRpIjoiMTI4In0.bJTClITMvD5NCDt5DjTmxn3DIjFOabEvsCvnK795VXU',
                    },
                },
            }),
        );

        await harness.clickRegisterButton();
        expect(location.path()).toBe('/register');
        expect(routerSpy).not.toHaveBeenCalled();
        expect(authServiceSpy.login).not.toHaveBeenCalled();

        const values = await harness.getValues();
        expect(values).toEqual({ email: '', password: '' });

        const errors = await harness.getErrors();
        expect(errors).toEqual({});
    });

    it("should sucessfully call service's login method on submit.", async () => {
        const location = TestBed.inject(Location);

        const routerSpy = spyOn(component['router'], 'navigate');
        component['formGroup'].setValue({
            email: 'john@example.com',
            password: 'Password123$',
        });
        authServiceSpy.login.and.returnValue(
            of({
                status: 'success',
                data: {
                    user: {
                        id: '891db31e-dfb5-42ed-b912-48b98463b004',
                        name: 'John Williams',
                        email: 'john@example.com',
                        roles: [Role.user],
                        active: true,
                        created: '2024-02-03T19:05:21.689Z',
                        updated: '2024-02-03T19:05:21.689Z',
                        deletedAt: null,
                    },
                    payload: {
                        type: 'bearer',
                        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY5ODcxMjEsImV4cCI6MTcwNzA3MzUyMSwic3ViIjoiODkxZGIzMWUtZGZiNS00MmVkLWI5MTItNDhiOTg0NjNiMDA0In0.LaW-Z0DkU5ZheRtst0mvZ3WtMgMmMeawJVke9qtCVyE',
                        refreshToken:
                            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY5ODcxMjEsImV4cCI6NDI5ODk4NzEyMSwic3ViIjoiODkxZGIzMWUtZGZiNS00MmVkLWI5MTItNDhiOTg0NjNiMDA0IiwianRpIjoiMTI4In0.bJTClITMvD5NCDt5DjTmxn3DIjFOabEvsCvnK795VXU',
                    },
                },
            }),
        );
        await harness.clickLoginButton();
        expect(location.path()).toBe('');
        expect(authServiceSpy.login).toHaveBeenCalledOnceWith({
            email: 'john@example.com',
            password: 'Password123$',
        });

        const values = await harness.getValues();
        expect(values).toEqual({ email: '', password: '' });

        const errors = await harness.getErrors();
        expect(errors).toEqual({});

        expect(routerSpy).toHaveBeenCalledWith(['/']);
    });

    describe('local errors.', () => {
        let routerSpy: jasmine.Spy<
            (
                commands: readonly any[],
                extras?: NavigationExtras,
            ) => Promise<boolean>
        >;

        beforeEach(() => {
            authServiceSpy.login.and.returnValue(
                of({
                    status: 'success',
                    data: {
                        user: {
                            id: '891db31e-dfb5-42ed-b912-48b98463b004',
                            name: 'John Williams',
                            email: 'john@example.com',
                            roles: [Role.user],
                            active: true,
                            created: '2024-02-03T19:05:21.689Z',
                            updated: '2024-02-03T19:05:21.689Z',
                            deletedAt: null,
                        },
                        payload: {
                            type: 'bearer',
                            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY5ODcxMjEsImV4cCI6MTcwNzA3MzUyMSwic3ViIjoiODkxZGIzMWUtZGZiNS00MmVkLWI5MTItNDhiOTg0NjNiMDA0In0.LaW-Z0DkU5ZheRtst0mvZ3WtMgMmMeawJVke9qtCVyE',
                            refreshToken:
                                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY5ODcxMjEsImV4cCI6NDI5ODk4NzEyMSwic3ViIjoiODkxZGIzMWUtZGZiNS00MmVkLWI5MTItNDhiOTg0NjNiMDA0IiwianRpIjoiMTI4In0.bJTClITMvD5NCDt5DjTmxn3DIjFOabEvsCvnK795VXU',
                        },
                    },
                }),
            );
            routerSpy = spyOn(component['router'], 'navigate');
            spyOn(router, 'navigateByUrl');
        });

        describe('on blur.', () => {
            it('should handle local error.', async () => {
                await harness.setValues({
                    email: 'john@',
                    password: 'Pass',
                });

                const location = TestBed.inject(Location);
                expect(authServiceSpy.login).not.toHaveBeenCalled();
                const errors = await harness.getErrors();
                expect(errors).toEqual({
                    email: 'E-mail inválido.',
                    password: 'O comprimento mínimo permitido é 8.',
                });
                const values = await harness.getValues();
                expect(values).toEqual({
                    email: 'john@',
                    password: 'Pass',
                });

                expect(location.path()).toBe('');
                expect(routerSpy).not.toHaveBeenCalled();
            });

            describe('validations.', () => {
                describe('email', () => {
                    it('should reject empty string.', async () => {
                        await harness.setValues({
                            email: undefined as unknown as string,
                            password: 'Password123$',
                        });

                        const errors = await harness.getErrors();
                        expect(errors).toEqual({
                            email: 'O campo é obrigatório.',
                        });
                    });

                    it('should reject email with invalid format.', async () => {
                        await harness.setValues({
                            email: '@email.com',
                            password: 'Password123$',
                        });

                        const errors = await harness.getErrors();
                        expect(errors).toEqual({
                            email: 'E-mail inválido.',
                        });
                    });

                    it('should accept email with min length.', async () => {
                        await harness.setValues({
                            email: 'w@x.com', // TODO: deveria aceitar w@x.c?
                            password: 'Password123$',
                        });

                        const errors = await harness.getErrors();
                        expect(errors).toEqual({});
                    });

                    it('should accept name with max length.', async () => {
                        await harness.setValues({
                            email:
                                'X'.repeat(UserConfigs.NAME_MAX_LENGTH - 4) +
                                '@x.c',
                            password: 'Password123$',
                        });

                        const errors = await harness.getErrors();
                        expect(errors).toEqual({});
                    });
                });

                describe('password', () => {
                    it('should accept valid value.', async () => {
                        await harness.setValues({
                            email: 'user@email.com',
                            password: 'Pass123$',
                        });

                        const errors = await harness.getErrors();
                        expect(errors).toEqual({});
                    });

                    it('should reject empty string.', async () => {
                        await harness.setValues({
                            email: 'user@email.com',
                            password: '',
                        });

                        const errors = await harness.getErrors();
                        expect(errors).toEqual({
                            password: 'O campo é obrigatório.',
                        });
                    });

                    it('should reject value shorter than min length.', async () => {
                        await harness.setValues({
                            email: 'user@email.com',
                            password: 'Pas123$',
                        });

                        const errors = await harness.getErrors();
                        expect(errors).toEqual({
                            password: 'O comprimento mínimo permitido é 8.',
                        });
                    });

                    it('should accept value with the min length.', async () => {
                        await harness.setValues({
                            email: 'user@email.com',
                            password: 'Pass123$',
                        });

                        const errors = await harness.getErrors();
                        expect(errors).toEqual({});
                    });

                    it('should reject value longer than max length.', async () => {
                        await harness.setValues({
                            email: 'user@email.com',
                            password: 'Password1234$',
                        });

                        const errors = await harness.getErrors();
                        expect(errors).toEqual({
                            password: 'O comprimento máximo permitido é 12.',
                        });
                    });

                    it('should accept value with the max length.', async () => {
                        await harness.setValues({
                            email: 'user@email.com',
                            password: 'Password123$',
                        });

                        const errors = await harness.getErrors();
                        expect(errors).toEqual({});
                    });

                    it('should reject value without uppercase letter.', async () => {
                        await harness.setValues({
                            email: 'user@email.com',
                            password: 'password123$',
                        });

                        const errors = await harness.getErrors();
                        expect(errors).toEqual({
                            password:
                                'Deve conter maíscula, minúscula, número e caractere especial.',
                        });
                    });

                    it('should reject value without lowercase letter.', async () => {
                        await harness.setValues({
                            email: 'user@email.com',
                            password: 'PASSWORD123$',
                        });

                        const errors = await harness.getErrors();
                        expect(errors).toEqual({
                            password:
                                'Deve conter maíscula, minúscula, número e caractere especial.',
                        });
                    });

                    it('should reject value without digit.', async () => {
                        await harness.setValues({
                            email: 'user@email.com',
                            password: 'Password$',
                        });

                        const errors = await harness.getErrors();
                        expect(errors).toEqual({
                            password:
                                'Deve conter maíscula, minúscula, número e caractere especial.',
                        });
                    });

                    it('should reject value without special character.', async () => {
                        await harness.setValues({
                            email: 'user@email.com',
                            password: 'Password123',
                        });

                        const errors = await harness.getErrors();
                        expect(errors).toEqual({
                            password:
                                'Deve conter maíscula, minúscula, número e caractere especial.',
                        });
                    });

                    it('should reject value with space.', async () => {
                        await harness.setValues({
                            email: 'user@email.com',
                            password: 'Pass 123$',
                        });

                        const errors = await harness.getErrors();
                        expect(errors).toEqual({ password: 'Inválido.' });
                    });
                });
            });
        });

        describe('on submit.', () => {
            it('should handle local error.', async () => {
                const location = TestBed.inject(Location);
                await harness.setValues({
                    email: 'john@',
                    password: 'Pass',
                });
                await harness.clickLoginButton();

                expect(authServiceSpy.login).not.toHaveBeenCalled();
                expect(location.path()).toBe('');
                expect(routerSpy).not.toHaveBeenCalled();
                const errors = await harness.getErrors();
                expect(errors).toEqual({
                    email: 'E-mail inválido.',
                    password: 'O comprimento mínimo permitido é 8.',
                });
                const values = await harness.getValues();
                expect(values).toEqual({
                    email: 'john@',
                    password: 'Pass',
                });
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
            const exception: any = new Error('Login failed!');
            exception.error = {
                error: ExceptionName.unprocessable_entity,
                message: 'Algo deu errado!',
            };
            exception.message = 'Some error';
            exception.name = 'HttpErrorResponse';
            exception.status = HttpStatusCode.UnprocessableEntity;
            exception.statusText = 'Unprocessable Entity';
            const location = TestBed.inject(Location);
            authServiceSpy.login.and.returnValue(throwError(() => exception));
            await harness.setValues({
                email: 'john@email.com',
                password: 'Password123$',
            });
            await harness.clickLoginButton();
            fixture.detectChanges();

            expect(authServiceSpy.login).toHaveBeenCalledWith({
                email: 'john@email.com',
                password: 'Password123$',
            });

            const errors = await harness.getErrors();
            expect(errors).toEqual({ main: 'Algo deu errado!' });
            const values = await harness.getValues();
            expect(values).toEqual({
                email: 'john@email.com',
                password: 'Password123$',
            });

            expect(location.path()).toBe('');
            expect(routerSpy).not.toHaveBeenCalled();
        });

        it('should handle form fields remote errors.', async () => {
            const exception: any = new Error('Login failed!');
            exception.error = {
                error: ExceptionName.unprocessable_entity,
                message: { email: 'Error 1', password: 'Error 2' },
            };
            exception.message = 'Algo deu errado!';
            exception.name = 'HttpErrorResponse';
            exception.status = HttpStatusCode.UnprocessableEntity;
            exception.statusText = 'Unprocessable Entity';
            const location = TestBed.inject(Location);
            authServiceSpy.login.and.returnValue(throwError(() => exception));
            await harness.setValues({
                email: 'john@email.com',
                password: 'Password123$',
            });
            await harness.clickLoginButton();
            fixture.detectChanges();

            expect(location.path()).toBe('');
            expect(authServiceSpy.login).toHaveBeenCalledWith({
                email: 'john@email.com',
                password: 'Password123$',
            });

            const errors = await harness.getErrors();
            expect(errors).toEqual({
                email: 'Error 1',
                password: 'Error 2',
            });
            const values = await harness.getValues();
            expect(values).toEqual({
                email: 'john@email.com',
                password: 'Password123$',
            });

            expect(routerSpy).not.toHaveBeenCalled();
        });
    });

    describe('loading.', () => {
        it('should show loading while requesting.', async () => {
            let subject = new Subject<any>();

            component['formGroup'].setValue({
                email: 'john@example.com',
                password: 'Password123$',
            });
            authServiceSpy.login.and.returnValue(subject.asObservable());

            fixture.detectChanges();

            let progressBarHarness = await harness.getProgressBarHarness();
            expect(progressBarHarness).toBeNull();

            await harness.clickLoginButton();
            fixture.detectChanges();

            progressBarHarness = await harness.getProgressBarHarness();
            expect(progressBarHarness).toBeDefined();
            expect(progressBarHarness).not.toBeNull();

            subject.next({
                status: 'success',
                data: {
                    user: {
                        id: '891db31e-dfb5-42ed-b912-48b98463b004',
                        name: 'John Williams',
                        email: 'john@example.com',
                        roles: [Role.user],
                        active: true,
                        created: '2024-02-03T19:05:21.689Z',
                        updated: '2024-02-03T19:05:21.689Z',
                        deletedAt: null,
                    },
                    payload: {
                        type: 'bearer',
                        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY5ODcxMjEsImV4cCI6MTcwNzA3MzUyMSwic3ViIjoiODkxZGIzMWUtZGZiNS00MmVkLWI5MTItNDhiOTg0NjNiMDA0In0.LaW-Z0DkU5ZheRtst0mvZ3WtMgMmMeawJVke9qtCVyE',
                        refreshToken:
                            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY5ODcxMjEsImV4cCI6NDI5ODk4NzEyMSwic3ViIjoiODkxZGIzMWUtZGZiNS00MmVkLWI5MTItNDhiOTg0NjNiMDA0IiwianRpIjoiMTI4In0.bJTClITMvD5NCDt5DjTmxn3DIjFOabEvsCvnK795VXU',
                    },
                },
            });
            subject.complete();
            fixture.detectChanges();

            progressBarHarness = await harness.getProgressBarHarness();
            expect(progressBarHarness).toBeNull();
        });

        it('should show stop to show loading after remote error', async () => {
            const exception: any = new Error('Login failed!');
            exception.error = {
                error: ExceptionName.unprocessable_entity,
                message: 'Algo deu errado!',
            };
            exception.message = 'Some error';
            exception.name = 'HttpErrorResponse';
            exception.status = HttpStatusCode.UnprocessableEntity;
            exception.statusText = 'Unprocessable Entity';

            fixture.detectChanges();

            authServiceSpy.login.and.returnValue(throwError(() => exception));
            await harness.setValues({
                email: 'john@email.com',
                password: 'Password123$',
            });
            await harness.clickLoginButton();
            fixture.detectChanges();

            let progressBarHarness = await harness.getProgressBarHarness();
            expect(progressBarHarness).toBeNull();
        });
    });
});

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Location } from '@angular/common';
import { HttpStatusCode } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavigationExtras, provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AlertComponent } from '../../components/alert/alert.component';
import { ButtonComponent } from '../../components/form/components/button/button.component';
import { ButtonAppearance } from '../../components/form/components/button/enum/appearance/button-appearance.enum';
import { CheckboxComponent } from '../../components/form/components/checkbox/checkbox.component';
import { PasswordFieldComponent } from '../../components/form/components/text/password-field/password-field.component';
import { TextFieldComponent } from '../../components/form/components/text/text-field/text-field.component';
import { AutoCompleteType } from '../../components/form/enums/auto-complete-type/auto-complete-type.enum';
import { TextFormat } from '../../components/form/enums/text-format/text-format.enum';
import { UserConfigs } from '../../configs/user/user.configs';
import { EmailConstants } from '../../constants/email/email.constants';
import { ExceptionName } from '../../enums/exception-names/exception-text.enum';
import { AuthService } from '../../services/auth/auth.service';
import { Role } from '../../services/user/dtos/role/role.enum';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from './register.component';
import { RegisterHarness } from './register.harness';

describe('RegisterComponent', () => {
    let fixture: ComponentFixture<RegisterComponent>;
    let component: RegisterComponent;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let router: Router;
    let harness: RegisterHarness;

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

    function getCheckboxeComponents() {
        return fixture.debugElement
            .queryAll(By.directive(CheckboxComponent))
            .map(
                (checkbox) => checkbox.componentInstance,
            ) as CheckboxComponent[];
    }

    function getButtonComponents() {
        return fixture.debugElement
            .queryAll(By.directive(ButtonComponent))
            .map((button) => button.componentInstance) as ButtonComponent[];
    }

    function getNameFieldComponent() {
        return getTextFieldComponents().find(
            (field) => field.id() == 'name-input',
        );
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

    function getRepeadPasswordFieldComponent() {
        return getPasswordFieldComponents().find(
            (field) => field.id() == 'repeat-password-input',
        );
    }

    function getAcceptTermsCheckboxComponent() {
        return getCheckboxeComponents().find(
            (field) => field.id() == 'accept-terms-checkbox',
        );
    }

    function getRegisterButtonComponent() {
        return getButtonComponents().find(
            (button) => button.id() == 'register-button',
        );
    }

    function getLoginButtonComponent() {
        return getButtonComponents().find(
            (button) => button.id() == 'login-button',
        );
    }

    // TODO: test loading

    beforeEach(async () => {
        const spy = jasmine.createSpyObj('AuthService', ['register']);

        await TestBed.configureTestingModule({
            imports: [
                RegisterComponent,
                FormsModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatProgressBarModule,
                AlertComponent,
                TextFieldComponent,
                PasswordFieldComponent,
                CheckboxComponent,
                ButtonComponent,
            ],
            providers: [
                provideAnimationsAsync(),
                { provide: AuthService, useValue: spy },
                provideRouter([
                    {
                        path: 'login',
                        component: LoginComponent,
                        title: 'Login Page',
                    },
                ]),
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(RegisterComponent);
        authServiceSpy = TestBed.inject(
            AuthService,
        ) as jasmine.SpyObj<AuthService>;
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
        harness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            RegisterHarness,
        );
    });

    it('should create', async () => {
        expect(component).toBeTruthy();

        const state = await harness.getState();
        expect(state).toEqual({ hasValidStructure: true });

        const nameField = getNameFieldComponent()!;

        expect(nameField).toBeDefined();
        expect(nameField).not.toBeNull();
        expect(nameField.id()).toEqual('name-input');
        expect(nameField.label()).toEqual('Nome');
        expect(nameField.format()).toEqual(TextFormat.text);
        expect(nameField.placeholder()).toBeUndefined();
        expect(nameField.control()).toBeDefined();
        expect(nameField.control()).not.toBeNull();
        expect(nameField.control()?.disabled).toBeFalse();
        expect(nameField.focusable()).toBeUndefined();
        expect(nameField.autofocus()).toBeTrue();
        expect(nameField.readOnly()).toBeUndefined();
        expect(nameField.autocomplete()).toBeUndefined();
        expect(nameField.minLength()).toEqual(UserConfigs.NAME_MIN_LENGTH);
        expect(nameField.maxLength()).toEqual(UserConfigs.NAME_MAX_LENGTH);
        expect(nameField.prefix()).toBeUndefined();
        expect(nameField.suffix()).toBeUndefined();

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
        expect(emailField.autocomplete()).toBeUndefined();
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
            AutoCompleteType.new_password,
        );
        expect(passwordField.minLength()).toEqual(
            UserConfigs.PASSWORD_MIN_LENGTH,
        );
        expect(passwordField.maxLength()).toEqual(
            UserConfigs.PASSWORD_MAX_LENGTH,
        );

        const repeatPasswordField = getRepeadPasswordFieldComponent()!;

        expect(repeatPasswordField).toBeDefined();
        expect(repeatPasswordField).not.toBeNull();
        expect(repeatPasswordField.id()).toEqual('repeat-password-input');
        expect(repeatPasswordField.label()).toEqual('Repita a senha');
        expect(repeatPasswordField.placeholder()).toBeUndefined();
        expect(repeatPasswordField.control()).toBeDefined();
        expect(repeatPasswordField.control()).not.toBeNull();
        expect(repeatPasswordField.control()?.disabled).toBeFalse();
        expect(repeatPasswordField.focusable()).toBeUndefined();
        expect(repeatPasswordField.autofocus()).toBeUndefined();
        expect(repeatPasswordField.readOnly()).toBeUndefined();
        expect(repeatPasswordField.autocomplete()).toBeUndefined();
        expect(repeatPasswordField.minLength()).toEqual(
            UserConfigs.PASSWORD_MIN_LENGTH,
        );
        expect(repeatPasswordField.maxLength()).toEqual(
            UserConfigs.PASSWORD_MAX_LENGTH,
        );

        const acceptTermsCheckbox = getAcceptTermsCheckboxComponent()!;

        expect(acceptTermsCheckbox).toBeDefined();
        expect(acceptTermsCheckbox).not.toBeNull();
        expect(acceptTermsCheckbox.id()).toEqual('accept-terms-checkbox');
        expect(acceptTermsCheckbox.label()).toEqual('Aceito os termos');
        expect(acceptTermsCheckbox.control()).toBeDefined();
        expect(acceptTermsCheckbox.control()).not.toBeNull();
        expect(acceptTermsCheckbox.control()?.disabled).toBeFalse();
        expect(acceptTermsCheckbox.focusable()).toBeUndefined();
        expect(acceptTermsCheckbox.autofocus()).toBeUndefined();

        const registerButton = getRegisterButtonComponent()!;

        expect(registerButton).toBeDefined();
        expect(registerButton).not.toBeNull();
        expect(registerButton.id()).toEqual('register-button');
        expect(registerButton.label()).toEqual('Registrar');
        expect(registerButton.icon()).toBeUndefined();
        expect(registerButton.appearance()).toEqual(ButtonAppearance.filled);
        expect(registerButton.disabled()).toBeFalse();
        expect(registerButton.focusable()).toBeUndefined();
        expect(registerButton.autofocus()).toBeUndefined();
        expect(registerButton.routerLink()).toBeUndefined();
        expect(registerButton.queryParams()).toBeUndefined();
        expect(registerButton.queryParamsHandling()).toBeUndefined();

        const loginButton = getLoginButtonComponent()!;

        expect(loginButton).toBeDefined();
        expect(loginButton).not.toBeNull();
        expect(loginButton.id()).toEqual('login-button');
        expect(loginButton.label()).toEqual('Já tem uma conta? <b>Login</b>');
        expect(loginButton.icon()).toBeUndefined();
        expect(loginButton.appearance()).toEqual(ButtonAppearance.outlined);
        expect(loginButton.disabled()).toBeFalse();
        expect(loginButton.focusable()).toBeUndefined();
        expect(loginButton.autofocus()).toBeUndefined();
        expect(loginButton.routerLink()).toEqual('/login');
        expect(loginButton.queryParams()).toBeUndefined();
        expect(loginButton.queryParamsHandling()).toBeUndefined();
    });

    it('should go to login page', async () => {
        const location = TestBed.inject(Location);
        const routerSpy = spyOn(component['router'], 'navigate');

        authServiceSpy.register.and.returnValue(
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
        expect(location.path()).toBe('/login');
        expect(routerSpy).not.toHaveBeenCalled();
        expect(authServiceSpy.register).not.toHaveBeenCalled();

        const values = await harness.getValues();

        expect(values).toEqual({
            name: '',
            email: '',
            password: '',
            repeatPassword: '',
            acceptTerms: false,
        });

        const errors = await harness.getErrors();
        expect(errors).toEqual({});
    });

    describe('registration request', () => {
        it("should sucessfully call service's register method on submit", async () => {
            const location = TestBed.inject(Location);
            const routerSpy = spyOn(component['router'], 'navigate');
            component['formGroup'].setValue({
                name: 'John Williams',
                email: 'john@example.com',
                password: 'Password123$',
                repeatPassword: 'Password123$',
                acceptTerms: true,
            });
            authServiceSpy.register.and.returnValue(
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
            expect(location.path()).toBe('');
            expect(authServiceSpy.register).toHaveBeenCalledOnceWith({
                name: 'John Williams',
                email: 'john@example.com',
                password: 'Password123$',
                repeatPassword: 'Password123$',
                acceptTerms: true,
            });

            const values = await harness.getValues();
            expect(values).toEqual({
                name: '',
                email: '',
                password: '',
                repeatPassword: '',
                acceptTerms: false,
            });

            const errors = await harness.getErrors();
            expect(errors).toEqual({});

            expect(routerSpy).toHaveBeenCalledWith(['/login']);
        });
    });

    describe('errors', () => {
        describe('local errors', () => {
            let routerSpy: jasmine.Spy<
                (
                    commands: readonly any[],
                    extras?: NavigationExtras,
                ) => Promise<boolean>
            >;

            beforeEach(() => {
                authServiceSpy.register.and.returnValue(
                    of({
                        status: 'success',
                        data: {
                            user: {
                                id: '891db31e-dfb5-42ed-b912-48b98463b004',
                                name: 'z',
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

            describe('on blur', () => {
                it('should handle local error during name input blur.', async () => {
                    await harness.setValues({
                        name: 'J',
                        email: 'john@',
                        password: 'Pass',
                        repeatPassword: 'Password123$',
                        acceptTerms: false,
                    });

                    const location = TestBed.inject(Location);
                    expect(authServiceSpy.register).not.toHaveBeenCalled();
                    const errors = await harness.getErrors();
                    expect(errors).toEqual({
                        name: 'O comprimento mínimo permitido é 6.',
                        email: 'E-mail inválido.',
                        password: 'O comprimento mínimo permitido é 8.',
                        repeatPassword: 'As senhas não coincidem.',
                        acceptTerms: true,
                    });
                    const values = await harness.getValues();
                    expect(values).toEqual({
                        name: 'J',
                        email: 'john@',
                        password: 'Pass',
                        repeatPassword: 'Password123$',
                        acceptTerms: false,
                    });

                    expect(location.path()).toBe('');
                    expect(routerSpy).not.toHaveBeenCalled();
                });

                describe('validations.', () => {
                    describe('name', () => {
                        it('should reject empty string', async () => {
                            await harness.setValues({
                                name: undefined as unknown as string,
                                email: 'john@email.com',
                                password: 'Password123$',
                                repeatPassword: 'Password123$',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                name: 'O campo é obrigatório.',
                            });
                        });

                        it('should accept name with min length', async () => {
                            await harness.setValues({
                                name: 'x'.repeat(UserConfigs.NAME_MIN_LENGTH),
                                email: 'john@email.com',
                                password: 'Password123$',
                                repeatPassword: 'Password123$',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({});
                        });

                        it('should reject name shorter than min length', async () => {
                            await harness.setValues({
                                name: 'x'.repeat(
                                    UserConfigs.NAME_MIN_LENGTH - 1,
                                ),
                                email: 'john@email.com',
                                password: 'Password123$',
                                repeatPassword: 'Password123$',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                name: 'O comprimento mínimo permitido é 6.',
                            });
                        });

                        it('should accept name with max length', async () => {
                            await harness.setValues({
                                name: 'X'.repeat(UserConfigs.NAME_MAX_LENGTH),
                                email: 'john@email.com',
                                password: 'Password123$',
                                repeatPassword: 'Password123$',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({});
                        });

                        it('should reject name longer than max length', async () => {
                            await harness.setValues({
                                name: 'X'.repeat(
                                    UserConfigs.NAME_MAX_LENGTH + 1,
                                ),
                                email: 'john@email.com',
                                password: 'Password123$',
                                repeatPassword: 'Password123$',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                name: 'O comprimento máximo permitido é 60.',
                            });
                        });
                    });

                    describe('email', () => {
                        it('should reject empty string.', async () => {
                            await harness.setValues({
                                name: 'John Williams',
                                email: undefined as unknown as string,
                                password: 'Password123$',
                                repeatPassword: 'Password123$',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                email: 'O campo é obrigatório.',
                            });
                        });

                        it('should reject email with invalid format.', async () => {
                            await harness.setValues({
                                name: 'John Williams',
                                email: '@email.com',
                                password: 'Password123$',
                                repeatPassword: 'Password123$',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                email: 'E-mail inválido.',
                            });
                        });

                        it('should accept email with min length.', async () => {
                            await harness.setValues({
                                name: 'John Williams',
                                email: 'w@x.com', // TODO: deveria aceitar w@x.c?
                                password: 'Password123$',
                                repeatPassword: 'Password123$',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({});
                        });

                        it('should accept name with max length.', async () => {
                            await harness.setValues({
                                name: 'John Williams',
                                email:
                                    'X'.repeat(
                                        UserConfigs.NAME_MAX_LENGTH - 4,
                                    ) + '@x.c',
                                password: 'Password123$',
                                repeatPassword: 'Password123$',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({});
                        });
                    });

                    describe('password', () => {
                        it('should accept valid value.', async () => {
                            await harness.setValues({
                                name: 'John Williams',
                                email: 'user@email.com',
                                password: 'Pass123$',
                                repeatPassword: 'Pass123$',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({});
                        });

                        it('should reject empty string.', async () => {
                            await harness.setValues({
                                name: 'John Williams',
                                email: 'user@email.com',
                                password: '',
                                repeatPassword: '',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                password: 'O campo é obrigatório.',
                                repeatPassword: 'O campo é obrigatório.',
                            });
                        });

                        it('should reject value shorter than min length.', async () => {
                            await harness.setValues({
                                name: 'John Williams',
                                email: 'user@email.com',
                                password: 'Pas123$',
                                repeatPassword: 'Pas123$',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                password: 'O comprimento mínimo permitido é 8.',
                            });
                        });

                        it('should accept value with the min length.', async () => {
                            await harness.setValues({
                                name: 'John Williams',
                                email: 'user@email.com',
                                password: 'Pass123$',
                                repeatPassword: 'Pass123$',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({});
                        });

                        it('should reject value longer than max length.', async () => {
                            await harness.setValues({
                                name: 'John Williams',
                                email: 'user@email.com',
                                password: 'Password1234$',
                                repeatPassword: 'Password1234$',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                password:
                                    'O comprimento máximo permitido é 12.',
                            });
                        });

                        it('should accept value with the max length.', async () => {
                            await harness.setValues({
                                name: 'John Williams',
                                email: 'user@email.com',
                                password: 'Password123$',
                                repeatPassword: 'Password123$',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({});
                        });

                        it('should reject value without uppercase letter.', async () => {
                            await harness.setValues({
                                name: 'John Williams',
                                email: 'user@email.com',
                                password: 'password123$',
                                repeatPassword: 'password123$',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                password:
                                    'Deve conter maíscula, minúscula, número e caractere especial.',
                            });
                        });

                        it('should reject value without lowercase letter.', async () => {
                            await harness.setValues({
                                name: 'John Williams',
                                email: 'user@email.com',
                                password: 'PASSWORD123$',
                                repeatPassword: 'PASSWORD123$',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                password:
                                    'Deve conter maíscula, minúscula, número e caractere especial.',
                            });
                        });

                        it('should reject value without digit.', async () => {
                            await harness.setValues({
                                name: 'John Williams',
                                email: 'user@email.com',
                                password: 'Password$',
                                repeatPassword: 'Password$',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                password:
                                    'Deve conter maíscula, minúscula, número e caractere especial.',
                            });
                        });

                        it('should reject value without special character.', async () => {
                            await harness.setValues({
                                name: 'John Williams',
                                email: 'user@email.com',
                                password: 'Password123',
                                repeatPassword: 'Password123',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                password:
                                    'Deve conter maíscula, minúscula, número e caractere especial.',
                            });
                        });

                        it('should reject value with space.', async () => {
                            await harness.setValues({
                                name: 'John Williams',
                                email: 'user@email.com',
                                password: 'Pass 123$',
                                repeatPassword: 'Pass 123$',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({ password: 'Inválido.' });
                        });
                    });

                    describe('repeatPassword', () => {
                        it('should accept valid value.', async () => {
                            await harness.setValues({
                                name: 'John Williams',
                                email: 'user@email.com',
                                password: 'Pass123$',
                                repeatPassword: 'Pass123$',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({});
                        });

                        it('should reject empty string.', async () => {
                            await harness.setValues({
                                name: 'John Williams',
                                email: 'user@email.com',
                                password: '',
                                repeatPassword: '',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                password: 'O campo é obrigatório.',
                                repeatPassword: 'O campo é obrigatório.',
                            });
                        });

                        it("should reject value when passwords don't matches.", async () => {
                            await harness.setValues({
                                name: 'John Williams',
                                email: 'user@email.com',
                                password: 'Password123$',
                                repeatPassword: 'Password124$',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                repeatPassword: 'As senhas não coincidem.',
                            });
                        });
                    });

                    describe('acceptTerms', () => {
                        it('should accept when checked.', async () => {
                            await harness.setValues({
                                name: 'John Williams',
                                email: 'user@email.com',
                                password: 'Pass123$',
                                repeatPassword: 'Pass123$',
                                acceptTerms: true,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({});
                        });

                        it('should reject when not checked.', async () => {
                            await harness.setValues({
                                name: 'John Williams',
                                email: 'user@email.com',
                                password: 'Pass123$',
                                repeatPassword: 'Pass123$',
                                acceptTerms: false,
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({ acceptTerms: true });
                        });
                    });
                });
            });

            describe('on submit.', () => {
                it('should handle local error during form submission.', async () => {
                    const location = TestBed.inject(Location);
                    await harness.setValues({
                        name: 'J',
                        email: 'john@',
                        password: 'Pass',
                        repeatPassword: 'Password123$',
                        acceptTerms: false,
                    });
                    await harness.clickRegisterButton();

                    expect(authServiceSpy.register).not.toHaveBeenCalled();
                    expect(location.path()).toBe('');
                    expect(routerSpy).not.toHaveBeenCalled();
                    const errors = await harness.getErrors();
                    expect(errors).toEqual({
                        name: 'O comprimento mínimo permitido é 6.',
                        email: 'E-mail inválido.',
                        password: 'O comprimento mínimo permitido é 8.',
                        repeatPassword: 'As senhas não coincidem.',
                        acceptTerms: true,
                    });
                    const values = await harness.getValues();
                    expect(values).toEqual({
                        name: 'J',
                        email: 'john@',
                        password: 'Pass',
                        repeatPassword: 'Password123$',
                        acceptTerms: false,
                    });
                });
            });
        });

        describe('remote errors', () => {
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

            it('should handle main remote error during registration', async () => {
                const exception: any = new Error('Registration failed!');
                exception.error = {
                    error: ExceptionName.unprocessable_entity,
                    message: 'Algo deu errado!',
                };
                exception.message = 'Some error';
                exception.name = 'HttpErrorResponse';
                exception.status = HttpStatusCode.UnprocessableEntity;
                exception.statusText = 'Unprocessable Entity';
                const location = TestBed.inject(Location);
                authServiceSpy.register.and.returnValue(
                    throwError(() => exception),
                );
                await harness.setValues({
                    name: 'John Williams',
                    email: 'john@email.com',
                    password: 'Password123$',
                    repeatPassword: 'Password123$',
                    acceptTerms: true,
                });
                await harness.clickRegisterButton();
                fixture.detectChanges();

                expect(authServiceSpy.register).toHaveBeenCalledWith({
                    name: 'John Williams',
                    email: 'john@email.com',
                    password: 'Password123$',
                    repeatPassword: 'Password123$',
                    acceptTerms: true,
                });

                const errors = await harness.getErrors();
                expect(errors).toEqual({ main: 'Algo deu errado!' });
                const values = await harness.getValues();
                expect(values).toEqual({
                    name: 'John Williams',
                    email: 'john@email.com',
                    password: 'Password123$',
                    repeatPassword: 'Password123$',
                    acceptTerms: true,
                });

                expect(location.path()).toBe('');
                expect(routerSpy).not.toHaveBeenCalled();
            });

            it('should handle form fields remote errors during registration', async () => {
                const exception: any = new Error('Registration failed!');
                exception.error = {
                    error: ExceptionName.unprocessable_entity,
                    message: {
                        name: 'Error 1',
                        email: 'Error 2',
                        password: 'Error 3',
                        repeatPassword: 'Error 4',
                        acceptTerms: true,
                    },
                };
                exception.message = 'Algo deu errado!';
                exception.name = 'HttpErrorResponse';
                exception.status = HttpStatusCode.UnprocessableEntity;
                exception.statusText = 'Unprocessable Entity';
                const location = TestBed.inject(Location);
                authServiceSpy.register.and.returnValue(
                    throwError(() => exception),
                );
                await harness.setValues({
                    name: 'John Williams',
                    email: 'john@email.com',
                    password: 'Password123$',
                    repeatPassword: 'Password123$',
                    acceptTerms: true,
                });
                await harness.clickRegisterButton();
                fixture.detectChanges();

                expect(location.path()).toBe('');
                expect(authServiceSpy.register).toHaveBeenCalledWith({
                    name: 'John Williams',
                    email: 'john@email.com',
                    password: 'Password123$',
                    repeatPassword: 'Password123$',
                    acceptTerms: true,
                });

                const errors = await harness.getErrors();
                expect(errors).toEqual({
                    name: 'Error 1',
                    email: 'Error 2',
                    password: 'Error 3',
                    repeatPassword: 'Error 4',
                    acceptTerms: true,
                });
                const values = await harness.getValues();
                expect(values).toEqual({
                    name: 'John Williams',
                    email: 'john@email.com',
                    password: 'Password123$',
                    repeatPassword: 'Password123$',
                    acceptTerms: true,
                });

                expect(routerSpy).not.toHaveBeenCalled();
            });
        });
    });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpStatusCode } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import {
    testButton,
    testForm,
    testFormField,
} from '../../../test-utils/test-form-utils';
import { AlertComponent } from '../../components/alert/alert.component';
import { UserConfigs } from '../../configs/user/user.configs';
import { EmailConstants } from '../../constants/email/email.constants';
import { ExceptionName } from '../../enums/exception-names/exception-text.enum';
import { PasswordMessage } from '../../messages/password/password.messages';
import { TextMessage } from '../../messages/text/text.messages';
import { AuthService } from '../../services/auth/auth.service';
import { Role } from '../../services/user/dtos/role/role.enum';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from './login.component';

type LoginFormData = { email: string; password: string };

type LoginFormErrors = {
    mainError?: string;
    email?: string;
    password?: string;
};

type LoginExceptionData = {
    message: string;
    name: string;
    statusCode: HttpStatusCode.UnprocessableEntity;
    statusText: string;
    error: {
        error: string;
        message: { email?: string; password?: string } | string;
    };
};

type RemoteFormErrorData = {
    formData: LoginFormData;
    expectedErrors: LoginFormErrors;
    exceptionData: LoginExceptionData;
};

function generateEmail(options: {
    localPartLength: number;
    domainPartLength: number;
}) {
    const localPart = 'a'.repeat(options.localPartLength);
    const mailServer = 'b'.repeat(options.domainPartLength - 3);
    const domainPart = `@${mailServer}.c`;
    const email = localPart + domainPart;
    return email;
}

describe('LoginComponent', () => {
    let fixture: ComponentFixture<LoginComponent>;
    let component: LoginComponent;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let router: Router;

    beforeEach(async () => {
        const spy = jasmine.createSpyObj('AuthService', ['login']);

        await TestBed.configureTestingModule({
            imports: [
                LoginComponent,
                FormsModule,
                ReactiveFormsModule,
                MatIconModule,
                MatInputModule,
                MatFormFieldModule,
                MatButtonModule,
                MatCheckboxModule,
                MatCardModule,
                AlertComponent,
                MatProgressBarModule,
            ],
            providers: [
                provideAnimationsAsync(),
                {
                    provide: AuthService,
                    useValue: spy,
                },
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
    });

    function testFormFieldsValues(formData: LoginFormData) {
        // email
        const emailInput: MatInput =
            fixture.nativeElement.querySelector('input#email-input');
        expect(emailInput).not.toBeNull();
        expect(emailInput).not.toBeUndefined();
        const expectedEmail = formData.email ?? '';
        expect(emailInput.value).toEqual(expectedEmail);

        // password
        const passwordInput: MatInput = fixture.nativeElement.querySelector(
            'mat-form-field#password-field input#password-input',
        );
        expect(passwordInput).not.toBeNull();
        expect(passwordInput).not.toBeUndefined();
        const expectedPassword = formData.password ?? '';
        expect(passwordInput.value).toEqual(expectedPassword);

        // TODO: test error
    }

    function testErrorMessages(expectedErrors: LoginFormErrors) {
        /* MAIN ERROR */

        const mainErrorAlertComponent =
            fixture.nativeElement.querySelector('app-alert .message');
        if (expectedErrors.mainError) {
            expect(mainErrorAlertComponent).not.toBeNull();
            const text = mainErrorAlertComponent.textContent.trim();
            expect(text).toEqual(expectedErrors.mainError);
        } else {
            expect(mainErrorAlertComponent).toBeDefined();
        }

        /* FORM ERRORS */

        const emailError = fixture.nativeElement.querySelector(
            'mat-error#email-error',
        );
        const expectedEmailErrorComponent = expectedErrors.email ?? false;
        if (expectedEmailErrorComponent) {
            expect(emailError).not.toBeNull();
        } else {
            expect(emailError).toBeNull();
        }

        const passwordErrorComponent = fixture.nativeElement.querySelector(
            'mat-error#password-error',
        );
        const expectedPasswordError = expectedErrors.password ?? false;
        if (expectedPasswordError) {
            expect(passwordErrorComponent).not.toBeNull();
        } else {
            expect(passwordErrorComponent).toBeNull();
        }

        const errors: any = {
            email: emailError?.textContent?.trim(),
            password: passwordErrorComponent?.textContent?.trim(),
        };

        expect(errors).toEqual({
            email: expectedErrors.email,
            password: expectedErrors.password,
        });
    }

    function testLocalValidationOnBlur(localFormErrorParams: {
        formData: LoginFormData;
        expectedErrors?: LoginFormErrors;
    }) {
        component.form.setValue(localFormErrorParams.formData);

        // email

        const emailInput = fixture.debugElement.query(By.css('#email-input'));
        emailInput.triggerEventHandler('blur', {});

        // password

        const passwordInput = fixture.debugElement.query(
            By.css('#password-input'),
        );
        passwordInput.triggerEventHandler('blur', {});

        // test errors

        fixture.detectChanges();

        testFormFieldsValues(localFormErrorParams.formData);

        if (!localFormErrorParams.expectedErrors) {
            testErrorMessages({});
        } else {
            testErrorMessages(localFormErrorParams.expectedErrors);
        }
    }

    function testLocalValidationOnSubmit(localFormErrorParams: {
        formData: LoginFormData;
        expectedErrors?: LoginFormErrors;
    }) {
        if (!localFormErrorParams.expectedErrors) {
            spyOn(router, 'navigateByUrl');
            const routerSpy = spyOn(component['router'], 'navigate');
            component.form.setValue(localFormErrorParams.formData);
            authServiceSpy.login.and.returnValue(
                of({
                    status: 'success',
                    data: {
                        user: {
                            id: '891db31e-dfb5-42ed-b912-48b98463b004',
                            name: 'John Doe',
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
            const submitButton =
                fixture.nativeElement.querySelector('button#login');
            submitButton.click(new MouseEvent('click'));

            expect(authServiceSpy.login).toHaveBeenCalledOnceWith(
                localFormErrorParams.formData,
            );
            testErrorMessages({});
            testFormFieldsValues({ email: '', password: '' });
            expect(routerSpy).toHaveBeenCalledWith(['/']);
        } else {
            component.form.setValue(localFormErrorParams.formData);
            const submitButton =
                fixture.nativeElement.querySelector('button#login');
            submitButton.click();
            fixture.detectChanges();
            testFormFieldsValues(localFormErrorParams.formData);
            testErrorMessages(localFormErrorParams.expectedErrors);
        }
    }

    function testRemoteValidationFail(
        remoteFormErrorData: RemoteFormErrorData,
    ) {
        const exception: any = new Error('Login failed!');
        exception.error = remoteFormErrorData.exceptionData.error;
        exception.message = remoteFormErrorData.exceptionData.message;
        exception.name = remoteFormErrorData.exceptionData.name;
        exception.status = remoteFormErrorData.exceptionData.statusCode;
        authServiceSpy.login.and.returnValue(throwError(() => exception));
        exception.statusText = remoteFormErrorData.exceptionData.statusText;
        component.form.setValue(remoteFormErrorData.formData);
        const submitButton =
            fixture.nativeElement.querySelector('button#login');
        submitButton.click();
        fixture.detectChanges();
        testErrorMessages(remoteFormErrorData.expectedErrors);
    }

    it('should create', async () => {
        expect(component).toBeTruthy();
    });

    describe('login request', () => {
        it("should call service's login method on submit", () => {
            testLocalValidationOnSubmit({
                formData: {
                    email: 'john@example.com',
                    password: 'Password123$',
                },
            });
        });

        describe('remote errors', () => {
            it('should handle main remote error during login', () => {
                testRemoteValidationFail({
                    formData: {
                        email: 'johndoe@email.com',
                        password: 'Password123$',
                    },
                    expectedErrors: { mainError: 'Algo deu errado!' },
                    exceptionData: {
                        message: 'Some error',
                        name: 'HttpErrorResponse',
                        statusCode: HttpStatusCode.UnprocessableEntity,
                        statusText: 'Unprocessable Entity',
                        error: {
                            error: ExceptionName.unprocessable_entity,
                            message: 'Algo deu errado!',
                        },
                    },
                });
            });

            it('should handle form fields remote errors during login', () => {
                testRemoteValidationFail({
                    formData: {
                        email: 'johndoe@email.com',
                        password: 'Password123$',
                    },
                    expectedErrors: { email: 'Error 2', password: 'Error 3' },
                    exceptionData: {
                        message: 'Algo deu errado!',
                        name: 'HttpErrorResponse',
                        statusCode: HttpStatusCode.UnprocessableEntity,
                        statusText: 'Unprocessable Entity',
                        error: {
                            error: ExceptionName.unprocessable_entity,
                            message: { email: 'Error 2', password: 'Error 3' },
                        },
                    },
                });
            });
        });

        describe('local errors', () => {
            const _EmailMessage = new TextMessage({
                maxLength: EmailConstants.MAX_LENGTH,
            });

            const _PasswordMessage = new PasswordMessage({
                minLength: UserConfigs.PASSWORD_MIN_LENGTH,
                maxLength: UserConfigs.PASSWORD_MAX_LENGTH,
            });

            describe('on submit', () => {
                it('should handle local error during form submission', () => {
                    const error: any = new Error('Login failed');
                    error.error = {
                        error: ExceptionName.unprocessable_entity,
                        message: {
                            email: _EmailMessage.INVALID,
                            password: _PasswordMessage.MIN_LEN,
                        },
                    };
                    error.message = 'Algo deu errado!';
                    error.name = 'HttpErrorResponse';
                    error.status = 422;
                    authServiceSpy.login.and.returnValue(
                        throwError(() => error),
                    );
                    error.statusText = 'Unprocessable Entity';

                    component.form.setValue({
                        email: 'john@example.com',
                        password: 'Password123$',
                    });

                    const submitButton =
                        fixture.nativeElement.querySelector('button#login');
                    submitButton.click();

                    testLocalValidationOnSubmit({
                        formData: { email: 'email.com', password: 'Ab1$' },
                        expectedErrors: error.error.message,
                    });
                });

                describe('should handle local email error on submit', () => {
                    it('email should not be null', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                email: null as unknown as string,
                                password: 'Password123$',
                            },
                            expectedErrors: { email: _EmailMessage.REQUIRED },
                        });
                    });

                    it('email should not be empty', () => {
                        testLocalValidationOnSubmit({
                            formData: { email: '', password: 'Password123$' },
                            expectedErrors: { email: _EmailMessage.REQUIRED },
                        });
                    });

                    it('should accept email with minimum allowed length', () => {
                        const email = generateEmail({
                            localPartLength: 1,
                            domainPartLength: 4,
                        });
                        testLocalValidationOnSubmit({
                            formData: { email, password: 'Password123$' },
                        });
                    });

                    it('should accept email with maximum allowed length', () => {
                        const email = generateEmail({
                            localPartLength: EmailConstants.MAX_LOCAL_LENGTH,
                            domainPartLength: EmailConstants.MAX_DOMAIN_LENGTH,
                        });
                        testLocalValidationOnSubmit({
                            formData: { email, password: 'Password123$' },
                        });
                    });

                    it('email should not be invalid', () => {
                        const email = generateEmail({
                            localPartLength: 0,
                            domainPartLength: 4,
                        });
                        testLocalValidationOnSubmit({
                            formData: { email, password: 'Password123$' },
                            expectedErrors: { email: _EmailMessage.INVALID },
                        });
                    });

                    it('email local part should not be longer than allowed', () => {
                        const email = generateEmail({
                            localPartLength:
                                EmailConstants.MAX_LOCAL_LENGTH + 1,
                            domainPartLength: EmailConstants.MAX_DOMAIN_LENGTH,
                        });
                        testLocalValidationOnSubmit({
                            formData: { email, password: 'Password123$' },
                            expectedErrors: { email: _EmailMessage.INVALID },
                        });
                    });

                    it('email domain part should not be longer than allowed', () => {
                        const email = generateEmail({
                            localPartLength: EmailConstants.MAX_LOCAL_LENGTH,
                            domainPartLength:
                                EmailConstants.MAX_DOMAIN_LENGTH + 1,
                        });
                        testLocalValidationOnSubmit({
                            formData: { email, password: 'Password123$' },
                            expectedErrors: { email: _EmailMessage.INVALID },
                        });
                    });
                });

                describe('should handle local password error on submit', () => {
                    it('password should not be null', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                email: 'john@example.com',
                                password: null as unknown as string,
                            },
                            expectedErrors: {
                                password: _PasswordMessage.REQUIRED,
                            },
                        });
                    });

                    it('password should not to be empty', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                email: 'john@example.com',
                                password: '',
                            },
                            expectedErrors: {
                                password: _PasswordMessage.REQUIRED,
                            },
                        });
                    });

                    it('password should not be made of spaces', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                email: 'john@example.com',
                                password: ' Abc123$',
                            },
                            expectedErrors: {
                                password: _PasswordMessage.INVALID,
                            },
                        });
                    });

                    it('should accept password with minimum allowed length', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                email: 'johndoe@email.com',
                                password: 'Pass123$',
                            },
                        });
                    });

                    it('password should not be too short', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                email: 'john@example.com',
                                password: 'Abc123$',
                            },
                            expectedErrors: {
                                password: _PasswordMessage.INVALID,
                            },
                        });
                    });

                    it('should accept password with maximum allowed length', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                email: 'johndoe@email.com',
                                password: 'Pass1234567$',
                            },
                        });
                    });

                    it('password should not be too long', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                email: 'john@example.com',
                                password: 'Abcdef123459$',
                            },
                            expectedErrors: {
                                password: _PasswordMessage.INVALID,
                            },
                        });
                    });

                    it('password reject password without uppercase letter', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                email: 'john@example.com',
                                password: 'abcd123$',
                            },
                            expectedErrors: {
                                password: _PasswordMessage.INVALID,
                            },
                        });
                    });

                    it('password reject password without lower letter', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                email: 'john@example.com',
                                password: 'ABCD123$',
                            },
                            expectedErrors: {
                                password: _PasswordMessage.INVALID,
                            },
                        });
                    });

                    it('password reject password without number', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                email: 'john@example.com',
                                password: 'Abcdefg$',
                            },
                            expectedErrors: {
                                password: _PasswordMessage.INVALID,
                            },
                        });
                    });

                    it('password reject password without special caracter', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                email: 'john@example.com',
                                password: 'Abcd1234',
                            },
                            expectedErrors: {
                                password: _PasswordMessage.INVALID,
                            },
                        });
                    });
                });
            });

            describe('on blur', () => {
                it('should handle local error during email input blur', async () => {
                    testLocalValidationOnBlur({
                        formData: { email: 'email.com', password: 'Abc123_$' },
                        expectedErrors: { email: _EmailMessage.INVALID },
                    });
                });

                it('should handle local error during password input blur', async () => {
                    testLocalValidationOnBlur({
                        formData: {
                            email: 'email@email.com',
                            password: 'Abc12346',
                        },
                        expectedErrors: { password: _PasswordMessage.INVALID },
                    });
                });
            });
        });
    });

    describe('template', () => {
        it('should render the form element', async () => {
            fixture.detectChanges();

            const div = fixture.nativeElement as HTMLFormElement;
            expect(div).toBeInstanceOf(HTMLDivElement);
            expect(div.children).toHaveSize(1);

            const form = div.children[0] as HTMLFormElement;
            testForm(form, 4);

            // email

            const emailField = form.children[0] as Element;
            testFormField(emailField, {
                label: 'Email',
                value: '',
                type: 'email',
                autocomplete: 'on',
            });

            // password

            const passwordField = form.children[1] as Element;
            testFormField(passwordField, {
                label: 'Senha',
                value: '',
                type: 'password',
                autocomplete: 'on',
            });

            const loginButton = form.children[2] as HTMLButtonElement;
            testButton(loginButton, {
                id: 'login',
                label: ' Login ',
                type: 'submit',
                color: null,
                style: 'flat',
            });

            const registerButton = form.children[3] as HTMLButtonElement;
            testButton(registerButton, {
                id: 'register',
                label: ' Não tem tem uma conta? Cadastre-se',
                type: 'button',
                color: null,
                style: 'stroked',
            });
        });
    });
});

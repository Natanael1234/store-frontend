import { HttpStatusCode } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import {
    testButton,
    testForm,
    testFormField,
} from '../../../test-utils/test-form-utils';
import { AlertComponent } from '../../components/alert/alert.component';
import { UserConfigs } from '../../configs/user/user.configs';
import { ExceptionName } from '../../enums/exception-names/exception-text.enum';
import { PasswordMessage } from '../../messages/password/password.messages';
import { AuthService } from '../../services/auth/auth.service';
import { Role } from '../../services/user/dtos/role/role.enum';
import { UpdateLoggedInUserPasswordComponent } from './update-logged-in-user-password.component';

const SOMETHING_WENT_WRONG_MESSAGE = 'Algo deu errado!';

type FormData = {
    password: string;
    repeatPassword: string;
};

type FormErrors = {
    mainError?: string;
    password?: string;
    repeatPassword?: string;
};

type ExceptionData = {
    /** Human readable message. Ex.: "Something went wrong!".  */
    message: string;
    /** Exception class name. Ex.: "HttpErrorResponse". */
    name: string;
    /** Status code. Ex.: 422. */
    statusCode: HttpStatusCode.UnprocessableEntity;
    /** Status text. Ex.: "'Unprocessable Entity'". */
    statusText: string;
    error: {
        /** Backend exception class name. Ex.: "UnprocessableEntityException" */
        error: string;
        /** Message. Exs.:
         * "Something went wrong!" or
         * { email: 'Error 2', password: 'Error 3' }
         */
        message: { password?: string; repeatPassword?: string } | string;
    };
};

type RemoteFormErrorData = {
    formData: FormData;
    expectedErrors: FormErrors;
    exceptionData: ExceptionData;
};

describe('UpdateLoggedInUserPasswordComponent', () => {
    let fixture: ComponentFixture<UpdateLoggedInUserPasswordComponent>;
    let component: UpdateLoggedInUserPasswordComponent;
    let authServiceSpy: jasmine.SpyObj<AuthService>;

    beforeEach(async () => {
        const spy = jasmine.createSpyObj('AuthService', [
            'updateLoggedInUserPassword',
        ]);

        await TestBed.configureTestingModule({
            imports: [
                UpdateLoggedInUserPasswordComponent,
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
                    RouterTestingModule,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(UpdateLoggedInUserPasswordComponent);
        authServiceSpy = TestBed.inject(
            AuthService,
        ) as jasmine.SpyObj<AuthService>;

        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    function testFormFieldsValues(formData: FormData) {
        // password
        const passwordInput: MatInput = fixture.nativeElement.querySelector(
            'mat-form-field#password-field input#password-input',
        );
        expect(passwordInput).not.toBeNull();
        expect(passwordInput).not.toBeUndefined();
        const expectedPassword = formData.password ?? '';
        expect(passwordInput.value).toEqual(expectedPassword);

        // repeat password
        const repeatPasswordInput: MatInput =
            fixture.nativeElement.querySelector(
                'mat-form-field#repeat-password-field input#repeat-password-input',
            );
        expect(repeatPasswordInput).not.toBeNull();
        expect(repeatPasswordInput).not.toBeUndefined();
        const expectedRepeatPassword = formData.repeatPassword ?? '';
        expect(repeatPasswordInput.value).toEqual(expectedRepeatPassword);
    }

    function testErrorMessages(expectedErrors: FormErrors) {
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

        const passwordErrorComponent = fixture.nativeElement.querySelector(
            'mat-error#password-error',
        );
        const expectedPasswordError = expectedErrors.password ?? false;
        if (expectedPasswordError) {
            expect(passwordErrorComponent).not.toBeNull();
        } else {
            expect(passwordErrorComponent).toBeNull();
        }

        const repeatPasswordErrorComponent =
            fixture.nativeElement.querySelector(
                'mat-error#repeat-password-error',
            );
        const expectedRepeatPasswordError =
            repeatPasswordErrorComponent ?? false;
        if (expectedRepeatPasswordError) {
            expect(repeatPasswordErrorComponent).not.toBeNull();
        } else {
            expect(repeatPasswordErrorComponent).toBeNull();
        }

        const errors: any = {
            password: passwordErrorComponent?.textContent?.trim(),
            repeatPassword: repeatPasswordErrorComponent?.textContent?.trim(),
        };

        expect(errors).toEqual({
            password: expectedErrors.password,
            repeatPassword: expectedErrors.repeatPassword,
        });
    }

    function testLocalValidationOnBlur(localFormErrorParams: {
        formData: FormData;
        expectedErrors?: FormErrors;
    }) {
        component.form.setValue(localFormErrorParams.formData);

        // password

        const passwordInput = fixture.debugElement.query(
            By.css('#password-input'),
        );
        passwordInput.triggerEventHandler('blur', {});

        // repeatPassword

        const repeatPasswordInput = fixture.debugElement.query(
            By.css('#repeat-password-input'),
        );
        repeatPasswordInput.triggerEventHandler('blur', {});

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
        formData: FormData;
        expectedErrors?: FormErrors;
    }) {
        if (!localFormErrorParams.expectedErrors) {
            component.form.setValue(localFormErrorParams.formData);
            authServiceSpy.updateLoggedInUserPassword.and.returnValue(
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
            const submitButton = fixture.nativeElement.querySelector(
                'button#new-password',
            );
            submitButton.click(new MouseEvent('click'));

            expect(
                authServiceSpy.updateLoggedInUserPassword,
            ).toHaveBeenCalledOnceWith(localFormErrorParams.formData);
            testErrorMessages({});
            testFormFieldsValues({
                password: '',
                repeatPassword: '',
            });
        } else {
            component.form.setValue(localFormErrorParams.formData);
            const submitButton = fixture.nativeElement.querySelector(
                'button#new-password',
            );
            submitButton.click();
            fixture.detectChanges();
            testFormFieldsValues(localFormErrorParams.formData);
            testErrorMessages(localFormErrorParams.expectedErrors);
        }
    }

    function testRemoteValidationFail(
        remoteFormErrorData: RemoteFormErrorData,
    ) {
        const exception: any = new Error('Create new password failed!');
        exception.error = remoteFormErrorData.exceptionData.error;
        exception.message = remoteFormErrorData.exceptionData.message;
        exception.name = remoteFormErrorData.exceptionData.name;
        exception.status = remoteFormErrorData.exceptionData.statusCode;
        authServiceSpy.updateLoggedInUserPassword.and.returnValue(
            throwError(() => exception),
        );
        exception.statusText = remoteFormErrorData.exceptionData.statusText;
        component.form.setValue(remoteFormErrorData.formData);
        const submitButton = fixture.nativeElement.querySelector(
            'button#new-password',
        );
        submitButton.click();
        fixture.detectChanges();
        testErrorMessages(remoteFormErrorData.expectedErrors);
    }

    it('should create', async () => {
        expect(component).toBeTruthy();
    });

    describe('registration request', () => {
        it("should call service's updateLoggedInUserPassword method on submit", () => {
            testLocalValidationOnSubmit({
                formData: {
                    password: 'Password123$',
                    repeatPassword: 'Password123$',
                },
            });
        });

        describe('remote errors', () => {
            it('should handle main remote error during registration', () => {
                testRemoteValidationFail({
                    formData: {
                        password: 'Password123$',
                        repeatPassword: 'Password123$',
                    },
                    expectedErrors: {
                        mainError: SOMETHING_WENT_WRONG_MESSAGE,
                    },
                    exceptionData: {
                        message: 'Some error',
                        name: 'HttpErrorResponse',
                        statusCode: HttpStatusCode.UnprocessableEntity,
                        statusText: 'Unprocessable Entity',
                        error: {
                            error: ExceptionName.unprocessable_entity,
                            message: SOMETHING_WENT_WRONG_MESSAGE,
                        },
                    },
                });
            });

            it('should handle form fields remote errors during registration', () => {
                testRemoteValidationFail({
                    formData: {
                        password: 'Password123$',
                        repeatPassword: 'Password123$',
                    },
                    expectedErrors: {
                        password: 'Error 2',
                        repeatPassword: 'Error 3',
                    },
                    exceptionData: {
                        message: SOMETHING_WENT_WRONG_MESSAGE,
                        name: 'HttpErrorResponse',
                        statusCode: HttpStatusCode.UnprocessableEntity,
                        statusText: 'Unprocessable Entity',
                        error: {
                            error: ExceptionName.unprocessable_entity,
                            message: {
                                password: 'Error 2',
                                repeatPassword: 'Error 3',
                            },
                        },
                    },
                });
            });
        });

        describe('local errors', () => {
            const _PasswordMessage = new PasswordMessage({
                minLength: UserConfigs.PASSWORD_MIN_LENGTH,
                maxLength: UserConfigs.PASSWORD_MAX_LENGTH,
            });

            describe('on submit', () => {
                it('should handle local error during form submission', () => {
                    const error: any = new Error('Registration failed');
                    error.error = {
                        error: ExceptionName.unprocessable_entity,
                        message: {
                            password: _PasswordMessage.MIN_LEN,
                            repeatPassword: _PasswordMessage.DONT_MATCHES,
                        },
                    };
                    error.message = SOMETHING_WENT_WRONG_MESSAGE;
                    error.name = 'HttpErrorResponse';
                    error.status = 422;
                    authServiceSpy.updateLoggedInUserPassword.and.returnValue(
                        throwError(() => error),
                    );
                    error.statusText = 'Unprocessable Entity';

                    component.form.setValue({
                        password: 'Password123$',
                        repeatPassword: 'Password123$',
                    });

                    const submitButton = fixture.nativeElement.querySelector(
                        'button#new-password',
                    );
                    submitButton.click();

                    testLocalValidationOnSubmit({
                        formData: {
                            password: 'Ab1$',
                            repeatPassword: 'Abc123$',
                        },
                        expectedErrors: error.error.message,
                    });
                });

                describe('should handle local password error on submit', () => {
                    it('password should not be null', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                password: null as unknown as string,
                                repeatPassword: 'Password123$',
                            },
                            expectedErrors: {
                                password: _PasswordMessage.REQUIRED,
                                repeatPassword: _PasswordMessage.DONT_MATCHES,
                            },
                        });
                    });

                    it('password should not to be empty', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                password: '',
                                repeatPassword: '',
                            },
                            expectedErrors: {
                                password: _PasswordMessage.REQUIRED,
                                repeatPassword: _PasswordMessage.REQUIRED,
                            },
                        });
                    });

                    it('password should not be made of spaces', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                password: ' Abc123$',
                                repeatPassword: ' Abc123$',
                            },
                            expectedErrors: {
                                password: _PasswordMessage.INVALID,
                            },
                        });
                    });

                    it('should accept password with minimum allowed length', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                password: 'Pass123$',
                                repeatPassword: 'Pass123$',
                            },
                        });
                    });

                    it('password should not be too short', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                password: 'Abc123$',
                                repeatPassword: 'Abc123$',
                            },
                            expectedErrors: {
                                password: _PasswordMessage.MIN_LEN,
                            },
                        });
                    });

                    it('should accept password with maximum allowed length', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                password: 'Pass1234567$',
                                repeatPassword: 'Pass1234567$',
                            },
                        });
                    });

                    it('password should not be too long', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                password: 'Abcdef123459$',
                                repeatPassword: 'Abcdef123459$',
                            },
                            expectedErrors: {
                                password: _PasswordMessage.MAX_LEN,
                                repeatPassword: _PasswordMessage.MAX_LEN,
                            },
                        });
                    });

                    it('password reject password without uppercase letter', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                password: 'abcd123$',
                                repeatPassword: 'abcd123$',
                            },
                            expectedErrors: {
                                password: _PasswordMessage.STRONG,
                            },
                        });
                    });

                    it('password reject password without lower letter', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                password: 'ABCD123$',
                                repeatPassword: 'ABCD123$',
                            },
                            expectedErrors: {
                                password: _PasswordMessage.STRONG,
                            },
                        });
                    });

                    it('password reject password without number', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                password: 'Abcdefg$',
                                repeatPassword: 'Abcdefg$',
                            },
                            expectedErrors: {
                                password: _PasswordMessage.STRONG,
                            },
                        });
                    });

                    it('password reject password without special caracter', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                password: 'Abcd1234',
                                repeatPassword: 'Abcd1234',
                            },
                            expectedErrors: {
                                password: _PasswordMessage.STRONG,
                            },
                        });
                    });
                });

                describe('should handle local repeatPassword error on submit', () => {
                    it('should accept repeated password', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                password: 'Pass1234567$',
                                repeatPassword: 'Pass1234567$',
                            },
                        });
                    });

                    it('password should not be null', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                password: 'Password123$',
                                repeatPassword: null as unknown as string,
                            },
                            expectedErrors: {
                                repeatPassword: _PasswordMessage.REQUIRED,
                            },
                        });
                    });

                    it('password should not be empty', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                password: 'Password123$',
                                repeatPassword: '',
                            },
                            expectedErrors: {
                                repeatPassword: _PasswordMessage.REQUIRED,
                            },
                        });
                    });

                    it('should reject not repeated password', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                password: 'Password123$',
                                repeatPassword: 'Password124$',
                            },
                            expectedErrors: {
                                repeatPassword: _PasswordMessage.DONT_MATCHES,
                            },
                        });
                    });

                    it('should reject not repeated password', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                password: 'Password123$',
                                repeatPassword: 'Password124$',
                            },
                            expectedErrors: {
                                repeatPassword: _PasswordMessage.DONT_MATCHES,
                            },
                        });
                    });

                    it('should reject when repeated password is too long', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                password: 'Password1234$',
                                repeatPassword: 'Password1234$',
                            },
                            expectedErrors: {
                                password: _PasswordMessage.MAX_LEN,
                                repeatPassword: _PasswordMessage.MAX_LEN,
                            },
                        });
                    });
                });
            });

            describe('on blur', () => {
                it('should handle local error during password input blur', async () => {
                    testLocalValidationOnBlur({
                        formData: {
                            password: 'Abc12346',
                            repeatPassword: 'Abc12346',
                        },
                        expectedErrors: {
                            password: _PasswordMessage.STRONG,
                        },
                    });
                });

                it('should handle local error during repeatPassword input blur', async () => {
                    testLocalValidationOnBlur({
                        formData: {
                            password: 'Abc123*$',
                            repeatPassword: 'Abc124*$',
                        },
                        expectedErrors: {
                            repeatPassword: _PasswordMessage.DONT_MATCHES,
                        },
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
            testForm(form, 3);

            // password

            const passwordField = form.children[0] as Element;
            testFormField(passwordField, {
                label: 'Senha',
                value: '',
                type: 'password',
                autocomplete: 'new-password',
            });

            const hidePasswordIcon = passwordField.querySelector(
                '#show-password-icon',
            )!;

            hidePasswordIcon.dispatchEvent(
                new MouseEvent('click', { button: 1 }),
            );
            fixture.detectChanges();

            testFormField(passwordField, {
                label: 'Senha',
                value: '',
                type: 'text',
                autocomplete: 'new-password',
            });

            hidePasswordIcon.dispatchEvent(
                new MouseEvent('click', { button: 1 }),
            );
            fixture.detectChanges();

            testFormField(passwordField, {
                label: 'Senha',
                value: '',
                type: 'password',
                autocomplete: 'new-password',
            });

            // repeat password

            const repeatPasswordField = form.children[1] as Element;
            testFormField(repeatPasswordField, {
                label: 'Repita a Senha',
                value: '',
                type: 'password',
                autocomplete: 'new-password',
            });
            const hideRepeatPasswordIcon = repeatPasswordField.querySelector(
                '#show-repeat-password-icon',
            )!;
            hideRepeatPasswordIcon.dispatchEvent(
                new MouseEvent('click', { button: 1 }),
            );
            fixture.detectChanges();
            testFormField(repeatPasswordField, {
                label: 'Repita a Senha',
                value: '',
                type: 'text',
                autocomplete: 'new-password',
            });
            hideRepeatPasswordIcon.dispatchEvent(
                new MouseEvent('click', { button: 1 }),
            );
            fixture.detectChanges();
            testFormField(repeatPasswordField, {
                label: 'Repita a Senha',
                value: '',
                type: 'password',
                autocomplete: 'new-password',
            });

            const createPasswordButton = form.children[2] as HTMLButtonElement;
            testButton(createPasswordButton, {
                id: 'new-password',
                label: ' Salvar Senha ',
                type: 'submit',
                color: null,
                style: 'flat',
            });
        });
    });
});

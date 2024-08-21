import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterTestingModule } from '@angular/router/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { of, throwError } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth/auth.service';
import { LoginComponent } from '../login/login.component';
import { AlertComponent } from '../../components/alert/alert.component';
import {
  testButton,
  testCheckbox,
  testForm,
  testFormField,
} from '../../../test-utils/test-form-utils';
import { UserConfigs } from '../../configs/user/user.configs';
import { EmailConstants } from '../../constants/email/email.constants';
import { TextMessage } from '../../messages/text/text.messages';
import { PasswordMessage } from '../../messages/password/password.messages';
import { Role } from '../../services/user/role/role.enum';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { EmailMessage } from '../../messages/email/email.messages';

type FormData = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  acceptTerms: boolean;
};

type FormErrors = {
  mainError?: string;
  name?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
  acceptTerms?: boolean;
};

type ExceptionData = {
  message: string;
  name: string;
  statusCode: HttpStatusCode.UnprocessableEntity;
  statusText: string;
  error: {
    error: string;
    message:
      | {
          name?: string;
          email?: string;
          password?: string;
          repeatPassword?: string;
          acceptTerms?: boolean;
        }
      | string;
  };
};

type RemoteFormErrorData = {
  formData: FormData;
  expectedErrors: FormErrors;
  exceptionData: ExceptionData;
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

describe('RegisterComponent', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let component: RegisterComponent;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['register']);

    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
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
          RouterTestingModule,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  function testFormFieldsValues(formData: FormData) {
    // name
    const nameInput: MatInput = fixture.nativeElement.querySelector(
      'mat-form-field#name-field input#name-input'
    );
    expect(nameInput).not.toBeNull();
    expect(nameInput).not.toBeUndefined();
    const expectedName = formData.name ?? '';
    expect(nameInput.value).toEqual(expectedName);

    // email
    const emailInput: MatInput =
      fixture.nativeElement.querySelector('input#email-input');
    expect(emailInput).not.toBeNull();
    expect(emailInput).not.toBeUndefined();
    const expectedEmail = formData.email ?? '';
    expect(emailInput.value).toEqual(expectedEmail);

    // password
    const passwordInput: MatInput = fixture.nativeElement.querySelector(
      'mat-form-field#password-field input#password-input'
    );
    expect(passwordInput).not.toBeNull();
    expect(passwordInput).not.toBeUndefined();
    const expectedPassword = formData.password ?? '';
    expect(passwordInput.value).toEqual(expectedPassword);

    // repeat password
    const repeatPasswordInput: MatInput = fixture.nativeElement.querySelector(
      'mat-form-field#repeat-password-field input#repeat-password-input'
    );
    expect(repeatPasswordInput).not.toBeNull();
    expect(repeatPasswordInput).not.toBeUndefined();
    const expectedRepeatPassword = formData.repeatPassword ?? '';
    expect(repeatPasswordInput.value).toEqual(expectedRepeatPassword);

    // accept terms
    const acceptTermsCheckbox: HTMLLabelElement =
      fixture.nativeElement.querySelector('mat-checkbox');
    if (formData.acceptTerms) {
      expect(acceptTermsCheckbox.classList).toContain(
        'mat-mdc-checkbox-checked'
      );
    } else {
      expect(acceptTermsCheckbox.classList).not.toContain(
        'mat-mdc-checkbox-checked'
      );
    }

    // TODO: test error
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

    const nameErrorComponent =
      fixture.nativeElement.querySelector('#name-error');
    const expectedNameError = expectedErrors.name ?? false;
    if (expectedNameError) {
      expect(nameErrorComponent).not.toBeNull();
    } else {
      expect(nameErrorComponent).toBeNull();
    }

    const emailError = fixture.nativeElement.querySelector(
      'mat-error#email-error'
    );
    const expectedEmailErrorComponent = expectedErrors.email ?? false;
    if (expectedEmailErrorComponent) {
      expect(emailError).not.toBeNull();
    } else {
      expect(emailError).toBeNull();
    }

    const passwordErrorComponent = fixture.nativeElement.querySelector(
      'mat-error#password-error'
    );
    const expectedPasswordError = expectedErrors.password ?? false;
    if (expectedPasswordError) {
      expect(passwordErrorComponent).not.toBeNull();
    } else {
      expect(passwordErrorComponent).toBeNull();
    }

    const repeatPasswordErrorComponent = fixture.nativeElement.querySelector(
      'mat-error#repeat-password-error'
    );
    const expectedRepeatPasswordError = repeatPasswordErrorComponent ?? false;
    if (expectedRepeatPasswordError) {
      expect(repeatPasswordErrorComponent).not.toBeNull();
    } else {
      expect(repeatPasswordErrorComponent).toBeNull();
    }

    const acceptTermsCheckbox = fixture.nativeElement.querySelector(
      '#accept-terms-checkbox'
    );
    const acceptTermsClasses = [...acceptTermsCheckbox?.classList.values()];
    if (expectedErrors.acceptTerms) {
      expect(acceptTermsClasses).toContain('invalid');
    } else if (expectedErrors.acceptTerms === false) {
      expect(acceptTermsClasses).not.toContain('invalid');
    }

    const errors: any = {
      name: nameErrorComponent?.textContent?.trim(),
      email: emailError?.textContent?.trim(),
      password: passwordErrorComponent?.textContent?.trim(),
      repeatPassword: repeatPasswordErrorComponent?.textContent?.trim(),
      acceptTerms: acceptTermsClasses.includes('invalid'),
    };

    expect(errors).toEqual({
      name: expectedErrors.name,
      email: expectedErrors.email,
      password: expectedErrors.password,
      repeatPassword: expectedErrors.repeatPassword,
      acceptTerms: !!expectedErrors.acceptTerms,
    });
  }

  function testLocalValidationOnBlur(localFormErrorParams: {
    formData: FormData;
    expectedErrors?: FormErrors;
  }) {
    component.form.setValue(localFormErrorParams.formData);

    // name

    const nameInput = fixture.debugElement.query(By.css('#name-input'));
    nameInput.triggerEventHandler('blur', {});

    // email

    const emailInput = fixture.debugElement.query(By.css('#email-input'));
    emailInput.triggerEventHandler('blur', {});

    // password

    const passwordInput = fixture.debugElement.query(By.css('#password-input'));
    passwordInput.triggerEventHandler('blur', {});

    // repeatPassword

    const repeatPasswordInput = fixture.debugElement.query(
      By.css('#repeat-password-input')
    );
    repeatPasswordInput.triggerEventHandler('blur', {});

    // acceptTerms

    const acceptTermsCheckbox = fixture.debugElement.query(
      By.css('#accept-terms-checkbox')
    );
    acceptTermsCheckbox.triggerEventHandler('blur', {});

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
      spyOn(router, 'navigateByUrl');
      const routerSpy = spyOn(component['router'], 'navigate');
      component.form.setValue(localFormErrorParams.formData);
      authServiceSpy.register.and.returnValue(
        of({
          status: 'success',
          data: {
            user: {
              id: '891db31e-dfb5-42ed-b912-48b98463b004',
              name: 'John Doe',
              email: 'john@example.com',
              roles: [Role.USER],
              active: true,
              created: '2024-02-03T19:05:21.689Z',
              updated: '2024-02-03T19:05:21.689Z',
              deletedAt: null,
            },
            payload: {
              type: 'bearer',
              token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY5ODcxMjEsImV4cCI6MTcwNzA3MzUyMSwic3ViIjoiODkxZGIzMWUtZGZiNS00MmVkLWI5MTItNDhiOTg0NjNiMDA0In0.LaW-Z0DkU5ZheRtst0mvZ3WtMgMmMeawJVke9qtCVyE',
              refreshToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY5ODcxMjEsImV4cCI6NDI5ODk4NzEyMSwic3ViIjoiODkxZGIzMWUtZGZiNS00MmVkLWI5MTItNDhiOTg0NjNiMDA0IiwianRpIjoiMTI4In0.bJTClITMvD5NCDt5DjTmxn3DIjFOabEvsCvnK795VXU',
            },
          },
        })
      );
      const submitButton =
        fixture.nativeElement.querySelector('button#register');
      submitButton.click(new MouseEvent('click'));

      expect(authServiceSpy.register).toHaveBeenCalledOnceWith(
        localFormErrorParams.formData
      );
      testErrorMessages({});
      testFormFieldsValues({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        acceptTerms: false,
      });
      expect(routerSpy).toHaveBeenCalledWith(['/login']);
    } else {
      component.form.setValue(localFormErrorParams.formData);
      const submitButton =
        fixture.nativeElement.querySelector('button#register');
      submitButton.click();
      fixture.detectChanges();
      testFormFieldsValues(localFormErrorParams.formData);
      testErrorMessages(localFormErrorParams.expectedErrors);
    }
  }

  function testRemoteValidationFail(remoteFormErrorData: RemoteFormErrorData) {
    const exception: any = new Error('Registration failed!');
    exception.error = remoteFormErrorData.exceptionData.error;
    exception.message = remoteFormErrorData.exceptionData.message;
    exception.name = remoteFormErrorData.exceptionData.name;
    exception.status = remoteFormErrorData.exceptionData.statusCode;
    authServiceSpy.register.and.returnValue(throwError(() => exception));
    exception.statusText = remoteFormErrorData.exceptionData.statusText;
    component.form.setValue(remoteFormErrorData.formData);
    const submitButton = fixture.nativeElement.querySelector('button#register');
    submitButton.click();
    fixture.detectChanges();
    testErrorMessages(remoteFormErrorData.expectedErrors);
  }

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  describe('registration request', () => {
    it("should call service's register method on submit", () => {
      testLocalValidationOnSubmit({
        formData: {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'Password123$',
          repeatPassword: 'Password123$',
          acceptTerms: true,
        },
      });
    });

    describe('remote errors', () => {
      it('should handle main remote error during registration', () => {
        testRemoteValidationFail({
          formData: {
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: 'Password123$',
            repeatPassword: 'Password123$',
            acceptTerms: true,
          },
          expectedErrors: {
            mainError: 'Algo deu errado!',
          },
          exceptionData: {
            message: 'Some error',
            name: 'HttpErrorResponse',
            statusCode: HttpStatusCode.UnprocessableEntity,
            statusText: 'Unprocessable Entity',
            error: {
              error: 'UnprocessableEntityException',
              message: 'Algo deu errado!',
            },
          },
        });
      });

      it('should handle form fields remote errors during registration', () => {
        testRemoteValidationFail({
          formData: {
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: 'Password123$',
            repeatPassword: 'Password123$',
            acceptTerms: true,
          },
          expectedErrors: {
            name: 'Error 1',
            email: 'Error 2',
            password: 'Error 3',
            repeatPassword: 'Error 4',
            acceptTerms: true,
          },
          exceptionData: {
            message: 'Algo deu errado!',
            name: 'HttpErrorResponse',
            statusCode: HttpStatusCode.UnprocessableEntity,
            statusText: 'Unprocessable Entity',
            error: {
              error: 'UnprocessableEntityException',
              message: {
                name: 'Error 1',
                email: 'Error 2',
                password: 'Error 3',
                repeatPassword: 'Error 4',
                acceptTerms: true,
              },
            },
          },
        });
      });
    });

    describe('local errors', () => {
      const NameMessage = new TextMessage({
        minLength: UserConfigs.NAME_MIN_LENGTH,
        maxLength: UserConfigs.NAME_MAX_LENGTH,
      });

      const _EmailMessage = new TextMessage({
        maxLength: EmailConstants.MAX_LENGTH,
      });

      const _PasswordMessage = new PasswordMessage({
        minLength: UserConfigs.PASSWORD_MIN_LENGTH,
        maxLength: UserConfigs.PASSWORD_MAX_LENGTH,
      });

      describe('on submit', () => {
        it('should handle local error during form submission', () => {
          const error: any = new Error('Registration failed');
          error.error = {
            error: 'UnprocessableEntityException',
            message: {
              name: NameMessage.REQUIRED,
              email: _EmailMessage.INVALID,
              password: _PasswordMessage.MIN_LEN,
              repeatPassword: _PasswordMessage.DONT_MATCHES,
              acceptTerms: 'Acceptance of terms is required',
            },
          };
          error.message = 'Algo deu errado!';
          error.name = 'HttpErrorResponse';
          error.status = 422;
          authServiceSpy.register.and.returnValue(throwError(() => error));
          error.statusText = 'Unprocessable Entity';

          component.form.setValue({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'Password123$',
            repeatPassword: 'Password123$',
            acceptTerms: true,
          });

          const submitButton =
            fixture.nativeElement.querySelector('button#register');
          submitButton.click();

          testLocalValidationOnSubmit({
            formData: {
              name: null as unknown as string,
              email: 'email.com',
              password: 'Ab1$',
              repeatPassword: 'Abc123$',
              acceptTerms: false,
            },
            expectedErrors: error.error.message,
          });
        });

        describe('should handle local name error on submit', () => {
          it('name should not be null', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: null as unknown as string,
                email: 'john@example.com',
                password: 'Password123$',
                repeatPassword: 'Password123$',
                acceptTerms: true,
              },
              expectedErrors: { name: NameMessage.REQUIRED },
            });
          });

          it('name should not be empty', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: '',
                email: 'john@example.com',
                password: 'Password123$',
                repeatPassword: 'Password123$',
                acceptTerms: true,
              },
              expectedErrors: { name: NameMessage.REQUIRED },
            });
          });

          it('name should not be made of spaces', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: '      ',
                email: 'john@example.com',
                password: 'Password123$',
                repeatPassword: 'Password123$',
                acceptTerms: true,
              },
              expectedErrors: { name: NameMessage.REQUIRED },
            });
          });

          it('should not accept name shorter than allowed', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'x'.repeat(UserConfigs.NAME_MIN_LENGTH - 1),
                email: 'john@example.com',
                password: 'Password123$',
                repeatPassword: 'Password123$',
                acceptTerms: true,
              },
              expectedErrors: { name: NameMessage.MIN_LEN },
            });
          });

          it('should accept the shortest name allowed', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'x'.repeat(UserConfigs.NAME_MIN_LENGTH),
                email: 'john@example.com',
                password: 'Password123$',
                repeatPassword: 'Password123$',
                acceptTerms: true,
              },
            });
          });

          it('should accept the longest name allowed', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'x'.repeat(UserConfigs.NAME_MAX_LENGTH),
                email: 'john@example.com',
                password: 'Password123$',
                repeatPassword: 'Password123$',
                acceptTerms: true,
              },
            });
          });

          it('should not accept name longer than allowed', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'x'.repeat(UserConfigs.NAME_MAX_LENGTH + 1),
                email: 'john@example.com',
                password: 'Password123$',
                repeatPassword: 'Password123$',
                acceptTerms: true,
              },
              expectedErrors: { name: NameMessage.MAX_LEN },
            });
          });
        });

        describe('should handle local email error on submit', () => {
          it('email should not be null', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email: null as unknown as string,
                password: 'Password123$',
                repeatPassword: 'Password123$',
                acceptTerms: true,
              },
              expectedErrors: { email: _EmailMessage.REQUIRED },
            });
          });

          it('email should not be empty', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email: '',
                password: 'Password123$',
                repeatPassword: 'Password123$',
                acceptTerms: true,
              },
              expectedErrors: { email: _EmailMessage.REQUIRED },
            });
          });

          it('should accept email with minimum allowed length', () => {
            const email = generateEmail({
              localPartLength: 1,
              domainPartLength: 4,
            });
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email,
                password: 'Password123$',
                repeatPassword: 'Password123$',
                acceptTerms: true,
              },
            });
          });

          it('should accept email with maximum allowed length', () => {
            const email = generateEmail({
              localPartLength: EmailConstants.MAX_LOCAL_LENGTH,
              domainPartLength: EmailConstants.MAX_DOMAIN_LENGTH,
            });
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email,
                password: 'Password123$',
                repeatPassword: 'Password123$',
                acceptTerms: true,
              },
            });
          });

          it('email should not be invalid', () => {
            const email = generateEmail({
              localPartLength: 0,
              domainPartLength: 4,
            });
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email,
                password: 'Password123$',
                repeatPassword: 'Password123$',
                acceptTerms: true,
              },
              expectedErrors: { email: _EmailMessage.INVALID },
            });
          });

          it('email local part should not be longer than allowed', () => {
            const email = generateEmail({
              localPartLength: EmailConstants.MAX_LOCAL_LENGTH + 1,
              domainPartLength: EmailConstants.MAX_DOMAIN_LENGTH,
            });
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email,
                password: 'Password123$',
                repeatPassword: 'Password123$',
                acceptTerms: true,
              },
              expectedErrors: { email: _EmailMessage.INVALID },
            });
          });

          it('email domain part should not be longer than allowed', () => {
            const email = generateEmail({
              localPartLength: EmailConstants.MAX_LOCAL_LENGTH,
              domainPartLength: EmailConstants.MAX_DOMAIN_LENGTH + 1,
            });
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email,
                password: 'Password123$',
                repeatPassword: 'Password123$',
                acceptTerms: true,
              },
              expectedErrors: { email: _EmailMessage.INVALID },
            });
          });
        });

        describe('should handle local password error on submit', () => {
          it('password should not be null', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email: 'john@example.com',
                password: null as unknown as string,
                repeatPassword: 'Password123$',
                acceptTerms: true,
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
                name: 'John Doe',
                email: 'john@example.com',
                password: '',
                repeatPassword: '',
                acceptTerms: true,
              },
              expectedErrors: {
                password: NameMessage.REQUIRED,
                repeatPassword: _PasswordMessage.REQUIRED,
              },
            });
          });

          it('password should not be made of spaces', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email: 'john@example.com',
                password: ' Abc123$',
                repeatPassword: ' Abc123$',
                acceptTerms: true,
              },
              expectedErrors: { password: _PasswordMessage.INVALID },
            });
          });

          it('should accept password with minimum allowed length', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email: 'johndoe@email.com',
                password: 'Pass123$',
                repeatPassword: 'Pass123$',
                acceptTerms: true,
              },
            });
          });

          it('password should not be too short', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Abc123$',
                repeatPassword: 'Abc123$',
                acceptTerms: true,
              },
              expectedErrors: {
                password: _PasswordMessage.MIN_LEN,
              },
            });
          });

          it('should accept password with maximum allowed length', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email: 'johndoe@email.com',
                password: 'Pass1234567$',
                repeatPassword: 'Pass1234567$',
                acceptTerms: true,
              },
            });
          });

          it('password should not be too long', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Abcdef123459$',
                repeatPassword: 'Abcdef123459$',
                acceptTerms: true,
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
                name: 'John Doe',
                email: 'john@example.com',
                password: 'abcd123$',
                repeatPassword: 'abcd123$',
                acceptTerms: true,
              },
              expectedErrors: {
                password: _PasswordMessage.STRONG,
              },
            });
          });

          it('password reject password without lower letter', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'ABCD123$',
                repeatPassword: 'ABCD123$',
                acceptTerms: true,
              },
              expectedErrors: {
                password: _PasswordMessage.STRONG,
              },
            });
          });

          it('password reject password without number', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Abcdefg$',
                repeatPassword: 'Abcdefg$',
                acceptTerms: true,
              },
              expectedErrors: {
                password: _PasswordMessage.STRONG,
              },
            });
          });

          it('password reject password without special character', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Abcd1234',
                repeatPassword: 'Abcd1234',
                acceptTerms: true,
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
                name: 'John Doe',
                email: 'johndoe@email.com',
                password: 'Pass1234567$',
                repeatPassword: 'Pass1234567$',
                acceptTerms: true,
              },
            });
          });

          it('password should not be null', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password123$',
                repeatPassword: null as unknown as string,
                acceptTerms: true,
              },
              expectedErrors: {
                repeatPassword: _PasswordMessage.REQUIRED,
              },
            });
          });

          it('password should not be empty', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password123$',
                repeatPassword: '',
                acceptTerms: true,
              },
              expectedErrors: {
                repeatPassword: _PasswordMessage.REQUIRED,
              },
            });
          });

          it('should reject not repeated password', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password123$',
                repeatPassword: 'Password124$',
                acceptTerms: true,
              },
              expectedErrors: {
                repeatPassword: _PasswordMessage.DONT_MATCHES,
              },
            });
          });

          it('should reject not repeated password', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password123$',
                repeatPassword: 'Password124$',
                acceptTerms: true,
              },
              expectedErrors: {
                repeatPassword: _PasswordMessage.DONT_MATCHES,
              },
            });
          });

          it('should reject when repeated password is too long', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password1234$',
                repeatPassword: 'Password1234$',
                acceptTerms: true,
              },
              expectedErrors: {
                password: _PasswordMessage.MAX_LEN,
                repeatPassword: _PasswordMessage.MAX_LEN,
              },
            });
          });
        });

        describe('should handle local acceptTerms error on submit', () => {
          it('should accept when acceptTerms is true', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password123$',
                repeatPassword: 'Password123$',
                acceptTerms: true,
              },
            });
          });

          it('should reject when acceptTerms is false', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password123$',
                repeatPassword: 'Password123$',
                acceptTerms: false,
              },
              expectedErrors: {
                acceptTerms: true,
              },
            });
          });

          it('should reject when acceptTerms is null', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password123$',
                repeatPassword: 'Password123$',
                acceptTerms: null as unknown as boolean,
              },
              expectedErrors: {
                acceptTerms: true,
              },
            });
          });

          it('should reject when acceptTerms is not boolean', () => {
            testLocalValidationOnSubmit({
              formData: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password123$',
                repeatPassword: 'Password123$',
                acceptTerms: 1 as unknown as boolean,
              },
              expectedErrors: {
                acceptTerms: true,
              },
            });
          });
        });
      });

      describe('on blur', () => {
        it('should handle local error during name input blur', async () => {
          testLocalValidationOnBlur({
            formData: {
              name: 'x',
              email: 'user@email.com',
              password: 'Abc123_$',
              repeatPassword: 'Abc123_$',
              acceptTerms: true,
            },
            expectedErrors: {
              name: NameMessage.MIN_LEN,
            },
          });
        });

        it('should handle local error during email input blur', async () => {
          testLocalValidationOnBlur({
            formData: {
              name: 'John Doe',
              email: 'email.com',
              password: 'Abc123_$',
              repeatPassword: 'Abc123_$',
              acceptTerms: true,
            },
            expectedErrors: {
              email: _EmailMessage.INVALID,
            },
          });
        });

        it('should handle local error during password input blur', async () => {
          testLocalValidationOnBlur({
            formData: {
              name: 'John Doe',
              email: 'email@email.com',
              password: 'Abc12346',
              repeatPassword: 'Abc12346',
              acceptTerms: true,
            },
            expectedErrors: {
              password: _PasswordMessage.STRONG,
            },
          });
        });

        it('should handle local error during repeatPassword input blur', async () => {
          testLocalValidationOnBlur({
            formData: {
              name: 'John Doe',
              email: 'email@email.com',
              password: 'Abc123*$',
              repeatPassword: 'Abc124*$',
              acceptTerms: true,
            },
            expectedErrors: {
              repeatPassword: _PasswordMessage.DONT_MATCHES,
            },
          });
        });

        it('should handle local error during acceptTerms input blur', async () => {
          testLocalValidationOnBlur({
            formData: {
              name: 'John Doe',
              email: 'email@email.com',
              password: 'Abc123*$',
              repeatPassword: 'Abc123*$',
              acceptTerms: false,
            },
            expectedErrors: {
              acceptTerms: true,
            },
          });
        });
      });
    });
  });

  xdescribe('template', () => {
    it('should render the form element', async () => {
      fixture.detectChanges();

      const div = fixture.nativeElement as HTMLFormElement;
      expect(div).toBeInstanceOf(HTMLDivElement);
      expect(div.children).toHaveSize(1);

      const form = div.children[0] as HTMLFormElement;
      testForm(form, 7);

      const nameField = form.children[0] as Element;
      testFormField(nameField, {
        label: 'Nome',
        value: '',
        type: 'text',
        autocomplete: 'off',
      });

      const emailField = form.children[1] as Element;
      testFormField(emailField, {
        label: 'Email',
        value: '',
        type: 'email',
        autocomplete: 'off',
      });

      const passwordField = form.children[2] as Element;
      testFormField(passwordField, {
        label: 'Senha',
        value: '',
        type: 'password',
        autocomplete: 'new-password',
      });

      const repeatPasswordField = form.children[3] as Element;
      testFormField(repeatPasswordField, {
        label: 'Repita a Senha',
        value: '',
        type: 'password',
        autocomplete: 'new-password',
      });

      const acceptTermsField = form.children[4] as Element;
      testCheckbox(acceptTermsField, {
        label: 'Aceito os Termos de Serviço * ',
        checked: false,
        error: false,
      });

      const registerButton = form.children[5] as HTMLButtonElement;
      testButton(registerButton, {
        id: 'register',
        label: ' Registrar ',
        type: 'submit',
        color: null,
        style: 'flat',
      });

      const loginButton = form.children[6] as HTMLButtonElement;
      testButton(loginButton, {
        id: 'login',
        label: ' Já tem uma conta? Login',
        type: 'button',
        color: null,
        style: 'stroked',
      });
    });
  });

  xdescribe('form', () => {
    it('should contain a register form group', () => {
      expect(component).toBeTruthy();
      expect(component['form'] instanceof FormGroup).toBeTrue();
    });

    it('should contain name form control', () => {
      expect(component['form'].get('name') instanceof FormGroup).toBeDefined();
      expect(component['form'].get('name')?.value).toEqual('');
    });

    it('should contain email form control', () => {
      expect(component['form'].get('email') instanceof FormGroup).toBeDefined();
      expect(component['form'].get('email')?.value).toEqual('');
    });
  });
});

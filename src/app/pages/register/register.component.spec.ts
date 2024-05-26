import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterComponent } from './register.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  testButton,
  testCheckbox,
  testForm,
  testFormField,
} from '../../../test-utils/test-form-utils';
import { AuthService } from '../../services/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { RegisterRequestDto } from '../../services/auth/dtos/register.request.dto';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponseDto } from '../../services/auth/dtos/auth.response.dto';
import { Role } from '../../services/user/role/role.enum';
import { LoginComponent } from '../login/login.component';
import { TextMessage } from '../../messages/text/text.messages';
import { UserConfigs } from '../../configs/user/user.configs';
import { HttpStatusCode } from '@angular/common/http';
import { PasswordMessage } from '../../messages/password/password.messages';
import { PasswordConstants } from '../../constants/password/password.constants';
import { By } from '@angular/platform-browser';

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
  acceptTerms?: string;
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
          acceptTerms?: string;
        }
      | string;
  };
};

describe('RegisterComponent', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let component: RegisterComponent;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router;

  let datax: RegisterRequestDto;
  let mockResponse: AuthResponseDto;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['register']);

    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        LoginComponent,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCheckboxModule,
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

    router = TestBed.inject(Router);

    datax = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password123$',
      repeatPassword: 'Password123$',
      acceptTerms: true,
    };

    mockResponse = {
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
    };

    fixture = TestBed.createComponent(RegisterComponent);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  function checkFormFields(formData: FormData) {
    // name
    const nameInput: MatInput = fixture.nativeElement.querySelector(
      'mat-form-field#name-field input#name-input'
    );
    expect(nameInput).not.toBeNull();
    expect(nameInput).not.toBeUndefined();
    expect(nameInput.value).toEqual(formData.name ?? '');

    // email
    const emailInput: MatInput =
      fixture.nativeElement.querySelector('input#email-input');
    expect(emailInput).not.toBeNull();
    expect(emailInput).not.toBeUndefined();
    expect(emailInput.value).toEqual(formData.email ?? '');

    // password
    const passwordInput: MatInput = fixture.nativeElement.querySelector(
      'mat-form-field#password-field input#password-input'
    );
    expect(passwordInput).not.toBeNull();
    expect(passwordInput).not.toBeUndefined();
    expect(passwordInput.value).toEqual(formData.password ?? '');

    // repeat password
    const repeatPasswordInput: MatInput = fixture.nativeElement.querySelector(
      'mat-form-field#repeat-password-field input#repeat-password-input'
    );
    expect(repeatPasswordInput).not.toBeNull();
    expect(repeatPasswordInput).not.toBeUndefined();
    expect(repeatPasswordInput.value).toEqual(formData.repeatPassword ?? '');

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
  }

  function checkErrorMessages(expectedErrors: FormErrors) {
    /* MAIN ERROR */

    const appAlert = fixture.nativeElement.querySelector('app-alert .message');
    if (expectedErrors.mainError) {
      expect(appAlert).not.toBeNull();
      const text = appAlert.textContent.trim();
      expect(text).toEqual(expectedErrors.mainError);
    } else {
      expect(appAlert).toBeDefined();
    }

    /* FORM ERRORS */

    const nameError = fixture.nativeElement.querySelector(
      'mat-error#name-error'
    );
    if (expectedErrors.name ?? false) {
      expect(nameError).not.toBeNull();
    } else {
      expect(nameError).toBeNull();
    }

    const emailError = fixture.nativeElement.querySelector(
      'mat-error#email-error'
    );
    if (expectedErrors.email ?? false) {
      expect(emailError).not.toBeNull();
    } else {
      expect(emailError).toBeNull();
    }
    const passwordError = fixture.nativeElement.querySelector(
      'mat-error#password-error'
    );
    if (expectedErrors.password ?? false) {
      expect(passwordError).not.toBeNull();
    } else {
      expect(passwordError).toBeNull();
    }
    const repeatPasswordError = fixture.nativeElement.querySelector(
      'mat-error#repeat-password-error'
    );
    if (repeatPasswordError ?? false) {
      expect(repeatPasswordError).not.toBeNull();
    } else {
      expect(repeatPasswordError).toBeNull();
    }
    const errors = {
      name: nameError?.textContent?.trim(),
      email: emailError?.textContent?.trim(),
      password: passwordError?.textContent?.trim(),
      repeatPassword: repeatPasswordError?.textContent?.trim(),
      acceptTerms: undefined,
    };
    expect(errors).toEqual({
      name: expectedErrors.name,
      email: expectedErrors.email,
      password: expectedErrors.password,
      repeatPassword: expectedErrors.repeatPassword,
      acceptTerms: undefined,
    });
  }

  function testValidationSuccess(formData: FormData) {
    spyOn(router, 'navigateByUrl');
    const routerSpy = spyOn(component['router'], 'navigate');
    component.form.setValue(formData);
    authServiceSpy.register.and.returnValue(of(mockResponse));
    const submitButton = fixture.nativeElement.querySelector('button#submit');
    submitButton.click();
    expect(authServiceSpy.register).toHaveBeenCalledOnceWith(formData);
    checkErrorMessages({});
    checkFormFields({
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      acceptTerms: false,
    });
    expect(routerSpy).toHaveBeenCalledWith(['/login']);
  }

  function testLocalValidationFail(
    formData: FormData,
    expectedErrors: FormErrors
  ) {
    component.form.setValue(formData);
    const submitButton = fixture.nativeElement.querySelector('button#submit');
    submitButton.click();
    fixture.detectChanges();
    checkFormFields(formData);
    checkErrorMessages(expectedErrors);
  }

  function testRemoteValidationFail(
    formData: FormData,
    expectedErrors: FormErrors,
    exceptionData: ExceptionData
  ) {
    const exception: any = new Error('Registration failed!');
    exception.error = exceptionData.error;
    exception.message = exceptionData.message;
    exception.name = exceptionData.name;
    exception.status = exceptionData.statusCode;
    authServiceSpy.register.and.returnValue(throwError(() => exception));
    exception.statusText = exceptionData.statusText;
    component.form.setValue(formData);
    const submitButton = fixture.nativeElement.querySelector('button#submit');
    submitButton.click();
    fixture.detectChanges();
    checkErrorMessages(expectedErrors);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('registration request', () => {
    it("should call service's register method on submit", () => {
      testValidationSuccess({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123$',
        repeatPassword: 'Password123$',
        acceptTerms: true,
      });
    });

    describe('remote errors', () => {
      it('should handle main remote error during registration', () => {
        testRemoteValidationFail(
          {
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: 'Password123$',
            repeatPassword: 'Password123$',
            acceptTerms: true,
          },
          {
            mainError: 'Algo deu errado!',
          },
          {
            message: 'Some error',
            name: 'HttpErrorResponse',
            statusCode: HttpStatusCode.UnprocessableEntity,
            statusText: 'Unprocessable Entity',
            error: {
              error: 'UnprocessableEntityException',
              message: 'Algo deu errado!',
            },
          }
        );
      });

      it('should handle form remote error during registration', () => {
        testRemoteValidationFail(
          {
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: 'Password123$',
            repeatPassword: 'Password123$',
            acceptTerms: true,
          },
          {
            name: 'Error 1',
            email: 'Error 2',
            password: 'Error 3',
            repeatPassword: 'Error 4',
            acceptTerms: 'Error 5',
          },
          {
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
                acceptTerms: 'Error 5',
              },
            },
          }
        );
      });
    });

    describe('local errors', () => {
      const NameMessage = new TextMessage({
        minLength: UserConfigs.NAME_MIN_LENGTH,
        maxLength: UserConfigs.NAME_MAX_LENGTH,
      });

      const EmailMessage = new TextMessage({
        maxLength: UserConfigs.EMAIL_MAX_LENGTH,
      });

      const _PasswordMessage = new PasswordMessage({
        minLength: PasswordConstants.MIN_LENGTH,
        maxLength: PasswordConstants.MAX_LENGTH,
      });

      it('should handle local error during registration', () => {
        const error: any = new Error('Registration failed');
        error.error = {
          error: 'UnprocessableEntityException',
          message: {
            name: NameMessage.REQUIRED,
            email: EmailMessage.INVALID,
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
          fixture.nativeElement.querySelector('button#submit');
        submitButton.click();

        testLocalValidationFail(
          {
            name: null as unknown as string,
            email: 'email.com',
            password: 'Ab1$',
            repeatPassword: 'Abc123$',
            acceptTerms: false,
          },
          error.error.message
        );
      });

      describe('name', () => {
        const NameMessage = new TextMessage({
          minLength: UserConfigs.NAME_MIN_LENGTH,
          maxLength: UserConfigs.NAME_MAX_LENGTH,
        });

        it('name should be not null', () => {
          testLocalValidationFail(
            {
              name: null as unknown as string,
              email: 'john@example.com',
              password: 'Password123$',
              repeatPassword: 'Password123$',
              acceptTerms: true,
            },
            { name: NameMessage.REQUIRED }
          );
        });

        it('name should be not to be empty', () => {
          testLocalValidationFail(
            {
              name: '',
              email: 'john@example.com',
              password: 'Password123$',
              repeatPassword: 'Password123$',
              acceptTerms: true,
            },
            { name: NameMessage.REQUIRED }
          );
        });

        it('name should be not be only one character long', () => {
          testLocalValidationFail(
            {
              name: 'x',
              email: 'john@example.com',
              password: 'Password123$',
              repeatPassword: 'Password123$',
              acceptTerms: true,
            },
            { name: NameMessage.MIN_LEN }
          );
        });

        it('name should be not be shorter than allowed', () => {
          testLocalValidationFail(
            {
              name: 'x'.repeat(UserConfigs.NAME_MIN_LENGTH - 1),
              email: 'john@example.com',
              password: 'Password123$',
              repeatPassword: 'Password123$',
              acceptTerms: true,
            },
            { name: NameMessage.MIN_LEN }
          );
        });

        it('name should have last least the minimum allowed size', () => {
          testValidationSuccess({
            name: 'x'.repeat(UserConfigs.NAME_MIN_LENGTH),
            email: 'john@example.com',
            password: 'Password123$',
            repeatPassword: 'Password123$',
            acceptTerms: true,
          });
        });

        it('name should have at maximum max allowed size', () => {
          testValidationSuccess({
            name: 'x'.repeat(UserConfigs.NAME_MAX_LENGTH),
            email: 'john@example.com',
            password: 'Password123$',
            repeatPassword: 'Password123$',
            acceptTerms: true,
          });
        });

        it('name should not be longer than allowed', () => {
          testLocalValidationFail(
            {
              name: 'x'.repeat(UserConfigs.NAME_MAX_LENGTH + 1),
              email: 'john@example.com',
              password: 'Password123$',
              repeatPassword: 'Password123$',
              acceptTerms: true,
            },
            { name: NameMessage.MAX_LEN }
          );
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
        autocomplete: 'off',
      });

      const repeatPasswordField = form.children[3] as Element;
      testFormField(repeatPasswordField, {
        label: 'Repita a Senha',
        value: '',
        type: 'password',
        autocomplete: 'off',
      });

      const acceptTermsField = form.children[4] as Element;
      testCheckbox(acceptTermsField, {
        label: 'Aceito os Termos de Serviço * ',
        checked: false,
      });

      const registerButton = form.children[5] as HTMLButtonElement;
      testButton(registerButton, {
        label: ' Registrar ',
        type: 'submit',
        color: 'accent',
      });

      const loginButton = form.children[6] as HTMLButtonElement;
      testButton(loginButton, {
        label: ' Já tem uma conta? Login',
        type: 'button',
        color: null,
      });
    });
  });

  describe('form', () => {
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

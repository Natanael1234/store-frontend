import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestPasswordChangeLinkComponent } from './request-password-change-link.component';
import { HttpStatusCode } from '@angular/common/http';
import {
  testButton,
  testForm,
  testFormField,
} from '../../../test-utils/test-form-utils';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { AlertComponent } from '../../components/alert/alert.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { EmailConstants } from '../../constants/email/email.constants';
import { TextMessage } from '../../messages/text/text.messages';
import { ExceptionName } from '../../utils/exception-names/exception-text.enum';

type RequestPasswordChangeLinkFormData = { email: string };

type RequestPasswordChangeLinkFormErrors = {
  mainError?: string;
  email?: string;
};

type RequestPasswordChangeLinkExceptionData = {
  message: string;
  name: string;
  statusCode: HttpStatusCode.UnprocessableEntity;
  statusText: string;
  error: {
    error: string;
    message: { email?: string } | string;
  };
};

type RemoteFormErrorData = {
  formData: RequestPasswordChangeLinkFormData;
  expectedErrors: RequestPasswordChangeLinkFormErrors;
  exceptionData: RequestPasswordChangeLinkExceptionData;
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

describe('RequestPasswordChangeLinkComponent', () => {
  let fixture: ComponentFixture<RequestPasswordChangeLinkComponent>;
  let component: RequestPasswordChangeLinkComponent;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', [
      'requestPasswordChangeLink',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        RequestPasswordChangeLinkComponent,
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

    fixture = TestBed.createComponent(RequestPasswordChangeLinkComponent);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  function testFormFieldsValues(formData: RequestPasswordChangeLinkFormData) {
    // email
    const emailInput: MatInput =
      fixture.nativeElement.querySelector('input#email-input');
    expect(emailInput).not.toBeNull();
    expect(emailInput).not.toBeUndefined();
    const expectedEmail = formData.email ?? '';
    expect(emailInput.value).toEqual(expectedEmail);

    // TODO: test error
  }

  function testErrorMessages(
    expectedErrors: RequestPasswordChangeLinkFormErrors
  ) {
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

    const errors: any = {
      email: emailError?.textContent?.trim(),
    };

    expect(errors).toEqual({
      email: expectedErrors.email,
    });
  }

  function testLocalValidationOnBlur(localFormErrorParams: {
    formData: RequestPasswordChangeLinkFormData;
    expectedErrors?: RequestPasswordChangeLinkFormErrors;
  }) {
    component.form.setValue(localFormErrorParams.formData);

    // email

    const emailInput = fixture.debugElement.query(By.css('#email-input'));
    emailInput.triggerEventHandler('blur', {});

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
    formData: RequestPasswordChangeLinkFormData;
    expectedErrors?: RequestPasswordChangeLinkFormErrors;
  }) {
    if (!localFormErrorParams.expectedErrors) {
      spyOn(router, 'navigateByUrl');
      const routerSpy = spyOn(component['router'], 'navigate');
      component.form.setValue(localFormErrorParams.formData);
      authServiceSpy.requestPasswordChangeLink.and.returnValue(of(true));
      const submitButton = fixture.nativeElement.querySelector(
        'button#request-password-change-link'
      );
      submitButton.click(new MouseEvent('click'));

      expect(authServiceSpy.requestPasswordChangeLink).toHaveBeenCalledOnceWith(
        localFormErrorParams.formData
      );
      testErrorMessages({});
      testFormFieldsValues({ email: '' });
      expect(routerSpy).toHaveBeenCalledWith(['/']);
    } else {
      component.form.setValue(localFormErrorParams.formData);
      const submitButton = fixture.nativeElement.querySelector(
        'button#request-password-change-link'
      );
      submitButton.click();
      fixture.detectChanges();
      testFormFieldsValues(localFormErrorParams.formData);
      testErrorMessages(localFormErrorParams.expectedErrors);
    }
  }

  function testRemoteValidationFail(remoteFormErrorData: RemoteFormErrorData) {
    const exception: any = new Error('Password change request failed!');
    exception.error = remoteFormErrorData.exceptionData.error;
    exception.message = remoteFormErrorData.exceptionData.message;
    exception.name = remoteFormErrorData.exceptionData.name;
    exception.status = remoteFormErrorData.exceptionData.statusCode;
    authServiceSpy.requestPasswordChangeLink.and.returnValue(
      throwError(() => exception)
    );
    exception.statusText = remoteFormErrorData.exceptionData.statusText;
    component.form.setValue(remoteFormErrorData.formData);
    const submitButton = fixture.nativeElement.querySelector(
      'button#request-password-change-link'
    );
    submitButton.click();
    fixture.detectChanges();
    testErrorMessages(remoteFormErrorData.expectedErrors);
  }

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  describe('requestPasswordChangeLink request', () => {
    it("should call service's requestPasswordChangeLink method on submit", () => {
      testLocalValidationOnSubmit({
        formData: { email: 'john@example.com' },
      });
    });

    describe('remote errors', () => {
      it('should handle main remote error during request', () => {
        testRemoteValidationFail({
          formData: { email: 'johndoe@email.com' },
          expectedErrors: { mainError: 'Algo deu errado!' },
          exceptionData: {
            message: 'Some error',
            name: 'HttpErrorResponse',
            statusCode: HttpStatusCode.UnprocessableEntity,
            statusText: 'Unprocessable Entity',
            error: {
              error: ExceptionName.UNPROCESSABLE_ENTITY,
              message: 'Algo deu errado!',
            },
          },
        });
      });

      it('should handle form fields remote errors during request', () => {
        testRemoteValidationFail({
          formData: { email: 'johndoe@email.com' },
          expectedErrors: { email: 'Error 2' },
          exceptionData: {
            message: 'Algo deu errado!',
            name: 'HttpErrorResponse',
            statusCode: HttpStatusCode.UnprocessableEntity,
            statusText: 'Unprocessable Entity',
            error: {
              error: ExceptionName.UNPROCESSABLE_ENTITY,
              message: { email: 'Error 2' },
            },
          },
        });
      });
    });

    describe('local errors', () => {
      const _EmailMessage = new TextMessage({
        maxLength: EmailConstants.MAX_LENGTH,
      });

      describe('on submit', () => {
        it('should handle local error during form submission', () => {
          const error: any = new Error('Request password change failed');
          error.error = {
            error: ExceptionName.UNPROCESSABLE_ENTITY,
            message: {
              email: _EmailMessage.INVALID,
            },
          };
          error.message = 'Algo deu errado!';
          error.name = 'HttpErrorResponse';
          error.status = 422;
          authServiceSpy.requestPasswordChangeLink.and.returnValue(
            throwError(() => error)
          );
          error.statusText = 'Unprocessable Entity';

          component.form.setValue({
            email: 'john@example.com',
          });

          const submitButton = fixture.nativeElement.querySelector(
            'button#request-password-change-link'
          );
          submitButton.click();

          testLocalValidationOnSubmit({
            formData: { email: 'email.com' },
            expectedErrors: error.error.message,
          });
        });

        describe('should handle local email error on submit', () => {
          it('email should not be null', () => {
            testLocalValidationOnSubmit({
              formData: { email: null as unknown as string },
              expectedErrors: { email: _EmailMessage.REQUIRED },
            });
          });

          it('email should not be empty', () => {
            testLocalValidationOnSubmit({
              formData: { email: '' },
              expectedErrors: { email: _EmailMessage.REQUIRED },
            });
          });

          it('should accept email with minimum allowed length', () => {
            const email = generateEmail({
              localPartLength: 1,
              domainPartLength: 4,
            });
            testLocalValidationOnSubmit({
              formData: { email },
            });
          });

          it('should accept email with maximum allowed length', () => {
            const email = generateEmail({
              localPartLength: EmailConstants.MAX_LOCAL_LENGTH,
              domainPartLength: EmailConstants.MAX_DOMAIN_LENGTH,
            });
            testLocalValidationOnSubmit({
              formData: { email },
            });
          });

          it('email should not be invalid', () => {
            const email = generateEmail({
              localPartLength: 0,
              domainPartLength: 4,
            });
            testLocalValidationOnSubmit({
              formData: { email },
              expectedErrors: { email: _EmailMessage.INVALID },
            });
          });

          it('email local part should not be longer than allowed', () => {
            const email = generateEmail({
              localPartLength: EmailConstants.MAX_LOCAL_LENGTH + 1,
              domainPartLength: EmailConstants.MAX_DOMAIN_LENGTH,
            });
            testLocalValidationOnSubmit({
              formData: { email },
              expectedErrors: { email: _EmailMessage.INVALID },
            });
          });

          it('email domain part should not be longer than allowed', () => {
            const email = generateEmail({
              localPartLength: EmailConstants.MAX_LOCAL_LENGTH,
              domainPartLength: EmailConstants.MAX_DOMAIN_LENGTH + 1,
            });
            testLocalValidationOnSubmit({
              formData: { email },
              expectedErrors: { email: _EmailMessage.INVALID },
            });
          });
        });
      });

      describe('on blur', () => {
        it('should handle local error during email input blur', async () => {
          testLocalValidationOnBlur({
            formData: { email: 'email.com' },
            expectedErrors: { email: _EmailMessage.INVALID },
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
      expect(form).toBeDefined();
      testForm(form, 2);
      // email

      const emailField = form.children[0] as Element;
      testFormField(emailField, {
        label: 'Email',
        value: '',
        type: 'email',
        autocomplete: 'on',
      });

      const requirePasswordChangeLinkButton = form
        .children[1] as HTMLButtonElement;
      testButton(requirePasswordChangeLinkButton, {
        id: 'request-password-change-link',
        label: ' Request password change ',
        type: 'submit',
        color: null,
        style: 'flat',
      });
    });
  });
});

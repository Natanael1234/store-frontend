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
import { Router } from '@angular/router';
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
import { TextMessage } from '../../messages/text/text.messages';
import { AuthService } from '../../services/auth/auth.service';
import { EditOwnProfileComponent } from './edit-own-profile.component';

type FormData = { name: string };

type FormErrors = { mainError?: string; name?: string };

type ExceptionData = {
    message: string;
    name: string;
    statusCode: HttpStatusCode.UnprocessableEntity;
    statusText: string;
    error: { error: string; message: { name?: string } | string };
};

type RemoteFormErrorData = {
    formData: FormData;
    expectedErrors: FormErrors;
    exceptionData: ExceptionData;
};

describe('EditOwnProfileComponent', () => {
    let fixture: ComponentFixture<EditOwnProfileComponent>;
    let component: EditOwnProfileComponent;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let router: Router;

    beforeEach(async () => {
        const spy = jasmine.createSpyObj('AuthService', ['editOwnProfile']);

        await TestBed.configureTestingModule({
            imports: [
                EditOwnProfileComponent,
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

        fixture = TestBed.createComponent(EditOwnProfileComponent);
        authServiceSpy = TestBed.inject(
            AuthService,
        ) as jasmine.SpyObj<AuthService>;

        component = fixture.componentInstance;
        router = TestBed.inject(Router);

        fixture.detectChanges();
    });

    function testFormFieldsValues(formData: FormData) {
        // name
        const nameInput: MatInput = fixture.nativeElement.querySelector(
            'mat-form-field#name-field input#name-input',
        );
        expect(nameInput).not.toBeNull();
        expect(nameInput).not.toBeUndefined();
        const expectedName = formData.name ?? '';
        expect(nameInput.value).toEqual(expectedName);

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

        const errors: any = { name: nameErrorComponent?.textContent?.trim() };

        expect(errors).toEqual({ name: expectedErrors.name });
    }

    function testLocalValidationOnBlur(localFormErrorParams: {
        formData: FormData;
        expectedErrors?: FormErrors;
    }) {
        component.form.setValue(localFormErrorParams.formData);

        // name

        const nameInput = fixture.debugElement.query(By.css('#name-input'));
        nameInput.triggerEventHandler('blur', {});

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
            authServiceSpy.editOwnProfile.and.returnValue(of(true));
            const submitButton =
                fixture.nativeElement.querySelector('button#save');
            submitButton.click(new MouseEvent('click'));

            expect(authServiceSpy.editOwnProfile).toHaveBeenCalledOnceWith(
                localFormErrorParams.formData,
            );
            testErrorMessages({});
            testFormFieldsValues({ name: localFormErrorParams.formData.name });
            expect(routerSpy).not.toHaveBeenCalled();
        } else {
            component.form.setValue(localFormErrorParams.formData);
            const submitButton =
                fixture.nativeElement.querySelector('button#save');
            submitButton.click();
            fixture.detectChanges();
            testFormFieldsValues(localFormErrorParams.formData);
            testErrorMessages(localFormErrorParams.expectedErrors);
        }
    }

    function testRemoteValidationFail(
        remoteFormErrorData: RemoteFormErrorData,
    ) {
        const exception: any = new Error('Registration failed!');
        exception.error = remoteFormErrorData.exceptionData.error;
        exception.message = remoteFormErrorData.exceptionData.message;
        exception.name = remoteFormErrorData.exceptionData.name;
        exception.status = remoteFormErrorData.exceptionData.statusCode;
        authServiceSpy.editOwnProfile.and.returnValue(
            throwError(() => exception),
        );
        exception.statusText = remoteFormErrorData.exceptionData.statusText;
        component.form.setValue(remoteFormErrorData.formData);
        const submitButton = fixture.nativeElement.querySelector('button#save');
        submitButton.click();
        fixture.detectChanges();
        testErrorMessages(remoteFormErrorData.expectedErrors);
    }

    it('should create', async () => {
        expect(component).toBeTruthy();
    });

    describe('registration request', () => {
        it("should call service's editOwnProfile method on submit", () => {
            testLocalValidationOnSubmit({ formData: { name: 'John Doe' } });
        });

        describe('remote errors', () => {
            it('should handle main remote error during registration', () => {
                testRemoteValidationFail({
                    formData: { name: 'John Doe' },
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

            it('should handle form fields remote errors during registration', () => {
                testRemoteValidationFail({
                    formData: { name: 'John Doe' },
                    expectedErrors: { name: 'Error 1' },
                    exceptionData: {
                        message: 'Algo deu errado!',
                        name: 'HttpErrorResponse',
                        statusCode: HttpStatusCode.UnprocessableEntity,
                        statusText: 'Unprocessable Entity',
                        error: {
                            error: ExceptionName.unprocessable_entity,
                            message: { name: 'Error 1' },
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

            describe('on submit', () => {
                it('should handle local error during form submission', () => {
                    const error: any = new Error('Registration failed');
                    error.error = {
                        error: ExceptionName.unprocessable_entity,
                        message: { name: NameMessage.REQUIRED },
                    };
                    error.message = 'Algo deu errado!'; // TODO:
                    error.name = 'HttpErrorResponse'; // TODO:
                    error.status = 422;
                    authServiceSpy.editOwnProfile.and.returnValue(
                        throwError(() => error),
                    );
                    error.statusText = 'Unprocessable Entity'; // TODO:

                    component.form.setValue({ name: 'John Doe' });

                    const submitButton =
                        fixture.nativeElement.querySelector('button#save');
                    submitButton.click();

                    testLocalValidationOnSubmit({
                        formData: { name: null as unknown as string },
                        expectedErrors: error.error.message,
                    });
                });

                describe('should handle local name error on submit', () => {
                    it('name should not be null', () => {
                        testLocalValidationOnSubmit({
                            formData: { name: null as unknown as string },
                            expectedErrors: { name: NameMessage.REQUIRED },
                        });
                    });

                    it('name should not be empty', () => {
                        testLocalValidationOnSubmit({
                            formData: { name: '' },
                            expectedErrors: { name: NameMessage.REQUIRED },
                        });
                    });

                    it('name should not be made of spaces', () => {
                        testLocalValidationOnSubmit({
                            formData: { name: '      ' },
                            expectedErrors: { name: NameMessage.REQUIRED },
                        });
                    });

                    it('should not accept name shorter than allowed', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                name: 'x'.repeat(
                                    UserConfigs.NAME_MIN_LENGTH - 1,
                                ),
                            },
                            expectedErrors: { name: NameMessage.MIN_LEN },
                        });
                    });

                    it('should accept the shortest name allowed', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                name: 'x'.repeat(UserConfigs.NAME_MIN_LENGTH),
                            },
                        });
                    });

                    it('should accept the longest name allowed', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                name: 'x'.repeat(UserConfigs.NAME_MAX_LENGTH),
                            },
                        });
                    });

                    it('should not accept name longer than allowed', () => {
                        testLocalValidationOnSubmit({
                            formData: {
                                name: 'x'.repeat(
                                    UserConfigs.NAME_MAX_LENGTH + 1,
                                ),
                            },
                            expectedErrors: { name: NameMessage.MAX_LEN },
                        });
                    });
                });
            });

            describe('on blur', () => {
                it('should handle local error during name input blur', async () => {
                    testLocalValidationOnBlur({
                        formData: { name: 'x' },
                        expectedErrors: { name: NameMessage.MIN_LEN },
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
            testForm(form, 2);

            // name

            const nameField = form.children[0] as Element;
            testFormField(nameField, {
                label: 'Nome',
                value: '',
                type: 'text',
                autocomplete: 'off',
            });

            const saveButton = form.children[1] as HTMLButtonElement;
            testButton(saveButton, {
                id: 'save',
                label: ' Salvar ',
                type: 'submit',
                color: null,
                style: 'flat',
            });
        });
    });
});

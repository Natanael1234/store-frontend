import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Location } from '@angular/common';
import { HttpStatusCode } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
    ActivatedRoute,
    NavigationExtras,
    provideRouter,
    Router,
} from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { AlertComponent } from '../../components/alert/alert.component';
import { ButtonComponent } from '../../components/form/components/button/button.component';
import { ButtonAppearance } from '../../components/form/components/button/enum/appearance/button-appearance.enum';
import { PasswordFieldComponent } from '../../components/form/components/text/password-field/password-field.component';
import { AutoCompleteType } from '../../components/form/enums/auto-complete-type/auto-complete-type.enum';
import { UserConfigs } from '../../configs/user/user.configs';
import { ExceptionName } from '../../enums/exception-names/exception-text.enum';
import { AuthService } from '../../services/auth/auth.service';
import { Role } from '../../services/user/dtos/role/role.enum';
import { HomeComponent } from '../home/home.component';
import { NewPasswordComponent } from './new-password.component';
import { NewPasswordHarness } from './new-password.harness';

describe('NewPasswordComponent.', () => {
    let fixture: ComponentFixture<NewPasswordComponent>;
    let component: NewPasswordComponent;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let router: Router;
    let harness: NewPasswordHarness;

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

    function getSaveButtonComponent() {
        return getButtonComponents().find(
            (button) => button.id() == 'save-button',
        );
    }

    function getCanceluttonComponent() {
        return getButtonComponents().find(
            (button) => button.id() == 'cancel-button',
        );
    }

    // TODO: test loading

    beforeEach(async () => {
        const spy = jasmine.createSpyObj('AuthService', ['createNewPassword']);

        await TestBed.configureTestingModule({
            imports: [
                NewPasswordComponent,
                FormsModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatProgressBarModule,
                AlertComponent,
                PasswordFieldComponent,
                ButtonComponent,
            ],
            providers: [
                provideAnimationsAsync(),
                { provide: AuthService, useValue: spy },
                provideRouter([
                    {
                        path: 'home',
                        component: HomeComponent,
                        title: 'Home Page',
                    },
                ]),
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: new BehaviorSubject({ hash: 'SOME_HASH' }),
                    },
                },
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(NewPasswordComponent);
        authServiceSpy = TestBed.inject(
            AuthService,
        ) as jasmine.SpyObj<AuthService>;
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
        harness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            NewPasswordHarness,
        );
    });

    it('should create.', async () => {
        expect(component).toBeTruthy();

        const state = await harness.getState();
        expect(state).toEqual({ hasValidStructure: true });

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

        const saveButton = getSaveButtonComponent()!;

        expect(saveButton).toBeDefined();
        expect(saveButton).not.toBeNull();
        expect(saveButton.id()).toEqual('save-button');
        expect(saveButton.label()).toEqual('Salvar');
        expect(saveButton.icon()).toBeUndefined();
        expect(saveButton.appearance()).toEqual(ButtonAppearance.filled);
        expect(saveButton.disabled()).toBeFalse();
        expect(saveButton.focusable()).toBeUndefined();
        expect(saveButton.autofocus()).toBeUndefined();
        expect(saveButton.routerLink()).toBeUndefined();
        expect(saveButton.queryParams()).toBeUndefined();
        expect(saveButton.queryParamsHandling()).toBeUndefined();

        const cancelButton = getCanceluttonComponent()!;

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

    it('should go to home page.', async () => {
        const location = TestBed.inject(Location);
        const routerSpy = spyOn(component['router'], 'navigate');

        authServiceSpy.createNewPassword.and.returnValue(
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

        await harness.clickCancelButton();
        expect(location.path()).toBe('');
        expect(routerSpy).not.toHaveBeenCalled();
        expect(authServiceSpy.createNewPassword).not.toHaveBeenCalled();

        const values = await harness.getValues();

        expect(values).toEqual({ password: '', repeatPassword: '' });

        const errors = await harness.getErrors();
        expect(errors).toEqual({});
    });

    it("should sucessfully call service's createNewPassword method on submit.", async () => {
        const location = TestBed.inject(Location);
        const routerSpy = spyOn(component['router'], 'navigate');
        component['formGroup'].setValue({
            hash: 'SOME_HASH',
            password: 'Password123$',
            repeatPassword: 'Password123$',
        });
        expect(true).toBeTrue();
        authServiceSpy.createNewPassword.and.returnValue(
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

        await harness.clickSaveButton();
        expect(location.path()).toBe('');
        expect(authServiceSpy.createNewPassword).toHaveBeenCalledOnceWith({
            hash: 'SOME_HASH',
            password: 'Password123$',
            repeatPassword: 'Password123$',
        });

        const values = await harness.getValues();
        expect(values).toEqual({ password: '', repeatPassword: '' });

        const errors = await harness.getErrors();
        expect(errors).toEqual({});

        expect(routerSpy).toHaveBeenCalledWith(['/login']);
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
                authServiceSpy.createNewPassword.and.returnValue(
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
                        password: 'Pass',
                        repeatPassword: 'Password123$',
                    });

                    const location = TestBed.inject(Location);
                    expect(
                        authServiceSpy.createNewPassword,
                    ).not.toHaveBeenCalled();
                    const errors = await harness.getErrors();
                    expect(errors).toEqual({
                        password: 'O comprimento mínimo permitido é 8.',
                        repeatPassword: 'As senhas não coincidem.',
                    });
                    const values = await harness.getValues();
                    expect(values).toEqual({
                        password: 'Pass',
                        repeatPassword: 'Password123$',
                    });

                    expect(location.path()).toBe('');
                    expect(routerSpy).not.toHaveBeenCalled();
                });

                describe('validations.', () => {
                    describe('password.', () => {
                        it('should accept valid value.', async () => {
                            await harness.setValues({
                                password: 'Pass123$',
                                repeatPassword: 'Pass123$',
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({});
                        });

                        it('should reject empty string.', async () => {
                            await harness.setValues({
                                password: '',
                                repeatPassword: '',
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                password: 'O campo é obrigatório.',
                                repeatPassword: 'O campo é obrigatório.',
                            });
                        });

                        it('should reject value shorter than min length.', async () => {
                            await harness.setValues({
                                password: 'Pas123$',
                                repeatPassword: 'Pas123$',
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                password: 'O comprimento mínimo permitido é 8.',
                            });
                        });

                        it('should accept value with the min length.', async () => {
                            await harness.setValues({
                                password: 'Pass123$',
                                repeatPassword: 'Pass123$',
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({});
                        });

                        it('should reject value longer than max length.', async () => {
                            await harness.setValues({
                                password: 'Password1234$',
                                repeatPassword: 'Password1234$',
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                password:
                                    'O comprimento máximo permitido é 12.',
                            });
                        });

                        it('should accept value with the max length.', async () => {
                            await harness.setValues({
                                password: 'Password123$',
                                repeatPassword: 'Password123$',
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({});
                        });

                        it('should reject value without uppercase letter.', async () => {
                            await harness.setValues({
                                password: 'password123$',
                                repeatPassword: 'password123$',
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                password:
                                    'Deve conter maíscula, minúscula, número e caractere especial.',
                            });
                        });

                        it('should reject value without lowercase letter.', async () => {
                            await harness.setValues({
                                password: 'PASSWORD123$',
                                repeatPassword: 'PASSWORD123$',
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                password:
                                    'Deve conter maíscula, minúscula, número e caractere especial.',
                            });
                        });

                        it('should reject value without digit.', async () => {
                            await harness.setValues({
                                password: 'Password$',
                                repeatPassword: 'Password$',
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                password:
                                    'Deve conter maíscula, minúscula, número e caractere especial.',
                            });
                        });

                        it('should reject value without special character.', async () => {
                            await harness.setValues({
                                password: 'Password123',
                                repeatPassword: 'Password123',
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                password:
                                    'Deve conter maíscula, minúscula, número e caractere especial.',
                            });
                        });

                        it('should reject value with space.', async () => {
                            await harness.setValues({
                                password: 'Pass 123$',
                                repeatPassword: 'Pass 123$',
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({ password: 'Inválido.' });
                        });
                    });

                    describe('repeatPassword.', () => {
                        it('should accept valid value.', async () => {
                            await harness.setValues({
                                password: 'Pass123$',
                                repeatPassword: 'Pass123$',
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({});
                        });

                        it('should reject empty string.', async () => {
                            await harness.setValues({
                                password: '',
                                repeatPassword: '',
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                password: 'O campo é obrigatório.',
                                repeatPassword: 'O campo é obrigatório.',
                            });
                        });

                        it("should reject value when passwords don't matches.", async () => {
                            await harness.setValues({
                                password: 'Password123$',
                                repeatPassword: 'Password124$',
                            });

                            const errors = await harness.getErrors();
                            expect(errors).toEqual({
                                repeatPassword: 'As senhas não coincidem.',
                            });
                        });
                    });
                });
            });

            describe('on submit.', () => {
                it('should handle local error.', async () => {
                    const location = TestBed.inject(Location);
                    await harness.setValues({
                        password: 'Pass',
                        repeatPassword: 'Password123$',
                    });
                    await harness.clickSaveButton();

                    expect(
                        authServiceSpy.createNewPassword,
                    ).not.toHaveBeenCalled();
                    expect(location.path()).toBe('');
                    expect(routerSpy).not.toHaveBeenCalled();
                    const errors = await harness.getErrors();
                    expect(errors).toEqual({
                        password: 'O comprimento mínimo permitido é 8.',
                        repeatPassword: 'As senhas não coincidem.',
                    });
                    const values = await harness.getValues();
                    expect(values).toEqual({
                        password: 'Pass',
                        repeatPassword: 'Password123$',
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
                authServiceSpy.createNewPassword.and.returnValue(
                    throwError(() => exception),
                );
                await harness.setValues({
                    password: 'Password123$',
                    repeatPassword: 'Password123$',
                });
                await harness.clickSaveButton();
                fixture.detectChanges();

                expect(authServiceSpy.createNewPassword).toHaveBeenCalledWith({
                    hash: 'SOME_HASH',
                    password: 'Password123$',
                    repeatPassword: 'Password123$',
                });

                const errors = await harness.getErrors();
                expect(errors).toEqual({ main: 'Algo deu errado!' });
                const values = await harness.getValues();
                expect(values).toEqual({
                    password: 'Password123$',
                    repeatPassword: 'Password123$',
                });

                expect(location.path()).toBe('');
                expect(routerSpy).not.toHaveBeenCalled();
            });

            it('should handle form fields remote errors.', async () => {
                const exception: any = new Error('Request failed!');
                exception.error = {
                    error: ExceptionName.unprocessable_entity,
                    message: {
                        password: 'Error 3',
                        repeatPassword: 'Error 4',
                    },
                };
                exception.message = 'Algo deu errado!';
                exception.name = 'HttpErrorResponse';
                exception.status = HttpStatusCode.UnprocessableEntity;
                exception.statusText = 'Unprocessable Entity';
                const location = TestBed.inject(Location);
                authServiceSpy.createNewPassword.and.returnValue(
                    throwError(() => exception),
                );
                await harness.setValues({
                    password: 'Password123$',
                    repeatPassword: 'Password123$',
                });
                await harness.clickSaveButton();
                fixture.detectChanges();

                expect(location.path()).toBe('');
                expect(authServiceSpy.createNewPassword).toHaveBeenCalledWith({
                    hash: 'SOME_HASH',
                    password: 'Password123$',
                    repeatPassword: 'Password123$',
                });

                const errors = await harness.getErrors();
                expect(errors).toEqual({
                    password: 'Error 3',
                    repeatPassword: 'Error 4',
                });
                const values = await harness.getValues();
                expect(values).toEqual({
                    password: 'Password123$',
                    repeatPassword: 'Password123$',
                });

                expect(routerSpy).not.toHaveBeenCalled();
            });
        });
    });
});

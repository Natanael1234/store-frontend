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
import { of, Subject, throwError } from 'rxjs';
import { AlertComponent } from '../../components/alert/alert.component';
import { ButtonComponent } from '../../components/form/components/button/button.component';
import { ButtonAppearance } from '../../components/form/components/button/enum/appearance/button-appearance.enum';
import { TextFieldComponent } from '../../components/form/components/text/text-field/text-field.component';
import { TextFormat } from '../../components/form/enums/text-format/text-format.enum';
import { UserConfigs } from '../../configs/user/user.configs';
import { ExceptionName } from '../../enums/exception-names/exception-text.enum';
import { AuthService } from '../../services/auth/auth.service';
import { Role } from '../../services/user/dtos/role/role.enum';
import { HomeComponent } from '../home/home.component';
import { EditOwnProfileComponent } from './edit-own-profile.component';
import { EditOwnProfileHarness } from './edit-own-profile.harness';

describe('EditOwnProfileComponent.', () => {
    let fixture: ComponentFixture<EditOwnProfileComponent>;
    let component: EditOwnProfileComponent;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let router: Router;
    let harness: EditOwnProfileHarness;

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

    function getNameFieldComponent() {
        return getTextFieldComponents().find(
            (field) => field.id() == 'name-input',
        );
    }

    function getSaveButtonComponent() {
        return getButtonComponents().find(
            (button) => button.id() == 'save-button',
        );
    }

    function getCancelButtonComponent() {
        return getButtonComponents().find(
            (button) => button.id() == 'cancel-button',
        );
    }

    // TODO: test loading

    beforeEach(async () => {
        const spy = jasmine.createSpyObj('AuthService', ['editOwnProfile']);

        await TestBed.configureTestingModule({
            imports: [
                EditOwnProfileComponent,
                FormsModule,
                ReactiveFormsModule,
                MatFormFieldModule,
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
                        path: 'home',
                        component: HomeComponent,
                        title: 'Home Page',
                    },
                ]),
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(EditOwnProfileComponent);
        authServiceSpy = TestBed.inject(
            AuthService,
        ) as jasmine.SpyObj<AuthService>;
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
        harness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            EditOwnProfileHarness,
        );
    });

    it('should create.', async () => {
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

    it('should go to home page.', async () => {
        const location = TestBed.inject(Location);
        const routerSpy = spyOn(component['router'], 'navigate');

        authServiceSpy.editOwnProfile.and.returnValue(of(true));

        await harness.clickCancelButton();
        expect(location.path()).toBe('');
        expect(routerSpy).not.toHaveBeenCalled();
        expect(authServiceSpy.editOwnProfile).not.toHaveBeenCalled();

        const values = await harness.getValues();

        expect(values).toEqual({
            name: '',
        });

        const errors = await harness.getErrors();
        expect(errors).toEqual({});
    });

    it("should sucessfully call service's editOwnProfile method on submit.", async () => {
        const location = TestBed.inject(Location);
        const routerSpy = spyOn(component['router'], 'navigate');
        component['formGroup'].setValue({ name: 'John Williams' });
        authServiceSpy.editOwnProfile.and.returnValue(of(true));

        await harness.clickSaveButton();
        expect(location.path()).toBe('');
        expect(authServiceSpy.editOwnProfile).toHaveBeenCalledOnceWith({
            name: 'John Williams',
        });

        const values = await harness.getValues();
        expect(values).toEqual({ name: '' });

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
            authServiceSpy.editOwnProfile.and.returnValue(of(true));
            routerSpy = spyOn(component['router'], 'navigate');
            spyOn(router, 'navigateByUrl');
        });

        describe('on blur.', () => {
            it('should handle local error.', async () => {
                await harness.setValues({ name: 'J' });

                const location = TestBed.inject(Location);
                expect(authServiceSpy.editOwnProfile).not.toHaveBeenCalled();
                const errors = await harness.getErrors();
                expect(errors).toEqual({
                    name: 'O comprimento mínimo permitido é 6.',
                });
                const values = await harness.getValues();
                expect(values).toEqual({ name: 'J' });

                expect(location.path()).toBe('');
                expect(routerSpy).not.toHaveBeenCalled();
            });

            describe('validations.', () => {
                describe('name.', () => {
                    it('should reject empty string', async () => {
                        await harness.setValues({
                            name: undefined as unknown as string,
                        });

                        const errors = await harness.getErrors();
                        expect(errors).toEqual({
                            name: 'O campo é obrigatório.',
                        });
                    });

                    it('should accept name with min length', async () => {
                        await harness.setValues({
                            name: 'x'.repeat(UserConfigs.NAME_MIN_LENGTH),
                        });

                        const errors = await harness.getErrors();
                        expect(errors).toEqual({});
                    });

                    it('should reject name shorter than min length', async () => {
                        await harness.setValues({
                            name: 'x'.repeat(UserConfigs.NAME_MIN_LENGTH - 1),
                        });

                        const errors = await harness.getErrors();
                        expect(errors).toEqual({
                            name: 'O comprimento mínimo permitido é 6.',
                        });
                    });

                    it('should accept name with max length', async () => {
                        await harness.setValues({
                            name: 'X'.repeat(UserConfigs.NAME_MAX_LENGTH),
                        });

                        const errors = await harness.getErrors();
                        expect(errors).toEqual({});
                    });

                    it('should reject name longer than max length', async () => {
                        await harness.setValues({
                            name: 'X'.repeat(UserConfigs.NAME_MAX_LENGTH + 1),
                        });

                        const errors = await harness.getErrors();
                        expect(errors).toEqual({
                            name: 'O comprimento máximo permitido é 60.',
                        });
                    });
                });
            });
        });

        describe('on submit.', () => {
            it('should handle local error.', async () => {
                const location = TestBed.inject(Location);
                await harness.setValues({ name: 'J' });
                await harness.clickSaveButton();

                expect(authServiceSpy.editOwnProfile).not.toHaveBeenCalled();
                expect(location.path()).toBe('');
                expect(routerSpy).not.toHaveBeenCalled();
                const errors = await harness.getErrors();
                expect(errors).toEqual({
                    name: 'O comprimento mínimo permitido é 6.',
                });
                const values = await harness.getValues();
                expect(values).toEqual({ name: 'J' });
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
            const exception: any = new Error('Saving failed!');
            exception.error = {
                error: ExceptionName.unprocessable_entity,
                message: 'Algo deu errado!',
            };
            exception.message = 'Some error';
            exception.name = 'HttpErrorResponse';
            exception.status = HttpStatusCode.UnprocessableEntity;
            exception.statusText = 'Unprocessable Entity';
            const location = TestBed.inject(Location);
            authServiceSpy.editOwnProfile.and.returnValue(
                throwError(() => exception),
            );
            await harness.setValues({ name: 'John Williams' });
            await harness.clickSaveButton();
            fixture.detectChanges();

            expect(authServiceSpy.editOwnProfile).toHaveBeenCalledWith({
                name: 'John Williams',
            });

            const errors = await harness.getErrors();
            expect(errors).toEqual({ main: 'Algo deu errado!' });
            const values = await harness.getValues();
            expect(values).toEqual({ name: 'John Williams' });

            expect(location.path()).toBe('');
            expect(routerSpy).not.toHaveBeenCalled();
        });

        it('should handle form fields remote errors.', async () => {
            const exception: any = new Error('Saving failed!');
            exception.error = {
                error: ExceptionName.unprocessable_entity,
                message: { name: 'Error 1' },
            };
            exception.message = 'Algo deu errado!';
            exception.name = 'HttpErrorResponse';
            exception.status = HttpStatusCode.UnprocessableEntity;
            exception.statusText = 'Unprocessable Entity';
            const location = TestBed.inject(Location);
            authServiceSpy.editOwnProfile.and.returnValue(
                throwError(() => exception),
            );
            await harness.setValues({ name: 'John Williams' });
            await harness.clickSaveButton();
            fixture.detectChanges();

            expect(location.path()).toBe('');
            expect(authServiceSpy.editOwnProfile).toHaveBeenCalledWith({
                name: 'John Williams',
            });

            const errors = await harness.getErrors();
            expect(errors).toEqual({ name: 'Error 1' });
            const values = await harness.getValues();
            expect(values).toEqual({ name: 'John Williams' });

            expect(routerSpy).not.toHaveBeenCalled();
        });
    });

    describe('loading.', () => {
        it('should show loading while requesting.', async () => {
            let subject = new Subject<any>();

            component['formGroup'].setValue({ name: 'John Williams' });
            authServiceSpy.editOwnProfile.and.returnValue(
                subject.asObservable(),
            );

            fixture.detectChanges();

            let progressBarHarness = await harness.getProgressBarHarness();
            expect(progressBarHarness).toBeNull();

            await harness.clickSaveButton();
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

        it('should show stop to show loading after remote error.', async () => {
            const exception: any = new Error('Saving failed!');
            exception.error = {
                error: ExceptionName.unprocessable_entity,
                message: 'Algo deu errado!',
            };
            exception.message = 'Some error';
            exception.name = 'HttpErrorResponse';
            exception.status = HttpStatusCode.UnprocessableEntity;
            exception.statusText = 'Unprocessable Entity';

            fixture.detectChanges();

            authServiceSpy.editOwnProfile.and.returnValue(
                throwError(() => exception),
            );
            await harness.setValues({ name: 'John Williams' });
            await harness.clickSaveButton();
            fixture.detectChanges();

            let progressBarHarness = await harness.getProgressBarHarness();
            expect(progressBarHarness).toBeNull();
        });
    });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentHarness } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideRouter, Router, Routes } from '@angular/router';
import { ButtonComponent } from '@components/form/components/button/button.component';
import { ButtonHarness } from '@components/form/components/button/button.harness';
import { ButtonAppearance } from '@components/form/components/button/enum/appearance/button-appearance.enum';
import { FormElementType } from '@components/form/enums/form-element-type/form-element-type.enum';
import { QueryParamsHandling } from '@components/form/enums/query-params-handling/query-params-handling.enum';
import { Icon } from '@enums/icons/icons.enum';
import { MouseButton } from '@enums/mouse-button/mouse-button.enum';
import { PointerType } from '@enums/pointer-type/pointer-type.enum';

describe('ButtonComponent.', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;
    let harness: ButtonHarness;

    beforeEach(async () => {
        const routes: Routes = [];

        await TestBed.configureTestingModule({
            imports: [ButtonComponent],
            providers: [provideRouter(routes)],
        }).compileComponents();

        fixture = TestBed.createComponent(ButtonComponent);

        component = fixture.componentInstance;
        fixture.detectChanges();

        harness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            ButtonHarness,
        );
    });

    it('should create.', () => {
        expect(component).toBeTruthy();
    });

    it('should render button', async () => {
        component.icon.set(Icon.checked);
        component.label.set('Button 1');
        component.disabled.set(false);
        component.appearance.set(ButtonAppearance.outlined);
        fixture.detectChanges();

        const state = await harness.getState();
        expect(state).toEqual({
            id: null,
            type: FormElementType.button,
            label: 'Button 1',
            icon: Icon.checked,
            appearance: ButtonAppearance.outlined,
            isFocused: false,
            isDisabled: false,
            isFocusable: true,
            hasValidStructure: true,
        });
    });

    describe('id.', () => {
        it('should not render the button id by default', async () => {
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.button,
                label: '',
                icon: null,
                appearance: ButtonAppearance.text,
                isFocused: false,
                isDisabled: false,
                isFocusable: true,
                hasValidStructure: true,
            });
        });

        it('should render button id', async () => {
            component.id.set('test-id');
            fixture.detectChanges();

            const state = await harness.getState();

            expect(state).toEqual({
                id: 'test-id',
                type: FormElementType.button,
                label: '',
                icon: null,
                appearance: ButtonAppearance.text,
                isFocused: false,
                isDisabled: false,
                isFocusable: true,
                hasValidStructure: true,
            });
        });
    });

    describe('type.', () => {
        it('should render the type button type by default', async () => {
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.button,
                label: '',
                icon: null,
                appearance: ButtonAppearance.text,
                isFocused: false,
                isDisabled: false,
                isFocusable: true,
                hasValidStructure: true,
            });
        });

        it('should render button type', async () => {
            component.type.set(FormElementType.button);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.button,
                label: '',
                icon: null,
                appearance: ButtonAppearance.text,
                isFocused: false,
                isDisabled: false,
                isFocusable: true,
                hasValidStructure: true,
            });
        });

        it('should render submit type', async () => {
            component.type.set(FormElementType.submit);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.submit,
                label: '',
                icon: null,
                appearance: ButtonAppearance.text,
                isFocused: false,
                isDisabled: false,
                isFocusable: true,
                hasValidStructure: true,
            });
        });

        it('should render reset type', async () => {
            component.type.set(FormElementType.reset);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.reset,
                label: '',
                icon: null,
                appearance: ButtonAppearance.text,
                isFocused: false,
                isDisabled: false,
                isFocusable: true,
                hasValidStructure: true,
            });
        });
    });

    describe('label.', () => {
        it('should render the label correctly', async () => {
            component.label.set('Save');
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.button,
                label: 'Save',
                icon: null,
                appearance: ButtonAppearance.text,
                isFocused: false,
                isDisabled: false,
                isFocusable: true,
                hasValidStructure: true,
            });
        });

        it('should render empty label by default', async () => {
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.button,
                label: '',
                icon: null,
                appearance: ButtonAppearance.text,
                isFocused: false,
                isDisabled: false,
                isFocusable: true,
                hasValidStructure: true,
            });
        });
    });

    describe('appearance.', () => {
        it('should apply the text appearance to the button by default', async () => {
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.button,
                label: '',
                icon: null,
                appearance: ButtonAppearance.text,
                isFocused: false,
                isDisabled: false,
                isFocusable: true,
                hasValidStructure: true,
            });
        });

        it('should apply the text appearance to the button', async () => {
            component.appearance.set(ButtonAppearance.text);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.button,
                label: '',
                icon: null,
                appearance: ButtonAppearance.text,
                isFocused: false,
                isDisabled: false,
                isFocusable: true,
                hasValidStructure: true,
            });
        });

        it('should apply the elevated appearance to the button', async () => {
            component.appearance.set(ButtonAppearance.elevated);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.button,
                label: '',
                icon: null,
                appearance: ButtonAppearance.elevated,
                isFocused: false,
                isDisabled: false,
                isFocusable: true,
                hasValidStructure: true,
            });
        });

        it('should apply the filled appearance to the button', async () => {
            component.appearance.set(ButtonAppearance.filled);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.button,
                label: '',
                icon: null,
                appearance: ButtonAppearance.filled,
                isFocused: false,
                isDisabled: false,
                isFocusable: true,
                hasValidStructure: true,
            });
        });

        it('should apply the outlined appearance to the button', async () => {
            component.appearance.set(ButtonAppearance.outlined);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.button,
                label: '',
                icon: null,
                appearance: ButtonAppearance.outlined,
                isFocused: false,
                isDisabled: false,
                isFocusable: true,
                hasValidStructure: true,
            });
        });

        it('should apply the tonal appearance to the button', async () => {
            component.appearance.set(ButtonAppearance.tonal);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.button,
                label: '',
                icon: null,
                appearance: ButtonAppearance.tonal,
                isFocused: false,
                isDisabled: false,
                isFocusable: true,
                hasValidStructure: true,
            });
        });
    });

    describe('icon.', () => {
        it('should render the icon when defined', async () => {
            component.icon.set(Icon.checked);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.button,
                label: '',
                icon: Icon.checked,
                appearance: ButtonAppearance.text,
                isFocused: false,
                isDisabled: false,
                isFocusable: true,
                hasValidStructure: true,
            });
        });

        it('should render without icon', async () => {
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.button,
                label: '',
                icon: null,
                appearance: ButtonAppearance.text,
                isFocused: false,
                isDisabled: false,
                isFocusable: true,
                hasValidStructure: true,
            });
        });
    });

    describe('disabled.', () => {
        it('should not be disabled by default', async () => {
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.button,
                label: '',
                icon: null,
                appearance: ButtonAppearance.text,
                isFocused: false,
                isDisabled: false,
                isFocusable: true,
                hasValidStructure: true,
            });
        });

        it('should not be disabled when disabled = false', async () => {
            component.disabled.set(false);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.button,
                label: '',
                icon: null,
                appearance: ButtonAppearance.text,
                isFocused: false,
                isDisabled: false,
                isFocusable: true,
                hasValidStructure: true,
            });
        });

        it('should not be disabled when disabled = true', async () => {
            component.disabled.set(true);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.button,
                label: '',
                icon: null,
                appearance: ButtonAppearance.text,
                isFocused: false,
                isDisabled: true,
                isFocusable: true,
                hasValidStructure: true,
            });
        });
    });

    describe('focusable.', () => {
        it('should be focusable by default', async () => {
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.button,
                label: '',
                icon: null,
                appearance: ButtonAppearance.text,
                isFocused: false,
                isDisabled: false,
                isFocusable: true,
                hasValidStructure: true,
            });
        });

        it('should not be focusable when focusable = true', async () => {
            component.focusable.set(true);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.button,
                label: '',
                icon: null,
                appearance: ButtonAppearance.text,
                isFocused: false,
                isDisabled: false,
                isFocusable: true,
                hasValidStructure: true,
            });
        });

        it('should be not focusable when focusable = false', async () => {
            component.focusable.set(false);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.button,
                label: '',
                icon: null,
                appearance: ButtonAppearance.text,
                isFocused: false,
                isDisabled: false,
                isFocusable: false,
                hasValidStructure: true,
            });
        });
    });

    describe('events.', () => {
        it('should emit the click event when the left mouse button is clicked', async () => {
            spyOn(component.onClick, 'emit');

            // const event = new MouseEvent('click', { button: 0 });
            const button = fixture.debugElement.query(By.css('button'));
            button.triggerEventHandler(
                'click',
                new PointerEvent('click', {
                    button: MouseButton.left,
                    pointerType: PointerType.mouse,
                }),
            );

            expect(component.onClick.emit).toHaveBeenCalled();
        });

        it('should emit the click event when the left mouse button is clicked', async () => {
            spyOn(component.onClick, 'emit');
            const button = fixture.debugElement.query(By.css('button'));
            button.triggerEventHandler(
                'click',
                new PointerEvent('click', {
                    button: MouseButton.left,
                    pointerType: PointerType.mouse,
                }),
            );

            expect(component.onClick.emit).toHaveBeenCalled();
        });

        it('should not emit the click event when another mouse button is clicked', async () => {
            spyOn(component.onClick, 'emit');
            const button = fixture.debugElement.query(By.css('button'));
            button.triggerEventHandler(
                'click',
                new PointerEvent('click', {
                    button: MouseButton.right,
                    pointerType: PointerType.mouse,
                }),
            );

            expect(component.onClick.emit).not.toHaveBeenCalled();
        });

        it('should emit the click event on pen evend', async () => {
            spyOn(component.onClick, 'emit');
            const button = fixture.debugElement.query(By.css('button'));
            button.triggerEventHandler(
                'click',
                new PointerEvent('click', { pointerType: PointerType.pen }),
            );

            expect(component.onClick.emit).toHaveBeenCalled();
        });

        it('should emit the click event on pen touch', async () => {
            spyOn(component.onClick, 'emit');
            const button = fixture.debugElement.query(By.css('button'));
            button.triggerEventHandler(
                'click',
                new PointerEvent('click', { pointerType: PointerType.touch }),
            );

            expect(component.onClick.emit).toHaveBeenCalled();
        });
    });
});

describe('ButtonComponent.', () => {
    @Component({ template: '' })
    class DummyButtonComponent {}

    describe('ButtonComponent routes.', () => {
        let fixture: ComponentFixture<any>;
        let router: Router;
        let location: Location;
        let component: ButtonComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [ButtonComponent],
                providers: [
                    provideRouter([
                        {
                            path: 'home',
                            component: DummyButtonComponent,
                        },
                    ]),
                ],
            }).compileComponents();

            router = TestBed.inject(Router);
            location = TestBed.inject(Location);
            fixture = TestBed.createComponent(ButtonComponent);

            router.initialNavigation();
            component = fixture.componentInstance;

            fixture.detectChanges();
        });

        it('should not navigate on click', async () => {
            fixture.detectChanges();
            const button = fixture.debugElement.query(By.css('button'));
            button.triggerEventHandler(
                'click',
                new PointerEvent('click', {
                    button: MouseButton.right,
                    pointerType: PointerType.mouse,
                }),
            );
            await fixture.whenStable();
            expect(location.path()).toBe('');
        });

        it('should navigate on click', async () => {
            component.routerLink.set('/home');
            fixture.detectChanges();
            const button = fixture.debugElement.query(By.css('button'));
            button.triggerEventHandler(
                'click',
                new PointerEvent('click', {
                    button: MouseButton.right,
                    pointerType: PointerType.mouse,
                }),
            );
            await fixture.whenStable();
            expect(location.path()).toBe('/home');
        });

        it('should navigate on click', async () => {
            component.routerLink.set('/home');
            component.queryParams.set({ '/arg1': 'va1' });
            fixture.detectChanges();
            const button = fixture.debugElement.query(By.css('button'));
            button.triggerEventHandler(
                'click',
                new PointerEvent('click', {
                    button: MouseButton.right,
                    pointerType: PointerType.mouse,
                }),
            );
            await fixture.whenStable();
            expect(location.path()).toBe('/home?%2Farg1=va1');
        });

        it('should navigate on click with query parameters', async () => {
            component.routerLink.set('/home');
            component.queryParams.set({ '/arg1': 'va1' });
            fixture.detectChanges();
            const button = fixture.debugElement.query(By.css('button'));
            button.triggerEventHandler(
                'click',
                new PointerEvent('click', {
                    button: MouseButton.right,
                    pointerType: PointerType.mouse,
                }),
            );
            await fixture.whenStable();
            expect(location.path()).toBe('/home?%2Farg1=va1');
        });

        it('should navigate on click and merge query parameters when queryParamsHandling is "merge"', async () => {
            router.navigate(['/home'], { queryParams: { '/arg1': 'val1' } });
            await fixture.whenStable();
            component.routerLink.set('/home');
            component.queryParams.set({ '/arg2': 'val2' });
            component.queryParamsHandling.set(QueryParamsHandling.merge);
            fixture.detectChanges();
            const button = fixture.debugElement.query(By.css('button'));
            button.triggerEventHandler(
                'click',
                new PointerEvent('click', {
                    button: MouseButton.right,
                    pointerType: PointerType.mouse,
                }),
            );
            await fixture.whenStable();
            expect(location.path()).toBe('/home?%2Farg1=val1&%2Farg2=val2');
        });

        it('should navigate on click and replace query parameters when queryParamsHandling is "replace"', async () => {
            router.navigate(['/home'], { queryParams: { '/arg1': 'val1' } });
            await fixture.whenStable();
            component.routerLink.set('/home');
            component.queryParams.set({ '/arg2': 'val2' });
            component.queryParamsHandling.set(QueryParamsHandling.replace);
            fixture.detectChanges();
            const button = fixture.debugElement.query(By.css('button'));
            button.triggerEventHandler(
                'click',
                new PointerEvent('click', {
                    button: MouseButton.right,
                    pointerType: PointerType.mouse,
                }),
            );
            await fixture.whenStable();
            expect(location.path()).toBe('/home?%2Farg2=val2');
        });

        it('should navigate on click and preserve query parameters when queryParamsHandling is "preserve"', async () => {
            router.navigate(['/home'], { queryParams: { '/arg1': 'val1' } });
            await fixture.whenStable();
            component.routerLink.set('/home');
            component.queryParams.set({ '/arg2': 'val2' });
            component.queryParamsHandling.set(QueryParamsHandling.preserve);
            fixture.detectChanges();
            const button = fixture.debugElement.query(By.css('button'));
            button.triggerEventHandler(
                'click',
                new PointerEvent('click', {
                    button: MouseButton.right,
                    pointerType: PointerType.mouse,
                }),
            );
            await fixture.whenStable();
            expect(location.path()).toBe('/home?%2Farg1=val1');
        });

        it('should navigate on click and replace parameters when queryParamsHandling is "empty"', async () => {
            router.navigate(['/home'], { queryParams: { '/arg1': 'val1' } });
            await fixture.whenStable();
            component.routerLink.set('/home');
            component.queryParams.set({ '/arg2': 'val2' });
            component.queryParamsHandling.set(QueryParamsHandling.empty);
            fixture.detectChanges();
            const button = fixture.debugElement.query(By.css('button'));
            button.triggerEventHandler(
                'click',
                new PointerEvent('click', {
                    button: MouseButton.right,
                    pointerType: PointerType.mouse,
                }),
            );
            await fixture.whenStable();
            expect(location.path()).toBe('/home?%2Farg2=val2');
        });
    });
});

xdescribe('ButtonComponent.', () => {
    describe('autofocus.', () => {
        /** As the first focusable element is automatically focused creates a scenario where the field is the second focusable element. */
        @Component({
            selector: 'autofocus-test',
            imports: [ButtonComponent],
            template: `
                <!-- button is focused by default -->
                <input />
                <button>Test</button>
            `,
        })
        class AutofocusTestComponent {
            control = new FormControl('');
        }

        class TestHarness extends ComponentHarness {
            static hostSelector = 'autofocus-test';
            private buttonHarness = this.locatorFor(ButtonHarness);
            getNumericFieldHarness() {
                return this.buttonHarness();
            }
        }

        let testHarness: TestHarness;
        let testFixture: ComponentFixture<AutofocusTestComponent>;
        let buttonHarness: ButtonHarness;
        let buttonComponent: ButtonComponent;

        beforeEach(async () => {
            testFixture = TestBed.createComponent(AutofocusTestComponent);
            testHarness = await TestbedHarnessEnvironment.harnessForFixture(
                testFixture,
                TestHarness,
            );
            buttonComponent =
                testFixture.debugElement.children[1].componentInstance;
            buttonHarness = await testHarness.getNumericFieldHarness();
            testFixture.detectChanges();
        });

        it('should set autofocus = false by default.', async () => {
            const state = await buttonHarness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.button,
                label: '',
                icon: null,
                appearance: ButtonAppearance.text,
                isFocused: false,
                isDisabled: false,
                isFocusable: true,
                hasValidStructure: true,
            });
        });

        it('should set autofocus = false.', async () => {
            buttonComponent.autofocus.set(true);
            testFixture.detectChanges();

            const state = await buttonHarness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.button,
                label: '',
                icon: null,
                appearance: ButtonAppearance.text,
                isFocused: false,
                isDisabled: false,
                isFocusable: true,
                hasValidStructure: true,
            });
        });

        it('should set autofocus = true.', async () => {
            buttonComponent.autofocus.set(false);
            testFixture.detectChanges();

            const state = await buttonHarness.getState();
            expect(state).toEqual({
                id: null,
                type: FormElementType.button,
                label: '',
                icon: null,
                appearance: ButtonAppearance.text,
                isFocused: false,
                isDisabled: false,
                isFocusable: true,
                hasValidStructure: true,
            });
        });
    });
});

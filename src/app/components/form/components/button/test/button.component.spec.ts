import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { By } from '@angular/platform-browser';
import { Icon } from '../../../../../enums/icons/icons.enum';
import { MouseButton } from '../../../../../enums/mouse-button/mouse-button.enum';
import { PointerType } from '../../../../../enums/pointer-type/pointer-type.enum';
import { ButtonComponent } from '../button.component';
import { ButtonStyle } from '../enum/button-style.enum';
import { ButtonHarness } from './button.harness';

describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;
    let harness: ButtonHarness;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ButtonComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ButtonComponent);

        component = fixture.componentInstance;
        fixture.detectChanges();

        harness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            ButtonHarness,
        );
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    async function testButton(expected: {
        icon: Icon | undefined;
        label: string;
        style: ButtonStyle | undefined;
        disabled: boolean;
        focusable: boolean;
    }) {
        // host
        expect(await harness.hostContainsOnlyAButton()).toBeTrue();

        // button
        const button = await harness.getButton();

        // // style
        const buttonClasses = await harness.getButtonClasses();
        expect(buttonClasses).toContain('mdc-button');
        expect(buttonClasses).toContain('mat-unthemed');
        expect(buttonClasses).toContain('mat-mdc-button-base');
        switch (expected.style) {
            case ButtonStyle.elevated:
                expect(buttonClasses).toContain('mat-mdc-raised-button');
                break;
            case ButtonStyle.outlined:
                expect(buttonClasses).toContain('mat-mdc-outlined-button');
                break;
            case ButtonStyle.filled:
                expect(buttonClasses).toContain('mat-mdc-unelevated-button');
                break;
            case ButtonStyle.tonal:
                expect(buttonClasses).toContain('mat-tonal-button');
                break;
            default:
                expect(buttonClasses).not.toContain('mat-mdc-raised-button');
                expect(buttonClasses).not.toContain('mat-mdc-outlined-button');
                expect(buttonClasses).not.toContain(
                    'mat-mdc-unelevated-button',
                );
                expect(buttonClasses).not.toContain('mat-tonal-button');
        }

        // disabled
        if (expected.disabled === true) {
            expect(await harness.isButtonDisabled()).toBeTrue();
        } else {
            expect(await harness.isButtonDisabled()).toBeFalse();
        }

        // TODO: focusable

        // icon
        if (expected.icon) {
            expect(await harness.hasOnlyOneIcon()).toBeTrue();
            expect(await harness.getIconText()).toEqual(expected.icon);
            expect(await harness.isIconBeforeLabel()).toBeTrue();
        } else {
            expect(await harness.hasNoIcon()).toBeTrue();
        }

        // label
        expect(await harness.hasOnlyOneLabel()).toBeTrue();
        const label = await harness.getInnerButtonLabel();
        expect(label).toBeDefined();
        const labelText = await harness.getInnerButtonLabelText();
        expect(labelText).toEqual(expected.label);
    }

    it('should render button', async () => {
        component.icon.set(Icon.checked);
        component.label.set('Button 1');
        component.disabled.set(false);
        component.style.set(ButtonStyle.outlined);
        fixture.detectChanges();

        await testButton({
            label: 'Button 1',
            icon: Icon.checked,
            style: ButtonStyle.outlined,
            disabled: false,
            focusable: true,
        });
    });

    describe('label', () => {
        it('should render the label correctly', async () => {
            component.label.set('Save');
            fixture.detectChanges();

            await testButton({
                label: 'Save',
                icon: undefined,
                style: ButtonStyle.text,
                disabled: false,
                focusable: true,
            });
        });

        it('should render empty label by default', async () => {
            fixture.detectChanges();

            await testButton({
                label: '',
                icon: undefined,
                style: ButtonStyle.text,
                disabled: false,
                focusable: true,
            });
        });
    });

    describe('style', () => {
        it('should apply the text style to the button by default', async () => {
            fixture.detectChanges();
            await testButton({
                label: '',
                icon: undefined,
                style: undefined,
                disabled: false,
                focusable: true,
            });
        });

        it('should apply the text style to the button', async () => {
            component.style.set(ButtonStyle.text);
            fixture.detectChanges();
            await testButton({
                label: '',
                icon: undefined,
                style: ButtonStyle.text,
                disabled: false,
                focusable: true,
            });
        });

        it('should apply the elevated style to the button', async () => {
            component.style.set(ButtonStyle.elevated);
            fixture.detectChanges();

            await testButton({
                label: '',
                icon: undefined,
                style: ButtonStyle.elevated,
                disabled: false,
                focusable: true,
            });
        });

        it('should apply the filled style to the button', async () => {
            component.style.set(ButtonStyle.filled);
            fixture.detectChanges();

            await testButton({
                label: '',
                icon: undefined,
                style: ButtonStyle.filled,
                disabled: false,
                focusable: true,
            });
        });

        it('should apply the outlined style to the button', async () => {
            component.style.set(ButtonStyle.outlined);
            fixture.detectChanges();
            await testButton({
                label: '',
                icon: undefined,
                style: ButtonStyle.outlined,
                disabled: false,
                focusable: true,
            });
        });

        it('should apply the tonal style to the button', async () => {
            component.style.set(ButtonStyle.tonal);
            fixture.detectChanges();
            await testButton({
                label: '',
                icon: undefined,
                style: ButtonStyle.tonal,
                disabled: false,
                focusable: true,
            });
        });
    });

    describe('icon', () => {
        it('should render the icon when defined', async () => {
            component.icon.set(Icon.checked);
            fixture.detectChanges();

            await testButton({
                label: '',
                icon: Icon.checked,
                style: ButtonStyle.text,
                disabled: false,
                focusable: true,
            });
        });
    });

    describe('disabled', () => {
        it('should not be disabled by default', async () => {
            fixture.detectChanges();

            await testButton({
                label: '',
                icon: undefined,
                style: ButtonStyle.text,
                disabled: false,
                focusable: true,
            });
        });

        it('should not be disabled when disabled = false', async () => {
            component.disabled.set(false);
            fixture.detectChanges();

            await testButton({
                label: '',
                icon: undefined,
                style: ButtonStyle.text,
                disabled: false,
                focusable: true,
            });
        });

        it('should not be disabled when disabled = true', async () => {
            component.disabled.set(true);
            fixture.detectChanges();

            await testButton({
                label: '',
                icon: undefined,
                style: ButtonStyle.text,
                disabled: true,
                focusable: true,
            });
        });
    });

    xdescribe('focusable', () => {
        it('should be focusable by default', async () => {
            fixture.detectChanges();

            await testButton({
                label: '',
                icon: undefined,
                style: ButtonStyle.text,
                disabled: false,
                focusable: true,
            });
        });

        it('should not be disabled when focusable = true', async () => {
            component.disabled.set(true);
            fixture.detectChanges();

            await testButton({
                label: '',
                icon: undefined,
                style: ButtonStyle.text,
                disabled: true,
                focusable: true,
            });
        });

        it('should be not focusable when focusable = false', async () => {
            component.focusable.set(false);
            fixture.detectChanges();

            await testButton({
                label: '',
                icon: undefined,
                style: ButtonStyle.text,
                disabled: false,
                focusable: false,
            });
        });
    });

    describe('events', () => {
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

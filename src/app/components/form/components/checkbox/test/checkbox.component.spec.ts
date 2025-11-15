import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CheckboxComponent } from '../checkbox.component';

describe('CheckboxFormElement', () => {
    let component: CheckboxComponent;
    let fixture: ComponentFixture<CheckboxComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CheckboxComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CheckboxComponent);
        component = fixture.componentInstance;
    });

    function testCheckbox(options: {
        id: string;
        label: string;
        control: FormControl;
        focusable: boolean;
    }) {
        expect(fixture.debugElement.children.length).toEqual(1);
        expect(fixture.debugElement.children[0].nativeElement.tagName).toEqual(
            'MAT-CHECKBOX',
        );
        const matCheckbox = fixture.debugElement.children[0];
        const input = matCheckbox.query(By.css('input')).nativeElement;

        // id
        expect(matCheckbox.nativeElement.id).toEqual(options.id);

        // label
        expect(matCheckbox.nativeElement.textContent.trim()).toEqual(
            options.label,
        );

        // control
        if (options.control.value === true) {
            expect(input.checked).toBeTrue();
        } else {
            expect(input.checked).toBeFalse();
        }

        // TODO:
        // focusable
        // expect(input.tabIndex).toEqual(options.focusable ? 0 : -1);
    }

    it('should create', () => {
        const control = new FormControl(false);
        component.control.set(control);
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    describe('id', () => {
        it('should render the id correctly', () => {
            component.id.set('checkbox-id');
            const control = new FormControl(false);
            component.control.set(control);
            fixture.detectChanges();

            testCheckbox({
                id: 'checkbox-id',
                label: '',
                control: control,
                focusable: true,
            });
        });

        it('should render empty id by default', () => {
            const control = new FormControl(false);
            component.control.set(control);
            fixture.detectChanges();

            testCheckbox({
                id: '',
                label: '',
                control: control,
                focusable: true,
            });
        });
    });

    describe('label', () => {
        it('should render the label correctly', () => {
            component.label.set('Accept terms');
            const control = new FormControl(false);
            component.control.set(control);
            fixture.detectChanges();

            testCheckbox({
                id: '',
                label: 'Accept terms',
                control: control,
                focusable: true,
            });
        });

        it('should render empty label by default', () => {
            const control = new FormControl(false);
            component.control.set(control);
            fixture.detectChanges();

            testCheckbox({
                id: '',
                label: '',
                control: control,
                focusable: true,
            });
        });
    });

    describe('control', () => {
        it('should reflect FormControl value = true', () => {
            const control = new FormControl(true);
            component.control.set(control);
            fixture.detectChanges();

            testCheckbox({
                id: '',
                label: '',
                control: control,
                focusable: true,
            });
        });

        it('should reflect FormControl value = false', () => {
            const control = new FormControl(false);
            component.control.set(control);
            fixture.detectChanges();

            testCheckbox({
                id: '',
                label: '',
                control: control,
                focusable: false,
            });
        });

        it('should change FormControl value from true to false on chekbox click', () => {
            const control = new FormControl(false);
            component.control.set(control);
            fixture.detectChanges();
            const checkboxInput = fixture.nativeElement.querySelector(
                'mat-checkbox input',
            ) as HTMLInputElement;
            checkboxInput.click();

            testCheckbox({
                id: '',
                label: '',
                control: control,
                focusable: true,
            });
        });

        it('should change FormControl value from true to false on chekbox click', () => {
            const control = new FormControl(true);
            component.control.set(control);
            fixture.detectChanges();
            const checkboxInput = fixture.nativeElement.querySelector(
                'mat-checkbox input',
            ) as HTMLInputElement;
            checkboxInput.click();

            expect(control.value).toEqual(false);
        });
    });

    describe('required', () => {
        it('should display * when the control is required', () => {
            const control = new FormControl(false);
            component.control.set(control);
            component.label.set('Email Notifications');
            component.control.set(new FormControl('', Validators.required));
            fixture.detectChanges();

            testCheckbox({
                id: '',
                label: 'Email Notifications *',
                control: control,
                focusable: true,
            });
        });

        it('should not display * when the control is not required', () => {
            const control = new FormControl(false);
            component.control.set(control);
            component.label.set('Optional Field');
            fixture.detectChanges();

            testCheckbox({
                id: '',
                label: 'Optional Field',
                control: control,
                focusable: true,
            });
        });
    });

    // TODO: not working
    xdescribe('focusable', () => {
        it('should be focusable by default', () => {
            const control = new FormControl(false);
            component.control.set(control);
            fixture.detectChanges();

            testCheckbox({
                id: '',
                label: '',
                control: control,
                focusable: true,
            });
        });

        it('should not be focusable when focusable = true', () => {
            const control = new FormControl(false);
            component.control.set(control);
            component.focusable.set(false);
            fixture.detectChanges();

            testCheckbox({
                id: '',
                label: '',
                control: control,
                focusable: true,
            });
        });

        it('should not be focusable when focusable = false', () => {
            const control = new FormControl(false);
            component.control.set(control);
            component.focusable.set(false);
            fixture.detectChanges();

            testCheckbox({
                id: '',
                label: '',
                control: control,
                focusable: false,
            });
        });
    });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SelectComponent } from './select.component';

// TODO: test
describe('SelectComponent', () => {
    let component: SelectComponent<string, string>;
    let fixture: ComponentFixture<SelectComponent<string, string>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [],
            imports: [
                FormsModule,
                MatFormFieldModule,
                MatSelectModule,
                MatOptionModule,
                NoopAnimationsModule,
                SelectComponent,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the label', () => {
        component.label = 'Select an option';
        fixture.detectChanges();

        const labelElement = fixture.debugElement.query(By.css('mat-label'));
        expect(labelElement.nativeElement.textContent.trim()).toBe(
            'Select an option',
        );
    });

    it('should display the correct number of options', () => {
        component.options = [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
        ];
        fixture.detectChanges();

        // test if contains select
        const selectElement = fixture.debugElement.queryAll(
            By.directive(MatSelect),
        );
        expect(selectElement.length).toBe(1);

        selectElement[0].nativeElement.click();
        fixture.detectChanges();

        // test if contains options
        const optionElements = selectElement[0].queryAll(
            By.directive(MatOption),
        );
        expect(optionElements.length).toBe(2);
    });

    it('should display correct labels for each option', () => {
        component.options = [
            { label: 'Option A', value: 'A' },
            { label: 'Option B', value: 'B' },
        ];
        fixture.detectChanges();

        const selectElement = fixture.debugElement.query(By.css('mat-select'));
        selectElement.nativeElement.click();
        fixture.detectChanges();

        const optionElements = fixture.debugElement.queryAll(
            By.css('mat-option'),
        );
        expect(optionElements[0].nativeElement.textContent.trim()).toBe(
            'Option A',
        );
        expect(optionElements[1].nativeElement.textContent.trim()).toBe(
            'Option B',
        );
    });

    it('should assign the correct values to each option', () => {
        component.options = [
            { label: 'Option X', value: 'X' },
            { label: 'Option Y', value: 'Y' },
        ];
        fixture.detectChanges();

        const selectElement = fixture.debugElement.query(By.css('mat-select'));
        selectElement.nativeElement.click();
        fixture.detectChanges();

        const options = fixture.debugElement.queryAll(By.directive(MatOption));
        expect(options[0].componentInstance.value).toBe('X');
        expect(options[1].componentInstance.value).toBe('Y');
    });

    it('should update select when input value change', () => {
        component.options = [
            { label: 'Option 1', value: 'value_1' },
            { label: 'Option 2', value: 'value_2' },
        ];
        component.value = 'value_1';
        fixture.detectChanges();

        // test if contains select
        const selectElement = fixture.nativeElement.querySelector('mat-select');

        // test if select has the right value selected
        expect(selectElement.attributes['ng-reflect-value'].value).toBe(
            'value_1',
        );

        component.value = 'value_2';
        fixture.detectChanges();

        // test if select has the right value selected
        expect(selectElement.attributes['ng-reflect-value'].value).toBe(
            'value_2',
        );
    });

    it('should update input when option is selected', () => {
        component.options = [
            { label: 'Option 1', value: 'value_1' },
            { label: 'Option 2', value: 'value_2' },
        ];
        component.value = 'value_1';
        fixture.detectChanges();

        const selectElement = fixture.debugElement.query(By.css('mat-select'));
        selectElement.nativeElement.click();
        fixture.detectChanges();

        const optionElements = fixture.debugElement.queryAll(
            By.css('mat-option'),
        );
        optionElements[1].nativeElement.click();
        fixture.detectChanges();

        expect(component.value).toEqual('value_2');
    });

    it('should emit valueChange when an option is selected', () => {
        spyOn(component.valueChange, 'emit');
        component.options = [
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
        ];
        fixture.detectChanges();

        const selectElement = fixture.debugElement.query(By.css('mat-select'));
        selectElement.nativeElement.click();
        fixture.detectChanges();

        const optionElements = fixture.debugElement.queryAll(
            By.css('mat-option'),
        );
        optionElements[1].nativeElement.click();
        fixture.detectChanges();

        expect(component.valueChange.emit).toHaveBeenCalledWith('2');
    });

    it('should emit valueChange when the value change', () => {
        spyOn(component.valueChange, 'emit');

        component.value = 'X';
        fixture.detectChanges();

        const select = fixture.debugElement.query(By.css('mat-select'));
        select.triggerEventHandler('selectionChange', { value: 'X' });

        expect(component.valueChange.emit).toHaveBeenCalledWith('X');
    });
});

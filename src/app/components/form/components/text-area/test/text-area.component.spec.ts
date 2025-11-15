import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { TextFormat } from '../../../enums/text-format/text-format.enum';
import { TextAreaComponent } from '../text-area.component';
import { TextAreaHarness } from './text-area.harness';
import { _testTextAreaComponent } from './text-field.component.test';

const loremIpsum =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

describe('TextAreaComponent', () => {
    let component: TextAreaComponent;
    let fixture: ComponentFixture<TextAreaComponent>;
    let control: FormControl;
    let harness: TextAreaHarness;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, TextAreaComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TextAreaComponent);
        control = new FormControl('');
        component = fixture.componentInstance;
        component.control.set(control);
        fixture.detectChanges();

        harness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            TextAreaHarness,
        );
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should validate component with all properties', async () => {
        const control = new FormControl(loremIpsum, {
            validators: [Validators.maxLength(10)],
            updateOn: 'change',
        });
        component.id.set('description');
        component.label.set('Description');
        component.placeholder.set('Description placeholder');
        component.control.set(control);
        component.focusable.set(true);
        component.minLength.set(3);
        component.maxLength.set(14); // including formatting characters
        component.breakLine.set(false);
        component.autosizeMinRows.set(2);
        component.autosizeMaxRows.set(6);
        fixture.detectChanges();

        await _testTextAreaComponent({
            component,
            harness,
            id: 'description',
            type: FormElementType.text,
            value: loremIpsum,
            label: 'Description',
            placeholder: 'Description placeholder',
            control,
            focusable: true,
            format: TextFormat.cpf,
            minLength: 3,
            maxLength: 14,
            prefix: 'R$',
            suffix: 'reais',
            error: 'Máximo de 10 caracteres.',
            autosizeMinRows: 2,
            autosizeMaxRows: 6,
            breakLine: false,
        });
    });
});

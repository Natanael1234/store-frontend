import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective } from 'ngx-mask';
import { DynamicFormComponent } from './dynamic-form.component';

describe('DynamicFormComponent', () => {
    let component: DynamicFormComponent;
    let fixture: ComponentFixture<DynamicFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                DynamicFormComponent,
                ReactiveFormsModule,
                MatInputModule,
                MatSelectModule,
                MatRadioModule,
                MatDividerModule,
                MatCheckboxModule,
                NgxMaskDirective,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DynamicFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

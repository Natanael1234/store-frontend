import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicSelectFieldComponent } from './dynamic-select-field.component';

describe('DynamicSelectComponent', () => {
    let component: DynamicSelectFieldComponent;
    let fixture: ComponentFixture<DynamicSelectFieldComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DynamicSelectFieldComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DynamicSelectFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

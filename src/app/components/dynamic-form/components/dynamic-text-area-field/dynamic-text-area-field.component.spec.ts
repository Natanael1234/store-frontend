import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTextAreaFieldComponent } from './dynamic-text-area-field.component';

describe('DynamicTextAreaComponent', () => {
    let component: DynamicTextAreaFieldComponent;
    let fixture: ComponentFixture<DynamicTextAreaFieldComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DynamicTextAreaFieldComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DynamicTextAreaFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

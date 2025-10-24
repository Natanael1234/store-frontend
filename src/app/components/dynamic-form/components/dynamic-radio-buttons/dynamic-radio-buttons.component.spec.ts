import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicRadioButtonsComponent } from './dynamic-radio-buttons.component';

describe('DynamicSelectComponent', () => {
    let component: DynamicRadioButtonsComponent;
    let fixture: ComponentFixture<DynamicRadioButtonsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DynamicRadioButtonsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DynamicRadioButtonsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

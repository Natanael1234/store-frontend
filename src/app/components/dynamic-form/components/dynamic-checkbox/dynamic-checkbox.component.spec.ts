import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicSelectCheckbox } from './dynamic-checkbox.component';

describe('DynamicSelectCheckbox', () => {
    let component: DynamicSelectCheckbox;
    let fixture: ComponentFixture<DynamicSelectCheckbox>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DynamicSelectCheckbox],
        }).compileComponents();

        fixture = TestBed.createComponent(DynamicSelectCheckbox);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

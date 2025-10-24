import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavMenuComponent } from './navigation-rail.component';

describe('SideMenuComponent', () => {
    let component: SidenavMenuComponent;
    let fixture: ComponentFixture<SidenavMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SidenavMenuComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SidenavMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // TODO:
});

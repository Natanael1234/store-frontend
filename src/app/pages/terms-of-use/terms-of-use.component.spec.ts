import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TermsOfUseComponent } from '@pages/terms-of-use/terms-of-use.component';

describe('TermsOfUseComponent', () => {
    let component: TermsOfUseComponent;
    let fixture: ComponentFixture<TermsOfUseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TermsOfUseComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TermsOfUseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

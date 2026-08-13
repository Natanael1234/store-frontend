import { TestBed } from '@angular/core/testing';
import { ResponsityService } from '@services/responsivity/responsivity.service';

describe('ResponsivityService.', () => {
    let service: ResponsityService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ResponsityService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // TODO: test
});

import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ResponsivityService } from '@services/responsivity/responsivity.service';
import { ThemeService } from '@services/theme/theme.service';
import { of } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let themeServiceMock: Partial<ThemeService>;
    let responsivityServiceMock: Partial<ResponsivityService>;

    beforeEach(async () => {
        // Criando mocks para evitar chamadas reais ao localStorage ou APIs do browser
        themeServiceMock = {
            // adicione métodos/propriedades usados pelo componente se necessário
        };

        responsivityServiceMock = {
            mobile: of(false), // Simula desktop por padrão nos testes
        };

        await TestBed.configureTestingModule({
            imports: [AppComponent],
            providers: [
                provideRouter([]),
                { provide: ThemeService, useValue: themeServiceMock },
                { provide: ResponsivityService, useValue: responsivityServiceMock },
            ],
        }).compileComponents();
    });

    it('should create the app.', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it.skip('should render title.', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('store-frontend');
    });
});

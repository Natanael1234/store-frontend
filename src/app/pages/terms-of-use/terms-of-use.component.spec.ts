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

    it('deve criar o componente com sucesso', () => {
        expect(component).toBeTruthy();
    });

    it('deve renderizar o título principal "TERMOS DE USO E SERVIÇO"', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const h1 = compiled.querySelector('h1');

        expect(h1).not.toBeNull();
        expect(h1?.textContent?.trim()).toBe('TERMOS DE USO E SERVIÇO');
    });

    it('deve conter todas as 10 seções de cabeçalho (h2)', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const headings = compiled.querySelectorAll('h2');

        expect(headings.length).toBe(10);
        expect(headings[0].textContent?.trim()).toContain('Objeto e Funcionalidades');
        expect(headings[9].textContent?.trim()).toContain('10. Contato e Suporte');
    });

    it('deve renderizar a lista de contatos na seção de suporte', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const contactListItems = compiled.querySelectorAll('ul li');

        expect(contactListItems.length).toBe(3);
        expect(contactListItems[0].textContent).toContain('Razão Social/Nome:');
        expect(contactListItems[1].textContent).toContain('E-mail de Contato:');
        expect(contactListItems[2].textContent).toContain('Endereço:');
    });

    // TODO:
});

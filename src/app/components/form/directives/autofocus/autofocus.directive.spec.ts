import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AutofocusDirective } from '@components/form/directives/autofocus/autofocus.directive';

@Component({
    imports: [AutofocusDirective],
    standalone: true,
    template: `
        <input id="a" type="text" [appAutofocus]="flag" />
        <input id="b" type="text" appAutofocus />
        @if (show) {
            <ng-container>
                <input id="c" type="text" [appAutofocus]="true" />
            </ng-container>
        }
    `,
})
class TestHostComponent {
    flag = false;
    show = false;
}

describe('AutofocusDirective', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent, AutofocusDirective, CommonModule],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    function getElement(id: string): HTMLInputElement {
        return fixture.debugElement.query(By.css(`#${id}`))!.nativeElement;
    }

    it('não aplica foco quando recebe false', (done) => {
        const el = getElement('a');

        setTimeout(() => {
            expect(document.activeElement).not.toBe(el);
            done();
        });
    });

    it('aplica foco quando recebe true', (done) => {
        host.flag = true;
        fixture.detectChanges();

        const el = getElement('a');

        setTimeout(() => {
            expect(document.activeElement).toBe(el);
            done();
        });
    });

    it('aplica foco quando o valor muda de false para true', (done) => {
        const el = getElement('a');

        // muda a flag após renderização
        host.flag = true;
        fixture.detectChanges();

        setTimeout(() => {
            expect(document.activeElement).toBe(el);
            done();
        });
    });

    it('atributo vazio (boolean attribute) deve aplicar foco', (done) => {
        const el = getElement('b');

        setTimeout(() => {
            expect(document.activeElement).toBe(el);
            done();
        });
    });

    it('aplica foco quando o elemento aparece via @if', (done) => {
        host.show = true;
        fixture.detectChanges();

        setTimeout(() => {
            const el = getElement('c');
            expect(document.activeElement).toBe(el);
            done();
        });
    });
});

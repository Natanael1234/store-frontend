import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { AutoFocusDirective } from '@components/form/directives/autofocus/autofocus.directive';

@Component({
    standalone: true,
    imports: [
        AutoFocusDirective,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatRadioModule,
        MatCheckboxModule,
    ],
    template: `
        <button id="no-autofocus-input">No autofocus</button>
        <input id="native-input" appAutoFocus type="text" />
        <button id="native-button" appAutoFocus>Clique aqui</button>

        <input id="disabled-autofocus" [appAutoFocus]="false" type="text" />

        <input id="reactive-input" [appAutoFocus]="isDynamicFocusEnabled()" type="text" />

        <mat-form-field>
            <mat-label>Material Input</mat-label>
            <input id="mat-input" matInput appAutoFocus />
        </mat-form-field>

        <mat-form-field id="mat-select-wrapper" appAutoFocus>
            <mat-label>Opções</mat-label>
            <mat-select id="mat-select">
                <mat-option value="1">Opção 1</mat-option>
            </mat-select>
        </mat-form-field>

        <!-- Adicionados: Checkbox e Radio Group -->
        <mat-checkbox id="mat-checkbox" appAutoFocus>Aceito os termos</mat-checkbox>

        <mat-radio-group id="mat-radio-group" appAutoFocus>
            <mat-radio-button id="mat-radio-1" value="1">Opção A</mat-radio-button>
            <mat-radio-button id="mat-radio-2" value="2">Opção B</mat-radio-button>
        </mat-radio-group>
    `,
})
class TestHostComponent {
    isDynamicFocusEnabled = signal(false);
}
describe('AutofocusDirective', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;

    // Auxiliar para disparar a detecção de mudanças e avançar o setTimeout do Vitest
    const flushFocusTimer = (): void => {
        fixture.detectChanges();
        vi.advanceTimersByTime(0);
    };

    function getElement(id: string): HTMLElement {
        return fixture.debugElement.query(By.css(`#${id}`))!.nativeElement as HTMLElement;
    }

    beforeEach(async () => {
        vi.useFakeTimers();

        await TestBed.configureTestingModule({
            imports: [TestHostComponent, AutoFocusDirective, CommonModule],
        }).compileComponents();
        fixture = TestBed.createComponent(TestHostComponent);
        hostComponent = fixture.componentInstance;
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should not apply focus when input is not annotated with appAutoFocus', () => {
        const inputEl = getElement('no-autofocus-input');
        const focusSpy = vi.spyOn(inputEl, 'focus');

        flushFocusTimer();

        expect(focusSpy).not.toHaveBeenCalled();
    });

    it('deve aplicar foco ao input nativo quando anotado com appAutoFocus', () => {
        const inputEl = getElement('native-input');
        const focusSpy = vi.spyOn(inputEl, 'focus');

        flushFocusTimer();

        expect(focusSpy).toHaveBeenCalledTimes(1);
    });

    it('deve aplicar foco ao input nativo', () => {
        const buttonEl = getElement('native-button');
        const focusSpy = vi.spyOn(buttonEl, 'focus');

        flushFocusTimer();

        expect(focusSpy).toHaveBeenCalledTimes(1);
    });

    it('deve aplicar foco ao input do Angular Material (matInput)', () => {
        const matInputEl = getElement('mat-input');
        const focusSpy = vi.spyOn(matInputEl, 'focus');

        flushFocusTimer();

        expect(focusSpy).toHaveBeenCalledTimes(1);
    });

    it('deve aplicar foco ao elemento interno do mat-select quando aplicado no container', () => {
        // 1. Renderiza a View inicial para o Angular Material construir o DOM do select
        fixture.detectChanges();

        // 2. Agora o elemento interno do Material existe e pode receber o spy
        const selectTrigger = fixture.debugElement.query(
            By.css('#mat-select-wrapper .mat-mdc-select-trigger, #mat-select-wrapper [tabindex]'),
        ).nativeElement as HTMLElement;

        const focusSpy = vi.spyOn(selectTrigger, 'focus');

        // 3. Executa a macrotarefa do setTimeout da diretiva
        vi.advanceTimersByTime(0);

        expect(focusSpy).toHaveBeenCalledTimes(1);
    });

    it('NÃO deve aplicar foco se [appAutoFocus]="false"', () => {
        const disabledInputEl = getElement('disabled-autofocus');
        const focusSpy = vi.spyOn(disabledInputEl, 'focus');

        flushFocusTimer();

        expect(focusSpy).not.toHaveBeenCalled();
    });

    it('deve aplicar foco dinamicamente quando o Signal input mudar para true', () => {
        const reactiveInputEl = getElement('reactive-input');
        const focusSpy = vi.spyOn(reactiveInputEl, 'focus');

        // Inicialmente desativado (false)
        flushFocusTimer();
        expect(focusSpy).not.toHaveBeenCalled();

        // Ativa dinamicamente via Signal
        hostComponent.isDynamicFocusEnabled.set(true);
        flushFocusTimer();

        expect(focusSpy).toHaveBeenCalledTimes(1);
    });

    it('deve aplicar foco ao input interno do mat-checkbox', () => {
        // Renderiza a view inicial para o Material construir os elementos internos
        fixture.detectChanges();

        // Busca o <input type="checkbox"> interno criado pelo Angular Material
        const checkboxInput = fixture.debugElement.query(
            By.css('#mat-checkbox input[type="checkbox"], #mat-checkbox [tabindex]'),
        ).nativeElement as HTMLElement;

        const focusSpy = vi.spyOn(checkboxInput, 'focus');

        vi.advanceTimersByTime(0);

        expect(focusSpy).toHaveBeenCalledTimes(1);
    });

    it('deve aplicar foco ao primeiro radio-button interno do mat-radio-group', () => {
        // Renderiza a view inicial para o Material construir o radio group
        fixture.detectChanges();

        // Busca o primeiro <input type="radio"> interno dentro do grupo
        const radioInput = fixture.debugElement.query(
            By.css('#mat-radio-group input[type="radio"], #mat-radio-group [tabindex]'),
        ).nativeElement as HTMLElement;

        const focusSpy = vi.spyOn(radioInput, 'focus');

        vi.advanceTimersByTime(0);

        expect(focusSpy).toHaveBeenCalledTimes(1);
    });
});

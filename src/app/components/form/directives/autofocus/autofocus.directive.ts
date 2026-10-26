import {
    AfterViewInit,
    booleanAttribute,
    Directive,
    effect,
    ElementRef,
    inject,
    input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';

@Directive({ selector: '[appAutoFocus]', standalone: true })
export class AutoFocusDirective implements AfterViewInit, OnChanges {
    appAutoFocus = input(true, { transform: booleanAttribute });

    private isViewInitialized = false;

    private el = inject(ElementRef<HTMLElement>);

    constructor() {
        // O effect reage automaticamente sempre que o sinal appAutoFocus() mudar
        effect(() => {
            const isEnabled = this.appAutoFocus();

            // Só aplica se o atributo for verdadeiro e a view já tiver sido renderizada
            if (isEnabled && this.isViewInitialized) {
                this.setFocusAsync();
            }
        });
    }

    ngAfterViewInit() {
        this.isViewInitialized = true;

        // Dispara o foco inicial na renderização da View
        if (this.appAutoFocus()) {
            this.setFocusAsync();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.appAutoFocus() || changes['appAutoFocus']) {
            return;
        }

        setTimeout(() => {
            this.setFocus();
        }, 0);
    }

    private setFocusAsync(): void {
        setTimeout(() => {
            this.setFocus();
        }, 0);
    }

    private setFocus() {
        const element = this.el.nativeElement as HTMLElement;

        // Se o elemento em si for um input/button/select/textarea nativo
        const tagName = element.tagName.toLowerCase();
        const isFocusable = ['input', 'textarea', 'select', 'button'].includes(tagName);
        if (isFocusable) {
            element.focus();
            return;
        }

        // Busca elemento interno focável (Inputs do Material, Selects, Checkboxes, etc.)
        const target = element.querySelector<HTMLElement>(
            'input, textarea, select, button, [tabindex]:not([tabindex="-1"])',
        );

        if (target) {
            target.focus();
        } else if (typeof element.focus === 'function') {
            element.focus();
        }
    }
}

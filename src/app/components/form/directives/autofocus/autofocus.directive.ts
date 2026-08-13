import {
    AfterViewInit,
    ContentChild,
    Directive,
    ElementRef,
    Host,
    Input,
    OnChanges,
    Optional,
    SimpleChanges,
} from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatRadioButton } from '@angular/material/radio';

@Directive({
    selector: '[appAutofocus]',
    standalone: true,
})
export class AutofocusDirective implements AfterViewInit, OnChanges {
    @Input() appAutofocus: boolean | '' = false;

    private initialized = false;

    @ContentChild(MatRadioButton, { static: false })
    private firstRadio!: MatRadioButton;

    // injeta MatCheckbox se o host for um MatCheckbox
    constructor(
        private el: ElementRef<HTMLElement>,
        @Optional() @Host() private matCheckbox?: MatCheckbox,
    ) {}

    ngAfterViewInit() {
        this.initialized = true;

        if (this.appAutofocus === '' || this.appAutofocus) {
            this.applyFocus();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.initialized) return;

        if (changes['appAutofocus'] && this.appAutofocus) {
            this.applyFocus();
        }
    }

    // private applyFocus() {
    //     // timeout garante foco após o ciclo de renderização
    //     setTimeout(() => this.el.nativeElement.focus(), 0);
    // }

    private isCheckbox() {
        return (
            this.matCheckbox &&
            typeof (this.matCheckbox as any).focus === 'function'
        );
    }

    private isRadioGroup() {
        return (
            this.firstRadio &&
            typeof (this.firstRadio as any).focus === 'function'
        );
    }

    private focusCheckbox() {
        (this.matCheckbox as any).focus();
    }

    private focusRadioGroup() {
        (this.firstRadio as any).focus();
    }

    private getInnerInput() {
        const native = this.el.nativeElement;
        const innerInput = native.querySelector?.(
            'input[type="checkbox"], input, textarea, [tabindex]',
        ) as HTMLElement | null;
        return innerInput;
    }

    private isFocusableElement(element: HTMLElement | null) {
        return (
            element &&
            typeof element.focus === 'function' &&
            !element.hasAttribute('disabled')
        );
    }

    private focusElement(element: HTMLElement) {
        element.focus();
    }

    private isFocusableButton() {
        const native = this.el.nativeElement;
        const tagName = native.tagName.toLowerCase();
        const isButton = tagName.toLowerCase() === 'button';
        const isDisabled = native.hasAttribute('disabled');
        const visible = !!(
            native.offsetWidth ||
            native.offsetHeight ||
            native.getClientRects().length
        );
        const hasTabIndex =
            native.hasAttribute('tabindex') &&
            parseInt(native.getAttribute('tabindex') || '0', 10) >= 0;

        return isButton && !isDisabled && visible && hasTabIndex;
    }

    private focusButton() {
        const native = this.el.nativeElement;
        native.focus();
    }

    private applyFocusAux() {
        // 1) se host for MatCheckbox e expõe focus(), use-o
        try {
            if (this.isCheckbox()) {
                this.focusCheckbox();
                return;
            }
        } catch {
            // ignore e tenta outras estratégias
        }

        try {
            if (this.isRadioGroup()) {
                this.focusRadioGroup();
                return;
            }
        } catch {
            // ignore e tenta outras estratégias
        }

        if (this.isFocusableButton()) {
            this.focusButton();
            return;
        }

        // 2) procura um input dentro do host (ex.: mat-checkbox tem <input>)
        const innerInput = this.getInnerInput();
        if (this.isFocusableElement(innerInput)) {
            this.focusElement(innerInput!);
            return;
        }

        // 3) fallback para elemento host (se focável)
        const native = this.el.nativeElement;
        if (this.isFocusableElement(native)) {
            this.focusElement(native!);
            return;
        }
    }

    private applyFocus() {
        // espera o ciclo do Angular terminar
        setTimeout(() => {
            this.applyFocusAux();
        }, 0);
    }
}

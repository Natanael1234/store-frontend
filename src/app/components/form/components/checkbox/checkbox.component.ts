import { CommonModule } from '@angular/common';
import { Component, computed, model } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { isRequired } from '@components/form/components/utils/is-required/is-required';
import { AutoFocusDirective } from '@components/form/directives/autofocus/autofocus.directive';

@Component({
    selector: 'app-checkbox',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatInputModule,
        MatCheckboxModule,
        AutoFocusDirective,
    ],
    styles: `
        :host {
            display: block;
            width: 100%;
        }
        :host ::ng-deep > * {
            box-sizing: border-box;
            width: 100%;
        }
    `,
    template: `
        <mat-checkbox
            [id]="id() ?? ''"
            [formControl]="control()!"
            [tabindex]="_tabIndex()"
            [appAutoFocus]="_autofocus()">
            <span [innerHTML]="_label()"></span>
        </mat-checkbox>
    `,
})
export class CheckboxComponent {
    public readonly id = model<string>();
    public readonly label = model<string>();
    public readonly control = model<FormControl>();
    public readonly focusable = model<boolean>();
    public readonly autofocus = model<boolean>();

    protected readonly _tabIndex = computed(() => ((this.focusable() ?? true) ? 0 : -1));
    protected readonly _autofocus = computed(() => this.autofocus() ?? false);

    protected readonly _isRequired = computed(() => isRequired(this.control()));
    protected _requiredSymbol = computed(
        () => (isRequired(this.control()) ? '*' : ''), // TODO: não funciona
    );

    protected _label() {
        const label = this.label() ?? '';
        const requiredSymbol = this._requiredSymbol();
        if (requiredSymbol) {
            return `${label} ${requiredSymbol}`;
        }
        return label;
    }
}

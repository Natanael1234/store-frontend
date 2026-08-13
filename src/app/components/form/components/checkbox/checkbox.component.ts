import { CommonModule } from '@angular/common';
import { Component, computed, model } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { AutofocusDirective } from '../../directives/autofocus/autofocus.directive';
import { isRequired } from '../utils/is-required/is-required';

@Component({
    selector: 'app-checkbox',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatInputModule,
        MatCheckboxModule,
        AutofocusDirective,
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
            [appAutofocus]="_autofocus()">
            <span [innerHTML]="_label()"></span>
        </mat-checkbox>
    `,
})
export class CheckboxComponent {
    public id = model<string>();
    public label = model<string>();
    public control = model<FormControl>();
    public focusable = model<boolean>();
    public autofocus = model<boolean>();

    protected _tabIndex = computed(() => ((this.focusable() ?? true) ? 0 : -1));
    protected _autofocus = computed(() => {
        return this.autofocus() ?? false;
    });

    protected _isRequired = computed(() => isRequired(this.control()));
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

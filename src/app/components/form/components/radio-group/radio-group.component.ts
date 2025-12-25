import { CommonModule } from '@angular/common';
import { Component, computed, model } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { AutofocusDirective } from '../../directives/autofocus/autofocus.directive';

@Component({
    selector: 'app-radio-group',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatRadioModule,
        MatFormFieldModule,
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
        <mat-radio-group [id]="id() ?? ''" [formControl]="control()!">
            <mat-label>{{ label() }}</mat-label>
            <br />
            @for (option of options() || []; track $index) {
                <mat-radio-button
                    [value]="option.value"
                    [appAutofocus]="$index == 0 ? _autofocus() : false">
                    {{ option.label }}
                </mat-radio-button>
            }
        </mat-radio-group>
    `,
})
export class RadioGroupComponent {
    public id = model<string>();
    public label = model<string>();
    public control = model<FormControl>();
    public focusable = model<boolean>();
    public autofocus = model<boolean>();
    public options = model<{ value: string; label: string }[]>();

    protected _autofocus = computed(() => {
        return this.autofocus() ?? false;
    });
}

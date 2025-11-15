import { CommonModule } from '@angular/common';
import { Component, computed, model } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

@Component({
    selector: 'app-radio-group',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatRadioModule,
        MatFormFieldModule,
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
                <mat-radio-button [value]="option.value">
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
    public options = model<{ value: string; label: string }[]>();

    protected tabIndex = computed(() => (this.focusable() ? 0 : -1));
}

import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, computed, model } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-select-field',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        TextFieldModule,
        CommonModule,
        MatIconModule,
        MatSelectModule,
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
        <mat-form-field appearance="outline">
            <mat-label>{{ label() ?? '' }}</mat-label>
            <mat-select
                [id]="id() ?? ''"
                [formControl]="control()!"
                [tabindex]="tabIndex()">
                @for (option of options() || []; track $index) {
                    <mat-option [value]="option.value">
                        {{ option.label }}
                    </mat-option>
                }
            </mat-select>
            <mat-error>{{ errorMessage() }}</mat-error>
        </mat-form-field>
    `,
})
export class SelectFieldComponent {
    public id = model<string>();
    public label = model<string>();
    public focusable = model<boolean | undefined>(true);
    public control = model<FormControl>();
    public options = model<{ value: string; label: string }[]>();
    public errorMessageFn = model<() => void>();

    protected tabIndex = computed(() => (this.focusable() ? 0 : -1));
    protected errorMessage = computed(() => {
        const errorMessageFn = this.errorMessageFn();
        return (errorMessageFn ? errorMessageFn() : '') ?? '';
    });
}

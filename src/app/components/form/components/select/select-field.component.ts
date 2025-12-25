import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, computed, model } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AutofocusDirective } from '../../directives/autofocus/autofocus.directive';

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
        <mat-form-field appearance="outline" [appAutofocus]="_autofocus()">
            <mat-label>{{ label() ?? '' }}</mat-label>
            <mat-select [id]="id() ?? ''" [formControl]="control()!">
                <!-- [tabindex]="_tabIndex()" -->
                @for (option of options() || []; track $index) {
                    <mat-option [value]="option.value">
                        {{ option.label }}
                    </mat-option>
                }
            </mat-select>
        </mat-form-field>
    `,
})
export class SelectFieldComponent {
    public id = model<string>();
    public label = model<string>();
    public focusable = model<boolean | undefined>(true);
    public autofocus = model<boolean | undefined>();
    public control = model<FormControl<string | null>>();
    public options = model<{ value: string; label: string }[]>();

    // protected _tabIndex = computed(() => (this.focusable() ? 0 : -1));

    protected _autofocus = computed(() => {
        return this.autofocus() ?? false;
    });
}

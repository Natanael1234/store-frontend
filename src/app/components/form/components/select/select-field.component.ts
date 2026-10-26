import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, model } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AutoFocusDirective } from '@components/form/directives/autofocus/autofocus.directive';

export interface SelectOption {
    value: string;
    label: string;
}

@Component({
    selector: 'app-select-field',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
        CommonModule,
        MatIconModule,
        MatSelectModule,
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
        <mat-form-field appearance="outline">
            <mat-label>{{ label() ?? '' }}</mat-label>
            <mat-select [id]="id() ?? ''" [formControl]="control()!" [appAutoFocus]="_autofocus()">
                @for (option of options() || []; track $index) {
                    <mat-option [value]="option.value">
                        {{ option.label }}
                    </mat-option>
                }
            </mat-select>
        </mat-form-field>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFieldComponent {
    public readonly id = model<string>();
    public readonly label = model<string>();
    public readonly autofocus = model<boolean | undefined>();
    public readonly control = model<FormControl<string | null>>();
    public readonly options = model<SelectOption[]>([]);

    protected readonly _autofocus = computed(() => this.autofocus() ?? false);
}

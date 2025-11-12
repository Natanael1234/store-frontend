import { CommonModule } from '@angular/common';
import { Component, computed, model } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { isRequired } from '../utils/is-required/is-required';

@Component({
    selector: 'app-checkbox',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatCheckboxModule,
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
            [tabindex]="tabIndex()">
            {{ label() ?? '' }} {{ isRequired() ? '*' : '' }}
        </mat-checkbox>

        <!-- <mat-error>{{ errorMessage() }}</mat-error> -->
    `,
})
export class CheckboxComponent {
    public id = model<string>();
    public label = model<string>();
    public control = model<FormControl>();
    public focusable = model<boolean>();
    public errorMessageFn = model<() => void>();

    protected tabIndex = computed(() => ((this.focusable() ?? true) ? 0 : -1));
    protected errorMessage = computed(() => {
        const errorMessageFn = this.errorMessageFn();
        return (errorMessageFn ? errorMessageFn() : '') ?? '';
    });

    protected isRequired(): boolean {
        return isRequired(this.control());
    }
}

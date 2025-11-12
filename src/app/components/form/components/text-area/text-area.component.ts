import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import {
    Component,
    computed,
    EventEmitter,
    model,
    Output,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { provideNgxMask } from 'ngx-mask';

@Component({
    selector: 'app-text-area-field',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        TextFieldModule,
        CommonModule,
        MatIconModule,
    ],
    providers: [provideNgxMask()],
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
            <textarea
                matInput
                cdkTextareaAutosize
                #autosize="cdkTextareaAutosize"
                cdkAutosizeMinRows="2"
                cdkAutosizeMaxRows="6"
                [id]="id() ?? ''"
                [placeholder]="placeholder() ?? ''"
                [tabindex]="tabIndex()"
                [minlength]="minLength() ?? null"
                [maxlength]="maxLength() ?? null"
                [formControl]="control()!"
                (blur)="fireOnBlurEvent()"></textarea>
            <mat-error>
                {{ errorMessage() }}
            </mat-error>
        </mat-form-field>
    `,
})
export class TextAreaFieldComponent {
    public id = model<string>();
    public label = model<string>();
    public placeholder = model<string>();
    public control = model<FormControl>();
    public focusable = model<boolean | null | undefined>(true);
    public minLength = model<number>();
    public maxLength = model<number>();

    protected errorMessage = computed(() => {
        const errorMessageFn = this.errorMessageFn();
        return (errorMessageFn ? errorMessageFn() : '') ?? '';
    });
    public errorMessageFn = model<() => void>();
    protected tabIndex = computed(() => (this.focusable() ? 0 : -1));
    @Output() onBlur = new EventEmitter();

    protected fireOnBlurEvent() {
        this.onBlur.emit();
    }
}

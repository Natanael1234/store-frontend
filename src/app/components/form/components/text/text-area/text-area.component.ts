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
import { FirstErrorMessagePipe } from '../../../../../pipes/first-error-message.pipe';
import { AutofocusDirective } from '../../../directives/autofocus/autofocus.directive';

@Component({
    selector: 'app-text-area-field',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        TextFieldModule,
        CommonModule,
        MatIconModule,
        FirstErrorMessagePipe,
        AutofocusDirective,
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
            <mat-label>{{ _label() }}</mat-label>
            <textarea
                matInput
                cdkTextareaAutosize
                #autosize="cdkTextareaAutosize"
                [attr.id]="_id()"
                [attr.placeholder]="_placeholder()"
                [attr.tabindex]="_tabIndex()"
                [appAutofocus]="_autofocus()"
                [attr.readonly]="_readOnly()"
                [attr.minlength]="_minLength()"
                [attr.maxlength]="_maxLength()"
                [attr.cdkAutosizeMinRows]="_autosizeMinRows()"
                [attr.cdkAutosizeMaxRows]="_autosizeMaxRows()"
                [formControl]="control()!"
                (blur)="fireOnBlurEvent()"></textarea>
            <mat-error>{{ control() ?? null | firstErrorMessage }}</mat-error>
        </mat-form-field>
    `,
})
export class TextAreaFieldComponent {
    public id = model<string>();
    public label = model<string>();
    public placeholder = model<string>();
    public control = model<FormControl>();
    public focusable = model<boolean>();
    public autofocus = model<boolean>();
    public readOnly = model<boolean>(false);
    public minLength = model<number>();
    public maxLength = model<number>();
    public autosizeMinRows = model<number>();
    public autosizeMaxRows = model<number>();

    protected _id = computed(() => this.id() ?? '');
    protected _label = computed(() => this.label() ?? '');
    protected _placeholder = computed(() => this.placeholder() ?? '');
    protected _tabIndex = computed(() => ((this.focusable() ?? true) ? 0 : -1));
    protected _autofocus = computed(() => this.autofocus() ?? false);
    protected _readOnly = computed(() => this.readOnly() ?? false);
    protected _minLength = computed(() => this.minLength() ?? null);
    protected _maxLength = computed(() => this.maxLength() ?? null);
    protected _autosizeMinRows = computed(() => this.autosizeMinRows() ?? 2);
    protected _autosizeMaxRows = computed(() => this.autosizeMaxRows() ?? 6);

    @Output() onBlur = new EventEmitter();

    protected fireOnBlurEvent() {
        this.onBlur.emit();
    }
}

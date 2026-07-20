import { A11yModule } from '@angular/cdk/a11y';
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
import { MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Icon } from '../../../../../enums/icons/icons.enum';
import { FirstErrorMessagePipe } from '../../../../../pipes/first-error-message.pipe';
import { AutofocusDirective } from '../../../directives/autofocus/autofocus.directive';
import { AutoCompleteType } from '../../../enums/auto-complete-type/auto-complete-type.enum';
import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { TextFormat } from '../../../enums/text-format/text-format.enum';
import { TextMask } from '../../../enums/text-mask/text-mask.enum';

@Component({
    selector: 'app-text-field',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
        NgxMaskDirective,
        CommonModule,
        MatIconModule,
        MatIconButton,
        FirstErrorMessagePipe,
        AutofocusDirective,
        A11yModule,
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

        .padding-left {
            padding-right: 0.5em;
        }

        .padding-right {
            padding-left: 0.5em;
        }
    `,
    template: `
        <mat-form-field appearance="outline">
            <mat-label>{{ _label() }}</mat-label>
            <!-- prefix -->
            @if (prefix()) {
                <span matTextPrefix class="padding-left">{{ prefix() }}</span>
            }

            <!-- text input -->
            <input
                matInput
                [attr.id]="_id()"
                [attr.type]="_type()"
                [attr.placeholder]="_placeholder()"
                [attr.tabindex]="_tabIndex()"
                [attr.autocomplete]="_autocomplete()"
                [appAutofocus]="_autofocus()"
                [attr.readonly]="_readOnly()"
                [attr.minlength]="_minLength()"
                [attr.maxlength]="_maxLength()"
                [mask]="_mask()"
                [attr.dropSpecialCharacters]="false"
                [formControl]="control()!"
                (blur)="fireOnBlurEvent()" />

            <!-- password -->
            @if (_buttonVisible()) {
                <button
                    mat-icon-button
                    matSuffix
                    (click)="toggleVisibility()"
                    type="button">
                    <mat-icon>{{ _passwordIcon() }}</mat-icon>
                </button>
            }
            <!-- suffix -->
            @if (suffix()) {
                <span matTextSuffix class="padding-right">
                    {{ suffix() }}
                </span>
            }
            <!-- error -->
            <mat-error>{{ control() ?? null | firstErrorMessage }}</mat-error>
        </mat-form-field>
    `,
})
export class TextFieldComponent {
    public id = model<string>();
    public mask = model<TextMask>();
    public label = model<string>();
    public placeholder = model<string>();
    public control = model<FormControl>();
    public focusable = model<boolean>();
    public autofocus = model<boolean>();
    public autocomplete = model<AutoCompleteType>();
    public readOnly = model<boolean>(false);
    public format = model<TextFormat | undefined>();
    public minLength = model<number>();
    public maxLength = model<number>();
    public prefix = model<string>();
    public suffix = model<string>();

    protected _visible = model<boolean>(false);

    protected _id = computed(() => this.id() ?? '');
    protected _type = computed<FormElementType.password | FormElementType.text>(
        () =>
            this._isPassword() && !this._visible()
                ? FormElementType.password
                : FormElementType.text,
    );
    protected _buttonVisible = computed(
        () => this.format() == TextFormat.password,
    );
    protected _label = computed(() => this.label() ?? '');
    protected _placeholder = computed(() => this.placeholder() ?? '');
    protected _tabIndex = computed(() => ((this.focusable() ?? true) ? 0 : -1));
    protected _readOnly = computed(() => !!this.readOnly());
    protected _autocomplete = computed(
        () => this.autocomplete() ?? AutoCompleteType.off,
    );
    protected _autofocus = computed(() => this.autofocus() ?? false);
    protected _minLength = computed(() => this.minLength() ?? null);
    protected _maxLength = computed(() => this.maxLength() ?? null);
    protected _mask = computed(() => this.mask() ?? null);
    protected _passwordIcon = computed(() =>
        this._visible() ? Icon.visibility_off : Icon.visibility,
    );
    protected _isPassword = computed(
        () => this.format() == TextFormat.password,
    );

    @Output() onBlur = new EventEmitter();

    protected toggleVisibility() {
        this._visible.set(!this._visible());
    }

    protected fireOnBlurEvent() {
        this.onBlur.emit();
    }
}

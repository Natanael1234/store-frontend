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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FirstErrorMessagePipe } from '../../../../../pipes/first-error-message.pipe';
import { AutofocusDirective } from '../../../directives/autofocus/autofocus.directive';
import { AutoCompleteType } from '../../../enums/auto-complete-type/auto-complete-type.enum';
import { FormElementType } from '../../../enums/form-element-type/form-element-type.enum';
import { InputMode } from '../../../enums/input-mode/input-mode.enum';
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
                [inputMode]="_inputMode()"
                [dropSpecialCharacters]="false"
                [formControl]="control()!"
                (blur)="fireOnBlurEvent()" />

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
    public readOnly = model<boolean>();
    public format = model<
        | TextFormat.text
        | TextFormat.search
        | TextFormat.cnpj
        | TextFormat.cpf
        | TextFormat.zipCode
        | TextFormat.date
        | TextFormat.time
        | TextFormat.phone
        | TextFormat.email
        | TextFormat.url
        | undefined
    >();
    public minLength = model<number>();
    public maxLength = model<number>();
    public prefix = model<string>();
    public suffix = model<string>();

    protected _visible = model<boolean>(false);

    protected _id = computed(() => this.id() ?? '');
    protected _type = computed<FormElementType.text>(
        () => FormElementType.text,
    );
    protected _label = computed(() => this.label() ?? '');
    protected _placeholder = computed(() => this.placeholder() ?? '');
    protected _tabIndex = computed(() => ((this.focusable() ?? true) ? 0 : -1));
    protected _readOnly = computed(() => this.readOnly() ?? false);
    protected _autocomplete = computed(
        () => this.autocomplete() ?? AutoCompleteType.off,
    );
    protected _autofocus = computed(() => this.autofocus() ?? false);
    protected _minLength = computed(() => this.minLength() ?? null);
    protected _maxLength = computed(() => this.maxLength() ?? null);
    protected _mask = computed(() => {
        const mask = this.mask();
        if (mask) {
            return mask;
        }
        const format = this.format();
        switch (format) {
            case TextFormat.cnpj:
                return TextMask.cnpj;
            case TextFormat.cpf:
                return TextMask.cpf;
            case TextFormat.date:
                return TextMask.date;
            case TextFormat.email:
                return TextMask.email;
            case TextFormat.phone:
                return TextMask.phone;
            case TextFormat.time:
                return TextMask.time;
            case TextFormat.zipCode:
                return TextMask.zipCode;
            default:
                return null;
        }
    });
    protected _inputMode = computed(() => {
        const format = this.format();
        switch (format) {
            case TextFormat.text:
                return InputMode.text;
            case TextFormat.search:
                return InputMode.search;
            case TextFormat.cnpj:
                return InputMode.numeric;
            case TextFormat.cpf:
                return InputMode.numeric;
            case TextFormat.zipCode:
                return InputMode.numeric;
            case TextFormat.date:
                return InputMode.numeric;
            case TextFormat.time:
                return InputMode.numeric;
            case TextFormat.email:
                return InputMode.email;
            case TextFormat.url:
                return InputMode.url;
            case TextFormat.phone:
                return InputMode.tel;
            case TextFormat.time:
                return InputMode.numeric;
            default:
                return null;
        }
    });

    @Output() onBlur = new EventEmitter();

    protected fireOnBlurEvent() {
        this.onBlur.emit();
    }
}

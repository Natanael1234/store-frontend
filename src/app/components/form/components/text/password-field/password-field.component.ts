import { A11yModule } from '@angular/cdk/a11y';
import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, EventEmitter, Output, computed, model } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AutoFocusDirective } from '@components/form/directives/autofocus/autofocus.directive';
import { AutoCompleteType } from '@components/form/enums/auto-complete-type/auto-complete-type.enum';
import { FormElementType } from '@components/form/enums/form-element-type/form-element-type.enum';
import { Icon } from '@enums/icons/icons.enum';
import { FirstErrorMessagePipe } from '@pipes/first-error-message.pipe';
import { provideNgxMask } from 'ngx-mask';

@Component({
    selector: 'app-password-field',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
        MatIconModule,
        MatIconButton,
        FirstErrorMessagePipe,
        AutoFocusDirective,
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

            <input
                matInput
                [attr.id]="_id()"
                [attr.type]="_type()"
                [attr.placeholder]="_placeholder()"
                [attr.tabindex]="_tabIndex()"
                [attr.autocomplete]="_autocomplete()"
                [appAutoFocus]="_autofocus()"
                [attr.readonly]="_readOnly()"
                [attr.minlength]="_minLength()"
                [attr.maxlength]="_maxLength()"
                [formControl]="control()!"
                (blur)="fireOnBlurEvent()" />

            <button
                mat-icon-button
                matSuffix
                (click)="toggleVisibility()"
                type="button"
                tabIndex="-1"
                [disabled]="control()?.disabled ?? false">
                <!-- TODO: testar o disabled do botão -->
                <!-- TOOD: test tabIndex -->
                <mat-icon>{{ _passwordIcon() }}</mat-icon>
            </button>

            <!-- error -->
            <mat-error>{{ control() ?? null | firstErrorMessage }}</mat-error>
        </mat-form-field>
    `,
})
export class PasswordFieldComponent {
    public readonly id = model<string>();
    public readonly label = model<string>();
    public readonly placeholder = model<string>();
    public readonly control = model<FormControl>();
    public readonly focusable = model<boolean>();
    public readonly autofocus = model<boolean>();
    public readonly autocomplete = model<AutoCompleteType>();
    public readonly readOnly = model<boolean>();
    public readonly minLength = model<number>();
    public readonly maxLength = model<number>();

    protected readonly _visible = model<boolean>(false);

    protected readonly _id = computed(() => this.id() ?? '');
    protected readonly _type = computed<FormElementType.password | FormElementType.text>(() =>
        !this._visible() ? FormElementType.password : FormElementType.text,
    );
    protected readonly _label = computed(() => this.label() ?? '');
    protected readonly _placeholder = computed(() => this.placeholder() ?? '');
    protected readonly _tabIndex = computed(() => ((this.focusable() ?? true) ? 0 : -1));
    protected readonly _readOnly = computed(() => this.readOnly() ?? false);
    protected readonly _autocomplete = computed(() => this.autocomplete() ?? AutoCompleteType.off);
    protected readonly _autofocus = computed(() => this.autofocus() ?? false);
    protected readonly _minLength = computed(() => this.minLength() ?? null);
    protected readonly _maxLength = computed(() => this.maxLength() ?? null);
    protected readonly _passwordIcon = computed(() =>
        this._visible() ? Icon.visibility_off : Icon.visibility,
    );

    @Output() public readonly onBlur = new EventEmitter<void>();

    protected toggleVisibility(): void {
        this._visible.set(!this._visible());
    }

    protected fireOnBlurEvent(): void {
        this.onBlur.emit();
    }
}

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
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FirstErrorMessagePipe } from '../../../../pipes/first-error-message.pipe';
import { FormElementType } from '../../enums/form-element-type/form-element-type.enum';

@Component({
    selector: 'app-numeric-field',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        TextFieldModule,
        NgxMaskDirective,
        CommonModule,
        MatIconModule,
        FirstErrorMessagePipe,
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
        .align-right {
            text-align: right;
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
                type="text"
                [attr.id]="_id()"
                [attr.placeholder]="_placeHolder()"
                [attr.tabindex]="_tabIndex()"
                [attr.minlength]="_minLength()"
                [attr.maxlength]="_maxLength()"
                [attr.min]="_min()"
                [attr.max]="_max()"
                [attr.step]="_step()"
                [mask]="_mask()"
                thousandSeparator="."
                decimalMarker=","
                [allowNegativeNumbers]="_allowNegativeNumbers()"
                [dropSpecialCharacters]="false"
                [class.align-right]="true"
                [formControl]="control()!"
                (blur)="fireOnBlurEvent()" />
            <!-- [leadZero]="_leadZero()" TODO: causing exception -->

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
export class NumericFieldComponent {
    public id = model<string>();
    public label = model<string>();
    public placeholder = model<string>();
    public control = model<FormControl>();
    public focusable = model<boolean | null | undefined>(true);
    public minLength = model<number>();
    public maxLength = model<number>();
    public prefix = model<string>();
    public suffix = model<string>();
    public breakLine = model<boolean>();
    public min = model<number>();
    public max = model<number>();
    public step = model<number>();
    public allowNegativeNumbers = model<boolean>();
    public decimalPlaces = model<number>();
    public leadZero = model<boolean>();

    protected _id = computed(() => this.id() ?? null);
    protected _type = computed(() => FormElementType.text);
    protected _label = computed(() => this.label() ?? '');
    protected _placeHolder = computed(() => this.placeholder() ?? null);
    protected _tabIndex = computed(() => (this.focusable() ? 0 : -1));
    protected _minLength = computed(() => this.minLength() ?? null);
    protected _maxLength = computed(() => this.maxLength() ?? null);
    protected _decimalPlaces = computed(() => {
        const decimalPlaces = this.decimalPlaces();
        if (decimalPlaces != null) {
            const normalizedDecimalPlaces = Math.max(0, decimalPlaces);
            return normalizedDecimalPlaces;
        }
        return null;
    });
    protected _mask = computed(() => {
        const decimalPlaces = this._decimalPlaces();
        if (decimalPlaces == null) {
            const mask = `separator`;
            return mask;
        } else {
            const mask = `separator.${decimalPlaces}`;
            return mask;
        }
    });
    protected _leadZero = computed(() => {
        const decimalPlaces = this._decimalPlaces();
        if (decimalPlaces == null || decimalPlaces == 0) {
            return false;
        }
        return true;
    });

    protected _min = computed(() => this.min() ?? null);
    protected _max = computed(() => this.max() ?? null);
    protected _step = computed(() => this.step() ?? null);
    protected _allowNegativeNumbers = computed(
        () => this.allowNegativeNumbers() ?? true,
    );

    @Output() onBlur = new EventEmitter();

    protected fireOnBlurEvent() {
        this.onBlur.emit();
    }
}

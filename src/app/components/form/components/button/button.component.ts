import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, model, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Params, QueryParamsHandling, RouterLink } from '@angular/router';
import { ButtonAppearance } from '@components/form/components/button/enum/appearance/button-appearance.enum';
import { AutoFocusDirective } from '@components/form/directives/autofocus/autofocus.directive';
import { FormElementType } from '@components/form/enums/form-element-type/form-element-type.enum';
import { Icon } from '@enums/icons/icons.enum';
import { leftMouseClickFilter } from '@utils/mouse-events/mouse-click-filter';

@Component({
    selector: 'app-button',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        TextFieldModule,
        CommonModule,
        MatIconModule,
        MatButtonModule,
        AutoFocusDirective,
        RouterLink,
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
        <button
            [attr.id]="_id()"
            [type]="_type()"
            [matButton]="_matButton()"
            (click)="fireClickButtonEvent($event) ?? null"
            [disabled]="_disabled()"
            [appAutoFocus]="_autofocus()"
            [tabindex]="_tabindex()"
            [routerLink]="routerLink()"
            [queryParams]="_queryParams()"
            [queryParamsHandling]="_queryParamsHandling()">
            @if (icon()) {
                <mat-icon>{{ icon() }}</mat-icon>
            }
            <mat-label [innerHTML]="label()"></mat-label>
        </button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
    protected readonly FormElementType = FormElementType;
    public readonly type = model<
        FormElementType.button | FormElementType.submit | FormElementType.reset
    >();
    public readonly id = model<string | undefined>();
    public readonly icon = model<Icon | undefined>();
    public readonly label = model<string | undefined>();
    public readonly appearance = model<ButtonAppearance>(ButtonAppearance.text);
    public readonly disabled = model<boolean>();
    public readonly focusable = model<boolean>();
    public readonly autofocus = model<boolean>();
    // TODO: test
    public readonly routerLink = model<string | string[] | undefined>();
    // TODO: test
    public readonly queryParams = model<Params | undefined>();
    // TODO: test
    public readonly queryParamsHandling = model<QueryParamsHandling | undefined>();

    protected readonly _id = computed(() => this.id());
    protected readonly _type = computed(() => this.type() ?? FormElementType.button);
    protected readonly _matButton = computed(() => this.appearance());
    protected readonly _disabled = computed(() => !!this.disabled());
    protected readonly _autofocus = computed(() => this.autofocus() ?? false);
    protected readonly _tabindex = computed(() => ((this.focusable() ?? true) ? 0 : -1));
    protected readonly _routerLink = computed(() => this.routerLink() ?? null);
    protected readonly _queryParams = computed(() => this.queryParams() ?? null);
    protected readonly _queryParamsHandling = computed(() => this.queryParamsHandling() ?? null);
    public readonly onClick = output<void>();

    protected fireClickButtonEvent(event: MouseEvent): void {
        if (leftMouseClickFilter(event)) {
            this.onClick.emit();
        }
    }
}

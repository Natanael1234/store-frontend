import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import {
    Component,
    computed,
    EventEmitter,
    model,
    Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { QueryParamsHandling } from '@angular/router';
import { ɵɵRouterLink as RouterLink } from '@angular/router/testing';
import { ButtonAppearance } from '@components/form/components/button/enum/appearance/button-appearance.enum';
import { AutofocusDirective } from '@components/form/directives/autofocus/autofocus.directive';
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
        AutofocusDirective,
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
            [appAutofocus]="_autofocus()"
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
})
export class ButtonComponent {
    FormElementType = FormElementType;
    public type = model<
        FormElementType.button | FormElementType.submit | FormElementType.reset
    >();
    public id = model<string | undefined>();
    public icon = model<Icon>();
    public label = model<string>();
    public appearance = model<ButtonAppearance>(ButtonAppearance.text);
    public disabled = model<boolean>();
    public focusable = model<boolean>();
    public autofocus = model<boolean>();
    // TODO: test
    public routerLink = model<string | string[] | undefined>();
    // TODO: test
    public queryParams = model<object | undefined>();
    // TODO: test
    public queryParamsHandling = model<QueryParamsHandling | undefined>();

    protected _id = computed(() => this.id());
    protected _type = computed(() => this.type() ?? FormElementType.button);
    protected _matButton = computed(() => this.appearance());
    protected _disabled = computed(() => !!this.disabled());
    protected _autofocus = computed(() => this.autofocus() ?? false);
    protected _tabindex = computed(() => ((this.focusable() ?? true) ? 0 : -1));
    protected _routerLink = computed(() => this.routerLink() ?? null);
    protected _queryParams = computed(() => this.queryParams() ?? null);
    protected _queryParamsHandling = computed(
        () => this.queryParamsHandling() ?? null,
    );

    @Output() public onClick = new EventEmitter();

    protected fireClickButtonEvent(event: MouseEvent) {
        if (leftMouseClickFilter(event)) {
            this.onClick.emit();
        }
    }
}

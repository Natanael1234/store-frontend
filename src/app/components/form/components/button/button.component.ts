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
import { Icon } from '../../../../enums/icons/icons.enum';
import { leftMouseClickFilter } from '../../../../utils/mouse-events/mouse-click-filter';
import { ButtonStyle } from './enum/button-style.enum';

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
            [matButton]="style()"
            (click)="fireClickButtonEvent($event)"
            [disabled]="!!disabled()"
            [tabindex]="tabIndex()">
            @if (icon()) {
                <mat-icon>{{ icon() }}</mat-icon>
            }
            <mat-label>{{ label() }}</mat-label>
        </button>
    `,
})
export class ButtonComponent {
    ButtonStyle = ButtonStyle;
    public icon = model<Icon>();
    public label = model<string>();
    public style = model<ButtonStyle>(ButtonStyle.text);
    public disabled = model<boolean>();
    public focusable = model<boolean>();

    protected tabIndex = computed(() => ((this.focusable() ?? true) ? 0 : -1));

    @Output() onClick = new EventEmitter();

    protected fireClickButtonEvent(event: MouseEvent) {
        if (leftMouseClickFilter(event)) {
            this.onClick.emit();
        }
    }
}

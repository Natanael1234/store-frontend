import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { leftMouseClickFilter } from '../../../../utils/mouse-events/mouse-click-filter';
import { ButtonFormElement } from '../../model/others/button/button.model';

@Component({
    selector: 'app-dynamic-button',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        TextFieldModule,
        CommonModule,
        MatIconModule,
        MatButtonModule,
    ],
    templateUrl: './dynamic-button.component.html',
    styleUrl: './dynamic-button.component.scss',
})
export class DynamicButtonComponent {
    @Input() button?: ButtonFormElement;

    // TODO: test
    protected fireClickButtonEvent(event: MouseEvent) {
        if (
            !this.button ||
            !this.button.clickCallback ||
            !leftMouseClickFilter(event)
        ) {
            return;
        }
        this.button.clickCallback(event);
    }
}

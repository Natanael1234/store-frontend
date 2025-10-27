import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { leftMouseClickFilter } from '../../../../utils/mouse-events/mouse-click-filter';
import { ButtonStyle } from '../../enums/button-style/button-style.enum';
import { ButtonFormElement } from '../../model/others/button/button-form-element.model';

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
    protected ButtonStyle = ButtonStyle;
    public button = model<ButtonFormElement>(new ButtonFormElement({}));

    // TODO: test
    protected fireClickButtonEvent(event: MouseEvent) {
        const button = this.button();
        const callback = button.clickCallback;
        if (!callback || !leftMouseClickFilter(event)) {
            return;
        }
        callback(event);
    }
}

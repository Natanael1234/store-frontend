import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-select',
    imports: [
        FormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatOptionModule,
        MatTooltipModule,
        MatSelectModule,
    ],
    templateUrl: './select.component.html',
    styleUrl: './select.component.scss',
})
export class SelectComponent<
    LabelType extends string,
    ValueType extends string,
> {
    @Input() public label!: string;
    @Input() public value!: ValueType;

    @Input()
    public options: { label: LabelType; value: ValueType }[] = [];

    @Output() valueChange = new EventEmitter<ValueType>();

    protected onChange() {
        this.valueChange.emit(this.value);
    }
}

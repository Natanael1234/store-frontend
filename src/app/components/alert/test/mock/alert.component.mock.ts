import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertType } from '@components/alert/alert.component';

@Component({ selector: 'app-alert', template: '' })
export class MockAlertComponent {
    @Input() showCloseButton?: boolean;
    @Input() type?: AlertType = 'success';
    @Input() icon?: string;
    @Output() onClose: EventEmitter<void> = new EventEmitter();
}

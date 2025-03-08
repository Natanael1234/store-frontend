import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CommonModule } from '@angular/common';

type AlertType =
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'primary'
  | 'secondary'
  | 'light'
  | 'dark';

@Component({
    selector: 'app-alert',
    imports: [CommonModule, MatIconModule, MatButtonModule],
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.scss'
})
export class AlertComponent {
  @Input() showCloseButton?: boolean;
  @Input() type?: AlertType = 'success';
  @Input() icon?: string;

  @Output() onClose: EventEmitter<void> = new EventEmitter();
}

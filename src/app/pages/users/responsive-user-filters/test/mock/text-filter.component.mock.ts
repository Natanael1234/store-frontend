import { Component, EventEmitter, Output } from '@angular/core';

@Component({ selector: 'app-text-filter', template: '' })
export class MockTextFilterComponent {
    @Output() public textSearch: EventEmitter<string> =
        new EventEmitter<string>();
}

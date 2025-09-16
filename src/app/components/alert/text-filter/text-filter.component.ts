import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';

// TODO: test
@Component({
  selector: 'app-text-filter',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './text-filter.component.html',
  styleUrl: './text-filter.component.scss',
})
export class TextFilterComponent {
  protected textQuery: string = '';

  protected searchControl = new FormControl('');

  @Output() public textSearch: EventEmitter<string> =
    new EventEmitter<string>();

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500) // Atraso de 500ms antes de emitir o valor
      )
      .subscribe((value) => {
        const textQuery = value as unknown as string;
        this.textQuery = textQuery;
        this.onDebounce();
      });
  }

  protected onTextSearch(event: any) {
    if (event instanceof KeyboardEvent && event.key === 'Enter') {
      this.textSearch.emit(this.textQuery);
    }
  }

  protected cleanTextSearch() {
    this.textQuery = '';
    this.searchControl.setValue('');
    this.textSearch.emit(this.textQuery);
  }

  protected onDebounce() {
    this.textSearch.emit(this.textQuery);
  }
}

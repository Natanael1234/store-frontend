import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';

@Component({
    selector: 'app-text-filter',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
    ],
    styles: `
        #text-query-field {
            width: 100%;
            // height: 80px;
        }

        #text-query-input {
        }

        #clean-search-button {
            margin-right: 0.5em;
        }

        ::ng-deep .mat-mdc-form-field-subscript-wrapper {
            display: none !important;
        }
    `,
    template: `
        <mat-form-field
            id="text-query-field"
            [class.search]="true"
            [class.text-query-field]="true"
            appearance="outline">
            <input
                id="text-query-input"
                matInput
                type="text"
                [formControl]="searchControl"
                placeholder="Pesquisar"
                (keypress)="onTextSearch($event)" />
            @if (textQuery) {
                <button
                    id="clean-search-button"
                    type="button"
                    matSuffix
                    mat-icon-button
                    aria-label="Limpar busca de texto"
                    (click)="cleanTextSearch()">
                    <mat-icon class="clean-search-icon">close</mat-icon>
                </button>
            }
        </mat-form-field>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFilterComponent {
    protected textQuery = '';
    protected readonly searchControl = new FormControl('');

    readonly textSearch = output<string>();

    constructor() {
        this.searchControl.valueChanges
            .pipe(
                debounceTime(500), // Atraso de 500ms antes de emitir o valor
            )
            .subscribe((value) => {
                const textQuery = value as unknown as string;
                this.textQuery = textQuery;
                this.onDebounce();
            });
    }

    protected onTextSearch(event: any): void {
        if (event instanceof KeyboardEvent && event.key === 'Enter') {
            this.textSearch.emit(this.textQuery);
        }
    }

    protected cleanTextSearch(): void {
        this.textQuery = '';
        this.searchControl.setValue('');
        this.textSearch.emit(this.textQuery);
    }

    protected onDebounce() {
        this.textSearch.emit(this.textQuery);
    }
}

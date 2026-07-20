import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AbstractFormElementModel } from '../../../../components/form/components/abstract/abstract-form-element.model';
import { ButtonStyle } from '../../../../components/form/components/button/enum/style/button-style.enum';
import { ButtonModel } from '../../../../components/form/components/button/model/button.model';
import { SelectModel } from '../../../../components/form/components/select/model/select-element.model';
import { ActiveFilterOptions } from '../../../../constants/active-filter-options/active-filter-options';
import { ActiveFilter } from '../../../../enums/active-filter/active-filter.enum';
import { DeletedFilter } from '../../../../enums/deleted-filter/deleted-filter.enum';
import { UserOrder } from '../../../../services/user/enums/user-order/user-order.enum';
import { UserOrderOptions } from './sort-options/user-sort.options';
import { ToolbarScrapper } from './test/scrapper/scrapper.test';
import { UserFilterToolbarComponent } from './user-filter-toolbar.component';

describe('UserFilterToolbarComponent.', () => {
    let toolbarComponent: UserFilterToolbarComponent;
    let fixture: ComponentFixture<UserFilterToolbarComponent>;
    let formScrapper: ToolbarScrapper;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [],
            imports: [
                MatButtonModule,
                MatFormFieldModule,
                MatIconModule,
                MatSelectModule,
                MatOptionModule,
                FormsModule,
                NoopAnimationsModule, // Evita erros de animação no teste
                UserFilterToolbarComponent,
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(UserFilterToolbarComponent);
        formScrapper = new ToolbarScrapper(fixture);
        toolbarComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    function testForm(args: { elements: AbstractFormElementModel[] }) {
        const elements = formScrapper.getFormElements();
        expect(elements).toHaveSize(args.elements.length);

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const expectedElement = args.elements[i];

            expect(element.id).withContext('id').toEqual(expectedElement.id);
            expect(element.id).withContext('id').toEqual(expectedElement.id);
            if (element instanceof SelectModel) {
                const select = element as SelectModel;
                const expectedSelect = expectedElement as SelectModel;
                expect(select.label)
                    .withContext('label')
                    .toEqual(expectedSelect.label);
                expect(select.label)
                    .withContext('label')
                    .toEqual(expectedSelect.label);
                expect(select.focusable)
                    .withContext('focusable')
                    .toEqual(expectedSelect.focusable);
                expect(select.readOnly)
                    .withContext('readOnly')
                    .toEqual(expectedSelect.readOnly);
                // control
                expect(select.control).withContext('control').toBeDefined();
                expect(select.control).withContext('control').not.toBeNull();
                expect(select.control.value)
                    .withContext('control value')
                    .toEqual(expectedSelect.control.value);
                expect(select.control.disabled)
                    .withContext('control disabled')
                    .toEqual(expectedSelect.control.disabled);
            } else if (element instanceof ButtonModel) {
                const button = element as ButtonModel;
                const expectedButton = expectedElement as ButtonModel;
                expect(button.type)
                    .withContext('button type')
                    .toEqual(expectedButton.type);
                expect(button.icon)
                    .withContext('icon')
                    .toEqual(expectedButton.icon);
                expect(button.label)
                    .withContext('label')
                    .toEqual(expectedButton.label);
                expect(button.style)
                    .withContext('style')
                    .toEqual(expectedButton.style ?? ButtonStyle.text);
                // TODO: test events
            } else {
                fail('Invalid model');
            }
            expect(element.colSize)
                .withContext('col size of ' + expectedElement.id)
                .toEqual(expectedElement.colSize);
        }
    }

    it('should create the component.', () => {
        expect(toolbarComponent)
            .withContext('component is defined')
            .toBeTruthy();
    });

    it('should contain only a FormComponent instance.', () => {
        expect(formScrapper.onlyContainsFormComponent()).toBeTrue();
    });

    describe('vertical.', () => {
        it('should show vertical layout by default.', () => {
            fixture.componentInstance.showSort.set(true);
            fixture.componentInstance.showCancelButton.set(true);
            fixture.detectChanges();
            testForm({
                elements: [
                    new SelectModel({
                        id: 'sort-select',
                        label: 'Ordem',
                        options: UserOrderOptions,
                        control: new FormControl({
                            value: UserOrder.name_asc,
                            disabled: false,
                        }),
                        colSize: 12,
                    }),
                    new SelectModel({
                        id: 'active-select',
                        label: 'Ativos',
                        options: ActiveFilterOptions,
                        control: new FormControl({
                            value: ActiveFilter.active,
                            disabled: false,
                        }),
                        colSize: 12,
                    }),
                    new SelectModel({
                        id: 'deleted-select',
                        label: 'Deletados',
                        options: UserOrderOptions,
                        control: new FormControl({
                            value: DeletedFilter.not_deleted,
                            disabled: false,
                        }),
                        colSize: 12,
                    }),
                    new ButtonModel({
                        id: 'filter-button',
                        label: 'Filtrar',
                        colSize: 5,
                        style: ButtonStyle.filled,
                        clickCallback: undefined,
                    }),
                    new ButtonModel({
                        id: 'cancel-button',
                        label: 'Cancelar',
                        colSize: 5,
                        style: ButtonStyle.text,
                        clickCallback: undefined,
                    }),
                ],
            });
        });

        it('should show vertical layout when vertical is true.', () => {
            fixture.componentInstance.vertical.set(true);
            fixture.componentInstance.showSort.set(true);
            fixture.componentInstance.showCancelButton.set(true);
            fixture.detectChanges();
            testForm({
                elements: [
                    new SelectModel({
                        id: 'sort-select',
                        label: 'Ordem',
                        options: UserOrderOptions,
                        control: new FormControl({
                            value: UserOrder.name_asc,
                            disabled: false,
                        }),
                        colSize: 12,
                    }),
                    new SelectModel({
                        id: 'active-select',
                        label: 'Ativos',
                        options: ActiveFilterOptions,
                        control: new FormControl({
                            value: ActiveFilter.active,
                            disabled: false,
                        }),
                        colSize: 12,
                    }),
                    new SelectModel({
                        id: 'deleted-select',
                        label: 'Deletados',
                        options: UserOrderOptions,
                        control: new FormControl({
                            value: DeletedFilter.not_deleted,
                            disabled: false,
                        }),
                        colSize: 12,
                    }),
                    new ButtonModel({
                        id: 'filter-button',
                        label: 'Filtrar',
                        colSize: 5,
                        style: ButtonStyle.filled,
                        clickCallback: undefined,
                    }),
                    new ButtonModel({
                        id: 'cancel-button',
                        label: 'Cancelar',
                        colSize: 5,
                        style: ButtonStyle.text,
                        clickCallback: undefined,
                    }),
                ],
            });
        });

        it('should show horizontal layout when vertical is false.', () => {
            fixture.componentInstance.vertical.set(false);
            fixture.componentInstance.showCancelButton.set(true);
            fixture.componentInstance.showSort.set(true);
            fixture.detectChanges();
            testForm({
                elements: [
                    new SelectModel({
                        id: 'sort-select',
                        label: 'Ordem',
                        options: UserOrderOptions,
                        control: new FormControl({
                            value: UserOrder.name_asc,
                            disabled: false,
                        }),
                        colSize: 2,
                    }),
                    new SelectModel({
                        id: 'active-select',
                        label: 'Ativos',
                        options: ActiveFilterOptions,
                        control: new FormControl({
                            value: ActiveFilter.active,
                            disabled: false,
                        }),
                        colSize: 2,
                    }),
                    new SelectModel({
                        id: 'deleted-select',
                        label: 'Deletados',
                        options: UserOrderOptions,
                        control: new FormControl({
                            value: DeletedFilter.not_deleted,
                            disabled: false,
                        }),
                        colSize: 2,
                    }),
                    new ButtonModel({
                        id: 'filter-button',
                        label: 'Filtrar',
                        colSize: 2,
                        style: ButtonStyle.filled,
                        clickCallback: undefined,
                    }),
                    new ButtonModel({
                        id: 'cancel-button',
                        label: 'Cancelar',
                        colSize: 2,
                        style: ButtonStyle.text,
                        clickCallback: undefined,
                    }),
                ],
            });
        });
    });

    describe('showSort.', () => {
        it('should not show sort select by default.', () => {
            fixture.componentInstance.showSort.set(false);
            fixture.detectChanges();
            testForm({
                elements: [
                    new SelectModel({
                        id: 'active-select',
                        label: 'Ativos',
                        options: ActiveFilterOptions,
                        control: new FormControl({
                            value: ActiveFilter.active,
                            disabled: false,
                        }),
                        colSize: 12,
                    }),
                    new SelectModel({
                        id: 'deleted-select',
                        label: 'Deletados',
                        options: UserOrderOptions,
                        control: new FormControl({
                            value: DeletedFilter.not_deleted,
                            disabled: false,
                        }),
                        colSize: 12,
                    }),
                    new ButtonModel({
                        id: 'filter-button',
                        label: 'Filtrar',
                        colSize: 5,
                        style: ButtonStyle.filled,
                        clickCallback: undefined,
                    }),
                ],
            });
        });

        it('should not show sort select when showSort is false.', () => {
            fixture.componentInstance.showSort.set(false);
            fixture.detectChanges();
            testForm({
                elements: [
                    new SelectModel({
                        id: 'active-select',
                        label: 'Ativos',
                        options: ActiveFilterOptions,
                        control: new FormControl({
                            value: ActiveFilter.active,
                            disabled: false,
                        }),
                        colSize: 12,
                    }),
                    new SelectModel({
                        id: 'deleted-select',
                        label: 'Deletados',
                        options: UserOrderOptions,
                        control: new FormControl({
                            value: DeletedFilter.not_deleted,
                            disabled: false,
                        }),
                        colSize: 12,
                    }),
                    new ButtonModel({
                        id: 'filter-button',
                        label: 'Filtrar',
                        colSize: 5,
                        style: ButtonStyle.filled,
                        clickCallback: undefined,
                    }),
                ],
            });
        });

        it('should show sort select when showSort is true.', () => {
            fixture.componentInstance.showSort.set(true);
            fixture.detectChanges();
            testForm({
                elements: [
                    new SelectModel({
                        id: 'sort-select',
                        label: 'Ordem',
                        options: UserOrderOptions,
                        control: new FormControl({
                            value: UserOrder.name_asc,
                            disabled: false,
                        }),
                        colSize: 12,
                    }),
                    new SelectModel({
                        id: 'active-select',
                        label: 'Ativos',
                        options: ActiveFilterOptions,
                        control: new FormControl({
                            value: ActiveFilter.active,
                            disabled: false,
                        }),
                        colSize: 12,
                    }),
                    new SelectModel({
                        id: 'deleted-select',
                        label: 'Deletados',
                        options: UserOrderOptions,
                        control: new FormControl({
                            value: DeletedFilter.not_deleted,
                            disabled: false,
                        }),
                        colSize: 12,
                    }),
                    new ButtonModel({
                        id: 'filter-button',
                        label: 'Filtrar',
                        colSize: 5,
                        style: ButtonStyle.filled,
                        clickCallback: undefined,
                    }),
                ],
            });
        });
    });

    describe('showCancelButton.', () => {
        it('should not show cancel button by default.', () => {
            fixture.componentInstance.showCancelButton.set(false);
            fixture.detectChanges();
            testForm({
                elements: [
                    new SelectModel({
                        id: 'active-select',
                        label: 'Ativos',
                        options: ActiveFilterOptions,
                        control: new FormControl({
                            value: ActiveFilter.active,
                            disabled: false,
                        }),
                        colSize: 12,
                    }),
                    new SelectModel({
                        id: 'deleted-select',
                        label: 'Deletados',
                        options: UserOrderOptions,
                        control: new FormControl({
                            value: DeletedFilter.not_deleted,
                            disabled: false,
                        }),
                        colSize: 12,
                    }),
                    new ButtonModel({
                        id: 'filter-button',
                        label: 'Filtrar',
                        colSize: 5,
                        style: ButtonStyle.filled,
                        clickCallback: undefined,
                    }),
                ],
            });
        });

        it('should not show cancel button when showCancelButton is false.', () => {
            fixture.componentInstance.showCancelButton.set(false);
            fixture.detectChanges();
            testForm({
                elements: [
                    new SelectModel({
                        id: 'active-select',
                        label: 'Ativos',
                        options: ActiveFilterOptions,
                        control: new FormControl({
                            value: ActiveFilter.active,
                            disabled: false,
                        }),
                        colSize: 12,
                    }),
                    new SelectModel({
                        id: 'deleted-select',
                        label: 'Deletados',
                        options: UserOrderOptions,
                        control: new FormControl({
                            value: DeletedFilter.not_deleted,
                            disabled: false,
                        }),
                        colSize: 12,
                    }),
                    new ButtonModel({
                        id: 'filter-button',
                        label: 'Filtrar',
                        colSize: 5,
                        style: ButtonStyle.filled,
                        clickCallback: undefined,
                    }),
                ],
            });
        });

        it('should show cancel button when showCancelButton is true.', () => {
            fixture.componentInstance.showCancelButton.set(true);
            fixture.detectChanges();
            testForm({
                elements: [
                    new SelectModel({
                        id: 'active-select',
                        label: 'Ativos',
                        options: ActiveFilterOptions,
                        control: new FormControl({
                            value: ActiveFilter.active,
                            disabled: false,
                        }),
                        colSize: 12,
                    }),
                    new SelectModel({
                        id: 'deleted-select',
                        label: 'Deletados',
                        options: UserOrderOptions,
                        control: new FormControl({
                            value: DeletedFilter.not_deleted,
                            disabled: false,
                        }),
                        colSize: 12,
                    }),
                    new ButtonModel({
                        id: 'filter-button',
                        label: 'Filtrar',
                        colSize: 5,
                        style: ButtonStyle.filled,
                        clickCallback: undefined,
                    }),
                    new ButtonModel({
                        id: 'cancel-button',
                        label: 'Cancelar',
                        colSize: 5,
                        style: ButtonStyle.text,
                        clickCallback: undefined,
                    }),
                ],
            });
        });
    });
});

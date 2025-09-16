import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SelectComponent } from '../../../../components/select/select.component';
import { ActiveFilterOptions } from '../../../../constants/active-filter-options/active-filter-options';
import { DeletedFilterOptions } from '../../../../constants/deleted-filter-options/deleted-filter-options';
import { ActiveFilter } from '../../../../enums/active-filter/active-filter.enum';
import { DeletedFilter } from '../../../../enums/deleted-filter/deleted-filter.enum';
import { UserOrder } from '../../../../services/user/enums/user-order/user-order.enum';
import { UserOrderOptions } from './sort-options/user-sort.options';
import { UserFilterToolbarComponent } from './user-filter-toolbar.component';

/**
 * Test if select is avaiable on component.
 * @param fixture
 * @param id expected select html id
 * @param expectedLabel erxpected field text label
 * @param expectedOptions expected select options.
 */
function testSelectComponent(
    fixture: ComponentFixture<UserFilterToolbarComponent>,
    id: string,
    expectedValue: string,
    expectedOptions: { label: string; value: string }[],
) {
    const selectComponent = fixture.debugElement
        .queryAll(By.directive(SelectComponent))
        .find((select) => select.properties['id'] == id)!;
    expect(selectComponent)
        .withContext('Select component defined')
        .toBeDefined();
    expect(selectComponent.componentInstance.value)
        .withContext('Select component value')
        .toEqual(expectedValue);
    expect(selectComponent.componentInstance.options)
        .withContext('Select component options')
        .toEqual(expectedOptions);
}

function testHiddenSelectComponent(
    fixture: ComponentFixture<UserFilterToolbarComponent>,
    id: string,
    shouldBeVisible: boolean,
) {
    const componentElement = fixture.debugElement
        .queryAll(By.directive(SelectComponent))
        .find((select) => select.properties['id'] == id)!;
    if (shouldBeVisible) {
        expect(componentElement)
            .withContext('Select component visible')
            .toBeDefined();
    } else {
        expect(componentElement)
            .withContext('Select component not visible')
            .not.toBeDefined();
    }
}

function selectOption(
    fixture: ComponentFixture<UserFilterToolbarComponent>,
    selectId: string,
    optionValue: string,
) {
    const selectComponent = fixture.debugElement
        .queryAll(By.directive(SelectComponent))
        .find((select) => select.properties['id'] == selectId)!;

    const matSelect = selectComponent.query(By.directive(MatSelect));
    matSelect.nativeElement.click();
    fixture.detectChanges();

    const matOption = matSelect
        .queryAll(By.directive(MatOption))
        .find((option) => {
            return option.attributes['ng-reflect-value'] == optionValue;
        })!;

    matOption.nativeElement.click();
    fixture.detectChanges();
}

function clickButton(
    fixture: ComponentFixture<UserFilterToolbarComponent>,
    buttonId: string,
) {
    const button = fixture.nativeElement.querySelector(`button#${buttonId}`);
    button.click();
    fixture.detectChanges();
}

function testButton(
    fixture: ComponentFixture<UserFilterToolbarComponent>,
    buttonId: string,
    shouldShowButton: boolean,
) {
    const button = fixture.nativeElement.querySelector(`button#${buttonId}`);
    if (shouldShowButton) {
        expect(button).toBeDefined();
    } else {
        expect(button).toBeNull();
    }
}

function testDirection(
    fixture: ComponentFixture<UserFilterToolbarComponent>,
    vertical: boolean,
) {
    if (vertical) {
        const container = fixture.nativeElement.querySelector(
            `div#filters-container.vertical`,
        );
        expect(container).not.toBeNull();
    } else {
        const container = fixture.nativeElement.querySelector(
            `div#filters-container.horizontal`,
        );
        expect(container).not.toBeNull();
    }
}

describe('UserFilterToolbarComponent', () => {
    let toolbarComponent: UserFilterToolbarComponent;
    let fixture: ComponentFixture<UserFilterToolbarComponent>;

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
                SelectComponent,
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(UserFilterToolbarComponent);
        toolbarComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(toolbarComponent).toBeTruthy();
    });

    describe('filters', () => {
        it('should display the selects for sorting, active and deleted', () => {
            toolbarComponent.showSort.set(true);
            fixture.detectChanges();

            const compiled = fixture.nativeElement;
            const selects = compiled.querySelectorAll('app-select');

            expect(selects.length).toBe(3);

            expect(selects[0].id).toEqual('sort-select');
            expect(selects[1].id).toEqual('active-select');
            expect(selects[2].id).toEqual('deleted-select');
        });

        describe('order', () => {
            it('should display sort select', () => {
                toolbarComponent.showSort.set(true);
                fixture.detectChanges();
                testSelectComponent(
                    fixture,
                    'sort-select',
                    UserOrder.name_asc,
                    UserOrderOptions,
                );
            });

            it('should hide sort select', () => {
                toolbarComponent.showSort.set(false);
                fixture.detectChanges();
                testHiddenSelectComponent(fixture, 'sort-select', false);
            });

            it('should hide sort select by default', () => {
                fixture.detectChanges();
                testHiddenSelectComponent(fixture, 'sort-select', false);
            });
        });

        describe('active', () => {
            it('should display active filter', () => {
                fixture.detectChanges();
                testSelectComponent(
                    fixture,
                    'active-select',
                    ActiveFilter.active,
                    ActiveFilterOptions,
                );
            });
        });

        describe('deleted', () => {
            it('should display deleted filter', () => {
                fixture.detectChanges();
                testSelectComponent(
                    fixture,
                    'deleted-select',
                    DeletedFilter.not_deleted,
                    DeletedFilterOptions,
                );
            });
        });
    });

    describe('buttons', () => {
        describe('filter button', () => {
            it('should show filter button', () => {
                spyOn(toolbarComponent.onClose, 'emit');
                toolbarComponent.showSort.set(true);
                fixture.detectChanges();
                testButton(fixture, 'filter-button', true);
            });

            it('onClose should emit event when clicking on "Filter" button', () => {
                spyOn(toolbarComponent.onClose, 'emit');
                toolbarComponent.showSort.set(true);
                fixture.detectChanges();

                selectOption(fixture, 'sort-select', UserOrder.email_desc);
                selectOption(fixture, 'active-select', ActiveFilter.inactive);
                selectOption(fixture, 'deleted-select', DeletedFilter.deleted);

                clickButton(fixture, 'filter-button');

                expect(toolbarComponent.onClose.emit)
                    .withContext('ToolbarComponent.onClose submit event')
                    .toHaveBeenCalledWith(
                        jasmine.objectContaining({
                            order: UserOrder.email_desc,
                            active: ActiveFilter.inactive,
                            deleted: DeletedFilter.deleted,
                        }),
                    );
            });
        });

        describe('cancel button', () => {
            it('should show cancel button', () => {
                spyOn(toolbarComponent.onClose, 'emit');
                toolbarComponent.showCancelButton.set(true);
                fixture.detectChanges();
                testButton(fixture, 'cancel-button', true);
            });

            it('should hide cancel button by default', () => {
                spyOn(toolbarComponent.onClose, 'emit');
                fixture.detectChanges();
                testButton(fixture, 'cancel-button', false);
            });

            it('should hide cancel button', () => {
                spyOn(toolbarComponent.onClose, 'emit');
                toolbarComponent.showCancelButton.set(false);
                fixture.detectChanges();
                testButton(fixture, 'cancel-button', false);
            });

            it('onClose should emit false when clicking the "Cancel" button', () => {
                spyOn(toolbarComponent.onClose, 'emit');
                toolbarComponent.showSort.set(true);
                toolbarComponent.showCancelButton.set(true);
                fixture.detectChanges();

                selectOption(fixture, 'sort-select', UserOrder.email_desc);
                selectOption(fixture, 'active-select', ActiveFilter.inactive);
                selectOption(fixture, 'deleted-select', DeletedFilter.deleted);

                clickButton(fixture, 'cancel-button');

                expect(toolbarComponent.onClose.emit)
                    .withContext('ToolbarComponent.onClose cancel event')
                    .toHaveBeenCalledWith(false);
            });
        });
    });

    describe('layout', () => {
        it('should be vertical', () => {
            toolbarComponent.vertical.set(true);
            fixture.detectChanges();
            testDirection(fixture, true);
        });

        it('should be vertical by default', () => {
            fixture.detectChanges();
            testDirection(fixture, true);
        });

        it('should be horizontal', () => {
            toolbarComponent.vertical.set(true);
            fixture.detectChanges();
            testDirection(fixture, true);
        });
    });
});

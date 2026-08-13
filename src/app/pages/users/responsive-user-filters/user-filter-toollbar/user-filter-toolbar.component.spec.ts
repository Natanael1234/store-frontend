import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@components/form/components/button/button.component';
import { ButtonAppearance } from '@components/form/components/button/enum/appearance/button-appearance.enum';
import { SelectFieldComponent } from '@components/form/components/select/select-field.component';
import { FormElementType } from '@components/form/enums/form-element-type/form-element-type.enum';
import { ActiveFilterOptions } from '@constants/active-filter-options/active-filter-options';
import { DeletedFilterOptions } from '@constants/deleted-filter-options/deleted-filter-options';
import { ActiveFilter } from '@enums/active-filter/active-filter.enum';
import { DeletedFilter } from '@enums/deleted-filter/deleted-filter.enum';
import { UserOrderOptions } from '@pages/users/responsive-user-filters/user-filter-toollbar/order-options/user-order.options';
import { UserFilterToolbarComponent } from '@pages/users/responsive-user-filters/user-filter-toollbar/user-filter-toolbar.component';
import { UserFilterToolbarHarness } from '@pages/users/responsive-user-filters/user-filter-toollbar/user-filter-toolbar.harness';
import { UserOrder } from '@services/user/enums/user-order/user-order.enum';

describe('UserFilterToolbarComponent.', () => {
    let toolbarComponent: UserFilterToolbarComponent;
    let fixture: ComponentFixture<UserFilterToolbarComponent>;

    let harness: UserFilterToolbarHarness;

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
            providers: [provideRouter([])],
        }).compileComponents();
        fixture = TestBed.createComponent(UserFilterToolbarComponent);
        toolbarComponent = fixture.componentInstance;
        fixture.detectChanges();

        harness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            UserFilterToolbarHarness,
        );
    });

    function getSelectFieldComponents() {
        return fixture.debugElement
            .queryAll(By.directive(SelectFieldComponent))
            .map(
                (debugEl) => debugEl.componentInstance as SelectFieldComponent,
            );
    }

    function getButtonComponents() {
        return fixture.debugElement
            .queryAll(By.directive(ButtonComponent))
            .map((debugEl) => debugEl.componentInstance as ButtonComponent);
    }

    it('should create the component.', async () => {
        expect(toolbarComponent)
            .withContext('component is defined')
            .toBeTruthy();

        const state = await harness.getState();
        expect(state).toEqual({
            hasValidStructure: true,
            children: [
                { col: 12, childTagName: 'APP-SELECT-FIELD' },
                { col: 12, childTagName: 'APP-SELECT-FIELD' },
                { col: 6, childTagName: 'APP-BUTTON' },
            ],
        });

        const selects = await getSelectFieldComponents();
        expect(selects).toHaveSize(2);

        expect(selects[0].id()).toEqual('active-select');
        expect(selects[0].label()).toEqual('Ativos');
        expect(selects[0].autofocus()).toBeUndefined();
        expect(selects[0].control()).toBeDefined();
        expect(selects[0].control()).not.toBeNull();
        expect(selects[0].control()?.value).toEqual(ActiveFilter.active);
        expect(selects[0].options()).toEqual(ActiveFilterOptions);

        expect(selects[1].id()).toEqual('deleted-select');
        expect(selects[1].label()).toEqual('Deletados');
        expect(selects[1].autofocus()).toBeUndefined();
        expect(selects[1].control()).toBeDefined();
        expect(selects[1].control()).not.toBeNull();
        expect(selects[1].control()?.value).toEqual(DeletedFilter.not_deleted);
        expect(selects[1].options()).toEqual(DeletedFilterOptions);

        const buttons = await getButtonComponents();
        expect(buttons).toHaveSize(1);

        expect(buttons[0].id()).toEqual('filter-button');
        expect(buttons[0].label()).toEqual('Filtrar');
        expect(buttons[0].icon()).toBeUndefined();
        expect(buttons[0].appearance()).toEqual(ButtonAppearance.filled);
        expect(buttons[0].autofocus()).toBeUndefined();
        expect(buttons[0].focusable()).toBeUndefined();
        expect(buttons[0].disabled()).toBeUndefined();
        expect(buttons[0].queryParams()).toBeUndefined();
        expect(buttons[0].queryParamsHandling()).toBeUndefined();
        expect(buttons[0].routerLink()).toBeUndefined();
        expect(buttons[0].type()).toEqual(FormElementType.button);
        expect(buttons[0].onClick).toBeDefined();
        expect(buttons[0].onClick).not.toBeNull();
    });

    describe('vertical.', () => {
        it('should show vertical layout by default.', async () => {
            fixture.componentInstance.showOrder.set(true);
            fixture.componentInstance.showCancelButton.set(true);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                hasValidStructure: true,
                children: [
                    { col: 12, childTagName: 'APP-SELECT-FIELD' },
                    { col: 12, childTagName: 'APP-SELECT-FIELD' },
                    { col: 12, childTagName: 'APP-SELECT-FIELD' },
                    { col: 6, childTagName: 'APP-BUTTON' },
                    { col: 6, childTagName: 'APP-BUTTON' },
                ],
            });

            const selects = await getSelectFieldComponents();
            expect(selects).toHaveSize(3);

            expect(selects[0].id()).toEqual('order-select');
            expect(selects[0].label()).toEqual('Ordem');
            expect(selects[0].autofocus()).toBeUndefined();
            expect(selects[0].control()).toBeDefined();
            expect(selects[0].control()).not.toBeNull();
            expect(selects[0].control()?.value).toEqual(UserOrder.name_asc);
            expect(selects[0].options()).toEqual(UserOrderOptions);

            expect(selects[1].id()).toEqual('active-select');
            expect(selects[1].label()).toEqual('Ativos');
            expect(selects[1].autofocus()).toBeUndefined();
            expect(selects[1].control()).toBeDefined();
            expect(selects[1].control()).not.toBeNull();
            expect(selects[1].control()?.value).toEqual(ActiveFilter.active);
            expect(selects[1].options()).toEqual(ActiveFilterOptions);

            expect(selects[2].id()).toEqual('deleted-select');
            expect(selects[2].label()).toEqual('Deletados');
            expect(selects[2].autofocus()).toBeUndefined();
            expect(selects[2].control()).toBeDefined();
            expect(selects[2].control()).not.toBeNull();
            expect(selects[2].control()?.value).toEqual(
                DeletedFilter.not_deleted,
            );
            expect(selects[2].options()).toEqual(DeletedFilterOptions);

            const buttons = await getButtonComponents();
            expect(buttons).toHaveSize(2);

            expect(buttons[0].id()).toEqual('cancel-button');
            expect(buttons[0].label()).toEqual('Cancelar');
            expect(buttons[0].icon()).toBeUndefined();
            expect(buttons[0].appearance()).toEqual(ButtonAppearance.text);
            expect(buttons[0].autofocus()).toBeUndefined();
            expect(buttons[0].focusable()).toBeUndefined();
            expect(buttons[0].disabled()).toBeUndefined();
            expect(buttons[0].queryParams()).toBeUndefined();
            expect(buttons[0].queryParamsHandling()).toBeUndefined();
            expect(buttons[0].routerLink()).toBeUndefined();
            expect(buttons[0].type()).toEqual(FormElementType.button);
            expect(buttons[0].onClick).toBeDefined();
            expect(buttons[0].onClick).not.toBeNull();

            expect(buttons[1].id()).toEqual('filter-button');
            expect(buttons[1].label()).toEqual('Filtrar');
            expect(buttons[1].icon()).toBeUndefined();
            expect(buttons[1].appearance()).toEqual(ButtonAppearance.filled);
            expect(buttons[1].autofocus()).toBeUndefined();
            expect(buttons[1].focusable()).toBeUndefined();
            expect(buttons[1].disabled()).toBeUndefined();
            expect(buttons[1].queryParams()).toBeUndefined();
            expect(buttons[1].queryParamsHandling()).toBeUndefined();
            expect(buttons[1].routerLink()).toBeUndefined();
            expect(buttons[1].type()).toEqual(FormElementType.button);
            expect(buttons[1].onClick).toBeDefined();
            expect(buttons[1].onClick).not.toBeNull();
        });

        it('should show vertical layout when vertical is true.', async () => {
            fixture.componentInstance.vertical.set(true);
            fixture.componentInstance.showOrder.set(true);
            fixture.componentInstance.showCancelButton.set(true);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                hasValidStructure: true,
                children: [
                    { col: 12, childTagName: 'APP-SELECT-FIELD' },
                    { col: 12, childTagName: 'APP-SELECT-FIELD' },
                    { col: 12, childTagName: 'APP-SELECT-FIELD' },
                    { col: 6, childTagName: 'APP-BUTTON' },
                    { col: 6, childTagName: 'APP-BUTTON' },
                ],
            });

            const selects = await getSelectFieldComponents();
            expect(selects).toHaveSize(3);

            expect(selects[0].id()).toEqual('order-select');
            expect(selects[0].label()).toEqual('Ordem');
            expect(selects[0].autofocus()).toBeUndefined();
            expect(selects[0].control()).toBeDefined();
            expect(selects[0].control()).not.toBeNull();
            expect(selects[0].control()?.value).toEqual(UserOrder.name_asc);
            expect(selects[0].options()).toEqual(UserOrderOptions);

            expect(selects[1].id()).toEqual('active-select');
            expect(selects[1].label()).toEqual('Ativos');
            expect(selects[1].autofocus()).toBeUndefined();
            expect(selects[1].control()).toBeDefined();
            expect(selects[1].control()).not.toBeNull();
            expect(selects[1].control()?.value).toEqual(ActiveFilter.active);
            expect(selects[1].options()).toEqual(ActiveFilterOptions);

            expect(selects[2].id()).toEqual('deleted-select');
            expect(selects[2].label()).toEqual('Deletados');
            expect(selects[2].autofocus()).toBeUndefined();
            expect(selects[2].control()).toBeDefined();
            expect(selects[2].control()).not.toBeNull();
            expect(selects[2].control()?.value).toEqual(
                DeletedFilter.not_deleted,
            );
            expect(selects[2].options()).toEqual(DeletedFilterOptions);

            const buttons = await getButtonComponents();
            expect(buttons).toHaveSize(2);

            expect(buttons[0].id()).toEqual('cancel-button');
            expect(buttons[0].label()).toEqual('Cancelar');
            expect(buttons[0].icon()).toBeUndefined();
            expect(buttons[0].appearance()).toEqual(ButtonAppearance.text);
            expect(buttons[0].autofocus()).toBeUndefined();
            expect(buttons[0].focusable()).toBeUndefined();
            expect(buttons[0].disabled()).toBeUndefined();
            expect(buttons[0].queryParams()).toBeUndefined();
            expect(buttons[0].queryParamsHandling()).toBeUndefined();
            expect(buttons[0].routerLink()).toBeUndefined();
            expect(buttons[0].type()).toEqual(FormElementType.button);
            expect(buttons[0].onClick).toBeDefined();
            expect(buttons[0].onClick).not.toBeNull();

            expect(buttons[1].id()).toEqual('filter-button');
            expect(buttons[1].label()).toEqual('Filtrar');
            expect(buttons[1].icon()).toBeUndefined();
            expect(buttons[1].appearance()).toEqual(ButtonAppearance.filled);
            expect(buttons[1].autofocus()).toBeUndefined();
            expect(buttons[1].focusable()).toBeUndefined();
            expect(buttons[1].disabled()).toBeUndefined();
            expect(buttons[1].queryParams()).toBeUndefined();
            expect(buttons[1].queryParamsHandling()).toBeUndefined();
            expect(buttons[1].routerLink()).toBeUndefined();
            expect(buttons[1].type()).toEqual(FormElementType.button);
            expect(buttons[1].onClick).toBeDefined();
            expect(buttons[1].onClick).not.toBeNull();
        });

        it('should show horizontal layout when vertical is false.', async () => {
            fixture.componentInstance.vertical.set(false);
            fixture.componentInstance.showOrder.set(true);
            fixture.componentInstance.showCancelButton.set(true);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                hasValidStructure: true,
                children: [
                    { col: 2, childTagName: 'APP-SELECT-FIELD' },
                    { col: 2, childTagName: 'APP-SELECT-FIELD' },
                    { col: 2, childTagName: 'APP-SELECT-FIELD' },
                    { col: 2, childTagName: 'APP-BUTTON' },
                    { col: 2, childTagName: 'APP-BUTTON' },
                ],
            });

            const selects = await getSelectFieldComponents();
            expect(selects).toHaveSize(3);

            expect(selects[0].id()).toEqual('order-select');
            expect(selects[0].label()).toEqual('Ordem');
            expect(selects[0].autofocus()).toBeUndefined();
            expect(selects[0].control()).toBeDefined();
            expect(selects[0].control()).not.toBeNull();
            expect(selects[0].control()?.value).toEqual(UserOrder.name_asc);
            expect(selects[0].options()).toEqual(UserOrderOptions);

            expect(selects[1].id()).toEqual('active-select');
            expect(selects[1].label()).toEqual('Ativos');
            expect(selects[1].autofocus()).toBeUndefined();
            expect(selects[1].control()).toBeDefined();
            expect(selects[1].control()).not.toBeNull();
            expect(selects[1].control()?.value).toEqual(ActiveFilter.active);
            expect(selects[1].options()).toEqual(ActiveFilterOptions);

            expect(selects[2].id()).toEqual('deleted-select');
            expect(selects[2].label()).toEqual('Deletados');
            expect(selects[2].autofocus()).toBeUndefined();
            expect(selects[2].control()).toBeDefined();
            expect(selects[2].control()).not.toBeNull();
            expect(selects[2].control()?.value).toEqual(
                DeletedFilter.not_deleted,
            );
            expect(selects[2].options()).toEqual(DeletedFilterOptions);

            const buttons = await getButtonComponents();
            expect(buttons).toHaveSize(2);

            expect(buttons[0].id()).toEqual('cancel-button');
            expect(buttons[0].label()).toEqual('Cancelar');
            expect(buttons[0].icon()).toBeUndefined();
            expect(buttons[0].appearance()).toEqual(ButtonAppearance.text);
            expect(buttons[0].autofocus()).toBeUndefined();
            expect(buttons[0].focusable()).toBeUndefined();
            expect(buttons[0].disabled()).toBeUndefined();
            expect(buttons[0].queryParams()).toBeUndefined();
            expect(buttons[0].queryParamsHandling()).toBeUndefined();
            expect(buttons[0].routerLink()).toBeUndefined();
            expect(buttons[0].type()).toEqual(FormElementType.button);
            expect(buttons[0].onClick).toBeDefined();
            expect(buttons[0].onClick).not.toBeNull();

            expect(buttons[1].id()).toEqual('filter-button');
            expect(buttons[1].label()).toEqual('Filtrar');
            expect(buttons[1].icon()).toBeUndefined();
            expect(buttons[1].appearance()).toEqual(ButtonAppearance.filled);
            expect(buttons[1].autofocus()).toBeUndefined();
            expect(buttons[1].focusable()).toBeUndefined();
            expect(buttons[1].disabled()).toBeUndefined();
            expect(buttons[1].queryParams()).toBeUndefined();
            expect(buttons[1].queryParamsHandling()).toBeUndefined();
            expect(buttons[1].routerLink()).toBeUndefined();
            expect(buttons[1].type()).toEqual(FormElementType.button);
            expect(buttons[1].onClick).toBeDefined();
            expect(buttons[1].onClick).not.toBeNull();
        });
    });

    describe('showOrder.', () => {
        it('should not show order select by default.', async () => {
            fixture.componentInstance.showOrder.set(false);
            fixture.detectChanges();

            const state = await harness.getState();

            expect(state).toEqual({
                hasValidStructure: true,
                children: [
                    { col: 12, childTagName: 'APP-SELECT-FIELD' },
                    { col: 12, childTagName: 'APP-SELECT-FIELD' },
                    { col: 6, childTagName: 'APP-BUTTON' },
                ],
            });

            const selects = await getSelectFieldComponents();
            expect(selects).toHaveSize(2);

            expect(selects[0].id()).toEqual('active-select');
            expect(selects[0].label()).toEqual('Ativos');
            expect(selects[0].autofocus()).toBeUndefined();
            expect(selects[0].control()).toBeDefined();
            expect(selects[0].control()).not.toBeNull();
            expect(selects[0].control()?.value).toEqual(ActiveFilter.active);
            expect(selects[0].options()).toEqual(ActiveFilterOptions);

            expect(selects[1].id()).toEqual('deleted-select');
            expect(selects[1].label()).toEqual('Deletados');
            expect(selects[1].autofocus()).toBeUndefined();
            expect(selects[1].control()).toBeDefined();
            expect(selects[1].control()).not.toBeNull();
            expect(selects[1].control()?.value).toEqual(
                DeletedFilter.not_deleted,
            );
            expect(selects[1].options()).toEqual(DeletedFilterOptions);

            const buttons = await getButtonComponents();
            expect(buttons).toHaveSize(1);

            expect(buttons[0].id()).toEqual('filter-button');
            expect(buttons[0].label()).toEqual('Filtrar');
            expect(buttons[0].icon()).toBeUndefined();
            expect(buttons[0].appearance()).toEqual(ButtonAppearance.filled);
            expect(buttons[0].autofocus()).toBeUndefined();
            expect(buttons[0].focusable()).toBeUndefined();
            expect(buttons[0].disabled()).toBeUndefined();
            expect(buttons[0].queryParams()).toBeUndefined();
            expect(buttons[0].queryParamsHandling()).toBeUndefined();
            expect(buttons[0].routerLink()).toBeUndefined();
            expect(buttons[0].type()).toEqual(FormElementType.button);
            expect(buttons[0].onClick).toBeDefined();
            expect(buttons[0].onClick).not.toBeNull();
        });

        it('should not show order select when showOrder is false.', async () => {
            fixture.componentInstance.showOrder.set(false);
            fixture.detectChanges();

            const state = await harness.getState();

            expect(state).toEqual({
                hasValidStructure: true,
                children: [
                    { col: 12, childTagName: 'APP-SELECT-FIELD' },
                    { col: 12, childTagName: 'APP-SELECT-FIELD' },
                    { col: 6, childTagName: 'APP-BUTTON' },
                ],
            });

            const selects = await getSelectFieldComponents();
            expect(selects).toHaveSize(2);

            expect(selects[0].id()).toEqual('active-select');
            expect(selects[0].label()).toEqual('Ativos');
            expect(selects[0].autofocus()).toBeUndefined();
            expect(selects[0].control()).toBeDefined();
            expect(selects[0].control()).not.toBeNull();
            expect(selects[0].control()?.value).toEqual(ActiveFilter.active);
            expect(selects[0].options()).toEqual(ActiveFilterOptions);

            expect(selects[1].id()).toEqual('deleted-select');
            expect(selects[1].label()).toEqual('Deletados');
            expect(selects[1].autofocus()).toBeUndefined();
            expect(selects[1].control()).toBeDefined();
            expect(selects[1].control()).not.toBeNull();
            expect(selects[1].control()?.value).toEqual(
                DeletedFilter.not_deleted,
            );
            expect(selects[1].options()).toEqual(DeletedFilterOptions);

            const buttons = await getButtonComponents();
            expect(buttons).toHaveSize(1);

            expect(buttons[0].id()).toEqual('filter-button');
            expect(buttons[0].label()).toEqual('Filtrar');
            expect(buttons[0].icon()).toBeUndefined();
            expect(buttons[0].appearance()).toEqual(ButtonAppearance.filled);
            expect(buttons[0].autofocus()).toBeUndefined();
            expect(buttons[0].focusable()).toBeUndefined();
            expect(buttons[0].disabled()).toBeUndefined();
            expect(buttons[0].queryParams()).toBeUndefined();
            expect(buttons[0].queryParamsHandling()).toBeUndefined();
            expect(buttons[0].routerLink()).toBeUndefined();
            expect(buttons[0].type()).toEqual(FormElementType.button);
            expect(buttons[0].onClick).toBeDefined();
            expect(buttons[0].onClick).not.toBeNull();
        });

        it('should show order select when showOrder is true.', async () => {
            fixture.componentInstance.showOrder.set(true);
            fixture.detectChanges();

            const state = await harness.getState();

            expect(state).toEqual({
                hasValidStructure: true,
                children: [
                    { col: 12, childTagName: 'APP-SELECT-FIELD' },
                    { col: 12, childTagName: 'APP-SELECT-FIELD' },
                    { col: 12, childTagName: 'APP-SELECT-FIELD' },
                    { col: 6, childTagName: 'APP-BUTTON' },
                ],
            });

            const selects = await getSelectFieldComponents();
            expect(selects).toHaveSize(3);

            expect(selects[0].id()).toEqual('order-select');
            expect(selects[0].label()).toEqual('Ordem');
            expect(selects[0].autofocus()).toBeUndefined();
            expect(selects[0].control()).toBeDefined();
            expect(selects[0].control()).not.toBeNull();
            expect(selects[0].control()?.value).toEqual(UserOrder.name_asc);
            expect(selects[0].options()).toEqual(UserOrderOptions);

            expect(selects[1].id()).toEqual('active-select');
            expect(selects[1].label()).toEqual('Ativos');
            expect(selects[1].autofocus()).toBeUndefined();
            expect(selects[1].control()).toBeDefined();
            expect(selects[1].control()).not.toBeNull();
            expect(selects[1].control()?.value).toEqual(ActiveFilter.active);
            expect(selects[1].options()).toEqual(ActiveFilterOptions);

            expect(selects[2].id()).toEqual('deleted-select');
            expect(selects[2].label()).toEqual('Deletados');
            expect(selects[2].autofocus()).toBeUndefined();
            expect(selects[2].control()).toBeDefined();
            expect(selects[2].control()).not.toBeNull();
            expect(selects[2].control()?.value).toEqual(
                DeletedFilter.not_deleted,
            );
            expect(selects[2].options()).toEqual(DeletedFilterOptions);

            const buttons = await getButtonComponents();
            expect(buttons).toHaveSize(1);

            expect(buttons[0].id()).toEqual('filter-button');
            expect(buttons[0].label()).toEqual('Filtrar');
            expect(buttons[0].icon()).toBeUndefined();
            expect(buttons[0].appearance()).toEqual(ButtonAppearance.filled);
            expect(buttons[0].autofocus()).toBeUndefined();
            expect(buttons[0].focusable()).toBeUndefined();
            expect(buttons[0].disabled()).toBeUndefined();
            expect(buttons[0].queryParams()).toBeUndefined();
            expect(buttons[0].queryParamsHandling()).toBeUndefined();
            expect(buttons[0].routerLink()).toBeUndefined();
            expect(buttons[0].type()).toEqual(FormElementType.button);
            expect(buttons[0].onClick).toBeDefined();
            expect(buttons[0].onClick).not.toBeNull();
        });
    });

    describe('showCancelButton.', () => {
        it('should not show cancel button by default.', async () => {
            fixture.componentInstance.showCancelButton.set(false);
            fixture.detectChanges();

            const state = await harness.getState();

            expect(state).toEqual({
                hasValidStructure: true,
                children: [
                    { col: 12, childTagName: 'APP-SELECT-FIELD' },
                    { col: 12, childTagName: 'APP-SELECT-FIELD' },
                    { col: 6, childTagName: 'APP-BUTTON' },
                ],
            });

            const selects = await getSelectFieldComponents();
            expect(selects).toHaveSize(2);

            expect(selects[0].id()).toEqual('active-select');
            expect(selects[0].label()).toEqual('Ativos');
            expect(selects[0].autofocus()).toBeUndefined();
            expect(selects[0].control()).toBeDefined();
            expect(selects[0].control()).not.toBeNull();
            expect(selects[0].control()?.value).toEqual(ActiveFilter.active);
            expect(selects[0].options()).toEqual(ActiveFilterOptions);

            expect(selects[1].id()).toEqual('deleted-select');
            expect(selects[1].label()).toEqual('Deletados');
            expect(selects[1].autofocus()).toBeUndefined();
            expect(selects[1].control()).toBeDefined();
            expect(selects[1].control()).not.toBeNull();
            expect(selects[1].control()?.value).toEqual(
                DeletedFilter.not_deleted,
            );
            expect(selects[1].options()).toEqual(DeletedFilterOptions);

            const buttons = await getButtonComponents();
            expect(buttons).toHaveSize(1);

            expect(buttons[0].id()).toEqual('filter-button');
            expect(buttons[0].label()).toEqual('Filtrar');
            expect(buttons[0].icon()).toBeUndefined();
            expect(buttons[0].appearance()).toEqual(ButtonAppearance.filled);
            expect(buttons[0].autofocus()).toBeUndefined();
            expect(buttons[0].focusable()).toBeUndefined();
            expect(buttons[0].disabled()).toBeUndefined();
            expect(buttons[0].queryParams()).toBeUndefined();
            expect(buttons[0].queryParamsHandling()).toBeUndefined();
            expect(buttons[0].routerLink()).toBeUndefined();
            expect(buttons[0].type()).toEqual(FormElementType.button);
            expect(buttons[0].onClick).toBeDefined();
            expect(buttons[0].onClick).not.toBeNull();
        });

        it('should not show cancel button when showCancelButton is false.', async () => {
            fixture.componentInstance.showCancelButton.set(false);
            fixture.detectChanges();

            const state = await harness.getState();

            expect(state).toEqual({
                hasValidStructure: true,
                children: [
                    { col: 12, childTagName: 'APP-SELECT-FIELD' },
                    { col: 12, childTagName: 'APP-SELECT-FIELD' },
                    { col: 6, childTagName: 'APP-BUTTON' },
                ],
            });

            const selects = await getSelectFieldComponents();
            expect(selects).toHaveSize(2);

            expect(selects[0].id()).toEqual('active-select');
            expect(selects[0].label()).toEqual('Ativos');
            expect(selects[0].autofocus()).toBeUndefined();
            expect(selects[0].control()).toBeDefined();
            expect(selects[0].control()).not.toBeNull();
            expect(selects[0].control()?.value).toEqual(ActiveFilter.active);
            expect(selects[0].options()).toEqual(ActiveFilterOptions);

            expect(selects[1].id()).toEqual('deleted-select');
            expect(selects[1].label()).toEqual('Deletados');
            expect(selects[1].autofocus()).toBeUndefined();
            expect(selects[1].control()).toBeDefined();
            expect(selects[1].control()).not.toBeNull();
            expect(selects[1].control()?.value).toEqual(
                DeletedFilter.not_deleted,
            );
            expect(selects[1].options()).toEqual(DeletedFilterOptions);

            const buttons = await getButtonComponents();
            expect(buttons).toHaveSize(1);

            expect(buttons[0].id()).toEqual('filter-button');
            expect(buttons[0].label()).toEqual('Filtrar');
            expect(buttons[0].icon()).toBeUndefined();
            expect(buttons[0].appearance()).toEqual(ButtonAppearance.filled);
            expect(buttons[0].autofocus()).toBeUndefined();
            expect(buttons[0].focusable()).toBeUndefined();
            expect(buttons[0].disabled()).toBeUndefined();
            expect(buttons[0].queryParams()).toBeUndefined();
            expect(buttons[0].queryParamsHandling()).toBeUndefined();
            expect(buttons[0].routerLink()).toBeUndefined();
            expect(buttons[0].type()).toEqual(FormElementType.button);
            expect(buttons[0].onClick).toBeDefined();
            expect(buttons[0].onClick).not.toBeNull();
        });

        it('should show cancel button when showCancelButton is true.', async () => {
            fixture.componentInstance.showCancelButton.set(true);
            fixture.detectChanges();

            const state = await harness.getState();

            expect(state).toEqual({
                hasValidStructure: true,
                children: [
                    { col: 12, childTagName: 'APP-SELECT-FIELD' },
                    { col: 12, childTagName: 'APP-SELECT-FIELD' },
                    { col: 6, childTagName: 'APP-BUTTON' },
                    { col: 6, childTagName: 'APP-BUTTON' },
                ],
            });

            const selects = await getSelectFieldComponents();
            expect(selects).toHaveSize(2);

            expect(selects[0].id()).toEqual('active-select');
            expect(selects[0].label()).toEqual('Ativos');
            expect(selects[0].autofocus()).toBeUndefined();
            expect(selects[0].control()).toBeDefined();
            expect(selects[0].control()).not.toBeNull();
            expect(selects[0].control()?.value).toEqual(ActiveFilter.active);
            expect(selects[0].options()).toEqual(ActiveFilterOptions);

            expect(selects[1].id()).toEqual('deleted-select');
            expect(selects[1].label()).toEqual('Deletados');
            expect(selects[1].autofocus()).toBeUndefined();
            expect(selects[1].control()).toBeDefined();
            expect(selects[1].control()).not.toBeNull();
            expect(selects[1].control()?.value).toEqual(
                DeletedFilter.not_deleted,
            );
            expect(selects[1].options()).toEqual(DeletedFilterOptions);

            const buttons = await getButtonComponents();
            expect(buttons).toHaveSize(2);

            expect(buttons[0].id()).toEqual('cancel-button');
            expect(buttons[0].label()).toEqual('Cancelar');
            expect(buttons[0].icon()).toBeUndefined();
            expect(buttons[0].appearance()).toEqual(ButtonAppearance.text);
            expect(buttons[0].autofocus()).toBeUndefined();
            expect(buttons[0].focusable()).toBeUndefined();
            expect(buttons[0].disabled()).toBeUndefined();
            expect(buttons[0].queryParams()).toBeUndefined();
            expect(buttons[0].queryParamsHandling()).toBeUndefined();
            expect(buttons[0].routerLink()).toBeUndefined();
            expect(buttons[0].type()).toEqual(FormElementType.button);
            expect(buttons[0].onClick).toBeDefined();
            expect(buttons[0].onClick).not.toBeNull();

            expect(buttons[1].id()).toEqual('filter-button');
            expect(buttons[1].label()).toEqual('Filtrar');
            expect(buttons[1].icon()).toBeUndefined();
            expect(buttons[1].appearance()).toEqual(ButtonAppearance.filled);
            expect(buttons[1].autofocus()).toBeUndefined();
            expect(buttons[1].focusable()).toBeUndefined();
            expect(buttons[1].disabled()).toBeUndefined();
            expect(buttons[1].queryParams()).toBeUndefined();
            expect(buttons[1].queryParamsHandling()).toBeUndefined();
            expect(buttons[1].routerLink()).toBeUndefined();
            expect(buttons[1].type()).toEqual(FormElementType.button);
            expect(buttons[1].onClick).toBeDefined();
            expect(buttons[1].onClick).not.toBeNull();
        });
    });

    describe('events.', () => {
        beforeEach(async () => {
            fixture.componentInstance.showOrder.set(true);
            fixture.componentInstance.showCancelButton.set(true);
            fixture.detectChanges();
            const [orderSelect, activeSelect, deledtedSelect] =
                await fixture.debugElement.queryAll(
                    By.directive(SelectFieldComponent),
                );
        });

        it('should fire on close event when click on filter button.', async () => {
            fixture.componentInstance.showOrder.set(true);
            fixture.componentInstance.showCancelButton.set(true);
            spyOn(toolbarComponent.onClose, 'emit');
            await harness.selectOrderOption('Não deletados');
            await harness.selectActiveOption('Todos');
            await harness.selectDeletedOption('Todos');
            await harness.fireFilterButtonClick();

            expect(toolbarComponent.onClose.emit).toHaveBeenCalledOnceWith({
                order: UserOrder.deleted_desc,
                active: ActiveFilter.all,
                deleted: DeletedFilter.all,
            });

            const selects = await getSelectFieldComponents();
            expect(selects).toHaveSize(3);

            expect(selects[0].id()).toEqual('order-select');
            expect(selects[0].label()).toEqual('Ordem');
            expect(selects[0].autofocus()).toBeUndefined();
            expect(selects[0].control()).toBeDefined();
            expect(selects[0].control()).not.toBeNull();
            expect(selects[0].control()?.value).toEqual(UserOrder.deleted_desc);
            expect(selects[0].options()).toEqual(UserOrderOptions);

            expect(selects[1].id()).toEqual('active-select');
            expect(selects[1].label()).toEqual('Ativos');
            expect(selects[1].autofocus()).toBeUndefined();
            expect(selects[1].control()).toBeDefined();
            expect(selects[1].control()).not.toBeNull();
            expect(selects[1].control()?.value).toEqual(ActiveFilter.all);
            expect(selects[1].options()).toEqual(ActiveFilterOptions);

            expect(selects[2].id()).toEqual('deleted-select');
            expect(selects[2].label()).toEqual('Deletados');
            expect(selects[2].autofocus()).toBeUndefined();
            expect(selects[2].control()).toBeDefined();
            expect(selects[2].control()).not.toBeNull();
            expect(selects[2].control()?.value).toEqual(DeletedFilter.all);
            expect(selects[2].options()).toEqual(DeletedFilterOptions);

            const buttons = await getButtonComponents();
            expect(buttons).toHaveSize(2);

            expect(buttons[0].id()).toEqual('cancel-button');
            expect(buttons[0].label()).toEqual('Cancelar');
            expect(buttons[0].icon()).toBeUndefined();
            expect(buttons[0].appearance()).toEqual(ButtonAppearance.text);
            expect(buttons[0].autofocus()).toBeUndefined();
            expect(buttons[0].focusable()).toBeUndefined();
            expect(buttons[0].disabled()).toBeUndefined();
            expect(buttons[0].queryParams()).toBeUndefined();
            expect(buttons[0].queryParamsHandling()).toBeUndefined();
            expect(buttons[0].routerLink()).toBeUndefined();
            expect(buttons[0].type()).toEqual(FormElementType.button);
            expect(buttons[0].onClick).toBeDefined();
            expect(buttons[0].onClick).not.toBeNull();

            expect(buttons[1].id()).toEqual('filter-button');
            expect(buttons[1].label()).toEqual('Filtrar');
            expect(buttons[1].icon()).toBeUndefined();
            expect(buttons[1].appearance()).toEqual(ButtonAppearance.filled);
            expect(buttons[1].autofocus()).toBeUndefined();
            expect(buttons[1].focusable()).toBeUndefined();
            expect(buttons[1].disabled()).toBeUndefined();
            expect(buttons[1].queryParams()).toBeUndefined();
            expect(buttons[1].queryParamsHandling()).toBeUndefined();
            expect(buttons[1].routerLink()).toBeUndefined();
            expect(buttons[1].type()).toEqual(FormElementType.button);
            expect(buttons[1].onClick).toBeDefined();
            expect(buttons[1].onClick).not.toBeNull();
        });

        it('should fire on close event when click on cancel button.', async () => {
            fixture.componentInstance.showOrder.set(true);
            fixture.componentInstance.showCancelButton.set(true);
            spyOn(toolbarComponent.onClose, 'emit');
            await harness.selectOrderOption('Não deletados');
            await harness.selectActiveOption('Todos');
            await harness.selectDeletedOption('Todos');
            await harness.fireCancelButtonClick();

            expect(toolbarComponent.onClose.emit).toHaveBeenCalledOnceWith(
                false,
            );

            const selects = await getSelectFieldComponents();
            expect(selects).toHaveSize(3);

            expect(selects[0].id()).toEqual('order-select');
            expect(selects[0].label()).toEqual('Ordem');
            expect(selects[0].autofocus()).toBeUndefined();
            expect(selects[0].control()).toBeDefined();
            expect(selects[0].control()).not.toBeNull();
            expect(selects[0].control()?.value).toEqual(UserOrder.name_asc);
            expect(selects[0].options()).toEqual(UserOrderOptions);

            expect(selects[1].id()).toEqual('active-select');
            expect(selects[1].label()).toEqual('Ativos');
            expect(selects[1].autofocus()).toBeUndefined();
            expect(selects[1].control()).toBeDefined();
            expect(selects[1].control()).not.toBeNull();
            expect(selects[1].control()?.value).toEqual(ActiveFilter.active);
            expect(selects[1].options()).toEqual(ActiveFilterOptions);

            expect(selects[2].id()).toEqual('deleted-select');
            expect(selects[2].label()).toEqual('Deletados');
            expect(selects[2].autofocus()).toBeUndefined();
            expect(selects[2].control()).toBeDefined();
            expect(selects[2].control()).not.toBeNull();
            expect(selects[2].control()?.value).toEqual(
                DeletedFilter.not_deleted,
            );
            expect(selects[2].options()).toEqual(DeletedFilterOptions);

            const buttons = await getButtonComponents();
            expect(buttons).toHaveSize(2);

            expect(buttons[0].id()).toEqual('cancel-button');
            expect(buttons[0].label()).toEqual('Cancelar');
            expect(buttons[0].icon()).toBeUndefined();
            expect(buttons[0].appearance()).toEqual(ButtonAppearance.text);
            expect(buttons[0].autofocus()).toBeUndefined();
            expect(buttons[0].focusable()).toBeUndefined();
            expect(buttons[0].disabled()).toBeUndefined();
            expect(buttons[0].queryParams()).toBeUndefined();
            expect(buttons[0].queryParamsHandling()).toBeUndefined();
            expect(buttons[0].routerLink()).toBeUndefined();
            expect(buttons[0].type()).toEqual(FormElementType.button);
            expect(buttons[0].onClick).toBeDefined();
            expect(buttons[0].onClick).not.toBeNull();

            expect(buttons[1].id()).toEqual('filter-button');
            expect(buttons[1].label()).toEqual('Filtrar');
            expect(buttons[1].icon()).toBeUndefined();
            expect(buttons[1].appearance()).toEqual(ButtonAppearance.filled);
            expect(buttons[1].autofocus()).toBeUndefined();
            expect(buttons[1].focusable()).toBeUndefined();
            expect(buttons[1].disabled()).toBeUndefined();
            expect(buttons[1].queryParams()).toBeUndefined();
            expect(buttons[1].queryParamsHandling()).toBeUndefined();
            expect(buttons[1].routerLink()).toBeUndefined();
            expect(buttons[1].type()).toEqual(FormElementType.button);
            expect(buttons[1].onClick).toBeDefined();
            expect(buttons[1].onClick).not.toBeNull();
        });

        it('should not fire on close event.', async () => {
            fixture.componentInstance.showOrder.set(true);
            fixture.componentInstance.showCancelButton.set(true);
            spyOn(toolbarComponent.onClose, 'emit');
            expect(toolbarComponent.onClose.emit).not.toHaveBeenCalled();

            const selects = await getSelectFieldComponents();
            expect(selects).toHaveSize(3);

            expect(selects[0].id()).toEqual('order-select');
            expect(selects[0].label()).toEqual('Ordem');
            expect(selects[0].autofocus()).toBeUndefined();
            expect(selects[0].control()).toBeDefined();
            expect(selects[0].control()).not.toBeNull();
            expect(selects[0].control()?.value).toEqual(UserOrder.name_asc);
            expect(selects[0].options()).toEqual(UserOrderOptions);

            expect(selects[1].id()).toEqual('active-select');
            expect(selects[1].label()).toEqual('Ativos');
            expect(selects[1].autofocus()).toBeUndefined();
            expect(selects[1].control()).toBeDefined();
            expect(selects[1].control()).not.toBeNull();
            expect(selects[1].control()?.value).toEqual(ActiveFilter.active);
            expect(selects[1].options()).toEqual(ActiveFilterOptions);

            expect(selects[2].id()).toEqual('deleted-select');
            expect(selects[2].label()).toEqual('Deletados');
            expect(selects[2].autofocus()).toBeUndefined();
            expect(selects[2].control()).toBeDefined();
            expect(selects[2].control()).not.toBeNull();
            expect(selects[2].control()?.value).toEqual(
                DeletedFilter.not_deleted,
            );
            expect(selects[2].options()).toEqual(DeletedFilterOptions);

            const buttons = await getButtonComponents();
            expect(buttons).toHaveSize(2);

            expect(buttons[0].id()).toEqual('cancel-button');
            expect(buttons[0].label()).toEqual('Cancelar');
            expect(buttons[0].icon()).toBeUndefined();
            expect(buttons[0].appearance()).toEqual(ButtonAppearance.text);
            expect(buttons[0].autofocus()).toBeUndefined();
            expect(buttons[0].focusable()).toBeUndefined();
            expect(buttons[0].disabled()).toBeUndefined();
            expect(buttons[0].queryParams()).toBeUndefined();
            expect(buttons[0].queryParamsHandling()).toBeUndefined();
            expect(buttons[0].routerLink()).toBeUndefined();
            expect(buttons[0].type()).toEqual(FormElementType.button);
            expect(buttons[0].onClick).toBeDefined();
            expect(buttons[0].onClick).not.toBeNull();

            expect(buttons[1].id()).toEqual('filter-button');
            expect(buttons[1].label()).toEqual('Filtrar');
            expect(buttons[1].icon()).toBeUndefined();
            expect(buttons[1].appearance()).toEqual(ButtonAppearance.filled);
            expect(buttons[1].autofocus()).toBeUndefined();
            expect(buttons[1].focusable()).toBeUndefined();
            expect(buttons[1].disabled()).toBeUndefined();
            expect(buttons[1].queryParams()).toBeUndefined();
            expect(buttons[1].queryParamsHandling()).toBeUndefined();
            expect(buttons[1].routerLink()).toBeUndefined();
            expect(buttons[1].type()).toEqual(FormElementType.button);
            expect(buttons[1].onClick).toBeDefined();
            expect(buttons[1].onClick).not.toBeNull();
        });
    });
});

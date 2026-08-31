import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { MockTextFilterComponent } from '@components/alert/text-filter/test/mock/text-filter.component.mock';
import { TextFilterComponent } from '@components/alert/text-filter/text-filter.component';
import { ActiveFilter } from '@enums/active-filter/active-filter.enum';
import { DeletedFilter } from '@enums/deleted-filter/deleted-filter.enum';
import { ResponsiveUserFiltersComponent } from '@pages/users/responsive-user-filters/responsive-user-filters.component';
import { ResponsiveUserFiltersHarness } from '@pages/users/responsive-user-filters/responsive-user-filters.harness';
import { UserFilterDialogComponent } from '@pages/users/responsive-user-filters/user-filter-dialog/user-filter-dialog.component';
import { UserFilterToolbarComponent } from '@pages/users/responsive-user-filters/user-filter-toollbar/user-filter-toolbar.component';
import { MockUserFilterToolbarComponent } from '@pages/users/responsive-user-filters/user-filter-toollbar/user-filter-toolbar.component.mock';
import { UserOrder } from '@services/user/enums/user-order/user-order.enum';
import { of } from 'rxjs';

describe('ResponsiveUserFiltersComponent.', () => {
    let fixture: ComponentFixture<ResponsiveUserFiltersComponent>;
    let component: ResponsiveUserFiltersComponent;
    let textFilter: TextFilterComponent;
    let dialogSpy: jasmine.SpyObj<MatDialog>;
    let harness: ResponsiveUserFiltersHarness;

    function getContainer(options: { mobile: boolean }) {
        const css = `div.filters${options.mobile ? '.mobile' : ':not(.mobile)'}`;
        return fixture.debugElement.query(By.css(css));
    }

    function getTextFilter() {
        const container = fixture.debugElement.children[0];
        const textFilter = container.children[0];
        return textFilter.componentInstance as TextFilterComponent;
    }

    function getButton() {
        const container = fixture.debugElement.children[0];
        const element = container.children[1];
        const isButton = element.name == 'button';
        return isButton ? (element.nativeElement as HTMLButtonElement) : null;
    }

    function getToolbar() {
        const container = fixture.debugElement.children[0];
        const element = container.children[1];
        const isToolbar = element.name == 'app-user-filter-toolbar';
        return isToolbar
            ? (element.componentInstance as UserFilterToolbarComponent)
            : null;
    }

    function getComponentData() {
        return {
            textQuery: component.textQuery(),
            active: component.active(),
            deleted: component.deleted(),
            orderBy: component.orderBy(),
            mobile: component.mobile(),
            loading: component.loading(),
        };
    }

    function getToolbarData() {
        const toolbar = getToolbar();
        if (!toolbar) {
            return null;
        }
        return {
            vertical: toolbar.vertical(),
            order: toolbar.order(),
            showCancelButton: toolbar.showCancelButton(),
            showOrder: toolbar.showOrder(),
            active: toolbar.active(),
            deleted: toolbar.deleted(),
        };
    }

    function getbuttonData() {
        const button = getButton();
        if (!button) {
            return null;
        }
        const children = button.children;
        const result: { icon?: string; label?: string } = {};
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child.tagName == 'MAT-ICON') {
                result.icon = child.innerHTML;
            } else if (child.classList.contains('mdc-button__label')) {
                result.label = child.innerHTML.trim();
            }
        }
        return result;
    }

    function hasTextFilter() {
        return !!getTextFilter();
    }

    beforeEach(async () => {
        dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

        await TestBed.configureTestingModule({
            imports: [ResponsiveUserFiltersComponent, MockTextFilterComponent],
            providers: [
                { provide: MatDialog, useValue: dialogSpy },
                provideRouter([]),
            ],
        })
            .overrideComponent(TextFilterComponent, {
                remove: { imports: [TextFilterComponent] },
                add: { imports: [MockTextFilterComponent] },
            })
            .overrideComponent(UserFilterToolbarComponent, {
                remove: { imports: [UserFilterToolbarComponent] },
                add: { imports: [MockUserFilterToolbarComponent] },
            })
            .compileComponents();

        fixture = TestBed.createComponent(ResponsiveUserFiltersComponent);

        textFilter = fixture.debugElement.query(
            By.directive(TextFilterComponent),
        ).componentInstance as TextFilterComponent;
        spyOn(textFilter.textSearch, 'emit').and.callThrough();

        component = fixture.componentInstance;
        spyOn(component.refresh, 'emit');

        fixture.detectChanges();

        harness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            ResponsiveUserFiltersHarness,
        );
    });

    it('should create.', async () => {
        expect(component).toBeTruthy();
    });

    it('should render filters component with default values.', async () => {
        const state = await harness.getState();
        expect(state).toEqual({ hasValidStructure: true });

        expect(getComponentData()).toEqual({
            textQuery: '',
            active: ActiveFilter.active,
            deleted: DeletedFilter.not_deleted,
            orderBy: [
                UserOrder.name_asc,
                UserOrder.email_asc,
                UserOrder.active_asc,
                UserOrder.deleted_desc,
            ],
            mobile: true,
            loading: false,
        });
    });

    describe('mobile.', () => {
        it('should render mobile by default.', async () => {
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({ hasValidStructure: true });

            // TODO: test event (textSearch)

            expect(hasTextFilter()).toBeTrue();
            expect(getbuttonData()).toEqual({
                icon: 'filter_list',
                label: 'Ordenar e filtrar',
            });
            expect(getToolbarData()).toBeNull();
        });

        it('should render mobile when mobile input is true.', async () => {
            component.mobile.set(true);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({ hasValidStructure: true });

            // TODO: test event (textSearch)

            expect(hasTextFilter()).toBeTrue();
            expect(getbuttonData()).toEqual({
                icon: 'filter_list',
                label: 'Ordenar e filtrar',
            });
            expect(getToolbarData()).toBeNull();
        });

        it('should render non mobile when mobile input is false', async () => {
            component.mobile.set(false);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({ hasValidStructure: true });

            // TODO: test event (textSearch)

            expect(hasTextFilter()).toBeTrue();
            expect(getbuttonData()).toBeNull();
            expect(getToolbarData()).toEqual({
                vertical: false,
                order: UserOrder.name_asc,
                showCancelButton: true,
                showOrder: true,
                active: ActiveFilter.active,
                deleted: DeletedFilter.not_deleted,
            });
        });

        it('should render mobile with altered values.', async () => {
            component.mobile.set(true);
            component.textQuery.set('Teste');
            component.orderBy.set([UserOrder.active_desc, UserOrder.name_asc]);
            component.active.set(ActiveFilter.all);
            component.deleted.set(DeletedFilter.deleted);
            component.loading.set(true);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({ hasValidStructure: true });

            expect(hasTextFilter()).toBeTrue();
            expect(getbuttonData()).toEqual({
                icon: 'filter_list',
                label: 'Ordenar e filtrar',
            });
            expect(getToolbarData()).toBeNull();
        });

        it('should render non mobile with altered values.', async () => {
            component.mobile.set(false);
            component.textQuery.set('Teste');
            component.orderBy.set([UserOrder.active_desc, UserOrder.name_asc]);
            component.active.set(ActiveFilter.all);
            component.deleted.set(DeletedFilter.deleted);
            component.loading.set(true);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({ hasValidStructure: true });

            // TODO: test event (textSearch)
            expect(hasTextFilter()).toBeTrue();
            expect(getbuttonData()).toBeNull();
            expect(getToolbarData()).toEqual({
                vertical: false,
                order: UserOrder.active_desc,
                showCancelButton: true,
                showOrder: true,
                active: ActiveFilter.all,
                deleted: DeletedFilter.deleted,
            });
        });
    });

    describe('events.', () => {
        describe('dialog.', () => {
            it('should open dialog on left click.', async () => {
                fixture.detectChanges();
                const dialogRefSpyObj = jasmine.createSpyObj({
                    afterClosed: of({
                        active: ActiveFilter.all,
                        deleted: DeletedFilter.all,
                        order: UserOrder.active_desc,
                    }), // valor que será emitido
                });
                dialogSpy.open.and.returnValue(dialogRefSpyObj);

                fixture.detectChanges();
                await harness.triggerLeftClick();

                // on dialog opening
                expect(dialogSpy.open).toHaveBeenCalledWith(
                    UserFilterDialogComponent,
                    jasmine.objectContaining({
                        data: {
                            order: UserOrder.name_asc,
                            active: ActiveFilter.active,
                            deleted: DeletedFilter.not_deleted,
                        },
                        height: 'auto',
                        width: '400px',
                        maxWidth: '90vh',
                        maxHeight: '90vh',
                    }),
                );

                // on dialog closing
                expect(component.active()).toEqual(ActiveFilter.all);
                expect(component.deleted()).toEqual(DeletedFilter.all);
                expect(component.refresh.emit)
                    .withContext('refresh event called')
                    .toHaveBeenCalledWith({
                        textQuery: '',
                        active: ActiveFilter.all,
                        deleted: DeletedFilter.all,
                        order: UserOrder.active_desc,
                    });

                const state = await harness.getState();
                expect(state).toEqual({ hasValidStructure: true });
            });

            it('should not open dialog on middle click.', async () => {
                fixture.detectChanges();
                const dialogRefSpyObj = jasmine.createSpyObj({
                    afterClosed: of({
                        active: ActiveFilter.all,
                        deleted: DeletedFilter.all,
                        order: UserOrder.active_desc,
                    }), // valor que será emitido
                });
                dialogSpy.open.and.returnValue(dialogRefSpyObj);

                fixture.detectChanges();
                await harness.triggerMiddleClick();

                expect(dialogSpy.open).not.toHaveBeenCalled();

                const state = await harness.getState();
                expect(state).toEqual({ hasValidStructure: true });
            });

            it('should not open dialog on right click.', async () => {
                fixture.detectChanges();
                const dialogRefSpyObj = jasmine.createSpyObj({
                    afterClosed: of({
                        active: ActiveFilter.all,
                        deleted: DeletedFilter.all,
                        order: UserOrder.active_desc,
                    }), // valor que será emitido
                });
                dialogSpy.open.and.returnValue(dialogRefSpyObj);

                fixture.detectChanges();
                await harness.triggerRightClick();

                expect(dialogSpy.open).not.toHaveBeenCalled();

                const state = await harness.getState();
                expect(state).toEqual({ hasValidStructure: true });
            });

            it('should open dialog on touch.', async () => {
                fixture.detectChanges();
                const dialogRefSpyObj = jasmine.createSpyObj({
                    afterClosed: of({
                        active: ActiveFilter.all,
                        deleted: DeletedFilter.all,
                        order: UserOrder.active_desc,
                    }), // valor que será emitido
                });
                dialogSpy.open.and.returnValue(dialogRefSpyObj);

                fixture.detectChanges();
                await harness.triggerTouch();

                // on dialog opening
                expect(dialogSpy.open).toHaveBeenCalledWith(
                    UserFilterDialogComponent,
                    jasmine.objectContaining({
                        data: {
                            order: UserOrder.name_asc,
                            active: ActiveFilter.active,
                            deleted: DeletedFilter.not_deleted,
                        },
                        height: 'auto',
                        width: '400px',
                        maxWidth: '90vh',
                        maxHeight: '90vh',
                    }),
                );

                // on dialog closing
                expect(component.active()).toEqual(ActiveFilter.all);
                expect(component.deleted()).toEqual(DeletedFilter.all);
                expect(component.refresh.emit)
                    .withContext('refresh event called')
                    .toHaveBeenCalledWith({
                        textQuery: '',
                        active: ActiveFilter.all,
                        deleted: DeletedFilter.all,
                        order: UserOrder.active_desc,
                    });

                const state = await harness.getState();
                expect(state).toEqual({ hasValidStructure: true });
            });

            it('should open dialog on pen click.', async () => {
                fixture.detectChanges();
                const dialogRefSpyObj = jasmine.createSpyObj({
                    afterClosed: of({
                        active: ActiveFilter.all,
                        deleted: DeletedFilter.all,
                        order: UserOrder.active_desc,
                    }), // valor que será emitido
                });
                dialogSpy.open.and.returnValue(dialogRefSpyObj);

                fixture.detectChanges();
                await harness.triggerPenClick();

                // on dialog opening
                expect(dialogSpy.open).toHaveBeenCalledWith(
                    UserFilterDialogComponent,
                    jasmine.objectContaining({
                        data: {
                            order: UserOrder.name_asc,
                            active: ActiveFilter.active,
                            deleted: DeletedFilter.not_deleted,
                        },
                        height: 'auto',
                        width: '400px',
                        maxWidth: '90vh',
                        maxHeight: '90vh',
                    }),
                );

                // on dialog closing
                expect(component.active()).toEqual(ActiveFilter.all);
                expect(component.deleted()).toEqual(DeletedFilter.all);
                expect(component.refresh.emit)
                    .withContext('refresh event called')
                    .toHaveBeenCalledWith({
                        textQuery: '',
                        active: ActiveFilter.all,
                        deleted: DeletedFilter.all,
                        order: UserOrder.active_desc,
                    });

                const state = await harness.getState();
                expect(state).toEqual({ hasValidStructure: true });
            });
        });

        describe('text search', () => {
            it('should fire refresh event when text is searched.', async () => {
                textFilter.textSearch.emit('test');
                expect(component.textQuery()).toEqual('test');
                expect(component.refresh.emit)
                    .withContext('refresh event called')
                    .toHaveBeenCalledOnceWith({
                        textQuery: 'test',
                        active: ActiveFilter.active,
                        deleted: DeletedFilter.not_deleted,
                        order: UserOrder.name_asc,
                    });

                const state = await harness.getState();
                expect(state).toEqual({ hasValidStructure: true });
            });
        });

        describe('toolbar', () => {
            it('should handle toolbar onClose event.', async () => {
                component.mobile.set(false);
                component.textQuery.set('test');
                fixture.detectChanges();
                const container = getContainer({ mobile: false });
                const toolbar = container.children[1]
                    .componentInstance as UserFilterToolbarComponent;
                toolbar.onClose.emit({
                    active: ActiveFilter.all,
                    deleted: DeletedFilter.all,
                    order: UserOrder.active_desc,
                });
                fixture.detectChanges();

                expect(component.orderBy()).toEqual([
                    UserOrder.name_asc,
                    UserOrder.email_asc,
                    UserOrder.active_asc,
                    UserOrder.deleted_desc,
                ]);
                expect(component.loading()).toEqual(false);
                expect(component.mobile()).toEqual(false);
                expect(component.textQuery()).toEqual('test');
                expect(component.active() == ActiveFilter.all);
                expect(component.deleted() == DeletedFilter.all);

                expect(component.refresh.emit).toHaveBeenCalledOnceWith({
                    textQuery: 'test',
                    active: ActiveFilter.all,
                    deleted: DeletedFilter.all,
                    order: UserOrder.active_desc,
                });

                const state = await harness.getState();
                expect(state).toEqual({ hasValidStructure: true });
            });
        });
    });
});

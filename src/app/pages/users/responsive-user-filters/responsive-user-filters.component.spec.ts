import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { MockTextFilterComponent } from '../../../components/alert/text-filter/test/mock/text-filter.component.mock';
import { TextFilterComponent } from '../../../components/alert/text-filter/text-filter.component';
import { ActiveFilter } from '../../../enums/active-filter/active-filter.enum';
import { DeletedFilter } from '../../../enums/deleted-filter/deleted-filter.enum';
import { UserOrder } from '../../../services/user/enums/user-order/user-order.enum';
import { ResponsiveUserFiltersComponent } from './responsive-user-filters.component';
import { ResponsiveUserFiltersHarness } from './responsive-user-filters.harness';
import { UserFilterDialogComponent } from './user-filter-dialog/user-filter-dialog.component';
import { UserFilterToolbarComponent } from './user-filter-toollbar/user-filter-toolbar.component';
import { MockUserFilterToolbarComponent } from './user-filter-toollbar/user-filter-toolbar.component.mock';

describe('ResponsiveUserFiltersComponent.', () => {
    let fixture: ComponentFixture<ResponsiveUserFiltersComponent>;
    let component: ResponsiveUserFiltersComponent;
    let textFilter: TextFilterComponent;
    let dialogSpy: jasmine.SpyObj<MatDialog>;
    let harness: ResponsiveUserFiltersHarness;

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

    it('should create', async () => {
        expect(component).toBeTruthy();
    });

    it('should render filters component with default values', async () => {
        const state = await harness.getState();
        expect(state).toEqual({ hasValidStructure: true });

        expect(component.textQuery()).toEqual('');
        expect(component.active()).toEqual(ActiveFilter.active);
        expect(component.deleted()).toEqual(DeletedFilter.not_deleted);
        expect(component.orderBy()).toEqual([
            UserOrder.name_asc,
            UserOrder.email_asc,
            UserOrder.active_asc,
            UserOrder.deleted_desc,
        ]);
        expect(component.mobile()).toEqual(true);
        expect(component.loading()).toEqual(false);
    });

    describe('mobile', () => {
        it('should render mobile by default', async () => {
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({ hasValidStructure: true });

            const textFilter = getTextFilter();
            const button = getButton();
            const toolbar = getToolbar();

            expect(textFilter).toBeDefined();
            expect(textFilter).not.toBeNull();
            // TODO: test event (textSearch)

            expect(button).not.toBeNull();
            expect(button).toBeDefined();
            expect(button!.tagName).toEqual('BUTTON');

            expect(toolbar).toBeNull();
        });

        it('should render mobile when mobile input is true', async () => {
            component.mobile.set(true);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({ hasValidStructure: true });

            const textFilter = getTextFilter();
            const button = getButton();
            const toolbar = getToolbar();

            expect(textFilter).toBeDefined();
            expect(textFilter).not.toBeNull();
            // TODO: test event (textSearch)

            expect(button).not.toBeNull();
            expect(button).toBeDefined();
            expect(button!.tagName).toEqual('BUTTON');

            expect(toolbar).toBeNull();
        });

        it('should render non mobile when mobile input is false', async () => {
            component.mobile.set(false);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({ hasValidStructure: true });

            const textFilter = getTextFilter();
            const button = getButton();
            const toolbar = getToolbar();

            expect(textFilter).toBeDefined();
            expect(textFilter).not.toBeNull();
            // TODO: test event (textSearch)

            expect(button).toBeNull();

            expect(toolbar).toBeDefined();
            expect(toolbar).not.toBeNull();
            expect(toolbar!.vertical()).toEqual(false);
            expect(toolbar!.order()).toEqual(UserOrder.name_asc);
            expect(toolbar!.showCancelButton()).toEqual(true);
            expect(toolbar!.showOrder()).toEqual(true);
            expect(toolbar!.active()).toEqual(ActiveFilter.active);
            expect(toolbar!.deleted()).toEqual(DeletedFilter.not_deleted);
        });

        it('should render mobile with altered values', async () => {
            component.mobile.set(true);
            component.textQuery.set('Teste');
            component.orderBy.set([UserOrder.active_desc, UserOrder.name_asc]);
            component.active.set(ActiveFilter.all);
            component.deleted.set(DeletedFilter.deleted);
            component.loading.set(true);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({ hasValidStructure: true });

            const textFilter = getTextFilter();
            const button = getButton();
            const toolbar = getToolbar();

            expect(textFilter).toBeDefined();
            expect(textFilter).not.toBeNull();
            // TODO: test event (textSearch)

            expect(button).not.toBeNull();
            expect(button).toBeDefined();
            expect(button!.tagName).toEqual('BUTTON');

            expect(toolbar).toBeNull();
        });

        it('should render non mobile with altered values', async () => {
            component.mobile.set(false);
            component.textQuery.set('Teste');
            component.orderBy.set([UserOrder.active_desc, UserOrder.name_asc]);
            component.active.set(ActiveFilter.all);
            component.deleted.set(DeletedFilter.deleted);
            component.loading.set(true);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({ hasValidStructure: true });

            const textFilter = getTextFilter();
            const button = getButton();
            const toolbar = getToolbar();

            expect(textFilter).toBeDefined();
            expect(textFilter).not.toBeNull();
            // TODO: test event (textSearch)
            expect(button).toBeNull();

            expect(toolbar).toBeDefined();
            expect(toolbar).not.toBeNull();
            expect(toolbar!.vertical()).toEqual(false);
            expect(toolbar!.order()).toEqual(UserOrder.active_desc);
            expect(toolbar!.showCancelButton()).toEqual(true);
            expect(toolbar!.showOrder()).toEqual(true);
            expect(toolbar!.active()).toEqual(ActiveFilter.all);
            expect(toolbar!.deleted()).toEqual(DeletedFilter.deleted);
        });
    });

    describe('events', () => {
        it('should open dialog', async () => {
            fixture.detectChanges();
            const dialogRefSpyObj = jasmine.createSpyObj({
                afterClosed: of({
                    active: ActiveFilter.all,
                    deleted: DeletedFilter.all,
                    order: UserOrder.active_desc,
                }), // valor que será emitido
            });
            dialogSpy.open.and.returnValue(dialogRefSpyObj);

            const container = getContainer({ mobile: true });
            fixture.detectChanges();
            const button = getButton();
            button!.click();

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

        it('should fire refresh event when text is searched', async () => {
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

        it('should handle toolbar onClose event', async () => {
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

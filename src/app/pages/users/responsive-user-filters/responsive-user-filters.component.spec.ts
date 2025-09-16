import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TextFilterComponent } from '../../../components/alert/text-filter/text-filter.component';
import { ActiveFilter } from '../../../enums/active-filter/active-filter.enum';
import { DeletedFilter } from '../../../enums/deleted-filter/deleted-filter.enum';
import { UserOrder } from '../../../services/user/enums/user-order/user-order.enum';
import { ResponsiveUserFiltersComponent } from './responsive-user-filters.component';
import { MockTextFilterComponent } from './test/mock/text-filter.component.mock';
import { MockUserFilterToolbarComponent } from './test/mock/user-filter.component.mock';
import { UserFilterDialogComponent } from './user-filter-dialog/user-filter-dialog.component';
import { UserFilterToolbarComponent } from './user-filter-toollbar/user-filter-toolbar.component';

describe('ResponsiveUserFiltersComponent', () => {
    let fixture: ComponentFixture<ResponsiveUserFiltersComponent>;
    let component: ResponsiveUserFiltersComponent;
    let textFilter: TextFilterComponent;
    let dialogSpy: jasmine.SpyObj<MatDialog>;

    beforeEach(async () => {
        dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

        await TestBed.configureTestingModule({
            imports: [ResponsiveUserFiltersComponent, MockTextFilterComponent],
            providers: [{ provide: MatDialog, useValue: dialogSpy }],
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
    });

    function getContainer(options: { mobile: boolean }) {
        const css = `div.filters${options.mobile ? '.mobile' : ':not(.mobile)'}`;
        return fixture.debugElement.query(By.css(css));
    }

    function testFilters(options: { mobile: boolean }) {
        component.textQuery.set('test');
        component.active.set(ActiveFilter.all);
        component.deleted.set(DeletedFilter.all);
        component.loading.set(false);
        component.mobile.set(options.mobile);
        component.orderBy.set([
            UserOrder.active_desc,
            UserOrder.name_asc,
            UserOrder.email_asc,
            UserOrder.deleted_desc,
        ]);

        fixture.detectChanges();
        const container = getContainer(options);
        expect(container)
            .withContext(
                `${options.mobile ? 'mobile' : 'non mobile'} container is present`,
            )
            .toBeDefined();
        expect(container.children[0].name)
            .withContext('first container child is button')
            .toEqual('app-text-filter');

        if (options.mobile) {
            expect(container.children[1].name)
                .withContext('second container child is button')
                .toEqual('button');
            expect(container.children[1].name)
                .withContext('second container child is not filter toolbar')
                .not.toEqual('app-user-filter-toolbar');
        } else {
            expect(container.children[1].name)
                .withContext('second container child is not button')
                .not.toEqual('button');
            expect(container.children[1].name)
                .withContext('second container child is filter toolbar')
                .toEqual('app-user-filter-toolbar');

            const toolbar = container.children[1]
                .componentInstance as UserFilterToolbarComponent;
            expect(toolbar.vertical()).toEqual(false);
            expect(toolbar.sort()).toEqual(UserOrder.active_desc);
            expect(toolbar.showCancelButton()).toEqual(true);
            expect(toolbar.showSort()).toEqual(true);
            expect(toolbar.active()).toEqual(ActiveFilter.all);
            expect(toolbar.deleted()).toEqual(DeletedFilter.all);
        }
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render non mobile filters component with default values', () => {
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
        fixture.detectChanges();
    });

    it('should render mobile by default', () => {
        fixture.detectChanges();
        testFilters({ mobile: true });
    });

    it('should render mobile when mobile input is true', () => {
        component.mobile.set(true);
        fixture.detectChanges();

        testFilters({ mobile: true });
    });

    it('should render non mobile when mobile input is false', () => {
        component.mobile.set(false);
        fixture.detectChanges();

        testFilters({ mobile: false });
    });

    describe('events', () => {
        it('should open dialog', () => {
            fixture.detectChanges();
            const dialogRefSpyObj = jasmine.createSpyObj({
                afterClosed: of({
                    active: ActiveFilter.all,
                    deleted: DeletedFilter.all,
                    sort: UserOrder.active_desc,
                }), // valor que será emitido
            });
            dialogSpy.open.and.returnValue(dialogRefSpyObj);

            const container = getContainer({ mobile: true });
            fixture.detectChanges();
            const button = container.children[1].nativeElement;
            button.click();

            // on dialog opening
            expect(dialogSpy.open).toHaveBeenCalledWith(
                UserFilterDialogComponent,
                jasmine.objectContaining({
                    data: {
                        sort: UserOrder.name_asc,
                        active: ActiveFilter.active,
                        deleted: DeletedFilter.not_deleted,
                    },
                    height: 'calc(100% - 30px)',
                    width: 'calc(100% - 30px)',
                    maxWidth: '100%',
                    maxHeight: '100%',
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
                    sort: UserOrder.active_desc,
                });
        });

        it('should fire refresh event', () => {
            textFilter.textSearch.emit('test');
            expect(component.textQuery()).toEqual('test');
            expect(component.refresh.emit)
                .withContext('refresh event called')
                .toHaveBeenCalledOnceWith({
                    textQuery: 'test',
                    active: ActiveFilter.active,
                    deleted: DeletedFilter.not_deleted,
                    sort: UserOrder.name_asc,
                });
        });

        it('should handle toolbar onClose event', () => {
            component.mobile.set(false);
            component.textQuery.set('test');
            fixture.detectChanges();
            const container = getContainer({ mobile: false });
            const toolbar = container.children[1]
                .componentInstance as UserFilterToolbarComponent;
            toolbar.onClose.emit({
                active: ActiveFilter.all,
                deleted: DeletedFilter.all,
                sort: UserOrder.active_desc,
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
                sort: UserOrder.active_desc,
            });
        });
    });
});

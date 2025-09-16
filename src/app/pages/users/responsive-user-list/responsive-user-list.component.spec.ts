import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActiveFilter } from '../../../enums/active-filter/active-filter.enum';
import { DeletedFilter } from '../../../enums/deleted-filter/deleted-filter.enum';
import { MouseButton } from '../../../enums/mouse-button/mouse-button.enum';
import { UserOrder } from '../../../services/user/enums/user-order/user-order.enum';
import { ResponsiveUserListComponent } from './responsive-user-list.component';
import { _usersItems } from './test/data/user-items.data.test';
import { _getResponsiveUserListComponentList as getList } from './test/getters/get-responsive-user-list-component-list.test copy';
import { _getResponsiveUserListComponentTable as getTable } from './test/getters/get-responsive-user-list-component-table.test';
import { MockUserListComponent } from './test/mocks/user-list.component.mock';
import { MockUserTableComponent } from './test/mocks/user-table.component.mock';
import { testResponsiveUsersListComponentList as testList } from './test/tests/responsive-user-list-component-list.test';
import { testResponsiveUsersListComponentTable as testTable } from './test/tests/responsive-user-list-component-table.test';
import { UserListComponent } from './user-list/user-list.component';
import { UserColumnId } from './user-table/enums/user-column-id/user-column-id.enum';
import { UserTableRow } from './user-table/interfaces/user-table-row.interface';
import { UserTableComponent } from './user-table/user-table.component';

describe('ResponsiveUserListComponent', () => {
    let component: ResponsiveUserListComponent;
    let fixture: ComponentFixture<ResponsiveUserListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ResponsiveUserListComponent,
                MockUserTableComponent,
                MockUserListComponent,
            ],
        })
            .overrideComponent(UserListComponent, {
                remove: { imports: [UserListComponent] },
                add: { imports: [MockUserListComponent] },
            })
            .overrideComponent(UserTableComponent, {
                remove: { imports: [UserTableComponent] },
                add: { imports: [MockUserTableComponent] },
            })
            .compileComponents();

        fixture = TestBed.createComponent(ResponsiveUserListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('responsive mode', () => {
        it('should show list in mobile mode by default', () => {
            component.mobile.set(true);
            fixture.detectChanges();

            testList(fixture, {
                loading: false,
                users: [],
            });
            testTable(fixture, false);
        });

        it('should show list in mobile mode', () => {
            component.mobile.set(true);
            fixture.detectChanges();

            testList(fixture, {
                loading: false,
                users: [],
            });
            testTable(fixture, false);
        });

        it('should show table in non mobile mode', () => {
            component.mobile.set(false);
            fixture.detectChanges();

            testList(fixture, false);
            testTable(fixture, {
                activeSortEnabled: false,
                deletedSortEnabled: false,
                loading: false,
                sort: [
                    UserOrder.name_asc,
                    UserOrder.email_asc,
                    UserOrder.active_asc,
                    UserOrder.deleted_desc,
                ],
                users: [],
            });
        });
    });

    describe('element ids', () => {
        it('list should have id', () => {
            component.mobile.set(true);
            fixture.detectChanges();
            const list = fixture.debugElement.query(
                By.css('app-user-list#user-list'),
            );
            const table = fixture.debugElement.query(
                By.css('app-user-table#user-table'),
            );

            expect(list).toBeTruthy();
            expect(list.attributes['id']).toBe('user-list');
            expect(table).toBeFalsy();
        });

        it('table should have id', () => {
            component.mobile.set(false);
            fixture.detectChanges();
            const list = fixture.debugElement.query(
                By.css('app-user-list#user-list'),
            );
            const table = fixture.debugElement.query(
                By.css('app-user-table#user-table'),
            );
            expect(list).toBeFalsy();
            expect(table).toBeTruthy();
            expect(table.attributes['id']).toBe('user-table');
        });
    });

    describe('loading', () => {
        it('should not be loading by default in mobile mode', () => {
            component.mobile.set(true);
            fixture.detectChanges();

            testList(fixture, {
                loading: false,
                users: [],
            });
            testTable(fixture, false);
        });

        it('should set not loading in mobile mode', () => {
            component.loading.set(false);
            component.mobile.set(true);
            fixture.detectChanges();

            testList(fixture, {
                loading: false,
                users: [],
            });
            testTable(fixture, false);
        });

        it('should set loading in mobile mode', () => {
            component.loading.set(true);
            component.mobile.set(true);
            fixture.detectChanges();

            testList(fixture, {
                loading: true,
                users: [],
            });
            testTable(fixture, false);
        });

        it('should be not loading by default in non mobile mode', () => {
            component.mobile.set(false);
            fixture.detectChanges();

            testList(fixture, false);
            testTable(fixture, {
                activeSortEnabled: false,
                deletedSortEnabled: false,
                loading: false,
                sort: [
                    UserOrder.name_asc,
                    UserOrder.email_asc,
                    UserOrder.active_asc,
                    UserOrder.deleted_desc,
                ],
                users: [],
            });
        });

        it('should set not loading in non mobile mode', () => {
            component.loading.set(false);
            component.mobile.set(false);
            fixture.detectChanges();

            testList(fixture, false);
            testTable(fixture, {
                activeSortEnabled: false,
                deletedSortEnabled: false,
                loading: false,
                sort: [
                    UserOrder.name_asc,
                    UserOrder.email_asc,
                    UserOrder.active_asc,
                    UserOrder.deleted_desc,
                ],
                users: [],
            });
        });

        it('should set loading in non mobile mode', () => {
            component.loading.set(true);
            component.mobile.set(false);
            fixture.detectChanges();

            testList(fixture, false);
            testTable(fixture, {
                activeSortEnabled: false,
                deletedSortEnabled: false,
                loading: true,
                sort: [
                    UserOrder.name_asc,
                    UserOrder.email_asc,
                    UserOrder.active_asc,
                    UserOrder.deleted_desc,
                ],
                users: [],
            });
        });
    });

    describe('data', () => {
        it('should pass data to the list by default', () => {
            component.users.set(_usersItems);
            fixture.detectChanges();

            testList(fixture, {
                loading: false,
                users: _usersItems,
            });
            testTable(fixture, false);
        });

        it('should pass data to the list', () => {
            component.mobile.set(true);
            component.users.set(_usersItems);
            fixture.detectChanges();

            testList(fixture, {
                loading: false,
                users: _usersItems,
            });
            testTable(fixture, false);
        });

        it('should pass data to the table', () => {
            component.mobile.set(false);
            component.users.set(_usersItems);
            fixture.detectChanges();

            testList(fixture, false);
            testTable(fixture, {
                activeSortEnabled: false,
                deletedSortEnabled: false,
                loading: false,
                sort: [
                    UserOrder.name_asc,
                    UserOrder.email_asc,
                    UserOrder.active_asc,
                    UserOrder.deleted_desc,
                ],
                users: _usersItems,
            });
        });
    });

    describe('sort', () => {
        it('should pass sort by order to the table', () => {
            component.mobile.set(false);
            component.sort.set(UserOrder.active_asc);

            fixture.detectChanges();

            testList(fixture, false);
            testTable(fixture, {
                activeSortEnabled: false,
                deletedSortEnabled: false,
                loading: false,
                sort: UserOrder.active_asc,
                users: [],
            });
        });

        it('should pass sort by array of orders to the table', () => {
            component.mobile.set(false);
            component.sort.set([UserOrder.active_asc, UserOrder.name_desc]);

            fixture.detectChanges();

            testList(fixture, false);
            testTable(fixture, {
                activeSortEnabled: false,
                deletedSortEnabled: false,
                loading: false,
                sort: [UserOrder.active_asc, UserOrder.name_desc],
                users: [],
            });
        });

        it('should pass sort by column id to the table', () => {
            component.mobile.set(false);
            component.sort.set(UserColumnId.email);

            fixture.detectChanges();

            testList(fixture, false);
            testTable(fixture, {
                activeSortEnabled: false,
                deletedSortEnabled: false,
                loading: false,
                sort: UserColumnId.email,
                users: [],
            });
        });

        it('should pass sort by undefined to the table', () => {
            component.mobile.set(false);
            component.sort.set(undefined);

            fixture.detectChanges();

            testList(fixture, false);
            testTable(fixture, {
                activeSortEnabled: false,
                deletedSortEnabled: false,
                loading: false,
                sort: undefined,
                users: [],
            });
        });
    });

    describe('activeSortEnabled', () => {
        it("should set table's activeSortEnabled = false when active filter is not defined", () => {
            component.mobile.set(false);
            fixture.detectChanges();

            testList(fixture, false);
            testTable(fixture, {
                activeSortEnabled: false,
                deletedSortEnabled: false,
                loading: false,
                sort: [
                    UserOrder.name_asc,
                    UserOrder.email_asc,
                    UserOrder.active_asc,
                    UserOrder.deleted_desc,
                ],
                users: [],
            });
        });

        it("should set table's activeSortEnabled = false when active filter is 'active'", () => {
            component.mobile.set(false);
            component.active.set(ActiveFilter.active);
            fixture.detectChanges();

            testList(fixture, false);
            testTable(fixture, {
                activeSortEnabled: false,
                deletedSortEnabled: false,
                loading: false,
                sort: [
                    UserOrder.name_asc,
                    UserOrder.email_asc,
                    UserOrder.active_asc,
                    UserOrder.deleted_desc,
                ],
                users: [],
            });
        });

        it("should set table's activeSortEnabled = false when active filter is 'inactive'", () => {
            component.mobile.set(false);
            component.active.set(ActiveFilter.inactive);
            fixture.detectChanges();

            testList(fixture, false);
            testTable(fixture, {
                activeSortEnabled: false,
                deletedSortEnabled: false,
                loading: false,
                sort: [
                    UserOrder.name_asc,
                    UserOrder.email_asc,
                    UserOrder.active_asc,
                    UserOrder.deleted_desc,
                ],
                users: [],
            });
        });

        it("should set table's activeSortEnabled = true when active filter is 'all'", () => {
            component.mobile.set(false);
            component.active.set(ActiveFilter.all);
            fixture.detectChanges();

            testList(fixture, false);
            testTable(fixture, {
                activeSortEnabled: true,
                deletedSortEnabled: false,
                loading: false,
                sort: [
                    UserOrder.name_asc,
                    UserOrder.email_asc,
                    UserOrder.active_asc,
                    UserOrder.deleted_desc,
                ],
                users: [],
            });
        });
    });

    describe('deletedSortEnabled', () => {
        it("should set table's deletedSortEnabled = false when deleted filter is not defined", () => {
            component.mobile.set(false);
            fixture.detectChanges();

            testList(fixture, false);
            testTable(fixture, {
                activeSortEnabled: false,
                deletedSortEnabled: false,
                loading: false,
                sort: [
                    UserOrder.name_asc,
                    UserOrder.email_asc,
                    UserOrder.active_asc,
                    UserOrder.deleted_desc,
                ],
                users: [],
            });
        });

        it("should set table's deletedSortEnabled = true when deleted filter is 'all'", () => {
            component.mobile.set(false);
            component.deleted.set(DeletedFilter.all);
            fixture.detectChanges();

            testList(fixture, false);
            testTable(fixture, {
                activeSortEnabled: false,
                deletedSortEnabled: true,
                loading: false,
                sort: [
                    UserOrder.name_asc,
                    UserOrder.email_asc,
                    UserOrder.active_asc,
                    UserOrder.deleted_desc,
                ],
                users: [],
            });
        });

        it("should set table's deletedSortEnabled = false deleted filter is 'deleted'", () => {
            component.mobile.set(false);
            component.deleted.set(DeletedFilter.deleted);
            fixture.detectChanges();

            testList(fixture, false);
            testTable(fixture, {
                activeSortEnabled: false,
                deletedSortEnabled: false,
                loading: false,
                sort: [
                    UserOrder.name_asc,
                    UserOrder.email_asc,
                    UserOrder.active_asc,
                    UserOrder.deleted_desc,
                ],
                users: [],
            });
        });

        it("should set table's deletedSortEnabled = false deleted filter is 'not_deleted'", () => {
            component.mobile.set(false);
            component.deleted.set(DeletedFilter.not_deleted);
            fixture.detectChanges();

            testList(fixture, false);
            testTable(fixture, {
                activeSortEnabled: false,
                deletedSortEnabled: false,
                loading: false,
                sort: [
                    UserOrder.name_asc,
                    UserOrder.email_asc,
                    UserOrder.active_asc,
                    UserOrder.deleted_desc,
                ],
                users: [],
            });
        });
    });

    describe('events', () => {
        beforeEach(() => {
            spyOn(component.updateSort, 'emit');
            spyOn(component.headerClick, 'emit');
            spyOn(component.itemClick, 'emit');
        });

        describe('updateSort', () => {
            it("should delegate table's updateSort event in non mobile mode", () => {
                component.mobile.set(false);
                component.users.set(_usersItems);
                fixture.detectChanges();

                const event = [
                    UserOrder.active_desc,
                    UserOrder.name_asc,
                    UserOrder.email_asc,
                    UserOrder.deleted_desc,
                ];
                component.sort.set(event);
                fixture.detectChanges();

                expect(component.updateSort.emit)
                    .withContext('header click event called')
                    .toHaveBeenCalledWith(event);
            });
        });

        describe('headerClick', () => {
            it("should delegate tables's itemClick event", () => {
                component.mobile.set(false);
                component.users.set(_usersItems);
                fixture.detectChanges();
                const table = getTable(fixture);
                const event = [
                    UserOrder.active_desc,
                    UserOrder.name_asc,
                    UserOrder.email_asc,
                    UserOrder.deleted_desc,
                ];
                table.headerClick.emit(event);
                fixture.detectChanges();

                expect(component.headerClick.emit)
                    .withContext('header click event called')
                    .toHaveBeenCalledWith(event);
            });
        });

        describe('itemClick', () => {
            it("should delegate lists's itemClick event", () => {
                component.mobile.set(true);
                component.users.set(_usersItems);
                fixture.detectChanges();
                const table = getList(fixture);
                const item: UserTableRow = {
                    id: _usersItems[1].id,
                    name: _usersItems[1].name,
                    email: _usersItems[1].email,
                    active: !!_usersItems[1].active,
                    deleted: _usersItems[1].deleted,
                };
                table.itemClick.emit({
                    event: new PointerEvent('pointerdown', {
                        button: MouseButton.left,
                        pointerType: 'mouse',
                    }),
                    item,
                });
                fixture.detectChanges();

                expect(component.itemClick.emit)
                    .withContext('row click event called')
                    .toHaveBeenCalledWith(_usersItems[1].id);
            });

            it("should delegate tables's itemClick event", () => {
                component.mobile.set(false);
                component.users.set(_usersItems);
                fixture.detectChanges();
                const list = getTable(fixture);
                const row: UserTableRow = {
                    id: _usersItems[1].id,
                    name: _usersItems[1].name,
                    email: _usersItems[1].email,
                    active: !!_usersItems[1].active,
                    deleted: _usersItems[1].deleted,
                };
                list.rowClick.emit({
                    event: new PointerEvent('pointerdown', {
                        button: MouseButton.left,
                        pointerType: 'mouse',
                    }),
                    row,
                });
                fixture.detectChanges();

                expect(component.itemClick.emit)
                    .withContext('row click event called')
                    .toHaveBeenCalledWith(_usersItems[1].id);
            });
        });
    });
});

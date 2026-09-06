import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ListComponent } from '@components/list/list.component';
import { MockListComponent } from '@components/list/test/mock/list.component.mock';
import { ListItem } from '@components/list/types/list-item.model';
import { ItemIcon } from '@components/models/item-icon/item-icon.model';
import { ItemLabel } from '@components/models/item-label/item-label.model';
import { ColumnData } from '@components/table/model/column-data/column-data.model';
import { Column } from '@components/table/model/column/column.model';
import { Row } from '@components/table/model/row/row.model';
import { TableComponent } from '@components/table/table.component';
import { MockTableComponent } from '@components/table/test/mock/table.component.mock';
import { UserColumnLabel } from '@components/table/user-column-name/user-column-label.enum';
import { ActiveFilter } from '@enums/active-filter/active-filter.enum';
import { DeletedFilter } from '@enums/deleted-filter/deleted-filter.enum';
import { SortDirection } from '@enums/direction/direction.enum';
import { Icon } from '@enums/icons/icons.enum';
import { ResponsiveUserListComponent } from '@pages/users/responsive-user-list/responsive-user-list.component';
import { UserColumnId } from '@pages/users/types/user-column-id/user-column-id.enum';
import { UserOrder } from '@services/user/enums/user-order/user-order.enum';

describe('ResponsiveUserListComponent.', () => {
    let component: ResponsiveUserListComponent;
    let fixture: ComponentFixture<ResponsiveUserListComponent>;

    function getList() {
        const debugElements = fixture.debugElement.queryAll(
            By.directive(ListComponent),
        );
        if (!debugElements.length) {
            return null;
        }
        return debugElements[0].componentInstance as unknown as ListComponent;
    }

    function getTable() {
        const debugElements = fixture.debugElement.queryAll(
            By.directive(TableComponent),
        );
        if (!debugElements.length) {
            return null;
        }
        return debugElements[0].componentInstance as unknown as TableComponent;
    }

    function getListData() {
        const list = getList();
        if (!list) return null;
        return {
            data: list.data(),
            loading: list.loading(),
        };
    }

    function getTableData() {
        const table = getTable();
        if (!table) return null;
        return {
            columns: table.columns(),
            data: table.data(),
            loading: table.loading(),
        };
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ResponsiveUserListComponent,
                MockTableComponent,
                MockListComponent,
            ],
            providers: [provideRouter([])],
        })
            .overrideComponent(ListComponent, {
                remove: { imports: [ListComponent] },
                add: { imports: [MockListComponent] },
            })
            .overrideComponent(TableComponent, {
                remove: { imports: [TableComponent] },
                add: { imports: [MockTableComponent] },
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

            expect(getListData()).toEqual({ loading: false, data: [] });
            expect(getTableData()).toBeNull();
        });

        it('should show list in mobile mode when mobile is true', () => {
            component.mobile.set(true);
            fixture.detectChanges();

            expect(getListData()).toEqual({ loading: false, data: [] });
            expect(getTableData()).toBeNull();
        });

        it('should show table in non mobile mode when mobile is false', () => {
            component.mobile.set(false);
            fixture.detectChanges();

            expect(getList()).toBeNull();
            expect(getTableData()).toEqual({
                loading: false,
                columns: [
                    new Column({
                        id: UserColumnId.name,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.name,
                        disabled: false,
                        sortable: true,
                        position: 0,
                        shrink: false,
                    }),
                    new Column({
                        id: UserColumnId.email,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.email,
                        disabled: false,
                        sortable: true,
                        position: 1,
                        shrink: false,
                    }),
                    new Column({
                        id: UserColumnId.active,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.active,
                        disabled: false,
                        sortable: false,
                        position: 2,
                        shrink: true,
                    }),
                    new Column({
                        id: UserColumnId.deleted,
                        direction: SortDirection.desc,
                        label: UserColumnLabel.deleted,
                        disabled: false,
                        sortable: false,
                        position: 3,
                        shrink: true,
                    }),
                ],
                data: [],
            });
        });
    });

    describe('loading', () => {
        it('should not be loading by default in mobile mode', () => {
            component.mobile.set(true);
            fixture.detectChanges();

            expect(getListData()).toEqual({ loading: false, data: [] });
            expect(getTableData()).toBeNull();
        });

        it('should set not loading in mobile mode when loading is false', () => {
            component.loading.set(false);
            component.mobile.set(true);
            fixture.detectChanges();

            expect(getListData()).toEqual({ loading: false, data: [] });
            expect(getTableData()).toBeNull();
        });

        it('should set loading in mobile mode when loading is true', () => {
            component.loading.set(true);
            component.mobile.set(true);
            fixture.detectChanges();

            expect(getListData()).toEqual({ loading: true, data: [] });
            expect(getTableData()).toBeNull();
        });

        it('should be not loading by default in non mobile mode by default', () => {
            component.mobile.set(false);
            fixture.detectChanges();

            expect(getListData()).toBeNull();
            expect(getTableData()).toEqual({
                loading: false,
                columns: [
                    new Column({
                        id: UserColumnId.name,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.name,
                        disabled: false,
                        sortable: true,
                        position: 0,
                        shrink: false,
                    }),
                    new Column({
                        id: UserColumnId.email,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.email,
                        disabled: false,
                        sortable: true,
                        position: 1,
                        shrink: false,
                    }),
                    new Column({
                        id: UserColumnId.active,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.active,
                        disabled: false,
                        sortable: false,
                        position: 2,
                        shrink: true,
                    }),
                    new Column({
                        id: UserColumnId.deleted,
                        direction: SortDirection.desc,
                        label: UserColumnLabel.deleted,
                        disabled: false,
                        sortable: false,
                        position: 3,
                        shrink: true,
                    }),
                ],
                data: [],
            });
        });

        it('should be not loading in non mobile mode when loading is false', () => {
            component.mobile.set(false);
            component.loading.set(false);
            fixture.detectChanges();

            expect(getListData()).toBeNull();
            expect(getTableData()).toEqual({
                loading: false,
                columns: [
                    new Column({
                        id: UserColumnId.name,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.name,
                        disabled: false,
                        sortable: true,
                        position: 0,
                        shrink: false,
                    }),
                    new Column({
                        id: UserColumnId.email,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.email,
                        disabled: false,
                        sortable: true,
                        position: 1,
                        shrink: false,
                    }),
                    new Column({
                        id: UserColumnId.active,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.active,
                        disabled: false,
                        sortable: false,
                        position: 2,
                        shrink: true,
                    }),
                    new Column({
                        id: UserColumnId.deleted,
                        direction: SortDirection.desc,
                        label: UserColumnLabel.deleted,
                        disabled: false,
                        sortable: false,
                        position: 3,
                        shrink: true,
                    }),
                ],
                data: [],
            });
        });

        it('should be loading in non mobile mode when loading is true', () => {
            component.mobile.set(false);
            component.loading.set(true);
            fixture.detectChanges();

            expect(getListData()).toBeNull();
            expect(getTableData()).toEqual({
                loading: true,
                columns: [
                    new Column({
                        id: UserColumnId.name,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.name,
                        disabled: false,
                        sortable: true,
                        position: 0,
                        shrink: false,
                    }),
                    new Column({
                        id: UserColumnId.email,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.email,
                        disabled: false,
                        sortable: true,
                        position: 1,
                        shrink: false,
                    }),
                    new Column({
                        id: UserColumnId.active,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.active,
                        disabled: false,
                        sortable: false,
                        position: 2,
                        shrink: true,
                    }),
                    new Column({
                        id: UserColumnId.deleted,
                        direction: SortDirection.desc,
                        label: UserColumnLabel.deleted,
                        disabled: false,
                        sortable: false,
                        position: 3,
                        shrink: true,
                    }),
                ],
                data: [],
            });
        });
    });

    describe('data', () => {
        it('should pass data to the list by default', () => {
            component.users.set([
                {
                    id: '891db31e-dfb5-42ed-b912-48b98463b004',
                    name: 'User 1',
                    email: 'user1@email.com',
                    active: true,
                    deleted: false,
                },
                {
                    id: '891db31e-dfb5-42ed-b912-48b98463b005',
                    name: 'User 2',
                    email: 'user2@email.com',
                    active: false,
                    deleted: true,
                },
            ]);
            fixture.detectChanges();

            expect(getListData()).toEqual({
                loading: false,
                data: [
                    new ListItem({
                        id: '891db31e-dfb5-42ed-b912-48b98463b004',
                        icons: [
                            new ItemIcon({
                                name: Icon.checked,
                                tooltip: 'Ativo',
                                disabled: false,
                            }),
                            new ItemIcon({
                                name: Icon.checked,
                                tooltip: undefined,
                                disabled: true,
                            }),
                        ],
                        labels: [
                            new ItemLabel({
                                text: 'User 1',
                                tooltip: 'User 1',
                                disabled: false,
                            }),
                            new ItemLabel({
                                text: 'user1@email.com',
                                tooltip: 'user1@email.com',
                                disabled: false,
                            }),
                        ],
                    }),
                    new ListItem({
                        id: '891db31e-dfb5-42ed-b912-48b98463b005',
                        icons: [
                            new ItemIcon({
                                name: Icon.checked,
                                tooltip: undefined,
                                disabled: true,
                            }),
                            new ItemIcon({
                                name: Icon.checked,
                                tooltip: 'Deletado',
                                disabled: false,
                            }),
                        ],
                        labels: [
                            new ItemLabel({
                                text: 'User 2',
                                tooltip: 'User 2',
                                disabled: false,
                            }),
                            new ItemLabel({
                                text: 'user2@email.com',
                                tooltip: 'user2@email.com',
                                disabled: false,
                            }),
                        ],
                    }),
                ],
            });
            expect(getTableData()).toBeNull();
        });

        it('should pass data to the table', () => {
            component.mobile.set(false);
            component.users.set([
                {
                    id: '891db31e-dfb5-42ed-b912-48b98463b004',
                    name: 'User 1',
                    email: 'user1@email.com',
                    active: true,
                    deleted: false,
                },
                {
                    id: '891db31e-dfb5-42ed-b912-48b98463b005',
                    name: 'User 2',
                    email: 'user2@email.com',
                    active: false,
                    deleted: true,
                },
            ]);
            fixture.detectChanges();

            expect(getListData()).toBeNull();
            expect(getTableData()).toEqual({
                loading: false,
                columns: [
                    new Column({
                        id: UserColumnId.name,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.name,
                        disabled: false,
                        sortable: true,
                        position: 0,
                        shrink: false,
                    }),
                    new Column({
                        id: UserColumnId.email,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.email,
                        disabled: false,
                        sortable: true,
                        position: 1,
                        shrink: false,
                    }),
                    new Column({
                        id: UserColumnId.active,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.active,
                        disabled: false,
                        sortable: false,
                        position: 2,
                        shrink: true,
                    }),
                    new Column({
                        id: UserColumnId.deleted,
                        direction: SortDirection.desc,
                        label: UserColumnLabel.deleted,
                        disabled: false,
                        sortable: false,
                        position: 3,
                        shrink: true,
                    }),
                ],
                data: [
                    new Row({
                        id: '891db31e-dfb5-42ed-b912-48b98463b004',
                        columns: {
                            name: new ColumnData({
                                icon: undefined,
                                label: 'User 1',
                                tooltip: 'User 1',
                                disabled: false,
                            }),
                            email: new ColumnData({
                                icon: undefined,
                                label: 'user1@email.com',
                                tooltip: 'user1@email.com',
                                disabled: false,
                            }),
                            active: new ColumnData({
                                icon: Icon.checked,
                                label: undefined,
                                tooltip: 'Ativo',
                                disabled: false,
                            }),
                            deleted: new ColumnData({
                                icon: Icon.checked,
                                label: undefined,
                                tooltip: undefined,
                                disabled: true,
                            }),
                        },
                    }),
                    new Row({
                        id: '891db31e-dfb5-42ed-b912-48b98463b005',
                        columns: {
                            name: new ColumnData({
                                icon: undefined,
                                label: 'User 2',
                                tooltip: 'User 2',
                                disabled: false,
                            }),
                            email: new ColumnData({
                                icon: undefined,
                                label: 'user2@email.com',
                                tooltip: 'user2@email.com',
                                disabled: false,
                            }),
                            active: new ColumnData({
                                icon: Icon.checked,
                                label: undefined,
                                tooltip: undefined,
                                disabled: true,
                            }),
                            deleted: new ColumnData({
                                icon: Icon.checked,
                                label: undefined,
                                tooltip: 'Deletado',
                                disabled: false,
                            }),
                        },
                    }),
                ],
            });
        });
    });

    describe('sort', () => {
        it('should sort table by order', () => {
            component.mobile.set(false);
            component.users.set([
                {
                    id: '891db31e-dfb5-42ed-b912-48b98463b004',
                    name: 'User 1',
                    email: 'user1@email.com',
                    active: true,
                    deleted: false,
                },
                {
                    id: '891db31e-dfb5-42ed-b912-48b98463b005',
                    name: 'User 2',
                    email: 'user2@email.com',
                    active: false,
                    deleted: true,
                },
            ]);
            component.updateSort(UserOrder.active_asc);
            fixture.detectChanges();

            expect(getListData()).toBeNull();
            expect(getTableData()).toEqual({
                loading: false,
                columns: [
                    new Column({
                        id: UserColumnId.name,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.name,
                        disabled: false,
                        sortable: true,
                        position: 1,
                        shrink: false,
                    }),
                    new Column({
                        id: UserColumnId.email,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.email,
                        disabled: false,
                        sortable: true,
                        position: 2,
                        shrink: false,
                    }),
                    new Column({
                        id: UserColumnId.active,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.active,
                        disabled: false,
                        sortable: false,
                        position: 0,
                        shrink: true,
                    }),
                    new Column({
                        id: UserColumnId.deleted,
                        direction: SortDirection.desc,
                        label: UserColumnLabel.deleted,
                        disabled: false,
                        sortable: false,
                        position: 3,
                        shrink: true,
                    }),
                ],
                data: [
                    new Row({
                        id: '891db31e-dfb5-42ed-b912-48b98463b004',
                        columns: {
                            name: new ColumnData({
                                icon: undefined,
                                label: 'User 1',
                                tooltip: 'User 1',
                                disabled: false,
                            }),
                            email: new ColumnData({
                                icon: undefined,
                                label: 'user1@email.com',
                                tooltip: 'user1@email.com',
                                disabled: false,
                            }),
                            active: new ColumnData({
                                icon: Icon.checked,
                                label: undefined,
                                tooltip: 'Ativo',
                                disabled: false,
                            }),
                            deleted: new ColumnData({
                                icon: Icon.checked,
                                label: undefined,
                                tooltip: undefined,
                                disabled: true,
                            }),
                        },
                    }),
                    new Row({
                        id: '891db31e-dfb5-42ed-b912-48b98463b005',
                        columns: {
                            name: new ColumnData({
                                icon: undefined,
                                label: 'User 2',
                                tooltip: 'User 2',
                                disabled: false,
                            }),
                            email: new ColumnData({
                                icon: undefined,
                                label: 'user2@email.com',
                                tooltip: 'user2@email.com',
                                disabled: false,
                            }),
                            active: new ColumnData({
                                icon: Icon.checked,
                                label: undefined,
                                tooltip: undefined,
                                disabled: true,
                            }),
                            deleted: new ColumnData({
                                icon: Icon.checked,
                                label: undefined,
                                tooltip: 'Deletado',
                                disabled: false,
                            }),
                        },
                    }),
                ],
            });
        });

        it('should pass sort by array of orders to the table', () => {
            component.mobile.set(false);
            component.users.set([
                {
                    id: '891db31e-dfb5-42ed-b912-48b98463b004',
                    name: 'User 1',
                    email: 'user1@email.com',
                    active: true,
                    deleted: false,
                },
                {
                    id: '891db31e-dfb5-42ed-b912-48b98463b005',
                    name: 'User 2',
                    email: 'user2@email.com',
                    active: false,
                    deleted: true,
                },
            ]);
            fixture.detectChanges();
            component.updateSort([UserOrder.active_asc, UserOrder.name_desc]);
            fixture.detectChanges();

            expect(getListData()).toBeNull();
            expect(getTableData()).toEqual({
                loading: false,
                columns: [
                    new Column({
                        id: UserColumnId.name,
                        direction: SortDirection.desc,
                        label: UserColumnLabel.name,
                        disabled: false,
                        sortable: true,
                        position: 1,
                        shrink: false,
                    }),
                    new Column({
                        id: UserColumnId.email,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.email,
                        disabled: false,
                        sortable: true,
                        position: 2,
                        shrink: false,
                    }),
                    new Column({
                        id: UserColumnId.active,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.active,
                        disabled: false,
                        sortable: false,
                        position: 0,
                        shrink: true,
                    }),
                    new Column({
                        id: UserColumnId.deleted,
                        direction: SortDirection.desc,
                        label: UserColumnLabel.deleted,
                        disabled: false,
                        sortable: false,
                        position: 3,
                        shrink: true,
                    }),
                ],
                data: [
                    new Row({
                        id: '891db31e-dfb5-42ed-b912-48b98463b004',
                        columns: {
                            name: new ColumnData({
                                icon: undefined,
                                label: 'User 1',
                                tooltip: 'User 1',
                                disabled: false,
                            }),
                            email: new ColumnData({
                                icon: undefined,
                                label: 'user1@email.com',
                                tooltip: 'user1@email.com',
                                disabled: false,
                            }),
                            active: new ColumnData({
                                icon: Icon.checked,
                                label: undefined,
                                tooltip: 'Ativo',
                                disabled: false,
                            }),
                            deleted: new ColumnData({
                                icon: Icon.checked,
                                label: undefined,
                                tooltip: undefined,
                                disabled: true,
                            }),
                        },
                    }),
                    new Row({
                        id: '891db31e-dfb5-42ed-b912-48b98463b005',
                        columns: {
                            name: new ColumnData({
                                icon: undefined,
                                label: 'User 2',
                                tooltip: 'User 2',
                                disabled: false,
                            }),
                            email: new ColumnData({
                                icon: undefined,
                                label: 'user2@email.com',
                                tooltip: 'user2@email.com',
                                disabled: false,
                            }),
                            active: new ColumnData({
                                icon: Icon.checked,
                                label: undefined,
                                tooltip: undefined,
                                disabled: true,
                            }),
                            deleted: new ColumnData({
                                icon: Icon.checked,
                                label: undefined,
                                tooltip: 'Deletado',
                                disabled: false,
                            }),
                        },
                    }),
                ],
            });
        });

        it('should pass sort by column id to the table', () => {
            component.mobile.set(false);
            component.users.set([
                {
                    id: '891db31e-dfb5-42ed-b912-48b98463b004',
                    name: 'User 1',
                    email: 'user1@email.com',
                    active: true,
                    deleted: false,
                },
                {
                    id: '891db31e-dfb5-42ed-b912-48b98463b005',
                    name: 'User 2',
                    email: 'user2@email.com',
                    active: false,
                    deleted: true,
                },
            ]);
            fixture.detectChanges();
            component.updateSort(UserColumnId.email);
            fixture.detectChanges();

            expect(getListData()).toBeNull();
            expect(getTableData()).toEqual({
                loading: false,
                columns: [
                    new Column({
                        id: UserColumnId.name,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.name,
                        disabled: false,
                        sortable: true,
                        position: 1,
                        shrink: false,
                    }),
                    new Column({
                        id: UserColumnId.email,
                        direction: SortDirection.desc,
                        label: UserColumnLabel.email,
                        disabled: false,
                        sortable: true,
                        position: 0,
                        shrink: false,
                    }),
                    new Column({
                        id: UserColumnId.active,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.active,
                        disabled: false,
                        sortable: false,
                        position: 2,
                        shrink: true,
                    }),
                    new Column({
                        id: UserColumnId.deleted,
                        direction: SortDirection.desc,
                        label: UserColumnLabel.deleted,
                        disabled: false,
                        sortable: false,
                        position: 3,
                        shrink: true,
                    }),
                ],
                data: [
                    new Row({
                        id: '891db31e-dfb5-42ed-b912-48b98463b004',
                        columns: {
                            name: new ColumnData({
                                icon: undefined,
                                label: 'User 1',
                                tooltip: 'User 1',
                                disabled: false,
                            }),
                            email: new ColumnData({
                                icon: undefined,
                                label: 'user1@email.com',
                                tooltip: 'user1@email.com',
                                disabled: false,
                            }),
                            active: new ColumnData({
                                icon: Icon.checked,
                                label: undefined,
                                tooltip: 'Ativo',
                                disabled: false,
                            }),
                            deleted: new ColumnData({
                                icon: Icon.checked,
                                label: undefined,
                                tooltip: undefined,
                                disabled: true,
                            }),
                        },
                    }),
                    new Row({
                        id: '891db31e-dfb5-42ed-b912-48b98463b005',
                        columns: {
                            name: new ColumnData({
                                icon: undefined,
                                label: 'User 2',
                                tooltip: 'User 2',
                                disabled: false,
                            }),
                            email: new ColumnData({
                                icon: undefined,
                                label: 'user2@email.com',
                                tooltip: 'user2@email.com',
                                disabled: false,
                            }),
                            active: new ColumnData({
                                icon: Icon.checked,
                                label: undefined,
                                tooltip: undefined,
                                disabled: true,
                            }),
                            deleted: new ColumnData({
                                icon: Icon.checked,
                                label: undefined,
                                tooltip: 'Deletado',
                                disabled: false,
                            }),
                        },
                    }),
                ],
            });
        });

        it('should pass sort by undefined to the table', () => {
            component.mobile.set(false);
            component.users.set([
                {
                    id: '891db31e-dfb5-42ed-b912-48b98463b004',
                    name: 'User 1',
                    email: 'user1@email.com',
                    active: true,
                    deleted: false,
                },
                {
                    id: '891db31e-dfb5-42ed-b912-48b98463b005',
                    name: 'User 2',
                    email: 'user2@email.com',
                    active: false,
                    deleted: true,
                },
            ]);
            fixture.detectChanges();
            component.updateSort(undefined);
            fixture.detectChanges();

            expect(getListData()).toBeNull();
            expect(getTableData()).toEqual({
                loading: false,
                columns: [
                    new Column({
                        id: UserColumnId.name,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.name,
                        disabled: false,
                        sortable: true,
                        position: 0,
                        shrink: false,
                    }),
                    new Column({
                        id: UserColumnId.email,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.email,
                        disabled: false,
                        sortable: true,
                        position: 1,
                        shrink: false,
                    }),
                    new Column({
                        id: UserColumnId.active,
                        direction: SortDirection.asc,
                        label: UserColumnLabel.active,
                        disabled: false,
                        sortable: false,
                        position: 2,
                        shrink: true,
                    }),
                    new Column({
                        id: UserColumnId.deleted,
                        direction: SortDirection.desc,
                        label: UserColumnLabel.deleted,
                        disabled: false,
                        sortable: false,
                        position: 3,
                        shrink: true,
                    }),
                ],
                data: [
                    new Row({
                        id: '891db31e-dfb5-42ed-b912-48b98463b004',
                        columns: {
                            name: new ColumnData({
                                icon: undefined,
                                label: 'User 1',
                                tooltip: 'User 1',
                                disabled: false,
                            }),
                            email: new ColumnData({
                                icon: undefined,
                                label: 'user1@email.com',
                                tooltip: 'user1@email.com',
                                disabled: false,
                            }),
                            active: new ColumnData({
                                icon: Icon.checked,
                                label: undefined,
                                tooltip: 'Ativo',
                                disabled: false,
                            }),
                            deleted: new ColumnData({
                                icon: Icon.checked,
                                label: undefined,
                                tooltip: undefined,
                                disabled: true,
                            }),
                        },
                    }),
                    new Row({
                        id: '891db31e-dfb5-42ed-b912-48b98463b005',
                        columns: {
                            name: new ColumnData({
                                icon: undefined,
                                label: 'User 2',
                                tooltip: 'User 2',
                                disabled: false,
                            }),
                            email: new ColumnData({
                                icon: undefined,
                                label: 'user2@email.com',
                                tooltip: 'user2@email.com',
                                disabled: false,
                            }),
                            active: new ColumnData({
                                icon: Icon.checked,
                                label: undefined,
                                tooltip: undefined,
                                disabled: true,
                            }),
                            deleted: new ColumnData({
                                icon: Icon.checked,
                                label: undefined,
                                tooltip: 'Deletado',
                                disabled: false,
                            }),
                        },
                    }),
                ],
            });
        });
    });

    describe('sortable', () => {
        describe('active', () => {
            it("should set table's active column as not sortable when active filter is not defined", () => {
                component.mobile.set(false);
                fixture.detectChanges();

                expect(getListData()).toBeNull();
                expect(getTableData()).toEqual({
                    loading: false,
                    columns: [
                        new Column({
                            id: UserColumnId.name,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.name,
                            disabled: false,
                            sortable: true,
                            position: 0,
                            shrink: false,
                        }),
                        new Column({
                            id: UserColumnId.email,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.email,
                            disabled: false,
                            sortable: true,
                            position: 1,
                            shrink: false,
                        }),
                        new Column({
                            id: UserColumnId.active,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.active,
                            disabled: false,
                            sortable: false,
                            position: 2,
                            shrink: true,
                        }),
                        new Column({
                            id: UserColumnId.deleted,
                            direction: SortDirection.desc,
                            label: UserColumnLabel.deleted,
                            disabled: false,
                            sortable: false,
                            position: 3,
                            shrink: true,
                        }),
                    ],
                    data: [],
                });
            });

            it("should set table's active column as not sortable when active filter is 'active'", () => {
                component.mobile.set(false);
                component.active.set(ActiveFilter.active);
                fixture.detectChanges();

                expect(getListData()).toBeNull();
                expect(getTableData()).toEqual({
                    loading: false,
                    columns: [
                        new Column({
                            id: UserColumnId.name,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.name,
                            disabled: false,
                            sortable: true,
                            position: 0,
                            shrink: false,
                        }),
                        new Column({
                            id: UserColumnId.email,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.email,
                            disabled: false,
                            sortable: true,
                            position: 1,
                            shrink: false,
                        }),
                        new Column({
                            id: UserColumnId.active,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.active,
                            disabled: false,
                            sortable: false,
                            position: 2,
                            shrink: true,
                        }),
                        new Column({
                            id: UserColumnId.deleted,
                            direction: SortDirection.desc,
                            label: UserColumnLabel.deleted,
                            disabled: false,
                            sortable: false,
                            position: 3,
                            shrink: true,
                        }),
                    ],
                    data: [],
                });
            });

            it("should set table's active column as not sortable when active filter is 'inactive'", () => {
                component.mobile.set(false);
                component.active.set(ActiveFilter.inactive);
                fixture.detectChanges();

                expect(getListData()).toBeNull();
                expect(getTableData()).toEqual({
                    loading: false,
                    columns: [
                        new Column({
                            id: UserColumnId.name,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.name,
                            disabled: false,
                            sortable: true,
                            position: 0,
                            shrink: false,
                        }),
                        new Column({
                            id: UserColumnId.email,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.email,
                            disabled: false,
                            sortable: true,
                            position: 1,
                            shrink: false,
                        }),
                        new Column({
                            id: UserColumnId.active,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.active,
                            disabled: false,
                            sortable: false,
                            position: 2,
                            shrink: true,
                        }),
                        new Column({
                            id: UserColumnId.deleted,
                            direction: SortDirection.desc,
                            label: UserColumnLabel.deleted,
                            disabled: false,
                            sortable: false,
                            position: 3,
                            shrink: true,
                        }),
                    ],
                    data: [],
                });
            });

            it("should set table's active column as sortable when active filter is 'all'", () => {
                component.mobile.set(false);
                component.active.set(ActiveFilter.all);
                fixture.detectChanges();

                expect(getListData()).toBeNull();
                expect(getTableData()).toEqual({
                    loading: false,
                    columns: [
                        new Column({
                            id: UserColumnId.name,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.name,
                            disabled: false,
                            sortable: true,
                            position: 0,
                            shrink: false,
                        }),
                        new Column({
                            id: UserColumnId.email,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.email,
                            disabled: false,
                            sortable: true,
                            position: 1,
                            shrink: false,
                        }),
                        new Column({
                            id: UserColumnId.active,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.active,
                            disabled: false,
                            sortable: true,
                            position: 2,
                            shrink: true,
                        }),
                        new Column({
                            id: UserColumnId.deleted,
                            direction: SortDirection.desc,
                            label: UserColumnLabel.deleted,
                            disabled: false,
                            sortable: false,
                            position: 3,
                            shrink: true,
                        }),
                    ],
                    data: [],
                });
            });
        });

        describe('deleted', () => {
            it("should set table's deletede column as not sortable when deleted filter is not defined", () => {
                component.mobile.set(false);
                fixture.detectChanges();

                expect(getListData()).toBeNull();
                expect(getTableData()).toEqual({
                    loading: false,
                    columns: [
                        new Column({
                            id: UserColumnId.name,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.name,
                            disabled: false,
                            sortable: true,
                            position: 0,
                            shrink: false,
                        }),
                        new Column({
                            id: UserColumnId.email,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.email,
                            disabled: false,
                            sortable: true,
                            position: 1,
                            shrink: false,
                        }),
                        new Column({
                            id: UserColumnId.active,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.active,
                            disabled: false,
                            sortable: false,
                            position: 2,
                            shrink: true,
                        }),
                        new Column({
                            id: UserColumnId.deleted,
                            direction: SortDirection.desc,
                            label: UserColumnLabel.deleted,
                            disabled: false,
                            sortable: false,
                            position: 3,
                            shrink: true,
                        }),
                    ],
                    data: [],
                });
            });

            it("should set table's deleted column as not sortable when deleted filter is 'deleted'", () => {
                component.mobile.set(false);
                component.deleted.set(DeletedFilter.deleted);
                fixture.detectChanges();

                expect(getListData()).toBeNull();
                expect(getTableData()).toEqual({
                    loading: false,
                    columns: [
                        new Column({
                            id: UserColumnId.name,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.name,
                            disabled: false,
                            sortable: true,
                            position: 0,
                            shrink: false,
                        }),
                        new Column({
                            id: UserColumnId.email,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.email,
                            disabled: false,
                            sortable: true,
                            position: 1,
                            shrink: false,
                        }),
                        new Column({
                            id: UserColumnId.active,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.active,
                            disabled: false,
                            sortable: false,
                            position: 2,
                            shrink: true,
                        }),
                        new Column({
                            id: UserColumnId.deleted,
                            direction: SortDirection.desc,
                            label: UserColumnLabel.deleted,
                            disabled: false,
                            sortable: false,
                            position: 3,
                            shrink: true,
                        }),
                    ],
                    data: [],
                });
            });

            it("should set table's deleted column as not sortable when deleted filter is 'not_deleted'", () => {
                component.mobile.set(false);
                component.deleted.set(DeletedFilter.not_deleted);
                fixture.detectChanges();

                expect(getListData()).toBeNull();
                expect(getTableData()).toEqual({
                    loading: false,
                    columns: [
                        new Column({
                            id: UserColumnId.name,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.name,
                            disabled: false,
                            sortable: true,
                            position: 0,
                            shrink: false,
                        }),
                        new Column({
                            id: UserColumnId.email,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.email,
                            disabled: false,
                            sortable: true,
                            position: 1,
                            shrink: false,
                        }),
                        new Column({
                            id: UserColumnId.active,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.active,
                            disabled: false,
                            sortable: false,
                            position: 2,
                            shrink: true,
                        }),
                        new Column({
                            id: UserColumnId.deleted,
                            direction: SortDirection.desc,
                            label: UserColumnLabel.deleted,
                            disabled: false,
                            sortable: false,
                            position: 3,
                            shrink: true,
                        }),
                    ],
                    data: [],
                });
            });

            it("should set table's deleted column as sortable when deleted filter is 'all'", () => {
                component.mobile.set(false);
                component.deleted.set(DeletedFilter.all);
                fixture.detectChanges();

                expect(getListData()).toBeNull();
                expect(getTableData()).toEqual({
                    loading: false,
                    columns: [
                        new Column({
                            id: UserColumnId.name,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.name,
                            disabled: false,
                            sortable: true,
                            position: 0,
                            shrink: false,
                        }),
                        new Column({
                            id: UserColumnId.email,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.email,
                            disabled: false,
                            sortable: true,
                            position: 1,
                            shrink: false,
                        }),
                        new Column({
                            id: UserColumnId.active,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.active,
                            disabled: false,
                            sortable: false,
                            position: 2,
                            shrink: true,
                        }),
                        new Column({
                            id: UserColumnId.deleted,
                            direction: SortDirection.desc,
                            label: UserColumnLabel.deleted,
                            disabled: false,
                            sortable: true,
                            position: 3,
                            shrink: true,
                        }),
                    ],
                    data: [],
                });
            });
        });
    });

    describe('events', () => {
        beforeEach(() => {
            spyOn(component.headerClick, 'emit');
            spyOn(component.itemClick, 'emit');
        });

        describe('list', () => {
            it('should delegate list item click event', () => {
                component.mobile.set(true);
                component.users.set([
                    {
                        id: '891db31e-dfb5-42ed-b912-48b98463b004',
                        name: 'User 1',
                        email: 'user1@email.com',
                        active: true,
                        deleted: false,
                    },
                    {
                        id: '891db31e-dfb5-42ed-b912-48b98463b005',
                        name: 'User 2',
                        email: 'user2@email.com',
                        active: false,
                        deleted: true,
                    },
                ]);
                fixture.detectChanges();

                const list = getList()!;
                list.itemClick.emit('891db31e-dfb5-42ed-b912-48b98463b004');
                fixture.detectChanges();
                expect(component.itemClick.emit)
                    .withContext('list item click event called')
                    .toHaveBeenCalledWith(
                        '891db31e-dfb5-42ed-b912-48b98463b004',
                    );

                fixture.detectChanges();

                expect(getListData()).toEqual({
                    loading: false,
                    data: [
                        new ListItem({
                            id: '891db31e-dfb5-42ed-b912-48b98463b004',
                            icons: [
                                new ItemIcon({
                                    name: Icon.checked,
                                    tooltip: 'Ativo',
                                    disabled: false,
                                }),
                                new ItemIcon({
                                    name: Icon.checked,
                                    tooltip: undefined,
                                    disabled: true,
                                }),
                            ],
                            labels: [
                                new ItemLabel({
                                    text: 'User 1',
                                    tooltip: 'User 1',
                                    disabled: false,
                                }),
                                new ItemLabel({
                                    text: 'user1@email.com',
                                    tooltip: 'user1@email.com',
                                    disabled: false,
                                }),
                            ],
                        }),
                        new ListItem({
                            id: '891db31e-dfb5-42ed-b912-48b98463b005',
                            icons: [
                                new ItemIcon({
                                    name: Icon.checked,
                                    tooltip: undefined,
                                    disabled: true,
                                }),
                                new ItemIcon({
                                    name: Icon.checked,
                                    tooltip: 'Deletado',
                                    disabled: false,
                                }),
                            ],
                            labels: [
                                new ItemLabel({
                                    text: 'User 2',
                                    tooltip: 'User 2',
                                    disabled: false,
                                }),
                                new ItemLabel({
                                    text: 'user2@email.com',
                                    tooltip: 'user2@email.com',
                                    disabled: false,
                                }),
                            ],
                        }),
                    ],
                });
                expect(getTableData()).toBeNull();
            });
        });

        describe('table', () => {
            it('should delegate table header click event', () => {
                component.mobile.set(false);
                component.users.set([
                    {
                        id: '891db31e-dfb5-42ed-b912-48b98463b004',
                        name: 'User 1',
                        email: 'user1@email.com',
                        active: true,
                        deleted: false,
                    },
                    {
                        id: '891db31e-dfb5-42ed-b912-48b98463b005',
                        name: 'User 2',
                        email: 'user2@email.com',
                        active: false,
                        deleted: true,
                    },
                ]);
                fixture.detectChanges();

                const table = getTable()!;
                table.headerClick.emit('name_asc');
                fixture.detectChanges();
                expect(component.headerClick.emit)
                    .withContext('header click event called')
                    .toHaveBeenCalledWith();

                fixture.detectChanges();

                expect(getListData()).toBeNull();
                expect(getTableData()).toEqual({
                    loading: false,
                    columns: [
                        new Column({
                            id: UserColumnId.name,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.name,
                            disabled: false,
                            sortable: true,
                            position: 0,
                            shrink: false,
                        }),
                        new Column({
                            id: UserColumnId.email,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.email,
                            disabled: false,
                            sortable: true,
                            position: 1,
                            shrink: false,
                        }),
                        new Column({
                            id: UserColumnId.active,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.active,
                            disabled: false,
                            sortable: false,
                            position: 2,
                            shrink: true,
                        }),
                        new Column({
                            id: UserColumnId.deleted,
                            direction: SortDirection.desc,
                            label: UserColumnLabel.deleted,
                            disabled: false,
                            sortable: false,
                            position: 3,
                            shrink: true,
                        }),
                    ],
                    data: [
                        new Row({
                            id: '891db31e-dfb5-42ed-b912-48b98463b004',
                            columns: {
                                name: new ColumnData({
                                    icon: undefined,
                                    label: 'User 1',
                                    tooltip: 'User 1',
                                    disabled: false,
                                }),
                                email: new ColumnData({
                                    icon: undefined,
                                    label: 'user1@email.com',
                                    tooltip: 'user1@email.com',
                                    disabled: false,
                                }),
                                active: new ColumnData({
                                    icon: Icon.checked,
                                    label: undefined,
                                    tooltip: 'Ativo',
                                    disabled: false,
                                }),
                                deleted: new ColumnData({
                                    icon: Icon.checked,
                                    label: undefined,
                                    tooltip: undefined,
                                    disabled: true,
                                }),
                            },
                        }),
                        new Row({
                            id: '891db31e-dfb5-42ed-b912-48b98463b005',
                            columns: {
                                name: new ColumnData({
                                    icon: undefined,
                                    label: 'User 2',
                                    tooltip: 'User 2',
                                    disabled: false,
                                }),
                                email: new ColumnData({
                                    icon: undefined,
                                    label: 'user2@email.com',
                                    tooltip: 'user2@email.com',
                                    disabled: false,
                                }),
                                active: new ColumnData({
                                    icon: Icon.checked,
                                    label: undefined,
                                    tooltip: undefined,
                                    disabled: true,
                                }),
                                deleted: new ColumnData({
                                    icon: Icon.checked,
                                    label: undefined,
                                    tooltip: 'Deletado',
                                    disabled: false,
                                }),
                            },
                        }),
                    ],
                });
            });

            it('should delegate table row click event', () => {
                component.mobile.set(false);
                component.users.set([
                    {
                        id: '891db31e-dfb5-42ed-b912-48b98463b004',
                        name: 'User 1',
                        email: 'user1@email.com',
                        active: true,
                        deleted: false,
                    },
                    {
                        id: '891db31e-dfb5-42ed-b912-48b98463b005',
                        name: 'User 2',
                        email: 'user2@email.com',
                        active: false,
                        deleted: true,
                    },
                ]);
                fixture.detectChanges();

                const table = getTable()!;
                table.rowClick.emit(UserOrder.active_desc);
                fixture.detectChanges();
                expect(component.itemClick.emit)
                    .withContext('table row click event called')
                    .toHaveBeenCalledWith(UserOrder.active_desc);

                fixture.detectChanges();

                expect(getListData()).toBeNull();
                expect(getTableData()).toEqual({
                    loading: false,
                    columns: [
                        new Column({
                            id: UserColumnId.name,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.name,
                            disabled: false,
                            sortable: true,
                            position: 0,
                            shrink: false,
                        }),
                        new Column({
                            id: UserColumnId.email,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.email,
                            disabled: false,
                            sortable: true,
                            position: 1,
                            shrink: false,
                        }),
                        new Column({
                            id: UserColumnId.active,
                            direction: SortDirection.asc,
                            label: UserColumnLabel.active,
                            disabled: false,
                            sortable: false,
                            position: 2,
                            shrink: true,
                        }),
                        new Column({
                            id: UserColumnId.deleted,
                            direction: SortDirection.desc,
                            label: UserColumnLabel.deleted,
                            disabled: false,
                            sortable: false,
                            position: 3,
                            shrink: true,
                        }),
                    ],
                    data: [
                        new Row({
                            id: '891db31e-dfb5-42ed-b912-48b98463b004',
                            columns: {
                                name: new ColumnData({
                                    icon: undefined,
                                    label: 'User 1',
                                    tooltip: 'User 1',
                                    disabled: false,
                                }),
                                email: new ColumnData({
                                    icon: undefined,
                                    label: 'user1@email.com',
                                    tooltip: 'user1@email.com',
                                    disabled: false,
                                }),
                                active: new ColumnData({
                                    icon: Icon.checked,
                                    label: undefined,
                                    tooltip: 'Ativo',
                                    disabled: false,
                                }),
                                deleted: new ColumnData({
                                    icon: Icon.checked,
                                    label: undefined,
                                    tooltip: undefined,
                                    disabled: true,
                                }),
                            },
                        }),
                        new Row({
                            id: '891db31e-dfb5-42ed-b912-48b98463b005',
                            columns: {
                                name: new ColumnData({
                                    icon: undefined,
                                    label: 'User 2',
                                    tooltip: 'User 2',
                                    disabled: false,
                                }),
                                email: new ColumnData({
                                    icon: undefined,
                                    label: 'user2@email.com',
                                    tooltip: 'user2@email.com',
                                    disabled: false,
                                }),
                                active: new ColumnData({
                                    icon: Icon.checked,
                                    label: undefined,
                                    tooltip: undefined,
                                    disabled: true,
                                }),
                                deleted: new ColumnData({
                                    icon: Icon.checked,
                                    label: undefined,
                                    tooltip: 'Deletado',
                                    disabled: false,
                                }),
                            },
                        }),
                    ],
                });
            });
        });
    });
});

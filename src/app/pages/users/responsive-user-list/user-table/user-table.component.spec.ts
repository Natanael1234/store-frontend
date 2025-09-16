import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { HeaderItemComponent } from '../../../../components/table/header-item/header-item.component';
import { SortDirection } from '../../../../enums/direction/direction.enum';
import { RowClickEvent } from '../../../../interfaces/row-click.interface';
import { UserResponseDto } from '../../../../services/user/dtos/user.response/user.response.dto';
import { UserOrder } from '../../../../services/user/enums/user-order/user-order.enum';
import { UserColumnId } from './enums/user-column-id/user-column-id.enum';
import { UserColumnLabel } from './enums/user-column-name/user-column-label.enum';
import { UserTableRow } from './interfaces/user-table-row.interface';
import { _testUserTableData as testData } from './test/data/user-table-data.test';
import { _getUserTableComponentHeaderItem as getHeaderItem } from './test/getter/user-table-get-table-header-item.test';
import { _getUserTableComponentExpectedRows as getExpectedRows } from './test/getter/user-table-get-table-row-item.test';
import { MockHeaderItemComponent } from './test/mock/header-item-component.mock';
import { _testUserTableComponentHeaderClickEvent as testHeaderClickEvent } from './test/test/table-component-header-click-event.test';
import { _testUserTableComponentUpdateSortEvent as testUpdateSortEvent } from './test/test/test-user-table-component-update-sort-event.test';
import { _testUserTableRowClickEvent as testRowClickEvent } from './test/test/test-user-table-row-click-event';
import { _testUserTableComponentHeader as testHeader } from './test/test/user-table-component-table-header-item.test';
import { _ExpectedTableHeaderItem as ExpectedHeaderItem } from './test/types/expected-table-header-item.type.test';
import { UserTableComponent } from './user-table.component';

describe('UserTableComponent', () => {
    let component: UserTableComponent;
    let fixture: ComponentFixture<UserTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [],
            imports: [
                MatTableModule,
                MatSortModule,
                MatIconModule,
                MatTooltipModule,
                UserTableComponent,
                MockHeaderItemComponent,
            ],
        }).overrideComponent(UserTableComponent, {
            remove: { imports: [HeaderItemComponent] },
            add: { imports: [MockHeaderItemComponent] },
        });
        fixture = TestBed.createComponent(UserTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        spyOn(component.updateSort, 'emit');
        spyOn(component.headerClick, 'emit');
        spyOn(component.rowClick, 'emit');
    });

    function testEvents(events: {
        updateSort?: UserOrder[] | false;
        headerClick?: UserOrder[] | false;
        rowClick?: RowClickEvent<UserTableRow> | false;
    }) {
        testUpdateSortEvent(component, events.updateSort || false);
        testHeaderClickEvent(component, events.headerClick || false);
        testRowClickEvent(component, events.rowClick || false);
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('headers', () => {
        it('should render table headers', () => {
            component.users.set([]);
            fixture.detectChanges();
            const expectedHeaders: ExpectedHeaderItem[] = [
                {
                    id: UserColumnId.name,
                    label: UserColumnLabel.name,
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: UserColumnId.email,
                    label: UserColumnLabel.email,
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: UserColumnId.active,
                    label: UserColumnLabel.active,
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: UserColumnId.deleted,
                    label: UserColumnLabel.deleted,
                    direction: SortDirection.desc,
                    sortable: true,
                    disabled: false,
                },
            ];
            testHeader(fixture, expectedHeaders);
        });

        it('should render not disabled headers by default', () => {
            component.users.set([]);
            fixture.detectChanges();

            const expectedHeaders: ExpectedHeaderItem[] = [
                {
                    id: UserColumnId.name,
                    label: UserColumnLabel.name,
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: UserColumnId.email,
                    label: UserColumnLabel.email,
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: UserColumnId.active,
                    label: UserColumnLabel.active,
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: UserColumnId.deleted,
                    label: UserColumnLabel.deleted,
                    direction: SortDirection.desc,
                    sortable: true,
                    disabled: false,
                },
            ];
            testHeader(fixture, expectedHeaders);
        });

        it('should render not disabled headers when loading is false', () => {
            component.loading.set(false);
            component.users.set([]);
            fixture.detectChanges();

            const expectedHeaders: ExpectedHeaderItem[] = [
                {
                    id: UserColumnId.name,
                    label: UserColumnLabel.name,
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: UserColumnId.email,
                    label: UserColumnLabel.email,
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: UserColumnId.active,
                    label: UserColumnLabel.active,
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: UserColumnId.deleted,
                    label: UserColumnLabel.deleted,
                    direction: SortDirection.desc,
                    sortable: true,
                    disabled: false,
                },
            ];
            testHeader(fixture, expectedHeaders);
        });

        it('should render disabled headers when loading is true', () => {
            component.loading.set(true);
            component.users.set([]);
            fixture.detectChanges();

            const expectedHeaders: ExpectedHeaderItem[] = [
                {
                    id: UserColumnId.name,
                    label: UserColumnLabel.name,
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: true,
                },
                {
                    id: UserColumnId.email,
                    label: UserColumnLabel.email,
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: true,
                },
                {
                    id: UserColumnId.active,
                    label: UserColumnLabel.active,
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: true,
                },
                {
                    id: UserColumnId.deleted,
                    label: UserColumnLabel.deleted,
                    direction: SortDirection.desc,
                    sortable: true,
                    disabled: true,
                },
            ];
            testHeader(fixture, expectedHeaders);
        });

        describe('name', () => {
            it('table should fire update sort event when name header emmits onSelect event', () => {
                component.users.set([]);
                const headerItem = getHeaderItem(fixture, UserColumnId.name);
                headerItem.onSelect.emit({
                    columnId: UserColumnId.name,
                    direction: SortDirection.desc,
                });
                fixture.detectChanges();

                const expectedHeaders: ExpectedHeaderItem[] = [
                    {
                        id: UserColumnId.name,
                        label: UserColumnLabel.name,
                        direction: SortDirection.desc,
                        sortable: true,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.email,
                        label: UserColumnLabel.email,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.active,
                        label: UserColumnLabel.active,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.deleted,
                        label: UserColumnLabel.deleted,
                        direction: SortDirection.desc,
                        sortable: true,
                        disabled: false,
                    },
                ];
                testHeader(fixture, expectedHeaders);
                testEvents({
                    headerClick: [
                        UserOrder.name_desc,
                        UserOrder.email_asc,
                        UserOrder.active_asc,
                        UserOrder.deleted_desc,
                    ],
                    rowClick: false,
                });
            });

            it('table should not fire update sort event when name header emmits onSelect event while loading', () => {
                component.users.set([]);
                component.loading.set(true);
                const headerItem = getHeaderItem(fixture, UserColumnId.name);
                headerItem.onSelect.emit({
                    columnId: UserColumnId.name,
                    direction: SortDirection.desc,
                });
                fixture.detectChanges();

                const expectedHeaders = [
                    {
                        id: UserColumnId.name,
                        label: UserColumnLabel.name,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: true,
                    },
                    {
                        id: UserColumnId.email,
                        label: UserColumnLabel.email,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: true,
                    },
                    {
                        id: UserColumnId.active,
                        label: UserColumnLabel.active,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: true,
                    },
                    {
                        id: UserColumnId.deleted,
                        label: UserColumnLabel.deleted,
                        direction: SortDirection.desc,
                        sortable: true,
                        disabled: true,
                    },
                ];
                testHeader(fixture, expectedHeaders);
                testEvents({
                    updateSort: false,
                    headerClick: false,
                    rowClick: false,
                });
            });
        });

        describe('email', () => {
            it('table should fire update sort event when name email emmits onSelect event', () => {
                component.users.set([]);
                const headerItem = getHeaderItem(fixture, UserColumnId.email);
                headerItem.onSelect.emit({
                    columnId: UserColumnId.email,
                    direction: SortDirection.desc,
                });
                fixture.detectChanges();

                const expectedHeaders: ExpectedHeaderItem[] = [
                    {
                        id: UserColumnId.name,
                        label: UserColumnLabel.name,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.email,
                        label: UserColumnLabel.email,
                        direction: SortDirection.desc,
                        sortable: true,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.active,
                        label: UserColumnLabel.active,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.deleted,
                        label: UserColumnLabel.deleted,
                        direction: SortDirection.desc,
                        sortable: true,
                        disabled: false,
                    },
                ];
                testHeader(fixture, expectedHeaders);
                testEvents({
                    updateSort: false,
                    headerClick: [
                        UserOrder.email_desc,
                        UserOrder.name_asc,
                        UserOrder.active_asc,
                        UserOrder.deleted_desc,
                    ],
                    rowClick: false,
                });
            });

            it('table should not fire update sort event when email header emmits onSelect event while loading', () => {
                component.users.set([]);
                component.loading.set(true);
                const headerItem = getHeaderItem(fixture, UserColumnId.email);
                headerItem.onSelect.emit({
                    columnId: UserColumnId.email,
                    direction: SortDirection.desc,
                });
                fixture.detectChanges();

                const expectedHeaders: ExpectedHeaderItem[] = [
                    {
                        id: UserColumnId.name,
                        label: UserColumnLabel.name,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: true,
                    },
                    {
                        id: UserColumnId.email,
                        label: UserColumnLabel.email,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: true,
                    },
                    {
                        id: UserColumnId.active,
                        label: UserColumnLabel.active,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: true,
                    },
                    {
                        id: UserColumnId.deleted,
                        label: UserColumnLabel.deleted,
                        direction: SortDirection.desc,
                        sortable: true,
                        disabled: true,
                    },
                ];
                testHeader(fixture, expectedHeaders);
                testEvents({
                    updateSort: false,
                    headerClick: false,
                    rowClick: false,
                });
            });
        });

        describe('active', () => {
            it('active sort should be not disabled when activeSortEnabled is not defined', () => {
                component.users.set([]);
                const headerItem = getHeaderItem(fixture, UserColumnId.active);
                headerItem.onSelect.emit({
                    columnId: UserColumnId.active,
                    direction: SortDirection.desc,
                });
                fixture.detectChanges();

                const expectedHeaders: ExpectedHeaderItem[] = [
                    {
                        id: UserColumnId.name,
                        label: UserColumnLabel.name,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.email,
                        label: UserColumnLabel.email,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.active,
                        label: UserColumnLabel.active,
                        direction: SortDirection.desc,
                        sortable: true,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.deleted,
                        label: UserColumnLabel.deleted,
                        direction: SortDirection.desc,
                        sortable: true,
                        disabled: false,
                    },
                ];
                testHeader(fixture, expectedHeaders);
                testEvents({
                    updateSort: false,
                    headerClick: [
                        UserOrder.active_desc,
                        UserOrder.name_asc,
                        UserOrder.email_asc,
                        UserOrder.deleted_desc,
                    ],
                    rowClick: false,
                });
            });

            it('active sort should be not disabled when activeSortEnabled is true', () => {
                component.activeSortEnabled.set(true);
                component.users.set([]);
                const headerItem = getHeaderItem(fixture, UserColumnId.active);
                headerItem.onSelect.emit({
                    columnId: UserColumnId.active,
                    direction: SortDirection.desc,
                });
                fixture.detectChanges();

                const expectedHeaders: ExpectedHeaderItem[] = [
                    {
                        id: UserColumnId.name,
                        label: UserColumnLabel.name,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.email,
                        label: UserColumnLabel.email,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.active,
                        label: UserColumnLabel.active,
                        direction: SortDirection.desc,
                        sortable: true,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.deleted,
                        label: UserColumnLabel.deleted,
                        direction: SortDirection.desc,
                        sortable: true,
                        disabled: false,
                    },
                ];
                testHeader(fixture, expectedHeaders);
                testEvents({
                    updateSort: false,
                    headerClick: [
                        UserOrder.active_desc,
                        UserOrder.name_asc,
                        UserOrder.email_asc,
                        UserOrder.deleted_desc,
                    ],
                    rowClick: false,
                });
            });

            it('active sort should be disabled when activeSortEnabled is false', () => {
                component.activeSortEnabled.set(false);
                component.users.set([]);
                const headerItem = getHeaderItem(fixture, UserColumnId.active);
                headerItem.onSelect.emit({
                    columnId: UserColumnId.active,
                    direction: SortDirection.desc,
                });
                fixture.detectChanges();

                const expectedHeaders: ExpectedHeaderItem[] = [
                    {
                        id: UserColumnId.name,
                        label: UserColumnLabel.name,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.email,
                        label: UserColumnLabel.email,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.active,
                        label: UserColumnLabel.active,
                        direction: SortDirection.asc,
                        sortable: false,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.deleted,
                        label: UserColumnLabel.deleted,
                        direction: SortDirection.desc,
                        sortable: true,
                        disabled: false,
                    },
                ];
                testHeader(fixture, expectedHeaders);
                testEvents({
                    updateSort: false,
                    headerClick: false,
                    rowClick: false,
                });
            });

            it('active sort should be disabled while loading and activeSortEnabled is true', () => {
                component.loading.set(true);
                component.activeSortEnabled.set(true);
                const headerItem = getHeaderItem(fixture, UserColumnId.active);
                headerItem.onSelect.emit({
                    columnId: UserColumnId.active,
                    direction: SortDirection.desc,
                });
                fixture.detectChanges();

                const expectedHeaders: ExpectedHeaderItem[] = [
                    {
                        id: UserColumnId.name,
                        label: UserColumnLabel.name,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: true,
                    },
                    {
                        id: UserColumnId.email,
                        label: UserColumnLabel.email,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: true,
                    },
                    {
                        id: UserColumnId.active,
                        label: UserColumnLabel.active,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: true,
                    },
                    {
                        id: UserColumnId.deleted,
                        label: UserColumnLabel.deleted,
                        direction: SortDirection.desc,
                        sortable: true,
                        disabled: true,
                    },
                ];
                testHeader(fixture, expectedHeaders);
                testEvents({
                    updateSort: false,
                    headerClick: false,
                    rowClick: false,
                });
            });

            it('active sort should be disabled while loading', () => {
                component.loading.set(true);
                const headerItem = getHeaderItem(fixture, UserColumnId.active);
                headerItem.onSelect.emit({
                    columnId: UserColumnId.active,
                    direction: SortDirection.desc,
                });
                fixture.detectChanges();

                const expectedHeaders: ExpectedHeaderItem[] = [
                    {
                        id: UserColumnId.name,
                        label: UserColumnLabel.name,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: true,
                    },
                    {
                        id: UserColumnId.email,
                        label: UserColumnLabel.email,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: true,
                    },
                    {
                        id: UserColumnId.active,
                        label: UserColumnLabel.active,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: true,
                    },
                    {
                        id: UserColumnId.deleted,
                        label: UserColumnLabel.deleted,
                        direction: SortDirection.desc,
                        sortable: true,
                        disabled: true,
                    },
                ];
                testHeader(fixture, expectedHeaders);
                testEvents({
                    updateSort: false,
                    headerClick: false,
                    rowClick: false,
                });
            });
        });

        describe('deleted', () => {
            it('deleted sort should be not disabled when deletedSortEnabled is not defined', () => {
                component.users.set([]);
                const headerItem = getHeaderItem(fixture, UserColumnId.deleted);
                headerItem.onSelect.emit({
                    columnId: UserColumnId.deleted,
                    direction: SortDirection.desc,
                });
                fixture.detectChanges();

                const expectedHeaders: ExpectedHeaderItem[] = [
                    {
                        id: UserColumnId.name,
                        label: UserColumnLabel.name,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.email,
                        label: UserColumnLabel.email,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.active,
                        label: UserColumnLabel.active,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.deleted,
                        label: UserColumnLabel.deleted,
                        direction: SortDirection.desc,
                        sortable: true,
                        disabled: false,
                    },
                ];
                testHeader(fixture, expectedHeaders);
                testEvents({
                    updateSort: false,
                    headerClick: [
                        UserOrder.deleted_desc,
                        UserOrder.name_asc,
                        UserOrder.email_asc,
                        UserOrder.active_asc,
                    ],
                    rowClick: false,
                });
            });

            it('deleted sort should be not disabled when deletedSortEnabled is true', () => {
                component.deletedSortEnabled.set(true);
                component.users.set([]);
                const headerItem = getHeaderItem(fixture, UserColumnId.deleted);
                headerItem.onSelect.emit({
                    columnId: UserColumnId.deleted,
                    direction: SortDirection.desc,
                });
                fixture.detectChanges();

                const expectedHeaders: ExpectedHeaderItem[] = [
                    {
                        id: UserColumnId.name,
                        label: UserColumnLabel.name,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.email,
                        label: UserColumnLabel.email,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.active,
                        label: UserColumnLabel.active,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.deleted,
                        label: UserColumnLabel.deleted,
                        direction: SortDirection.desc,
                        sortable: true,
                        disabled: false,
                    },
                ];
                testHeader(fixture, expectedHeaders);
                testEvents({
                    updateSort: false,
                    headerClick: [
                        UserOrder.deleted_desc,
                        UserOrder.name_asc,
                        UserOrder.email_asc,
                        UserOrder.active_asc,
                    ],
                    rowClick: false,
                });
            });

            it('deleted sort should be disabled when deletedSortEnabled is false', () => {
                component.deletedSortEnabled.set(false);
                component.users.set([]);
                const headerItem = getHeaderItem(fixture, UserColumnId.deleted);
                headerItem.onSelect.emit({
                    columnId: UserColumnId.deleted,
                    direction: SortDirection.desc,
                });
                fixture.detectChanges();

                const expectedHeaders: ExpectedHeaderItem[] = [
                    {
                        id: UserColumnId.name,
                        label: UserColumnLabel.name,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.email,
                        label: UserColumnLabel.email,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.active,
                        label: UserColumnLabel.active,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: false,
                    },
                    {
                        id: UserColumnId.deleted,
                        label: UserColumnLabel.deleted,
                        direction: SortDirection.desc,
                        sortable: false,
                        disabled: false,
                    },
                ];
                testHeader(fixture, expectedHeaders);
                testEvents({
                    updateSort: false,
                    headerClick: false,
                    rowClick: false,
                });
            });

            it('deleted sort should be disabled while loading and deletedSortEnabled is true', () => {
                component.loading.set(true);
                component.deletedSortEnabled.set(true);
                const headerItem = getHeaderItem(fixture, UserColumnId.deleted);
                headerItem.onSelect.emit({
                    columnId: UserColumnId.deleted,
                    direction: SortDirection.desc,
                });
                fixture.detectChanges();

                const expectedHeaders: ExpectedHeaderItem[] = [
                    {
                        id: UserColumnId.name,
                        label: UserColumnLabel.name,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: true,
                    },
                    {
                        id: UserColumnId.email,
                        label: UserColumnLabel.email,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: true,
                    },
                    {
                        id: UserColumnId.active,
                        label: UserColumnLabel.active,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: true,
                    },
                    {
                        id: UserColumnId.deleted,
                        label: UserColumnLabel.deleted,
                        direction: SortDirection.desc,
                        sortable: true,
                        disabled: true,
                    },
                ];
                testHeader(fixture, expectedHeaders);
                testEvents({
                    updateSort: false,
                    headerClick: false,
                    rowClick: false,
                });
            });

            it('deleted sort should be disabled while loading', () => {
                component.loading.set(true);

                const headerItem = getHeaderItem(fixture, UserColumnId.deleted);
                headerItem.onSelect.emit({
                    columnId: UserColumnId.deleted,
                    direction: SortDirection.desc,
                });
                fixture.detectChanges();

                const expectedHeaders: ExpectedHeaderItem[] = [
                    {
                        id: UserColumnId.name,
                        label: UserColumnLabel.name,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: true,
                    },
                    {
                        id: UserColumnId.email,
                        label: UserColumnLabel.email,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: true,
                    },
                    {
                        id: UserColumnId.active,
                        label: UserColumnLabel.active,
                        direction: SortDirection.asc,
                        sortable: true,
                        disabled: true,
                    },
                    {
                        id: UserColumnId.deleted,
                        label: UserColumnLabel.deleted,
                        direction: SortDirection.desc,
                        sortable: true,
                        disabled: true,
                    },
                ];
                testHeader(fixture, expectedHeaders);
                testEvents({
                    updateSort: false,
                    headerClick: false,
                    rowClick: false,
                });
            });
        });
    });

    describe('rows', () => {
        it('should render table rows', () => {
            component.loading.set(false);
            const users: UserResponseDto[] = [
                {
                    id: '0f06c8d6-a598-466a-bd0d-e56861ba4659',
                    name: 'User 11',
                    email: 'user11@email.com',
                    active: true,
                    created: '2025-04-08T10:30:00.000Z',
                    updated: '2025-04-08T11:30:00.000Z',
                    deletedAt: null,
                },
                {
                    id: 'e1edd9a4-35e9-41d8-bc5b-0d5154777963',
                    name: 'User 12',
                    email: 'user12@email.com',
                    active: false,
                    created: '2025-04-08T12:30:00.000Z',
                    updated: '2025-04-08T13:30:00.000Z',
                    deletedAt: '2025-04-08T15:30:00.000Z',
                },
            ];
            component.users.set(users);
            fixture.detectChanges();

            const expectedRows = getExpectedRows(users, false);
            testData(fixture, expectedRows, false);
        });

        describe('loading', () => {
            it('should render rows loading when loading is true', () => {
                component.activeSortEnabled.set(false);
                component.deletedSortEnabled.set(true);
                component.loading.set(true);
                const users: UserResponseDto[] = [
                    {
                        id: '0f06c8d6-a598-466a-bd0d-e56861ba4659',
                        name: 'User 11',
                        email: 'user11@email.com',
                        active: true,
                        created: '2025-04-08T10:30:00.000Z',
                        updated: '2025-04-08T11:30:00.000Z',
                        deletedAt: null,
                    },
                ];
                component.users.set(users);
                fixture.detectChanges();

                const expectedRows = getExpectedRows(users, true);
                testData(fixture, expectedRows, true);
            });

            it('should render rows not loading while loading is undefined', () => {
                component.activeSortEnabled.set(undefined);
                component.deletedSortEnabled.set(true);
                component.loading.set(false);
                const users: UserResponseDto[] = [
                    {
                        id: '0f06c8d6-a598-466a-bd0d-e56861ba4659',
                        name: 'User 11',
                        email: 'user11@email.com',
                        active: true,
                        created: '2025-04-08T10:30:00.000Z',
                        updated: '2025-04-08T11:30:00.000Z',
                        deletedAt: null,
                    },
                ];
                component.users.set(users);
                fixture.detectChanges();

                const expectedRows = getExpectedRows(users, false);
                testData(fixture, expectedRows, false);
            });

            it('should render rows not loading while loading is false', () => {
                component.activeSortEnabled.set(false);
                component.deletedSortEnabled.set(true);
                component.loading.set(false);
                const users: UserResponseDto[] = [
                    {
                        id: '0f06c8d6-a598-466a-bd0d-e56861ba4659',
                        name: 'User 11',
                        email: 'user11@email.com',
                        active: true,
                        created: '2025-04-08T10:30:00.000Z',
                        updated: '2025-04-08T11:30:00.000Z',
                        deletedAt: null,
                    },
                ];
                component.users.set(users);
                fixture.detectChanges();

                const expectedRows = getExpectedRows(users, false);
                testData(fixture, expectedRows, false);
            });

            it('should fire row click event', () => {
                const users: UserResponseDto[] = [
                    {
                        id: '0f06c8d6-a598-466a-bd0d-e56861ba4659',
                        name: 'User 11',
                        email: 'user11@email.com',
                        active: true,
                        created: '2025-04-08T10:30:00.000Z',
                        updated: '2025-04-08T11:30:00.000Z',
                        deletedAt: null,
                    },
                ];
                component.users.set(users);
                fixture.detectChanges();

                const debugElements = fixture.debugElement.queryAll(
                    By.css('tr.mat-row'),
                );
                debugElements[0].nativeElement.click();

                expect(component.rowClick.emit)
                    .withContext('row click event called')
                    .toHaveBeenCalledTimes(1);
            });

            it('should not fire row click event while loading', () => {
                const users: UserResponseDto[] = [
                    {
                        id: '0f06c8d6-a598-466a-bd0d-e56861ba4659',
                        name: 'User 11',
                        email: 'user11@email.com',
                        active: true,
                        created: '2025-04-08T10:30:00.000Z',
                        updated: '2025-04-08T11:30:00.000Z',
                        deletedAt: null,
                    },
                ];
                component.users.set(users);
                component.loading.set(true);
                fixture.detectChanges();

                const debugElements = fixture.debugElement.queryAll(
                    By.css('tr.mat-row'),
                );
                debugElements[0].nativeElement.click();

                testUpdateSortEvent(component, false);
                testHeaderClickEvent(component, false);
                testRowClickEvent(component, false);
            });
        });
    });

    describe('sort', () => {
        it('sort by user order', () => {
            component.sort.set(UserOrder.name_desc);
            fixture.detectChanges();

            const expectedHeaders: ExpectedHeaderItem[] = [
                {
                    id: UserColumnId.name,
                    label: UserColumnLabel.name,
                    direction: SortDirection.desc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: UserColumnId.email,
                    label: UserColumnLabel.email,
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: UserColumnId.active,
                    label: UserColumnLabel.active,
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: UserColumnId.deleted,
                    label: UserColumnLabel.deleted,
                    direction: SortDirection.desc,
                    sortable: true,
                    disabled: false,
                },
            ];
            testHeader(fixture, expectedHeaders);
            testEvents({
                updateSort: [
                    UserOrder.name_desc,
                    UserOrder.email_asc,
                    UserOrder.active_asc,
                    UserOrder.deleted_desc,
                ],
                headerClick: false,
                rowClick: false,
            });
        });

        it('sort by user order array', () => {
            component.sort.set([
                UserOrder.active_desc,
                UserOrder.deleted_asc,
                UserOrder.email_desc,
                UserOrder.name_desc,
            ]);
            fixture.detectChanges();

            testEvents({
                updateSort: [
                    UserOrder.active_desc,
                    UserOrder.deleted_asc,
                    UserOrder.email_desc,
                    UserOrder.name_desc,
                ],
                headerClick: false,
                rowClick: false,
            });
            const expectedHeaders: ExpectedHeaderItem[] = [
                {
                    id: UserColumnId.name,
                    label: UserColumnLabel.name,
                    direction: SortDirection.desc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: UserColumnId.email,
                    label: UserColumnLabel.email,
                    direction: SortDirection.desc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: UserColumnId.active,
                    label: UserColumnLabel.active,
                    direction: SortDirection.desc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: UserColumnId.deleted,
                    label: UserColumnLabel.deleted,
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                },
            ];
            testHeader(fixture, expectedHeaders);
        });

        it('sort by column id', () => {
            component.sort.set(UserColumnId.email);
            fixture.detectChanges();

            testEvents({
                updateSort: [
                    UserOrder.email_desc,
                    UserOrder.name_asc,
                    UserOrder.active_asc,
                    UserOrder.deleted_desc,
                ],
                headerClick: false,
                rowClick: false,
            });
            const expectedHeaders: ExpectedHeaderItem[] = [
                {
                    id: UserColumnId.name,
                    label: UserColumnLabel.name,
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: UserColumnId.email,
                    label: UserColumnLabel.email,
                    direction: SortDirection.desc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: UserColumnId.active,
                    label: UserColumnLabel.active,
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: UserColumnId.deleted,
                    label: UserColumnLabel.deleted,
                    direction: SortDirection.desc,
                    sortable: true,
                    disabled: false,
                },
            ];
            testHeader(fixture, expectedHeaders);
        });

        it('not sort when undefned', () => {
            component.sort.set(undefined);
            fixture.detectChanges();

            testEvents({
                updateSort: false,
                headerClick: false,
                rowClick: false,
            });
            const expectedHeaders: ExpectedHeaderItem[] = [
                {
                    id: UserColumnId.name,
                    label: UserColumnLabel.name,
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: UserColumnId.email,
                    label: UserColumnLabel.email,
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: UserColumnId.active,
                    label: UserColumnLabel.active,
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: UserColumnId.deleted,
                    label: UserColumnLabel.deleted,
                    direction: SortDirection.desc,
                    sortable: true,
                    disabled: false,
                },
            ];
            testHeader(fixture, expectedHeaders);
        });
    });
});

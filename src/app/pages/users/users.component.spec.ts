import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { of, Subject, throwError } from 'rxjs';
import { AlertComponent } from '../../components/alert/alert.component';
import { MockAlertComponent } from '../../components/alert/test/mock/alert.component.mock';
import { ActiveFilter } from '../../enums/active-filter/active-filter.enum';
import { DeletedFilter } from '../../enums/deleted-filter/deleted-filter.enum';
import { Role } from '../../services/user/dtos/role/role.enum';
import { UserOrder } from '../../services/user/enums/user-order/user-order.enum';
import { UserService } from '../../services/user/user.service';
import { ResponsiveUserFiltersComponent } from './responsive-user-filters/responsive-user-filters.component';
import { MockResponsiveUserFiltersComponent } from './responsive-user-filters/test/mock/responsive-users-filter.component.mock';
import { ResponsiveUserListComponent } from './responsive-user-list/responsive-user-list.component';
import { MockUserResponsiveListComponent } from './responsive-user-list/test/mocks/user-responsive-list.component.mock';
import { _usersComponentPayloadsData } from './tests/data/payloads.data';
import { _usersComponentResponsesData } from './tests/data/responses.data';
import { _usersComponentRowsData } from './tests/data/rows.data';
import { _usersComponentUsersData } from './tests/data/users.data';
import { _testUserscomponentGetUsersCalls } from './tests/tests/get-users-calls.test';
import { _testUsersComponentHeaderClickEvent } from './tests/tests/users-component-header-click.test';
import { _testUsersComponentItemClickEvent } from './tests/tests/users-component-item-click-event.test';
import { _testUsersComponentRefreshFilter } from './tests/tests/users-component-item-refresh-filter.test';
import { _testUsersComponent } from './tests/tests/users-component.test';
import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
    let fixture: ComponentFixture<UsersComponent>;
    let component: UsersComponent;
    let userServiceSpy: jasmine.SpyObj<UserService>;

    let mockBreakpointObserver: jasmine.SpyObj<BreakpointObserver>;
    let breakpointSubject: Subject<BreakpointState>;

    let listMock: ResponsiveUserListComponent;
    let filtersMock: ResponsiveUserFiltersComponent;
    let paginator: MatPaginator;

    beforeEach(async () => {
        const spy = jasmine.createSpyObj('UserService', [
            'getUsers',
            'getUser',
            'saveUser',
        ]);

        breakpointSubject = new Subject<BreakpointState>();
        mockBreakpointObserver = jasmine.createSpyObj('BreakpointObserver', [
            'observe',
        ]);
        mockBreakpointObserver.observe.and.returnValue(
            breakpointSubject.asObservable(),
        );

        await TestBed.configureTestingModule({
            imports: [
                UsersComponent,
                FormsModule,
                ReactiveFormsModule,
                MatIconModule,
                MatInputModule,
                MatFormFieldModule,
                MatButtonModule,
                MatCheckboxModule,

                MatCardModule,
                // AlertComponent,
                MockAlertComponent,
                MockResponsiveUserFiltersComponent,
                MockUserResponsiveListComponent,

                MatProgressBarModule,
            ],
            providers: [
                provideAnimationsAsync(),
                {
                    provide: UserService,
                    useValue: spy,
                },
                {
                    provide: BreakpointObserver,
                    useValue: mockBreakpointObserver,
                },
            ],
        })
            .overrideComponent(AlertComponent, {
                remove: { imports: [AlertComponent] },
                add: { imports: [MockAlertComponent] },
            })
            .overrideComponent(ResponsiveUserFiltersComponent, {
                remove: { imports: [ResponsiveUserFiltersComponent] },
                add: { imports: [MockResponsiveUserFiltersComponent] },
            })
            .overrideComponent(ResponsiveUserListComponent, {
                remove: { imports: [ResponsiveUserListComponent] },
                add: { imports: [MockUserResponsiveListComponent] },
            })
            .compileComponents();

        // users component
        fixture = TestBed.createComponent(UsersComponent);

        userServiceSpy = TestBed.inject(
            UserService,
        ) as jasmine.SpyObj<UserService>;

        component = fixture.componentInstance;

        // responsive filters component
        filtersMock = fixture.debugElement.query(
            By.directive(ResponsiveUserFiltersComponent),
        ).componentInstance as ResponsiveUserFiltersComponent;
        spyOn(filtersMock.refresh, 'emit').and.callThrough();

        // responsive list component
        listMock = fixture.debugElement.query(
            By.directive(ResponsiveUserListComponent),
        ).componentInstance as ResponsiveUserListComponent;
        spyOn(listMock.headerClick, 'emit').and.callThrough();
        spyOn(listMock.itemClick, 'emit').and.callThrough();

        // paginator component
        paginator = fixture.debugElement.query(By.directive(MatPaginator))
            .componentInstance as MatPaginator;
        spyOn(paginator.page, 'emit').and.callThrough();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
    });

    describe('mobile', () => {
        it('should render user list component', async () => {
            const paginatedResponse = of(_usersComponentResponsesData[0]);
            breakpointSubject.next({ matches: true, breakpoints: {} });
            userServiceSpy.getUsers.and
                .returnValue(paginatedResponse)
                .and.returnValue(paginatedResponse);

            fixture.detectChanges();
            _testUsersComponent(fixture, {
                error: undefined,
                mobile: true,
                loading: false,
                pageIndex: _usersComponentPayloadsData[0].page! - 1,
                pageSize: _usersComponentPayloadsData[0].pageSize!,
                rows: _usersComponentRowsData,
                textQuery: _usersComponentPayloadsData[0].textQuery!,
                orderBy: _usersComponentPayloadsData[0].orderBy!,
                active: _usersComponentPayloadsData[0].active!,
                deleted: _usersComponentPayloadsData[0].deleted!,
                length: _usersComponentUsersData.length,
            });

            expect();
        });

        it('should render alert when mobile', () => {
            userServiceSpy.getUsers.and.returnValue(
                throwError(
                    () =>
                        new HttpErrorResponse({
                            status: 404,
                            statusText: 'Not Found',
                            error: { message: 'Item not found' },
                        }),
                ),
            );
            breakpointSubject.next({ matches: true, breakpoints: {} });
            fixture.detectChanges();

            _testUsersComponent(fixture, {
                error: 'Erro ao buscar usuários close',
                mobile: true,
                loading: false,
                pageIndex: _usersComponentPayloadsData[0].page! - 1,
                pageSize: _usersComponentPayloadsData[0].pageSize!,
                rows: [],
                textQuery: _usersComponentPayloadsData[0].textQuery!,
                orderBy: _usersComponentPayloadsData[0].orderBy!,
                active: _usersComponentPayloadsData[0].active!,
                deleted: _usersComponentPayloadsData[0].deleted!,
                length: 0,
            });
        });
    });

    describe('desktop', () => {
        it('should render user list component', () => {
            const paginatedResponse = of(_usersComponentResponsesData[0]);
            userServiceSpy.getUsers.and.returnValue(paginatedResponse);
            fixture.detectChanges();
            breakpointSubject.next({ matches: false, breakpoints: {} });
            fixture.detectChanges();

            _testUsersComponent(fixture, {
                error: undefined,
                mobile: false,
                loading: false,
                pageIndex: 0,
                pageSize: 12,
                rows: _usersComponentRowsData,
                textQuery: '',
                orderBy: [
                    UserOrder.name_asc,
                    UserOrder.email_asc,
                    UserOrder.active_asc,
                    UserOrder.deleted_desc,
                ],
                active: ActiveFilter.active,
                deleted: DeletedFilter.not_deleted,
                length: _usersComponentUsersData.length,
            });
        });

        it('should render alert when not mobile', () => {
            userServiceSpy.getUsers.and.returnValue(
                throwError(
                    () =>
                        new HttpErrorResponse({
                            status: 404,
                            statusText: 'Not Found',
                            error: { message: 'Item not found' },
                        }),
                ),
            );
            fixture.detectChanges();
            breakpointSubject.next({ matches: false, breakpoints: {} });
            fixture.detectChanges();

            _testUsersComponent(fixture, {
                error: 'Erro ao buscar usuários close',
                mobile: false,
                loading: false,
                pageIndex: 0,
                pageSize: 12,
                rows: [],
                textQuery: '',
                orderBy: [
                    UserOrder.name_asc,
                    UserOrder.email_asc,
                    UserOrder.active_asc,
                    UserOrder.deleted_desc,
                ],
                active: ActiveFilter.active,
                deleted: DeletedFilter.not_deleted,
                length: 0,
            });
        });
    });

    describe('received events', () => {
        describe('alert', () => {
            it('should handle close alert event', () => {
                userServiceSpy.getUsers.and.returnValue(
                    throwError(
                        () =>
                            new HttpErrorResponse({
                                status: 404,
                                statusText: 'Not Found',
                                error: { message: 'Item not found' },
                            }),
                    ),
                );
                fixture.detectChanges();
                breakpointSubject.next({ matches: false, breakpoints: {} });
                listMock.updateSort([
                    UserOrder.name_asc,
                    UserOrder.email_asc,
                    UserOrder.active_asc,
                    UserOrder.deleted_desc,
                ]);
                fixture.detectChanges();

                const alert = fixture.debugElement.query(
                    By.directive(AlertComponent),
                ).componentInstance as AlertComponent;
                alert.onClose.emit();
                fixture.detectChanges();

                _testUsersComponent(fixture, {
                    error: undefined,
                    mobile: false,
                    loading: false,
                    pageIndex: 0,
                    pageSize: 12,
                    rows: [],
                    textQuery: '',
                    orderBy: [
                        UserOrder.name_asc,
                        UserOrder.email_asc,
                        UserOrder.active_asc,
                        UserOrder.deleted_desc,
                    ],
                    active: ActiveFilter.active,
                    deleted: DeletedFilter.not_deleted,
                    length: 0,
                });
            });
        });

        describe("filter's refresh", () => {
            it('should handle refresh filters event', () => {
                userServiceSpy.getUsers.and
                    .returnValue(
                        of({
                            textQuery: '',
                            orderBy: [
                                UserOrder.name_asc,
                                UserOrder.email_asc,
                                UserOrder.active_asc,
                                UserOrder.deleted_desc,
                            ],
                            results: [
                                {
                                    id: '891db31e-dfb5-42ed-b912-48b98463b004',
                                    name: 'User 1',
                                    email: 'user1@email.com',
                                    roles: [Role.admin],
                                    active: true,
                                    created: '2025-04-08T12:30:00.000Z',
                                    updated: '2025-04-08T13:30:00.000Z',
                                    deletedAt: null,
                                },
                                {
                                    id: '891db31e-dfb5-42ed-b912-48b98463b005',
                                    name: 'User 2',
                                    email: 'user2@email.com',
                                    roles: [Role.admin],
                                    active: true,
                                    created: '2025-04-08T12:30:00.000Z',
                                    updated: '2025-04-08T13:30:00.000Z',
                                    deletedAt: '2025-04-08T15:30:00.000Z',
                                },
                                {
                                    id: '891db31e-dfb5-42ed-b912-48b98463b006',
                                    name: 'User 3',
                                    email: 'user3@email.com',
                                    roles: [Role.admin],
                                    active: false,
                                    created: '2025-04-08T12:30:00.000Z',
                                    updated: '2025-04-08T13:30:00.000Z',
                                    deletedAt: null,
                                },
                            ],
                            count: 3,
                            page: 1,
                            pageSize: 12,
                        }),
                    )
                    .and.returnValue(
                        of({
                            textQuery: 'test',
                            orderBy: [
                                UserOrder.active_desc,
                                UserOrder.name_asc,
                                UserOrder.email_asc,
                                UserOrder.deleted_desc,
                            ],
                            results: [
                                {
                                    id: '891db31e-dfb5-42ed-b912-48b98463b005',
                                    name: 'User 2',
                                    email: 'user2@email.com',
                                    roles: [Role.admin],
                                    active: true,
                                    created: '2025-04-08T12:30:00.000Z',
                                    updated: '2025-04-08T13:30:00.000Z',
                                    deletedAt: '2025-04-08T15:30:00.000Z',
                                },
                            ],
                            count: 1,
                            page: 2,
                            pageSize: 2,
                        }),
                    );
                breakpointSubject.next({ matches: false, breakpoints: {} });
                fixture.detectChanges();
                filtersMock.refresh.emit({
                    textQuery: 'test',
                    order: UserOrder.active_desc,
                    active: ActiveFilter.all,
                    deleted: DeletedFilter.all,
                });
                fixture.detectChanges();

                _testUsersComponentRefreshFilter(fixture, {
                    textQuery: 'test',
                    orderBy: [
                        UserOrder.active_desc,
                        UserOrder.name_asc,
                        UserOrder.email_asc,
                        UserOrder.deleted_desc,
                    ],
                    active: ActiveFilter.all,
                    deleted: DeletedFilter.all,
                });

                _testUserscomponentGetUsersCalls(userServiceSpy, [
                    {
                        textQuery: '',
                        active: ActiveFilter.active,
                        deleted: DeletedFilter.not_deleted,
                        orderBy: [
                            UserOrder.name_asc,
                            UserOrder.email_asc,
                            UserOrder.active_asc,
                            UserOrder.deleted_desc,
                        ],
                        page: 1,
                        pageSize: 12,
                    },
                    {
                        textQuery: 'test',
                        active: ActiveFilter.all,
                        deleted: DeletedFilter.all,
                        orderBy: [
                            UserOrder.active_desc,
                            UserOrder.name_asc,
                            UserOrder.email_asc,
                            UserOrder.deleted_desc,
                        ],
                        page: 2,
                        pageSize: 2,
                    },
                ]);
            });

            it('should not update refresh filters when refresh event param is false', () => {
                userServiceSpy.getUsers.and.returnValue(
                    of({
                        textQuery: '',
                        orderBy: [
                            UserOrder.name_asc,
                            UserOrder.email_asc,
                            UserOrder.active_asc,
                            UserOrder.deleted_desc,
                        ],
                        results: [
                            {
                                id: '891db31e-dfb5-42ed-b912-48b98463b004',
                                name: 'User 1',
                                email: 'user1@email.com',
                                roles: [Role.admin],
                                active: true,
                                created: '2025-04-08T12:30:00.000Z',
                                updated: '2025-04-08T13:30:00.000Z',
                                deletedAt: null,
                            },
                            {
                                id: '891db31e-dfb5-42ed-b912-48b98463b005',
                                name: 'User 2',
                                email: 'user2@email.com',
                                roles: [Role.admin],
                                active: true,
                                created: '2025-04-08T12:30:00.000Z',
                                updated: '2025-04-08T13:30:00.000Z',
                                deletedAt: '2025-04-08T15:30:00.000Z',
                            },
                            {
                                id: '891db31e-dfb5-42ed-b912-48b98463b006',
                                name: 'User 3',
                                email: 'user3@email.com',
                                roles: [Role.admin],
                                active: false,
                                created: '2025-04-08T12:30:00.000Z',
                                updated: '2025-04-08T13:30:00.000Z',
                                deletedAt: null,
                            },
                        ],
                        count: 3,
                        page: 1,
                        pageSize: 12,
                    }),
                );
                breakpointSubject.next({ matches: false, breakpoints: {} });
                // filters.refresh.emit(false);
                fixture.detectChanges();
                filtersMock.refresh.emit(false);
                fixture.detectChanges();

                _testUserscomponentGetUsersCalls(userServiceSpy, [
                    {
                        textQuery: '',
                        active: ActiveFilter.active,
                        deleted: DeletedFilter.not_deleted,
                        orderBy: [
                            UserOrder.name_asc,
                            UserOrder.email_asc,
                            UserOrder.active_asc,
                            UserOrder.deleted_desc,
                        ],
                        page: 1,
                        pageSize: 12,
                    },
                ]);

                // default values
                _testUsersComponentRefreshFilter(fixture, {
                    textQuery: '',
                    active: ActiveFilter.active,
                    deleted: DeletedFilter.not_deleted,
                    orderBy: [
                        UserOrder.name_asc,
                        UserOrder.email_asc,
                        UserOrder.active_asc,
                        UserOrder.deleted_desc,
                    ],
                });
            });
        });

        describe('header click', () => {
            it('should handle header click event', () => {
                userServiceSpy.getUsers.and
                    .returnValue(
                        of({
                            textQuery: '',
                            orderBy: [
                                UserOrder.name_asc,
                                UserOrder.email_asc,
                                UserOrder.active_asc,
                                UserOrder.deleted_desc,
                            ],
                            results: [
                                {
                                    id: '891db31e-dfb5-42ed-b912-48b98463b004',
                                    name: 'User 1',
                                    email: 'user1@email.com',
                                    roles: [Role.admin],
                                    active: true,
                                    created: '2025-04-08T12:30:00.000Z',
                                    updated: '2025-04-08T13:30:00.000Z',
                                    deletedAt: null,
                                },
                                {
                                    id: '891db31e-dfb5-42ed-b912-48b98463b005',
                                    name: 'User 2',
                                    email: 'user2@email.com',
                                    roles: [Role.admin],
                                    active: true,
                                    created: '2025-04-08T12:30:00.000Z',
                                    updated: '2025-04-08T13:30:00.000Z',
                                    deletedAt: '2025-04-08T15:30:00.000Z',
                                },
                                {
                                    id: '891db31e-dfb5-42ed-b912-48b98463b006',
                                    name: 'User 3',
                                    email: 'user3@email.com',
                                    roles: [Role.admin],
                                    active: false,
                                    created: '2025-04-08T12:30:00.000Z',
                                    updated: '2025-04-08T13:30:00.000Z',
                                    deletedAt: null,
                                },
                            ],
                            count: 3,
                            page: 1,
                            pageSize: 12,
                        }),
                    )
                    .and.returnValue(
                        of({
                            textQuery: 'test',
                            orderBy: [
                                UserOrder.active_desc,
                                UserOrder.name_asc,
                                UserOrder.email_asc,
                                UserOrder.deleted_desc,
                            ],
                            results: [
                                {
                                    id: '891db31e-dfb5-42ed-b912-48b98463b005',
                                    name: 'User 2',
                                    email: 'user2@email.com',
                                    roles: [Role.admin],
                                    active: true,
                                    created: '2025-04-08T12:30:00.000Z',
                                    updated: '2025-04-08T13:30:00.000Z',
                                    deletedAt: '2025-04-08T15:30:00.000Z',
                                },
                            ],
                            count: 1,
                            page: 2,
                            pageSize: 2,
                        }),
                    );
                breakpointSubject.next({ matches: false, breakpoints: {} });
                fixture.detectChanges();
                listMock.headerClick.emit([
                    UserOrder.active_desc,
                    UserOrder.name_asc,
                    UserOrder.email_asc,
                    UserOrder.deleted_desc,
                ]);
                fixture.detectChanges();

                _testUsersComponentHeaderClickEvent(
                    fixture,
                    [
                        [
                            UserOrder.active_desc,
                            UserOrder.name_asc,
                            UserOrder.email_asc,
                            UserOrder.deleted_desc,
                        ],
                    ],
                    [
                        UserOrder.active_desc,
                        UserOrder.name_asc,
                        UserOrder.email_asc,
                        UserOrder.deleted_desc,
                    ],
                );
            });
        });

        describe('row click', () => {
            it('should handle row click event', () => {
                userServiceSpy.getUsers.and.returnValue(
                    of({
                        textQuery: '',
                        orderBy: [
                            UserOrder.name_asc,
                            UserOrder.email_asc,
                            UserOrder.active_asc,
                            UserOrder.deleted_desc,
                        ],
                        results: [
                            {
                                id: '891db31e-dfb5-42ed-b912-48b98463b004',
                                name: 'User 1',
                                email: 'user1@email.com',
                                roles: [Role.admin],
                                active: true,
                                created: '2025-04-08T12:30:00.000Z',
                                updated: '2025-04-08T13:30:00.000Z',
                                deletedAt: null,
                            },
                            {
                                id: '891db31e-dfb5-42ed-b912-48b98463b005',
                                name: 'User 2',
                                email: 'user2@email.com',
                                roles: [Role.admin],
                                active: true,
                                created: '2025-04-08T12:30:00.000Z',
                                updated: '2025-04-08T13:30:00.000Z',
                                deletedAt: '2025-04-08T15:30:00.000Z',
                            },
                        ],
                        count: 3,
                        page: 1,
                        pageSize: 2,
                    }),
                );
                breakpointSubject.next({ matches: false, breakpoints: {} });
                listMock.itemClick.emit('891db31e-dfb5-42ed-b912-48b98463b004');
                fixture.detectChanges();

                _testUsersComponentItemClickEvent(fixture, [
                    { userId: '891db31e-dfb5-42ed-b912-48b98463b004' },
                ]);
            });
        });

        describe('pagination', () => {
            it('should paginate', () => {
                userServiceSpy.getUsers.and
                    .returnValue(
                        of({
                            textQuery: '',
                            orderBy: [
                                UserOrder.name_asc,
                                UserOrder.email_asc,
                                UserOrder.active_asc,
                                UserOrder.deleted_desc,
                            ],
                            results: [
                                {
                                    id: '891db31e-dfb5-42ed-b912-48b98463b004',
                                    name: 'User 1',
                                    email: 'user1@email.com',
                                    roles: [Role.admin],
                                    active: true,
                                    created: '2025-04-08T12:30:00.000Z',
                                    updated: '2025-04-08T13:30:00.000Z',
                                    deletedAt: null,
                                },
                                {
                                    id: '891db31e-dfb5-42ed-b912-48b98463b005',
                                    name: 'User 2',
                                    email: 'user2@email.com',
                                    roles: [Role.admin],
                                    active: true,
                                    created: '2025-04-08T12:30:00.000Z',
                                    updated: '2025-04-08T13:30:00.000Z',
                                    deletedAt: '2025-04-08T15:30:00.000Z',
                                },
                            ],
                            count: 3,
                            page: 1,
                            pageSize: 12,
                        }),
                    )
                    .and.returnValue(
                        of({
                            textQuery: '',
                            orderBy: [
                                UserOrder.name_asc,
                                UserOrder.email_asc,
                                UserOrder.active_asc,
                                UserOrder.deleted_desc,
                            ],
                            results: [
                                {
                                    id: '891db31e-dfb5-42ed-b912-48b98463b006',
                                    name: 'User 3',
                                    email: 'user3@email.com',
                                    roles: [Role.admin],
                                    active: false,
                                    created: '2025-04-08T12:30:00.000Z',
                                    updated: '2025-04-08T13:30:00.000Z',
                                    deletedAt: null,
                                },
                            ],
                            count: 3,
                            page: 2,
                            pageSize: 12,
                        }),
                    );
                fixture.detectChanges();

                const pageEvent = new PageEvent();
                pageEvent.pageIndex = 1;
                pageEvent.length = 3;
                pageEvent.pageSize = 12;
                pageEvent.previousPageIndex = 0;
                paginator.page.emit(pageEvent);
                fixture.detectChanges();

                _testUserscomponentGetUsersCalls(userServiceSpy, [
                    {
                        textQuery: '',
                        active: ActiveFilter.active,
                        deleted: DeletedFilter.not_deleted,
                        orderBy: [
                            UserOrder.name_asc,
                            UserOrder.email_asc,
                            UserOrder.active_asc,
                            UserOrder.deleted_desc,
                        ],
                        page: 1,
                        pageSize: 12,
                    },
                    {
                        textQuery: '',
                        active: ActiveFilter.active,
                        deleted: DeletedFilter.not_deleted,
                        orderBy: [
                            UserOrder.name_asc,
                            UserOrder.email_asc,
                            UserOrder.active_asc,
                            UserOrder.deleted_desc,
                        ],
                        page: 2,
                        pageSize: 12,
                    },
                ]);
            });
        });
    });
});

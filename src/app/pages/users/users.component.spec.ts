import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { HttpErrorResponse } from '@angular/common/http';
import { DebugElement } from '@angular/core';
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
import { AlertComponent } from '@components/alert/alert.component';
import { MockAlertComponent } from '@components/alert/test/mock/alert.component.mock';
import { ActiveFilter } from '@enums/active-filter/active-filter.enum';
import { DeletedFilter } from '@enums/deleted-filter/deleted-filter.enum';
import { Icon } from '@enums/icons/icons.enum';
import { ResponsiveUserFiltersComponent } from '@pages/users/responsive-user-filters/responsive-user-filters.component';
import { MockResponsiveUserFiltersComponent } from '@pages/users/responsive-user-filters/test/mock/responsive-users-filter.component.mock';
import { ResponsiveUserListComponent } from '@pages/users/responsive-user-list/responsive-user-list.component';
import { MockUserResponsiveListComponent } from '@pages/users/responsive-user-list/test/mocks/user-responsive-list.component.mock';
import { _usersComponentResponsesData } from '@pages/users/tests/data/responses.data';
import { UsersComponent } from '@pages/users/users.component';
import { FindUserRequestDTO } from '@services/user/dtos/find-user.request/find-user.request.dto';
import { Role } from '@services/user/dtos/role/role.enum';
import { UserOrder } from '@services/user/enums/user-order/user-order.enum';
import { UserService } from '@services/user/user.service';
import { of, Subject, throwError } from 'rxjs';

describe('UsersComponent.', () => {
    let fixture: ComponentFixture<UsersComponent>;
    let component: UsersComponent;
    let userServiceSpy: jasmine.SpyObj<UserService>;

    let mockBreakpointObserver: jasmine.SpyObj<BreakpointObserver>;
    let breakpointSubject: Subject<BreakpointState>;

    let listMock: ResponsiveUserListComponent;
    let filtersMock: ResponsiveUserFiltersComponent;
    let paginator: MatPaginator;

    function getAlertTextContent() {
        const alerts: DebugElement[] = fixture.debugElement.queryAll(
            By.directive(AlertComponent),
        );
        if (alerts.length === 0) {
            return null;
        }
        const text =
            alerts[0].nativeElement.children[0]?.children[0]?.children[1]?.textContent.trim();
        return text ?? null;
    }

    function getAlert() {
        const debugElement = fixture.debugElement.query(
            By.directive(AlertComponent),
        );
        if (!debugElement) {
            return null;
        }
        return debugElement.componentInstance as AlertComponent;
    }

    function getFilters() {
        return fixture.debugElement.query(
            By.directive(ResponsiveUserFiltersComponent),
        ).componentInstance as ResponsiveUserFiltersComponent;
    }

    function getList() {
        return fixture.debugElement.query(
            By.directive(ResponsiveUserListComponent),
        ).componentInstance as ResponsiveUserListComponent;
    }

    function getPaginator() {
        return fixture.debugElement.query(By.directive(MatPaginator))
            .componentInstance as MatPaginator;
    }

    function getAlertData() {
        const alert = getAlert();
        if (!alert) return null;
        const text = getAlertTextContent();
        return {
            text,
            type: alert.type(),
            icon: alert.icon(),
            showCloseButton: alert.showCloseButton(),
        };
    }

    function getFiltersData() {
        const filters = getFilters();
        return {
            textQuery: filters.textQuery(),
            orderBy: filters.orderBy(),
            active: filters.active(),
            deleted: filters.deleted(),
            loading: filters.loading(),
            mobile: filters.mobile(),
        };
    }

    function getListData() {
        const list = getList();
        return {
            users: list.users(),
            active: list.active(),
            deleted: list.deleted(),
            loading: list.loading(),
            mobile: list.mobile(),
        };
    }

    function getPaginatorData() {
        const paginator = getPaginator();
        return {
            pageIndex: paginator.pageIndex,
            length: paginator.length,
            pageSize: paginator.pageSize,
            hidePageSize: paginator.hidePageSize,
            pageSizeOptions: paginator.pageSizeOptions,
            showFirstLastButtons: paginator.showFirstLastButtons,
            disabled: paginator.disabled,
        };
    }

    function getComponentData() {
        return {
            alert: getAlertData(),
            filters: getFiltersData(),
            list: getListData(),
            paginator: getPaginatorData(),
        };
    }

    function getUsersCallsData() {
        const calls = userServiceSpy.getUsers.calls.allArgs();
        const _calls: FindUserRequestDTO[][] = [];
        for (let i = 0; i < calls.length; i++) {
            const _call: any[] = [];
            _calls.push(_call);
            for (let j = 0; j < calls[i].length; j++) {
                const arg = calls[i][j];
                _call.push(arg);
            }
        }
        return _calls;
    }

    function getFireHeaderClickCallsData() {
        const list = fixture.debugElement.query(
            By.directive(ResponsiveUserListComponent),
        ).componentInstance;
        const calls = list.headerClick.emit.calls.all();
        const _calls: UserOrder[][][] = [];
        for (let i = 0; i < calls.length; i++) {
            const _call: any[] = [];
            _calls.push(_call);
            for (let j = 0; j < calls[i].args.length; j++) {
                _call.push(calls[i].args[j]);
            }
        }
        return _calls;
    }

    function getFireItemClickCallsData() {
        const list = fixture.debugElement.query(
            By.directive(ResponsiveUserListComponent),
        ).componentInstance;
        const calls = list.itemClick.emit.calls.all();
        const _calls: string[][] = [];
        for (let i = 0; i < calls.length; i++) {
            const _call: any[] = [];
            _calls.push(_call);
            for (let j = 0; j < calls[i].args.length; j++) {
                _call.push(calls[i].args[j]);
            }
        }
        return _calls;
    }

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
                { provide: UserService, useValue: spy },
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

            expect(getComponentData()).toEqual({
                alert: null,
                filters: {
                    textQuery: '',
                    orderBy: [
                        UserOrder.name_asc,
                        UserOrder.email_asc,
                        UserOrder.active_asc,
                        UserOrder.deleted_desc,
                    ],
                    active: ActiveFilter.active,
                    deleted: DeletedFilter.not_deleted,
                    loading: false,
                    mobile: true,
                },
                list: {
                    users: [
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
                            active: true,
                            deleted: true,
                        },
                        {
                            id: '891db31e-dfb5-42ed-b912-48b98463b006',
                            name: 'User 3',
                            email: 'user3@email.com',
                            active: false,
                            deleted: false,
                        },
                    ],
                    active: ActiveFilter.active,
                    deleted: DeletedFilter.not_deleted,
                    loading: false,
                    mobile: true,
                },
                paginator: {
                    pageIndex: 0,
                    length: 3,
                    pageSize: 12,
                    hidePageSize: true,
                    pageSizeOptions: [6, 12, 24],
                    showFirstLastButtons: true,
                    disabled: false,
                },
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

            expect(getComponentData()).toEqual({
                alert: {
                    text: 'Erro ao buscar usuários.',
                    type: 'danger',
                    icon: Icon.error,
                    showCloseButton: true,
                },
                filters: {
                    textQuery: '',
                    orderBy: [
                        UserOrder.name_asc,
                        UserOrder.email_asc,
                        UserOrder.active_asc,
                        UserOrder.deleted_desc,
                    ],
                    active: ActiveFilter.active,
                    deleted: DeletedFilter.not_deleted,
                    loading: false,
                    mobile: true,
                },
                list: {
                    users: [],
                    active: ActiveFilter.active,
                    deleted: DeletedFilter.not_deleted,
                    loading: false,
                    mobile: true,
                },
                paginator: {
                    pageIndex: 0,
                    length: 0,
                    pageSize: 12,
                    hidePageSize: true,
                    pageSizeOptions: [6, 12, 24],
                    showFirstLastButtons: true,
                    disabled: false,
                },
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

            expect(getComponentData()).toEqual({
                alert: null,
                filters: {
                    textQuery: '',
                    orderBy: [
                        UserOrder.name_asc,
                        UserOrder.email_asc,
                        UserOrder.active_asc,
                        UserOrder.deleted_desc,
                    ],
                    active: ActiveFilter.active,
                    deleted: DeletedFilter.not_deleted,
                    loading: false,
                    mobile: false,
                },
                list: {
                    users: [
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
                            active: true,
                            deleted: true,
                        },
                        {
                            id: '891db31e-dfb5-42ed-b912-48b98463b006',
                            name: 'User 3',
                            email: 'user3@email.com',
                            active: false,
                            deleted: false,
                        },
                    ],
                    active: ActiveFilter.active,
                    deleted: DeletedFilter.not_deleted,
                    loading: false,
                    mobile: false,
                },
                paginator: {
                    pageIndex: 0,
                    length: 3,
                    pageSize: 12,
                    hidePageSize: false,
                    pageSizeOptions: [6, 12, 24],
                    showFirstLastButtons: true,
                    disabled: false,
                },
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

            expect(getComponentData()).toEqual({
                alert: {
                    text: 'Erro ao buscar usuários.',
                    type: 'danger',
                    icon: Icon.error,
                    showCloseButton: true,
                },
                filters: {
                    textQuery: '',
                    orderBy: [
                        UserOrder.name_asc,
                        UserOrder.email_asc,
                        UserOrder.active_asc,
                        UserOrder.deleted_desc,
                    ],
                    active: ActiveFilter.active,
                    deleted: DeletedFilter.not_deleted,
                    loading: false,
                    mobile: false,
                },
                list: {
                    users: [],
                    active: ActiveFilter.active,
                    deleted: DeletedFilter.not_deleted,
                    loading: false,
                    mobile: false,
                },
                paginator: {
                    pageIndex: 0,
                    length: 0,
                    pageSize: 12,
                    hidePageSize: false,
                    pageSizeOptions: [6, 12, 24],
                    showFirstLastButtons: true,
                    disabled: false,
                },
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

                expect(getComponentData()).toEqual({
                    alert: null,
                    filters: {
                        textQuery: '',
                        orderBy: [
                            UserOrder.name_asc,
                            UserOrder.email_asc,
                            UserOrder.active_asc,
                            UserOrder.deleted_desc,
                        ],
                        active: ActiveFilter.active,
                        deleted: DeletedFilter.not_deleted,
                        loading: false,
                        mobile: false,
                    },
                    list: {
                        users: [],
                        active: ActiveFilter.active,
                        deleted: DeletedFilter.not_deleted,
                        loading: false,
                        mobile: false,
                    },
                    paginator: {
                        pageIndex: 0,
                        length: 0,
                        pageSize: 12,
                        hidePageSize: false,
                        pageSizeOptions: [6, 12, 24],
                        showFirstLastButtons: true,
                        disabled: false,
                    },
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

                expect(getComponentData()).toEqual({
                    alert: null,
                    filters: {
                        textQuery: 'test',
                        orderBy: [
                            UserOrder.active_desc,
                            UserOrder.name_asc,
                            UserOrder.email_asc,
                            UserOrder.deleted_desc,
                        ],
                        active: ActiveFilter.all,
                        deleted: DeletedFilter.all,
                        loading: false,
                        mobile: true,
                    },
                    list: {
                        users: [
                            {
                                id: '891db31e-dfb5-42ed-b912-48b98463b005',
                                name: 'User 2',
                                email: 'user2@email.com',
                                active: true,
                                deleted: true,
                            },
                        ],
                        active: ActiveFilter.all,
                        deleted: DeletedFilter.all,
                        loading: false,
                        mobile: true,
                    },
                    paginator: {
                        pageIndex: 0,
                        length: 1,
                        pageSize: 2,
                        hidePageSize: true,
                        pageSizeOptions: [6, 12, 24],
                        showFirstLastButtons: true,
                        disabled: false,
                    },
                });

                expect(getUsersCallsData()).toEqual([
                    [
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
                    ],
                    [
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
                    ],
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

                expect(getUsersCallsData()).toEqual([
                    [
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
                    ],
                ]);

                expect(getComponentData()).toEqual({
                    alert: null,
                    filters: {
                        textQuery: '',
                        orderBy: [
                            UserOrder.name_asc,
                            UserOrder.email_asc,
                            UserOrder.active_asc,
                            UserOrder.deleted_desc,
                        ],
                        active: ActiveFilter.active,
                        deleted: DeletedFilter.not_deleted,
                        loading: false,
                        mobile: true,
                    },
                    list: {
                        users: [
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
                                active: true,
                                deleted: true,
                            },
                            {
                                id: '891db31e-dfb5-42ed-b912-48b98463b006',
                                name: 'User 3',
                                email: 'user3@email.com',
                                active: false,
                                deleted: false,
                            },
                        ],
                        active: ActiveFilter.active,
                        deleted: DeletedFilter.not_deleted,
                        loading: false,
                        mobile: true,
                    },
                    paginator: {
                        pageIndex: 0,
                        length: 3,
                        pageSize: 12,
                        hidePageSize: true,
                        pageSizeOptions: [6, 12, 24],
                        showFirstLastButtons: true,
                        disabled: false,
                    },
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

                expect(getFireHeaderClickCallsData()).toEqual([
                    [
                        [
                            UserOrder.active_desc,
                            UserOrder.name_asc,
                            UserOrder.email_asc,
                            UserOrder.deleted_desc,
                        ],
                    ],
                ]);

                expect(getUsersCallsData()).toEqual([
                    [
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
                    ],
                    [
                        {
                            textQuery: 'test',
                            active: ActiveFilter.active,
                            deleted: DeletedFilter.not_deleted,
                            orderBy: [
                                UserOrder.active_desc,
                                UserOrder.name_asc,
                                UserOrder.email_asc,
                                UserOrder.deleted_desc,
                            ],
                            page: 2,
                            pageSize: 2,
                        },
                    ],
                ]);
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

                expect(getFireItemClickCallsData()).toEqual([
                    ['891db31e-dfb5-42ed-b912-48b98463b004'],
                ]);

                expect(getComponentData()).toEqual({
                    alert: null,
                    filters: {
                        textQuery: '',
                        orderBy: [
                            UserOrder.name_asc,
                            UserOrder.email_asc,
                            UserOrder.active_asc,
                            UserOrder.deleted_desc,
                        ],
                        active: ActiveFilter.active,
                        deleted: DeletedFilter.not_deleted,
                        loading: false,
                        mobile: true,
                    },
                    list: {
                        users: [
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
                                active: true,
                                deleted: true,
                            },
                        ],
                        active: ActiveFilter.active,
                        deleted: DeletedFilter.not_deleted,
                        loading: false,
                        mobile: true,
                    },
                    paginator: {
                        pageIndex: 0,
                        length: 3,
                        pageSize: 2,
                        hidePageSize: true,
                        pageSizeOptions: [6, 12, 24],
                        showFirstLastButtons: true,
                        disabled: false,
                    },
                });
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

                expect(getComponentData()).toEqual({
                    alert: null,
                    filters: {
                        textQuery: '',
                        orderBy: [
                            UserOrder.name_asc,
                            UserOrder.email_asc,
                            UserOrder.active_asc,
                            UserOrder.deleted_desc,
                        ],
                        active: ActiveFilter.active,
                        deleted: DeletedFilter.not_deleted,
                        loading: false,
                        mobile: true,
                    },
                    list: {
                        users: [
                            {
                                id: '891db31e-dfb5-42ed-b912-48b98463b006',
                                name: 'User 3',
                                email: 'user3@email.com',
                                active: false,
                                deleted: false,
                            },
                        ],
                        active: ActiveFilter.active,
                        deleted: DeletedFilter.not_deleted,
                        loading: false,
                        mobile: true,
                    },
                    paginator: {
                        pageIndex: 0,
                        length: 3,
                        pageSize: 12,
                        hidePageSize: true,
                        pageSizeOptions: [6, 12, 24],
                        showFirstLastButtons: true,
                        disabled: false,
                    },
                });

                expect(getUsersCallsData()).toEqual([
                    [
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
                    ],

                    [
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
                    ],
                ]);
            });
        });
    });
});

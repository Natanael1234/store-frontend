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
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import _ from 'lodash';
import { of, Subject, throwError } from 'rxjs';
import { AlertComponent } from '../../components/alert/alert.component';
import { ActiveFilter } from '../../enums/active-filter/active-filter.enum';
import { DeletedFilter } from '../../enums/deleted-filter/deleted-filter.enum';
import { FindUserRequestDTO } from '../../services/user/dtos/find-user.request/find-user.request.dto';
import { Role } from '../../services/user/dtos/role/role.enum';
import { UserResponseDto } from '../../services/user/dtos/user.response/user.response.dto';
import { UserOrder } from '../../services/user/enums/user-order/user-order.enum';
import { UserService } from '../../services/user/user.service';
import { ResponsiveUserFiltersComponent } from './responsive-user-filters/responsive-user-filters.component';
import { ResponsiveUserListComponent } from './responsive-user-list/responsive-user-list.component';
import { UserTableRow } from './responsive-user-list/user-table/interfaces/user-table-row.interface';
import { MockAlertComponent } from './tests/mock/alert.component.mock';
import { MockResponsiveUserFiltersComponent } from './tests/mock/responsive-users-filter.component.mock';
import { MockUserResponsiveListComponent } from './tests/mock/user-responsice-list.component.mock';
import { _testUserscomponentGetUsersCalls as testGetUsersCalls } from './tests/tests/get-users-calls.test';
import { _testUsersComponentHeaderClickEvent as testHeaderClickEvent } from './tests/tests/users-component-header-click.test';
import { _testUsersComponentItemClickEvent as testItemClickEvent } from './tests/tests/users-component-item-click-event.test';
import { _testUsersComponentRefreshFilter as testeRefreshFilter } from './tests/tests/users-component-item-refresh-filter.test';
import { _testUsersComponentUpdateSortCalls as testSortCalls } from './tests/tests/users-component-update-sort-calls.test';
import { _testUsersComponent as testUsersComponent } from './tests/tests/users-component.test';
import { UsersComponent } from './users.component';

const users: UserResponseDto[] = [
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
];

const rows: UserTableRow[] = [
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
];

const payloads: FindUserRequestDTO[] = [
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
];

const responses = [
    {
        textQuery: '',
        orderBy: [
            UserOrder.name_asc,
            UserOrder.email_asc,
            UserOrder.active_asc,
            UserOrder.deleted_desc,
        ],
        results: users,
        count: users.length,
        page: 1,
        pageSize: 12,
    },
    {
        textQuery: 'test',
        orderBy: [
            UserOrder.active_desc,
            UserOrder.name_asc,
            UserOrder.email_asc,
            UserOrder.deleted_desc,
        ],
        results: [users[2]],
        count: users.length,
        page: 2,
        pageSize: 2,
    },
];

describe('UsersComponent', () => {
    let fixture: ComponentFixture<UsersComponent>;
    let component: UsersComponent;
    let userServiceSpy: jasmine.SpyObj<UserService>;

    let mockBreakpointObserver: jasmine.SpyObj<BreakpointObserver>;
    let breakpointSubject: Subject<BreakpointState>;

    let list: ResponsiveUserListComponent;
    let filters: ResponsiveUserFiltersComponent;
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

        fixture.detectChanges();

        // responsive filters component
        filters = fixture.debugElement.query(
            By.directive(ResponsiveUserFiltersComponent),
        ).componentInstance as ResponsiveUserFiltersComponent;
        spyOn(filters.refresh, 'emit').and.callThrough();

        // responsive list component
        list = fixture.debugElement.query(
            By.directive(ResponsiveUserListComponent),
        ).componentInstance as ResponsiveUserListComponent;
        spyOn(list.updateSort, 'emit').and.callThrough();
        spyOn(list.headerClick, 'emit').and.callThrough();
        spyOn(list.itemClick, 'emit').and.callThrough();

        // paginator component
        paginator = fixture.debugElement.query(By.directive(MatPaginator))
            .componentInstance as MatPaginator;
        spyOn(paginator.page, 'emit').and.callThrough();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
    });

    describe('mobile', () => {
        it('should render user list component', () => {
            const paginatedResponse = of(responses[0]);
            userServiceSpy.getUsers.and.returnValue(paginatedResponse);
            breakpointSubject.next({ matches: true, breakpoints: {} });
            list.updateSort.emit(responses[0].orderBy);
            fixture.detectChanges();

            testUsersComponent(fixture, {
                error: undefined,
                mobile: true,
                loading: false,
                pageIndex: payloads[0].page! - 1,
                pageSize: payloads[0].pageSize!,
                rows,
                textQuery: payloads[0].textQuery!,
                orderBy: payloads[0].orderBy!,
                active: payloads[0].active!,
                deleted: payloads[0].deleted!,
                length: users.length,
            });
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
            list.updateSort.emit(responses[0].orderBy);
            fixture.detectChanges();

            testUsersComponent(fixture, {
                error: 'Erro ao buscar usuários close',
                mobile: true,
                loading: false,
                pageIndex: payloads[0].page! - 1,
                pageSize: payloads[0].pageSize!,
                rows: [],
                textQuery: payloads[0].textQuery!,
                orderBy: payloads[0].orderBy!,
                active: payloads[0].active!,
                deleted: payloads[0].deleted!,
                length: 0,
            });
        });
    });

    describe('desktop', () => {
        it('should render user list component', () => {
            const paginatedResponse = of(responses[0]);
            userServiceSpy.getUsers.and.returnValue(paginatedResponse);
            breakpointSubject.next({ matches: false, breakpoints: {} });
            list.updateSort.emit(responses[0].orderBy);
            fixture.detectChanges();

            testUsersComponent(fixture, {
                error: undefined,
                mobile: false,
                loading: false,
                pageIndex: 0,
                pageSize: 12,
                rows,
                textQuery: '',
                orderBy: [
                    UserOrder.name_asc,
                    UserOrder.email_asc,
                    UserOrder.active_asc,
                    UserOrder.deleted_desc,
                ],
                active: ActiveFilter.active,
                deleted: DeletedFilter.not_deleted,
                length: users.length,
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
            breakpointSubject.next({ matches: false, breakpoints: {} });
            list.updateSort.emit(responses[0].orderBy);
            fixture.detectChanges();

            testUsersComponent(fixture, {
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
                breakpointSubject.next({ matches: false, breakpoints: {} });
                list.updateSort.emit(responses[0].orderBy);
                fixture.detectChanges();

                const alert = fixture.debugElement.query(
                    By.directive(AlertComponent),
                ).componentInstance as AlertComponent;
                alert.onClose.emit();
                fixture.detectChanges();

                testUsersComponent(fixture, {
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
                    .returnValue(of(responses[0]))
                    .and.returnValue(of(responses[1]));
                breakpointSubject.next({ matches: false, breakpoints: {} });
                filters.refresh.emit({
                    textQuery: payloads[1].textQuery!,
                    sort: payloads[1].orderBy![0],
                    active: payloads[1].active!,
                    deleted: payloads[1].deleted!,
                });
                fixture.detectChanges();

                testeRefreshFilter(fixture, {
                    textQuery: responses[1].textQuery,
                    orderBy: responses[1].orderBy,
                    sort: responses[1].orderBy[0],
                    active: payloads[1].active!,
                    deleted: payloads[1].deleted!,
                });

                const payload = _.cloneDeep(payloads[1]);
                payload.page = payloads[0].page;
                payload.pageSize = payloads[0].pageSize;
                testGetUsersCalls(userServiceSpy, [payload]);
            });

            it('should not update refresh filters when refresh event param is false', () => {
                userServiceSpy.getUsers.and.returnValue(of(responses[0]));
                breakpointSubject.next({ matches: false, breakpoints: {} });
                // filters.refresh.emit(false);
                fixture.detectChanges();

                const payload = _.cloneDeep(payloads[0]);
                testGetUsersCalls(userServiceSpy, [payload]);
                // default values
                testeRefreshFilter(fixture, {
                    textQuery: '',
                    orderBy: payloads[0].orderBy!,
                    sort: payloads[0].orderBy!,
                    active: payloads[0].active!,
                    deleted: payloads[0].deleted!,
                });

                const lastResponse = responses[0];
                const lastOrderBy = lastResponse.orderBy;
                const expectedUpdateSortCalls = [responses[0].orderBy];
                testSortCalls(fixture, lastOrderBy, expectedUpdateSortCalls);

                const expectedGetUsersCalls = [payloads[0]];
                testGetUsersCalls(userServiceSpy, expectedGetUsersCalls);
            });
        });

        describe('update sort', () => {
            it('should handle update sort event', () => {
                userServiceSpy.getUsers.and
                    .returnValue(of(responses[0]))
                    .and.returnValue(of(responses[1]));
                breakpointSubject.next({ matches: false, breakpoints: {} });
                fixture.detectChanges();
                list.updateSort.emit(responses[1].orderBy);
                fixture.detectChanges();
                const lastResponse = responses[1];
                const lastOrderBy = lastResponse.orderBy;

                const expectedUpdateSortCalls = [
                    responses[0].orderBy,
                    responses[1].orderBy,
                ];
                testSortCalls(fixture, lastOrderBy, expectedUpdateSortCalls);

                const expectedGetUsersCalls = [
                    { ...payloads[0] },
                    {
                        ...payloads[1],
                        textQuery: '',
                        active: ActiveFilter.active,
                        deleted: DeletedFilter.not_deleted,
                    },
                ];
                testGetUsersCalls(userServiceSpy, expectedGetUsersCalls);
            });
        });

        describe('header click', () => {
            it('should handle header click event', () => {
                userServiceSpy.getUsers.and
                    .returnValue(of(responses[0]))
                    .and.returnValue(of(responses[1]));
                breakpointSubject.next({ matches: false, breakpoints: {} });
                list.headerClick.emit(responses[1].orderBy);
                fixture.detectChanges();

                testHeaderClickEvent(
                    fixture,
                    [responses[1].orderBy],
                    responses[1].orderBy,
                );
            });
        });

        describe('row click', () => {
            it('should handle row click event', () => {
                userServiceSpy.getUsers.and
                    .returnValue(of(responses[0]))
                    .and.returnValue(of(responses[1]));
                breakpointSubject.next({ matches: false, breakpoints: {} });
                const userId = '891db31e-dfb5-42ed-b912-48b98463b004';
                list.itemClick.emit(userId);

                fixture.detectChanges();

                testItemClickEvent(fixture, [{ userId }]);
            });
        });

        describe('pagination', () => {
            it('should paginate', () => {
                userServiceSpy.getUsers.and.returnValue(of(responses[0]));
                breakpointSubject.next({ matches: false, breakpoints: {} });
                fixture.detectChanges();

                const payload1 = _.cloneDeep(payloads[0]);
                const payload2 = _.cloneDeep(payloads[1]);

                payload2.textQuery = payload1.textQuery;
                payload2.active = payload1.active;
                payload2.deleted = payload1.deleted;
                payload2.pageSize = 2;
                payload2.orderBy = payload1.orderBy;
                payload2.page = 2;

                testGetUsersCalls(userServiceSpy, [payload1]);
            });
        });
    });
});

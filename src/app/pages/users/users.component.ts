import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
    AfterViewInit,
    Component,
    computed,
    inject,
    model,
    ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import {
    MatPaginatorIntl,
    MatPaginatorModule,
} from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { AlertComponent } from '@components/alert/alert.component';
import { UserTableRow } from '@components/table/interfaces/user-table-row.interface';
import { ActiveFilter } from '@enums/active-filter/active-filter.enum';
import { DeletedFilter } from '@enums/deleted-filter/deleted-filter.enum';
import { MyCustomPaginatorIntl } from '@i18n/paginator.intl';
import { AuthInterceptor } from '@interceptors/auth/auth.interceptor';
import { RowClickEvent } from '@interfaces/row-click.interface';
import { PaginatorConfigs } from '@pages/users/configs/paginator/paginator.configs';
import { UserDialogComponent } from '@pages/users/dialogs/user-dialog/user-dialog.component';
import { ResponsiveUserFiltersComponent } from '@pages/users/responsive-user-filters/responsive-user-filters.component';
import { UserFilterDialogComponent } from '@pages/users/responsive-user-filters/user-filter-dialog/user-filter-dialog.component';
import { OnUserFilterEvent } from '@pages/users/responsive-user-filters/user-filter-toollbar/types/on-user-filter-menu-list-close-event.type';
import { ResponsiveUserListComponent } from '@pages/users/responsive-user-list/responsive-user-list.component';
import { userResponseToUserTableRow } from '@pages/users/utils/user-response-to-user-table/user-response-to-user-table';
import { PaginatedResponseDTO } from '@services/dtos/response/pagination/pagination.response.dto';
import { UserResponseDto } from '@services/user/dtos/user.response/user.response.dto';
import { UserOrder } from '@services/user/enums/user-order/user-order.enum';
import { UserService } from '@services/user/user.service';
import { leftMouseClickFilter } from '@utils/mouse-events/mouse-click-filter';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
    selector: 'app-users',
    imports: [
        MatPaginatorModule,
        MatProgressBarModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        MatMenuModule,
        MatRadioModule,
        MatSidenavModule,
        AlertComponent,
        ResponsiveUserFiltersComponent,
        ResponsiveUserListComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl },
        {
            provide: ActivatedRoute,
            useValue: {
                params: new BehaviorSubject({}),
            },
        },
    ],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
})
export class UsersComponent implements AfterViewInit {
    /* Data */

    private userService: UserService = inject(UserService);
    protected users = model<UserResponseDto[]>([]);
    protected userRows = computed<UserTableRow[]>(() =>
        userResponseToUserTableRow(this.users()),
    );

    protected dialogRef?: MatDialogRef<UserFilterDialogComponent, any>;

    /** Subscription of window resize events used for responsiveness. */
    private breakpointSubscription!: Subscription;

    /* FILTERS */

    protected textQuery = model<string>('');
    protected active = model<ActiveFilter>(ActiveFilter.active);
    protected deleted = model<DeletedFilter>(DeletedFilter.not_deleted);

    /* ORDERING */
    public orderBy = model<UserOrder[]>([
        UserOrder.name_asc,
        UserOrder.email_asc,
        UserOrder.active_asc,
        UserOrder.deleted_desc,
    ]);

    /* PAGINATION */

    protected length = model<number>(PaginatorConfigs.DEFAULT_LENGTH);
    protected count = model<number>(PaginatorConfigs.DEFAULT_COUNT);
    protected pageIndex = model<number>(PaginatorConfigs.DEFAULT_PAGE_INDEX);
    protected page = computed<number>(() => this.pageIndex() + 1);
    protected pageSize = model<number>(PaginatorConfigs.DEFAULT_PAGE_SIZE);
    protected pageSizeOptions = model<number[]>(PaginatorConfigs.PAGE_SIZES);

    /* RESPONSIVITY */

    private breakpointObserver = inject(BreakpointObserver);
    protected mobile = model<boolean>(true);

    /* ERROR HANDLING */

    protected error = model<string | undefined>(undefined);

    /* CSS CLASSES */

    protected filtersClassList = computed<object>(() => {
        return { filters: true, mobile: !!this.mobile() };
    });

    /* OTHERS */

    protected loading = model<boolean>(false);

    @ViewChild(ResponsiveUserListComponent)
    private list!: ResponsiveUserListComponent;

    protected get payload() {
        const orderBy = this.list.getOrderBy();
        const deleted = this.deleted();
        const active = this.active();
        const page = this.page();
        const pageSize = this.pageSize();
        const textQuery = this.textQuery();
        const dto = { textQuery, active, deleted, orderBy, page, pageSize };
        return dto;
    }

    protected set response(
        response: PaginatedResponseDTO<UserResponseDto, UserOrder>,
    ) {
        this.textQuery.set(response.textQuery);
        this.orderBy.set(response.orderBy);
        this.count.set(response.count);
        this.pageIndex.set(response.page - 1);
        this.pageSize.set(response.pageSize);
        this.users.set(response.results || []);
        this.length.set(response.count || 0);
        this.list.updateSort(response.orderBy);
    }

    protected set responseError(error: Error) {
        this.users.set([]);
        // TODO: orderBy?
        this.count.set(PaginatorConfigs.DEFAULT_COUNT);
        this.length.set(PaginatorConfigs.DEFAULT_LENGTH);
        this.pageIndex.set(PaginatorConfigs.DEFAULT_PAGE_INDEX);
        this.pageSize.set(PaginatorConfigs.DEFAULT_PAGE_SIZE);
        this.error.set('Erro ao buscar usuários'); // TODO: pegar mensagem do erro
    }

    protected ngOnInit() {
        // TODO: mover para service?
        this.breakpointSubscription = this.breakpointObserver
            .observe([
                Breakpoints.XSmall,
                Breakpoints.Small,
                Breakpoints.Medium,
            ])
            .subscribe((result) => {
                const isMobile = result.matches;
                this.mobile.set(isMobile);
                this.dialogRef?.close();
            });
    }

    public ngAfterViewInit(): void {
        this.orderBy.set(this.list.getOrderBy());
        this.getUsers(); // duplicate call?
    }

    public ngOnDestroy() {
        this.breakpointSubscription?.unsubscribe();
    }

    protected refreshFilters(filters: OnUserFilterEvent) {
        if (filters) {
            this.textQuery.set(filters.textQuery || '');
            this.active.set(filters.active);
            this.deleted.set(filters.deleted);
            this.list.updateSort(filters.order);
            this.getUsers();
        }
    }

    protected fireHeaderClickEvent() {
        this.orderBy.set(this.list.getOrderBy());
        this.getUsers();
    }

    protected async getUsers() {
        this.loading.set(true);
        this.error.set(undefined);
        const payload = this.payload;
        this.userService.getUsers(payload).subscribe({
            next: (paginatedResponse) => {
                this.response = paginatedResponse;
                this.loading.set(false);
            },
            error: (error: Error) => {
                this.responseError = error;
                this.loading.set(false);
            },
        });
    }

    protected onPageEvent(e: any) {
        this.pageIndex.set(e.pageIndex);
        this.pageSize.set(e.pageSize);
        this.getUsers();
    }

    protected viewUser(event: any, userTableRow: UserTableRow) {
        if (leftMouseClickFilter(event)) {
            console.log('View User', event, userTableRow);
        }
    }

    protected editUser(event: any, userTableRow: UserTableRow) {
        if (leftMouseClickFilter(event)) {
            console.log('Edit User', event, userTableRow);
        }
    }

    protected activateUser(event: any, userTableRow: UserTableRow) {
        if (leftMouseClickFilter(event)) {
            this.userService
                .updateUser(userTableRow.id, { active: !userTableRow.active })
                .subscribe({ next: (response) => this.getUsers() });
        }
    }

    protected deleteUser(event: any, userTableRow: UserTableRow) {
        if (leftMouseClickFilter(event)) {
            this.userService
                .updateUser(userTableRow.id, { deleted: !userTableRow.deleted })
                .subscribe({ next: (response) => this.getUsers() });
        }
    }

    protected onItemClick(e: string) {
        if (leftMouseClickFilter(e)) {
            this.openUserDialog();
        }
    }

    protected onRowClick(e: RowClickEvent<string>) {
        if (leftMouseClickFilter(e.event)) {
            this.openUserDialog();
        }
    }

    protected onCloseErrorAlert() {
        this.error.set(undefined);
    }

    readonly name = model('');
    readonly dialog = inject(MatDialog);

    openUserDialog(): void {
        if (this.loading()) return;
        const dialogRef = this.dialog.open(UserDialogComponent, {
            data: { name: this.name() },
        });
        console.error({ dialogRef });

        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
            if (result !== undefined) {
                this.name.set(result);
            }
        });
    }
}

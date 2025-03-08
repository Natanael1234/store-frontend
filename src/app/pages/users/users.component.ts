import { Component, inject, Injectable, ViewChild } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ActiveFilter } from '../../services/enums/active/active-filter.enum';
import { DeletedFilter } from '../../services/enums/deleted/deleted-filter.enum';
import { UserOrder } from '../../services/user/dtos/user-order/user-order.enum';
import { UserResponseDto } from '../../services/user/dtos/user.response/user.response.dto';
import { firstValueFrom, Subject } from 'rxjs';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from '../../interceptors/auth/auth.interceptor';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { FindUserRequestDTO } from '../../services/user/dtos/find-user.request/find-user.request.dto';
import { MyCustomPaginatorIntl } from '../../i18n/paginator.intl';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

export interface UserTableRow {
  id: string;
  name: string;
  email: string;
  active: boolean;
  deleted: boolean;
}

const DEFAULT_LENGHT = 0;
const DEFAULT_COUNT = 0;
const DEFAULT_PAGE_INDEX = 0;
const DEFAULT_PAGE_SIZE = 12;
const PAGE_SIZES = [6, 12, 24];

@Component({
  selector: 'app-users',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRippleModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl },
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  private userService: UserService = inject(UserService);
  protected textQuery: string = '';

  protected orderBy: UserOrder[] = [
    // UserOrder.DELETED_DESC,
    // UserOrder.ACTIVE_DESC,
    UserOrder.NAME_ASC,
    UserOrder.EMAIL_ASC,
  ];
  protected users: UserResponseDto[] = [];

  protected deleted: DeletedFilter = DeletedFilter.ALL;
  protected active: ActiveFilter = ActiveFilter.ALL;

  protected mainError?: string;
  protected loading: boolean = false;
  protected error?: string;

  protected displayedColumns: string[] = ['name', 'email', 'active', 'deleted'];
  protected dataSource: MatTableDataSource<UserTableRow> =
    new MatTableDataSource<UserTableRow>();

  @ViewChild(MatSort) sort!: MatSort;

  protected lenght = DEFAULT_LENGHT;
  protected count: number = DEFAULT_COUNT;
  protected pageIndex: number = DEFAULT_PAGE_INDEX;
  protected pageSize: number = DEFAULT_PAGE_SIZE;
  protected pageSizeOptions = PAGE_SIZES;

  protected onSubmit(e: Event) {
    this.getUsers();
  }

  protected ngOnInit() {
    this.getUsers();
    this.dataSource.sort = this.sort;
  }

  protected async getUsers() {
    this.loading = true;
    this.loadSkeletonData();
    this.error = undefined;
    const dto: FindUserRequestDTO = {
      active: this.active,
      deleted: this.deleted,
      orderBy: this.orderBy,
      page: this.pageIndex + 1,
      pageSize: this.pageSize,
    };
    this.userService.getUsers(dto).subscribe(
      (paginatedResponse) => {
        this.textQuery = paginatedResponse.textQuery;
        this.count = paginatedResponse.count;
        this.pageIndex = paginatedResponse.page - 1;
        this.pageSize = paginatedResponse.pageSize;
        this.orderBy = paginatedResponse.orderBy;
        this.users = paginatedResponse.results || [];

        const tableData: UserTableRow[] = (paginatedResponse.results || []).map(
          this.mapUserToRow
        );
        this.dataSource = new MatTableDataSource<UserTableRow>(tableData);

        this.lenght = paginatedResponse.count || 0;

        this.loading = false;
      },
      (error) => {
        this.users = [];
        this.dataSource = new MatTableDataSource<UserTableRow>([]);
        this.count = DEFAULT_COUNT;
        this.lenght = DEFAULT_LENGHT;
        this.pageIndex = DEFAULT_PAGE_INDEX;
        this.pageSize = DEFAULT_PAGE_SIZE;

        this.error = 'Erro ao buscar usuários'; // TODO:
        this.loading = false;
      }
    );
  }

  private mapUserToRow(user: UserResponseDto) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      active: !!user.active,
      deleted: !!user.deletedAt,
    };
  }

  protected loadSkeletonData() {
    const tableData: UserTableRow[] = [];
    for (let i = 0; i < this.pageSize; i++) {
      tableData.push({
        id: '',
        name: '',
        email: '',
        active: false,
        deleted: false,
      });
    }
    this.dataSource = new MatTableDataSource<UserTableRow>(tableData);
  }

  protected onPageEvent(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getUsers();
  }

  protected onSortEvent(e: any) {
    const idx = this.orderBy;
    for (let i = this.orderBy.length - 1; i >= 0; i--) {
      if (this.orderBy[i].startsWith(e.active + '_')) {
        this.orderBy.splice(i, 1);
      }
    }
    if (e.direction) {
      const orderByColumn = e.active + '_' + e.direction;
      this.orderBy.unshift(orderByColumn as unknown as UserOrder);
    }
    this.getUsers();
  }

  protected viewUser(event: any, userTableRow: UserTableRow) {
    if (this.isClickEvent(event)) {
      console.log('View User', event, userTableRow);
    }
  }

  protected editUser(event: any, userTableRow: UserTableRow) {
    if (this.isClickEvent(event)) {
      console.log('Edit User', event, userTableRow);
    }
  }

  protected activateUser(event: any, userTableRow: UserTableRow) {
    if (this.isClickEvent(event)) {
      this.userService
        .updateUser(userTableRow.id, {
          active: !userTableRow.active,
        })
        .subscribe({ next: (response) => this.getUsers() });
    }
  }

  protected deleteUser(event: any, userTableRow: UserTableRow) {
    if (this.isClickEvent(event)) {
      this.userService
        .updateUser(userTableRow.id, {
          deleted: !userTableRow.deleted,
        })
        .subscribe({ next: (response) => this.getUsers() });
    }
  }

  private isClickEvent(event: any) {
    return !(event.pointerType === 'mouse' && event.button !== 0);
  }
}

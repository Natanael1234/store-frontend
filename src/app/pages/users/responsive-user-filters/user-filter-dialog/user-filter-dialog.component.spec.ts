import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { ActiveFilter } from '../../../../enums/active-filter/active-filter.enum';
import { DeletedFilter } from '../../../../enums/deleted-filter/deleted-filter.enum';
import { UserOrder } from '../../../../services/user/enums/user-order/user-order.enum';
import { MockUserFilterToolbarComponent } from '../user-filter-toollbar/test/mock/user-filter-toolbar.component.mock';
import { UserFilterToolbarComponent } from '../user-filter-toollbar/user-filter-toolbar.component';
import { UserFilterDialogComponent } from './user-filter-dialog.component';

describe('UserFilterDialogComponent', () => {
    let component: UserFilterDialogComponent;
    let fixture: ComponentFixture<UserFilterDialogComponent>;
    let dialogRef: MatDialogRef<UserFilterDialogComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                UserFilterDialogComponent,
                MockUserFilterToolbarComponent,
                MatDialogModule,
                MatButtonModule,
                CommonModule,
                MatMenuModule,
                FormsModule,
                MatIconModule,
                MatFormFieldModule,
                MatSelectModule,
                MatOptionModule,
                MatChipsModule,
                MatTooltipModule,
                MatDividerModule,
            ],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: {
                        close: (res: any) => {},
                        componentInstance: (res: any) => {},
                    },
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        sort: UserOrder.email_asc,
                        active: ActiveFilter.inactive,
                        deleted: DeletedFilter.deleted,
                    },
                },
                { provide: MatDialog, useValue: {} },

                {
                    provide: UserFilterToolbarComponent,
                    useClass: MockUserFilterToolbarComponent,
                },
            ],
        })
            .overrideComponent(UserFilterToolbarComponent, {
                set: { template: '<p>Mocked template</p>' },
            })
            .compileComponents();

        fixture = TestBed.createComponent(UserFilterDialogComponent);
        component = fixture.componentInstance;
        dialogRef = TestBed.inject(MatDialogRef);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize data from MAT_DIALOG_DATA', () => {
        expect(component.sort()).toEqual(UserOrder.email_asc);
        expect(component.active()).toEqual(ActiveFilter.inactive);
        expect(component.deleted()).toEqual(DeletedFilter.deleted);
    });

    it('should contain user filter toolbar', () => {
        const toolbars = fixture.debugElement.queryAll(
            By.directive(UserFilterToolbarComponent),
        );
        expect(toolbars.length).toBe(1);
    });

    it('should initialize toolbar inputs', () => {
        const toolbar = fixture.debugElement.query(
            By.directive(UserFilterToolbarComponent),
        ).componentInstance as UserFilterToolbarComponent;

        expect(toolbar.sort()).toEqual(UserOrder.email_asc);
        expect(toolbar.active()).toEqual(ActiveFilter.inactive);
        expect(toolbar.deleted()).toEqual(DeletedFilter.deleted);
    });

    it('should update toolbar inputs', () => {
        component.sort.set(UserOrder.email_desc);
        component.active.set(ActiveFilter.all);
        component.deleted.set(DeletedFilter.all);

        fixture.detectChanges();

        const toolbar = fixture.debugElement.query(
            By.directive(UserFilterToolbarComponent),
        ).componentInstance as UserFilterToolbarComponent;

        expect(toolbar.sort()).toEqual(UserOrder.email_desc);
        expect(toolbar.active()).toEqual(ActiveFilter.all);
        expect(toolbar.deleted()).toEqual(DeletedFilter.all);
    });

    it('should close the dialog with the selected event data', () => {
        const closeSpy = spyOn(dialogRef, 'close');

        expect(component.sort()).toEqual(UserOrder.email_asc);
        expect(component.active()).toEqual(ActiveFilter.inactive);
        expect(component.deleted()).toEqual(DeletedFilter.deleted);

        component.sort.set(UserOrder.email_desc);
        component.active.set(ActiveFilter.all);
        component.deleted.set(DeletedFilter.all);

        fixture.detectChanges();

        const toolbarMock = fixture.debugElement.query(
            By.directive(UserFilterToolbarComponent),
        ).componentInstance as UserFilterToolbarComponent;

        toolbarMock.onClose.emit({
            sort: UserOrder.email_desc,
            active: ActiveFilter.all,
            deleted: DeletedFilter.all,
        });

        fixture.detectChanges();

        expect(closeSpy).toHaveBeenCalled();
        expect(closeSpy).toHaveBeenCalledWith({
            sort: UserOrder.email_desc,
            active: ActiveFilter.all,
            deleted: DeletedFilter.all,
        });
    });

    it('should close the dialog with false when cancel is triggered', () => {
        const closeSpy = spyOn(dialogRef, 'close');

        expect(component.sort()).toEqual(UserOrder.email_asc);
        expect(component.active()).toEqual(ActiveFilter.inactive);
        expect(component.deleted()).toEqual(DeletedFilter.deleted);

        component.sort.set(UserOrder.email_desc);
        component.active.set(ActiveFilter.all);
        component.deleted.set(DeletedFilter.all);

        fixture.detectChanges();

        const toolbarMock = fixture.debugElement.query(
            By.directive(UserFilterToolbarComponent),
        ).componentInstance as UserFilterToolbarComponent;

        toolbarMock.onClose.emit(false);

        fixture.detectChanges();

        expect(closeSpy).toHaveBeenCalled();
        expect(closeSpy).toHaveBeenCalledWith(false);
    });
});

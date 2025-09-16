import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UserItemComponent } from './components/user-item/user-item.component';
import { testUserListClickEvent as testClickEvent } from './test/user-list-test-click-event.test';
import { _userTableRowsTestData as rows } from './test/user-list.data.test';
import { testUserList as testList } from './test/user-list.test';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
    let component: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UserListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(UserListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('headers', () => {
        it('should render empty list', () => {
            component.users.set([]);
            fixture.detectChanges();
            testList(fixture, []);
        });

        it('should render one item list', () => {
            component.users.set([rows[0]]);
            fixture.detectChanges();
            testList(fixture, [rows[0]], false);

            const items: DebugElement[] = fixture.debugElement.queryAll(
                By.directive(UserItemComponent),
            );

            testClickEvent(component, items[0], rows[0], false);
        });

        it('should render list', () => {
            component.users.set(rows);
            fixture.detectChanges();
            testList(fixture, rows, false);

            const items: DebugElement[] = fixture.debugElement.queryAll(
                By.directive(UserItemComponent),
            );

            testClickEvent(component, items[1], rows[1], false);
        });

        it('should handle loading state', () => {
            component.users.set(rows);
            component.loading.set(true);
            fixture.detectChanges();
            testList(fixture, rows, true);

            const items: DebugElement[] = fixture.debugElement.queryAll(
                By.directive(UserItemComponent),
            );
            testClickEvent(component, items[1], rows[1], true);
        });
    });
});

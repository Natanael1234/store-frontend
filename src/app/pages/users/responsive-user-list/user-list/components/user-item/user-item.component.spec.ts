import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { UserTableRow } from '../../../user-table/interfaces/user-table-row.interface';
import { UserItemComponent } from './user-item.component';

function testList(
    fixture: ComponentFixture<UserItemComponent>,
    expectedItem: UserTableRow,
    loading: boolean | undefined = false,
) {
    fixture.detectChanges();
    const containers = fixture.debugElement.queryAll(By.css('div#container'));

    expect(containers.length).withContext('expects one container').toEqual(1);
    const container = containers[0];

    // left column
    const leftColumn = container.children[0];
    expect(leftColumn.nativeElement.tagName)
        .withContext('left column is div')
        .toEqual('DIV');
    expect(leftColumn.properties['id'])
        .withContext('left column id')
        .toEqual('left-column');
    expect(leftColumn.children.length)
        .withContext('left column children cout')
        .toEqual(2);
    expect(leftColumn.nativeElement.classList.contains('skeleton-loader'))
        .withContext('skeleton loader class')
        .toBeFalse();

    // name
    const name = leftColumn.children[0];
    expect(name.nativeElement.tagName)
        .withContext('name label is div')
        .toEqual('DIV');
    // TODO: class
    expect(name.childNodes[0].nativeNode.textContent)
        .withContext('name text content')
        .toEqual(` ${expectedItem.name} `);
    expect(name.nativeElement.getAttribute('aria-label'))
        .withContext('name aria label')
        .toEqual('Nome');
    expect(name.injector.get(MatTooltip).message)
        .withContext('name tooltip')
        .toEqual(expectedItem.name);

    // email
    const email = leftColumn.children[1];
    expect(email.nativeElement.tagName)
        .withContext('email label is div')
        .toEqual('DIV');
    expect(email.childNodes[0].nativeNode.textContent)
        .withContext('email text content')
        .toEqual(` ${expectedItem.email} `);
    expect(email.nativeElement.getAttribute('aria-label'))
        .withContext('email aria label')
        .toEqual('Email');
    expect(email.injector.get(MatTooltip).message)
        .withContext('email tooltip')
        .toEqual(expectedItem.email);

    // right column
    const rightColumn = container.children[1];
    expect(rightColumn.nativeElement.tagName)
        .withContext('right column is div')
        .toEqual('DIV');
    expect(rightColumn.attributes['id'])
        .withContext('right column id')
        .toEqual('right-column');
    expect(rightColumn.children.length)
        .withContext('right column children count')
        .toEqual(2);

    // active icon
    const activeIcon = rightColumn.children[0];
    expect(activeIcon.nativeElement.tagName)
        .withContext('activeIcon label is mat-icon')
        .toEqual('MAT-ICON');
    expect(activeIcon.injector.get(MatTooltip).message)
        .withContext('active tooltip')
        .toEqual(expectedItem.active ? 'Ativo' : 'Inativo');
    expect(activeIcon.nativeElement.getAttribute('aria-label'))
        .withContext('active aria label')
        .toEqual('Ícone ativo');

    // deleted icon
    const deletedIcon = rightColumn.children[1];
    expect(deletedIcon.injector.get(MatTooltip).message)
        .withContext('deleted tooltip')
        .toEqual(expectedItem.deleted ? 'Deletado' : 'Não deletado');
    expect(deletedIcon.nativeElement.getAttribute('aria-label'))
        .withContext('deleted aria label')
        .toEqual('Ícone deletado');

    // while loading
    if (loading == true) {
        // container loading
        expect(container.nativeElement.classList.contains('loading'))
            .withContext('container loading class')
            .toBeTrue();

        // skeleton loader
        expect(activeIcon.nativeElement.classList.contains('skeleton-loader'))
            .withContext('active skeleton loader class')
            .toBeTrue();
        expect(deletedIcon.nativeElement.classList.contains('skeleton-loader'))
            .withContext('deleted skeleton loader class')
            .toBeTrue();

        // disabled
        expect(activeIcon.nativeElement.classList.contains('disabled'))
            .withContext('deleted not disabled while loading')
            .toBeFalse();
        expect(deletedIcon.nativeElement.classList.contains('disabled'))
            .withContext('deleted not disabled while loading')
            .toBeFalse();
    }
    // not loading
    else {
        // container loading
        expect(container.nativeElement.classList.contains('loading'))
            .withContext('no container loading class')
            .toBeFalse();

        // skeleton loader
        expect(activeIcon.nativeElement.classList.contains('skeleton-loader'))
            .withContext('active without skeleton loader class')
            .toBeFalse();
        expect(deletedIcon.nativeElement.classList.contains('skeleton-loader'))
            .withContext('deleted without skeleton loader class')
            .toBeFalse();

        // active
        if (expectedItem.active === true) {
            expect(activeIcon.nativeElement.classList.contains('disabled'))
                .withContext(
                    "active icon don't contains disabled class while not loading",
                )
                .toBeFalse();
        } else {
            expect(activeIcon.nativeElement.classList.contains('disabled'))
                .withContext(
                    'active icon contains disabled class while not loading',
                )
                .toBeTrue();
        }

        // deleted
        if (expectedItem.deleted === true) {
            expect(deletedIcon.nativeElement.classList.contains('disabled'))
                .withContext(
                    'deleted icon contains disabled class while not loading',
                )
                .toBeFalse();
        } else {
            expect(deletedIcon.nativeElement.classList.contains('disabled'))
                .withContext(
                    "deleted icon don't contains disabled class while not loading",
                )
                .toBeTrue();
        }
    }
}

describe('UserItemComponent', () => {
    let component: UserItemComponent;
    let fixture: ComponentFixture<UserItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UserItemComponent, MatIconModule, MatTooltipModule],
        }).compileComponents();

        fixture = TestBed.createComponent(UserItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render user list item', () => {
        component.name.set('User 1');
        component.email.set('user1@email.com');
        component.active.set(true);
        component.deleted.set(false);
        component.loading.set(false);
        testList(
            fixture,
            {
                id: '1',
                name: 'User 1',
                email: 'user1@email.com',
                active: true,
                deleted: false,
            },
            false,
        );
    });

    it('should render inactive user list item', () => {
        component.name.set('User 1');
        component.email.set('user1@email.com');
        component.active.set(false);
        component.deleted.set(false);
        component.loading.set(false);
        testList(
            fixture,
            {
                id: '1',
                name: 'User 1',
                email: 'user1@email.com',
                active: false,
                deleted: false,
            },
            false,
        );
    });

    it('should render deleted user list item', () => {
        component.name.set('User 1');
        component.email.set('user1@email.com');
        component.active.set(true);
        component.deleted.set(true);
        component.loading.set(false);
        testList(
            fixture,
            {
                id: '1',
                name: 'User 1',
                email: 'user1@email.com',
                active: true,
                deleted: true,
            },
            false,
        );
    });

    it('should render loading user list item', () => {
        component.name.set('User 1');
        component.email.set('user1@email.com');
        component.active.set(true);
        component.deleted.set(false);
        component.loading.set(true);
        testList(
            fixture,
            {
                id: '1',
                name: 'User 1',
                email: 'user1@email.com',
                active: true,
                deleted: false,
            },
            true,
        );
    });

    it('should render loading inactive user list item', () => {
        component.name.set('User 1');
        component.email.set('user1@email.com');
        component.active.set(false);
        component.deleted.set(false);
        component.loading.set(true);
        testList(
            fixture,
            {
                id: '1',
                name: 'User 1',
                email: 'user1@email.com',
                active: false,
                deleted: false,
            },
            true,
        );
    });

    it('should render loading deleted user list item', () => {
        component.name.set('User 1');
        component.email.set('user1@email.com');
        component.active.set(true);
        component.deleted.set(true);
        component.loading.set(true);
        testList(
            fixture,
            {
                id: '1',
                name: 'User 1',
                email: 'user1@email.com',
                active: true,
                deleted: true,
            },
            true,
        );
    });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { ListItemComponent } from './components/list-item/list-item.component';
import { MockListItemComponent } from './components/list-item/test/mock/list-item.component.mock';
import { ListComponent } from './list.component';
import { _testListClickEvent } from './test/fn/list-test-click-event.test';
import { _testListComponent } from './test/fn/list.test';
import { ListItem } from './types/list-item.model';

describe('ListComponent.', () => {
    let component: ListComponent;
    let fixture: ComponentFixture<ListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                CommonModule,
                MatListModule,
                ListComponent,
                MatListModule,
                MatDividerModule,
                MockListItemComponent,
            ],
        })
            .overrideComponent(ListItemComponent, {
                remove: { imports: [ListItemComponent] },
                add: { imports: [MockListItemComponent] },
            })
            .compileComponents();

        fixture = TestBed.createComponent(ListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        spyOn(component.itemClick, 'emit');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('headers', () => {
        it('should render list', () => {
            component.data.set([]);
            fixture.detectChanges();
            _testListComponent(fixture, []);
        });

        it('should render list', () => {
            component.loading.set(false);
            component.data.set([
                new ListItem({
                    id: '891db31e-dfb5-42ed-b912-48b98463b004',
                    labels: [
                        {
                            text: 'Label 1',
                            tooltip: 'Tooltip 1',
                            disabled: false,
                        },
                        {
                            text: 'Label 2',
                            tooltip: 'Tooltip 2',
                            disabled: true,
                        },
                    ],
                    icons: [
                        {
                            icon: 'checked',
                            tooltip: 'Tooltip 1',
                            disabled: false,
                        },
                        {
                            icon: 'home',
                            tooltip: 'Tooltip 2',
                            disabled: true,
                        },
                    ],
                }),
                new ListItem({
                    id: '891db31e-dfb5-42ed-b912-48b98463b005',
                    icons: [],
                    labels: [],
                }),
            ]);

            fixture.detectChanges();
            _testListComponent(
                fixture,
                [
                    new ListItem({
                        id: '891db31e-dfb5-42ed-b912-48b98463b004',
                        labels: [
                            {
                                text: 'Label 1',
                                tooltip: 'Tooltip 1',
                                disabled: false,
                            },
                            {
                                text: 'Label 2',
                                tooltip: 'Tooltip 2',
                                disabled: true,
                            },
                        ],
                        icons: [
                            {
                                icon: 'checked',
                                tooltip: 'Tooltip 1',
                                disabled: false,
                            },
                            {
                                icon: 'home',
                                tooltip: 'Tooltip 2',
                                disabled: true,
                            },
                        ],
                    }),
                    new ListItem({
                        id: '891db31e-dfb5-42ed-b912-48b98463b005',
                        icons: [],
                        labels: [],
                    }),
                ],
                false,
            );

            const listItemElements: DebugElement[] =
                fixture.debugElement.queryAll(By.directive(ListItemComponent));

            _testListClickEvent(
                component,
                listItemElements[0],
                false,
                '891db31e-dfb5-42ed-b912-48b98463b004',
            );
        });

        it('should render loading list', () => {
            component.loading.set(true);
            component.data.set([
                new ListItem({
                    id: '891db31e-dfb5-42ed-b912-48b98463b004',
                    labels: [
                        {
                            text: 'Label 1',
                            tooltip: 'Tooltip 1',
                            disabled: false,
                        },
                        {
                            text: 'Label 2',
                            tooltip: 'Tooltip 2',
                            disabled: true,
                        },
                    ],
                    icons: [
                        {
                            icon: 'checked',
                            tooltip: 'Tooltip 1',
                            disabled: false,
                        },
                        {
                            icon: 'home',
                            tooltip: 'Tooltip 2',
                            disabled: true,
                        },
                    ],
                }),
                new ListItem({
                    id: '891db31e-dfb5-42ed-b912-48b98463b005',
                    icons: [],
                    labels: [],
                }),
            ]);

            fixture.detectChanges();
            _testListComponent(
                fixture,
                [
                    new ListItem({
                        id: '891db31e-dfb5-42ed-b912-48b98463b004',
                        labels: [
                            {
                                text: 'Label 1',
                                tooltip: 'Tooltip 1',
                                disabled: false,
                            },
                            {
                                text: 'Label 2',
                                tooltip: 'Tooltip 2',
                                disabled: true,
                            },
                        ],
                        icons: [
                            {
                                icon: 'checked',
                                tooltip: 'Tooltip 1',
                                disabled: false,
                            },
                            {
                                icon: 'home',
                                tooltip: 'Tooltip 2',
                                disabled: true,
                            },
                        ],
                    }),
                    new ListItem({
                        id: '891db31e-dfb5-42ed-b912-48b98463b005',
                        icons: [],
                        labels: [],
                    }),
                ],
                true,
            );

            const listItemElements: DebugElement[] =
                fixture.debugElement.queryAll(By.directive(ListItemComponent));

            _testListClickEvent(
                component,
                listItemElements[0],
                true,
                '891db31e-dfb5-42ed-b912-48b98463b004',
            );
        });
    });
});

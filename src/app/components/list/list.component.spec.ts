import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { ListItemComponent } from '@components/list/components/list-item/list-item.component';
import { MockListItemComponent } from '@components/list/components/list-item/test/mock/list-item.component.mock';
import { ListComponent } from '@components/list/list.component';
import { ListHarness } from '@components/list/list.harness';
import { ListItem } from '@components/list/types/list-item.model';
import { ItemIcon } from '@components/models/item-icon/item-icon.model';
import { ItemLabel } from '@components/models/item-label/item-label.model';
import { Icon } from '@enums/icons/icons.enum';

describe('ListComponent.', () => {
    let component: ListComponent;
    let fixture: ComponentFixture<ListComponent>;
    let harness: ListHarness;

    function getComponentItemsData() {
        const _items: {
            labels: ItemLabel[];
            icons: ItemIcon[];
            loading: boolean;
        }[] = [];
        const listItems = fixture.debugElement.queryAll(
            By.directive(ListItemComponent),
        );

        for (const listItem of listItems) {
            const _listItemComponent =
                listItem.componentInstance as ListItemComponent;
            _items.push({
                labels: _listItemComponent.labels(),
                icons: _listItemComponent.icons(),
                loading: _listItemComponent.loading(),
            });
        }
        return _items;
    }

    function getListItem(idx: number) {
        return fixture.debugElement.queryAll(By.directive(ListItemComponent))[
            idx
        ];
    }

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

        harness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            ListHarness,
        );
    });

    it('should create', async () => {
        expect(component).toBeTruthy();

        const state = await harness.getState();
        expect(state).toEqual({ hasValidStructure: true, items: [] });

        expect(getComponentItemsData()).toEqual([]);
    });

    describe('headers', () => {
        it('should render list', async () => {
            component.data.set([]);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({ hasValidStructure: true, items: [] });
        });

        it('should render list', async () => {
            component.loading.set(false);
            fixture.detectChanges();
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
                            name: Icon.checked,
                            tooltip: 'Tooltip 1',
                            disabled: false,
                        },
                        {
                            name: Icon.home,
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

            expect(await harness.getState()).toEqual({
                hasValidStructure: true,
                items: [
                    {
                        loading: false,
                        labels: [
                            {
                                text: 'Label 1',
                                loading: false,
                                disabled: false,
                            },
                            {
                                text: 'Label 2',
                                loading: false,
                                disabled: true,
                            },
                        ],
                        icons: [
                            {
                                name: 'checked',
                                loading: false,
                                disabled: false,
                            },
                            {
                                name: 'home',
                                loading: false,
                                disabled: true,
                            },
                        ],
                    },
                    {
                        loading: false,
                        labels: [],
                        icons: [],
                    },
                ],
            });

            expect(getComponentItemsData()).toEqual([
                {
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
                            name: Icon.checked,
                            tooltip: 'Tooltip 1',
                            disabled: false,
                        },
                        {
                            name: Icon.home,
                            tooltip: 'Tooltip 2',
                            disabled: true,
                        },
                    ],
                    loading: false,
                },
                {
                    labels: [],
                    icons: [],
                    loading: false,
                },
            ]);

            await harness.click(0);
            expect(component.itemClick.emit)
                .withContext('itemClick event fired')
                .toHaveBeenCalledOnceWith(
                    '891db31e-dfb5-42ed-b912-48b98463b004',
                );
        });

        it('should render loading list', async () => {
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
                            name: Icon.checked,
                            tooltip: 'Tooltip 1',
                            disabled: false,
                        },
                        {
                            name: Icon.home,
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

            expect(await harness.getState()).toEqual({
                hasValidStructure: true,
                items: [
                    {
                        loading: true,
                        labels: [
                            {
                                text: '',
                                loading: true,
                                disabled: false,
                            },
                            {
                                text: '',
                                loading: true,
                                disabled: true,
                            },
                        ],
                        icons: [
                            {
                                name: '',
                                loading: true,
                                disabled: false,
                            },
                            {
                                name: '',
                                loading: true,
                                disabled: true,
                            },
                        ],
                    },
                    { loading: true, labels: [], icons: [] },
                ],
            });

            expect(getComponentItemsData()).toEqual([
                {
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
                            name: Icon.checked,
                            tooltip: 'Tooltip 1',
                            disabled: false,
                        },
                        {
                            name: Icon.home,
                            tooltip: 'Tooltip 2',
                            disabled: true,
                        },
                    ],
                    loading: true,
                },
                { labels: [], icons: [], loading: true },
            ]);

            await harness.click(0);
            expect(component.itemClick.emit)
                .withContext('itemClick event not fired')
                .not.toHaveBeenCalled();
        });
    });
});

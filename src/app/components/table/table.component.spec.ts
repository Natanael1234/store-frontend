import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { HeaderItemComponent } from '@components/table/components/header-item/header-item.component';
import { RowItemComponent } from '@components/table/components/row-item/row-item.component';
import { Column } from '@components/table/model/column/column.model';
import { TableComponent } from '@components/table/table.component';
import { TableComponentHarness } from '@components/table/table.component.harness';
import { SortDirection } from '@enums/direction/direction.enum';

describe('TableComponent.', () => {
    let tableComponent: TableComponent;
    let fixture: ComponentFixture<TableComponent>;
    let harness: TableComponentHarness;

    function getComponentInputData() {
        return {
            columns: tableComponent.columns(),
            data: tableComponent.data(),
            loading: tableComponent.loading(),
        };
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [],
            imports: [
                MatTableModule,
                MatSortModule,
                MatIconModule,
                MatTooltipModule,
                TableComponent,
                HeaderItemComponent,
                RowItemComponent,
            ],
        });
        fixture = TestBed.createComponent(TableComponent);
        tableComponent = fixture.componentInstance;
        fixture.detectChanges();

        spyOn(tableComponent.headerClick, 'emit');
        spyOn(tableComponent.rowClick, 'emit');
        harness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            TableComponentHarness,
        );
    });

    it('should create', () => {
        expect(tableComponent).toBeTruthy();

        expect(getComponentInputData()).toEqual({
            columns: [],
            data: [],
            loading: false,
        });
    });

    describe('headers', () => {
        it('should render table headers', async () => {
            tableComponent.columns.set([
                new Column({
                    id: 'col1',
                    label: 'Column 1',
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                    position: 0,
                    shrink: false,
                }),
                new Column({
                    id: 'col2',
                    label: 'Column 2',
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                    position: 1,
                    shrink: false,
                }),
                new Column({
                    id: 'col3',
                    label: 'Column 3',
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                    position: 2,
                    shrink: true,
                }),
                new Column({
                    id: 'col4',
                    label: 'Column 4',
                    direction: SortDirection.desc,
                    sortable: true,
                    disabled: false,
                    position: 3,
                    shrink: true,
                }),
            ]);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                headers: [
                    {
                        label: {
                            text: 'Column 1',
                            disabled: false,
                        },
                        icon: {
                            disabled: false,
                            direction: 'asc',
                        },
                        shrink: false,
                    },
                    {
                        label: {
                            text: 'Column 2',
                            disabled: false,
                        },
                        icon: {
                            disabled: false,
                            direction: 'asc',
                        },
                        shrink: false,
                    },
                    {
                        label: {
                            text: 'Column 3',
                            disabled: false,
                        },
                        icon: {
                            disabled: false,
                            direction: 'asc',
                        },
                        shrink: false,
                    },
                    {
                        label: {
                            text: 'Column 4',
                            disabled: false,
                        },
                        icon: {
                            disabled: false,
                            direction: 'desc',
                        },
                        shrink: false,
                    },
                ],
                rows: [],
            });

            expect(getComponentInputData()).toEqual({
                columns: [
                    new Column({
                        id: 'col1',
                        direction: SortDirection.asc,
                        label: 'Column 1',
                        disabled: false,
                        sortable: true,
                        position: 0,
                        shrink: false,
                    }),
                    new Column({
                        id: 'col2',
                        direction: SortDirection.asc,
                        label: 'Column 2',
                        disabled: false,
                        sortable: true,
                        position: 1,
                        shrink: false,
                    }),
                    new Column({
                        id: 'col3',
                        direction: SortDirection.asc,
                        label: 'Column 3',
                        disabled: false,
                        sortable: true,
                        position: 2,
                        shrink: true,
                    }),
                    new Column({
                        id: 'col4',
                        direction: SortDirection.desc,
                        label: 'Column 4',
                        disabled: false,
                        sortable: true,
                        position: 3,
                        shrink: true,
                    }),
                ],
                data: [],
                loading: false,
            });
        });
    });

    describe('rows', () => {
        it('should render not loading table rows when loading is not defined', async () => {
            tableComponent.columns.set([
                new Column({
                    id: 'col1',
                    label: 'Column 1',
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                    position: 0,
                    shrink: false,
                }),
                new Column({
                    id: 'col2',
                    label: 'Column 2',
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                    position: 1,
                    shrink: false,
                }),
                new Column({
                    id: 'col3',
                    label: 'Column 3',
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                    position: 2,
                    shrink: true,
                }),
                new Column({
                    id: 'col4',
                    label: 'Column 4',
                    direction: SortDirection.desc,
                    sortable: true,
                    disabled: false,
                    position: 3,
                    shrink: true,
                }),
            ]);

            tableComponent.data.set([
                {
                    id: '891db31e-dfb5-42ed-b912-48b98463b004',
                    columns: {
                        col1: {
                            icon: 'check',
                            label: 'Column 1a',
                            tooltip: 'Tooltip 1a',
                            disabled: true,
                        },
                        col2: {
                            icon: 'home',
                            label: 'Column 2a',
                            tooltip: 'Tooltip 2a',
                            disabled: true,
                        },
                        col3: {
                            icon: 'user',
                            label: 'Column 3a',
                            tooltip: 'Tooltip 3a',
                            disabled: false,
                        },
                        col4: {
                            icon: 'close',
                            label: 'Column 4a',
                            tooltip: 'Tooltip 4a',
                            disabled: false,
                        },
                    },
                },
                {
                    id: '891db31e-dfb5-42ed-b912-48b98463b005',
                    columns: {
                        col1: {
                            icon: 'add',
                            label: 'Column 1b',
                            tooltip: 'Tooltip 1b',
                            disabled: false,
                        },
                        col2: {
                            icon: 'menu',
                            label: 'Column 2b',
                            tooltip: 'Tooltip 2b',
                            disabled: false,
                        },
                        col3: {
                            icon: 'key',
                            label: 'Column 3b',
                            tooltip: 'Tooltip 3b',
                            disabled: true,
                        },
                        col4: {
                            icon: 'person',
                            label: 'Column 4b',
                            tooltip: 'Tooltip 4b',
                            disabled: true,
                        },
                    },
                },
            ]);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                headers: [
                    {
                        label: {
                            text: 'Column 1',
                            disabled: false,
                        },
                        icon: {
                            disabled: false,
                            direction: 'asc',
                        },
                        shrink: false,
                    },
                    {
                        label: {
                            text: 'Column 2',
                            disabled: false,
                        },
                        icon: {
                            disabled: false,
                            direction: 'asc',
                        },
                        shrink: false,
                    },
                    {
                        label: {
                            text: 'Column 3',
                            disabled: false,
                        },
                        icon: {
                            disabled: false,
                            direction: 'asc',
                        },
                        shrink: false,
                    },
                    {
                        label: {
                            text: 'Column 4',
                            disabled: false,
                        },
                        icon: {
                            disabled: false,
                            direction: 'desc',
                        },
                        shrink: false,
                    },
                ],
                rows: [
                    [
                        {
                            icon: {
                                name: 'check',
                                loading: false,
                                disabled: true,
                            },
                            label: {
                                text: 'Column 1a',
                                loading: false,
                                disabled: true,
                            },
                            shrink: false,
                        },
                        {
                            icon: {
                                name: 'home',
                                loading: false,
                                disabled: true,
                            },
                            label: {
                                text: 'Column 2a',
                                loading: false,
                                disabled: true,
                            },
                            shrink: false,
                        },
                        {
                            icon: {
                                name: 'user',
                                loading: false,
                                disabled: false,
                            },
                            label: {
                                text: 'Column 3a',
                                loading: false,
                                disabled: false,
                            },
                            shrink: false,
                        },
                        {
                            icon: {
                                name: 'close',
                                loading: false,
                                disabled: false,
                            },
                            label: {
                                text: 'Column 4a',
                                loading: false,
                                disabled: false,
                            },
                            shrink: false,
                        },
                    ],
                    [
                        {
                            icon: {
                                name: 'add',
                                loading: false,
                                disabled: false,
                            },
                            label: {
                                text: 'Column 1b',
                                loading: false,
                                disabled: false,
                            },
                            shrink: false,
                        },
                        {
                            icon: {
                                name: 'menu',
                                loading: false,
                                disabled: false,
                            },
                            label: {
                                text: 'Column 2b',
                                loading: false,
                                disabled: false,
                            },
                            shrink: false,
                        },
                        {
                            icon: {
                                name: 'key',
                                loading: false,
                                disabled: true,
                            },
                            label: {
                                text: 'Column 3b',
                                loading: false,
                                disabled: true,
                            },
                            shrink: false,
                        },
                        {
                            icon: {
                                name: 'person',
                                loading: false,
                                disabled: true,
                            },
                            label: {
                                text: 'Column 4b',
                                loading: false,
                                disabled: true,
                            },
                            shrink: false,
                        },
                    ],
                ],
            });

            expect(getComponentInputData()).toEqual({
                columns: [
                    new Column({
                        id: 'col1',
                        direction: SortDirection.asc,
                        label: 'Column 1',
                        disabled: false,
                        sortable: true,
                        position: 0,
                        shrink: false,
                    }),
                    new Column({
                        id: 'col2',
                        direction: SortDirection.asc,
                        label: 'Column 2',
                        disabled: false,
                        sortable: true,
                        position: 1,
                        shrink: false,
                    }),
                    new Column({
                        id: 'col3',
                        direction: SortDirection.asc,
                        label: 'Column 3',
                        disabled: false,
                        sortable: true,
                        position: 2,
                        shrink: true,
                    }),
                    new Column({
                        id: 'col4',
                        direction: SortDirection.desc,
                        label: 'Column 4',
                        disabled: false,
                        sortable: true,
                        position: 3,
                        shrink: true,
                    }),
                ],
                data: [
                    {
                        id: '891db31e-dfb5-42ed-b912-48b98463b004',
                        columns: {
                            col1: {
                                icon: 'check',
                                label: 'Column 1a',
                                tooltip: 'Tooltip 1a',
                                disabled: true,
                            },
                            col2: {
                                icon: 'home',
                                label: 'Column 2a',
                                tooltip: 'Tooltip 2a',
                                disabled: true,
                            },
                            col3: {
                                icon: 'user',
                                label: 'Column 3a',
                                tooltip: 'Tooltip 3a',
                                disabled: false,
                            },
                            col4: {
                                icon: 'close',
                                label: 'Column 4a',
                                tooltip: 'Tooltip 4a',
                                disabled: false,
                            },
                        },
                    },
                    {
                        id: '891db31e-dfb5-42ed-b912-48b98463b005',
                        columns: {
                            col1: {
                                icon: 'add',
                                label: 'Column 1b',
                                tooltip: 'Tooltip 1b',
                                disabled: false,
                            },
                            col2: {
                                icon: 'menu',
                                label: 'Column 2b',
                                tooltip: 'Tooltip 2b',
                                disabled: false,
                            },
                            col3: {
                                icon: 'key',
                                label: 'Column 3b',
                                tooltip: 'Tooltip 3b',
                                disabled: true,
                            },
                            col4: {
                                icon: 'person',
                                label: 'Column 4b',
                                tooltip: 'Tooltip 4b',
                                disabled: true,
                            },
                        },
                    },
                ],
                loading: false,
            });
        });

        it('should render not loading table rows when loading = false', async () => {
            tableComponent.columns.set([
                new Column({
                    id: 'col1',
                    label: 'Column 1',
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                    position: 0,
                    shrink: false,
                }),
                new Column({
                    id: 'col2',
                    label: 'Column 2',
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                    position: 1,
                    shrink: false,
                }),
                new Column({
                    id: 'col3',
                    label: 'Column 3',
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                    position: 2,
                    shrink: true,
                }),
                new Column({
                    id: 'col4',
                    label: 'Column 4',
                    direction: SortDirection.desc,
                    sortable: true,
                    disabled: false,
                    position: 3,
                    shrink: true,
                }),
            ]);

            tableComponent.loading.set(false);
            tableComponent.data.set([
                {
                    id: '891db31e-dfb5-42ed-b912-48b98463b004',
                    columns: {
                        col1: {
                            icon: 'check',
                            label: 'Column 1a',
                            tooltip: 'Tooltip 1a',
                            disabled: true,
                        },
                        col2: {
                            icon: 'home',
                            label: 'Column 2a',
                            tooltip: 'Tooltip 2a',
                            disabled: true,
                        },
                        col3: {
                            icon: 'user',
                            label: 'Column 3a',
                            tooltip: 'Tooltip 3a',
                            disabled: false,
                        },
                        col4: {
                            icon: 'close',
                            label: 'Column 4a',
                            tooltip: 'Tooltip 4a',
                            disabled: false,
                        },
                    },
                },
                {
                    id: '891db31e-dfb5-42ed-b912-48b98463b005',
                    columns: {
                        col1: {
                            icon: 'add',
                            label: 'Column 1b',
                            tooltip: 'Tooltip 1b',
                            disabled: false,
                        },
                        col2: {
                            icon: 'menu',
                            label: 'Column 2b',
                            tooltip: 'Tooltip 2b',
                            disabled: false,
                        },
                        col3: {
                            icon: 'key',
                            label: 'Column 3b',
                            tooltip: 'Tooltip 3b',
                            disabled: true,
                        },
                        col4: {
                            icon: 'person',
                            label: 'Column 4b',
                            tooltip: 'Tooltip 4b',
                            disabled: true,
                        },
                    },
                },
            ]);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                headers: [
                    {
                        label: {
                            text: 'Column 1',
                            disabled: false,
                        },
                        icon: {
                            disabled: false,
                            direction: 'asc',
                        },
                        shrink: false,
                    },
                    {
                        label: {
                            text: 'Column 2',
                            disabled: false,
                        },
                        icon: {
                            disabled: false,
                            direction: 'asc',
                        },
                        shrink: false,
                    },
                    {
                        label: {
                            text: 'Column 3',
                            disabled: false,
                        },
                        icon: {
                            disabled: false,
                            direction: 'asc',
                        },
                        shrink: false,
                    },
                    {
                        label: {
                            text: 'Column 4',
                            disabled: false,
                        },
                        icon: {
                            disabled: false,
                            direction: 'desc',
                        },
                        shrink: false,
                    },
                ],
                rows: [
                    [
                        {
                            icon: {
                                name: 'check',
                                loading: false,
                                disabled: true,
                            },
                            label: {
                                text: 'Column 1a',
                                loading: false,
                                disabled: true,
                            },
                            shrink: false,
                        },
                        {
                            icon: {
                                name: 'home',
                                loading: false,
                                disabled: true,
                            },
                            label: {
                                text: 'Column 2a',
                                loading: false,
                                disabled: true,
                            },
                            shrink: false,
                        },
                        {
                            icon: {
                                name: 'user',
                                loading: false,
                                disabled: false,
                            },
                            label: {
                                text: 'Column 3a',
                                loading: false,
                                disabled: false,
                            },
                            shrink: false,
                        },
                        {
                            icon: {
                                name: 'close',
                                loading: false,
                                disabled: false,
                            },
                            label: {
                                text: 'Column 4a',
                                loading: false,
                                disabled: false,
                            },
                            shrink: false,
                        },
                    ],
                    [
                        {
                            icon: {
                                name: 'add',
                                loading: false,
                                disabled: false,
                            },
                            label: {
                                text: 'Column 1b',
                                loading: false,
                                disabled: false,
                            },
                            shrink: false,
                        },
                        {
                            icon: {
                                name: 'menu',
                                loading: false,
                                disabled: false,
                            },
                            label: {
                                text: 'Column 2b',
                                loading: false,
                                disabled: false,
                            },
                            shrink: false,
                        },
                        {
                            icon: {
                                name: 'key',
                                loading: false,
                                disabled: true,
                            },
                            label: {
                                text: 'Column 3b',
                                loading: false,
                                disabled: true,
                            },
                            shrink: false,
                        },
                        {
                            icon: {
                                name: 'person',
                                loading: false,
                                disabled: true,
                            },
                            label: {
                                text: 'Column 4b',
                                loading: false,
                                disabled: true,
                            },
                            shrink: false,
                        },
                    ],
                ],
            });

            expect(getComponentInputData()).toEqual({
                columns: [
                    new Column({
                        id: 'col1',
                        direction: SortDirection.asc,
                        label: 'Column 1',
                        disabled: false,
                        sortable: true,
                        position: 0,
                        shrink: false,
                    }),
                    new Column({
                        id: 'col2',
                        direction: SortDirection.asc,
                        label: 'Column 2',
                        disabled: false,
                        sortable: true,
                        position: 1,
                        shrink: false,
                    }),
                    new Column({
                        id: 'col3',
                        direction: SortDirection.asc,
                        label: 'Column 3',
                        disabled: false,
                        sortable: true,
                        position: 2,
                        shrink: true,
                    }),
                    new Column({
                        id: 'col4',
                        direction: SortDirection.desc,
                        label: 'Column 4',
                        disabled: false,
                        sortable: true,
                        position: 3,
                        shrink: true,
                    }),
                ],
                data: [
                    {
                        id: '891db31e-dfb5-42ed-b912-48b98463b004',
                        columns: {
                            col1: {
                                icon: 'check',
                                label: 'Column 1a',
                                tooltip: 'Tooltip 1a',
                                disabled: true,
                            },
                            col2: {
                                icon: 'home',
                                label: 'Column 2a',
                                tooltip: 'Tooltip 2a',
                                disabled: true,
                            },
                            col3: {
                                icon: 'user',
                                label: 'Column 3a',
                                tooltip: 'Tooltip 3a',
                                disabled: false,
                            },
                            col4: {
                                icon: 'close',
                                label: 'Column 4a',
                                tooltip: 'Tooltip 4a',
                                disabled: false,
                            },
                        },
                    },
                    {
                        id: '891db31e-dfb5-42ed-b912-48b98463b005',
                        columns: {
                            col1: {
                                icon: 'add',
                                label: 'Column 1b',
                                tooltip: 'Tooltip 1b',
                                disabled: false,
                            },
                            col2: {
                                icon: 'menu',
                                label: 'Column 2b',
                                tooltip: 'Tooltip 2b',
                                disabled: false,
                            },
                            col3: {
                                icon: 'key',
                                label: 'Column 3b',
                                tooltip: 'Tooltip 3b',
                                disabled: true,
                            },
                            col4: {
                                icon: 'person',
                                label: 'Column 4b',
                                tooltip: 'Tooltip 4b',
                                disabled: true,
                            },
                        },
                    },
                ],
                loading: false,
            });
        });

        it('should render loading table rows while loading', async () => {
            tableComponent.columns.set([
                new Column({
                    id: 'col1',
                    label: 'Column 1',
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                    position: 0,
                    shrink: false,
                }),
                new Column({
                    id: 'col2',
                    label: 'Column 2',
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                    position: 1,
                    shrink: false,
                }),
                new Column({
                    id: 'col3',
                    label: 'Column 3',
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                    position: 2,
                    shrink: true,
                }),
                new Column({
                    id: 'col4',
                    label: 'Column 4',
                    direction: SortDirection.desc,
                    sortable: true,
                    disabled: false,
                    position: 3,
                    shrink: true,
                }),
            ]);

            tableComponent.loading.set(true);
            tableComponent.data.set([
                {
                    id: '891db31e-dfb5-42ed-b912-48b98463b004',
                    columns: {
                        col1: {
                            icon: 'check',
                            label: 'Column 1a',
                            tooltip: 'Tooltip 1a',
                            disabled: true,
                        },
                        col2: {
                            icon: 'home',
                            label: 'Column 2a',
                            tooltip: 'Tooltip 2a',
                            disabled: true,
                        },
                        col3: {
                            icon: 'user',
                            label: 'Column 3a',
                            tooltip: 'Tooltip 3a',
                            disabled: false,
                        },
                        col4: {
                            icon: 'close',
                            label: 'Column 4a',
                            tooltip: 'Tooltip 4a',
                            disabled: false,
                        },
                    },
                },
                {
                    id: '891db31e-dfb5-42ed-b912-48b98463b005',
                    columns: {
                        col1: {
                            icon: 'add',
                            label: 'Column 1b',
                            tooltip: 'Tooltip 1b',
                            disabled: false,
                        },
                        col2: {
                            icon: 'menu',
                            label: 'Column 2b',
                            tooltip: 'Tooltip 2b',
                            disabled: false,
                        },
                        col3: {
                            icon: 'key',
                            label: 'Column 3b',
                            tooltip: 'Tooltip 3b',
                            disabled: true,
                        },
                        col4: {
                            icon: 'person',
                            label: 'Column 4b',
                            tooltip: 'Tooltip 4b',
                            disabled: true,
                        },
                    },
                },
            ]);
            fixture.detectChanges();

            const state = await harness.getState();
            expect(state).toEqual({
                headers: [
                    {
                        label: {
                            text: 'Column 1',
                            disabled: false,
                        },
                        icon: {
                            disabled: false,
                            direction: 'asc',
                        },
                        shrink: false,
                    },
                    {
                        label: {
                            text: 'Column 2',
                            disabled: false,
                        },
                        icon: {
                            disabled: false,
                            direction: 'asc',
                        },
                        shrink: false,
                    },
                    {
                        label: {
                            text: 'Column 3',
                            disabled: false,
                        },
                        icon: {
                            disabled: false,
                            direction: 'asc',
                        },
                        shrink: false,
                    },
                    {
                        label: {
                            text: 'Column 4',
                            disabled: false,
                        },
                        icon: {
                            disabled: false,
                            direction: 'desc',
                        },
                        shrink: false,
                    },
                ],
                rows: [
                    [
                        {
                            icon: {
                                name: '',
                                loading: true,
                                disabled: true,
                            },
                            label: {
                                text: '',
                                loading: true,
                                disabled: true,
                            },
                            shrink: false,
                        },
                        {
                            icon: {
                                name: '',
                                loading: true,
                                disabled: true,
                            },
                            label: {
                                text: '',
                                loading: true,
                                disabled: true,
                            },
                            shrink: false,
                        },
                        {
                            icon: {
                                name: '',
                                loading: true,
                                disabled: true,
                            },
                            label: {
                                text: '',
                                loading: true,
                                disabled: true,
                            },
                            shrink: false,
                        },
                        {
                            icon: {
                                name: '',
                                loading: true,
                                disabled: true,
                            },
                            label: {
                                text: '',
                                loading: true,
                                disabled: true,
                            },
                            shrink: false,
                        },
                    ],
                    [
                        {
                            icon: {
                                name: '',
                                loading: true,
                                disabled: true,
                            },
                            label: {
                                text: '',
                                loading: true,
                                disabled: true,
                            },
                            shrink: false,
                        },
                        {
                            icon: {
                                name: '',
                                loading: true,
                                disabled: true,
                            },
                            label: {
                                text: '',
                                loading: true,
                                disabled: true,
                            },
                            shrink: false,
                        },
                        {
                            icon: {
                                name: '',
                                loading: true,
                                disabled: true,
                            },
                            label: {
                                text: '',
                                loading: true,
                                disabled: true,
                            },
                            shrink: false,
                        },
                        {
                            icon: {
                                name: '',
                                loading: true,
                                disabled: true,
                            },
                            label: {
                                text: '',
                                loading: true,
                                disabled: true,
                            },
                            shrink: false,
                        },
                    ],
                ],
            });

            expect(getComponentInputData()).toEqual({
                columns: [
                    new Column({
                        id: 'col1',
                        direction: SortDirection.asc,
                        label: 'Column 1',
                        disabled: false,
                        sortable: true,
                        position: 0,
                        shrink: false,
                    }),
                    new Column({
                        id: 'col2',
                        direction: SortDirection.asc,
                        label: 'Column 2',
                        disabled: false,
                        sortable: true,
                        position: 1,
                        shrink: false,
                    }),
                    new Column({
                        id: 'col3',
                        direction: SortDirection.asc,
                        label: 'Column 3',
                        disabled: false,
                        sortable: true,
                        position: 2,
                        shrink: true,
                    }),
                    new Column({
                        id: 'col4',
                        direction: SortDirection.desc,
                        label: 'Column 4',
                        disabled: false,
                        sortable: true,
                        position: 3,
                        shrink: true,
                    }),
                ],
                data: [
                    {
                        id: '891db31e-dfb5-42ed-b912-48b98463b004',
                        columns: {
                            col1: {
                                icon: 'check',
                                label: 'Column 1a',
                                tooltip: 'Tooltip 1a',
                                disabled: true,
                            },
                            col2: {
                                icon: 'home',
                                label: 'Column 2a',
                                tooltip: 'Tooltip 2a',
                                disabled: true,
                            },
                            col3: {
                                icon: 'user',
                                label: 'Column 3a',
                                tooltip: 'Tooltip 3a',
                                disabled: false,
                            },
                            col4: {
                                icon: 'close',
                                label: 'Column 4a',
                                tooltip: 'Tooltip 4a',
                                disabled: false,
                            },
                        },
                    },
                    {
                        id: '891db31e-dfb5-42ed-b912-48b98463b005',
                        columns: {
                            col1: {
                                icon: 'add',
                                label: 'Column 1b',
                                tooltip: 'Tooltip 1b',
                                disabled: false,
                            },
                            col2: {
                                icon: 'menu',
                                label: 'Column 2b',
                                tooltip: 'Tooltip 2b',
                                disabled: false,
                            },
                            col3: {
                                icon: 'key',
                                label: 'Column 3b',
                                tooltip: 'Tooltip 3b',
                                disabled: true,
                            },
                            col4: {
                                icon: 'person',
                                label: 'Column 4b',
                                tooltip: 'Tooltip 4b',
                                disabled: true,
                            },
                        },
                    },
                ],
                loading: true,
            });
        });
    });

    describe('events', () => {
        beforeEach(() => {
            tableComponent.columns.set([
                {
                    id: 'col1',
                    label: 'Column 1',
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                    position: 0,
                    shrink: false,
                },
                {
                    id: 'col2',
                    label: 'Column 2',
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                    position: 1,
                    shrink: false,
                },
                {
                    id: 'col3',
                    label: 'Column 3',
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                    position: 2,
                    shrink: true,
                },
                {
                    id: 'col4',
                    label: 'Column 4',
                    direction: SortDirection.desc,
                    sortable: true,
                    disabled: false,
                    position: 3,
                    shrink: true,
                },
            ]);
            tableComponent.data.set([
                {
                    id: '891db31e-dfb5-42ed-b912-48b98463b004',
                    columns: {
                        col1: {
                            icon: 'check',
                            label: 'Column 1a',
                            tooltip: 'Tooltip 1a',
                            disabled: true,
                        },
                        col2: {
                            icon: 'home',
                            label: 'Column 2a',
                            tooltip: 'Tooltip 2a',
                            disabled: true,
                        },
                        col3: {
                            icon: 'user',
                            label: 'Column 3a',
                            tooltip: 'Tooltip 3a',
                            disabled: false,
                        },
                        col4: {
                            icon: 'close',
                            label: 'Column 4a',
                            tooltip: 'Tooltip 4a',
                            disabled: false,
                        },
                    },
                },
            ]);
            fixture.detectChanges();
        });

        describe('header events', () => {
            it('should fire middle click events when loading model is false.', async () => {
                tableComponent.loading.set(false);
                fixture.detectChanges();

                // header click
                const headerItem = fixture.debugElement.query(
                    By.directive(HeaderItemComponent),
                ).componentInstance as HeaderItemComponent;
                headerItem.onSelect.emit({
                    columnId: 'name',
                    direction: SortDirection.asc,
                });
                expect(
                    tableComponent.headerClick.emit,
                ).toHaveBeenCalledOnceWith('name_asc');

                await harness.triggerRowLeftClick(0);
                expect(tableComponent.rowClick.emit).toHaveBeenCalledOnceWith(
                    '891db31e-dfb5-42ed-b912-48b98463b004',
                );
            });

            it('should not fire middle click events while loading.', async () => {
                tableComponent.loading.set(true);

                fixture.detectChanges();

                // header click
                const headerItem = fixture.debugElement.query(
                    By.directive(HeaderItemComponent),
                ).componentInstance as HeaderItemComponent;
                headerItem.onSelect.emit({
                    columnId: 'name',
                    direction: SortDirection.asc,
                });
                expect(tableComponent.headerClick.emit).not.toHaveBeenCalled();

                // row click
                await harness.triggerRowLeftClick(0);
                expect(tableComponent.rowClick.emit).not.toHaveBeenCalled();
            });
        });

        describe('row events.', () => {
            describe('left click on a row.', () => {
                it('should fire row left click event when loading model is not defined.', async () => {
                    fixture.detectChanges();
                    await harness.triggerRowLeftClick(0);

                    expect(tableComponent.rowClick.emit)
                        .withContext('row click event called')
                        .toHaveBeenCalledTimes(1);
                });

                it('should fire row left click event when loading model is false.', async () => {
                    tableComponent.loading.set(false);
                    fixture.detectChanges();
                    await harness.triggerRowLeftClick(0);

                    expect(tableComponent.rowClick.emit)
                        .withContext('row click event called')
                        .toHaveBeenCalledTimes(1);
                });

                it('should not fire row left click event when loading is true.', async () => {
                    tableComponent.loading.set(true);
                    fixture.detectChanges();
                    await harness.triggerRowLeftClick(0);

                    expect(tableComponent.rowClick.emit)
                        .withContext('row click event called')
                        .not.toHaveBeenCalled();
                });
            });

            describe('middle click on a row.', () => {
                it('should not fire row middle click event whe loading model is not defined.', async () => {
                    fixture.detectChanges();
                    await harness.triggerRowMiddleClick(0);

                    expect(tableComponent.rowClick.emit)
                        .withContext('row click event called')
                        .not.toHaveBeenCalled();
                });

                it('should not fire row middle click event whe loading model is false.', async () => {
                    tableComponent.loading.set(false);
                    fixture.detectChanges();
                    await harness.triggerRowMiddleClick(0);

                    expect(tableComponent.rowClick.emit)
                        .withContext('row click event called')
                        .not.toHaveBeenCalled();
                });

                it('should not fire row middle click event whe loading model is true.', async () => {
                    tableComponent.loading.set(true);
                    fixture.detectChanges();
                    await harness.triggerRowMiddleClick(0);

                    expect(tableComponent.rowClick.emit)
                        .withContext('row click event called')
                        .not.toHaveBeenCalled();
                });
            });

            describe('right click on a row.', () => {
                it('should not fire row middle click event whe loading model is not defined.', async () => {
                    fixture.detectChanges();
                    await harness.triggerRowRightClick(0);

                    expect(tableComponent.rowClick.emit)
                        .withContext('row click event called')
                        .not.toHaveBeenCalled();
                });

                it('should not fire row middle click event whe loading model is false.', async () => {
                    tableComponent.loading.set(false);
                    fixture.detectChanges();
                    await harness.triggerRowRightClick(0);

                    expect(tableComponent.rowClick.emit)
                        .withContext('row click event called')
                        .not.toHaveBeenCalled();
                });

                it('should not fire row middle click event whe loading model is true.', async () => {
                    tableComponent.loading.set(true);
                    fixture.detectChanges();
                    await harness.triggerRowRightClick(0);

                    expect(tableComponent.rowClick.emit)
                        .withContext('row click event called')
                        .not.toHaveBeenCalled();
                });
            });
        });

        describe('touch on a row.', () => {
            it('should fire row touch when loading model is not defined (not loading).', async () => {
                fixture.detectChanges();
                await harness.triggerRowTouch(0);

                expect(tableComponent.rowClick.emit)
                    .withContext('row click event called')
                    .toHaveBeenCalledTimes(1);
            });

            it('should fire row touch event when loading model is false.', async () => {
                tableComponent.loading.set(false);
                fixture.detectChanges();
                await harness.triggerRowTouch(0);

                expect(tableComponent.rowClick.emit)
                    .withContext('row click event called')
                    .toHaveBeenCalledTimes(1);
            });

            it('should not fire row touch event while loading model is true.', async () => {
                tableComponent.loading.set(true);
                fixture.detectChanges();

                await harness.triggerRowTouch(0);

                expect(tableComponent.rowClick.emit)
                    .withContext('row click event called')
                    .not.toHaveBeenCalled();
            });
        });

        describe('pen click on a row.', () => {
            it('should fire row pen click event when loading model is not defined.', async () => {
                tableComponent.loading.set(false);
                fixture.detectChanges();
                await harness.triggerRowPenClick(0);

                expect(tableComponent.rowClick.emit)
                    .withContext('row click event called')
                    .toHaveBeenCalledTimes(1);
            });

            it('should fire row pen click event when loading model is false.', async () => {
                tableComponent.loading.set(false);
                fixture.detectChanges();
                await harness.triggerRowPenClick(0);

                expect(tableComponent.rowClick.emit)
                    .withContext('row click event called')
                    .toHaveBeenCalledTimes(1);
            });

            it('should not fire pen click event when loading model is true.', async () => {
                tableComponent.loading.set(true);
                fixture.detectChanges();

                await harness.triggerRowPenClick(0);

                expect(tableComponent.rowClick.emit)
                    .withContext('row click event called')
                    .not.toHaveBeenCalled();
            });
        });
    });
});

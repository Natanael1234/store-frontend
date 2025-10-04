import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { SortDirection } from '../../../enums/direction/direction.enum';
import { MouseButton } from '../../../enums/mouse-button/mouse-button.enum';
import { PointerType } from '../../../enums/pointer-type/pointer-type.enum';
import { HeaderItemComponent } from './components/header-item/header-item.component';
import { MockHeaderItemComponent } from './components/header-item/test/mock/header-item-component.mock';
import { Column } from './model/column/column.model';
import { TableComponent } from './table.component';
import { _testTableHeadersComponent } from './test/fn/table-header-item-component.test';
import { _testTableData } from './test/fn/user-table-data.test';

describe('TableComponent', () => {
    let tableComponent: TableComponent;
    let fixture: ComponentFixture<TableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [],
            imports: [
                MatTableModule,
                MatSortModule,
                MatIconModule,
                MatTooltipModule,
                TableComponent,
                MockHeaderItemComponent,
            ],
        }).overrideComponent(TableComponent, {
            remove: { imports: [HeaderItemComponent] },
            add: { imports: [MockHeaderItemComponent] },
        });
        fixture = TestBed.createComponent(TableComponent);
        tableComponent = fixture.componentInstance;
        fixture.detectChanges();

        spyOn(tableComponent.headerClick, 'emit');
        spyOn(tableComponent.rowClick, 'emit');
    });

    it('should create', () => {
        expect(tableComponent).toBeTruthy();
    });

    describe('headers', () => {
        it('should render table headers', () => {
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
            _testTableHeadersComponent(fixture, [
                {
                    id: 'col1',
                    label: 'Column 1',
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: 'col2',
                    label: 'Column 2',
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: 'col3',
                    label: 'Column 3',
                    direction: SortDirection.asc,
                    sortable: true,
                    disabled: false,
                },
                {
                    id: 'col4',
                    label: 'Column 4',
                    direction: SortDirection.desc,
                    sortable: true,
                    disabled: false,
                },
            ]);
        });
    });

    describe('rows', () => {
        it('should render not loading table rows when loading is not defined', () => {
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

            _testTableData(
                fixture,
                [
                    [
                        {
                            id: 'col1',
                            icon: 'check',
                            label: 'Column 1a',
                            tooltip: 'Tooltip 1a',
                            disabled: true,
                            shrink: false,
                        },

                        {
                            id: 'col2',
                            icon: 'home',
                            label: 'Column 2a',
                            tooltip: 'Tooltip 2a',
                            disabled: true,
                            shrink: false,
                        },
                        {
                            id: 'col3',
                            icon: 'user',
                            label: 'Column 3a',
                            tooltip: 'Tooltip 3a',
                            disabled: false,
                            shrink: true,
                        },
                        {
                            id: 'col4',
                            icon: 'close',
                            label: 'Column 4a',
                            tooltip: 'Tooltip 4a',
                            disabled: false,
                            shrink: true,
                        },
                    ],
                    [
                        {
                            id: 'col1',
                            icon: 'add',
                            label: 'Column 1b',
                            tooltip: 'Tooltip 1b',
                            disabled: false,
                            shrink: false,
                        },

                        {
                            id: 'col2',
                            icon: 'menu',
                            label: 'Column 2b',
                            tooltip: 'Tooltip 2b',
                            disabled: false,
                            shrink: false,
                        },
                        {
                            id: 'col3',
                            icon: 'key',
                            label: 'Column 3b',
                            tooltip: 'Tooltip 3b',
                            disabled: true,
                            shrink: true,
                        },
                        {
                            id: 'col4',
                            icon: 'person',
                            label: 'Column 4b',
                            tooltip: 'Tooltip 4b',
                            disabled: true,
                            shrink: true,
                        },
                    ],
                ],
                false,
            );
        });

        it('should render not loading table rows when loading = false', () => {
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

            _testTableData(
                fixture,
                [
                    [
                        {
                            id: 'col1',
                            icon: 'check',
                            label: 'Column 1a',
                            tooltip: 'Tooltip 1a',
                            disabled: true,
                            shrink: false,
                        },

                        {
                            id: 'col2',
                            icon: 'home',
                            label: 'Column 2a',
                            tooltip: 'Tooltip 2a',
                            disabled: true,
                            shrink: false,
                        },
                        {
                            id: 'col3',
                            icon: 'user',
                            label: 'Column 3a',
                            tooltip: 'Tooltip 3a',
                            disabled: false,
                            shrink: true,
                        },
                        {
                            id: 'col4',
                            icon: 'close',
                            label: 'Column 4a',
                            tooltip: 'Tooltip 4a',
                            disabled: false,
                            shrink: true,
                        },
                    ],
                    [
                        {
                            id: 'col1',
                            icon: 'add',
                            label: 'Column 1b',
                            tooltip: 'Tooltip 1b',
                            disabled: false,
                            shrink: false,
                        },

                        {
                            id: 'col2',
                            icon: 'menu',
                            label: 'Column 2b',
                            tooltip: 'Tooltip 2b',
                            disabled: false,
                            shrink: false,
                        },
                        {
                            id: 'col3',
                            icon: 'key',
                            label: 'Column 3b',
                            tooltip: 'Tooltip 3b',
                            disabled: true,
                            shrink: true,
                        },
                        {
                            id: 'col4',
                            icon: 'person',
                            label: 'Column 4b',
                            tooltip: 'Tooltip 4b',
                            disabled: true,
                            shrink: true,
                        },
                    ],
                ],
                false,
            );
        });

        it('should render loading table rows while loading', () => {
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

            _testTableData(
                fixture,
                [
                    [
                        {
                            id: 'col1',
                            icon: 'check',
                            label: 'Column 1a',
                            tooltip: 'Tooltip 1a',
                            disabled: true,
                            shrink: false,
                        },

                        {
                            id: 'col2',
                            icon: 'home',
                            label: 'Column 2a',
                            tooltip: 'Tooltip 2a',
                            disabled: true,
                            shrink: false,
                        },
                        {
                            id: 'col3',
                            icon: 'user',
                            label: 'Column 3a',
                            tooltip: 'Tooltip 3a',
                            disabled: false,
                            shrink: true,
                        },
                        {
                            id: 'col4',
                            icon: 'close',
                            label: 'Column 4a',
                            tooltip: 'Tooltip 4a',
                            disabled: false,
                            shrink: true,
                        },
                    ],
                    [
                        {
                            id: 'col1',
                            icon: 'add',
                            label: 'Column 1b',
                            tooltip: 'Tooltip 1b',
                            disabled: false,
                            shrink: false,
                        },

                        {
                            id: 'col2',
                            icon: 'menu',
                            label: 'Column 2b',
                            tooltip: 'Tooltip 2b',
                            disabled: false,
                            shrink: false,
                        },
                        {
                            id: 'col3',
                            icon: 'key',
                            label: 'Column 3b',
                            tooltip: 'Tooltip 3b',
                            disabled: true,
                            shrink: true,
                        },
                        {
                            id: 'col4',
                            icon: 'person',
                            label: 'Column 4b',
                            tooltip: 'Tooltip 4b',
                            disabled: true,
                            shrink: true,
                        },
                    ],
                ],
                true,
            );
        });

        it('should fire row click event', () => {
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
            ]);
            fixture.detectChanges();
            const debugElements = fixture.debugElement.queryAll(
                By.css('tr.mat-row'),
            );
            debugElements[0].nativeElement.dispatchEvent(
                new PointerEvent('click', {
                    button: MouseButton.left,
                    pointerType: PointerType.mouse,
                }),
            );

            expect(tableComponent.rowClick.emit)
                .withContext('row click event called')
                .toHaveBeenCalledTimes(1);
        });
    });

    describe('events', () => {
        it('should not fire click events while not loading', () => {
            tableComponent.loading.set(false);
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
            ]);
            fixture.detectChanges();

            // header click
            const header = fixture.debugElement.query(
                By.directive(HeaderItemComponent),
            ).componentInstance as HeaderItemComponent;
            header.onSelect.emit({
                columnId: 'name',
                direction: SortDirection.asc,
            });
            expect(tableComponent.headerClick.emit).toHaveBeenCalledOnceWith(
                'name_asc',
            );

            // row click
            const rowElements = fixture.debugElement.queryAll(
                By.css('tr.mat-row'),
            );
            rowElements[0].triggerEventHandler('click', {
                button: MouseButton.left,
                pointerType: PointerType.mouse,
            });
            expect(tableComponent.rowClick.emit).toHaveBeenCalledOnceWith(
                '891db31e-dfb5-42ed-b912-48b98463b004',
            );
        });

        it('should not fire click events while loading', () => {
            tableComponent.loading.set(true);
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
            ]);
            fixture.detectChanges();

            // header click
            const header = fixture.debugElement.query(
                By.directive(HeaderItemComponent),
            ).componentInstance as HeaderItemComponent;
            header.onSelect.emit({
                columnId: 'name',
                direction: SortDirection.asc,
            });
            expect(tableComponent.headerClick.emit).not.toHaveBeenCalled();

            // row click
            const rowElements = fixture.debugElement.queryAll(
                By.css('tr.mat-row'),
            );
            rowElements[0].triggerEventHandler('click', {
                button: MouseButton.left,
                pointerType: PointerType.mouse,
            });
            expect(tableComponent.rowClick.emit).not.toHaveBeenCalled();
        });
    });
});

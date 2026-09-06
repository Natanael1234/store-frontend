import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { HeaderItemComponent } from '@components/table/components/header-item/header-item.component';
import { HeaderItemHarness } from '@components/table/components/header-item/header-item.harness';
import { SortDirection } from '@enums/direction/direction.enum';

describe('HeaderItemComponent.', () => {
    let component: HeaderItemComponent;
    let fixture: ComponentFixture<HeaderItemComponent>;
    let harness: HeaderItemHarness;

    function getcomponentData() {
        return {
            id: component.id(),
            label: component.label(),
            direction: component.direction(),
            sortable: component.sortable(),
            disabled: component.disabled(),
            loading: component.loading(),
        };
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [],
            imports: [MatIconModule, HeaderItemComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        harness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            HeaderItemHarness,
        );
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('label', () => {
        it('should display label based on label model', async () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            component.disabled.set(false);
            // component.set(false);

            fixture.detectChanges();

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'asc', disabled: false },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: true,
                disabled: false,
                loading: false,
            });
        });
    });

    describe('direction', () => {
        it('should be sortable by default', async () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            // component.sortable.set(true);
            component.disabled.set(false);

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'asc', disabled: false },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: true,
                disabled: false,
                loading: false,
            });

            await harness.triggerLeftClick();

            expect(component.onSelect.emit)
                .withContext('onSelect event fired')
                .toHaveBeenCalledOnceWith({
                    columnId: 'col1',
                    direction: SortDirection.desc,
                });

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'desc', disabled: false },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.desc,
                sortable: true,
                disabled: false,
                loading: false,
            });
        });

        it('should be sortable when sortable is true', async () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            component.disabled.set(false);
            fixture.detectChanges();

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'asc', disabled: false },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: true,
                disabled: false,
                loading: false,
            });

            await harness.triggerLeftClick();

            expect(component.onSelect.emit)
                .withContext('onSelect event fired')
                .toHaveBeenCalledOnceWith({
                    columnId: 'col1',
                    direction: SortDirection.desc,
                });

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'desc', disabled: false },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.desc,
                sortable: true,
                disabled: false,
                loading: false,
            });
        });

        it('should be not sortable when sortable is false', async () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(false);
            component.disabled.set(false);
            fixture.detectChanges();

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: false,
                disabled: false,
                loading: false,
            });

            await harness.triggerLeftClick();

            expect(component.onSelect.emit)
                .withContext('onSelect event fired')
                .not.toHaveBeenCalled();

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: false,
                disabled: false,
                loading: false,
            });
        });

        it('should update icon based on direction model', async () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            fixture.detectChanges();

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'asc', disabled: false },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: true,
                disabled: false,
                loading: false,
            });

            component.direction.set(SortDirection.desc);

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'desc', disabled: false },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.desc,
                sortable: true,
                disabled: false,
                loading: false,
            });

            component.direction.set(SortDirection.none);

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'hidden', disabled: false },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.none,
                sortable: true,
                disabled: false,
                loading: false,
            });

            component.direction.set(SortDirection.asc);

            expect(component.onSelect.emit).not.toHaveBeenCalled();

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'asc', disabled: false },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: true,
                disabled: false,
                loading: false,
            });
        });

        it('should update direction model on left mouse button click', async () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            fixture.detectChanges();

            expect(component.onSelect.emit).not.toHaveBeenCalled();
            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'asc', disabled: false },
            });
            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: true,
                disabled: false,
                loading: false,
            });

            // first click: 'asc' to 'desc'
            await harness.triggerLeftClick();
            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'desc', disabled: false },
            });
            expect(component.onSelect.emit).toHaveBeenCalledWith({
                columnId: 'col1',
                direction: SortDirection.desc,
            });
            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.desc,
                sortable: true,
                disabled: false,
                loading: false,
            });

            // second click: 'desc' to ''
            await harness.triggerLeftClick();
            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'hidden', disabled: false },
            });
            expect(component.onSelect.emit).toHaveBeenCalledWith({
                columnId: 'col1',
                direction: SortDirection.none,
            });
            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.none,
                sortable: true,
                disabled: false,
                loading: false,
            });

            // third click: '' to 'asc'
            await harness.triggerLeftClick();
            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'asc', disabled: false },
            });
            expect(component.onSelect.emit).toHaveBeenCalledWith({
                columnId: 'col1',
                direction: SortDirection.asc,
            });
            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: true,
                disabled: false,
                loading: false,
            });

            expect(component.onSelect.emit).toHaveBeenCalledTimes(3);
        });

        it('should toggle sort direction on touch', async () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            fixture.detectChanges();

            expect(component.onSelect.emit).not.toHaveBeenCalled();
            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'asc', disabled: false },
            });
            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: true,
                disabled: false,
                loading: false,
            });

            // first click: 'asc' to 'desc'
            await harness.triggerTouch();
            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'desc', disabled: false },
            });
            expect(component.onSelect.emit).toHaveBeenCalledWith({
                columnId: 'col1',
                direction: SortDirection.desc,
            });
            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.desc,
                sortable: true,
                disabled: false,
                loading: false,
            });
        });

        it('should toggle sort direction on pen touch', async () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            fixture.detectChanges();

            expect(component.onSelect.emit).not.toHaveBeenCalled();
            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'asc', disabled: false },
            });
            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: true,
                disabled: false,
                loading: false,
            });

            // first click: 'asc' to 'desc'
            await harness.triggerPenClick();
            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'desc', disabled: false },
            });
            expect(component.onSelect.emit).toHaveBeenCalledWith({
                columnId: 'col1',
                direction: SortDirection.desc,
            });
            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.desc,
                sortable: true,
                disabled: false,
                loading: false,
            });
        });

        it('should not toggle sort direction on middle mouse button click', async () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            component.disabled.set(false);
            fixture.detectChanges();

            expect(component.onSelect.emit).not.toHaveBeenCalled();
            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'asc', disabled: false },
            });
            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: true,
                disabled: false,
                loading: false,
            });

            // first click: 'asc' to 'desc'
            await harness.triggerMiddleClick();
            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'asc', disabled: false },
            });
            expect(component.onSelect.emit).not.toHaveBeenCalled();
            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: true,
                disabled: false,
                loading: false,
            });
        });

        it('should not toggle sort direction on right mouse button click', async () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            component.disabled.set(false);
            fixture.detectChanges();

            expect(component.onSelect.emit).not.toHaveBeenCalled();
            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'asc', disabled: false },
            });
            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: true,
                disabled: false,
                loading: false,
            });

            // first click: 'asc' to 'desc'
            await harness.triggerRightClick();
            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'asc', disabled: false },
            });
            expect(component.onSelect.emit).not.toHaveBeenCalled();
            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: true,
                disabled: false,
                loading: false,
            });
        });
    });

    describe('disabled', () => {
        it('should be not disabled by default', async () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            fixture.detectChanges();

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'asc', disabled: false },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: true,
                disabled: false,
                loading: false,
            });

            await harness.triggerLeftClick();

            expect(component.onSelect.emit)
                .withContext('onSelect event fired')
                .toHaveBeenCalledOnceWith({
                    columnId: 'col1',
                    direction: SortDirection.desc,
                });

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'desc', disabled: false },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.desc,
                sortable: true,
                disabled: false,
                loading: false,
            });
        });

        it('should be not disabled when disable is false', async () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            component.disabled.set(false);
            fixture.detectChanges();

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'asc', disabled: false },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: true,
                disabled: false,
                loading: false,
            });

            await harness.triggerLeftClick();

            expect(component.onSelect.emit)
                .withContext('onSelect event fired')
                .toHaveBeenCalledOnceWith({
                    columnId: 'col1',
                    direction: SortDirection.desc,
                });

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'desc', disabled: false },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.desc,
                sortable: true,
                disabled: false,
                loading: false,
            });
        });

        it('should be disabled when disable is true', async () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            component.disabled.set(true);
            fixture.detectChanges();

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: true },
                icon: { direction: 'asc', disabled: true },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: true,
                disabled: true,
                loading: false,
            });

            await harness.triggerLeftClick();

            expect(component.onSelect.emit)
                .withContext('onSelect event fired')
                .not.toHaveBeenCalled();

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: true },
                icon: { direction: 'asc', disabled: true },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: true,
                disabled: true,
                loading: false,
            });
        });
    });

    describe('sortable', () => {
        it('should be sortable by default', async () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            fixture.detectChanges();

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'asc', disabled: false },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: true,
                disabled: false,
                loading: false,
            });

            await harness.triggerLeftClick();

            expect(component.onSelect.emit)
                .withContext('onSelect event fired')
                .toHaveBeenCalledOnceWith({
                    columnId: 'col1',
                    direction: SortDirection.desc,
                });

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'desc', disabled: false },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.desc,
                sortable: true,
                disabled: false,
                loading: false,
            });
        });

        it('should be sortable when sortable is true', async () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            fixture.detectChanges();

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'asc', disabled: false },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: true,
                disabled: false,
                loading: false,
            });

            await harness.triggerLeftClick();

            expect(component.onSelect.emit)
                .withContext('onSelect event fired')
                .toHaveBeenCalledOnceWith({
                    columnId: 'col1',
                    direction: SortDirection.desc,
                });

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'desc', disabled: false },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.desc,
                sortable: true,
                disabled: false,
                loading: false,
            });
        });

        it('should be not sortable when sortable is false', async () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(false);
            component.disabled.set(false);
            fixture.detectChanges();

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: false,
                disabled: false,
                loading: false,
            });

            await harness.triggerLeftClick();

            expect(component.onSelect.emit)
                .withContext('onSelect event fired')
                .not.toHaveBeenCalled();

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: false,
                disabled: false,
                loading: false,
            });
        });
    });

    describe('loading', () => {
        it('should be not loading by default', async () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            fixture.detectChanges();

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'asc', disabled: false },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: true,
                disabled: false,
                loading: false,
            });
        });

        it('should be not loading when loading is false', async () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            component.disabled.set(false);
            component.loading.set(false);
            fixture.detectChanges();

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: false },
                icon: { direction: 'asc', disabled: false },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: true,
                disabled: false,
                loading: false,
            });
        });

        it('should be loading when loading is true', async () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            component.disabled.set(false);
            component.loading.set(true);
            fixture.detectChanges();

            expect(await harness.getState()).toEqual({
                label: { text: 'Column 1', disabled: true },
            });

            expect(getcomponentData()).toEqual({
                id: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                sortable: true,
                disabled: false,
                loading: true,
            });
        });
    });
});

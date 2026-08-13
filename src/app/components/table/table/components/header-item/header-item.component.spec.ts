import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { SortDirection } from '../../../../../enums/direction/direction.enum';
import { MouseButton } from '../../../../../enums/mouse-button/mouse-button.enum';
import { PointerType } from '../../../../../enums/pointer-type/pointer-type.enum';
import { HeaderItemComponent } from './header-item.component';
import { _testHeaderItemComponent } from './test/fn/header-item.test';

describe('HeaderItemComponent.', () => {
    let component: HeaderItemComponent;
    let fixture: ComponentFixture<HeaderItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [],
            imports: [MatIconModule, HeaderItemComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('label', () => {
        it('should display label based on label model', () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            component.disabled.set(false);
            // component.loading.set(false);

            fixture.detectChanges();
            const containterElement = fixture.debugElement.query(
                By.css('div#container'),
            );
            const labelElements = containterElement.queryAll(
                By.css('span#label'),
            );
            expect(labelElements.length).toEqual(1);
            expect(labelElements[0].nativeElement.textContent.trim()).toEqual(
                'Column 1',
            );
        });
    });

    describe('direction', () => {
        it('should be sortable by default', () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            component.disabled.set(false);
            fixture.detectChanges();

            _testHeaderItemComponent(fixture, component, {
                columnId: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                disabled: false,
                sortable: true,
                loading: false,
            });
        });

        it('should be sortable when sortable is true', () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            component.disabled.set(false);
            fixture.detectChanges();

            _testHeaderItemComponent(fixture, component, {
                columnId: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                disabled: false,
                sortable: true,
                loading: false,
            });
        });

        it('should be not sortable when sortable is false', () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(false);
            component.disabled.set(false);
            fixture.detectChanges();

            _testHeaderItemComponent(fixture, component, {
                columnId: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                disabled: false,
                sortable: false,
                loading: false,
            });
        });

        it('should update icon based on direction model', () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            fixture.detectChanges();

            const iconElement = fixture.debugElement.query(By.css('mat-icon'));
            expect(iconElement.nativeElement.textContent.trim()).toEqual(
                'arrow_downward',
            );

            component.direction.set(SortDirection.asc);
            fixture.detectChanges();
            expect(
                iconElement.nativeElement.classList.contains(SortDirection.asc),
            ).toBeTrue();
            expect(iconElement.nativeElement.textContent.trim()).toEqual(
                'arrow_downward',
            );

            component.direction.set(SortDirection.desc);
            fixture.detectChanges();
            expect(
                iconElement.nativeElement.classList.contains(
                    SortDirection.desc,
                ),
            ).toBeTrue();
            expect(iconElement.nativeElement.textContent.trim()).toEqual(
                'arrow_downward',
            );

            component.direction.set(SortDirection.none);
            fixture.detectChanges();
            expect(
                iconElement.nativeElement.classList.contains('hidden'),
            ).toBeTrue();
            expect(iconElement.nativeElement.textContent.trim()).toEqual(
                'arrow_downward',
            );
            expect(component.onSelect.emit).not.toHaveBeenCalled();
        });

        it('should update direction model on left mouse button click', () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            fixture.detectChanges();

            // first click: 'asc' to 'desc'
            const containterElement = fixture.debugElement.query(
                By.css('div#container'),
            );
            expect(component.direction()).toBe(SortDirection.asc);
            containterElement.triggerEventHandler(
                'click',
                new PointerEvent('click', {
                    button: MouseButton.left,
                    pointerType: PointerType.mouse,
                }),
            );
            fixture.detectChanges();
            expect(component.direction()).toBe(SortDirection.desc);
            expect(component.onSelect.emit).toHaveBeenCalledWith({
                columnId: 'col1',
                direction: SortDirection.desc,
            });

            // second click: 'desc' to ''
            containterElement.triggerEventHandler(
                'click',
                new PointerEvent('click', {
                    button: MouseButton.left,
                    pointerType: PointerType.mouse,
                }),
            );
            fixture.detectChanges();
            expect(component.direction()).toBe(SortDirection.none);
            expect(component.onSelect.emit).toHaveBeenCalledWith({
                columnId: 'col1',
                direction: SortDirection.none,
            });

            // third click: '' to 'asc'
            containterElement.triggerEventHandler(
                'click',
                new PointerEvent('click', {
                    button: MouseButton.left,
                    pointerType: PointerType.mouse,
                }),
            );
            fixture.detectChanges();
            expect(component.direction()).toBe(SortDirection.asc);
            expect(component.onSelect.emit).toHaveBeenCalledWith({
                columnId: 'col1',
                direction: SortDirection.asc,
            });

            expect(component.onSelect.emit).toHaveBeenCalledTimes(3);
        });

        it('should toggle sort direction on left mouse button click', () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            component.disabled.set(false);
            fixture.detectChanges();

            const containterElement = fixture.debugElement.query(
                By.css('div#container'),
            );
            expect(component.direction()).toBe(SortDirection.asc);
            containterElement.triggerEventHandler(
                'click',
                new PointerEvent('click', {
                    button: MouseButton.left,
                    pointerType: PointerType.mouse,
                }),
            );
            fixture.detectChanges();
            expect(component.direction()).toBe(SortDirection.desc);
            expect(component.onSelect.emit).toHaveBeenCalledOnceWith({
                columnId: 'col1',
                direction: SortDirection.desc,
            });
        });

        it('should toggle sort direction on touch', () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            component.disabled.set(false);
            fixture.detectChanges();

            const containterElement = fixture.debugElement.query(
                By.css('div#container'),
            );
            expect(component.direction()).toBe(SortDirection.asc);
            containterElement.triggerEventHandler(
                'click',
                new PointerEvent('click', { pointerType: PointerType.touch }),
            );
            fixture.detectChanges();
            expect(component.direction()).toBe(SortDirection.desc);
            expect(component.onSelect.emit).toHaveBeenCalledOnceWith({
                columnId: 'col1',
                direction: SortDirection.desc,
            });
        });

        it('should toggle sort direction on pen touch', () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            component.disabled.set(false);
            fixture.detectChanges();

            const containterElement = fixture.debugElement.query(
                By.css('div#container'),
            );
            expect(component.direction()).toBe(SortDirection.asc);
            containterElement.triggerEventHandler(
                'click',
                new PointerEvent('click', { pointerType: PointerType.pen }),
            );
            fixture.detectChanges();
            expect(component.onSelect.emit).toHaveBeenCalledOnceWith({
                columnId: 'col1',
                direction: SortDirection.desc,
            });
        });

        it('should not toggle sort direction on middle mouse button click', () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            component.disabled.set(false);
            fixture.detectChanges();

            const containterElement = fixture.debugElement.query(
                By.css('div#container'),
            );
            expect(component.direction()).toBe(SortDirection.asc);
            containterElement.triggerEventHandler(
                'click',
                new PointerEvent('click', {
                    button: MouseButton.middle,
                    pointerType: PointerType.mouse,
                }),
            );
            fixture.detectChanges();
            expect(component.direction()).toBe(SortDirection.asc);
            expect(component.onSelect.emit).not.toHaveBeenCalled();
        });

        it('should not toggle sort direction on right mouse button click', () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            component.disabled.set(false);
            fixture.detectChanges();

            const containterElement = fixture.debugElement.query(
                By.css('div#container'),
            );
            expect(component.direction()).toBe(SortDirection.asc);
            containterElement.triggerEventHandler(
                'click',
                new PointerEvent('click', {
                    button: MouseButton.right,
                    pointerType: PointerType.mouse,
                }),
            );
            fixture.detectChanges();
            expect(component.direction()).toBe(SortDirection.asc);
            expect(component.onSelect.emit).not.toHaveBeenCalled();
        });
    });

    describe('disabled', () => {
        it('should be not disabled by default', () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            fixture.detectChanges();

            _testHeaderItemComponent(fixture, component, {
                columnId: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                disabled: false,
                sortable: true,
                loading: false,
            });
        });

        it('should be not disabled when disable is false', () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            component.disabled.set(false);
            fixture.detectChanges();

            _testHeaderItemComponent(fixture, component, {
                columnId: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                disabled: false,
                sortable: true,
                loading: false,
            });
        });

        it('should be disabled when disable is true', () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            component.disabled.set(true);
            fixture.detectChanges();

            _testHeaderItemComponent(fixture, component, {
                columnId: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                disabled: true,
                sortable: true,
                loading: false,
            });
        });
    });

    describe('sortable', () => {
        it('should be sortable by default', () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            fixture.detectChanges();

            _testHeaderItemComponent(fixture, component, {
                columnId: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                disabled: false,
                sortable: true,
                loading: false,
            });
        });

        it('should be sortable when sortable is true', () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            fixture.detectChanges();

            _testHeaderItemComponent(fixture, component, {
                columnId: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                disabled: false,
                sortable: true,
                loading: false,
            });
        });

        it('should be not sortable when sortable is false', () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(false);
            component.disabled.set(false);
            fixture.detectChanges();

            _testHeaderItemComponent(fixture, component, {
                columnId: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                disabled: false,
                sortable: false,
                loading: false,
            });
        });
    });

    describe('loading', () => {
        it('should be not loading by default', () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            fixture.detectChanges();

            _testHeaderItemComponent(fixture, component, {
                columnId: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                disabled: false,
                sortable: true,
                loading: false,
            });
        });

        it('should be not loading when loading is false', () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            component.disabled.set(false);
            component.loading.set(false);
            fixture.detectChanges();

            _testHeaderItemComponent(fixture, component, {
                columnId: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                disabled: false,
                sortable: true,
                loading: false,
            });
        });

        it('should be loading when loading is true', () => {
            spyOn(component.onSelect, 'emit');
            component.id.set('col1');
            component.label.set('Column 1');
            component.direction.set(SortDirection.asc);
            component.sortable.set(true);
            component.disabled.set(false);
            component.loading.set(true);
            fixture.detectChanges();

            _testHeaderItemComponent(fixture, component, {
                columnId: 'col1',
                label: 'Column 1',
                direction: SortDirection.asc,
                disabled: false,
                sortable: true,
                loading: true,
            });
        });
    });
});

import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { toggleSortDirecton } from '@components/table/table-utils/table-utils';
import { HeaderItemComponent } from '@components/table/table/components/header-item/header-item.component';
import { SortDirection } from '@enums/direction/direction.enum';
import { MouseButton } from '@enums/mouse-button/mouse-button.enum';
import { PointerType } from '@enums/pointer-type/pointer-type.enum';

export function _testHeaderItemComponent(
    fixture: ComponentFixture<HeaderItemComponent>,
    component: HeaderItemComponent,
    options: {
        columnId: string;
        label: string;
        direction: SortDirection;
        disabled: boolean;
        sortable: boolean;
        loading: boolean;
    },
) {
    // container element
    const containterElement = fixture.debugElement.query(
        By.css('div#container'),
    );

    // label element
    const labelElement = fixture.debugElement.query(By.css('span#label'));
    if (options.loading || options.disabled) {
        expect(labelElement.nativeElement.classList.contains('disabled'))
            .withContext('disabled class on label')
            .toBeTrue();
    } else {
        expect(labelElement.nativeElement.classList.contains('disabled'))
            .withContext('absent disabled class on label')
            .toBeFalse();
    }

    // icon element
    const iconElement = fixture.debugElement.query(By.css('mat-icon#arrow'));
    // visible
    if (options.sortable && !options.loading) {
        // disabled
        if (options.disabled) {
            expect(iconElement.nativeElement.classList.contains('disabled'))
                .withContext('disabled class on icon')
                .toBeTrue();
        } else {
            expect(iconElement.nativeElement.classList.contains('disabled'))
                .withContext('disabled class on icon')
                .toBeFalse();
        }
        // direction class
        expect(
            iconElement.nativeElement.classList.contains(
                options.direction || 'hidden',
            ),
        )
            .withContext('direction class on icon')
            .toBeTrue();
    }
    // hidden
    else {
        expect(iconElement).withContext('icon not avaiable').toBeNull();
    }

    // test if sort event enabled
    containterElement.triggerEventHandler(
        'click',
        new PointerEvent('click', {
            button: MouseButton.left,
            pointerType: PointerType.mouse,
        }),
    );
    if (
        options.loading ||
        !options.sortable ||
        options.disabled ||
        options.columnId === undefined
    ) {
        expect(component.onSelect.emit)
            .withContext('onSelect event not fired')
            .not.toHaveBeenCalled();
    } else {
        // click event fired
        const expectedDirection = toggleSortDirecton(options.direction);
        expect(component.onSelect.emit)
            .withContext('onSelect event fired')
            .toHaveBeenCalledOnceWith({
                columnId: options.columnId,
                direction: expectedDirection,
            });

        fixture.detectChanges();
        // icon direcion class changed?
        expect(
            iconElement.nativeElement.classList.contains(
                expectedDirection || 'hidden',
            ),
        )
            .withContext('direction class on icon')
            .toBeTrue();
    }
}

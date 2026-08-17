import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaderItemComponent } from '@components/table/components/header-item/header-item.component';
import { TableComponent } from '@components/table/table.component';
import { _ExpectedTableHeaderItem } from '@components/table/test/types/expected-table-header-item.type.test';
import { UserColumnId } from '@pages/users/types/user-column-id/user-column-id.enum';

export function _testTableHeadersComponent(
    fixture: ComponentFixture<TableComponent>,
    expectedHeaders: _ExpectedTableHeaderItem[],
) {
    const theads: DebugElement[] = fixture.debugElement.queryAll(
        By.css('thead'),
    );
    expect(theads.length).withContext('number of theads').toEqual(1);
    const trs = theads[0].queryAll(By.css('tr'));
    expect(trs.length).toEqual(1);
    const ths = trs[0].queryAll(By.css('th'));
    expect(ths.length)
        .withContext('number of ths')
        .toEqual(expectedHeaders.length);
    for (const [i, expectedHeader] of expectedHeaders.entries()) {
        const ctx = `col ${i + 1} (${expectedHeader.id})`;
        const th = ths[i];
        const items = th.queryAll(By.directive(HeaderItemComponent));
        expect(items.length)
            .withContext(ctx + ' - number of items in header cell')
            .toEqual(1);
        const item = items[0]
            .componentInstance as unknown as HeaderItemComponent;

        expect(item)
            .withContext(ctx + ' - item is defined')
            .toBeDefined();
        expect(item.id())
            .withContext(ctx)
            .toEqual(expectedHeader.id as UserColumnId);
        expect(item.label()).toEqual(expectedHeader.label);
        expect(item.direction())
            .withContext(ctx + ' - item direction')
            .toEqual(expectedHeader.direction);
        expect(item.sortable())
            .withContext(ctx + ' - item is sortable')
            .toEqual(expectedHeader.sortable);
        expect(item.disabled())
            .withContext(ctx + ' - item is disabled')
            .toEqual(expectedHeader.disabled);
    }
}

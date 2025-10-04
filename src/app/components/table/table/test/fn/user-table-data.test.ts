import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RowItemComponent } from '../../components/row-item/row-item.component';
import { TableComponent } from '../../table.component';
import { ExpectedTableRowItem } from '../types/expected-table-row-item.type.test';

export function _testTableData(
    fixture: ComponentFixture<TableComponent>,
    expectedRows: ExpectedTableRowItem[][],
    loading?: boolean,
) {
    const tbodies: DebugElement[] = fixture.debugElement.queryAll(
        By.css('tbody'),
    );
    expect(tbodies.length).withContext('number of tbodies').toEqual(1);
    const trs = tbodies[0].queryAll(By.css('tr'));
    expect(trs.length)
        .withContext('number of rows')
        .toEqual(expectedRows.length);

    // for each row
    for (const [i, expectedRow] of expectedRows.entries()) {
        const rowCtx = `row ${i + 1}`;

        const tds = trs[i].queryAll(By.css('td'));
        expect(tds.length)
            .withContext(rowCtx + ' - number of cells in the row')
            .toEqual(expectedRow.length);

        // for each column
        for (const [j, expectedCol] of expectedRow.entries()) {
            const colCtx = `row ${i + 1}, column ${j + 1} (${expectedCol.id})`;

            const td = tds[j];

            if (expectedCol.shrink === true) {
                expect(td.attributes['shrink']).toEqual('true');
            } else if (expectedCol.shrink === false) {
                expect(td.attributes['shrink']).toEqual('false');
            } else {
                expect(td.attributes['shrink']).not.toBeDefined();
            }

            const items = td.queryAll(By.directive(RowItemComponent));
            expect(items.length)
                .withContext(colCtx + ' - icon inside row')
                .toEqual(1);

            const item: RowItemComponent = items[0].componentInstance;
            expect(item.icon())
                .withContext(colCtx + ' - icon')
                .toEqual(expectedCol.icon);
            expect(item.label())
                .withContext(colCtx + ' - label')
                .toEqual(expectedCol.label);
            expect(item.toolTip())
                .withContext(colCtx + ' - tooltip')
                .toEqual(expectedCol.tooltip);
            expect(item.loading())
                .withContext(colCtx + ' - loading')
                .toEqual(loading);
            expect(item.disabled())
                .withContext(colCtx + ' - disabled')
                .toEqual(expectedCol.disabled);
            expect(item.loading()).withContext(colCtx + ' - loading');
        }
    }
}

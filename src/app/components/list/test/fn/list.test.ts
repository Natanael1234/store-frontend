import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { MatList } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { ListItemComponent } from '../../components/list-item/list-item.component';
import { ListComponent } from '../../list.component';
import { ListItem } from '../../types/list-item.model';

export function _testListComponent(
    fixture: ComponentFixture<ListComponent>,
    expectedListItems: ListItem[],
    loading: boolean = false,
) {
    fixture.detectChanges();
    const lists: DebugElement[] = fixture.debugElement.queryAll(
        By.directive(MatList),
    );
    expect(lists.length).withContext('only one list').toEqual(1);
    const listComponent = lists[0];
    _testListSeparators(listComponent, expectedListItems);
    _testListItems(listComponent, expectedListItems, loading);
}

function _testListSeparators(
    listComponent: DebugElement,
    expectedListItems: ListItem[],
) {
    const dividerCount =
        expectedListItems.length < 2 ? 0 : expectedListItems.length - 1;
    const divider = listComponent.children.filter(
        (child) => child.nativeElement.tagName == 'MAT-DIVIDER',
    );
    expect(divider.length).withContext('divider count').toEqual(dividerCount);
    for (let idx = 1; idx < listComponent.children.length - 1; idx += 2) {
        expect(listComponent.children[idx].nativeElement.tagName)
            .withContext('divider between items')
            .toEqual('MAT-DIVIDER');
    }
}

function _testListItems(
    listComponent: DebugElement,
    expectedListItems: ListItem[],
    loading: boolean,
) {
    const listItems: DebugElement[] = listComponent.children.filter(
        (child) => child.nativeElement.tagName === 'APP-LIST-ITEM',
    );
    expect(listItems.length)
        .withContext('list item count')
        .toEqual(expectedListItems.length);
    for (let idx = 0; idx < expectedListItems.length; idx += 2) {
        const listItemElement: DebugElement = listComponent.children[idx];
        const expectedListItem: ListItem = expectedListItems[idx];
        _testListItem(listItemElement, expectedListItem, loading);
    }
}

function _testListItem(
    debugElement: DebugElement,
    expectedListItem: ListItem,
    loading: boolean,
) {
    expect(debugElement.nativeElement.tagName)
        .withContext('list item')
        .toEqual('APP-LIST-ITEM');
    const listItemComponent: ListItemComponent =
        debugElement.componentInstance as ListItemComponent;
    const { icons: expectedIcons, labels: expectedLabels } = expectedListItem;
    expect(listItemComponent.labels())
        .withContext('list item labels')
        .toEqual(expectedLabels);
    expect(listItemComponent.icons())
        .withContext('list item icons')
        .toEqual(expectedIcons);
    expect(listItemComponent.loading())
        .withContext('list item loading')
        .toEqual(loading);
}

import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { MatTooltip } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { ListItemComponent } from '../../list-item.component';

type ExpectedContainer = { loading: boolean };
type ExpectedColumn = { id: string };
type ExpectedClass = { class: string; contains: boolean };
type ExpectedLabel = {
    text: string;
    tooltip: string;
    classes: ExpectedClass[];
};
type ExpectedIcon = {
    icon: string;
    tooltip: string;
    classes: ExpectedClass[];
};
export type _ExpectedData = {
    labels: ExpectedLabel[];
    icons: ExpectedIcon[];
    loading: boolean;
};

export function _testListItem(
    fixture: ComponentFixture<ListItemComponent>,
    expectedData: _ExpectedData,
) {
    fixture.detectChanges();

    const containers = fixture.debugElement.queryAll(By.css('div#container'));
    testContainer(containers, { loading: expectedData.loading });
    const container = containers[0];

    testLeftColumn(container, expectedData);
    testRightColumn(container, expectedData);
}

function testLeftColumn(container: DebugElement, expectedData: _ExpectedData) {
    const leftColumn = container.children[0];
    testColumn(leftColumn, { id: 'left-column' });

    // labels
    expect(leftColumn.children.length)
        .withContext('number of labels')
        .toEqual(expectedData.icons.length);

    for (const key in leftColumn.children) {
        const labelDebugElement: DebugElement = leftColumn.children[key];
        testTextLabel(labelDebugElement, expectedData.labels[key]);
    }
}

function testRightColumn(container: DebugElement, expectedData: _ExpectedData) {
    const rightColumn = container.children[1];
    testColumn(rightColumn, { id: 'right-column' });

    expect(rightColumn.children.length)
        .withContext('number of icons')
        .toEqual(expectedData.icons.length);

    for (const key in rightColumn.children) {
        const iconDebugElement: DebugElement = rightColumn.children[key];
        testIcon(iconDebugElement, expectedData.icons[key]);
    }
}

function testContainer(
    containers: DebugElement[],
    expectedValues: ExpectedContainer,
) {
    expect(containers.length).withContext('only one container').toEqual(1);
    const container = containers[0];
    testClasses(container, [
        { class: 'loading', contains: expectedValues.loading },
    ]);
}

function testColumn(column: DebugElement, expectedData: ExpectedColumn) {
    expect(column.nativeElement.tagName)
        .withContext('column is div')
        .toEqual('DIV');
    expect(column.properties['id'])
        .withContext('column id')
        .toEqual(expectedData.id);
    expect(column.children.length)
        .withContext('column children count')
        .toEqual(2);
}

function testTextLabel(label: DebugElement, expectedValues: ExpectedLabel) {
    expect(label.nativeElement.tagName)
        .withContext('text label is inside a div')
        .toEqual('DIV');
    expect(label.childNodes[0].nativeNode.textContent.trim())
        .withContext('text content')
        .toEqual(`${expectedValues.text}`);
    expect(label.injector.get(MatTooltip).message)
        .withContext('text tooltip')
        .toEqual(expectedValues.tooltip);
    testClasses(label, expectedValues.classes);
}

function testIcon(icon: DebugElement, expectedValues: ExpectedIcon) {
    expect(icon.nativeElement.tagName)
        .withContext('icon is mat-icon')
        .toEqual('MAT-ICON');
    expect(icon.nativeElement.textContent.trim())
        .withContext('contains icon')
        .toEqual(expectedValues.icon);
    expect(icon.injector.get(MatTooltip).message)
        .withContext('icon tooltip')
        .toEqual(expectedValues.tooltip);
    testClasses(icon, expectedValues.classes);
}

function testClasses(element: DebugElement, classes: ExpectedClass[]) {
    for (const clazz of classes || []) {
        const containsClass = clazz.contains;
        if (containsClass) {
            expect(element.nativeElement.classList)
                .withContext(`classes contains class`)
                .toContain(clazz.class);
        } else {
            expect(element.nativeElement.classList)
                .withContext(`classes not contains class`)
                .not.toContain(clazz.class);
        }
    }
}

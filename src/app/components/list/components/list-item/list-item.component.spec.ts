import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ListItemComponent } from './list-item.component';
import { _testListItem } from './test/fn/list-item.test';
import { _testSetComponentData } from './test/fn/set-list-item.test';

describe('ListItemComponent.', () => {
    let component: ListItemComponent;
    let fixture: ComponentFixture<ListItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListItemComponent, MatIconModule, MatTooltipModule],
        }).compileComponents();

        fixture = TestBed.createComponent(ListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render list item not loading by default', () => {
        _testSetComponentData(component, {
            labels: [
                { text: 'Label 1', tooltip: 'Tooltip 1', disabled: false },
                { text: 'Label 2', tooltip: 'Tooltip 2', disabled: true },
            ],
            icons: [
                { icon: 'checked', tooltip: 'Tooltip 1', disabled: false },
                { icon: 'home', tooltip: 'Tooltip 2', disabled: true },
            ],
        });

        _testListItem(fixture, {
            labels: [
                {
                    text: 'Label 1',
                    tooltip: 'Tooltip 1',
                    classes: [{ class: 'skeleton-loader', contains: false }],
                },
                {
                    text: 'Label 2',
                    tooltip: 'Tooltip 2',
                    classes: [{ class: 'skeleton-loader', contains: false }],
                },
            ],
            icons: [
                {
                    icon: 'checked',
                    tooltip: 'Tooltip 1',
                    classes: [
                        { class: 'skeleton-loader', contains: false },
                        { class: 'disabled', contains: false },
                    ],
                },
                {
                    icon: 'home',
                    tooltip: 'Tooltip 2',
                    classes: [
                        { class: 'skeleton-loader', contains: false },
                        { class: 'disabled', contains: true },
                    ],
                },
            ],
            loading: false,
        });
    });

    it('should render list item not loading when loading is false', () => {
        _testSetComponentData(
            component,
            {
                labels: [
                    { text: 'Label 1', tooltip: 'Tooltip 1', disabled: false },
                    { text: 'Label 2', tooltip: 'Tooltip 2', disabled: true },
                ],
                icons: [
                    { icon: 'checked', tooltip: 'Tooltip 1', disabled: false },
                    { icon: 'home', tooltip: 'Tooltip 2', disabled: true },
                ],
            },
            false,
        );
        _testListItem(fixture, {
            labels: [
                {
                    text: 'Label 1',
                    tooltip: 'Tooltip 1',
                    classes: [{ class: 'skeleton-loader', contains: false }],
                },
                {
                    text: 'Label 2',
                    tooltip: 'Tooltip 2',
                    classes: [{ class: 'skeleton-loader', contains: false }],
                },
            ],
            icons: [
                {
                    icon: 'checked',
                    tooltip: 'Tooltip 1',
                    classes: [{ class: 'skeleton-loader', contains: false }],
                },
                {
                    icon: 'home',
                    tooltip: 'Tooltip 2',
                    classes: [{ class: 'disabled', contains: true }],
                },
            ],
            loading: false,
        });
    });

    it('should render loading list item when loading is true', () => {
        _testSetComponentData(
            component,
            {
                labels: [
                    { text: 'Label 1', tooltip: 'Tooltip 1', disabled: false },
                    { text: 'Label 2', tooltip: 'Tooltip 2', disabled: true },
                ],
                icons: [
                    { icon: 'checked', tooltip: 'Tooltip 1', disabled: false },
                    { icon: 'home', tooltip: 'Tooltip 2', disabled: true },
                ],
            },
            true,
        );

        _testListItem(fixture, {
            labels: [
                {
                    text: '',
                    tooltip: 'Tooltip 1',
                    classes: [{ class: 'skeleton-loader', contains: true }],
                },
                {
                    text: '',
                    tooltip: 'Tooltip 2',
                    classes: [{ class: 'skeleton-loader', contains: true }],
                },
            ],
            icons: [
                {
                    icon: '',
                    tooltip: 'Tooltip 1',
                    classes: [
                        { class: 'skeleton-loader', contains: true },
                        { class: 'disabled', contains: false },
                    ],
                },
                {
                    icon: '',
                    tooltip: 'Tooltip 2',
                    classes: [
                        { class: 'skeleton-loader', contains: true },
                        { class: 'disabled', contains: true },
                    ],
                },
            ],
            loading: true,
        });
    });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NavigationRailComponent } from '@components/navigation-rail/navigation-rail.component';
import { NavigationRailItem } from '@components/navigation-rail/types/navigation-rail-item/navigation-rail-item.type';
import { MouseButton } from '@enums/mouse-button/mouse-button.enum';
import { PointerType } from '@enums/pointer-type/pointer-type.enum';

describe('SideMenuComponent.', () => {
    let navigationRailComponent: NavigationRailComponent;
    let fixture: ComponentFixture<NavigationRailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                CommonModule,
                NavigationRailComponent,
                MatButtonModule,
                MatIconModule,
                RouterModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(NavigationRailComponent);
        navigationRailComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(navigationRailComponent).toBeTruthy();
    });

    function setupItems(options?: {
        collapsed: boolean;
        transition?: boolean;
    }) {
        if (options?.collapsed != null) {
            navigationRailComponent.collapsed.set(options.collapsed);
        }
        if (options?.transition != null) {
            navigationRailComponent.transition.set(options.transition);
        }
        const mockItems: NavigationRailItem[] = [
            {
                id: 'home_id',
                icon: 'home',
                label: 'Home',
                route: '/home',
            },
            {
                id: 'settings_id',
                icon: 'settings',
                label: 'Settings',
                route: '/settings',
            },
        ];
        navigationRailComponent.items.set(mockItems);
        fixture.detectChanges();
        return mockItems;
    }

    function testElement(options: {
        element: Element;
        expectedElement: {
            id?: string;
            classes?: { [key: string]: boolean };
            innerHtml?: string;
        };
    }) {
        const { element, expectedElement: expected } = options;
        const { id, classes, innerHtml } = expected;
        expect(element).toBeDefined();
        if (id ?? false) {
            expect(element.id).toEqual(id!);
        }
        if (classes) {
            for (const clazz of Object.keys(classes)) {
                if (classes[clazz]) {
                    expect(element.classList)
                        .withContext('element contains class')
                        .toContain(clazz);
                } else {
                    expect(element.classList)
                        .withContext("element don't contains class")
                        .not.toContain(clazz);
                }
            }
        }
        if (innerHtml ?? false) {
            expect(element.innerHTML.trim()).toEqual(innerHtml!);
        }
    }

    function testTemplate(options: {
        collapsed: boolean;
        transition: boolean;
        items: {
            id: string;
            icon: string;
            label: string;
            route: string;
            innerHtml?: string;
        }[];
    }) {
        const { collapsed, transition, items } = options;
        const opened = !collapsed;
        // container
        const containerEl = fixture.debugElement.nativeElement.children[0];
        expect(containerEl.children.length).toBe(items.length);
        const buttons = containerEl.children;
        for (let i = 0; i < buttons.length; i++) {
            const btn = buttons[i] as HTMLButtonElement;
            // item/btn
            const item = items[i];
            expect(btn.id).toBe(item.id);
            testElement({
                element: btn,
                expectedElement: {
                    id: item.id,
                    classes: { opened, collapsed, transition },
                    innerHtml: item.innerHtml,
                },
            });
            expect(btn.children[1].children.length).toEqual(1);
            const btnWrapper = btn.children[1].children[0];
            expect(btnWrapper.classList).toContain('button-content-wrapper');
            // btn wrapper
            testElement({
                element: btnWrapper,
                expectedElement: {
                    classes: { opened, collapsed, transition },
                },
            });
            expect(btnWrapper.children.length).toEqual(2);
            // icon wrapper
            const iconWrapper = btnWrapper.children[0];
            testElement({
                element: iconWrapper,
                expectedElement: { classes: { 'icon-wrapper': true } },
            });
            expect(iconWrapper.children.length).toEqual(1);
            // icon
            const icon = iconWrapper.children[0];
            testElement({
                element: icon,
                expectedElement: {
                    classes: { icon: true, collapsed, opened, transition },
                },
            });
            expect(icon.innerHTML.trim()).toEqual(item.icon);
            // label wrapper
            const labelWrapper = btnWrapper.children[1];
            testElement({
                element: labelWrapper,
                expectedElement: {
                    classes: {
                        'label-wrapper': true,
                        collapsed,
                        opened,
                        transition,
                    },
                },
            });
            expect(labelWrapper.innerHTML.trim()).toEqual(item.label);
        }
    }

    describe('template', () => {
        it('should collapse by default and no transition by default', async () => {
            const items = setupItems();
            fixture.detectChanges();
            await fixture.whenStable();
            testTemplate({ collapsed: true, transition: false, items });
        });

        it('should collapse and no transition by default', async () => {
            const items = setupItems({ collapsed: true });
            fixture.detectChanges();
            await fixture.whenStable();
            testTemplate({ collapsed: true, transition: false, items });
        });

        it('should open and transition', async () => {
            const items = setupItems({ collapsed: false, transition: true });
            fixture.detectChanges();
            await fixture.whenStable();
            testTemplate({ collapsed: false, transition: true, items });
        });

        it('should open without transition', async () => {
            const items = setupItems({ collapsed: false, transition: false });
            fixture.detectChanges();
            await fixture.whenStable();
            testTemplate({ collapsed: false, transition: false, items });
        });

        it('should open and no transition by default', async () => {
            const items = setupItems({ collapsed: false });
            fixture.detectChanges();
            await fixture.whenStable();
            testTemplate({ collapsed: false, transition: false, items });
        });

        it('should collapse and transition', async () => {
            const items = setupItems({ collapsed: true, transition: true });
            fixture.detectChanges();
            await fixture.whenStable();
            testTemplate({ collapsed: true, transition: true, items });
        });

        it('should collapse without transition', async () => {
            const items = setupItems({ collapsed: true, transition: false });
            fixture.detectChanges();
            await fixture.whenStable();
            testTemplate({ collapsed: true, transition: false, items });
        });
    });

    describe('fireOnCloseEvent', () => {
        it('should emit onClose on item left click', () => {
            spyOn(navigationRailComponent.onClose, 'emit').and.callThrough();
            setupItems({ collapsed: true, transition: true });
            const btn = fixture.debugElement.query(By.css('button#home_id'));
            btn.triggerEventHandler(
                'click',
                new PointerEvent('click', {
                    button: MouseButton.left,
                    pointerType: PointerType.mouse,
                }),
            );
            expect(navigationRailComponent.onClose.emit)
                .withContext('onClose event fired')
                .toHaveBeenCalledOnceWith();
        });

        it('should emit onClose on left pen event', () => {
            spyOn(navigationRailComponent.onClose, 'emit').and.callThrough();
            setupItems({ collapsed: true, transition: true });
            const btn = fixture.debugElement.query(By.css('button#home_id'));
            btn.triggerEventHandler(
                'click',
                new PointerEvent('click', { pointerType: PointerType.pen }),
            );
            expect(navigationRailComponent.onClose.emit)
                .withContext('onClose event fired')
                .toHaveBeenCalledOnceWith();
        });

        it('should emit onClose on touch event', () => {
            spyOn(navigationRailComponent.onClose, 'emit').and.callThrough();
            setupItems({ collapsed: true, transition: true });
            const btn = fixture.debugElement.query(By.css('button#home_id'));
            btn.triggerEventHandler(
                'click',
                new PointerEvent('click', { pointerType: PointerType.touch }),
            );
            expect(navigationRailComponent.onClose.emit)
                .withContext('onClose event fired')
                .toHaveBeenCalledOnceWith();
        });

        it('should not emit onClose on item right click', () => {
            spyOn(navigationRailComponent.onClose, 'emit').and.callThrough();
            setupItems({ collapsed: true, transition: true });
            const btn = fixture.debugElement.query(By.css('button#home_id'));
            btn.triggerEventHandler(
                'click',
                new PointerEvent('click', {
                    button: MouseButton.right,
                    pointerType: PointerType.mouse,
                }),
            );
            expect(navigationRailComponent.onClose.emit)
                .withContext('onClose event fired')
                .not.toHaveBeenCalledOnceWith();
        });

        it('should not emit onClose on item middle click', () => {
            spyOn(navigationRailComponent.onClose, 'emit').and.callThrough();
            setupItems({ collapsed: true, transition: true });
            const btn = fixture.debugElement.query(By.css('button#home_id'));
            btn.triggerEventHandler(
                'click',
                new PointerEvent('click', {
                    button: MouseButton.middle,
                    pointerType: PointerType.mouse,
                }),
            );
            expect(navigationRailComponent.onClose.emit)
                .withContext('onClose event fired')
                .not.toHaveBeenCalledOnceWith();
        });
    });
});

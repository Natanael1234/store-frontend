import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayContainer } from '@angular/cdk/overlay';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { RowItemComponent } from './row-item.component';

// TODO: test
describe('IconRowItemComponent.', () => {
    let component: RowItemComponent;
    let fixture: ComponentFixture<RowItemComponent>;
    let overlayContainer: OverlayContainer;
    let overlayElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RowItemComponent, MatIconModule, MatTooltipModule],
        }).compileComponents();

        fixture = TestBed.createComponent(RowItemComponent);
        component = fixture.componentInstance;
        overlayContainer = TestBed.inject(OverlayContainer);
        overlayElement = overlayContainer.getContainerElement();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('container', () => {
        it('container should be defined', () => {
            component.icon.set('visibility');
            component.label.set('Test label');
            component.loading.set(false);
            component.disabled.set(false);
            component.toolTip.set('Test tooltip');
            fixture.detectChanges();

            const containterElement = fixture.debugElement.queryAll(
                By.css('div#container'),
            );

            expect(containterElement.length).toEqual(1);
        });

        describe('disabled', () => {
            it('container should be disabled when disabled model is true', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(true);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();
                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const iconElements = containterElement.queryAll(
                    By.directive(MatIcon),
                );
                expect(iconElements[0].classes['disabled']).toBeTrue();
            });

            it('container should not be disabled when disabled model is false', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();
                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const iconElements = containterElement.queryAll(
                    By.directive(MatIcon),
                );
                expect(iconElements[0].classes['disabled']).toBeUndefined();
            });

            it('container should not be disabled when disabled model is undefined', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(undefined);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();
                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const iconElements = containterElement.queryAll(
                    By.directive(MatIcon),
                );
                expect(iconElements[0].classes['disabled']).toBeUndefined();
            });
        });

        describe('icon', () => {
            it('container should show icon when icon model is defined', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();
                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                expect(containterElement.classes['icon']).toBeTrue();
            });

            it('container should not show icon when icon model is not defined', () => {
                component.icon.set(undefined);
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();
                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                expect(containterElement.classes['icon']).toBeUndefined();
            });
        });

        describe('label', () => {
            it('container should show label when label model is defined', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();
                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                expect(containterElement.classes['label']).toBeTrue();
            });

            it('container should not show label when label model is not defined', () => {
                component.icon.set('visibility');
                component.label.set(undefined);
                component.loading.set(false);
                component.disabled.set(false);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();
                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                expect(containterElement.classes['label']).toBeUndefined();
            });
        });

        describe('disabled', () => {
            it('container should be disabled when disabled model is true', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(true);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();
                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const iconElements = containterElement.queryAll(
                    By.directive(MatIcon),
                );
                expect(iconElements[0].classes['disabled']).toBeTrue();
            });

            it('container should not be disabled when disabled model is false', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();
                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const iconElements = containterElement.queryAll(
                    By.directive(MatIcon),
                );
                expect(iconElements[0].classes['disabled']).toBeUndefined();
            });

            it('container should not be disabled when disabled model is undefined', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(undefined);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();
                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const iconElements = containterElement.queryAll(
                    By.directive(MatIcon),
                );
                expect(iconElements[0].classes['disabled']).toBeUndefined();
            });
        });

        describe('matToolTip', () => {
            it('container should have matTooltip when toolTip model is defined', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.toolTip.set('Test tooltip');
                const container = fixture.debugElement.query(
                    By.css('#container'),
                );
                fixture.detectChanges();
                const tooltipInstance = container.injector.get(MatTooltip);

                expect(tooltipInstance).not.toBeNull();
                expect(tooltipInstance.message).toEqual('Test tooltip');
            });

            it('container should not have matTooltip when toolTip model is undefined', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.toolTip.set(undefined);
                const container = fixture.debugElement.query(
                    By.css('#container'),
                );
                fixture.detectChanges();
                const tooltipInstance = container.injector.get(MatTooltip);

                expect(tooltipInstance).not.toBeNull();
                expect(tooltipInstance.message).toEqual('');
            });
        });
    });

    describe('icon', () => {
        describe('icon', () => {
            it('should display icon based on icon model', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();

                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const iconElements = containterElement.queryAll(
                    By.directive(MatIcon),
                );

                expect(iconElements.length).toEqual(1);
                expect(iconElements[0].nativeElement.textContent).toEqual(
                    ' visibility ',
                );
            });

            it('should not show icon when icon model is undefined', () => {
                component.icon.set(undefined);
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();

                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const iconElements = containterElement.queryAll(
                    By.directive(MatIcon),
                );
                expect(iconElements.length).toEqual(0);
            });
        });

        describe('loading', () => {
            it('icon should be blank when loading model is true', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(true);
                component.disabled.set(false);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();

                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const iconElements = containterElement.queryAll(
                    By.directive(MatIcon),
                );

                expect(iconElements.length).toEqual(1);
                expect(iconElements[0].nativeElement.textContent).toEqual('  ');
            });

            it('icon should be loading when loading model is true', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(true);
                component.disabled.set(false);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();
                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const iconElements = containterElement.queryAll(
                    By.directive(MatIcon),
                );
                expect(iconElements[0].classes['skeleton-loader']).toBeTrue();
            });

            it('icon should not be loading when loading model is false', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();

                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const iconElements = containterElement.queryAll(
                    By.directive(MatIcon),
                );

                expect(iconElements[0].classes['skeleton-loader']).toBeFalsy();
            });

            it('icon should not be loading when loading model is undefined', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(undefined);
                component.disabled.set(false);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();

                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const iconElements = containterElement.queryAll(
                    By.directive(MatIcon),
                );

                expect(iconElements[0].classes['skeleton-loader']).toBeFalsy();
            });
        });

        describe('disabled', () => {
            it('icon should be disabled when disabled model is true', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(true);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();
                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const iconElements = containterElement.queryAll(
                    By.directive(MatIcon),
                );
                expect(iconElements[0].classes['disabled']).toBeTrue();
            });

            it('icon should not be disabled when disabled model false', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();

                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const iconElements = containterElement.queryAll(
                    By.directive(MatIcon),
                );

                expect(iconElements[0].classes['skeleton-loader']).toBeFalsy();
            });

            it('icon should not be disabled when disabled model undefined', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();

                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const iconElements = containterElement.queryAll(
                    By.directive(MatIcon),
                );

                expect(iconElements[0].classes['skeleton-loader']).toBeFalsy();
            });

            it('icon should not be disabled when both disabled and loading models are true', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(true);
                component.disabled.set(true);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();

                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const iconElements = containterElement.queryAll(
                    By.directive(MatIcon),
                );

                expect(iconElements[0].classes['disabled']).toBeTrue();
            });
        });
    });

    describe('label', () => {
        describe('label', () => {
            it('should display label based on label model', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();

                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const labelElements = containterElement.queryAll(
                    By.css('span#label'),
                );

                expect(labelElements.length).toEqual(1);
                expect(
                    labelElements[0].nativeElement.textContent.trim(),
                ).toEqual('Test label');
            });

            it('should not show label when label model is undefined', () => {
                component.icon.set('visibility');
                component.label.set(undefined);
                component.loading.set(false);
                component.disabled.set(false);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();

                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const labelElements = containterElement.queryAll(
                    By.css('span#label'),
                );
                expect(labelElements.length).toEqual(0);
            });
        });

        describe('loading', () => {
            it('label should be blank when loading model is true', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(true);
                component.disabled.set(false);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();

                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const labelElements = containterElement.queryAll(
                    By.css('span#label'),
                );

                expect(labelElements.length).toEqual(1);
                expect(
                    labelElements[0].nativeElement.textContent.trim(),
                ).toEqual('');
            });

            it('label should be loading when loading model is true', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(true);
                component.disabled.set(false);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();
                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const labelElements = containterElement.queryAll(
                    By.css('span#label'),
                );
                expect(labelElements[0].classes['skeleton-loader']).toBeTrue();
            });

            it('label should not be loading when loading model is false', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();

                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const labelElements = containterElement.queryAll(
                    By.css('span#label'),
                );

                expect(labelElements[0].classes['skeleton-loader']).toBeFalsy();
            });

            it('label should not be loading when loading model is undefined', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(undefined);
                component.disabled.set(false);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();

                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const labelElements = containterElement.queryAll(
                    By.css('span#label'),
                );

                expect(labelElements[0].classes['skeleton-loader']).toBeFalsy();
            });
        });

        describe('disabled', () => {
            it('label should be disabled when disabled model is true', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(true);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();
                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const labelElements = containterElement.queryAll(
                    By.css('span#label'),
                );
                expect(labelElements[0].classes['disabled']).toBeTrue();
            });

            it('should not be disabled when disabled model is false', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();

                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const labelElements = containterElement.queryAll(
                    By.css('span#label'),
                );

                expect(labelElements[0].classes['skeleton-loader']).toBeFalsy();
            });

            it('should not be disabled when disabled model is undefined', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(undefined);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();

                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const labelElements = containterElement.queryAll(
                    By.css('span#label'),
                );

                expect(labelElements[0].classes['skeleton-loader']).toBeFalsy();
            });

            it('should not be disabled when both disabled and loading models are true', () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(true);
                component.disabled.set(true);
                component.toolTip.set('Test tooltip');
                fixture.detectChanges();

                const containterElement = fixture.debugElement.query(
                    By.css('div#container'),
                );
                const labelElements = containterElement.queryAll(
                    By.css('span#label'),
                );
                expect(labelElements[0].classes['disabled']).toBeTrue();
            });
        });
    });

    // TODO: tooltip
});

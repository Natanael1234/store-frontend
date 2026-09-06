import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayContainer } from '@angular/cdk/overlay';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { RowItemComponent } from '@components/table/components/row-item/row-item.component';
import { RowItemHarness } from '@components/table/components/row-item/row-item.harness';

// TODO: test
describe('IconRowItemComponent.', () => {
    let component: RowItemComponent;
    let fixture: ComponentFixture<RowItemComponent>;
    let overlayContainer: OverlayContainer;
    let overlayElement: HTMLElement;
    let harness: RowItemHarness;

    function getComponentInputData() {
        return {
            label: component.label(),
            icon: component.icon(),
            disabled: component.disabled(),
            loading: component.loading(),
            tooltip: component.tooltip(),
        };
    }

    function getMattotipMessage() {
        const container = fixture.debugElement.query(By.css('#container'));
        fixture.detectChanges();
        const tooltipInstance = container.injector.get(MatTooltip);
        return tooltipInstance.message;
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RowItemComponent, MatIconModule, MatTooltipModule],
        }).compileComponents();

        fixture = TestBed.createComponent(RowItemComponent);
        component = fixture.componentInstance;
        overlayContainer = TestBed.inject(OverlayContainer);
        overlayElement = overlayContainer.getContainerElement();
        fixture.detectChanges();
        harness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            RowItemHarness,
        );
    });

    it('should create', async () => {
        expect(component).toBeTruthy();

        expect(await harness.getState()).toEqual({});

        expect(getComponentInputData()).toEqual({
            label: undefined,
            icon: undefined,
            disabled: false,
            loading: false,
            tooltip: undefined,
        });
    });

    describe('container', () => {
        it('container should be defined', async () => {
            component.icon.set('visibility');
            component.label.set('Test label');
            component.loading.set(false);
            component.disabled.set(false);
            component.tooltip.set('Test tooltip');
            fixture.detectChanges();

            expect(await harness.getState()).toEqual({
                icon: { name: 'visibility', loading: false, disabled: false },
                label: { text: 'Test label', loading: false, disabled: false },
            });
            expect(getComponentInputData()).toEqual({
                label: 'Test label',
                icon: 'visibility',
                disabled: false,
                loading: false,
                tooltip: 'Test tooltip',
            });
        });

        describe('disabled', () => {
            it('container should be disabled when disabled model is true', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(true);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: true,
                    },
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: true,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: true,
                    loading: false,
                    tooltip: 'Test tooltip',
                });
            });

            it('container should not be disabled when disabled model is false', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: false,
                    },
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: false,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: false,
                    loading: false,
                    tooltip: 'Test tooltip',
                });
            });

            it('container should not be disabled when disabled model is undefined', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(undefined);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: false,
                    },
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: false,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: undefined,
                    loading: false,
                    tooltip: 'Test tooltip',
                });
            });
        });

        describe('icon', () => {
            it('container should show icon when icon model is defined', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: false,
                    },
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: false,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: false,
                    loading: false,
                    tooltip: 'Test tooltip',
                });
            });

            it('container should not show icon when icon model is not defined', async () => {
                component.icon.set(undefined);
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: false,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: undefined,
                    disabled: false,
                    loading: false,
                    tooltip: 'Test tooltip',
                });
            });
        });

        describe('label', () => {
            it('container should show label when label model is defined', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: false,
                    },
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: false,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: false,
                    loading: false,
                    tooltip: 'Test tooltip',
                });
            });

            it('container should not show label when label model is not defined', async () => {
                component.icon.set('visibility');
                component.label.set(undefined);
                component.loading.set(false);
                component.disabled.set(false);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: false,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: undefined,
                    icon: 'visibility',
                    disabled: false,
                    loading: false,
                    tooltip: 'Test tooltip',
                });
            });
        });

        describe('disabled', () => {
            it('container should be disabled when disabled model is true', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(true);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: true,
                    },
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: true,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: true,
                    loading: false,
                    tooltip: 'Test tooltip',
                });
            });

            it('container should not be disabled when disabled model is false', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: false,
                    },
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: false,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: false,
                    loading: false,
                    tooltip: 'Test tooltip',
                });
            });

            it('container should not be disabled when disabled model is undefined', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(undefined);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: false,
                    },
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: false,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: undefined,
                    loading: false,
                    tooltip: 'Test tooltip',
                });
            });
        });

        describe('matToolTip', () => {
            it('container should have matTooltip when toolTip model is defined', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: false,
                    },
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: false,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: false,
                    loading: false,
                    tooltip: 'Test tooltip',
                });
                expect(getMattotipMessage()).toEqual('Test tooltip');
            });

            it('container should not have matTooltip when toolTip model is undefined', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.tooltip.set(undefined);
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: false,
                    },
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: false,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: false,
                    loading: false,
                    tooltip: undefined,
                });
                expect(getMattotipMessage()).toEqual('');
            });
        });
    });

    describe('icon', () => {
        describe('icon', () => {
            it('should display icon based on icon model', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: false,
                    },
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: false,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: false,
                    loading: false,
                    tooltip: 'Test tooltip',
                });
            });

            it('should not show icon when icon model is undefined', async () => {
                component.icon.set(undefined);
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: false,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: undefined,
                    disabled: false,
                    loading: false,
                    tooltip: 'Test tooltip',
                });
            });
        });

        describe('loading', () => {
            it('icon should be loading when loading model is true', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(true);
                component.disabled.set(false);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: '',
                        loading: true,
                        disabled: true,
                    },
                    label: {
                        text: '',
                        loading: true,
                        disabled: true,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: false,
                    loading: true,
                    tooltip: 'Test tooltip',
                });
            });

            it('icon should not be loading when loading model is false', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: false,
                    },
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: false,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: false,
                    loading: false,
                    tooltip: 'Test tooltip',
                });
            });

            it('icon should not be loading when loading model is undefined', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(undefined);
                component.disabled.set(false);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: false,
                    },
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: false,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: false,
                    loading: undefined,
                    tooltip: 'Test tooltip',
                });
            });
        });

        describe('disabled', () => {
            it('icon should be disabled when disabled model is true', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(true);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: true,
                    },
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: true,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: true,
                    loading: false,
                    tooltip: 'Test tooltip',
                });
            });

            it('icon should not be disabled when disabled model false', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: false,
                    },
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: false,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: false,
                    loading: false,
                    tooltip: 'Test tooltip',
                });
            });

            it('icon should not be disabled when disabled model undefined', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: false,
                    },
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: false,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: false,
                    loading: false,
                    tooltip: 'Test tooltip',
                });
            });

            it('icon should be disabled when both disabled and loading models are true', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(true);
                component.disabled.set(true);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: '',
                        loading: true,
                        disabled: true,
                    },
                    label: {
                        text: '',
                        loading: true,
                        disabled: true,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: true,
                    loading: true,
                    tooltip: 'Test tooltip',
                });
            });
        });
    });

    describe('label', () => {
        describe('label', () => {
            it('should display label based on label model', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: false,
                    },
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: false,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: false,
                    loading: false,
                    tooltip: 'Test tooltip',
                });
            });

            it('should not show label when label model is undefined', async () => {
                component.icon.set('visibility');
                component.label.set(undefined);
                component.loading.set(false);
                component.disabled.set(false);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: false,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: undefined,
                    icon: 'visibility',
                    disabled: false,
                    loading: false,
                    tooltip: 'Test tooltip',
                });
            });
        });

        describe('loading', () => {
            it('should be loading when loading model is true', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(true);
                component.disabled.set(false);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: '',
                        loading: true,
                        disabled: true,
                    },
                    label: {
                        text: '',
                        loading: true,
                        disabled: true,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: false,
                    loading: true,
                    tooltip: 'Test tooltip',
                });
            });

            it('should not be loading when loading model is false', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: false,
                    },
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: false,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: false,
                    loading: false,
                    tooltip: 'Test tooltip',
                });
            });

            it('should not be loading when loading model is undefined', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(undefined);
                component.disabled.set(false);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: false,
                    },
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: false,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: false,
                    loading: undefined,
                    tooltip: 'Test tooltip',
                });
            });
        });

        describe('disabled', () => {
            it('should be disabled when disabled model is true', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(true);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: true,
                    },
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: true,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: true,
                    loading: false,
                    tooltip: 'Test tooltip',
                });
            });

            it('should not be disabled when disabled model is false', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(false);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: false,
                    },
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: false,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: false,
                    loading: false,
                    tooltip: 'Test tooltip',
                });
            });

            it('should not be disabled when disabled model is undefined', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(false);
                component.disabled.set(undefined);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: 'visibility',
                        loading: false,
                        disabled: false,
                    },
                    label: {
                        text: 'Test label',
                        loading: false,
                        disabled: false,
                    },
                });
                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: undefined,
                    loading: false,
                    tooltip: 'Test tooltip',
                });
            });

            it('should be disabled when both disabled and loading models are true', async () => {
                component.icon.set('visibility');
                component.label.set('Test label');
                component.loading.set(true);
                component.disabled.set(true);
                component.tooltip.set('Test tooltip');
                fixture.detectChanges();

                expect(await harness.getState()).toEqual({
                    icon: {
                        name: '',
                        loading: true,
                        disabled: true,
                    },
                    label: {
                        text: '',
                        loading: true,
                        disabled: true,
                    },
                });

                expect(getComponentInputData()).toEqual({
                    label: 'Test label',
                    icon: 'visibility',
                    disabled: true,
                    loading: true,
                    tooltip: 'Test tooltip',
                });
            });
        });
    });

    // TODO: tooltip
});

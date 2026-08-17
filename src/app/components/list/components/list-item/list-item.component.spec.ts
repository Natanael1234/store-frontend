import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ListItemComponent } from '@components/list/components/list-item/list-item.component';
import { ListItemHarness } from '@components/list/components/list-item/list-item.harness';
import { Icon } from '@enums/icons/icons.enum';

describe('ListItemComponent.', () => {
    let component: ListItemComponent;
    let fixture: ComponentFixture<ListItemComponent>;
    let harness: ListItemHarness;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListItemComponent, MatIconModule, MatTooltipModule],
        }).compileComponents();

        fixture = TestBed.createComponent(ListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        harness = await TestbedHarnessEnvironment.harnessForFixture(
            fixture,
            ListItemHarness,
        );
    });

    it('should rebder list item without labels and icons ant not loading by default', async () => {
        expect(component).toBeTruthy();

        const state = await harness.getState();
        expect(state).toEqual({
            hasValidStructure: true,
            loading: false,
            labels: [],
            icons: [],
        });
    });

    it('should render list item not loading by default', async () => {
        component.labels.set([
            { text: 'Label 1', tooltip: 'Tooltip 1', disabled: false },
            { text: 'Label 2', tooltip: 'Tooltip 2', disabled: true },
        ]);
        component.icons.set([
            { name: Icon.checked, tooltip: 'Tooltip 1', disabled: true },
            { name: Icon.home, tooltip: 'Tooltip 2', disabled: false },
        ]);
        fixture.detectChanges();

        const state = await harness.getState();
        expect(state).toEqual({
            hasValidStructure: true,
            loading: false,
            labels: [
                { text: 'Label 1', loading: false, disabled: false },
                { text: 'Label 2', loading: false, disabled: true },
            ],
            icons: [
                { name: Icon.checked, loading: false, disabled: true },
                { name: Icon.home, loading: false, disabled: false },
            ],
        });
    });

    it('should render list item not loading when loading is false', async () => {
        component.loading.set(false);
        component.labels.set([
            { text: 'Label 1', tooltip: 'Tooltip 1', disabled: false },
            { text: 'Label 2', tooltip: 'Tooltip 2', disabled: true },
        ]);
        component.icons.set([
            { name: Icon.checked, tooltip: 'Tooltip 1', disabled: true },
            { name: Icon.home, tooltip: 'Tooltip 2', disabled: false },
        ]);
        fixture.detectChanges();

        const state = await harness.getState();
        expect(state).toEqual({
            hasValidStructure: true,
            loading: false,
            labels: [
                { text: 'Label 1', loading: false, disabled: false },
                { text: 'Label 2', loading: false, disabled: true },
            ],
            icons: [
                { name: Icon.checked, loading: false, disabled: true },
                { name: Icon.home, loading: false, disabled: false },
            ],
        });
    });

    it('should render loading list item when loading is true', async () => {
        component.loading.set(true);
        component.labels.set([
            { text: 'Label 1', tooltip: 'Tooltip 1', disabled: false },
            { text: 'Label 2', tooltip: 'Tooltip 2', disabled: true },
        ]);
        component.icons.set([
            { name: Icon.checked, tooltip: 'Tooltip 1', disabled: true },
            { name: Icon.home, tooltip: 'Tooltip 2', disabled: false },
        ]);
        fixture.detectChanges();

        const state = await harness.getState();
        expect(state).toEqual({
            hasValidStructure: true,
            loading: true,
            labels: [
                { text: '', loading: true, disabled: false },
                { text: '', loading: true, disabled: true },
            ],
            icons: [
                { name: '', loading: true, disabled: true },
                { name: '', loading: true, disabled: false },
            ],
        });
    });
});

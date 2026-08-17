import { ComponentHarness } from '@angular/cdk/testing';
import { MatIconHarness } from '@angular/material/icon/testing';

export class ListItemHarness extends ComponentHarness {
    static hostSelector = 'app-list-item';
    private readonly hostChildren = this.locatorForAll(':scope > *');
    private readonly containerChildren = this.locatorForAll(':scope > * > *');
    private readonly leftColumnChildren = this.locatorForAll(
        ':scope > #container > #left-column > *',
    );
    private readonly rightColumnChildren = this.locatorForAll(
        ':scope > #container> #right-column > *',
    );
    private readonly container = this.locatorFor(':scope > #container');
    private readonly labels = this.locatorForAll(
        ':scope > #container > #left-column > div',
    );
    private readonly labelChildren = this.locatorForAll(
        ':scope > #container > #left-column > div > *',
    );
    private readonly iconHarnesses = this.locatorForAll(MatIconHarness);
    private readonly iconElements = this.locatorForAll(
        ':scope > #container > #right-column > mat-icon',
    );
    private readonly loadingElements = this.locatorForAll(
        ':scope > #container.loading',
        ':scope > #container > #left-column > div > .skeleton-loader',
        ':scope > #container > #right-column > div > .skeleton-loader',
    );
    private readonly notLoadingElements = this.locatorForAll(
        ':scope > #container:not(.loading)',
        ':scope > #container > #left-column > div > :not(.skeleton-loader)',
        ':scope > #container > #right-column > div > :not(.skeleton-loader)',
    );

    async containerIsLoadng() {
        const container = await this.container();
        return container.hasClass('loading');
    }

    async getIcons() {
        const iconHarnesses = await this.iconHarnesses();
        const icons: {
            name: string | null;
            loading: boolean;
            disabled: boolean;
        }[] = [];
        for (let i = 0; i < iconHarnesses.length; i++) {
            const iconHarness = iconHarnesses[i];
            const iconHost = await iconHarness.host();
            const name = await iconHarness.getName();
            const loading = await iconHost.hasClass('skeleton-loader');
            const disabled = await iconHost.hasClass('disabled');
            icons.push({
                name,
                loading,
                disabled,
            });
        }
        return icons;
    }

    async getLabels() {
        const labels = await this.labels();
        const _labels: {
            text: string | null;
            loading: boolean;
            disabled: boolean;
        }[] = [];
        for (let i = 0; i < labels.length; i++) {
            const label = labels[i];
            const text = await label.text();
            const loading = await label.hasClass('skeleton-loader');
            const disabled = await label.hasClass('disabled');
            _labels.push({ text, loading, disabled });
        }
        return _labels;
    }

    async hasValidStructure(): Promise<boolean | { [key: string]: string }> {
        const errors: any = {};

        const hostChildren = await this.hostChildren();
        if ((await hostChildren).length != 1) {
            errors['hostChildrenCount'] =
                `Host has invalis child count. Expected 1. Found ${hostChildren.length}.`;
        }
        expect(await hostChildren[0].getProperty('tagName')).toEqual('DIV');

        const containerChildren = await this.containerChildren();
        if (containerChildren.length != 2) {
            errors['containerChildrenCount'] =
                `Container has invalid child count. Expected 2. Found ${containerChildren.length}.`;
        }

        const leftColumnTagName =
            await containerChildren[0].getProperty('tagName');
        if (leftColumnTagName != 'DIV') {
            errors['leftColumId'] =
                `First container column must be a div. Found ${leftColumnTagName}.`;
        }

        const rightColumnTagName =
            await containerChildren[1].getProperty('tagName');
        if (rightColumnTagName != 'DIV') {
            errors['leftColumId'] =
                `Second container column must be a div. Found ${rightColumnTagName}.`;
        }

        const leftColumnId = await containerChildren[0].getProperty('id');
        if (leftColumnId != 'left-column') {
            errors['leftColumId'] =
                `'left-column' id missing in first container child. Found ${leftColumnId}.`;
        }

        const rightColumnId = await containerChildren[1].getProperty('id');
        if (rightColumnId != 'right-column') {
            errors['rightColumId'] =
                `'right-column' id missing in first container child.`;
        }

        for (const leftColumnChild of await this.leftColumnChildren()) {
            const tagName = await leftColumnChild.getProperty('tagName');
            if (tagName != 'DIV') {
                errors['leftColumnChildTag'] =
                    `Left column child tag must be div. Fround ${tagName}.`;
            }
        }

        for (const rightColumnChild of await this.rightColumnChildren()) {
            const tagName = await rightColumnChild.getProperty('tagName');
            if (tagName != 'MAT-ICON') {
                errors['rightColumnChildTag'] =
                    `Right column child tag must be div. Fround ${tagName}.`;
            }
        }

        expect(await this.labelChildren()).toHaveSize(0);

        let containsLoading = !!(await this.loadingElements()).length;
        let containsNotLoading = !!(await this.notLoadingElements()).length;
        if (containsLoading && containsNotLoading) {
            errors['hasConciseLoadingState'] =
                `Component contains elements with and without loading classes (.loading and .skeleton-loader).`;
        }
        if (containsLoading) {
            for (const label of await this.labels()) {
                // should not show label while loading
                if (await label.text()) {
                    errors['labelVisibleWhileLoading'] =
                        `Component contains elements both loading classes (.loading or .skeleton-loader) and label text.`;
                }
            }
            for (const icon of await this.iconHarnesses()) {
                // should not show icon while loading
                if (await icon.getName()) {
                    errors['iconVisibleWhileLoading'] =
                        `Component contains elements both loading classes (.loading or .skeleton-loader) and icon name.`;
                }
            }
        }

        return Object.keys(errors).length == 0 ? true : errors;
    }

    async getState() {
        const loading = await this.containerIsLoadng();
        const labels = await this.getLabels();
        const icons = await this.getIcons();
        const hasValidStructure = await this.hasValidStructure();
        return { hasValidStructure, loading, labels, icons };
    }
}

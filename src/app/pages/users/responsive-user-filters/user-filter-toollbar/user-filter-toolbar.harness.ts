import { ComponentHarness } from '@angular/cdk/testing';
import { SelectFieldHarness } from '@components/form/components/select/select-field.harness';
import { MouseButton } from '@enums/mouse-button/mouse-button.enum';
import { PointerType } from '@enums/pointer-type/pointer-type.enum';
import { isEqual } from 'lodash';

type UserFilterChildrenData = { col: number; childTagName: string };
type UserFilterToolbarState = {
    hasValidStructure: boolean | { [key: string]: string };
    children: UserFilterChildrenData[];
};

export class UserFilterToolbarHarness extends ComponentHarness {
    static hostSelector = 'app-user-filter-toolbar';
    private readonly hostChildrenElements = this.locatorForAll(':scope > *');
    private readonly formChildrenElements =
        this.locatorForAll(':scope > form > *');
    private readonly wrapperChildrenElements = this.locatorForAll(
        ':scope > form > div > *',
    );

    private readonly filterButton = this.locatorFor(
        ':scope button#filter-button',
    );

    private readonly cancelButton = this.locatorForOptional(
        ':scope button#cancel-button',
    );

    private readonly selectFields = this.locatorForAll(SelectFieldHarness);

    async getSelect(searchedSelectId: string) {
        const selectFields = await this.selectFields();
        let foundSelectField: SelectFieldHarness;
        for (const selectField of selectFields) {
            const selectId = await selectField.getSelectId();
            if (selectId == searchedSelectId) {
                return selectField;
            }
        }
        return null;
    }

    async selectOrderOption(
        label:
            | 'Nome (A-Z)'
            | 'Nome (Z-A)'
            | 'Email (A-Z)'
            | 'Email (Z-A)'
            | 'Ativos'
            | 'Inativos'
            | 'Não deletados'
            | 'Deletados',
    ) {
        const select = await this.getSelect('order-select')!;
        await select!.clickOption(label);
    }

    async selectActiveOption(label: 'Ativos' | 'Inativos' | 'Todos') {
        const select = await this.getSelect('active-select')!;
        await select!.clickOption(label);
    }

    async selectDeletedOption(label: 'Não deletados' | 'Deletados' | 'Todos') {
        const select = await this.getSelect('deleted-select')!;
        await select!.clickOption(label);
    }

    async fireFilterButtonClick() {
        const filterButton = await this.filterButton();
        await filterButton.dispatchEvent('click', {
            button: MouseButton.left,
            pointerType: PointerType.mouse,
        });
    }

    async fireCancelButtonClick() {
        const cancelButton = await this.cancelButton();
        await cancelButton!.dispatchEvent('click', {
            button: MouseButton.left,
            pointerType: PointerType.mouse,
        });
    }

    async getHostChildrenCount() {
        return (await this.hostChildrenElements()).length;
    }

    async isHostChildAForm() {
        const hostChildren = await this.hostChildrenElements();
        if (hostChildren.length < 1) return false;
        const tagName = await hostChildren[0].getProperty('tagName');
        return tagName == 'FORM';
    }

    async getHostChildElements() {
        const hostChildren = await this.hostChildrenElements();
        return hostChildren;
    }

    async getFormChildElements() {
        const formChildren = await this.formChildrenElements();
        return formChildren;
    }

    async getWrapperChildElements() {
        const formChildren = await this.wrapperChildrenElements();
        return formChildren;
    }

    async getWrapperCols(): Promise<number[]> {
        const formChildrenEls = await this.getFormChildElements();
        const wrapperCols: any[] = [];
        for (let i = 0; i < formChildrenEls.length; i++) {
            const formChildrenEl = formChildrenEls[i];
            const col = (await formChildrenEl.getAttribute('col')) ?? '';
            if (col.trim() === '') {
                wrapperCols.push(undefined);
            } else if (!Number.isNaN(Number(col))) {
                wrapperCols.push(+col);
            } else {
                wrapperCols.push(undefined);
            }
        }
        return wrapperCols;
    }

    async getFormChildrenTagNames(): Promise<string[]> {
        const formChildrenEls = await this.getFormChildElements();
        const formChildtagNames: string[] = await Promise.all(
            formChildrenEls.map(
                async (wrapperChildElement) =>
                    (await wrapperChildElement.getProperty(
                        'tagName',
                    )) as string,
            ),
        );
        return formChildtagNames;
    }

    async getWrapperChildrenTagNames(): Promise<string[]> {
        const wrapperChildrenEls = await this.getWrapperChildElements();
        const wrapperChildtagNames: string[] = await Promise.all(
            wrapperChildrenEls.map(
                async (wrapperChildElement) =>
                    (await wrapperChildElement.getProperty(
                        'tagName',
                    )) as string,
            ),
        );
        return wrapperChildtagNames;
    }

    async getWrapperCount(): Promise<number> {
        const formChildrenEls = await this.getFormChildElements();
        return formChildrenEls.length;
    }

    async getWrapperChildrenCount(): Promise<number[]> {
        const wrapperChildrenEls = await this.getWrapperChildElements();
        const childrenCount = [];
        for (let i = 0; i < wrapperChildrenEls.length; i++) {
            const count =
                await wrapperChildrenEls[i].getProperty<number>(
                    'childElementCount',
                );
            childrenCount.push(count);
        }
        return childrenCount;
    }

    async getStructureData() {
        const wrapperChildrenTagNames = await this.getWrapperChildrenTagNames();
        const wrapperCols = await this.getWrapperCols();
        const maxLength = Math.max(
            wrapperChildrenTagNames.length,
            wrapperCols.length,
        );
        const dataList: UserFilterChildrenData[] = [];
        for (let i = 0; i < maxLength; i++) {
            const data = {
                col: wrapperCols[i],
                childTagName: wrapperChildrenTagNames[i],
            };
            dataList.push(data);
        }
        return dataList;
    }

    async hasValidStructure(): Promise<boolean | { [key: string]: string }> {
        const errors: any = {};

        const hostChildElements = await this.getHostChildElements();

        // host has one children
        if (hostChildElements.length != 1) {
            errors['hasValidChildrenCount'] =
                `Invalid children count: ${hostChildElements.length}.`;
        }

        // host children is a form
        const hostChildElement = hostChildElements[0];
        if ((await hostChildElement.getProperty('tagName')) !== 'FORM') {
            errors['isHostChildAForm'] = `Host child is not a form.`;
        }

        // form contain grid class
        const formClasses: string[] = (
            (await hostChildElement.getAttribute('class')) ?? ''
        ).split(' ');
        if (!formClasses.includes('grid')) {
            errors['gridClassMissingFromTheForm'] =
                `Grid class missing from the form.`;
        }

        const formChildren = await this.getFormChildrenTagNames();
        if (
            !isEqual(['DIV', 'DIV', 'DIV'], formChildren) &&
            !isEqual(['DIV', 'DIV', 'DIV', 'DIV'], formChildren) &&
            !isEqual(['DIV', 'DIV', 'DIV', 'DIV', 'DIV'], formChildren)
        ) {
            errors['invalidFormChildren'] =
                `Form children should be divs. Found ${formChildren}.`;
        }

        const wrapperChildCount = await this.getWrapperChildrenCount();
        if (
            isEqual(wrapperChildCount, [1, 1, 1]) &&
            isEqual(wrapperChildCount, [1, 1, 1, 1]) &&
            isEqual(wrapperChildCount, [1, 1, 1, 1, 1])
        ) {
            errors['invalidFormChildChildren'] =
                `Form children should contein one child. Found ${wrapperChildCount}.`;
        }

        if (formChildren.length !== wrapperChildCount.length) {
            errors['invalidFormChildChildren'] =
                `Wrappers should have exctly one child.`;
        }

        const wrapperChildtagNames = await this.getWrapperChildrenTagNames();
        const wrapperCols = await this.getWrapperCols();

        if (
            isEqual(
                [
                    'APP-SELECT-FIELD',
                    'APP-SELECT-FIELD',
                    'APP-SELECT-FIELD',
                    'APP-BUTTON',
                    'APP-BUTTON',
                ],
                wrapperChildtagNames,
            )
        ) {
            if (
                !isEqual([12, 12, 12, 6, 6], wrapperCols) &&
                !isEqual([2, 2, 2, 2, 2], wrapperCols)
            ) {
                errors['invalidWrapperCols'] =
                    `Invalid form wrapper cols. Found ${JSON.stringify(wrapperCols)}.`;
            }
        } else if (
            isEqual(
                [
                    'APP-SELECT-FIELD',
                    'APP-SELECT-FIELD',
                    'APP-BUTTON',
                    'APP-BUTTON',
                ],
                wrapperChildtagNames,
            )
        ) {
            if (!isEqual([12, 12, 6, 6], wrapperCols)) {
                errors['invalidWrapperCols'] =
                    `Invaid form wrapper cols. Found ${JSON.stringify(wrapperCols)}.`;
            }
        } else if (
            isEqual(
                [
                    'APP-SELECT-FIELD',
                    'APP-SELECT-FIELD',
                    'APP-SELECT-FIELD',
                    'APP-BUTTON',
                ],
                wrapperChildtagNames,
            )
        ) {
            if (!isEqual([12, 12, 12, 6], wrapperCols)) {
                errors['invalidWrapperCols'] =
                    `Invalid form wrapper cols. Found ${JSON.stringify(wrapperCols)}.`;
            }
        } else if (
            isEqual(
                ['APP-SELECT-FIELD', 'APP-SELECT-FIELD', 'APP-BUTTON'],
                wrapperChildtagNames,
            )
        ) {
            if (!isEqual([12, 12, 6], wrapperCols)) {
                errors['invalidWrapperCols'] =
                    `Invalid form wrapper cols. Found ${JSON.stringify(wrapperCols)}.`;
            }
        } else {
            errors['invalidWrapperChildren'] =
                `Invalid wrapper children. Found ${wrapperChildtagNames}.`;
        }

        return Object.keys(errors).length == 0 ? true : errors;
    }

    async getState(): Promise<UserFilterToolbarState> {
        const hasValidStructure = await this.hasValidStructure();
        const children = await this.getStructureData();
        return { hasValidStructure, children };
    }
}

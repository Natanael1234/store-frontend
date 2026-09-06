import { ComponentHarness } from '@angular/cdk/testing';
import { MouseButton } from '@enums/mouse-button/mouse-button.enum';
import { PointerType } from '@enums/pointer-type/pointer-type.enum';

type UserFilterToolbarState = {
    hasValidStructure: boolean | { [key: string]: string };
};

export class ResponsiveUserFiltersHarness extends ComponentHarness {
    static hostSelector = 'app-responsive-user-filters';
    private readonly hostChildrenElements = this.locatorForAll(':scope > *');
    private readonly divChildrenElements =
        this.locatorForAll(':scope > div > *');
    private readonly button = this.locatorForOptional(':scope > div > button');
    private readonly buttonChildren = this.locatorForAll(
        ':scope > div > button > *',
    );

    private readonly buttonIcon = this.locatorFor(
        ':scope > div > button > mat-icon',
    );

    private readonly buttonIcons = this.locatorForAll(
        ':scope > div > button > mat-icon',
    );

    async triggerLeftClick() {
        const button = await this.button();
        await button?.dispatchEvent('click', {
            pointerType: PointerType.mouse,
            button: MouseButton.left,
        });
    }

    async triggerMiddleClick() {
        const button = await this.button();
        await button?.dispatchEvent('click', {
            pointerType: PointerType.mouse,
            button: MouseButton.middle,
        });
    }

    async triggerRightClick() {
        const button = await this.button();
        await button?.dispatchEvent('click', {
            pointerType: PointerType.mouse,
            button: MouseButton.right,
        });
    }

    async triggerTouch() {
        const button = await this.button();
        await button?.dispatchEvent('pointerdown', {
            pointerType: PointerType.touch,
            button: MouseButton.left,
        });
    }

    async triggerPenClick(): Promise<void> {
        const button = await this.button();
        await button?.dispatchEvent('click', {
            pointerType: PointerType.pen,
            button: MouseButton.left,
        } as any);
    }

    async getHostChildElements() {
        const hostChildren = await this.hostChildrenElements();
        return hostChildren;
    }

    async countHostChildElements() {
        const hostChildElements = await this.getHostChildElements();
        return hostChildElements.length;
    }

    async doesHostHaveOnlyOneChild() {
        const count = await this.countHostChildElements();
        return count == 1;
    }

    async getHostChildTagName() {
        const children = await this.hostChildrenElements();
        const tagName = await children[0].getProperty('tagName');
        return tagName;
    }

    async isHostChildADiv() {
        const tagName = await this.getHostChildTagName();
        const isADiv = tagName == 'DIV';
        return isADiv;
    }

    async getHostChildId() {
        const hostChildren = await this.hostChildrenElements();
        const id = await hostChildren[0].getProperty('id');
        return id;
    }

    async countContainerChildElements() {
        const containerChildrenElements = await this.divChildrenElements();
        return containerChildrenElements.length;
    }

    async doesContainerHaveOnlyTwoChildren() {
        const count = await this.countContainerChildElements();
        return count == 2;
    }

    async getContainerClasses() {
        const hostChildElements = await this.getHostChildElements();
        const hostChildElement = hostChildElements[0];
        const containerClasses: string[] = (
            (await hostChildElement.getAttribute('class')) ?? ''
        ).split(' ');
        return containerClasses;
    }

    async containerContainsClass(clazz: string) {
        const classes = await this.getContainerClasses();
        const contains = !!classes.includes(clazz);
        return contains;
    }

    async containerContainsFiltersClass() {
        return this.containerContainsClass('filters');
    }

    async containerContainsMobileClass() {
        return this.containerContainsClass('mobile');
    }

    async getFirstContainerChildTagName() {
        const children = await this.divChildrenElements();
        const tagName = await children[0].getProperty('tagName');
        return tagName;
    }

    async isFirstContainerElementIsAnTextField() {
        const tagName = await this.getFirstContainerChildTagName();
        const isTextField = tagName == 'APP-TEXT-FILTER';
        return isTextField;
    }

    async getSecondContainerChildTagName() {
        const children = await this.divChildrenElements();
        const tagName = await children[1].getProperty('tagName');
        return tagName;
    }

    async isSecondContainerElementAButton() {
        const tagName = await this.getSecondContainerChildTagName();
        const isButton = tagName == 'BUTTON';
        return isButton;
    }

    async isSecondContainerElementAnUserFilterToolbar() {
        const tagName = await this.getSecondContainerChildTagName();
        const isUserFilterToolbar = tagName == 'APP-USER-FILTER-TOOLBAR';
        return isUserFilterToolbar;
    }

    async getButtonLabel() {
        const buttonChildren = await this.buttonChildren();
        const label = await buttonChildren[2].text();
        return label;
    }

    async countButtonIcons() {
        const buttonIcons = await this.buttonIcons();
        return buttonIcons.length;
    }

    async getButtonIcon() {
        const buttonIcon = await this.buttonIcon();
        return buttonIcon;
    }

    async getButtonIconLabel() {
        const buttonIcon = await this.buttonIcon();
        const icon = await buttonIcon.text();
        return icon;
    }

    async hasValidStructure(): Promise<boolean | { [key: string]: string }> {
        const errors: any = {};

        if (!(await this.doesHostHaveOnlyOneChild())) {
            const count = await this.countHostChildElements();
            errors['hasValidChildrenCount'] =
                `Invalid children count: ${count}.`;
        }

        if (!(await this.isHostChildADiv())) {
            errors['isHostChildADiv'] = `Host child is not a div.`;
        }

        if ((await this.getHostChildId()) != 'container') {
            errors['rootMissingContainerId'] =
                `The root div should contain the "container" id.`;
        }

        if (!(await this.containerContainsFiltersClass())) {
            errors['rootMissingFiltersClass'] =
                `The root div should contain the "filters" class.`;
        }

        if (!(await this.doesContainerHaveOnlyTwoChildren())) {
            const count = await this.countContainerChildElements();
            errors['containerChildCount'] =
                `The container should have 2 children. Found ${count}.`;
        }

        if (!(await this.isFirstContainerElementIsAnTextField())) {
            errors['appTextFilter'] =
                `The first container element should be an TextFieldComponent.`;
        }

        const tagName = await this.getSecondContainerChildTagName();
        if (await this.containerContainsMobileClass()) {
            // should be a open dialog button if mobile
            if (!(await this.isSecondContainerElementAButton())) {
                errors['openDialogButton'] =
                    `The second container element should be an button component when mobile. Found ${tagName}`;
            }

            const buttonLabel = await this.getButtonLabel();
            if (buttonLabel != 'Ordenar e filtrar') {
                errors['buttonLabel'] =
                    `Open dialog button should have the label "Ordenar e filtrar". Found "${buttonLabel}"`;
            }

            const buttonIconsCount = await this.countButtonIcons();
            if (buttonIconsCount != 1) {
                errors['buttonIconsCount'] =
                    `Open dialog button should have only one icon. Found ${buttonIconsCount}.`;
            }

            const buttonIcon = await this.getButtonIconLabel();
            if (buttonIcon != 'filter_list') {
                errors['buttonIcon'] =
                    `Open dialog button should have the icon "filter_list". Found "${buttonIcon}."`;
            }

            // TODO: test if it is a mat-button
        } else {
            //  should be a filter toolbar otherwise
            if (!(await this.isSecondContainerElementAnUserFilterToolbar())) {
                errors['userFilterToolbar'] =
                    `The second container element should be an UserFilterToolbarComponent when not mobile. Found ${tagName}`;
            }
        }

        return Object.keys(errors).length == 0 ? true : errors;
    }

    async getState(): Promise<UserFilterToolbarState> {
        const hasValidStructure = await this.hasValidStructure();
        return { hasValidStructure };
    }
}

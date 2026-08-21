import { ComponentHarness } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatIconHarness } from '@angular/material/icon/testing';
import { ButtonAppearance } from '@components/form/components/button/enum/appearance/button-appearance.enum';
import { FormElementType } from '@components/form/enums/form-element-type/form-element-type.enum';
import { Icon } from '@enums/icons/icons.enum';
import { MouseButton } from '@enums/mouse-button/mouse-button.enum';
import { PointerType } from '@enums/pointer-type/pointer-type.enum';

type ButtonState = {
    id: string | null;
    type:
        | FormElementType.button
        | FormElementType.submit
        | FormElementType.reset;
    label: string | null;
    icon: Icon | null;
    appearance: ButtonAppearance | null;
    isFocused: boolean;
    isFocusable: boolean;
    isDisabled: boolean;
    hasValidStructure: boolean | { [key: string]: string };
};

export class ButtonHarness extends ComponentHarness {
    static hostSelector = 'app-button';
    private readonly hostChildrenElements = this.locatorForAll(':scope > *');
    private buttonElement = this.locatorFor('button');
    private readonly buttonChildrenElements = this.locatorForAll(
        ':scope > button > *',
    );
    private icon = this.locatorFor(MatIconHarness);
    private icons = this.locatorForAll(MatIconHarness);
    private label = this.locatorForOptional('mat-label');

    private innerButtonIcon = this.locatorForOptional(
        ':scope > button > mat-icon',
    );
    private innerButtonIcons = this.locatorForAll(':scope > button > mat-icon');
    private innerButtonLabel = this.locatorFor(
        ':scope > button > .mdc-button__label > mat-label',
    );
    private innerButtonLabels = this.locatorForAll(
        ':scope > button > .mdc-button__label > mat-label',
    );
    private matButtonHarness = this.locatorFor(MatButtonHarness);

    async getHostChildrenCount() {
        return (await this.hostChildrenElements()).length;
    }

    async hostContainsASingleButton() {
        const children = await this.hostChildrenElements();
        if (children.length != 1) return false;
        const tagName = await children[0].getProperty('tagName');
        return tagName == 'BUTTON';
    }

    async isHostChildAButton() {
        const hostChildren = await this.hostChildrenElements();
        if (hostChildren.length < 1) return false;
        const tagName = await hostChildren[0].getProperty('tagName');
        return tagName == 'BUTTON';
    }

    async getButton() {
        return this.buttonElement();
    }

    async getId() {
        const button = await this.getButton();
        const id = await button.getAttribute('id');
        return id;
    }

    async getType() {
        const button = await this.getButton();
        const type = (await button.getAttribute('type')) as
            | FormElementType.button
            | FormElementType.submit
            | FormElementType.reset;
        return type;
    }

    async getLabel() {
        return this.label();
    }

    async isFocusable() {
        const button = await this.getButton();
        const tabIndex = await button.getProperty('tabIndex');
        return tabIndex !== -1;
    }

    async isFocused() {
        const button = await this.getButton();
        const isFocused = await button.isFocused();
        return isFocused;
    }

    async getButtonClasses() {
        const classes =
            (await (await this.buttonElement()).getAttribute('class')) ?? '';
        return classes.split(' ');
    }

    async isButtonDisabled() {
        const button = await this.buttonElement();
        return button.getProperty('disabled');
    }

    async getIcon() {
        const icons = await this.icons();
        return icons[0];
    }

    async getIconText() {
        const icon = await this.getIcon();
        if (!icon) {
            return null;
        }
        const iconName = (await icon.getName()) as Icon | null;
        return iconName;
    }

    async getInnerButtonLabelText(): Promise<string | null> {
        const label = await this.getInnerButtonLabel();
        return label ? (await label.text()).trim() : null;
    }

    // async isDisabled(): Promise<boolean> {
    //     const button = await this.button();
    //     return await button.isDisabled();
    // }

    async getHostChildTagNames(): Promise<string[]> {
        const children = await this.hostChildrenElements();
        const tagNames: string[] = [];
        for (const child of children) {
            const tag = (
                (await child.getProperty('tagName')) as string
            ).toLowerCase();
            tagNames.push(tag);
        }
        return tagNames;
    }

    async hostContainsOnlyAButton(): Promise<boolean> {
        const tags = await this.getHostChildTagNames();
        if (tags.length != 1) return false;
        return tags.every((tag) => ['button'].includes(tag));
    }

    async getButtonChildTagNames(): Promise<string[]> {
        const children = await this.buttonChildrenElements();
        const tagNames: string[] = [];
        for (const child of children) {
            const tag = (
                (await child.getProperty('tagName')) as string
            ).toLowerCase();
            tagNames.push(tag);
        }

        return tagNames;
    }

    async hasNoIcon() {
        const icons = await this.innerButtonIcons();
        return icons.length == 0;
    }

    async hasOnlyOneIcon() {
        const icons = await this.innerButtonIcons();
        return icons.length == 1;
    }

    async hasOnlyOneLabel() {
        const labels = await this.innerButtonLabels();
        return labels.length == 1;
    }

    async isIconBeforeLabel(): Promise<boolean> {
        const children = await this.buttonChildrenElements();
        let iconIdx = -1;
        let labelIdx = -1;
        for (let i = 0; i < children.length; i++) {
            if ((await children[i].getProperty('tagName')) == 'MAT-ICON') {
                iconIdx = i;
            }
            if (await children[i].hasClass('mdc-button__label')) {
                labelIdx = i;
            }
        }
        return iconIdx < labelIdx;
    }

    async getInnerButtonLabel() {
        const label = await this.innerButtonLabel();
        return label;
    }

    async click() {
        const button = await this.matButtonHarness();
        const host = await button.host();
        await host.dispatchEvent('click', {
            pointerType: PointerType.mouse,
            button: MouseButton.left,
        });
    }

    async getButtonStyle() {
        const button = await this.getButton();
        const clazzStr = (await button.getAttribute('class')) ?? '';
        const clazzList = clazzStr.split(' ');
        for (const clazz of clazzList) {
            switch (clazz) {
                case 'mat-mdc-button':
                    return ButtonAppearance.text;
                case 'mat-mdc-raised-button':
                    return ButtonAppearance.elevated;
                case 'mat-mdc-unelevated-button':
                    return ButtonAppearance.filled;
                case 'mat-mdc-outlined-button':
                    return ButtonAppearance.outlined;
                case 'mat-tonal-button':
                    return ButtonAppearance.tonal;
            }
        }
        return null;
    }

    async hasValidStructure(): Promise<boolean | { [key: string]: string }> {
        const errors: any = {};

        const hasValidChildrenCount = (await this.getHostChildrenCount()) == 1;
        if (!hasValidChildrenCount) {
            errors['hasValidChildrenCount'] =
                `Invalid children count: ${hasValidChildrenCount}.`;
        }

        const isHostChildAButton = await this.isHostChildAButton();
        if (!isHostChildAButton) {
            errors['isHostChildAButton'] = `Host child is not a button.`;
        }

        // TODO: testar label

        return Object.keys(errors).length == 0 ? true : errors;
    }

    async getState(): Promise<ButtonState> {
        const id = await this.getId();
        const type = await this.getType();
        const label = await this.getInnerButtonLabelText();
        const icon = await this.getIconText();
        const appearance = await this.getButtonStyle();
        const isDisabled = await this.isButtonDisabled();
        const isFocused = await this.isFocused();
        const isFocusable = await this.isFocusable();
        const hasValidStructure = await this.hasValidStructure();

        return {
            id,
            type,
            label,
            icon,
            appearance,
            isDisabled,
            isFocused,
            isFocusable,
            hasValidStructure,
        };
    }
}

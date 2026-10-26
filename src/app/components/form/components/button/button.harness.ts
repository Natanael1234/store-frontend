import { ComponentHarness } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatIconHarness } from '@angular/material/icon/testing';
import { ButtonAppearance } from '@components/form/components/button/enum/appearance/button-appearance.enum';
import { FormElementType } from '@components/form/enums/form-element-type/form-element-type.enum';
import { Icon } from '@enums/icons/icons.enum';
import { MouseButton } from '@enums/mouse-button/mouse-button.enum';
import { PointerType } from '@enums/pointer-type/pointer-type.enum';

export type ButtonState = {
    id: string | null;
    type: FormElementType.button | FormElementType.submit | FormElementType.reset;
    label: string | null;
    icon: Icon | null;
    appearance: ButtonAppearance | null;
    isFocused: boolean;
    isFocusable: boolean;
    isDisabled: boolean;
    hasValidStructure: boolean | { [key: string]: string };
};

export class ButtonHarness extends ComponentHarness {
    public static hostSelector = 'app-button';

    private readonly hostChildrenElements = this.locatorForAll(':scope > *');
    private readonly buttonElement = this.locatorFor('button');
    private readonly buttonChildrenElements = this.locatorForAll(':scope > button > *');
    private readonly icons = this.locatorForAll(MatIconHarness);
    private readonly label = this.locatorForOptional('mat-label');

    private readonly innerButtonIcons = this.locatorForAll(':scope > button > mat-icon');
    private readonly innerButtonLabel = this.locatorFor(
        ':scope > button > .mdc-button__label > mat-label',
    );
    private readonly innerButtonLabels = this.locatorForAll(
        ':scope > button > .mdc-button__label > mat-label',
    );
    private readonly matButtonHarness = this.locatorFor(MatButtonHarness);

    public async getHostChildrenCount(): Promise<number> {
        return (await this.hostChildrenElements()).length;
    }

    public async hostContainsASingleButton(): Promise<boolean> {
        const children = await this.hostChildrenElements();
        if (children.length !== 1) return false;
        const tagName = await children[0].getProperty('tagName');
        return tagName === 'BUTTON';
    }

    public async isHostChildAButton(): Promise<boolean> {
        const hostChildren = await this.hostChildrenElements();
        if (hostChildren.length < 1) return false;
        const tagName = await hostChildren[0].getProperty('tagName');
        return tagName === 'BUTTON';
    }

    public async getButton() {
        return this.buttonElement();
    }

    public async getId(): Promise<string | null> {
        const button = await this.getButton();
        return await button.getAttribute('id');
    }

    public async getType(): Promise<
        FormElementType.button | FormElementType.submit | FormElementType.reset
    > {
        const button = await this.getButton();
        const type = (await button.getAttribute('type')) as
            FormElementType.button | FormElementType.submit | FormElementType.reset;
        return type;
    }

    public async getLabel() {
        return this.label();
    }

    public async isFocusable(): Promise<boolean> {
        const button = await this.getButton();
        const tabIndex = await button.getProperty('tabIndex');
        return tabIndex !== -1;
    }

    public async isFocused(): Promise<boolean> {
        const button = await this.getButton();
        return await button.isFocused();
    }

    public async getButtonClasses(): Promise<string[]> {
        const classes = (await (await this.buttonElement()).getAttribute('class')) ?? '';
        return classes.split(' ');
    }

    public async isButtonDisabled(): Promise<boolean> {
        const button = await this.buttonElement();
        return await button.getProperty('disabled');
    }

    public async getIcon() {
        const icons = await this.icons();
        return icons[0];
    }

    public async getIconText(): Promise<Icon | null> {
        const icon = await this.getIcon();
        if (!icon) {
            return null;
        }
        return (await icon.getName()) as Icon | null;
    }

    public async getInnerButtonLabelText(): Promise<string | null> {
        const label = await this.getInnerButtonLabel();
        return label ? (await label.text()).trim() : null;
    }

    public async getHostChildTagNames(): Promise<string[]> {
        const children = await this.hostChildrenElements();
        const tagNames: string[] = [];
        for (const child of children) {
            const tag = ((await child.getProperty('tagName')) as string).toLowerCase();
            tagNames.push(tag);
        }
        return tagNames;
    }

    public async hostContainsOnlyAButton(): Promise<boolean> {
        const tags = await this.getHostChildTagNames();
        if (tags.length !== 1) return false;
        return tags.every((tag) => ['button'].includes(tag));
    }

    public async getButtonChildTagNames(): Promise<string[]> {
        const children = await this.buttonChildrenElements();
        const tagNames: string[] = [];
        for (const child of children) {
            const tag = ((await child.getProperty('tagName')) as string).toLowerCase();
            tagNames.push(tag);
        }
        return tagNames;
    }

    public async hasNoIcon(): Promise<boolean> {
        const icons = await this.innerButtonIcons();
        return icons.length === 0;
    }

    public async hasOnlyOneIcon(): Promise<boolean> {
        const icons = await this.innerButtonIcons();
        return icons.length === 1;
    }

    public async hasOnlyOneLabel(): Promise<boolean> {
        const labels = await this.innerButtonLabels();
        return labels.length === 1;
    }

    public async isIconBeforeLabel(): Promise<boolean> {
        const children = await this.buttonChildrenElements();
        let iconIdx = -1;
        let labelIdx = -1;
        for (let i = 0; i < children.length; i++) {
            if ((await children[i].getProperty('tagName')) === 'MAT-ICON') {
                iconIdx = i;
            }
            if (await children[i].hasClass('mdc-button__label')) {
                labelIdx = i;
            }
        }
        return iconIdx < labelIdx;
    }

    public async getInnerButtonLabel() {
        return await this.innerButtonLabel();
    }

    public async click(): Promise<void> {
        const button = await this.matButtonHarness();
        const host = await button.host();
        await host.dispatchEvent('click', {
            pointerType: PointerType.mouse,
            button: MouseButton.left,
        });
    }

    public async getButtonStyle(): Promise<ButtonAppearance | null> {
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

    public async hasValidStructure(): Promise<boolean | { [key: string]: string }> {
        const errors: { [key: string]: string } = {};

        const hasValidChildrenCount = (await this.getHostChildrenCount()) === 1;
        if (!hasValidChildrenCount) {
            errors['hasValidChildrenCount'] = `Invalid children count: ${hasValidChildrenCount}.`;
        }

        const isHostChildAButton = await this.isHostChildAButton();
        if (!isHostChildAButton) {
            errors['isHostChildAButton'] = `Host child is not a button.`;
        }

        return Object.keys(errors).length === 0 ? true : errors;
    }

    public async getState(): Promise<ButtonState> {
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

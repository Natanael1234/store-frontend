import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormComponent } from '../../../../../../components/form/form.component';
import { UserFilterToolbarComponent } from '../../user-filter-toolbar.component';

export class ToolbarScrapper {
    constructor(
        protected fixture: ComponentFixture<UserFilterToolbarComponent>,
    ) {}

    detectChanges() {
        this.fixture.detectChanges();
    }

    onlyContainsFormComponent() {
        const children = this.getChildren();
        if (children.length != 1) {
            return false;
        }
        return children[0]?.componentInstance instanceof FormComponent;
    }

    getChildren() {
        return this.fixture.debugElement.children;
    }

    getFormElements() {
        const form = this.getFormComponentInstance();
        return form.elements();
    }

    getAlignItems() {
        const form = this.getFormComponentInstance();
        return form.alignItems();
    }

    getJustifyContent() {
        const form = this.getFormComponentInstance();
        return form.justifyContent();
    }

    getFormComponentInstance() {
        const formEl = this.getFormComponentDebugElement();
        const formComponentInstance = formEl.componentInstance as FormComponent;
        return formComponentInstance;
    }

    getFormComponentDebugElement() {
        const formEl = this.fixture.debugElement.query(
            By.directive(FormComponent),
        );
        return formEl;
    }
}

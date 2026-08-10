import { ComponentHarness } from '@angular/cdk/testing';

export class AlertHarness extends ComponentHarness {
    static hostSelector = 'app-alert';

    private messageContainer = this.locatorFor(
        ':scope > .container > .content > .message',
    );

    async getMessageContainer() {
        return this.messageContainer();
    }

    async getTextMessage() {
        const messageContainer = await this.getMessageContainer();
        const message = await messageContainer.text();
        return message;
    }
}

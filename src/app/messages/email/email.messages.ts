import { TextMessage } from '@messages/text/text.messages';

export class EmailMessage extends TextMessage {
    constructor(options?: { minLength?: number; maxLength?: number }) {
        super(options);
    }
}

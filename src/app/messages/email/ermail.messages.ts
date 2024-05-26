import { TextMessage } from '../text/text.messages';

export class EmailMessage extends TextMessage {
  constructor(options?: { minLength?: number; maxLength?: number }) {
    super(options);
  }
}

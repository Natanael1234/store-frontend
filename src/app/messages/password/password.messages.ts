import { TextMessage } from '../text/text.messages';

export class PasswordMessage extends TextMessage {
  STRONG?: String;
  DONT_MATCHES?: String;

  constructor(options?: { minLength?: number; maxLength?: number }) {
    super(options);
    this.STRONG = 'Deve maíscula, minúscula, número e caractere especial.';
    this.DONT_MATCHES = 'As senhas não coincidem.';
  }
}

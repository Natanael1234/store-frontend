import { TextMessage } from '../text/text.messages';

export class PasswordMessage extends TextMessage {
    STRONG?: string;
    DONT_MATCHES?: string;

    constructor(options?: { minLength?: number; maxLength?: number }) {
        super(options);
        this.STRONG =
            'Deve conter maíscula, minúscula, número e caractere especial.';
        this.DONT_MATCHES = 'As senhas não coincidem.';
    }
}

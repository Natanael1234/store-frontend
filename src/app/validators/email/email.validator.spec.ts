import { FormControl } from '@angular/forms';
import { EmailConstants } from '../../constants/email/email.constants';
import { emailValidator } from './email.validator';

function generateEmail(options: {
    localPartLength: number;
    domainPartLength: number;
}) {
    const localPart = 'a'.repeat(options.localPartLength);
    const mailServer = 'b'.repeat(options.domainPartLength - 3);
    const domainPart = `@${mailServer}.c`;
    const email = localPart + domainPart;
    return email;
}

describe('Strong Email Validator', () => {
    it('should accept valid email address', () => {
        const control = new FormControl('test@example.com');
        const result = emailValidator()(control);
        expect(result).toBeNull();
    });

    it('should accept email address with shortest acceptable local and domain parts lengths', () => {
        const email = generateEmail({
            localPartLength: 1,
            domainPartLength: 4,
        });
        const control = new FormControl(email);
        const result = emailValidator()(control);
        expect(result).toBeNull();
    });

    it('should accept email address with longest acceptable local and domain parts lengths', () => {
        const email = generateEmail({
            localPartLength: EmailConstants.MAX_LOCAL_LENGTH,
            domainPartLength: EmailConstants.MAX_DOMAIN_LENGTH,
        });
        const control = new FormControl(email);
        const result = emailValidator()(control);
        expect(result).toBeNull();
    });

    it('should fail to validate badly formated email address', () => {
        const control = new FormControl('invalid-email');
        const result = emailValidator()(control);
        expect(result).toEqual({ email: { message: 'E-mail inválido.' } });
    });

    it('should reject if the local is shorter than allowed', () => {
        const email = generateEmail({
            localPartLength: 0,
            domainPartLength: 4,
        });
        const control = new FormControl(email);
        const result = emailValidator()(control);
        expect(result).toEqual({ email: { message: 'E-mail inválido.' } });
    });

    it('should reject when local part is longer than allowed', () => {
        const email = generateEmail({
            localPartLength: EmailConstants.MAX_LOCAL_LENGTH + 1,
            domainPartLength: 4,
        });
        const control = new FormControl(email);
        const result = emailValidator()(control);
        expect(result).toEqual({ email: { message: 'E-mail inválido.' } });
    });

    it('should reject when domain part longer than allowed', () => {
        const email = generateEmail({
            localPartLength: 1,
            domainPartLength: EmailConstants.MAX_DOMAIN_LENGTH + 1,
        });
        const control = new FormControl(email);
        const result = emailValidator()(control);
        expect(result).toEqual({ email: { message: 'E-mail inválido.' } });
    });

    it('should accept spaces at the beginning', () => {
        const email = '  x@y.com';
        const control = new FormControl(email);
        const result = emailValidator()(control);
        expect(result).toBeNull();
    });

    it('should accept spaces at the end', () => {
        const email = 'x@y.com  ';
        const control = new FormControl(email);
        const result = emailValidator()(control);
        expect(result).toBeNull();
    });
});

import { PasswordConstants } from '../../constants/password/password.constants';
import { EmailMessage } from './ermail.messages';

describe('EmailMessage', () => {
  it('should be defined', () => {
    expect(EmailMessage).toBeDefined();
  });

  it('should have valid keys and values when no options are specified', () => {
    expect({ ...new EmailMessage() }).toEqual({
      NULL: 'Nulo.',
      REQUIRED: 'Obrigatório.',
      MIN_LEN: `Muito curto.`,
      MAX_LEN: `Muito longo.`,
      INVALID: 'Inválido.',
    });
  });

  it('should have valid keys and values when  empty options are specified', () => {
    expect({ ...new EmailMessage() }).toEqual({
      NULL: 'Nulo.',
      REQUIRED: 'Obrigatório.',
      MIN_LEN: `Muito curto.`,
      MAX_LEN: `Muito longo.`,
      INVALID: 'Inválido.',
    });
  });

  it('should have valid keys and values when options are specified', () => {
    expect({
      ...new EmailMessage({
        minLength: PasswordConstants.MIN_LENGTH,
        maxLength: PasswordConstants.MAX_LENGTH,
      }),
    }).toEqual({
      NULL: 'Nulo.',
      INVALID: 'Inválido.',
      REQUIRED: 'Obrigatório.',
      MIN_LEN: `Deve conter pelo menos ${PasswordConstants.MIN_LENGTH} caracteres.`,
      MAX_LEN: `Deve conter no máximo ${PasswordConstants.MAX_LENGTH} caracteres.`,
    });
  });
});

import { EmailMessage } from './email.messages';

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
      INVALID: 'Inválido.',
      MIN_LEN: 'Muito curto.',
      MAX_LEN: 'Muito longo.',
    });
  });

  it('should have valid keys and values when options are specified', () => {
    expect({
      ...new EmailMessage({ minLength: 3, maxLength: 5 }),
    }).toEqual({
      NULL: 'Nulo.',
      REQUIRED: 'Obrigatório.',
      INVALID: 'Inválido.',
      MIN_LEN: 'Deve conter pelo menos 3 caracteres.',
      MAX_LEN: 'Deve conter no máximo 5 caracteres.',
    });
  });

  it('should have valid keys and values when options are specified and MIN_LEN = 1', () => {
    expect({
      ...new EmailMessage({ minLength: 1, maxLength: 5 }),
    }).toEqual({
      NULL: 'Nulo.',
      REQUIRED: 'Obrigatório.',
      INVALID: 'Inválido.',
      MIN_LEN: 'Deve conter pelo menos 1 caracter.',
      MAX_LEN: 'Deve conter no máximo 5 caracteres.',
    });
  });
});

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
    });
  });

  it('should have valid keys and values when options are specified', () => {
    expect({
      ...new EmailMessage(),
    }).toEqual({
      NULL: 'Nulo.',
      INVALID: 'Inválido.',
      REQUIRED: 'Obrigatório.',
    });
  });
});

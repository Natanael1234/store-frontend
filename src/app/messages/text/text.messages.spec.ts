import { TextMessage } from './text.messages';

describe('TextMessage', () => {
  it('should be defined', () => {
    expect(TextMessage).toBeDefined();
  });

  it("should have valid keys and values when doesn't receives parameters", () => {
    const Messages = new TextMessage();
    expect({ ...Messages }).toEqual({
      INVALID: 'Inválido.',
      MIN_LEN: 'Muito curto.',
      MAX_LEN: 'Muito longo.',
      NULL: 'Nulo.',
      REQUIRED: 'Obrigatório.',
    });
  });

  it('should have valid keys and values when receives parameters', () => {
    const Messages = new TextMessage({ minLength: 6, maxLength: 60 });
    expect({ ...Messages }).toEqual({
      INVALID: 'Inválido.',
      MIN_LEN: 'Deve conter pelo menos 6 caracteres.',
      MAX_LEN: `Deve conter no máximo 60 caracteres.`,
      NULL: 'Nulo.',
      REQUIRED: 'Obrigatório.',
    });
  });
});

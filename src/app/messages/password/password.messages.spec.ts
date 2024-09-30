import { UserConfigs } from '../../configs/user/user.configs';

import { PasswordMessage } from './password.messages';

describe('PasswordMessage', () => {
  it('should be defined', () => {
    expect(PasswordMessage).toBeDefined();
  });

  it('should have valid keys and values when no options are specified', () => {
    expect({ ...new PasswordMessage() }).toEqual({
      NULL: 'Nulo.',
      REQUIRED: 'Obrigatório.',
      MIN_LEN: `Muito curto.`,
      MAX_LEN: `Muito longo.`,
      INVALID: 'Inválido.',
      STRONG: 'Deve maíscula, minúscula, número e caractere especial.',
      DONT_MATCHES: 'As senhas não coincidem.',
    });
  });

  it('should have valid keys and values when  empty options are specified', () => {
    expect({ ...new PasswordMessage() }).toEqual({
      NULL: 'Nulo.',
      REQUIRED: 'Obrigatório.',
      MIN_LEN: `Muito curto.`,
      MAX_LEN: `Muito longo.`,
      INVALID: 'Inválido.',
      STRONG: 'Deve maíscula, minúscula, número e caractere especial.',
      DONT_MATCHES: 'As senhas não coincidem.',
    });
  });

  it('should have valid keys and values when options are specified', () => {
    expect({
      ...new PasswordMessage({
        minLength: UserConfigs.PASSWORD_MIN_LENGTH,
        maxLength: UserConfigs.PASSWORD_MAX_LENGTH,
      }),
    }).toEqual({
      NULL: 'Nulo.',
      INVALID: 'Inválido.',
      REQUIRED: 'Obrigatório.',
      MIN_LEN: `Deve conter pelo menos ${UserConfigs.PASSWORD_MIN_LENGTH} caracteres.`,
      MAX_LEN: `Deve conter no máximo ${UserConfigs.PASSWORD_MAX_LENGTH} caracteres.`,
      STRONG: 'Deve maíscula, minúscula, número e caractere especial.',
      DONT_MATCHES: 'As senhas não coincidem.',
    });
  });
});

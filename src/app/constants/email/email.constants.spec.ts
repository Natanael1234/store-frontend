import { EmailConstants } from './email.constants';

describe('EmailConstants', () => {
  it('should be defined', () => {
    expect(EmailConstants).toBeDefined();
  });

  it('should have valid keys and values', () => {
    const fields: any = { ...EmailConstants };
    expect(fields).toEqual({
      MAX_LENGTH: 320,
      MIN_LOCAL_LENGTH: 1,
      MAX_LOCAL_LENGTH: 64,
      Min_DOMAIN_LENGTH: 4,
      MAX_DOMAIN_LENGTH: 255,
    });
  });
});

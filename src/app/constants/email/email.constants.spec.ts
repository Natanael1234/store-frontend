import { EmailConstants } from './email.constants';

describe('EmailConstants', () => {
  it('should be defined', () => {
    expect(EmailConstants).toBeDefined();
  });

  it('should have valid keys and values', () => {
    const fields: any = { ...EmailConstants };
    expect(fields).toEqual({
      MAX_LENGTH: 60,
    });
  });
});

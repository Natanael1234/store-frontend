import { ExceptionName } from './exception-text.enum';

describe('ExceptionText', () => {
  it('should be defined', () => {
    expect(ExceptionName).toBeDefined();
  });

  it('should have valid keys and values', () => {
    expect({ ...ExceptionName } as any).toEqual({
      BAD_REQUEST: 'BadRequestException',
      CONFLICT: 'ConflictException',
      FORBIDDEN: 'ForbiddenException',
      NOT_FOUND: 'NotFoundException',
      UNAUTHORIZED: 'UnauthorizedException',
      UNPROCESSABLE_ENTITY: 'UnprocessableEntityException',
    });
  });
});

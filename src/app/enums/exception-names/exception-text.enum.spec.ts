import { ExceptionName } from './exception-text.enum';

describe('ExceptionText', () => {
    it('should be defined', () => {
        expect(ExceptionName).toBeDefined();
    });

    it('should have valid keys and values', () => {
        expect({ ...ExceptionName } as any).toEqual({
            bad_request: 'BadRequestException',
            conflict: 'ConflictException',
            forbidden: 'ForbiddenException',
            not_found: 'NotFoundException',
            unauthorized: 'UnauthorizedException',
            unprocessable_entity: 'UnprocessableEntityException',
        });
    });
});

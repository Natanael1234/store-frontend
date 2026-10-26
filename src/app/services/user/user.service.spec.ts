import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthResponseDto } from '@services/auth/dtos/auth.response.dto';
import { AuthRequestRoutes } from '@services/auth/request-routes/auth.request-routes';
import { PaginatedResponseDTO } from '@services/dtos/response/pagination/pagination.response.dto';
import { HttpService } from '@services/http/http.service';
import { testCreateMockedTokenService } from '@services/token/test-token-service.utils';
import { TokenService } from '@services/token/token.service';
import { FindUserRequestDTO } from '@services/user/dtos/find-user.request/find-user.request.dto';
import { Role } from '@services/user/dtos/role/role.enum';
import { CreateUserRequestDto } from '@services/user/dtos/user.request/create-user.request.dto';
import { UpdateUserRequestDto } from '@services/user/dtos/user.request/update-user.request.dto';
import { UserResponseDto } from '@services/user/dtos/user.response/user.response.dto';
import { UserOrder } from '@services/user/enums/user-order/user-order.enum';
import { UserService } from '@services/user/user.service';

/** mocks JWT token */
const SECRET_KEY = 'SECRET_KEY';

function base64Encode(str: string): string {
    return btoa(str)
        .replace(/=/g, '') // remove padding
        .replace(/\+/g, '-') // substitui + por -
        .replace(/\//g, '_'); // substitui / por _
}

async function createSignature(header: string, payload: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(`${header}.${payload}`);
    const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(SECRET_KEY),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign'],
    );
    const signature = await crypto.subtle.sign('HMAC', key, data);
    return base64Encode(String.fromCharCode(...new Uint8Array(signature)));
}

async function generateToken(payload: object): Promise<string> {
    const header = base64Encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const encodedPayload = base64Encode(JSON.stringify(payload));

    const signature = await createSignature(header, encodedPayload);
    return `${header}.${encodedPayload}.${signature}`;
}

const EXPIRED_TEST_ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY5ODcxMjEsImV4cCI6MTcwNzA3MzUyMSwic3ViIjoiODkxZGIzMWUtZGZiNS00MmVkLWI5MTItNDhiOTg0NjNiMDA0In0.LaW-Z0DkU5ZheRtst0mvZ3WtMgMmMeawJVke9qtCVyE';
const EXPIRED_TEST_REFRESH_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY5ODcxMjEsImV4cCI6NDI5ODk4NzEyMSwic3ViIjoiODkxZGIzMWUtZGZiNS00MmVkLWI5MTItNDhiOTg0NjNiMDA0IiwianRpIjoiMTI4In0.bJTClITMvD5NCDt5DjTmxn3DIjFOabEvsCvnK795VXU';

const mockAuthResponse: AuthResponseDto = {
    status: 'success',
    data: {
        user: {
            id: '891db31e-dfb5-42ed-b912-48b98463b004',
            name: 'John Williams',
            email: 'john@example.com',
            roles: [Role.user],
            active: true,
            created: '2024-02-03T19:05:21.689Z',
            updated: '2024-02-03T19:05:21.689Z',
            deletedAt: null,
        },
        payload: {
            type: 'bearer',
            token: EXPIRED_TEST_ACCESS_TOKEN,
            refreshToken: EXPIRED_TEST_REFRESH_TOKEN,
        },
    },
};

const mockUser: UserResponseDto = {
    id: '891db31e-dfb5-42ed-b912-48b98463b004',
    name: 'John Williams',
    email: 'john@example.com',
    roles: [Role.user],
    active: true,
    created: '2024-02-03T19:05:21.689Z',
    updated: '2024-02-03T19:05:21.689Z',
    deletedAt: null,
};

describe('UserService', () => {
    let authService: UserService;
    let mockedHttpService: Partial<HttpService>;
    let mockedTokenService: ReturnType<typeof testCreateMockedTokenService>;

    beforeEach(() => {
        mockedTokenService = testCreateMockedTokenService();

        mockedHttpService = {
            get: vi.fn(),
            post: vi.fn(),
            patch: vi.fn(),
        };

        TestBed.configureTestingModule({
            providers: [
                { provide: TokenService, useValue: mockedTokenService },
                { provide: HttpService, useValue: mockedHttpService },
                UserService,
            ],
        });

        authService = TestBed.inject(UserService);
    });

    it('should be created', () => {
        expect(authService).toBeTruthy();
    });

    describe('getUsers', () => {
        it('deve chamar httpService.get com a URL correta, query serializada em JSON e authorization: true', async () => {
            const queryParams: FindUserRequestDTO = {
                page: 1,
                pageSize: 10,
                orderBy: [UserOrder.name_asc],
            };

            const mockPaginatedResponse = new PaginatedResponseDTO<UserResponseDto, UserOrder>(
                '',
                1,
                1,
                10,
                [UserOrder.name_asc],
                [mockAuthResponse.data.user],
            );

            vi.mocked(mockedHttpService.get!).mockReturnValue(of(mockPaginatedResponse));

            const response = await firstValueFrom(authService.getUsers(queryParams));

            expect(response).toEqual(mockPaginatedResponse);
            expect(mockedHttpService.get).toHaveBeenCalledWith({
                path: AuthRequestRoutes.GET_USERS.url,
                queryParams: { query: JSON.stringify(queryParams) },
                authorization: true,
            });
        });

        it('deve utilizar um token JWT gerado dinamicamente no fluxo quando configurado no TokenService', async () => {
            const validToken = await generateToken({
                sub: mockAuthResponse.data.user.id,
                exp: Math.floor(Date.now() / 1000) + 3600,
            });

            if (mockedTokenService.getAccessToken) {
                vi.mocked(mockedTokenService.getAccessToken).mockReturnValue(validToken);
            }

            vi.mocked(mockedHttpService.get!).mockReturnValue(of({}));

            await firstValueFrom(authService.getUsers({}));

            expect(mockedHttpService.get).toHaveBeenCalledWith(
                expect.objectContaining({
                    authorization: true,
                }),
            );
        });

        it('deve retornar erro tratado/normalizado quando o httpService.get falhar', async () => {
            const mockHttpError = new Error('Unauthorized');
            vi.mocked(mockedHttpService.get!).mockReturnValue(throwError(() => mockHttpError));

            await expect(firstValueFrom(authService.getUsers({}))).rejects.toThrow();
        });
    });

    describe('getUser', () => {
        it('deve chamar httpService.get concatenando o identifier ao path', async () => {
            const identifier = '891db31e-dfb5-42ed-b912-48b98463b004';
            vi.mocked(mockedHttpService.get!).mockReturnValue(of(mockUser));

            const response = await firstValueFrom(authService.getUser(identifier));

            expect(response).toEqual(mockUser);
            expect(mockedHttpService.get).toHaveBeenCalledWith({
                path: `${AuthRequestRoutes.GET_USERS.url}/${identifier}`,
            });
        });

        it('deve propagar erro tratado se a requisição de busca individual falhar', async () => {
            const identifier = 'user-not-found';
            const mockError = new Error('Not Found');
            vi.mocked(mockedHttpService.get!).mockReturnValue(throwError(() => mockError));

            await expect(firstValueFrom(authService.getUser(identifier))).rejects.toThrow();
        });
    });

    describe('createUser', () => {
        it('deve enviar o payload de criação de usuário para httpService.post sem authorization explícito', async () => {
            const createUserDto: CreateUserRequestDto = {
                name: 'New User',
                email: 'newuser@example.com',
                roles: [Role.user],
                active: true,
                deletedAt: false,
            };

            vi.mocked(mockedHttpService.post!).mockReturnValue(of(mockUser));

            const response = await firstValueFrom(authService.createUser(createUserDto));

            expect(response).toEqual(mockUser);
            expect(mockedHttpService.post).toHaveBeenCalledWith({
                authorization: true,
                path: AuthRequestRoutes.POST_USER.url,
                data: createUserDto,
            });
        });

        it('deve propagar erro caso ocorra falha na requisição de criação', async () => {
            const createUserDto: CreateUserRequestDto = {
                name: 'New User',
                email: 'existing@example.com',
                roles: [Role.user],
            };
            const mockError = new Error('Email already exists');
            vi.mocked(mockedHttpService.post!).mockReturnValue(throwError(() => mockError));

            await expect(firstValueFrom(authService.createUser(createUserDto))).rejects.toThrow(
                'Email already exists',
            );
        });
    });

    describe('updateUser', () => {
        it('deve enviar os dados de atualização via httpService.patch com authorization: true', async () => {
            const userId = mockUser.id;
            const updateUserDto: UpdateUserRequestDto = {
                name: 'Updated Name',
            };
            const updatedUserMock = { ...mockUser, name: 'Updated Name' };

            vi.mocked(mockedHttpService.patch!).mockReturnValue(of(updatedUserMock));

            const response = await firstValueFrom(authService.updateUser(userId, updateUserDto));

            expect(response).toEqual(updatedUserMock);
            expect(mockedHttpService.patch).toHaveBeenCalledWith({
                path: `${AuthRequestRoutes.PATCH_USER.url}/${userId}`,
                data: updateUserDto,
                authorization: true,
            });
        });

        it('deve propagar erro se a atualização falhar', async () => {
            const userId = mockUser.id;
            const updateUserDto: UpdateUserRequestDto = { name: 'Updated Name' };
            const mockError = new Error('Bad Request');

            vi.mocked(mockedHttpService.patch!).mockReturnValue(throwError(() => mockError));

            await expect(
                firstValueFrom(authService.updateUser(userId, updateUserDto)),
            ).rejects.toThrow('Bad Request');
        });
    });
});
